const express = require('express');
const db = require('./model');
const app = express();
const cors = require('cors');
const port = 3550;
const register = require('./login'); // Import the login module
const reserve = require('./reservation'); // Import the login module

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST'],
  credentials: true
}));


app.use('/auth', register); 
app.use('/reserve', reserve); 

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
