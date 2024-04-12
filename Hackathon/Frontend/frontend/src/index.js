import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Greeting from './Greeting';
import {Slider} from "@nextui-org/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Greeting/>
    <Slider 
      label="Temperature" 
      step={0.01} 
      maxValue={1} 
      minValue={0} 
      defaultValue={0.4}
      className="max-w-md"
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
