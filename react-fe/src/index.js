import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import {
  FpjsProvider
} from '@fingerprintjs/fingerprintjs-pro-react';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FpjsProvider
    // loadOptions={{
    //   apiKey: process.env.REACT_APP_API_KEY,
    //   endpoint: [
    //     "https://metrics.christinapunla.dev", 
    //     FingerprintJS.defaultEndpoint
    //   ],
    //   scriptUrlPattern: [
    //     "https://metrics.christinapunla.dev/web/v<version>/<apiKey>/loader_v<loaderVersion>.js", 
    //     FingerprintJS.defaultScriptUrlPattern
    //   ],
    // }}
    loadOptions={{
      apiKey: "0iwwSDweP6oO9xsHelUC",
      endpoint: [
        "https://christinapunla.dev/EWBHLWOKb8dpfWgg/rbqXP1HWqkT6Vabs",
        FingerprintJS.defaultEndpoint
      ],
      scriptUrlPattern: [
        "https://christinapunla.dev/EWBHLWOKb8dpfWgg/SAP2rSlS5Wnq8XQK?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>",
        FingerprintJS.defaultScriptUrlPattern
      ]
    }}
  >
    <BrowserRouter basename="/fingerprint">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </BrowserRouter>
  </FpjsProvider>
);
