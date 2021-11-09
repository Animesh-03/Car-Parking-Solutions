import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import {Switch,Route, BrowserRouter as Router} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import BookSlot from './Components/BookSlot';
import { useState } from 'react';
import { LoginContext } from './Components/LoginContext';
import {PrivateRoute} from './Components/PrivateRoute';
import {UserContext} from './Components/UserContext'
import AdminDashboard from './Components/AdminDashboard';


function App() {
  const [isLoggedIn,setLoggedIn] = useState();
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  
  return (
      <LoginContext.Provider value={{isLoggedIn,setLoggedIn}}>
        <UserContext.Provider value = {{user,setUser}}>
          <div className="App">
            <Router>
            <Switch>
                <Route exact path="/login">
                  <Login />
                </Route>

                <PrivateRoute component={Dashboard} path="/dashboard" authenticated={isLoggedIn} />

                <Route exact path="/slots/:id" >
                  <BookSlot />
                </Route>

                <Route exact path="/admin">
                  <AdminDashboard />
                </Route>
                
                <Route exact path="/">
                  <Register />
                </Route>
                
              </Switch>   
            </Router>     
          </div>
        </UserContext.Provider>
      </LoginContext.Provider>
  );
}

export default App;
