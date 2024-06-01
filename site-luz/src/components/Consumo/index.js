import React, { useState, useEffect } from 'react';
import './consumo.css';
import { db } from '../../firebase';  // Certifique-se de que o caminho está correto
import { ref, onValue } from 'firebase/database';

export const Consumo = () => {
  const [consumo, setConsumo] = useState(0);
  const [centavos, setCentavos] = useState(0);

  const calculateConsumption = (ledSegundos) => {
    const consumoTotal = ledSegundos * 0.00000194;
    const [reais, centavos] = consumoTotal.toFixed(2).split('.');
    setConsumo(reais);
    setCentavos(centavos);
  };

  useEffect(() => {
    const ledSegundosRef = ref(db, '/luz/segundosLed');

    const fetchData = async () => {
      onValue(ledSegundosRef, (snapshot) => {
        if (snapshot.exists()) {
          const ledSegundos = snapshot.val();
          calculateConsumption(ledSegundos);
        } else {
          console.error('No data available at the specified path.');
        }
      }, (error) => {
        console.error('Error fetching data from Firebase:', error);
      });
    };

    fetchData();

    const intervalId = setInterval(fetchData, 43200000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="consumo__container">
      <p className="consumo__moeda">R$</p>              
      <h2 className="consumo__valor">
        {consumo}
        <p className="consumo__centavos">,{centavos}</p>
      </h2>
    </div>
  );
};

export default Consumo;
