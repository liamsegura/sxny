import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useShips, useAvailableShips, usePurchaseShip } from '../hooks/useShips'

import Card from '../components/Card'
import Cta from '../components/Cta'
import Skeleton from '../components/Skeleton'

const ShipyardPage: React.FC = () => {
  const [selectedShipIndex, setSelectedShipIndex] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const {
    isAvailableShipsLoading: isLoading,
    availableShipsError: hasError,
    availableShips,
    transactions,
    symbol,
  } = useAvailableShips()

  const { ships } = useShips()
  const mutation = usePurchaseShip({
    onSuccess: () => {
      setDisabled(false)
    },
    onError: () => {
      setDisabled(false)
    },
  })

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      setSelectedShipIndex(parseInt(id))
    }
  }, [id])

  const selectedShip = availableShips[selectedShipIndex]

  const handleShipSelect = (index: number) => {
    setSelectedShipIndex(index)
  }

  const handlePurchaseShip = () => {
    mutation.mutate({
      shipType: availableShips[selectedShipIndex].type,
      waypointSymbol: symbol,
    })
    setDisabled(true)
  }

  if (isLoading || hasError) {
    return <Skeleton />
  }

  return (
    <div
      className={`flex flex-col md:grid gap-y-4 md:gap-4 grid-cols-1 ${
        transactions ? 'md:grid-cols-4' : 'md:grid-cols-3'
      } md:grid-rows-1 md:min-h-[740px]`}>
      <Card className="col-span-2 row-span-2">
        <div className="flex">
          <div className="flex flex-col items-center justify-center w-full">
            <div
              className="w-full min-h-[308px] md:min-h-[408px]"
              style={{
                backgroundImage: `url(/${selectedShipIndex + 2}.png)`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            {selectedShip && (
              <div className="flex flex-row justify-center w-full md:justify-start">
                <div className="flex flex-col gap-4 text-sm text-gray-400">
                  <div className="flex items-start">
                    <div>
                      <p className="mb-4 text-white">
                        {selectedShip.name.toUpperCase()} -{' '}
                        {selectedShip.purchasePrice} BTC
                      </p>
                      <p className="md:max-w-[80%]">
                        {selectedShip.description}
                      </p>
                    </div>

                    {ships.length > 4 ? (
                      <Cta.SmallButton
                        text="Owned"
                        href="/fleet"
                        className="flex justify-center"
                      />
                    ) : (
                      <Cta.PurchaseButton
                        text={`${!disabled ? 'Purchase' : 'Purchasing'}`}
                        {...(!disabled && { onClick: handlePurchaseShip })}
                      />
                    )}
                  </div>
                  <div className="flex gap-4">
                    {/* unfortulately, this data isn't varied in the API */}
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

      <Card title="Available Ships" className="col-span-1 row-span-2">
        <div className="flex justify-center md:justify-start">
          <ul className="flex flex-col w-full">
            {availableShips.map((ship, index) => (
              <li
                key={index}
                onClick={() => handleShipSelect(index)}
                className={`
                  flex flex-col items-center 
                  border-b border-white border-opacity-20 
                  py-4 w-full cursor-pointer 
                  ${selectedShipIndex === index ? 'bg-[#161616]' : ''}
                `}>
                <p>{ship.name}</p>
                <p className="text-sm text-gray-400">
                  Price: {ship.purchasePrice} BTC
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Card>
      {transactions && (
        <Card title="Latest Transactions" className="col-span-1 row-span-2">
          <div className="flex flex-col items-start justify-center w-full gap-4">
            {transactions
              .reverse()
              .slice(0, 8)
              .map((transaction, index) => (
                <ul key={index} className="flex flex-col text-sm text-gray-400">
                  <li>{transaction.timestamp.slice(0, 10)}</li>
                  <li>- {transaction.price} BTC</li>
                </ul>
              ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export default ShipyardPage
