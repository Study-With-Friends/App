import React from 'react';
import Chart from 'react-apexcharts';

const Pulse = (props) => {
    const options = {
        chart: {
            parentHeightOffset: 0,
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: true,
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                type: "vertical",
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [45, 100]
              },
        },
        xaxis: {
            crosshairs: {
                width: 1,
            },
        },
        stroke: {
            width: 2,
            curve: 'smooth',
        },
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return ''
                    }
                }
            },
            marker: {
                show: false
            }
        },
        colors: props.colors || ['#7FD390'],
    };
    const type = props.type || 'area';
    const series = [{ name: props.name || 'Data', data: props.data || [] }];

    return (

        <div>
            <div className="align-self-center">
                <Chart className="apex-charts" options={options} series={series} type={type} height={45} width={90} />
            </div>
        </div>
    );
};

export default Pulse;