import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAgent } from '../hooks/useAgent'

import { upperCaseFirstLetter } from '../utils/upperCaseFirstLetter'

import Cta from './Cta'

function Nav({ currentPath }: { currentPath: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const { agentData, isAgentLoading, agentError } = useAgent()

  const nav = ['overview', 'fleet', 'shipyard', 'factions']

  if (agentError) {
    console.error('error:', agentError)
  }

  return (
    <>
      <nav className="flex items-center justify-between md:justify-start gap-6 w-full p-4 border-b border-white border-opacity-20">
        <Link to="/overview">
          <h1 className="text-xl font-semibold">SXNY.</h1>
        </Link>
        <button
          className="block md:hidden z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu">
          <div
            className={`h-1 w-6 bg-white my-1 transition-transform duration-300 ${
              menuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <div
            className={`h-1 w-6 bg-white my-1 transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <div
            className={`h-1 w-6 bg-white my-1 transition-transform duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2.5' : ''
            }`}
          />
        </button>

        {/* desktop */}
        <ul className="hidden md:flex items-center justify-between gap-6 w-full">
          <div className="flex items-center gap-4">
            {nav.map((item, index) => (
              <li
                className={`${item === currentPath ? 'underline' : ''}`}
                key={index}>
                <Link to={`/${item}`}>{upperCaseFirstLetter(item)}</Link>
              </li>
            ))}
          </div>
          <li>
            {isAgentLoading ? (
              <div className="rounded-lg skeleton h-7 w-32" />
            ) : (
              <Cta.NavAgentButton
                href="/agent"
                text={`AGENT: ${agentData.symbol.toUpperCase()}`}
                className="rounded-lg border border-white border-opacity-20 p-2 text-sm"
              />
            )}
          </li>
        </ul>
      </nav>

      {/* mobile */}
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-black text-white z-40 transform transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <ul className="flex flex-col items-end pt-20 px-12 justify-start h-full gap-8 text-xl">
          {nav.map((item, index) => (
            <li key={index}>
              <a
                href={`/${item}`}
                className="hover:text-gray-400"
                onClick={() => setMenuOpen(false)}>
                {upperCaseFirstLetter(item)}
              </a>
            </li>
          ))}
          <li className="content-start">
            {isAgentLoading ? (
              <div className="rounded-lg skeleton h-8 w-32" />
            ) : (
              <>
                <div onClick={() => setMenuOpen(false)}>
                  <Cta.NavAgentButton
                    href="/agent"
                    text={`AGENT: ${agentData.symbol.toUpperCase()}`}
                  />
                </div>
              </>
            )}
          </li>
        </ul>
      </div>

      <div className="w-full flex justify-between items-center py-8 px-4">
        <h1 className="text-xl">{upperCaseFirstLetter(currentPath)}</h1>
        <div className="flex flex-col justify-center items-end">
          {isAgentLoading ? (
            <div className="rounded-lg skeleton h-10 w-20" />
          ) : (
            <>
              <p className="text-sm text-gray-400">
                {agentData?.accountId.toUpperCase().slice(0, 8)}
              </p>
              <p className="text-sm text-gray-400">{agentData?.credits} BTC</p>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Nav
{
}
