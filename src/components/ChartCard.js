import React from 'react'
import { Chart as ChartJS } from 'react-chartjs-2'
function Chart({ children, title }) {
  return (
    <div className="chartDiv">
      <p className="chartTitle">{title}</p>
      {children}
    </div>
  )
}

export default Chart
