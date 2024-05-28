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
    // Reference to the Firebase path
    const ledSegundosRef = ref(db, '/luz/segundosLed');

    // Function to fetch data initially and every 30 seconds
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

    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 30 seconds (30000 milliseconds)
    const intervalId = setInterval(fetchData, 43200000);

    // Clean up the interval on component unmount
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
