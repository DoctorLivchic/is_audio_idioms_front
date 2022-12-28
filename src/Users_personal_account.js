import React, {useEffect} from 'react';
import {Button, Form, Input, Checkbox,Select,Menu } from 'antd';
import {useNavigate} from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

export default function Main_page() {
	const navigate = useNavigate();
    
        return(
          <div className='Users_personal_account'>
          <header>					
          <nav>
          <ul class="navig">
          <Form.Item>
              <Button onClick={() => {navigate('/main_page/Main_page')}} className='active1'>Главная</Button>
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
                  <p>© 2018 Distributed by <a href="https://themewagon.com/">ThemeWagon</a></p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        </div>
        )
      }