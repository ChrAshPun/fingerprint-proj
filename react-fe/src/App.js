import './App.scss';
import fingerprintPNG from '../src/assets/images/small-FP.png';
import introPNG from '../src/assets/images/digital-ocean-intro.jpeg';
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
      fetch('https://christinapunla.dev/fingerprint/api/post/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: data?.requestId }),
      })
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(data => setRequestIdEvent(JSON.stringify(data, null, 2)))
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
    <div className="app">
      <header className="header-top">
        <img src={fingerprintPNG} alt="small-FP.png" />
      </header>
      <header className="header-bottom"></header>
      <article className="article">
        <header>
          <h1>Fingerprint</h1>
          <p className='description'>My guide on how to install, integrate, and utilize Fingerprint.</p>
          <p className='by'>by Christina Punla</p>
          <p className='occupation'>Jr Customer Success Engineer</p>
          <img src={introPNG} alt="digital-ocean-intro.jpeg"/>
        </header>
        <div className="grid">
          <section className="main-window">
            <h1>JavaScript Agent</h1>
            <p className="reference">Documentation: <span className="italic">https://dev.fingerprint.com/docs/js-agent</span></p>
            <p className="information">
              The Fingerprint Platform JavaScript browser SDK. The JavaScript Agent is a client-side 
              agent that collects and sends device and browser signals to the Fingerprint Platform API 
              for processing, identification, and bot detection. The agent is primarily used for requesting 
              a visitorId and a requestId. The agent requires a web browser to work and should be integrated 
              into frontend of your application.
            </p>
            <h2>Requirements</h2>
            <p className="information">
              You need an active Fingerprint plan in order to use the JavaScript Agent and communicate with the
              Fingerprint API endpoints. When you create a Fingerprint account, you will be given your own a 
              <span className="medium"> public API key</span> and <span className="medium">secret API key</span>. 
              The keys are available in your Fingerprint dashboard.
            </p> 
            <p className="information">
              The <span className="medium">public API key</span> is used for importing the latest version of Fingerprint from 
              the CDN to your application and initializing the JavaScript Agent.
            </p> 
            <p className="information">  
              The <span className="medium">secret API key</span> is used by your application's backend to request Smart Signals 
              from the Server API Endpoint.
            </p>
            <h2>Installing the agent</h2>
            <p className="information">
              There are multiple ways to install the JavaScript Agent into your frontend application. Both the  
              <span className="medium"> CDN method</span> and <span className="medium">NPM method</span> communicate with 
              the Fingerprint CDN in order to download the latest version of Fingerprint before initializing an instance
              of the JavaScript agent.
            </p>
            <h3>CDN</h3>
            <p className="information">
              The easiest method. Import the JS agent by using <span className="method">import()</span> 
              with your public API key, and then use the <span className="method">load()</span> method 
              to initialize an agent instance.
            </p>
            <pre className="code-bg"> 
              <code>
                &lt;script&gt;<br />
                &emsp;// Initialize the agent once at web application startup.<br />
                &emsp;// Alternatively initialize as early on the page as possible.<br />
                &emsp;const fpPromise = import('https://fpjscdn.net/v3/your-public-api-key')<br />
                &emsp;&emsp;.then(FingerprintJS =&gt; FingerprintJS.load())<br /><br />
                &emsp;// Analyze the visitor when necessary.<br />
                &emsp;fpPromise<br />
                &emsp;&emsp;.then(fp =&gt; fp.get())<br />
                &emsp;&emsp;.then(result =&gt; console.log(result.requestId, result.visitorId))<br />
                &lt;/script&gt;
              </code>
            </pre>
            <h3>NPM</h3>
            <p className="information">
              When you call <span className="method">FingerprintJS.load()</span> with your public API key, 
              the NPM package connects to the Fingerprint CDN and downloads the latest fingerprinting logic at runtime.<br /><br />
              Install the NPM package: <span className="method">npm install @fingerprintjs/fingerprintjs-pro</span><br /><br />
              Import the package and initialize an instance of the JavaScript Agent: <span className="method">import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'</span>
            </p>
            <pre className="code-bg"> 
              <code>
              // Initialize an agent at application startup.<br />
              {`const fpPromise = FingerprintJS.load({ apiKey: 'your-public-api-key'})`}<br /><br />

              // Analyze the visitor when necessary.<br />
              fpPromise<br />
              &emsp;.then(fp =&gt; fp.get())<br />
              &emsp;.then(result =&gt; console.log(result.requestId, result.visitorId))
              </code>
            </pre>
            <h3>Initializing the Agent</h3>
            <p className="information">
              The agent has 2 methods: <span className="method">load()</span> and <span className="method">get()</span>.
            </p>
            <p className="information">
              The <span className="method">load()</span> method returns a promise that resolves to an agent instance. 
            </p>
            <pre className="code-bg"> 
              <code>{`const fpPromise = FingerprintJS.load({ apiKey: 'your-public-api-key'})`}</code>
            </pre>
            <p className="information">
              If you are using the NPM integration method, the public API key must be passed into 
              the <span className="method">load()</span> method.
            </p>
            <pre className="code-bg"> 
              <code>
                const fpPromise = import('https://fpjscdn.net/v3/your-public-api-key')<br />
                &emsp;.then(FingerprintJS =&gt; FingerprintJS.load())
              </code>
            </pre>
            
            <p className="information">
              Once you have JS agent instance promise, you can call the <span className="method">get()</span> 
              method to send an identification request to the Fingerprint API.
            </p>
            
         
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
          </section>
          <div className="table-contents">
            <p className="title">TABLE OF CONTENTS</p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default App;
