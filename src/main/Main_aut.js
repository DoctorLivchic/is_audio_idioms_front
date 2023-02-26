import React, {useEffect} from 'react';
import {Button, Form, Input, Checkbox, Select } from 'antd';
import {useNavigate} from "react-router-dom";
import { input1 } from '../CONST';


const { TextArea } = Input;

const onChange = (e) => {
 console.log('Change:', e.target.value);
};

function onChangeInput(value){
  console.log(value);
}

export default function Main(){
const navigate = useNavigate();
    return(
        <div className="main_page" id="main_page">
           <header>
      <nav>
        <ul className="navig_main">
          <Form.Item>
              <Button onClick={() => {navigate('/main_page/Main_page_aut')}} className='btn-7'>Главная</Button>
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
          <div className="container">           
                <div className="text">
                 
                     <div className='headerleft'>
                        <div className='languagelabel'>
                        <Form
                        layout={"vertical"}>
                        <Form.Item 
                        name="language_left"
                        id="language_left"
                        label="Выбор языка">
                          <select id="select_lang_left" onChange={e => {
                                        console.log(e.target.value)
                                      }}>
                            <option value="Russian">Russian</option>
                            <option value="French">French</option>
                            <option value="Korean">Korean</option>
                          </select>
                        </Form.Item >
                        </Form>
                        </div>
                          <div className='buttom-block-left'>
                          <Form.Item>
                          <TextArea showCount maxLength={100} onChange={onChange} placeholder="Введите текст" className='Text_area' />                       
                          <Button onClick={() => {navigate('')}} className='buttom-audio' >Прослушать</Button>
                          </Form.Item>
                        </div>
                    </div>



                    <div className='headercenter'>
                          <div className='buttom-block-center'>
                          <Form.Item>
                          <Button onClick={() => {navigate('')}} className='-' >Заменить</Button>
                          <br></br>
                          <Button onClick={() => {navigate('')}} className='-' >Перевести</Button>  
                          </Form.Item>
                        </div>
                    </div>

                    <div className='headerRight'>
                        <div className='languagelabel'>
                        <Form
                        layout='vertical'>
                        <Form.Item 
                        name="language_right"
                        id="language_right"
                        label="Выбор языка">
                          <select id="select_lang_right" onChange={e => {
                                        console.log(e.target.value)
                                      }}>
                            <option value="Russian">Russian</option>
                            <option value="French">French</option>
                            <option value="Korean">Korean</option>
                          </select>
    
                        </Form.Item >
                         </Form>
                        </div>
                          <div className='buttom-block-right'>
                          <Form.Item>
                          <TextArea showCount maxLength={100} onChange={onChange} placeholder="Введите текст" className='Text_area' />
                          <Button onClick={() => {navigate('')}} className='buttom-audio' >Прослушать</Button>
                          </Form.Item>
                        </div>
                    </div>            
          </div>
        </div>
                  <footer id="footer" className="footer section">
                    <div className="footer-top">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="logo">                              
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
    </div>      
    )
}
