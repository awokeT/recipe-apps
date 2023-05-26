import React, { useContext, useEffect } from 'react';
import headerContext from '../MyContext/headerContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';
import CardsMeals from '../components/CardsMeals';
import fetchAPI from '../services/api';

function ExploreNationality() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);
  const { arrayNationsList, setArrayCardsFoods } = useContext(RecipesContext);
  const ALL_NATIONS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    setHeaderState('Explore Nationalities');
    setSearchBar(false);
    setFoods(true);
  }, []);

  async function selectFoods({ target }) {
    const doze = 12;
    if (target.value === 'All') {
      const finalData = await fetchAPI(ALL_NATIONS);
      setArrayCardsFoods(finalData.meals.slice(0, doze));
    } else if (target.value !== 'All') {
      const finalData = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`);
      setArrayCardsFoods(finalData.meals.slice(0, doze));
    }
  }

  return (
    <>
      <Header />
      <div>
        <select
          data-testid="explore-by-nationality-dropdown"
          onChange={ selectFoods }
        >
          <option
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          {arrayNationsList && arrayNationsList.map((nation, index) => (
            <option
              data-testid={ `${nation.strArea}-option` }
              key={ index }
              value={ nation.strArea }
            >
              {nation.strArea}
            </option>
          ))}
        </select>
      </div>
      <CardsMeals />
      <Footer />
    </>
  );
}

export default ExploreNationality;
