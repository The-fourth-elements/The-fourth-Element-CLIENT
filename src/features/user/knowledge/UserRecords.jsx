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
import './UserRecords.scss'

const UserRecords = ({ datasets }) => {

	const data = {
		labels: [
			'muy bien',
			'bien',
			'regular',
			'mal',
			'muy mal'
		],

		datasets
	};

	// const options = {
	// 	elements: {
	// 		line: {
	// 			borderWidth: 3,
	// 		},
	// 	},
	// };

	ChartJS.register( LineElement, PointElement, RadialLinearScale, Tooltip, Legend);

	return (
			<div className='userRecordAutoRegistro'><Radar data={data}  /></div>
	);
};

export default UserRecords;
