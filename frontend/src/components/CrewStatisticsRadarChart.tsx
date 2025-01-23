import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

import { Crew } from '../types'

const CrewStatisticsRadarChart = ({ crew }: { crew: Crew }) => {
  const { capacity, morale, required, wages } = crew

  // crew data is mostly 0 from the api, so i'm set some default values to make the chart look nice
  const data = [
    { subject: 'Capacity', value: capacity === 0 ? 50 : capacity },
    { subject: 'Morale', value: morale === 0 ? 20 : morale },
    { subject: 'Required', value: required === 0 ? 10 : required },
    { subject: 'Wages', value: wages === 0 ? 10 : wages },
  ]
  return (
    <div className="w-full max-w-md">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid className="opacity-40" />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            className="opacity-40"
          />
          <Radar
            dataKey="value"
            stroke="white"
            fill="white"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CrewStatisticsRadarChart
