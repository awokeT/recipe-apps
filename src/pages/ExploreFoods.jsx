import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import headerContext from '../MyContext/headerContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  const history = useHistory();
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  useEffect(() => {
    setHeaderState('Explore Foods');
    setSearchBar(false);
    setFoods(false);
  }, []);

  const randomClick = async () => {
    try {
      const urlRandom = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const responseRandom = await fetch(urlRandom);
      const { meals } = await responseRandom.json();
      history.push(`/foods/${meals[0].idMeal}`);
    } catch (error) {
      return console.log(error);
    }
  };

  const handleByIngredient = () => {
    history.push('/explore/foods/ingredients');
  };

  const handleByNationality = () => {
    history.push('/explore/foods/nationalities');
  };

  return (
    <>
      <Header />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ handleByIngredient }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ handleByNationality }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ randomClick }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoods;
