import './App.css';
import React, { useState, useEffect } from 'react';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'


function App() {
  const [expressData, setExpressData] = useState([]);

  const {isLoading, error, data, getData} = useVisitorData(
    {extendedResult: true},
    {immediate: true}
  )

  useEffect(() => {
    // testing the Express API
    fetch('http://localhost:9000/testAPI')
      .then(res => res.text())
      .then(res => setExpressData(res))
      .catch(err => console.error(err));
    
    FingerprintJS.load({ apiKey: process.env.REACT_APP_API_KEY })
      .then((fpPromise) => {
        console.log(fpPromise); // returned an obj with a get method
        return fpPromise.get();
      })
      .then((getPromise) => {
        console.log(getPromise);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fingerprint Project</h1>
        <p>From Express Server: { expressData }</p>
        <div>
          <h4>Frontend - React</h4>
          <h4>Backend - Express</h4>
        </div>
      </header>
      <div className="Fingerprint-data">
        <button onClick={() => getData({ignoreCache: true})}>
          Reload data
        </button>
        <div className="Visitor-ID">
          <p>VisitorId: {isLoading ? 'Loading...' : data?.visitorId}</p>
          <p>Full visitor data:</p>
        </div>
        <pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;