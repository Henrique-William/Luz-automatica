import React from 'react'
import './home.css'
import ToggleButton from '../../components/ToggleButton'
import Button from '../../components/Button'
import { Consumo } from '../../components/Consumo'

export default function Home() {
  return (
    <div className='home'>
      {/* Area de consumo */}

      <section className="consumo">
      
        <Consumo />
      </section>

      {/* Botões principais */}
      <section className="botoes">
          <Button/>
      </section>

    {/* Toggle Button */}
      <section className="luz">
          <div className="luz__container">
              <p className='luz__titulo'>Luz-Automatica </p>
              <ToggleButton/>
          </div>
      </section>
    </div>
  )
}
