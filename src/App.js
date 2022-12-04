import React, { Component } from 'react';
import Ap from "./App.css";
import Main from './main/Main';
import Main_page from './main_page/Main_page';
import Authorization from './avtorizacia/Authorization';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';


class App extends React.Component {
  render() {
    return(
     <div className='App'>
      <Router>
             <div className="ty">
            <ul>
                <li><a href="/main/Main">Переводчик</a></li>
                <li><a href="/avtorizacia/Authorization">Авторизация</a></li>
                <li><a href="/main_page/Main_page">Главная</a></li>

            </ul>
            <Switch>
              <Route exact path='/main/Main' component={Main}/>
              <Route exact path='/avtorizacia/Authorization' component={Authorization}/>
              <Route exact path='/main_page/Main_page' component={Main_page}/>
            </Switch>
          </div>  
      </Router>


     </div>

    );
  }
}

export default App;
