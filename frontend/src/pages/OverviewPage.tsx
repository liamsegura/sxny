import React, { useState } from 'react'

import { useOverviewData } from '../hooks/useOverviewData'

import Card from '../components/Card'
import Cta from '../components/Cta'
import Skeleton from '../components/Skeleton'
import CrewStatisticsRadarChart from '../components/CrewStatisticsRadarChart'

const OverviewPage: React.FC = () => {
  const [selectedShipIndex, setSelectedShipIndex] = useState(0)

  const { isLoading, hasError, ships, availableShips, factions } =
    useOverviewData()

  const selectedShip = ships[selectedShipIndex]

  const handleShipSelect = (index: number) => {
    setSelectedShipIndex(index)
  }

  if (isLoading || hasError) {
    return <Skeleton />
  }

  return (
    <div className="grid gap-y-4 md:gap-4 grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:min-h-[740px]">
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
            className="w-full border-l border-b border-white border-opacity-20"
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
          <div className="w-full flex mt-4">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-full flex justify-between">
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

      <Card
        title="Local Shipyard"
        cta="View Shipyard"
        href="/shipyard"
        className="col-span-1">
        <ul className="flex flex-col">
          {availableShips.map((ship, index) => (
            <Cta key={ship.name} href={`/shipyard/${index}`}>
              <li className="border-b border-white border-opacity-20 px-2 py-4">
                <p>{ship.name}</p>
                <p className="text-gray-400 text-sm">
                  Price: {ship.purchasePrice} BTC
                </p>
              </li>
            </Cta>
          ))}
        </ul>
      </Card>
      <Card
        title="Trending Factions"
        cta="View Factions"
        href="/factions"
        className="col-span-1">
        <ul className="flex justify-center md:justify-start flex-wrap gap-2 w-full">
          {factions.map((faction, index) => (
            <a
              key={faction.symbol}
              className="hover:bg-[#161616] cursor-pointer w-[48%] md:w-auto"
              href={`/factions/${index}`}>
              <li className="flex flex-col md:w-[166.5px] border border-white border-opacity-20 rounded-lg p-2">
                <h2 className="text-sm">{faction.symbol}</h2>
                <p className="text-sm text-gray-400">
                  {faction.isRecruiting ? 'Recruiting' : 'Not Recruiting'}
                </p>
              </li>
            </a>
          ))}
        </ul>
      </Card>
    </div>
  )
}

export default OverviewPage
