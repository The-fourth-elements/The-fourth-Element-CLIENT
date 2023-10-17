import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	Tooltip,
	Legend,
	BarElement,
	LinearScale,
	CategoryScale,
} from 'chart.js';
import randomColor from 'randomcolor';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data, options }) => {
	ChartJS.defaults.font.size = 25;
	const backgroundColors = randomColor({ count: data?.labels?.length });
	data.datasets[0].backgroundColor = backgroundColors;
	options = {
		...options,
		scales: {
			x: {
				barThickness: 10,
				grid: {
					offset: true,
				},
			},
		},
		indexAxis: 'y',
		plugins: {
			title: {
				display: true,
				text: "Por país",
				fontSize: 18,
			},
			legend: {
                labels: {
                   font:{
					size: 30,
				   }
                }
			},
			labels:{
				font:{
					size:30,
				}
			}
		},
	};
	data.datasets[0].barThickness = 10;
	return <Bar data={data} options={options} style={{background:'#ffffffe5'}} />;
};

export default BarChart;
