import React from 'react';
import { Layout, Space } from 'antd';
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, Checkbox, Select, Table } from 'antd';
import { supabase } from '../supabaseClient.js';




export default function Main(){
    const navigate = useNavigate();
        return(
            <div className="main_page" id="main_page">
            <header>
       <nav>
         <ul className="navig_main">
           <Form.Item>
               <Button onClick={() => {navigate('/Moderator_personal_account')}} className='btn-7'>Личный кабинет</Button>
           </Form.Item>
         </ul>
       </nav>
         </header>  




       








         </div> 

            )
        }
        