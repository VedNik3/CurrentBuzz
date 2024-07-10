const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.url);
console.log('connected');
}




app.set('view engine', 'ejs');
staticpath = path.join(__dirname, "views");
app.use(express.static(staticpath));

  const newsroutes = require('./routes/frontpage');
  app.use('/', newsroutes);

  const userroutes = require('./routes/user');
  app.use('/', userroutes);

  const PORT = 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));