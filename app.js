const express = require('express');

const app = express();

// Middleware to check if it's within business hours
app.use((req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hour = now.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.status(404).send('Desole ce site web est seulement accessible durant les jours ouvres.');
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/accueil.html');
});

app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/services.html');
});
    app.get('/contact', (req, res) => {
        res.sendFile(__dirname + '/contact.html');
    });

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

// Middleware to handle server errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));