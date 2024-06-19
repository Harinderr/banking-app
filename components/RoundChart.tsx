'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { plugin } from "postcss";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const RoundChart = ({accounts}: DoughnutChartProps) => {
  const banks = accounts.map(a => a.name)
  const balances = accounts.map(a => a.currentBalance)
    const data = {
        datasets : [
            {
                label : 'Banks',
                data : balances,
                backgroundColor : ['blue', 'red', 'green']
            },

        ],
        labels : banks
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