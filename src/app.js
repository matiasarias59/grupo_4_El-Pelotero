const path = require('path');
const express = require('express');
const app = express();
const port = 3010;

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/index.html'));
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});