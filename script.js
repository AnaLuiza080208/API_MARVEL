const publicKey = '561d83e522bb3ba1481c8cf4551ea4f6';
const privateKey = '8307596580576299e7c7e20ae0751086e27cc190';
const ts = new Date().getTime(); // Timestamp
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(CryptoJS.enc.Hex);

// URL base da API Marvel para Eventos
const baseURL = 'https://gateway.marvel.com/v1/public/events';

// Função para buscar eventos
async function getEvents() {
  try {
    const response = await fetch(`${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=5`);
    const data = await response.json();
    displayEvents(data.data.results);
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}

// Função para exibir os eventos na página
function displayEvents(events) {
  const container = document.getElementById('characters');
  events.forEach(event => {
    const eventDiv = document.createElement('div');
    eventDiv.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.description || 'Sem descrição'}</p>
      <img src="${event.thumbnail.path}.${event.thumbnail.extension}" alt="${event.title}">
    `;
    container.appendChild(eventDiv);
  });
}

// Chama a função para buscar os eventos
getEvents();
