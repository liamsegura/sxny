import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const AgentStatisticsScatterChart = () => {
  // just some random stuff not related to the api, just felt it needed something extra to look cooler basically
  const randomPlaceholderData = [
    { phase: 'Calibration', quantumStability: 95, entanglementLevel: 80 },
    { phase: 'Initial Sync', quantumStability: 85, entanglementLevel: 70 },
    { phase: 'Quantum Flux', quantumStability: 65, entanglementLevel: 55 },
    { phase: 'Resonance Shift', quantumStability: 45, entanglementLevel: 40 },
    {
      phase: 'Critical Divergence',
      quantumStability: 25,
      entanglementLevel: 20,
    },
  ]

  return (
    <div className="w-full flex mt-4">
      <div className="w-full flex flex-col justify-center items-center">
        <ResponsiveContainer className="pt-5" width="100%" height={300}>
          <ScatterChart className="opacity-60">
            <CartesianGrid stroke="#333" />
            <XAxis
              type="category"
              dataKey="phase"
              name="Quantum Phase"
              stroke="#fff"
            />
            <YAxis
              type="number"
              dataKey="quantumStability"
              name="Quantum Stability %"
              stroke="#fff"
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: 'black',
                border: '1px solid white',
              }}
            />
            <Scatter
              name="Quantum Stability"
              data={randomPlaceholderData}
              fill="#fff"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AgentStatisticsScatterChart
