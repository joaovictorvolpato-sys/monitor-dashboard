const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

class HardwareEngine {
    constructor() {
        this.cpu = this.gerarAleatorio(0, 100);
        this.ram = this.gerarAleatorio(0, 16); // Removido toFixed daqui
        this.temp = this.gerarAleatorio(30, 90);
    }

    gerarAleatorio(min, max) {
        return Math.random() * (max - min) + min;
    }
}

app.get('/api/status', (req, res) => {
    const status = new HardwareEngine();
    res.json(status); // O Express envia o objeto como JSON
});

app.listen(PORT, () => {
    console.log(`Servidor online: http://localhost:${PORT}`);
});