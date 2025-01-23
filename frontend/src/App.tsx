import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { CACHE_EXPIRATION } from './utils/constants'

import Skeleton from './components/Skeleton'
import Nav from './components/Nav'

const OverviewPage = lazy(() => import('./pages/OverviewPage'))
const FleetPage = lazy(() => import('./pages/FleetPage'))
const ShipyardPage = lazy(() => import('./pages/ShipyardPage'))
const FactionsPage = lazy(() => import('./pages/FactionsPage'))
const AgentPage = lazy(() => import('./pages/AgentPage'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_EXPIRATION,
    },
  },
})

const App = () => {
  const { pathname } = useLocation()
  const currentPath = pathname.split('/')[1]

  return (
    <div className="px-4 pb-12 max-w-[72em] mx-auto">
      <QueryClientProvider client={queryClient}>
        <Nav currentPath={currentPath} />
        <Suspense fallback={<Skeleton />}>
          <Routes>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/agent/" element={<AgentPage />} />
            <Route path="/fleet" element={<FleetPage />} />
            <Route path="/fleet/:id" element={<FleetPage />} />
            <Route path="/shipyard" element={<ShipyardPage />} />
            <Route path="/shipyard/:id" element={<ShipyardPage />} />
            <Route path="/factions" element={<FactionsPage />} />
            <Route path="/factions/:id" element={<FactionsPage />} />
          </Routes>
        </Suspense>

        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </div>
  )
}

export default App
