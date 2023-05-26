import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import headerContext from './headerContext';
import fetchAPI from '../services/api';

function RecipesProvider({ children }) {
  const { userInput } = useContext(headerContext);
  const history = useHistory();
  const [mealIngredientApi, setMealIngredientApi] = useState([]);
  const [mealNameApi, setMealNameApi] = useState([]);
  const [mealFirstLetterApi, setMealFirstLetterApi] = useState([]);
  const [cocktailsIngredientApi, setCocktailsIngredientApi] = useState([]);
  const [cocktailsNameApi, setCocktailsNameApi] = useState([]);
  const [cocktailsFirstLetterApi, setCocktailsFirstLetterApi] = useState([]);
  const [radioSelected, setRadioSelected] = useState({
    radio: '',
  });
  const [arrayCards, setArrayCards] = useState([]);
  const [randomFoodAndDrinks, setRandomFoodAndDrinks] = useState({
    food: {},
    drink: {},
  });
  const [foodCategoryData, setFoodCategoryData] = useState([]);
  const [arrayFoods, setArrayFoods] = useState([]);
  const [drinkCategoryData, setDrinkCategoryData] = useState([]);
  const [arrayDrinks, setArrayDrinks] = useState();
  const [arrayCardsFoods, setArrayCardsFoods] = useState([]);
  const [arrayCardsDrinks, setArrayCardsDrinks] = useState([]);
  const [explFoodIngred, setExplFoodIngred] = useState([]);
  const [explDrinkIngred, setExplDrinkIngred] = useState([]);
  const [arrayNationsList, setArrayNationsList] = useState([]);

  async function fetchNationsList() {
    const finalData = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    setArrayNationsList(finalData.meals);
  }

  async function fetchExplFoodIngred() {
    const finalData = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    setExplFoodIngred(finalData.meals);
  }

  async function fetchExplDrinkIngred() {
    const finalData = await
    fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    setExplDrinkIngred(finalData.drinks);
  }

  async function fetchFoods() {
    const finalData = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setArrayFoods(finalData.meals);
  }

  async function fetchDrinks() {
    const finalData = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setArrayDrinks(finalData.drinks);
  }

  async function fetchFoodCategories() {
    const finalData = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    setFoodCategoryData(finalData.meals);
  }

  async function fetchDrinkCategories() {
    const finalData = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    setDrinkCategoryData(finalData.drinks);
  }

  useEffect(() => {
    fetchFoods();
    fetchDrinks();
    fetchFoodCategories();
    fetchDrinkCategories();
    fetchExplFoodIngred();
    fetchExplDrinkIngred();
    fetchNationsList();
  }, []);

  useEffect(() => {
    const fetchMealsIngredientData = async () => {
      try {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${userInput}`;
        const response = await fetch(url);
        const { meals } = await response.json();
        setMealIngredientApi(meals);
      } catch (error) {
        return error;
      }
    };
    fetchMealsIngredientData();

    const fetchMealsNameData = async () => {
      try {
        const urlName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`;
        const responseName = await fetch(urlName);
        const { meals } = await responseName.json();
        setMealNameApi(meals);
        setArrayCardsFoods(meals);
      } catch (error) {
        return error;
      }
    };
    fetchMealsNameData();

    const fetchMealsFirstLetter = async () => {
      try {
        const urlFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${userInput}`;
        const responseFirstLetter = await fetch(urlFirstLetter);
        const { meals } = await responseFirstLetter.json();
        setMealFirstLetterApi(meals);
      } catch (error) {
        return error;
      }
    };
    fetchMealsFirstLetter();
  }, [userInput]);

  useEffect(() => {
    const fetchCocktailsIngredientData = async () => {
      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${userInput}`;
        const response = await fetch(url);
        const { drinks } = await response.json();
        console.log(drinks);
        setCocktailsIngredientApi(drinks);
      } catch (error) {
        return error;
      }
    };
    fetchCocktailsIngredientData();

    const fetchCocktailsNameData = async () => {
      try {
        const urlName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userInput}`;
        const responseName = await fetch(urlName);
        const { drinks } = await responseName.json();
        setCocktailsNameApi(drinks);
        setArrayCardsDrinks(drinks);
      } catch (error) {
        return error;
      }
    };
    fetchCocktailsNameData();
    const fetchCocktailsFirstLetter = async () => {
      try {
        const urlFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${userInput}`;
        const responseFirstLetter = await fetch(urlFirstLetter);
        const { drinks } = await responseFirstLetter.json();
        setCocktailsFirstLetterApi(drinks);
      } catch (error) {
        return error;
      }
    };
    fetchCocktailsFirstLetter();
    const randomApi = async () => {
      try {
        const urlRandomDirnks = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
        const responseRandomDirnks = await fetch(urlRandomDirnks);
        const { drinks } = await responseRandomDirnks.json();
        setRandomFoodAndDrinks({
          ...randomFoodAndDrinks,
          drink: drinks,
        });
      } catch (error) {
        return console.log(error);
      }
    };
    randomApi();
  }, [userInput]);

  const searchBtnMeals = () => {
    if (mealIngredientApi === null || mealNameApi === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (mealIngredientApi !== null && mealNameApi !== null) {
      if (radioSelected.radio === 'ingredient' && mealIngredientApi.length === 1) {
        history.push(`/foods/${mealIngredientApi[0].idMeal}`);
      } else if (radioSelected.radio === 'name' && mealNameApi.length === 1) {
        history.push(`/foods/${mealNameApi[0].idMeal}`);
      } else if (radioSelected.radio === 'first-letter'
          && mealFirstLetterApi.length === 1) {
        history.push(`/foods/${mealFirstLetterApi[0].idMeal}`);
      }
    }
  };

  const searchBtnCocktailsDrinks = () => {
    if (cocktailsIngredientApi.length === 0 && cocktailsNameApi === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (cocktailsNameApi !== null) {
      if (radioSelected.radio === 'ingredient'
      && cocktailsIngredientApi.length === 1) {
        history.push(`/drinks/${cocktailsIngredientApi[0].idDrink}`);
      } else if (radioSelected.radio === 'name' && cocktailsNameApi.length === 1) {
        history.push(`/drinks/${cocktailsNameApi[0].idDrink}`);
      } else if (radioSelected.radio === 'first-letter'
          && cocktailsFirstLetterApi.length === 1) {
        history.push(`/drinks/${cocktailsFirstLetterApi[0].idDrink}`);
      }
    }
  };

  const context = {
    mealIngredientApi,
    mealNameApi,
    mealFirstLetterApi,
    radioSelected,
    setRadioSelected,
    cocktailsIngredientApi,
    cocktailsNameApi,
    cocktailsFirstLetterApi,
    searchBtnMeals,
    searchBtnCocktailsDrinks,
    arrayFoods,
    setArrayFoods,
    arrayDrinks,
    setArrayDrinks,
    arrayCards,
    setArrayCards,
    randomFoodAndDrinks,
    foodCategoryData,
    setFoodCategoryData,
    drinkCategoryData,
    setDrinkCategoryData,
    explFoodIngred,
    explDrinkIngred,
    setExplDrinkIngred,
    arrayCardsFoods,
    setArrayCardsFoods,
    arrayCardsDrinks,
    setArrayCardsDrinks,
    arrayNationsList,
    setArrayNationsList,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
