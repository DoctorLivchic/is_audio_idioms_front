import React, { Component } from 'react';
import Main from './main/Main';
import Main_page from './main_page/Main_page';
import Authorization from './avtorizacia/Authorization';
import Users_personal_account from './Users_personal_account';
import Expert_personal_account from './Expert_personal_account';
import Moderator_personal_account from './Moderator_personal_account';
import { Route, Routes, BrowserRouter } from 'react-router-dom';


class App extends React.Component {
  render() {
    return(
     <div className='App'>
       <div className="ty">      
      <BrowserRouter>  
          <Routes>               
              <Route  path='/main/Main' element={<Main />}/>
              <Route  path='/avtorizacia/Authorization' element={<Authorization />}/>
              <Route  path='/' element={<Main_page />}/>
              <Route  path='/Users_personal_account' element={<Users_personal_account />}/>
              <Route  path='/Expert_personal_account' element={<Expert_personal_account />}/>
              <Route  path='/Moderator_personal_account' element={<Moderator_personal_account />}/>
            </Routes>
          </BrowserRouter>
      </div>  
     </div>

    );
  }
}

export default App;
