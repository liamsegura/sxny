export interface ApiResponse<T> {
  data: T
  meta?: {
    total?: number
    page?: number
    limit?: number
  }
}
export interface Frame {
  condition: number
  description: string
  fuelCapacity: number
  integrity: number
  moduleSlots: number
  mountingPoints: number
  name: string
  requirements: {
    crew: number
    power: number
  }
  symbol: string
}

export interface Fuel {
  capacity: number
  consumed: {
    amount: number
    timestamp: string
  }
  current: number
}
export interface Ship {
  symbol: string
  cargo: {
    capacity: number
    inventory: CargoItem[]
    units: number
  }
  crew: {
    capacity: number
    current: number
    morale: number
    required: number
    rotation: string
    wages: number
  }
  registration: {
    role: string
    waypoint: string
  }
  nav: {
    systemSymbol: string
    waypointSymbol: string
  }
  fuel: Fuel
  frame: Frame
}

export interface CargoItem {
  symbol: string
  name: string
  units: number
}

interface Traits {
  description: string
  symbol: string
}

export interface Faction {
  symbol: string
  name: string
  description: string
  isRecruiting: boolean
  traits: Traits[]
}

export interface ShipType {
  type: string
}

export interface Transaction {
  shipSymbol: string
  shipType: string
  waypointSymbol: string
  agentSymbol: string
  price: number
  timestamp: string
}

export interface Frame {
  symbol: string
  name: string
  description: string
  moduleSlots: number
  mountingPoints: number
  fuelCapacity: number
  quality: number
  requirements: {
    power: number
    crew: number
  }
  condition: number
  integrity: number
}

export interface Reactor {
  symbol: string
  name: string
  description: string
  powerOutput: number
  quality: number
  requirements: {
    crew: number
  }
  condition: number
  integrity: number
}

export interface Engine {
  symbol: string
  name: string
  description: string
  speed: number
  quality: number
  requirements: {
    power: number
    crew: number
  }
  condition: number
  integrity: number
}

export interface Module {
  symbol: string
  name: string
  description: string
  capacity?: number
  requirements: {
    crew: number
    power: number
    slots: number
  }
}

export interface Mount {
  symbol: string
  name: string
  description: string
  strength: number
  deposits?: string[]
  requirements: {
    crew: number
    power: number
  }
}

export interface ShipForSale {
  type: string
  symbol: string
  name: string
  description: string
  supply: string
  activity: string
  purchasePrice: number
  frame: Frame
  reactor: Reactor
  engine: Engine
  modules: Module[]
  mounts: Mount[]
  crew: {
    required: number
    capacity: number
  }
}

export interface AvailableShips {
  ships: ShipForSale[]
  symbol: string
  shipTypes: ShipType[]
  transactions: Transaction[]
  modificationFee: number
}

export interface CtaProps {
  href?: string
  text?: string
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

export interface Crew {
  capacity: number
  morale: number
  required: number
  rotation: string
  wages: number
}

export interface CardProps {
  title?: string
  cta?: string
  href?: string
  children: React.ReactNode
  className?: string
}

export interface PurchaseShipOptions {
  onSuccess: () => void
  onError: () => void
}
