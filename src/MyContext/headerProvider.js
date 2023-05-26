import React, { useState } from 'react';
import PropTypes from 'prop-types';

import HeaderContext from './headerContext';

function HeaderProvider({ children }) {
  const [headerState, setHeaderState] = useState('Foods');
  const [foods, setFoods] = useState(true);
  const [drinks, setDrinks] = useState(false);
  const [fExploreNationality, setFExploreNationality] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [userInput, setUserinput] = useState('');

  const inputChange = ({ target }) => {
    setUserinput(target.value);
  };

  const context = {
    headerState,
    setHeaderState,
    foods,
    setFoods,
    drinks,
    setDrinks,
    fExploreNationality,
    setFExploreNationality,
    searchBar,
    setSearchBar,
    userInput,
    inputChange,
  };

  return (
    <HeaderContext.Provider value={ context }>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
