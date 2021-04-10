import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";

import AppReducer from './AppReducers/AppReducers';
import AppContext from './AppContext/AppContext';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useCallback, useEffect, useReducer } from "react";
import axios from "axios";

function App() {

  const initialState = { user: null, posts: [] }
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const checkCurrentUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const option = {
        method: "get",
        url: "https://mighty-dusk-05196.herokuapp.com/api/auth",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios(option);
      if (response.data.data.user) {
        const { userName } = response.data.data.user;
        dispatch({ type: "CURRENT_USER", payload: { userName } });
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    checkCurrentUser();
  }, [checkCurrentUser])

  return (
    <div className="container">
      <AppContext.Provider value={{ state, dispatch }}>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/'> <Main /> </Route>
            <Route exact path='/login'> <Login /> </Route>
            <Route exact path='/register'> <Register /> </Route>
            <Route exact path='*'> <div>Page not found</div> </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}
export default App;
