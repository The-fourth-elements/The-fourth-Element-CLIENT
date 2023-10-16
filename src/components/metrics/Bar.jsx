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
	const backgroundColors = randomColor({ count: data?.labels?.length });
	data.datasets[0].backgroundColor = backgroundColors;
	return <Bar data={data} options={options} />;
};

export default BarChart;
