const axios = require('axios');
const express = require("express");
const app = express();

let ultima_execucao = "";

function fazerRequisicao() {
  realizarRequisicao('https://economax.onrender.com/login');
  realizarRequisicao('https://economax-dev.onrender.com/login');
  realizarRequisicao('https://start-economax.vercel.app/')
  setInterval(() => {
      realizarRequisicao('https://economax.onrender.com/login');
      realizarRequisicao('https://economax-dev.onrender.com/login');
      realizarRequisicao('https://start-economax.vercel.app/')
  }, 4 * 60 * 1000 + 30 * 1000);
}

async function realizarRequisicao(url) {  
  try {
      const data = {
          usuario: 'aleakirah',
          senha: '14191712'
      };

      const response = await axios.post(url, data);      
      if (response.status === 200) {
          console.log(`Requisição bem-sucedida! (${url})`);
          const horario = new Date().toISOString();
          console.log(`Requisição feita às ${horario}`);
          ultima_execucao = `Requisição feita com sucesso às ${horario}` 
      } else {
          console.log(`Erro na requisição. (${url})`);
          const horario = new Date().toISOString();
          console.log(`Tentativa feita às ${horario}`);
          ultima_execucao = `Requisição feita com falha às ${horario}`
      }
  } catch (error) {
      console.log(`Erro na requisição. (${url})`);
      const horario = new Date().toISOString();
      console.log(`Requisição feita às ${horario}`);
      ultima_execucao = `Requisição feita com erro às ${horario}`
  }
}

app.get('/', (req, res) => {
  res.send(`Resultado: ${ultima_execucao}`);
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});
// Export the Express API
module.exports = app;

fazerRequisicao();