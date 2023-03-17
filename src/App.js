import React, { Component } from 'react';
import Main from './main/Main';
import Main_page_aut from './main_page/Main_page_aut';
import Main_page from './main_page/Main_page';
import Main_aut from './main/Main_aut'
import Authorization from './Authorization';
import Authorization_Other from './Authorization_Other';
import Users_personal_account from './Users_personal_account';
import Expert_personal_account from './Expert_personal_account';
import Moderator_personal_account from './Moderator_personal_account';
import Addendum from './user_action/Addendum';
import Editing from './user_action/Editing';
import Activity_moderator from './Activity_moderator_and_expert/Activity_moderator';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'


//class App extends React.Component {

  
//   render() {
//     return(
//      <div className='App'>
//        <div className="ty">      
//       <BrowserRouter>  
//           <Routes>               
//               <Route  path='/main/Main' element={<Main />}/>
//               <Route  path='/avtorizacia/Authorization' element={<Authorization />}/>
//               <Route  path='/' element={<Main_page />}/>
//               <Route  path='/Users_personal_account' element={<Users_personal_account />}/>
//               <Route  path='/Expert_personal_account' element={<Expert_personal_account />}/>
//               <Route  path='/Moderator_personal_account' element={<Moderator_personal_account />}/>
//             </Routes>
//           </BrowserRouter>
//       </div>  
//      </div>

//     );
//   }
// }

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
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
             <Route  path='/main_page/Main_page_aut' element={<Main_page_aut />}/>
             <Route  path='/main/Main_aut' element={<Main_aut />}/>
             <Route  path='/Authorization_Other' element={<Authorization_Other />}/>
             <Route  path='/user_action/Addendum' element={<Addendum />}/>
             <Route  path='/user_action/Editing' element={< Editing  />}/>
             <Route  path='/Activity_moderator_and_expert/Activity_moderator' element={< Activity_moderator  />}/>
           </Routes>
         </BrowserRouter>
     </div>  
    </div>

   );
 }



  // return (
  //   <div className="container" style={{ padding: '50px 0 100px 0' }}>
  //     {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
  //   </div>
  // )



