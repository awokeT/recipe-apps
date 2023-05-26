import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';
import fetchAPI from '../services/api';
import headerContext from '../MyContext/headerContext';
import '../CSS/FoodsDrinks.css';

const doze = 12;

function ExploreDrinkIng() {
  const { explDrinkIngred, setArrayCardsDrinks } = useContext(RecipesContext);
  const {
    setHeaderState,
    setSearchBar,
    setFoods,
  } = useContext(headerContext);

  useEffect(() => {
    setHeaderState('Explore Ingredients');
    setSearchBar(false);
    setFoods(false);
  }, []);

  const history = useHistory();

  async function ingredientClick(ingredientName) {
    const newData = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    setArrayCardsDrinks(newData.drinks);
    history.push('/drinks');
  }

  return (
    <>
      <Header />
      <div>
        { explDrinkIngred !== null && explDrinkIngred !== undefined
          && explDrinkIngred.slice(0, doze).map((ingredient, index) => (
            <div
              className="ingredients"
              data-testid={ `${index}-ingredient-card` }
              key={ index }
            >
              <button
                type="button"
                onClick={ () => ingredientClick(ingredient.strIngredient1) }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                  alt="thumb"
                />
                <p data-testid={ `${index}-card-name` }>
                  { ingredient.strIngredient1 }
                </p>
              </button>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrinkIng;
