import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// en data sets poner la cantidad de usuarios que hay dependiendo del rol o de si pagaron.


var mioption = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        title: {
            display: true,
            text: 'Usuarios registrados',
            fontSize: 18,
            color: '#fff'
        },
        legend: {
            labels: {
                font: {
                    size: 22,
                    color: '#ffffff'
                },
            },
        },
    },
}

var data = {
    labels: ['free', 'Pay', "admin", "iope"],
    datasets: [
        {
            label: 'usuarios registrados',
            data: [90, 700, 30, 3999],
            backgroundColor: [
                'rgba(255, 206, 86, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                '#0000000f',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        }
    ]
}

export default function PieChart() {
    return <Pie data={data} options={mioption} />
}