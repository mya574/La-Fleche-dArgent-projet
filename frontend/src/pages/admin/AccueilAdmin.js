import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './AdminAccueil.css';

const AdminAccueil = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/connexion'); // rediriger vers la page de connexion
      return;
    }
    const decodedToken = jwtDecode(token);
    if (decodedToken.is_admin == 0) { // si pas admin, pas droit à la page
      navigate('/');
    }

    fetchUsers();
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
          fetchUsers(); // recharger la liste après suppression
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
    </div>
  );
};

export default AdminAccueil;
