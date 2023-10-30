import { useEffect } from 'react';
import PolarChart from '../metrics/Polar';

const UserRecords = ({ user, session }) => {
	useEffect(() => {
		if (!user?.progress) {
		}
	}, []);

	//valores de prueba, esto se calculara cuando obtenda los datos del usuario en el autoregistro,

    //obtener los valores por fetch a la api, que nos lo calcule aaron, traer un objeto o un array que tenga los resultados calculados y que no tarde en el front, yo le envio mi id de usuario y el busca si este usuario tiene progreso, si no tiene no renderizo esto, si lo tiene hacer mapeo de los resultados que obtuvo en el objeto progreso: 
    //seran en un total de 7 resultados, estos seran calculados a partir de los pdf que mandaron, realizar un formulario con valores dinamicos.
    // este formulario hara una peticion al back para traer al usuario y este creara en el progreso del usuario un objeto llamado autoregistro, 
    // los datos que te entregare del front seran los datos ya calculados, solo los guardaras.
    // esperare la respuesta para actulizar el usuario y obtener el nuevo progreso;


    // los datos que reciba los pusheare en el siguiente objeto data.datasets[i].data = [datos del back almacenados];


	const data = {
		labels: [
			'Eating',
			'Drinking',
			'Sleeping',
			'Designing',
			'Coding',
			'Cycling',
			'Running',
		],
		datasets: [
			{
				label: 'My First Dataset',
				data: [7,3,5,2,2,5,5],
				fill: true,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgb(255, 99, 132)',
				pointBackgroundColor: 'rgb(255, 99, 132)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgb(67, 21, 31)',
			},
			{
				label: 'My Second Dataset',
				data: [1, 5, 2, 2, 6, 7, 1],
				fill: true,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgb(54, 162, 235)',
				pointBackgroundColor: 'rgb(54, 162, 235)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgb(54, 162, 235)',
			},
		],
	};

	const options = {
		elements: {
			line: {
				borderWidth: 3,
			},
		},
	};

	return (
		<>
			<PolarChart data={data} options={options} />
		</>
	);
};

export default UserRecords;
