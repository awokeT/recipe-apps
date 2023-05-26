import React, { useContext, useEffect } from 'react';
import headerContext from '../MyContext/headerContext';
import Header from '../components/Header';

function FavoriteRecepies() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  useEffect(() => {
    setHeaderState('Favorite Recipes');
    setSearchBar(false);
    setFoods(false);
  }, []);
  return <Header />;
}

export default FavoriteRecepies;
