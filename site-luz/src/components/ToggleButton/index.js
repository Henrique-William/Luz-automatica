import React from 'react';
import { useState } from 'react';
import './toggle.css';

const ToggleButton = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(prevState => {
            const newState =!prevState;
            console.log('Toggle State:', newState);
            return newState
        });
      };

  return (
    <label className='toggle'>
        <input type='checkbox' 
        checked={isChecked}
        onChange={handleToggle}
        />
        <span className='slider'/>
    </label>
  )
}

export default ToggleButton;
