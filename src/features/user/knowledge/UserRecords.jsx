'use client'

import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, BarElement, LinearScale, CategoryScale } from 'chart.js';
import './UserRecords.scss';

const UserRecords = ({ data }) => {
  const datasets = {
    labels: data.map(entry => {
      const fecha = new Date(entry.date);
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      return `${dia}/${mes} `;
    }),
    datasets: [
      {
        label: `Avg `,
        data: data.map(entry => entry.response.reduce((sum, val) => sum + val, 0) / entry.response.length),
        backgroundColor: 'rgba(223, 110, 5, 0.7)',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderWidth: 1,
      },
    ], 
  };

  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  useEffect(() => {
    // Selecciona el elemento por su clase
    const chartContainer = document.querySelector('.userRecordAutoRegistro');

    // Aplica la lógica para el ancho adicional
    if (chartContainer) {
		if (data.length > 10) {
		  const additionalWidth = 10 * (data.length - 10);
		  chartContainer.style.width = `${chartContainer.offsetWidth + additionalWidth}px`;
		} else {
		  // Si la condición no se cumple, restablece el ancho al valor original
		  chartContainer.style.width = ''; // Esto eliminará la propiedad de estilo 'width'
		}
	  }
  }, [data.length]); // Se ejecutará cada vez que la longitud de los datos cambie

  const options = {
	maintainAspectRatio : false,
	// barThickness : 50
	}

  return (
    <div className='userRecordAutoRegistro'>
      <Bar data={datasets} options={options} />
    </div>
  );
};

export default UserRecords;
