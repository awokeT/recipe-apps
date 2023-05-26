import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import headerContext from '../MyContext/headerContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  useEffect(() => {
    setHeaderState('Explore');
    setSearchBar(false);
    setFoods(false);
  }, []);

  return (
    <>
      <Header />
      <Link to="/explore/foods">
        <button
          type="button"
          src="src/images/drinkIcon.svg"
          data-testid="explore-foods"
        >
          Explore Foods
        </button>
      </Link>
      <Link to="/explore/drinks">
        <button
          type="button"
          src="src/images/drinkIcon.svg"
          data-testid="explore-drinks"
        >
          Explore Drinks
        </button>
      </Link>
      <Footer />
    </>
  );
}

export default Explore;
