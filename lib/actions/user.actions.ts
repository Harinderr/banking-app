"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signUp = async (data: SignUpParams) => {
  const { firstName, lastName, email, password } = data;
  try {
    console.log("hlo");
    const { account } = await createAdminClient();
    const userAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    console.log('user saved')
    return parseStringify(userAccount);
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

    return parseStringify(session)


  } catch (error) {
    console.log(error);
  }
};


export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user =  await account.get();
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