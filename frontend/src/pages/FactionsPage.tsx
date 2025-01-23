import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useFactions } from '../hooks/useFactions'

import Card from '../components/Card'
import Skeleton from '../components/Skeleton'

const FactionsPage: React.FC = () => {
  const [selectedFactionIndex, setSelectedFactionIndex] = useState(0)
  const { factions, isFactionsLoading, factionsError } = useFactions()

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      setSelectedFactionIndex(parseInt(id))
    }
  }, [id])

  const selectedFaction = factions[selectedFactionIndex]

  const handleFactionSelect = (index: number) => {
    setSelectedFactionIndex(index)
  }

  if (isFactionsLoading || factionsError) {
    return <Skeleton />
  }

  return (
    <div className="flex flex-col md:grid gap-y-4 md:gap-4 grid-cols-1 md:grid-cols-3 md:grid-rows-2 md:min-h-[740px]">
      <Card title="Trending Factions" className="col-span-1 row-span-2 h-full">
        <div className="flex justify-center md:justify-start">
          <ul className="w-3/4 md:w-full">
            {factions.map((faction, index) => (
              <li
                key={index}
                onClick={() => handleFactionSelect(index)}
                className={`
                  flex flex-col items-start 
                  border-b border-white border-opacity-20 
                  p-4 w-full cursor-pointer 
                  ${selectedFactionIndex === index ? 'bg-[#161616]' : ''}
                `}>
                <p>{faction.symbol}</p>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card className="col-span-2 row-span-2">
        <div className="flex">
          <div className="flex flex-col items-center justify-center w-full">
            {selectedFaction && (
              <div className="w-full flex flex-row justify-center md:justify-start">
                <div className="flex flex-col gap-4 text-gray-400 text-sm">
                  <p className="text-white">
                    {selectedFaction.symbol} - {selectedFaction.name}
                  </p>
                  <p className="md:max-w-[80%]">
                    {selectedFaction.description}
                  </p>
                  <p className="text-white">
                    RECRUITING - {selectedFaction.isRecruiting ? 'YES' : 'NO'}
                  </p>

                  <div className="flex gap-4">
                    <div>
                      <p className="text-white">TRAITS</p>
                      <div className="md:grid grid-cols-2 gap-2">
                        {selectedFaction.traits.map((trait, index) => (
                          <div key={index}>
                            <p className="my-4">{trait.symbol}</p>
                            <p>{trait.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default FactionsPage
