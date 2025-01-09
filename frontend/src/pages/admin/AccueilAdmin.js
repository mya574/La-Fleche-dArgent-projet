import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './AdminAccueil.css';

const AdminAccueil = () => {
  const [users, setUsers] = useState([]);
  const [avis, setAvis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/connexion'); // Rediriger vers la page de connexion
      return;
    }
    const decodedToken = jwtDecode(token);
    if (decodedToken.is_admin == 0) { // Si pas admin, pas droit à la page
      navigate('/');
    }

    fetchUsers();
    fetchAvis();
  }, [navigate]);

  const fetchUsers = () => {
    fetch('http://localhost:3000/users/get-all-users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
        } else {
          alert('Erreur lors de la récupération des utilisateurs.');
        }
      })
      .catch((error) => {
        console.error('Erreur réseau :', error);
        alert('Une erreur est survenue lors de la récupération des utilisateurs.');
      });
  };

  const fetchAvis = () => {
    fetch('http://localhost:3000/avis/get-all-avis', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Réponse des avis :', data); // Ajouter un log pour voir la structure de la réponse
        if (data.success && data.avis) {
          setAvis(data.avis);
        } else {
          alert('Erreur lors de la récupération des avis.');
        }
      })
      .catch((error) => {
        console.error('Erreur réseau :', error);
        alert('Une erreur est survenue lors de la récupération des avis.');
      });
  };

  const removeUser = (id_utilisateur) => {
    fetch('http://localhost:3000/users/remove-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ id_utilisateur })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          fetchUsers(); // Recharger la liste après suppression
        } else {
          alert('Erreur lors de la suppression de l\'utilisateur.');
        }
      })
      .catch((error) => {
        console.error('Erreur réseau :', error);
        alert('Une erreur est survenue lors de la suppression de l\'utilisateur.');
      });
  };

  return (
    <div className="admin-page">
      <h1>Page d'administration</h1>
      <div className="user-list">
        <h2>Liste des utilisateurs</h2>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Adresse</th>
              <th>Numéro de téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_utilisateur}>
                <td>{user.nom_utilisateur}</td>
                <td>{user.prenom_utilisateur}</td>
                <td>{user.email_utilisateur}</td>
                <td>{user.address}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <button onClick={() => removeUser(user.id_utilisateur)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="user-list">
        <h2>Liste des avis</h2>
        <table>
          <thead>
            <tr>
              <th>ID Avis</th>
              <th>ID Utilisateur</th>
              <th>Contenu</th>
              <th>Date</th>
              <th>Actif</th>
            </tr>
          </thead>
          <tbody>
            {avis.map((av) => (
              <tr key={av.id_avis}>
                <td>{av.id_avis}</td>
                <td>{av.id_utilisateur}</td>
                <td>{av.contenu_avis}</td>
                <td>{av.date_avis}</td>
                <td>{av.is_actif}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAccueil;
