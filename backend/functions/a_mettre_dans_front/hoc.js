import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserEmailAndStatus } from './jwtDecode';

const withAuthProtection = (WrappedComponent) => {
  return (props) => {
    const [isTokenValid, setIsTokenValid] = useState(null); // Initial state as null to handle loading state
    const navigate = useNavigate();

    useEffect(() => {
      const userData = getUserEmailAndStatus();
      //console.log("uderdata:", userData);
      //console.log("isconnected", userData.isConnected)
      if (!userData.isConnected) {
        setIsTokenValid(false);
      } else {
        setIsTokenValid(true);
      }
    }, []);

    useEffect(() => {
      if (isTokenValid === false) {
        navigate('/login', { state: { message: 'Votre connexion a expiré, merci de vous reconnecter.' } });
      }
    }, [isTokenValid, navigate]);

    if (isTokenValid === null) {
      return <div>Loading...</div>; // Loading state
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthProtection;