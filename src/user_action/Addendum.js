import React from 'react';
import { Layout, Space } from 'antd';
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, Checkbox, Select } from 'antd';


export default function Addendum()  {





const navigate = useNavigate();
      return (

<div className="Addendum" id="Addendum">
        <header>
        <nav>
          <ul className="navig_main">
            <Form.Item>
                <Button onClick={() => {navigate('/main_page/Main_page_aut')}} className='btn-7'>Главная</Button>
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

    );
  
      }