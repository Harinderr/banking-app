"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { CountryCode, LinkTokenCreateRequest, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { Languages } from "lucide-react";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
 
const {
  APPWRITE_DATABASE_ID : DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID : USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID : BANK_COLLECTION_ID,
} = process.env

 export const createBankAccount = async ({
  userId,
bankId,
accountId,
accessToken,
fundingSourceUrl,
sharableId
 }: createBankAccountProps) => {
    try {
      const {database} = await createAdminClient()

      const bankAccount = await database.createDocument(
        DATABASE_ID!,
        BANK_COLLECTION_ID!,
        ID.unique(),
        {
          userId,
          bankId,
          accountId,
          accessToken,
          fundingSourceUrl,
          sharableId
        }
      )


    } catch (error) {
      console.log(error)
    }
}


export const getUserInfo = async ({userId}:getUserInfoProps) => {
  try {
    const {database} = await createAdminClient()
    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )
    return parseStringify(user.documents[0])
  } catch (error) {
    console.log(error)
  }
}

export const signUp = async ({password, ...data}:SignUpParams) => {
  const { firstName, lastName, email} = data;
  let userAccount;
  try {
    console.log("hlo");
    const { account ,database } = await createAdminClient();
     userAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    if(!userAccount) throw new Error('Error in user creation ')

      const dwollaCustomerUrl = await createDwollaCustomer({
        ...data,
        type : 'personal'
      })

      if(!dwollaCustomerUrl) throw new Error('Error in getting dwolla customer url')
         
        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl)
    
        const session = await account.createEmailPasswordSession(email, password);

        const newUser = await  database.createDocument(
          DATABASE_ID!,
          USER_COLLECTION_ID!,
          ID.unique(),
          {
          ...data,
          userId : userAccount.$id,
          dwollaCustomerId,
          dwollaCustomerUrl,
          password

        })
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    console.log('user saved')
    return parseStringify(newUser);
  } catch (error) {
    console.log(error);
  }
};
export const singIn = async ({email,password}:signInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email,password)
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  
    const user = await getUserInfo({
      userId : session.userId
    })

    return parseStringify(user)


  } catch (error) {
    console.log(error);
  }
};


export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const output =  await account.get();
    const user = await getUserInfo({userId: output.$id})
    return parseStringify(user)
  } catch (error) {
    return null;
  }
}
export async function logoutAccount() {
  try {
    const { account } = await createSessionClient();
    cookies().delete('appwrite-session')

  await account.deleteSession('current')
  } catch (error) {
    return null;
  }
}

export const createLinkToken = async (user : User)=> {
  try {
    
    const tokenParams : LinkTokenCreateRequest = {
      user : {
        client_user_id : user.$id
      },
      client_name :`${user.firstName} ${user.lastName}`,
      products : ['auth'] as Products[],
      language : 'en',
      country_codes : ['US'] as CountryCode[]
    }
    const response = await plaidClient.linkTokenCreate(tokenParams)
    return parseStringify({linkToken : response.data.link_token})

  } catch (error) {
    
    console.log(error)
    
  }
}
  

export const exchangePublicToken = async ({publicToken , user}: exchangePublicTokenProps) => {
  try {
    // exchange 
    const response = await plaidClient.itemPublicTokenExchange({public_token : publicToken})
    const accessToken = response.data.access_token
    const itemId = response.data.item_id
    const accountsResponse = plaidClient.accountsGet({access_token : accessToken})
    const accountData = (await accountsResponse).data.accounts[0]

    // process token creation  with dwallio
    const request: ProcessorTokenCreateRequest = {
      access_token : accessToken,
      account_id : accountData.account_id,
      processor : "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    }
     
    const processorTokenResponse = await plaidClient.processorTokenCreate(request)
    const processorToken =  processorTokenResponse.data.processor_token

    // creating a funding source url 

    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId : user.dwollaCustomerId,
      processorToken,
      bankName : accountData.name,
    })

    if(!fundingSourceUrl) throw Error;
     
    await createBankAccount({
      userId  : user.$id,
      bankId : itemId,
      accountId : accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId : encryptId(accountData.account_id)
    })

    revalidatePath('/')

    // completion message 
    return parseStringify({publicTokenExchange : 'complete'})

  } catch (error) {
     console.log(error)
  }
  

}

export const getBanks = async ({userId}:getBanksProps) => {
  try {
    const {database} = await createAdminClient()
    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )
    return parseStringify(banks.documents)
    
  } catch (error) {
    console.log(error)
  }
}
export const getBank = async ({documentId}:getBankProps) => {
  try {
    const {database} = await createAdminClient()
    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('$id', [documentId])]
    )
    return parseStringify(bank.documents[0])
    
  } catch (error) {
    console.log(error)
  }
}