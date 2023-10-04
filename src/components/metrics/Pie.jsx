import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import randomColor from 'randomcolor';

ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = ({ data, options }) => {
	const backgroundColors = randomColor({ count: data?.labels?.length });

	data.datasets[0].backgroundColor = backgroundColors;

	return <Pie data={data} options={options} />;
};

export default PieChart;
