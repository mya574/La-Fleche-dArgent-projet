const BASE_URL = 'http://localhost';

/* Méthode POST */
const post = async (endpoint, data) => {
  console.log("ligne5");
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    // essayez de lire le corps de la réponse pour obtenir plus de détails sur l'erreur
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }

  const json = await response.json();
  return json;
};

/* Méthode GET */
const get = async (endpoint, token, method = 'GET') => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const json = await response.json();
      console.log('JSON Response:', json);
      if (!response.ok) {
        throw new Error(json.message || json);
      }
      return json;
    } else {
      const text = await response.text();
      console.error('Unexpected Response Format:', text);
      throw new Error(`Unexpected response format. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

/* Méthode DELETE */
const remove = async (endpoint, token) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  // Essayez d'extraire le JSON seulement si la réponse est au format JSON
  const contentType = response.headers.get('content-type');
  let json = {};
  if (contentType && contentType.includes('application/json')) {
    json = await response.json();
  } else {
    // Gérer les réponses non JSON (peut-être pour des messages d'erreur ou autres)
    json = await response.text();
  }

  if (!response.ok) {
    throw new Error(json.message || json);
  }

  return json;
};

export const getApiUrl = (endpoint) => {
  const apiUrl = process.env.REACT_APP_API_URL || BASE_URL;
  return `${apiUrl}/${endpoint}`;
};

export { post, get, remove };