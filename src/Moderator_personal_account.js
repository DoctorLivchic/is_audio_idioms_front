import React, {useEffect} from 'react';
import {Button, Form, Input, Checkbox,Select,Menu } from 'antd';
import {useNavigate} from "react-router-dom";
import Pagefooter from "./component/Pagefooter";


export default function Moderator_page() {
    const navigate = useNavigate();
    return(
        <div className='Manag_of_phrase'>
        <header>
          <h2>Личный кабинет модератора</h2>					
        <nav>
        <ul className="navig_mod_acc">
        <Form.Item>
            <Button onClick={() => {navigate('/Activity_moderator_and_expert/Activity_moderator')}} className='btn-7'>Заявки пользователей</Button>
            <Button onClick={() => {navigate('/Activity_moderator_and_expert/Manag_of_phrase')}} className='btn-7'>Управление фразеологизмами</Button>
            <Button onClick={() => {navigate('/Activity_moderator_and_expert/Manag_of_tag')}} className='btn-7'>Управление категориями</Button>
            <Button onClick={() => {navigate('/Activity_moderator_and_expert/Manag_of_stat')}} className='btn-7'>Управление статусами</Button>
            <Button onClick={() => {navigate('/')}} className='btn-7'>Выйти</Button>     
        </Form.Item>
        </ul>
          </nav>				
        </header>

        <footer id="footer" className="footer_main section">
         <Pagefooter></Pagefooter>
        </footer>
        </div>
    )




}