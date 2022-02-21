import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
export const barLegends = [
  { title: 'Part', color: 'bg-teal-600' },
]
export const barOptions = {
  data: {
    labels: ['Propeller', 'Gimbal', 'Tail', 'Payload Electro Optical', 'Motor', 'Fuselage'],
    datasets: [
      {
        label: 'Parts',
        backgroundColor: '#0694a2',
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [80, 52, 40, 24, 21, 30],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
}
