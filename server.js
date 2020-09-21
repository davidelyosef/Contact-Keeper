const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Serve index.html:
app.use(express.static(path.join(__dirname, "./clientSide/build")));

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Any other route - return index.html as we are SPA:
app.use("*", (request, response) => {
  response.sendFile(path.join(__dirname, "./clientSide/build/index.html"));
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('clientSide/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'clientSide', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));