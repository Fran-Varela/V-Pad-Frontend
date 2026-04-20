import { useEffect, useState } from 'react';
import axios from 'axios';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/ingredients');
        setIngredients(response.data); 
      } catch (err) {
        setError("No se cargaron los ingredientes.");
        console.error(err);
      }
    };

    fetchIngredients();
  }, []);

  if (error) return <p style={{color: 'red'}}>{error}</p>;

  return (
    <div>
      <h2>Lista de Ingredientes</h2>
      <ul>
        {ingredients.map((ing) => (
          <li key={ing.id}>{ing.name}</li> 
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;