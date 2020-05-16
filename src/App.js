import React,{useState} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {FaMoon} from 'react-icons/fa';
import {ThemeProvider,createGlobalStyle} from 'styled-components';

// REDUX
import {SET_AUTHENTICATED} from './components/redux/actions/types.js';
import {logoutUser,getUserData} from './components/redux/actions/userActions.js';
import store from './components/redux/store.js';

// local
import Navbar from './components/navbar.js';
import Home from './components/home.js';
import Login from './components/login.js';
import Signup from './components/signup.js';
import AuthRoute  from './components/authroute.js';
import ProfilePage from './components/profilepage.js';

// let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);   
  if(decodedToken.exp * 1000 < Date.now()){ //its expired 
    // we redirect user to login page
    // authenticated = false;
    // window.location.href = '/login';
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
  else{
    // authenticated = true;
    store.dispatch({type : SET_AUTHENTICATED});
    axios.defaults.headers.common[`Authorization`] = token ;
    store.dispatch(getUserData());
  }
};

// adding dark mode to app
const GlobalStyle = createGlobalStyle `
  body{
    background-color : ${props=>props.theme.mode === 'dark' ? '#111' : '#EEE'};
    color : ${props=>props.theme.mode === 'dark' ? '#FF33CF' : '#111'};
  }

`

const App =()=>{
  const [theme, setTheme] = useState({mode:'light'})
    return (
      <ThemeProvider theme={theme}>
      <React.Fragment>
      <GlobalStyle />
        <Router>
        <Navbar />
          <Switch>
          <Route exact path={["/","/dashboard"]} component={Home}/>
          <AuthRoute path="/login" component={Login} /> {/*authenticated={authenticated}/>*/}
          <AuthRoute path="/signup" component={Signup} />{/*authenticated={authenticated}*/}
          <Route exact path="/users/:handle" component={ProfilePage}/>
          <Route exact path="/users/:handle/scream/:screamId" component={ProfilePage}/>
          </Switch>
        </Router>
        <button className="btn btn-sm btn-dark" data-toggle="tooltip" data-target="#navBarNav" 
        title="dark-mode toggle"
        onClick={e=>setTheme(theme.mode === 'dark' ? {mode : 'light'} :{mode:'dark'})}><FaMoon /></button>
      </React.Fragment>
      </ThemeProvider>
    )
  
}

export default App;

// Route loads up all components that match the specified url
// Switch loads up only the 1st component that matches the url