'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { plugin } from "postcss";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const RoundChart = () => {
    const data = {
        datasets : [
            {
                label : 'Banks',
                data : [1000,2300,4500 ],
                backgroundColor : ['blue', 'red', 'green']
            },

        ],
        labels : ['SBI', 'HDFC', 'ICICI' ]
    }
  return (
    <Doughnut data ={data}
    options={
      {
        plugins : {
            legend : {
                display : false
            }
        }
      }
    }
    />
  )
}

export default RoundChart