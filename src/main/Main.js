import React, {useEffect} from 'react';
import {Button, Form, Input, Checkbox } from 'antd';
import {useNavigate} from "react-router-dom";
import { input1 } from '../CONST';


export default function Main(){
const navigate = useNavigate();
    return(
        <div className="App">
           <header>
						
      <nav>
        <ul class="navig">
          <Form.Item>
              <Button onClick={() => {navigate('/main_page/Main_page')}} className='active'>Главная</Button>
          </Form.Item>
        </ul>
      </nav>
        </header>     
        <div className='info'><h1>{input1}</h1></div>   
       <div className='headerleft'>
         <div className='languageleft'>
           <p>language 1</p>
         </div>
           <div className='buttom-block-left'>
                 <button>
                 <img width={30} height={30} src='img/micro.png' />
                 </button>              
           </div>
         <div className='search-block-left'>
             <input placeholder='Поиск...'/>
         </div>
       </div>
         <div className='headercenter'>
           <button>
           <img width={30} height={30} src='img/zam.png' />
           </button>
         </div>
         
         <div className='headerRight'>
           <div className='languageRight'>
             <p>language 2</p>
           </div>
               
           <div className='buttom-block-right'>
             <button>
             <img width={33} height={30} src='img/micro.png' />
             </button>
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
