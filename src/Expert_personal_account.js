import React, {useEffect} from 'react';
import {Button, Form, Input, Checkbox,Select,Menu } from 'antd';
import {useNavigate} from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';


export default function Expert_page() {
    const navigate = useNavigate();
    
    return(
        <div className='Users_personal_account'>
        <header>
          <h2>Личный кабинет эксперта</h2>					
        <nav>
        <ul className="navig_ex_acc">
        <Form.Item>
            <Button onClick={() => {navigate('-')}} className='btn-7'>Заявки модератора</Button>
            <Button onClick={() => {navigate('/')}} className='btn-7'>Выйти</Button>     
        </Form.Item>
        </ul>
          </nav>				
        </header>



        <footer id="footer" className="footer section">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="logo">
                    <a>Логотип</a>
                  </div>
                  
                  <ul className="social">
                    <li><a href="#"><span className="fa fa-facebook"></span></a></li>
                    <li><a href="#"><span className="fa fa-twitter"></span></a></li>
                    <li><a href="#"><span className="fa fa-dribbble"></span></a></li>
                    <li><a href="#"><span className="fa fa-instagram"></span></a></li>
                    <li><a href="#"><span className="fa fa-pinterest-p"></span></a></li>
                  </ul>                 
                </div>
              </div>
            </div>
          </div>
          <div className="copyright">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <p>2023 © Словарь аудио-фразеологизмов</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        </div>
    )
}