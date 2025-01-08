import {jwtDecode} from 'jwt-decode';

const getUserEmailAndStatus = () => {
  const token = localStorage.getItem('token');
  
  // verifiez si le token est présent et est une chaîne de caractères
  if (!token || typeof token !== 'string') {
    //console.log("No valid token found in localStorage");
    return { email: null, statut: null, actif: null, isConnected: false };
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    //console.log(decodedToken);
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      //console.log("Token expired");
      return { email: null, statut: null, actif: null, isConnected: false };
    }

    return {
      email: decodedToken.email,
      statut: decodedToken.statut,
      actif: decodedToken.actif,
      isConnected: true,
      nature: decodedToken.nature,
      token: token,
      id: decodedToken.id
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return { email: null, statut: null, actif: null, isConnected: false };
  }
};

export { getUserEmailAndStatus };