import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import headerContext from '../MyContext/headerContext';
import RecipesContext from '../MyContext/RecipesContext';
import fetchAPI from '../services/api';
import '../CSS/FoodsDrinks.css';

const doze = 12;

function ExploreFoodIng() {
  const { explFoodIngred, setArrayCardsFoods } = useContext(RecipesContext);
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
    const newData = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    // console.log(ingredientName);
    setArrayCardsFoods(newData.meals);
    history.push('/foods');
  }

  return (
    <>
      <Header />
      <div>
        { explFoodIngred !== null && explFoodIngred !== undefined
          && explFoodIngred.slice(0, doze).map((ingredient, index) => (
            <div
              className="ingredients"
              data-testid={ `${index}-ingredient-card` }
              key={ index }
            >
              <button
                type="button"
                onClick={ () => ingredientClick(ingredient.strIngredient) }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                  alt="thumb"
                />
                <p data-testid={ `${index}-card-name` }>
                  { ingredient.strIngredient }
                </p>
              </button>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodIng;
