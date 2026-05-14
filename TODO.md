1.  dockerize and using nginx as the middleman (if you want)
2.  implement the environment variables as AI told me:
    Frontend (Vite project): # .env.development
    VITE_API_URL=http://localhost:3001/api

        # .env.production
        VITE_API_URL=https://myapp.fly.dev/api

        No dotenv needed, Vite reads them automatically
        npm run dev picks up .env.development
        npm run build picks up .env.production
        Values get baked into the bundle at build time
        Only VITE_ prefixed variables, nothing secret

        Backend (Node/Express project):
        # .env
        DATABASE_URL=mongodb://...
        JWT_SECRET=supersecret
        PORT=3001
        jsrequire('dotenv').config()  // you DO need dotenv here
        process.env.JWT_SECRET      // now accessible

3.  use react-error-boundary for error boundary
4.  404 is always url error which should be handled by frontend and shound not return anything by backend. If user goes to wrong post id for exampl ebackend should return 404 (url errror) and reutn nothing status(404).end(). If the error is 400 related then return error object (key error)
5.  console log errors in backend to save time from debuggin and if you want add custome logger. About logging:
    So far we have been using console.log and console.error to print different information from the code. However, this is not a very good way to do things. Let's separate all printing to the console to its own module utils/logger.js:

const info = (...params) => {
console.log(...params)
}

const error = (...params) => {
console.error(...params)
}

module.exports = { info, error }copy
The logger has two functions, info for printing normal log messages, and error for all error messages.

Extracting logging into its own module is a good idea in several ways. If we wanted to start writing logs to a file or send them to an external logging service like graylog or papertrail we would only have to make changes in one place. 6. separate app in index and app js
The contents of the index.js file used for starting the application gets simplified as follows:

const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
logger.info(`Server running on port ${config.PORT}`)
})

7. implement tests in backend using note tests or vitest, Let's use the supertest package to help us write our tests for testing the API.
8. "start": "NODE_ENV=production node index.js",
   "dev": "NODE_ENV=development node --watch index.js",
   "test": "NODE_ENV=test node --test",
