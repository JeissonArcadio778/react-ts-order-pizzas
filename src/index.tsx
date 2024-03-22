/**
 * Archivo principal de la aplicación.
 * 
 * Este archivo renderiza el componente principal de la aplicación en el elemento con el id 'root'.
 * También llama a la función reportWebVitals para medir el rendimiento de la aplicación.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// Aquí puedes llamar a reportWebVitals si es necesario

reportWebVitals();
