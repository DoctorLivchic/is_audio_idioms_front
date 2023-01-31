import React from "react";
import {Button, Form, Input, Checkbox } from 'antd';
import {useNavigate} from "react-router-dom";
import { supabase } from './supabaseClient.js';

export default function Authorization()  {

  async function addUser(){
    
    const email = document.getElementById("logemail").value;
    const password = document.getElementById("logpass").value;
    const name = document.getElementById("logname").value;

    
    // const profiles = await supabase.from('profiles').select()
    console.log(email)
    console.log(password)
    



  }

  const navigate = useNavigate();
      return (
      <div className="authorization">
        <div class="section">
          <div class="container">
            <div class="row full-height justify-content-center">
              <div class="col-12 text-center align-self-center py-5">
                <div
                  class="section pb-5 pt-5 pt-sm-2 text-center"
                  align="center"
                >
                  <h6 class="mb-0 pb-3">
                    <span  >Авторизоваться </span>
                    <span>Зарегистрироваться</span>
                   
                  </h6>


                  <input
                    class="checkbox"
                    type="checkbox"
                    id="reg-log"
                    name="reg-log"
                  />
                  <label for="reg-log"></label>
                  <div class="card-3d-wrap mx-auto">
                    <div class="card-3d-wrapper">
                      <div class="card-front">
                        <div class="center-wrap">
                          <div class="section text-center">
                            <h4 class="mb">Авторизоваться</h4>
                            <div class="form-group">
                              <input
                                type="email"
                                name="logemail"
                                class="form-style"
                                placeholder="Адрес электронной почты"
                                id="logemail"
                                autocomplete="off"
                              />
                              <i class="input-icon uil uil-at"></i>
                            </div>
                            
                            <div class="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                class="form-style"
                                placeholder="Пароль"
                                id="logpass"
                                autocomplete="off"
                              />
                              <i class="input-icon uil uil-lock-alt"></i>
                            </div>
                            <Form.Item>
                                <Button onClick={() => {navigate("Main_page")}} className='btn'>Авторизоваться</Button>
                                <Button onClick={() => {navigate("/")}} className='btn'>Назад</Button>
                              </Form.Item>
                          </div>
                        </div>
                      </div>
                      <div class="card-back">
                        <div class="center-wrap">
                          <div class="section text-center">
                            <h4 class="mb-4 pb-3">Зарегистрироваться</h4>
                            <div class="form-group">
                              <input
                                type="text"
                                name="logname"
                                class="form-style"
                                placeholder="Имя"
                                id="logname"
                                autocomplete="off"
                              />
                              <i class="input-icon uil uil-user"></i>
                            </div>
                            <div class="form-group mt-2">
                              <input
                                type="email"
                                name="logemail"
                                class="form-style"
                                placeholder="Адрес электронной почты"
                                id="logemail"
                                autocomplete="off"
                              />
                              <i class="input-icon uil uil-at"></i>
                            </div>
                            <div class="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                class="form-style"
                                placeholder="Пароль"
                                id="logpass"
                                autocomplete="off"
                              />
                              <i class="input-icon uil uil-lock-alt"></i>
                            </div>
                            <div class="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                class="form-style"
                                placeholder="Подтвердите пароль"
                                id="logpass"
                                autocomplete="off"
                              />
                              <i class="input-icon uil uil-lock-alt"></i>
                            </div>
                            <div className="button">
                              <Form.Item>
                                <Button onClick={addUser} className='btn'>Регистрация</Button>
                                <Button onClick={() => {navigate("/")}} className='btn'>Назад</Button>
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
    );
  
}


