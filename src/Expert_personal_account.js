import React, {useEffect} from 'react';
import {Button, Form, Input, Checkbox,Select,Menu } from 'antd';
import {useNavigate} from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import Pagefooter from "./component/Pagefooter";

export default function Expert_page() {
    const navigate = useNavigate();
    
    return(
        <div className='Users_personal_account'>
        <header>
          <h2>Личный кабинет эксперта</h2>					
        <nav>
        <ul style={{position: 'relative', left:'61%' }}>
        <Form.Item>
            <Button onClick={() => {navigate('/Activity_moderator_and_expert/Activity_exp')}} className='btn-7'>Заявки на добавление</Button>
            <Button onClick={() => {navigate('/Activity_moderator_and_expert/Activity_exp_edit')}} className='btn-7'>Заявки на редактирование</Button>
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