import React, { useState } from 'react';
import './toggle.css';
import { db } from '../../firebase';  // Certifique-se de que o caminho está correto
import { ref, set } from 'firebase/database';

const ToggleButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(prevState => {
      const ledStatus = !prevState;
      console.log('Toggle State:', ledStatus);
      sendDataToFirebase(ledStatus);
      return ledStatus;
    });
  };

  const sendDataToFirebase = async (state) => {
    try {
      await set(ref(db, 'luz'), {
        ledStatus: state,
      });
      console.log('Data sent to Firebase successfully');
    } catch (error) {
      console.error('Error sending data to Firebase:', error);
    }
  };

  return (
    <label className='toggle'>
      <input 
        type='checkbox' 
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className='slider'/>
    </label>
  );
}

export default ToggleButton;
