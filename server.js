const express = require('express')
const helmet = require('helmet');
const compression = require('compression')
const { morganLogger } = require(`${__dirname}/models/logger`)
require('dotenv').config();

// Express setting
const app = express();
app.use(helmet());
app.use(compression())
app.use(express.json());
/* CORS setting
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
  });
*/

// Router setting
app.use(morganLogger);
app.use(express.static('public'));
require(`./routes.js`)(app)

// Start server
const port = process.env.SERVER_PORT || '8081'
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

