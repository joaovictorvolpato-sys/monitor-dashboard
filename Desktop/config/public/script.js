class ComponenteMonitor {
    constructor(id) {
        this.elemento = document.getElementById(id);
    }
}

class CardHardware extends ComponenteMonitor {
    atualizarInterface(valor, tipo) {
        const p = this.elemento.querySelector('.valor');
        // Converte para número para garantir a lógica de comparação
        const numValor = parseFloat(valor);
        
        p.innerText = `${numValor.toFixed(1)} ${tipo}`;

        // Lógica de Negócio (Item 4.4 da prova)
        if ((tipo === '%' && numValor > 90) || (tipo === '°C' && numValor > 75)) {
            this.elemento.classList.add('alerta-critico');
        } else {
            this.elemento.classList.remove('alerta-critico');
        }
    }
}

const cpuCard = new CardHardware('card-cpu');
const ramCard = new CardHardware('card-ram');
const tempCard = new CardHardware('card-temp');

async function buscarDados() {
    try {
        const response = await fetch('/api/status');
        const dados = await response.json();

        cpuCard.atualizarInterface(dados.cpu, '%');
        ramCard.atualizarInterface(dados.ram, 'GB');
        tempCard.atualizarInterface(dados.temp, '°C');
    } catch (err) {
        console.error("Erro na pulsação de dados:", err);
    }
}

// Executa e define o intervalo (Item 4.5)
buscarDados();
setInterval(buscarDados, 2000);