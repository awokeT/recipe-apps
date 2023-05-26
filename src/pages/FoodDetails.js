import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodDetails() {
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [meal, setMeal] = useState([]);
  const location = useLocation();
  const pathname = location.pathname.split('/')[2];
  const [url1, setUrl] = useState([]);
  const [drink, setDrink] = useState([]);
  const [drink1, setDrink1] = useState([]);

  useEffect(() => {
    const apiMeal = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname}`;
      const response = await fetch(url);
      const { meals } = await response.json();
      setMeal(meals[0]);
      setUrl(meals[0].strYoutube.split('='));
    };
    apiMeal();
  }, [pathname]);

  const randomApi = async () => {
    try {
      const urlRandomDirnks = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const responseRandomDirnks = await fetch(urlRandomDirnks);
      const { drinks } = await responseRandomDirnks.json();
      setDrink(drinks);
      const urlRandomDirnks1 = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const responseRandomDirnks1 = await fetch(urlRandomDirnks1);
      const { drinks1 } = await responseRandomDirnks1.json();
      setDrink1(drinks1);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    randomApi();
    const ingred = [];
    const measu = [];
    Object.entries(meal).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        ingred.push(value);
      }
    });
    Object.entries(meal).forEach(([key, value]) => {
      if (key.includes('strMeasure') && value !== '' && value !== null) {
        measu.push(value);
      }
    });
    setIngredients(ingred);
    setMeasure(measu);
  }, [meal]);

  return (
    <section>
      <div>
        <img
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
        />
      </div>
      <div>
        <h1 data-testid="recipe-title">{meal.strMeal}</h1>
        <a
          data-testid="share-btn"
          href={ `https://www.facebook.com/sharer/sharer.php?u=${useHistory.location}` }
        >
          <img width="25" height="25" src={ shareIcon } alt="share" />
        </a>
        <button
          type="button"
          // onClick={ favoriteMealClick }
          data-testid="favorite-btn"
        >
          <img src={ blackHeartIcon } alt="favorite" width="25" height="25" />
        </button>
      </div>
      <div>
        <p data-testid="recipe-category">{meal.strCategory}</p>
      </div>
      <div>
        <h2>Ingredients</h2>
        <ul>
          {
            ingredients.map((el, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {`${el} ${measure[index]}`}
              </li>))
          }
        </ul>
      </div>
      <div>
        <h1>Instructions</h1>
        <p data-testid="instructions">{ meal.strInstructions }</p>
      </div>
      <div>
        <h1>Video</h1>
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ `https://www.youtube.com/embed/${url1[1]}` }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div>
        <h1>Recommended</h1>
        <div data-testid="0-recomendation-card">
          <img src={ drink?.strDrinkThumb } alt="bebida recomendada" />
          <p>{ drink?.strAlcoholic }</p>
          <h3 data-testid="0-recomendation-title">{ drink?.strDrink }</h3>
        </div>
        <div data-testid="1-recomendation-card">
          <img src={ drink1?.strDrinkThumb } alt="bebida recomendada" />
          <p>{ drink1?.strAlcoholic }</p>
          <h3 data-testid="1-recomendation-title">{ drink1?.strDrink }</h3>
        </div>
      </div>
      <button
        data-testid="start-recipe-btn"
        type="button"
        // onClick={ onClickButton }
      >
        Start Recipe
      </button>
    </section>
  );
}

export default FoodDetails;
