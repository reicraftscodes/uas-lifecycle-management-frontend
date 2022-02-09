import React from 'react'


import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'

import { MailIcon } from '../icons'
import ChartCard from "../components/Chart/ChartCard";
import {Bar, Doughnut, Line} from "react-chartjs-2";
import {
  barLegends,
  barOptions,
  doughnutLegends,
  doughnutOptions,
  lineLegends,
  lineOptions
} from "../utils/demo/chartsData";
import ChartLegend from "../components/Chart/ChartLegend";

function Locations() {
  return (
    <>
      <PageTitle>Locations</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Doughnut">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Lines">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Bars">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div>
    </>
  )
}

export default Locations
