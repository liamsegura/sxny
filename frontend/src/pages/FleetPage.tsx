import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useFleetData } from '../hooks/useFleetPageData'

import Card from '../components/Card'
import Cta from '../components/Cta'
import Skeleton from '../components/Skeleton'
import CrewStatisticsRadarChart from '../components/CrewStatisticsRadarChart'
import FuelGauge from '../components/FuelGauge'

const FleetPage: React.FC = () => {
  const [selectedShipIndex, setSelectedShipIndex] = useState(0)

  const { isLoading, hasError, ships, availableShips } = useFleetData()

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      setSelectedShipIndex(parseInt(id))
    }
  }, [id])

  const selectedShip = ships[selectedShipIndex]

  const handleShipSelect = (index: number) => {
    setSelectedShipIndex(index)
  }

  if (isLoading || hasError) {
    return <Skeleton />
  }

  return (
    <div className="flex flex-col md:grid gap-y-4 md:gap-4 grid-cols-1 md:grid-cols-4 md:grid-rows-2 md:min-h-[740px]">
      <Card title="Current Fleet" className="col-span-1 row-span-2">
        <div className="flex justify-center md:justify-start">
          <ul className="w-3/4 border-white md:w-full md:border-r border-opacity-20">
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
        </div>
      </Card>

      <Card className="col-span-2 row-span-2">
        <div className="flex">
          <div className="flex flex-col items-center justify-center w-full">
            <div
              className="w-full min-h-[308px] md:min-h-[408px]"
              style={{
                backgroundImage: `url(/${selectedShipIndex}.png)`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            {selectedShip && (
              <div className="flex flex-row justify-center w-full md:justify-start">
                <FuelGauge fuel={selectedShip.fuel} />
                <div className="flex flex-col gap-4 text-sm text-gray-400">
                  <p className="text-white">{selectedShip.registration.role}</p>
                  <p className="md:max-w-[80%]">
                    {selectedShip.frame.description}
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <p className="mb-4 text-white ">CHASSIS</p>
                      <p>Frame: {selectedShip.frame.name}</p>
                      <p>Condition: {selectedShip.frame.condition}</p>
                      <p>Integrity: {selectedShip.frame.integrity}</p>
                      <p>Fuel Capacity: {selectedShip.frame.fuelCapacity}</p>
                      <p>Module Slots: {selectedShip.frame.moduleSlots}</p>
                      <p>
                        Mounting Points: {selectedShip.frame.mountingPoints}
                      </p>
                    </div>
                    <div>
                      <p className="mb-4 text-white">REQUIREMENTS</p>
                      <p>Crew: {selectedShip.frame.requirements.crew}</p>
                      <p>Power: {selectedShip.frame.requirements.power}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card title="Crew Statistics" className="col-span-1">
        {selectedShip && (
          <div className="flex w-full">
            <div className="flex flex-col items-center justify-center w-full">
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
              <li className="px-2 py-4 border-b border-white border-opacity-20">
                <p>{ship.name}</p>
                <p className="text-sm text-gray-400">
                  Price: {ship.purchasePrice} BTC
                </p>
              </li>
            </Cta>
          ))}
        </ul>
      </Card>
    </div>
  )
}

export default FleetPage
