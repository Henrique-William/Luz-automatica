import React, { useState } from 'react';
import './button.css';
import { db } from '../../firebase';  // Certifique-se de que o caminho está correto
import { ref, update } from 'firebase/database';

const Button = () => {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = () => {
    setIsPressed(prevState => {
        const button = !prevState;
        console.log(button);
        sendDataToFirebaseButton(button);
        return button;
    });
    };

    const sendDataToFirebaseButton = async (state) => {
    try {
        await update(ref(db, 'luz'), {
        button: state,
        });
        console.log('Data sent to Firebase successfully');
    } catch (error) {
        console.error('Error sending data to Firebase:', error);
    }
    };


//   HTML

    return (
        <div 
            className={`botoes__botao ${isPressed ? 'pressionado' : ''}`} 
            onClick={handleClick}>
            <div>
                <img 
                    src={isPressed ? 'imagens/lamp_full.png' : 'imagens/lamp.png'}
                    alt='icone de lampada'
                    className={`botoes__icone ${isPressed ? 'botao_apertado' : ''}`}
                />    
            </div>
        </div>
    );
}

export default Button;
