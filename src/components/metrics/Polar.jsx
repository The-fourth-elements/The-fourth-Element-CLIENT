import { Radar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	RadialLinearScale,
    PointElement,
    LineElement
} from 'chart.js';
import randomColor from 'randomcolor';

ChartJS.register( LineElement, PointElement, RadialLinearScale, Tooltip, Legend);

const PolarChart = ({ data, options }) => {
	const backgroundColors = randomColor({ count: data?.labels?.length });

	if (data.datasets?.length > 0) {
		// data.datasets[0].backgroundColor = backgroundColors;
	}
	return <div className='bg-[#c8d9d4] w-[70%] flex justify-center rounded-lg mb-unit-18'><Radar data={data} options={options} /></div>;
};

export default PolarChart;
