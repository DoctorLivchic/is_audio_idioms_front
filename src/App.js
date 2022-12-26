import React, { Component } from 'react';
import Main from './main/Main';
import Main_page from './main_page/Main_page';
import Authorization from './avtorizacia/Authorization';
import Users_personal_account from './Users_personal_account';
import { Route, Routes, BrowserRouter } from 'react-router-dom';


class App extends React.Component {
  render() {
    return(
     <div className='App'>
       <div className="ty">
        <ul>
                <li><a href="/main/Main">Переводчик</a></li>
                <li><a href="/avtorizacia/Authorization">Авторизация</a></li>
                <li><a href="/main_page/Main_page">Главная</a></li>
        </ul>
      <BrowserRouter>  
          <Routes>               
              <Route  path='/main/Main' element={<Main />}/>
              <Route  path='/avtorizacia/Authorization' element={<Authorization />}/>
              <Route  path='/main_page/Main_page' element={<Main_page />}/>
              <Route  path='/Users_personal_account' element={<Users_personal_account />}/>
            </Routes>
          </BrowserRouter>
      </div>  
     </div>

    );
  }
}

export default App;
