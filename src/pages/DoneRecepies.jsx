import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import headerContext from '../MyContext/headerContext';

function DoneRecepies() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  useEffect(() => {
    setHeaderState('Done Recipes');
    setSearchBar(false);
    setFoods(false);
  }, []);
  return <Header />;
}

export default DoneRecepies;
