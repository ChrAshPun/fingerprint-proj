import './App.css';
import React, { useState, useEffect } from 'react';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

function App() {
  const [ dataa, setDataa] = useState(null)
  const [ requestIdEvent, setRequestIdEvent] = useState(null)


  const {isLoading, error, data, getData} = useVisitorData(
    {extendedResult: true},
    {immediate: true}
  )

  useEffect(() => {
    const handleSaveData = () => {
      fetch('https://christinapunla.dev/fingerprint/api/get/')
        .then(response => response.text())
        .catch(error => console.error('Error:', error));

      fetch('https://christinapunla.dev/fingerprint/api/post/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: data?.requestId }),
      })
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then((data) => {
          console.log('Data saved successfully');
          console.log(data)
          setRequestIdEvent(JSON.stringify(data, null, 2));
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    
    handleSaveData();
  }, [data?.requestId])

  useEffect(() => {
    if (error) {
      setDataa(JSON.stringify(error))
    } else {
      setDataa(JSON.stringify(data, null, 2))
    }
  }, [data, error])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fingerprint Project</h1>
        <div>
          <h4>Frontend - React</h4>
          <h4>Backend - Express</h4>
        </div>
      </header>
      <div className="Fingerprint-data">
        <button onClick={() => getData({ignoreCache: true})}>
          Reload data
        </button>
      </div>
      <div className="Visitor-ID">
        <p>VisitorId: {isLoading ? 'Loading...' : data?.visitorId}</p>
        <p>Full visitor data:</p>
      </div>
      <div className="columns">
        <div className="flex-item">
          {/* <pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre> */}
          <pre>{ dataa }</pre>
        </div>
        <div className="flex-item">
          {/* <p>{JSON.stringify(requestIdEvent, null, 2)}</p> */}
          <pre>{ requestIdEvent }</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
