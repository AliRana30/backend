require('dotenv').config();
const express = require('express');
const db = require('./utils/mongo');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  };
  app.use(cors(corsOptions));
  

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  db(); 
  console.log('Connected to MongoDB');
  console.log(`Server running at http://localhost:${PORT}`);
});
