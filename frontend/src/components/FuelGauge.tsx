import React from 'react'

import { Fuel } from '../types'

const FuelGauge: React.FC<{ fuel: Fuel }> = ({ fuel }) => {
  // don't have much interesting data to work with here so adding 20 to consumed fuel to make it more interesting

  const consumedPercentage = (fuel.consumed.amount / fuel.capacity) * 100 + 20
  const remainingFuel = fuel.capacity - fuel.consumed.amount + 20

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="relative w-5  h-40 border-2 border-black bg-white">
        <div
          className="absolute top-0 left-0 w-full bg-gray-400"
          style={{
            height: `${consumedPercentage}%`,
            transition: 'height 0.5s ease-in-out',
          }}
        />

        <div
          className="absolute bottom-0 left-0 w-full bg-white"
          style={{
            height: `${100 - consumedPercentage}%`,
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-between text-[0.5rem] text-black">
          <p className="mt-1 z-10">{remainingFuel.toFixed(0)}</p>
          <p className="mb-1 z-10">{fuel.capacity}</p>
          <p className="z-10">{fuel.consumed.amount}L</p>
        </div>
      </div>
    </div>
  )
}

export default FuelGauge
