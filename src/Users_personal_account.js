import React, {useEffect} from 'react';
import {Button, Form, Input, Checkbox,Select,Menu } from 'antd';
import {useNavigate} from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import Pagefooter from "./component/Pagefooter";
export default function Main_page() {
	const navigate = useNavigate();
    
        return(
          <div className='Users_personal_account'>
          <header>
            <h2>Личный кабинет пользователя</h2>					
          <nav>
          <ul className="navig_us_acc">
          <Form.Item>
          <Button onClick={() => {navigate('/avtorizacia/Authorization')}} className='btn-7'>Редактирование</Button>
						 	<Button onClick={() => {navigate('/avtorizacia/Authorization')}} className='btn-7'>Добавление</Button>
						 	<Button onClick={() => {navigate('/avtorizacia/Authorization')}} className='btn-7'>Фразеологизм дня</Button>
							<Button onClick={() => {navigate('/avtorizacia/Authorization')}} className='btn-7'>Чат</Button>
							<Button onClick={() => {navigate('/avtorizacia/Authorization')}} className='btn-7'>Избранное</Button>
							<Button onClick={() => {navigate('/main/Main_aut')}} className='btn-7'>Перевод фразеологизмов</Button>
              <Button onClick={() => {navigate('/main_page/Main_page_aut')}} className='btn-7'>Главная</Button>
							<Button onClick={() => {navigate('/')}} className='btn-7'>Выйти</Button>     
          </Form.Item>
          </ul>
            </nav>				
          </header>
							<h1>Личные данные</h1>
           
		




          <div className='footer_main section'>
            <Pagefooter></Pagefooter>
          </div>
        </div>
        )
      }