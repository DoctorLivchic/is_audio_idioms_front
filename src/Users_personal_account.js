import React, {useEffect} from 'react';
import {Button, Form, Input, Checkbox,Select,Menu } from 'antd';
import {useNavigate} from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

export default function Main_page() {
	const navigate = useNavigate();
    
        return(
          <div className='Users_personal_account'>
          <header>
            <h2>Личный кабинет пользователя</h2>					
          <nav>
          <ul class="navig_us_acc">
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
           
		




          <footer id="footer" class="footer section">
          <div class="footer-top">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="logo">
                    <a>Логотип</a>
                  </div>
                  
                  <ul class="social">
                    <li><a href="#"><span class="fa fa-facebook"></span></a></li>
                    <li><a href="#"><span class="fa fa-twitter"></span></a></li>
                    <li><a href="#"><span class="fa fa-dribbble"></span></a></li>
                    <li><a href="#"><span class="fa fa-instagram"></span></a></li>
                    <li><a href="#"><span class="fa fa-pinterest-p"></span></a></li>
                  </ul>                 
                </div>
              </div>
            </div>
          </div>
          <div class="copyright">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <p>2023 © Словарь аудио-фразеологизмов</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        </div>
        )
      }