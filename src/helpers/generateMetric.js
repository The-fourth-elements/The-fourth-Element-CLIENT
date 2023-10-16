export const generateMetric = (arrayKeyValue, title) => {
    const byAge = Object.keys(arrayKeyValue);
    let transformed = [];
    if (byAge[0]?.includes('menor')) {
        transformed = byAge?.map((t) => {
            const last = t.substring(5);
            const start = 'M' + t.substring(1, 5) + 'es de ';
            return start + last
        })
    }

    return [
        {
            labels: transformed.length > 0 ? transformed : Object.keys(arrayKeyValue),
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