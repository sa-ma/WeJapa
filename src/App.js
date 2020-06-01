import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './context/auth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function App() {
  const existingUser = JSON.parse(localStorage.getItem('user'));
  const [authUser, setAuthUser] = useState(existingUser);

  const setUser = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setAuthUser(data);
  };
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser: setUser }}>
      <Router>
        {authUser && <Redirect to="/dashboard" />}
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
