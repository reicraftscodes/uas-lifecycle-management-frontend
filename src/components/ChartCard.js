import React from 'react'
function Chart({ children, title }) {
  return (
    <div className="chartDiv" style={{width: "90%"}}>
      <p className="chartTitle">{title}</p>
      {children}
    </div>
  )
}

export default Chart
