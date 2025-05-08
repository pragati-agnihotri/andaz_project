
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const doctorRoutes = require('./routes/doctorRoutes');
require('dotenv').config();

const app = express();
const corsOptions = {
  origin :' https://andaz-project.vercel.app/',
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need to allow cookies, set this to true
  allowedHeaders: ['Content-Type', 'Authorization','Access-Control-Allow-Origin'], // Ensure these headers are allowed
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(cors());
app.use(express.json());
// Root route
app.get('/', (req, res) => {
  res.status(200).send('Hey this is my API running 🥳');
});
app.use('/api/doctors', doctorRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
     message: "500: INTERNAL_SERVER_ERROR",
      code: "FUNCTION_INVOCATION_FAILED",
      id: "bom1::6d4v8-1725912118020-2f3bc51fbb3a",
      suggestion: "If you are a visitor, contact the website owner or try again later. If you are the owner, learn how to fix the error and check the logs."
    }
  });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err));
