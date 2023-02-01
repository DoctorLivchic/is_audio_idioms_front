import React from "react";
import {Button, Form, Input, Checkbox, Affix } from 'antd';
import {useNavigate} from "react-router-dom";
import { supabase } from './supabaseClient.js';
import { async } from "q";

//Валидация мэйла
function ValidMail(email) {
  var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  var valid = re.test(email);
  return valid;
}

//Валидация имени
function validName(name) {
  var re = /^[A-ZА-ЯЁ]+$/i;
  var valid = re.test(name);
  return valid;
}

//Сравнение паролей
function comparePass(password, passAffirm){
  if(password == passAffirm){
    return true;
  }
  else {
    return false;
  }
}



export default function Authorization()  {

  //Получение таблицы profiles
  async function getUser(){
    const profiles = await supabase.from('profiles').select();
    return profiles;
  }

  //Регистрация нового пользователя
  async function addUser(){
    
    const email1 = document.getElementById("logemailUp").value;
    const password1 = document.getElementById("logpassUp").value;
    const name1 = document.getElementById("logname").value;
    const passAffirm = document.getElementById("logpassAffirm").value;
    

    //Запись 
    if(validName(name1)){
      if(ValidMail(email1)){
        if(comparePass(password1, passAffirm)){
          try{
            const { error } = await supabase
            .from('profiles')
            .insert({ name: name1, email: email1, password: password1 })
          }catch (error) {
              alert(error.error_description || error.message)
            }
          alert("Регистрация прошла успешно!");
        }else{
          alert("Ваши пароли не совпадают!");
          document.getElementById("logpassUp").value = "";
          document.getElementById("logpassAffirm").value = "";
        }
      }else{
        alert("Вы ввели некорректный email!");
        document.getElementById("logemailUp").value = "";
      }
    }else{
      alert("Вы ввели некорректное имя!");
      document.getElementById("logname").value = "";
    }

    
    //попытка получить последнего добавленного юзера

    const profiles = getUser();
    
    const data  = (await profiles).data;

    // const usr = data[data.length-1]; //получаем последнюю запись
  }

  //Авторизация пользователя
  async function logIn(){
    const email = document.getElementById("logemailIn").value;
    const password = document.getElementById("logpassIn").value;
    var index = -1;
    //Получение всех профилей
    const profiles = getUser();
    const data  = (await profiles).data;
    for (let i=0; i<data.length; i++){
      if(data[i]['email']==email){
        index = i;
        break;
      }
    }

    if(index == -1){
      alert("Почта введена некорректно или такой почты не существует!");
    }else{
      if(data[index]['password']==password){
        navigate('/');
        alert("Вы успешно авторизовались!");
      }else{
        alert("Вы ввели некорректный пароль!");
      }
    }  
    
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
                                id="logemailIn"
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
                                id="logpassIn"
                                autocomplete="off"
                              />
                              <i class="input-icon uil uil-lock-alt"></i>
                            </div>
                            <Form.Item>
                                <Button onClick={() => {logIn()}} className='btn'>Авторизоваться</Button>
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
                                id="logemailUp"
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
                                id="logpassUp"
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
                                id="logpassAffirm"
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


