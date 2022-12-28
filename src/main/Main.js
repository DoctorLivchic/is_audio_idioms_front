import React, {useEffect} from 'react';
import {Button, Form, Input, Checkbox } from 'antd';
import {useNavigate} from "react-router-dom";
import { input1 } from '../CONST';


export default function Main(){
const navigate = useNavigate();
    return(
        <div className="main_page" id="main_page">
           <header>
      <nav>
        <ul class="navig_main">
          <Form.Item>
              <Button onClick={() => {navigate('/main_page/Main_page')}} className='active1'>Главная</Button>
          </Form.Item>
        </ul>
      </nav>
        </header>    
       
        <div className='info' align="center"><h1>{input1}</h1></div>   
       <div className='headerleft'>
         <div className='languageleftlabel' align="center">
           <p>language 1</p>
         </div>
           <div className='buttom-block-left'>
           <Form.Item>
              <Button onClick={() => {navigate('')}} className='buttom-left'>перевести</Button>
          </Form.Item>              
           </div>
         <div className='search-block-left'>           
         </div>
       </div>
         <div className='headercenter'>
             <Form.Item>
              <Button onClick={() => {navigate('')}} className='active'>Заменить</Button>
             </Form.Item> 
         </div>        
         <div className='headerRight'>
           <div className='languageRight'>
             <p className='languageRightlabel'>language 2</p>
           </div>               
           <div className='buttom-block-right'>            
             <Form.Item>
              <Button onClick={() => {navigate('')}} className='buttom-right'>перевести</Button>
             </Form.Item>            
           </div>
               <div className='search-block-right'>
                 <input placeholder='Поиск...'/>
              </div>              
                </div>
        



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
