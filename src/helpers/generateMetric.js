export const generateMetric = (arrayKeyValue, title) => {
    return [
        {
            labels: Object.keys(arrayKeyValue),
            datasets: [
                {
                    label: 'Número de Usuarios por País',
                    data: Object.values(arrayKeyValue),
                },
            ],
        },
        {
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
    ]
}