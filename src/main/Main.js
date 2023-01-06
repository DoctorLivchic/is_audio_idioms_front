import React, {useEffect} from 'react';
import {Button, Form, Input, Checkbox, Select } from 'antd';
import {useNavigate} from "react-router-dom";
import { input1 } from '../CONST';
const { TextArea } = Input;
const onChange = (e) => {
  console.log('Change:', e.target.value);
};

export default function Main(){
const navigate = useNavigate();
    return(
        <div className="main_page" id="main_page">
           <header>
      <nav>
        <ul class="navig_main">
          <Form.Item>
              <Button onClick={() => {navigate('/')}} className='active1'>Главная</Button>
          </Form.Item>
        </ul>
      </nav>
        </header>  

        <div className='input'>
          <div className='text' align="center">
          <h1>{input1}</h1>
          </div>
        </div>

        <div className="slidermain" id="slidermain">
          <div class="container">           
                <div class="text">
                 
                     <div className='headerleft'>
                        <div className='languagelabel'>
                        <Form
                        layout={"vertical"}>
                        <Form.Item 
                        name="language"
                        label="Выбор языка">
                            <Select onChange={(value) => { 
                                
                            }}>
                                
                            </Select>
                        </Form.Item >
                        </Form>
                        </div>
                          <div className='buttom-block-left'>
                          <Form.Item>
                          <TextArea showCount maxLength={100} onChange={onChange} placeholder="Введите текст" className='Text_area' />
                          <Button onClick={() => {navigate('')}} className='buttom-block-left' >Перевести</Button>                         
                          <Button onClick={() => {navigate('')}} className='buttom-audio' >Прослушать</Button>
                          </Form.Item>
                        </div>
                    </div>



                    <div className='headercenter'>
                          <div className='buttom-block-center'>
                          <Form.Item>
                          <Button onClick={() => {navigate('')}} className='buttom-block-center' >Заменить</Button>
                          </Form.Item>
                        </div>
                    </div>

                    <div className='headerRight'>
                        <div className='languagelabel'>
                        <Form
                        layout='vertical'>
                        <Form.Item 
                        name="language"
                        label="Выбор языка">
                            <Select onChange={(value) => { 
                                
                            }}>
                                
                            </Select>
                         </Form.Item>   
                         </Form>
                        </div>
                          <div className='buttom-block-right'>
                          <Form.Item>
                          <TextArea showCount maxLength={100} onChange={onChange} placeholder="Введите текст" className='Text_area' />
                          <Button onClick={() => {navigate('')}} className='buttom-block-right' >Перевести</Button>
                          <Button onClick={() => {navigate('')}} className='buttom-audio' >Прослушать</Button>
                          </Form.Item>
                        </div>
                    </div>            
          </div>
        </div>
                  <footer id="footer" class="footer section">
                    <div class="footer-top">
                      <div class="container">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="logo">                              
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

    </div>      
    )
}
