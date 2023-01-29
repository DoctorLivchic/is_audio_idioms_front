import React, {useEffect} from 'react';
import {Button, Form, Input, Checkbox,Select,Menu } from 'antd';
import {useNavigate} from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';


export default function Moderator_page() {
    const navigate = useNavigate();
    return(
        <div className='Moderator_personal_account'>
        <header>
          <h2>Личный кабинет модератора</h2>					
        <nav>
        <ul class="navig_mod_acc">
        <Form.Item>
            <Button onClick={() => {navigate('-')}} className='active1'>Заявки пользователей</Button>
            <Button onClick={() => {navigate('-')}} className='active'>Выйти</Button>     
        </Form.Item>
        </ul>
          </nav>				
        </header>

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