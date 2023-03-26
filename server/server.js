const express = require('express');
const cors = require('cors');
const chatRouter = require('./routes/chatRouter');

// Create Express app
const app = express();

// Parse JSON in request body
app.use(express.json());

// Enable CORS
app.use(cors());

app.use('/api/chat', chatRouter);

// Start server
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
