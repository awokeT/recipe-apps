import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import headerContext from '../MyContext/headerContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);
  const userEmail = JSON.parse(localStorage.getItem('user')) || [];

  useEffect(() => {
    setHeaderState('Profile');
    setSearchBar(false);
    setFoods(false);
  }, []);

  const handleLogout = () => {
    setHeaderState('Foods');
    localStorage.clear();
  };

  return (
    <>
      <Header />
      <p data-testid="profile-email">{userEmail.email}</p>

      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>

      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>

      <Link to="/">
        <button
          type="button"
          onClick={ handleLogout }
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </Link>

      <Footer />
    </>
  );
}

export default Profile;
