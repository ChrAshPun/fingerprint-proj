import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import {
  FpjsProvider
} from '@fingerprintjs/fingerprintjs-pro-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FpjsProvider
    loadOptions={{
      apiKey: process.env.REACT_APP_API_KEY
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
