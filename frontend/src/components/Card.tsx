import Cta from './Cta'

import { CardProps } from '../types'

const Card: React.FC<CardProps> = ({
  title,
  cta,
  href,
  children,
  className = '',
}) => {
  return (
    <div
      className={` rounded-lg shadow-lg p-4 border border-white border-opacity-20 h-full ${className}`}>
      <div className="flex items-start justify-between">
        <h2 className="text-sm font-semibold text-gray-400 pb-7">{title}</h2>
        {cta && <Cta.SmallButton href={href} text={cta} />}
      </div>
      <div className="mt-2 flex flex-col justify-start h-[90%]">{children}</div>
    </div>
  )
}

export default Card
