import React, { useState } from 'react'

import { useAgentPage } from '../hooks/useAgentPage'

import Card from '../components/Card'
import Cta from '../components/Cta'
import Skeleton from '../components/Skeleton'
import CrewStatisticsRadarChart from '../components/CrewStatisticsRadarChart'
import AgentStatisticsScatterChart from '../components/AgentStatisticsScatterChart'

const AgentPage: React.FC = () => {
  const [selectedShipIndex, setSelectedShipIndex] = useState(0)

  const { ships, agentData, isLoading, hasError } = useAgentPage()

  const selectedShip = ships[selectedShipIndex]

  const handleShipSelect = (index: number) => {
    setSelectedShipIndex(index)
  }

  if (isLoading || hasError) {
    return <Skeleton />
  }

  return (
    <div className="grid gap-y-4 md:gap-4 grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:min-h-[740px]">
      <Card title="Agent Data" href="/fleet" className="col-span-1 row-span-2">
        <div className="flex">
          <ul className="flex flex-col w-3/4 gap-4 md:w-1/3">
            <p className="py-4 border-b border-white border-opacity-20">
              {agentData.symbol.toUpperCase()}
            </p>
            <p className="py-4 border-b border-white border-opacity-20">
              {agentData.accountId.slice(0, 10).toUpperCase()}
            </p>
            <p className="py-4 border-b border-white border-opacity-20">
              {agentData.credits} BTC
            </p>
            <p className="py-4 border-b border-white border-opacity-20">
              {agentData.headquarters}
            </p>
            <p className="py-4 border-b border-white border-opacity-20">
              {agentData.startingFaction}
            </p>
          </ul>

          <div
            className="w-full border border-l border-white border-opacity-20"
            style={{
              backgroundImage: `url(/agent.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '308px',
            }}
          />
        </div>

        <AgentStatisticsScatterChart />
      </Card>
      <Card
        title="Current Fleet"
        cta="View Fleet"
        href="/fleet"
        className="col-span-1 row-span-2">
        <div className="flex">
          <ul className="w-3/4 md:w-1/3">
            {ships.slice(0, 4).map((ship, index) => (
              <li
                key={ship.symbol}
                onClick={() => handleShipSelect(index)}
                className={`
                  flex flex-col items-center 
                  border-b border-white border-opacity-20 
                  py-4 w-full cursor-pointer 
                  ${selectedShipIndex === index ? 'bg-[#161616]' : ''}
                `}>
                <p>{ship.registration.role}</p>
                <p className="text-sm text-gray-400">
                  Cargo Cap: {ship.cargo.capacity}
                </p>
              </li>
            ))}
          </ul>

          <div
            className="w-full border-b border-l border-white border-opacity-20"
            style={{
              backgroundImage: `url(/${selectedShipIndex}.png)`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '308px',
            }}
          />
        </div>

        {selectedShip && (
          <div className="flex w-full mt-4">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex justify-between w-full">
                <p className="text-sm text-gray-400">Crew Statistics</p>
                <Cta.SmallButton
                  href={`/fleet/${selectedShipIndex}`}
                  text={`View ${selectedShip.registration.role}`}
                />
              </div>
              <CrewStatisticsRadarChart crew={selectedShip.crew} />
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default AgentPage
