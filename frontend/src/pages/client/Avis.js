import React, { useState, useEffect } from 'react';
import './Avis.css'; // Import du fichier CSS

const AvisForm = () => {
    const [contenu, setContenu] = useState('');
    const [message, setMessage] = useState('');
    const [avis, setAvis] = useState([]);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserId(decodedToken.id);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/avis/add-avis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Assurez-vous que le token est stocké dans le localStorage
                },
                body: JSON.stringify({ contenu })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage('Avis ajouté avec succès');
                setContenu(''); // reinitialiser le champ de texte après soumission
                fetchAvis(); // recharge les avis après l'ajout
            } else {
                setMessage('Erreur lors de lajout de lavis');
            }
        } catch (error) {
            setMessage('Erreur lors de lajout de lavis');
            console.error('Erreur lors de lajout de lavis :', error);
        }
    };

    const fetchAvis = async () => {
        try {
            const response = await fetch('http://localhost:3000/avis/get-active-avis', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Assurez-vous que le token est stocké dans le localStorage
                }
            });

            if (response.ok) {
                const data = await response.json();
                const avisWithIds = data.avis;
                const userIds = avisWithIds.map(item => item.id_utilisateur);

                // prenoms des users
                const prenomsResponse = await fetch('http://localhost:3000/avis/get-prenom', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Assurez-vous que le token est stocké dans le localStorage
                    },
                    body: JSON.stringify({ userIds })
                });

                if (prenomsResponse.ok) {
                    const prenomsData = await prenomsResponse.json();
                    const users = prenomsData.users;

                    //avis avec prenom des users
                    const avisWithPrenoms = avisWithIds.map(item => {
                        const user = users.find(user => user.id_utilisateur === item.id_utilisateur);
                        return {
                            ...item,
                            prenom_utilisateur: user ? user.prenom_utilisateur : 'Utilisateur inconnu'
                        };
                    });

                    setAvis(avisWithPrenoms);
                } else {
                    setError('Erreur lors de la récupération des prénoms des utilisateurs');
                }
            } else {
                setError('Erreur lors de la récupération des avis');
            }
        } catch (error) {
            setError('Erreur lors de la récupération des avis');
            console.error('Erreur lors de la récupération des avis :', error);
        }
    };

    const handleDelete = async (id_avis) => {
        try {
            const response = await fetch('http://localhost:3000/avis/remove-avis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Assurez-vous que le token est stocké dans le localStorage
                },
                body: JSON.stringify({ id_avis })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                fetchAvis(); // recharge les avis après la suppression
            } else {
                setMessage('Erreur lors de la suppression de lavis');
            }
        } catch (error) {
            setMessage('Erreur lors de la suppression de lavis');
            console.error('Erreur lors de la suppression de lavis :', error);
        }
    };

    useEffect(() => {
        fetchAvis();
    }, []);

    return (
        <div className="avis-form-container">
            <h2>Ajouter un avis</h2>
            <form onSubmit={handleSubmit}>
                <div className='containterformavis'>
                    <label htmlFor="contenu">Contenu de l'avis :</label>
                    <textarea
                        id="contenu"
                        value={contenu}
                        onChange={(e) => setContenu(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Soumettre</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            <h2>Liste des avis actifs</h2>
            {avis.length > 0 ? (
                <table className="avis-table">
                    <thead>
                        <tr>
                            <th>Utilisateur</th>
                            <th>Contenu</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {avis.map(item => (
                            <tr key={item.id_avis}>
                                <td>{item.prenom_utilisateur}</td>
                                <td>{item.contenu_avis}</td>
                                <td>{item.date_avis}</td>
                                <td>
                                    {userId === item.id_utilisateur && (
                                        <button onClick={() => handleDelete(item.id_avis)}>Supprimer</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun avis disponible</p>
            )}
        </div>
    );
};

export default AvisForm;
