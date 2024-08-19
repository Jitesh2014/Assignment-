const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "UPDATE", "DELETE"],
        credentials: true
    })
)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

    
// Routes
const cardRoutes = require('./routes/card');
app.use('/api', cardRoutes);

// Simple ping endpoint to check if the server is running
app.get('/ping', (req, res) => {
    res.send('Pong');
});

// Listen on the port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
