require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http'); // ⬅️ Required for Vercel
const db = require('./utils/mongo');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'https://assitant-livid.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

db();

app.use('/', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// export as Vercel serverless function
module.exports = app;
module.exports.handler = serverless(app);
