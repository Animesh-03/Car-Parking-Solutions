import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import {Switch,Route, BrowserRouter as Router} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import BookSlot from './Components/BookSlot';
import AdminDashboard from './Components/AdminDashboard';
import EmployeeDashboard from './Components/EmployeeDashboard';
import EmployeeLogin from './Components/EmployeeLogin';
import SlotsInLocation from './Components/SlotsInLocation';
import Order from './Components/Order';
import EditDetails from './Components/EditDetails';


function App() {

  
  return (

          <div className="App">
            <Router>
            <Switch>
                <Route exact path="/">
                  <Login />
                </Route>

                {/* <PrivateRoute component={Dashboard} path="/dashboard" authenticated={isLoggedIn} /> */}

                <Route exact path="/dashboard" >
                  <Dashboard />
                </Route>

                <Route exact path="/location/:id" >
                  <SlotsInLocation />
                </Route>

                <Route exact path="/slots/:id" >
                  <BookSlot />
                </Route>

                <Route exact path="/orders/:id" >
                  <Order />
                </Route>

                <Route exact path="/admin">
                  <AdminDashboard />
                </Route>

                <Route exact path="/employee">
                  <EmployeeDashboard />
                </Route>

                <Route exact path="/employeeLogin">
                  <EmployeeLogin />
                </Route>
                
                <Route exact path="/register">
                  <Register />
                </Route>

                <Route exact path="/editDetails">
                  <EditDetails />
                </Route>
                
              </Switch>   
            </Router>     
          </div>

  );
}

export default App;
