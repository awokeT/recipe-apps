import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import UserProvider from './MyContext/UserProvider';
import HeaderProvider from './MyContext/headerProvider';
import RecipesProvider from './MyContext/RecipesProvider';
import Explore from './pages/Explorer';
import Profile from './pages/Profile';
import FavoriteRecepies from './pages/FavoriteRecepies';
import DoneRecepies from './pages/DoneRecepies';
import ExploreFoodIng from './pages/ExploreFoodIng';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinkIng from './pages/ExploreDrinkIng';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreNationality from './pages/ExploreNationality';
import FoodDetails from './pages/FoodDetails';
import FoodProgress from './pages/FoodProgress';
import DrinkProgress from './pages/DrinkProgress';
import DrinkDetails from './pages/DrinkDetails';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <UserProvider>
      <HeaderProvider>
        <RecipesProvider>
          <Switch>
            <Route exact path="/" component={ LoginPage } />
            <Route exact path="/foods" component={ Foods } />
            <Route exact path="/foods/:id" component={ FoodDetails } />
            <Route exact path="/foods/:id/in-progress" component={ FoodProgress } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route exact path="/drinks/:id" component={ DrinkDetails } />
            <Route exact path="/drinks/:id/in-progress" component={ DrinkProgress } />
            <Route exact path="/explore/drinks" component={ ExploreDrinks } />
            <Route exact path="/explore/foods" component={ ExploreFoods } />
            <Route
              exact
              path="/explore/foods/ingredients"
              component={ ExploreFoodIng }
            />
            <Route
              exact
              path="/explore/drinks/ingredients"
              component={ ExploreDrinkIng }
            />
            <Route
              exact
              path="/explore/foods/nationalities"
              component={ ExploreNationality }
            />
            <Route
              exact
              path="/explore/drinks/nationalities"
              component={ NotFoundPage }
            />
            <Route exact path="/explore" component={ Explore } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/done-recipes" component={ DoneRecepies } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecepies } />
          </Switch>
        </RecipesProvider>
      </HeaderProvider>
    </UserProvider>
  );
}

export default App;
