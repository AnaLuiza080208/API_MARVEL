const publicKey = '561d83e522bb3ba1481c8cf4551ea4f6';
const privateKey = '8307596580576299e7c7e20ae0751086e27cc190';
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(CryptoJS.enc.Hex);
const baseURL = 'https://gateway.marvel.com/v1/public';

// Função genérica para buscar dados
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${baseURL}/${endpoint}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=5`);
    if (!response.ok) throw new Error('Erro na requisição');
    const data = await response.json();
    return data.data.results || [];
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint}:`, error);
    return [];
  }
}

// Função para exibir conteúdo
function displayContent(items, containerId, title) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  if (items.length === 0) {
    container.innerHTML = `<p class="no-data">Nenhum ${title.toLowerCase()} encontrado</p>`;
    return;
  }

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'card';
    
    const imgUrl = item.thumbnail 
      ? `${item.thumbnail.path}.${item.thumbnail.extension}`
      : 'https://via.placeholder.com/150x225?text=No+Image';
    
    div.innerHTML = `
      <h3>${item.title || 'Sem título'}</h3>
      <p>${item.description || 'Descrição não disponível'}</p>
      <img src="${imgUrl}" alt="${item.title || ''}" 
           onerror="this.src='https://via.placeholder.com/150x225?text=Imagem+Não+Disponível'">
    `;
    container.appendChild(div);
  });
}

// Carregar todos os dados
async function loadAllData() {
  try {
    const [events, comics] = await Promise.all([
      fetchData('events'),
      fetchData('comics')
    ]);
    
    displayContent(events, 'events', 'evento');
    displayContent(comics, 'comics', 'quadrinho');
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}

// Iniciar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', loadAllData);