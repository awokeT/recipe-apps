import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';

function FoodProgress() {
  const [mealApi, setMealApi] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const location = useLocation();
  const pathname = location.pathname.split('/')[2];

  useEffect(() => {
    const apiMeal = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname}`;
      const response = await fetch(url);
      const { meals } = await response.json();
      setMealApi(meals[0]);
    };
    apiMeal();
  }, [pathname]);

  useEffect(() => {
    const ingred = [];
    setIngredients(ingred);
    Object.entries(mealApi).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        ingred.push(value);
      }
    });

    const measu = [];
    setMeasure(measu);
    Object.entries(mealApi).forEach(([key, value]) => {
      if (key.includes('strMeasure') && value !== '' && value !== null) {
        measu.push(value);
      }
    });
  }, [mealApi]);

  return (
    <section>
      <img
        data-testid="recipe-photo"
        src={ mealApi?.strMealThumb }
        alt="Recipe"
      />
      <h3 data-testid="recipe-title">{ mealApi?.strMeal }</h3>
      <button
        type="button"
        data-testid="share-btn"
        src={ shareIcon }
      >
        <img src={ shareIcon } alt={ shareIcon } />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        src={ favoriteIcon }
      >
        <img src={ favoriteIcon } alt={ favoriteIcon } />
      </button>
      <p data-testid="recipe-category">{mealApi?.pstrCategory}</p>
      <h1>Ingredients</h1>
      <div>
        {ingredients.map((value, index) => (
          <h3 key={ index } data-testid={ `${index}-ingredient-step` }>
            <input type="checkbox" />
            {`${value} - ${measure[index]}`}
          </h3>
        ))}
      </div>
      <div>
        <span data-testid="instructions">{mealApi.strInstructions}</span>
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </section>
  );
}

export default FoodProgress;
