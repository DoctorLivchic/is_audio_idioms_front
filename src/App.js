import React, { Component } from "react";
import Main from "./main/Main";
import Main_page_aut from "./main_page/Main_page_aut";
import Main_page from "./main_page/Main_page";
import Main_aut from "./main/Main_aut";
import Authorization from "./Authorization";
import List_phrase from "./List_phrase";
import Authorization_Other from "./Authorization_Other";
import Users_personal_account from "./Users_personal_account";
import Expert_personal_account from "./Expert_personal_account";
import Moderator_personal_account from "./Moderator_personal_account";
import Addendum from "./user_action/Addendum";
import Editing from "./user_action/Editing";
import Favorit from "./user_action/Favorit";
import Activity_moderator from "./Activity_moderator_and_expert/Activity_moderator";
import Activity_exp from "./Activity_moderator_and_expert/Activity_exp";
import Activity_exp_edit from "./Activity_moderator_and_expert/Activity_exp_edit";
import Management_of_phrase from "./Activity_moderator_and_expert/Manag_of_phrase";
import Manag_of_tag from "./Activity_moderator_and_expert/Manag_of_tag";
import Manag_of_stat from "./Activity_moderator_and_expert/Manag_of_stat";
import St from "./St";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { RequireAuth } from "./RequireAuth";
import { AuthProvider } from "./AuthProvider";
export default function App() {
  const [session, setSession] = useState(null);

  return (
    <div className="App">
      <div className="ty">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/main/Main" element={<Main />} />
              <Route path="/Authorization" element={<Authorization />} />
              <Route path="/" element={<Main_page />} />
              <Route path="/List_phrase" element={<List_phrase />} />
              <Route
                path="/Users_personal_account"
                element={
                  <RequireAuth>
                    <Users_personal_account />
                  </RequireAuth>
                }
              />
              <Route
                path="/Expert_personal_account"
                element={
                  <RequireAuth>
                    <Expert_personal_account />
                  </RequireAuth>
                }
              />
              <Route
                path="/Moderator_personal_account"
                element={
                  <RequireAuth>
                    <Moderator_personal_account />
                  </RequireAuth>
                }
              />
              <Route
                path="/main_page/Main_page_aut"
                element={<Main_page_aut />}
              />
              <Route
                path="/main/Main_aut"
                element={
                  <RequireAuth>
                    <Main_aut />
                  </RequireAuth>
                }
              />
              <Route
                path="/Authorization_Other"
                element={<Authorization_Other />}
              />
              <Route
                path="/user_action/Addendum"
                element={
                  <RequireAuth>
                    <Addendum />
                  </RequireAuth>
                }
              />
              <Route
                path="/user_action/Editing"
                element={
                  <RequireAuth>
                    <Editing />
                  </RequireAuth>
                }
              />
              <Route
                path="/user_action/Favorit"
                element={
                  <RequireAuth>
                    <Favorit />
                  </RequireAuth>
                }
              />
              <Route
                path="/Activity_moderator_and_expert/Activity_moderator"
                element={
                  <RequireAuth>
                    <Activity_moderator />
                  </RequireAuth>
                }
              />
              <Route
                path="/Activity_moderator_and_expert/Activity_exp"
                element={
                  <RequireAuth>
                    <Activity_exp />
                  </RequireAuth>
                }
              />
              <Route
                path="/Activity_moderator_and_expert/Manag_of_phrase"
                element={
                  <RequireAuth>
                    <Management_of_phrase />
                  </RequireAuth>
                }
              />
              <Route
                path="/Activity_moderator_and_expert/Manag_of_tag"
                element={
                  <RequireAuth>
                    <Manag_of_tag />
                  </RequireAuth>
                }
              />
              <Route
                path="/Activity_moderator_and_expert/Manag_of_stat"
                element={
                  <RequireAuth>
                    <Manag_of_stat />
                  </RequireAuth>
                }
              />
              <Route
                path="/Activity_moderator_and_expert/Activity_exp_edit"
                element={
                  <RequireAuth>
                    <Activity_exp_edit />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<St />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </div>
  );
}

// return (
//   <div className="container" style={{ padding: '50px 0 100px 0' }}>
//     {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
//   </div>
// )
