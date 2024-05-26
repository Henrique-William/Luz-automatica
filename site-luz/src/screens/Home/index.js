import React from 'react'
import './home.css'
import ToggleButton from '../../components/ToggleButton'

export default function Home() {
  return (
    <div>
      {/* Botões principais */}
      <section className="botoes">
          <div className="botoes__botao pressionado">
              
          </div>
          <div className="botoes__botao">
              
          </div>
          <div className="botoes__botao">
              
          </div>
      </section>
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
