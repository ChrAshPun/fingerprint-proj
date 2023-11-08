### Fingerprint Project

I need to host an EC2 instance with React/Express to test out Fingerprint API functionality and such.

Reference article: https://medium.com/free-code-camp/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c

## Mac OS installations

1. Install Node.j on my MacBook from https://nodejs.org/en

2. Create a root project directory named `fingerprint-project`

## Create a React FE

3. Create React app
run `npx create-react-app client`

## Create an Express BE

4. Create Express app
`run express-generator express-be`
`cd express-be`
`npm install`

# Change the default port number

5. Configure Express port number
1. Edit **bin/www** to configure the default port number
2. Change from port `3000` to `9000` to prevent conflict with React
Around line 24
`var port = normalizePort(process.env.PORT || '9000'); app.set('port', port);`

# Create a new route to test the Express API

6. In the **express-be** directory, create a `.js` file in the routes directory
```
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.send('API is working properly');
});
module.exports = router;
```

7. Edit `app.js` to use that testAPI route
```
var testAPIRouter = require("./routes/testAPI");
app.use('/testAPI', testAPIRouter);
```

8. Test `http://localhost:9000/testAPI` on browser

# Attempt to make a fetch request from the FE to the BE

9. Add `fetch` request to `App.js`
```
  useEffect(() => {
    fetch('http://localhost:9000/testAPI')
      .then(res => res.text())
      .then(res => setExpressData(res))
      .catch(error => console.error(error));
  }, []);
```

The CORS error should come up if you check the browser console.

# Install CORS to enable cross-origin requests

**What are origins in context to CORS?**
From ChatGPT:
In the context of the "Access-Control-Allow-Origin" header and Cross-Origin Resource Sharing (CORS), "origins" refer to the domains that are allowed to make requests to the server's API.

8. Install CORS to **express-be** to allow cross-origin requests
In express-be directory, run `npm install --save cors`

## Integrate Fingerprint into the React FE

1. `npm install @fingerprintjs/fingerprintjs-pro-react`
2. Edit index.js
```
import {
  FpjsProvider
} from '@fingerprintjs/fingerprintjs-pro-react'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FpjsProvider
      loadOptions={{
        apiKey: { key here }
      }}
    >
      <App />
    </FpjsProvider>
  </React.StrictMode>
)
```
3. Use visitorData hook
```
// src/App.jsx
import {useVisitorData} from '@fingerprintjs/fingerprintjs-pro-react'

export default function Home() {
  const {isLoading, error, data, getData} = useVisitorData(
    {extendedResult: true},
    {immediate: true}
  )

  return (
    <div>
      <button onClick={() => getData({ignoreCache: true})}>
        Reload data
      </button>
      <p>VisitorId: {isLoading ? 'Loading...' : data?.visitorId}</p>
      <p>Full visitor data:</p>
      <pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro