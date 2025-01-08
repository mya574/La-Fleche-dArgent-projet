import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataFetcher = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://hegeoma.org/api/data') // l'URL du backend local :http://localhost:8083/api/data
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div>
      <h1>Data from Backend</h1>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
};

export default DataFetcher;