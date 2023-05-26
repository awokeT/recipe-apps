import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../MyContext/RecipesContext';
import headerContext from '../MyContext/headerContext';

const firstLetter = 'first-letter';

function SearchBarHeader() {
  const { radioSelected, setRadioSelected, mealIngredientApi,
    mealNameApi, mealFirstLetterApi, cocktailsIngredientApi,
    cocktailsNameApi, cocktailsFirstLetterApi, searchBtnMeals,
    searchBtnCocktailsDrinks,
    setArrayCards } = useContext(RecipesContext);
  const { userInput } = useContext(headerContext);
  const { radio } = radioSelected;
  const pathname = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRadioSelected({
      [name]: value,
    });
  };

  const searchBtn = () => {
    searchBtnMeals();
    if (radio === 'ingredient') {
      return setArrayCards(mealIngredientApi);
    } if (radio === 'name') {
      return setArrayCards(mealNameApi);
    } if (radio === firstLetter && userInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    return setArrayCards(mealFirstLetterApi);
  };

  const searchBtnCocktails = () => {
    searchBtnCocktailsDrinks();
    if (radio === 'ingredient') {
      return setArrayCards(cocktailsIngredientApi);
    } if (radio === 'name') {
      return setArrayCards(cocktailsNameApi);
    } if (radio === firstLetter && userInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    return setArrayCards(cocktailsFirstLetterApi);
  };

  return (
    <div>
      <label htmlFor="ingredients">
        <input
          id="ingredients"
          type="radio"
          name="radio"
          value="ingredient"
          checked={ radio === 'ingredient' }
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
        />
        Ingredient
      </label>
      <label htmlFor="nome">
        <input
          id="nome"
          type="radio"
          name="radio"
          value="name"
          checked={ radio === 'name' }
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
        Name
      </label>
      <label htmlFor="first">
        <input
          id="first"
          type="radio"
          name="radio"
          value="first-letter"
          checked={ radio === firstLetter }
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ pathname.pathname === '/drinks' ? searchBtnCocktails : searchBtn }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBarHeader;
