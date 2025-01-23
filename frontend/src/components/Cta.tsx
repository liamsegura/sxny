import React from 'react'

import { CtaProps } from '../types'
import { Link } from 'react-router-dom'

const Cta: React.FC<CtaProps> & {
  NavAgentButton: React.FC<CtaProps>
  SmallButton: React.FC<CtaProps>
  PurchaseButton: React.FC<CtaProps>
} = ({ href, text, className, children, onClick }) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`hover:bg-[#161616] cursor-pointer ${className}`}>
        {text || children}
      </button>
    )
  }

  return (
    <Link
      to={href || '#'}
      className={`hover:bg-[#161616] cursor-pointer ${className}`}>
      {text || children}
    </Link>
  )
}

const NavAgentCta: React.FC<CtaProps> = ({ href, text, children }) => {
  return (
    <Cta
      href={href}
      text={text}
      className="p-2 text-sm border border-white rounded-lg border-opacity-20">
      {children}
    </Cta>
  )
}

const SmallButtonCta: React.FC<CtaProps> = ({
  href,
  text,
  children,
  className,
}) => {
  return (
    <Cta
      href={href}
      text={text}
      className={`text-xs border border-white border-opacity-20 rounded-lg p-1 ${className}`}>
      {children}
    </Cta>
  )
}

const PurchaseCta: React.FC<CtaProps> = ({ onClick, text, children }) => {
  return (
    <Cta
      text={text}
      onClick={onClick}
      className="p-2 border border-white rounded-lg border-opacity-20">
      {children}
    </Cta>
  )
}

Cta.NavAgentButton = NavAgentCta
Cta.SmallButton = SmallButtonCta
Cta.PurchaseButton = PurchaseCta

export default Cta
