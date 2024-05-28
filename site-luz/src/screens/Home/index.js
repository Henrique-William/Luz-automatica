import React from 'react'
import './home.css'
import ToggleButton from '../../components/ToggleButton'
import Button from '../../components/Button'

export default function Home() {
  return (
    <div className='home'>
      {/* Area de consumo */}

      <section className="consumo">
      
        <div className="consumo__container">
          <p className="consumo__moeda">R$</p>              
            <h2 className="consumo__valor">
              21
              <p className="consumo__centavos">,49</p>
            </h2>
        </div>
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
