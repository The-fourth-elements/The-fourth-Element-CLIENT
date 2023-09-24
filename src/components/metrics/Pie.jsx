import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
// import { useUserDetail } from '@/store/userDetail';

ChartJS.register(ArcElement, Tooltip, Legend);
export default function PieChart({ data, options }) {
	return <Pie data={data} options={options} />;
}
