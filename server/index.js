const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');
const mongoose = require('mongoose');
const signUpRoute = require('./api/signUp');
const loginRoute = require('./api/auth');
const logoutRoute = require('./api/auth');
const projectsRoute = require('./api/userProjects');
const fileRoute = require('./api/file');
const {verifyToken} = require("./utils/tokenManagement");
const cookieParser = require('cookie-parser');


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json()); 


mongoose.connect(
    "mongodb+srv://fardeenjobs:e54Cx4oRtalq6N2d@skailama.1krevuo.mongodb.net/myDatabaseName?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  ).then(() => {
    console.log('MongoDB connected');
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
  });
// On server (auth.js route maybe)

app.use("/api/files",fileRoute);
app.use("/api/auth",projectsRoute);
app.use('/api',logoutRoute);
app.use('/api',loginRoute);
app.use('/api/signup', signUpRoute); 
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });