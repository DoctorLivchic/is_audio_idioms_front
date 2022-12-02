import React, { Component } from 'react';
import Ap from "./App.css";
import Main from './main/Main';
import Od from './Other.Js';
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
                <li><a href="/Od">Другое</a></li>

            </ul>
            <Switch>
              <Route exact path='/main/Main' component={Main}/>
              <Route exact path='/avtorizacia/Authorization' component={Authorization}/>
              <Route exact path='/Od' component={Od}/>
            </Switch>
          </div>  
      </Router>


     </div>

    );
  }
}

export default App;
