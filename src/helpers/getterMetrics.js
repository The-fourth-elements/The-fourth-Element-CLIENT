
export const metricData = (title) => {
    return {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            title: {
                display: true,
                text: title,
                fontSize: 18,
                color: '#fff'
            },
            legend: {
                labels: {
                    font: {
                        size: 22,
                        color: 'white'
                    },
                },
            },
        },
    }
}

export const setData = (labels, titleLabel, datas) => {
    return {
        labels: labels,
        datasets: [
            {
                label: titleLabel,
                data: datas,
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
}