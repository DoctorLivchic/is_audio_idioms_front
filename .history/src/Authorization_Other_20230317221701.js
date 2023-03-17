import React from "react";
import {Button, Form, Input, Checkbox, Affix,Select, Empty } from 'antd';
import {useNavigate} from "react-router-dom";
import { supabase } from './supabaseClient.js';
import { async } from "q";

//const empty_item={role_id:0,name:"name",email:"email",password:"123",surname:"surname",patronymic:"patronymic",passport_series:123,passport_id:123,date_of_birth:"10.10.2020",contact_number:8952,diploma_id:134}

//Валидация мэйла
function ValidMail(email) {
  var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  var valid = re.test(email);
  return valid;
}

//Валидация имени
function validName(name,surname,patronymic) {
  var re = /^[A-ZА-ЯЁ]+$/i;
  var valid = re.test(name,surname,patronymic);
  return valid;
}

//Валидация серии паспорта
function validPasport_ser(passport_series) {
  var re = /^[0-9]+$/i;
  var valid = re.test(passport_series);
  return valid;
}

//Валидация номера папорта
function validPasport_id( passport_id) {
  var re = /^[0-9]+$/i;
  var valid = re.test( passport_id);
  return valid;
}

//Валидация номера телефона
function validPhone( contact_number) {
  var re = /^[0-9]+$/i;
  var valid = re.test( contact_number);
  return valid;
}

//Валидация номера диплома
function validdiploma_id( diploma_id) {
  var re = /^[0-9]+$/i;
  var valid = re.test( diploma_id);
  return valid;
}

//Сравнение паролей
function comparePass(password, passAffirm){
  if(password == passAffirm){
    if(password != "")
    return true;
  }
  else {
    return false;
  }
}


export default function Authorization_Other()  {
 
  function setRed(formId){
    document.getElementById(formId).setAttribute("class","form-style1")
  }
  function setWhite(formId){
    document.getElementById(formId).setAttribute("class","form-style")
  }
  //Получение таблицы user
  async function getUser(){
    const profiles = await supabase.from('user').select();
    return profiles;
  }
  //const el = document.querySelector('.form-style'); // получаем наш параграф
  //const styles = window.getComputedStyle(el); // получаем объект со всеми вычисленными стилями

  //Регистрация нового пользователя
  async function addUser(){
    
    const email1 = document.getElementById("logemailUp").value;
    const password1 = document.getElementById("logpassUp").value;
    const name1 = document.getElementById("logname").value;
    const passAffirm = document.getElementById("logpassAffirm").value;
    const surname1 = document.getElementById("logsurname").value;
    const lastname = document.getElementById("loglastname").value;
    const passport_series1 = document.getElementById("logpassport_series").value;
    const passport_id1 = document.getElementById("logpassport_id").value;
    const data1 = document.getElementById("logdata").value;
    const phone_number = document.getElementById("logphone_number").value;
    const diploma_id1 = document.getElementById("logdiploma_id").value;
    const rol = document.getElementById("select_reg").value;
    let role;
    //console.log(styles.box-shadow)

    //Запись 
    //console.log(rol)
    //console.log(JSON.stringify(empty_item))
    if(validName(name1,surname1,lastname)){
      if(ValidMail(email1)){
        if(comparePass(password1, passAffirm)){
          if(validPasport_ser(passport_series1)){
            if(validPasport_id(passport_id1)){
              if(validPhone(phone_number)){
                if(validdiploma_id(diploma_id1)){
                  
          try{
            
            if(rol == 'эксперт'){
              role = 2;
            }
            else if(rol == 'модератор'){
              role = 1;
            }else(role=3);
            const { error } = await supabase
            .from('user')
            .insert( {login: email1, role_id : role, name: name1,surname: surname1,patronymic : lastname,passport_series : passport_series1,passport_id : passport_id1,date_of_birth : data1,contact_number : phone_number, diploma_id : diploma_id1 , email: email1, password: password1} )
          }catch (error) {
              alert(error.error_description || error.message)
            }
          alert("Регистрация прошла успешно!");

        }else{
          alert("Вы ввели некорректный номер диплома!");
          document.getElementById("logdiploma_id").value = "";
        }
        }else{
          alert("Вы ввели некорректный номер телефона!");
          document.getElementById("logphone_number").value = "";
        }
        }else{
          alert("Вы ввели некорректный номер паспорта!");
          document.getElementById("logpassport_id").value = "";
        }
        }else{
          alert("Вы ввели некорректную серию паспорта!");
          document.getElementById("logpassport_series").value = "";
        }
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
      alert("Вы ввели некорректное ФИО!");
      document.getElementById("logname").value = "";
    }

    
    //попытка получить последнего добавленного юзера

    const profiles = getUser();
    
    const data  = (await profiles).data;

    // const usr = data[data.length-1]; //получаем последнюю запись
  }

  //Авторизация эксперта\модератора
  async function logIn(){
    const email = document.getElementById("logemailIn").value;
    const password = document.getElementById("logpassIn").value;
    const role_id = document.getElementById("select_reg").value;
    let role;
    // if(rol == 'эксперт'){
    //   role = 2;
    // }
    // else if(rol == 'модератор'){
    //   role = 1;
    // }else(role=3);
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
      setRed('logemailIn');
      alert("Почта введена некорректно или такой почты не существует!");
    }else{
      if(data[index]['password']==password){
        if(data[index]["role_id"]==1){
          navigate('/Moderator_personal_account');
          alert("Вы успешно авторизовались!");}
        if(data[index]["role_id"]==2){
          navigate('/Expert_personal_account');
          alert("Вы успешно авторизовались!");}
      }else{
        if (data[index]['password']!=password){
        setRed('logpassIn');
        setWhite('logemailIn')
        alert("Вы ввели некорректный пароль!");
      }else{
        alert("Вы выбрали некорректную роль!")
      }
      
    }  
    
    }
  
}
 

  const navigate = useNavigate();
      return (
      <div className="authorization">
        <div className="section">
          <div className="container">
            <div className="row full-height justify-content-center">
              <div className="col-12 text-center align-self-center py-5">
                <div
                  className="section pb-5 pt-5 pt-sm-2 text-center"
                  align="center"
                >
                  <h6 className="mb-0 pb-3">
                    <span >Авторизоваться </span>
                    <span>Зарегистрироваться</span>
                   
                  </h6>


                  <input
                    className="checkbox"
                    type="checkbox"
                    id="reg-log"
                    name="reg-log"
                  />
                  <label for="reg-log"></label>
                  <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">
                      <div className="card-front_Other">
                        <div className="center-wrap">
                          <div className="section text-center">
                            <h4 className="mb">Авторизоваться</h4>

                            <div className="form-group">
                            <Form>
                              <Form.Item 
                                name="logrolavt"
                                id="logrolavt"
                                label={<label style={{ color: "white" }}>Выбор роли</label>}
                                >
                               
                                  <select id="select_avt"  >
                                    <option value={2}>Эксперт</option>
                                    <option value={1}>Модератор</option>
                                  </select>
                              </Form.Item >
                            </Form>
                              <i className="input-icon uil uil-user"></i>
                            </div>

                            <div className="form-group">
                              <Input
                                type="email"
                                name="logemail"
                                className="form-style"
                                placeholder="Адрес электронной почты"
                                id="logemailIn"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            
                            <div className="form-group mt-2">
                              <Input
                                type="password"
                                name="logpass"
                                className="form-style"
                                placeholder="Пароль"
                                id="logpassIn"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <Form.Item>
                                <Button onClick={() => {logIn()}} className='btn'>Авторизоваться</Button>
                                <Button onClick={() => {navigate("/")}} className='btn'>Назад</Button>
                              </Form.Item>
                          </div>
                        </div>
                      </div>
                      <div className="card-back_Other">
                        <div className="center-wrap">
                          <div className="section text-center">
                            <h4 className="mb-4 pb-3">Зарегистрироваться</h4>
                            
                            <div className="form-group">
                            <Form>
                              <Form.Item 
                                name="logrol"
                                id="logrol"
                                label={<label style={{ color: "white" }}>Выбор роли</label>}>
                                  <select id="select_reg" onChange={e => {
                                        console.log(e.target.value)
                                      }} >
                                    <option value={2}>Эксперт</option>
                                    <option value={1}>Модератор</option>
                                  </select>
                              </Form.Item >
                            </Form>
                              <i className="input-icon uil uil-user"></i>
                            </div>

                            <div className="form-group">
                              <Input
                                /*onChange={value=>empty_item.name=value}*/
                                type="text"
                                name="logname"
                                className="form-style"
                                placeholder="Имя"
                                id="logname"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>

                            <div className="form-group mt-2">
                              <Input
                               /* onChange={value=>empty_item.surname=value}*/
                                type="text"
                                name="logsurname"
                                className="form-style"
                                placeholder="Фамилия"
                                id="logsurname"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            
                            <div className="form-group mt-2">
                              <Input
                                /*onChange={value=>empty_item.patronymic=value}*/
                                type="text"
                                name="loglastname"
                                className="form-style"
                                placeholder="Отчество"
                                id="loglastname"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>

                            <div className="form-group mt-2">
                              <Input
                                /*onChange={value=>empty_item.passport_series=value}*/
                                maxLength={4}
                                type="text"
                                name="logpassport_series"
                                className="form-style"
                                placeholder="Серия паспорта"
                                id="logpassport_series"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>

                            <div className="form-group mt-2">
                              <Input
                               /* onChange={value=>empty_item.passport_id=value}*/
                                maxLength={6}
                                type="text"
                                name="logpassport_id"
                                className="form-style"
                                placeholder="Номер паспорта"
                                id="logpassport_id"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>

                            <div className="form-group mt-2">
                              <Input
                                /*onChange={value=>empty_item.date_of_birth=value}*/
                                type="text"
                                name="logdata"
                                className="form-style"
                                placeholder="Дата рождения"
                                id="logdata"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>

                            <div className="form-group mt-2">
                              <Input
                               /* onChange={value=>empty_item.contact_number=value}*/
                                maxLength={11}
                                type="text"
                                name="logphone_number"
                                className="form-style"
                                placeholder="Номер телефона"
                                id="logphone_number"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>

                            <div className="form-group mt-2">
                              <Input
                                /*onChange={value=>empty_item.diploma_id=value}*/
                                maxLength={13}
                                type="text"
                                name="logdiploma_id"
                                className="form-style"
                                placeholder="Номер диплома"
                                id="logdiploma_id"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>

                            <div className="form-group mt-2">
                              <Input
                                /*onChange={value=>empty_item.email=value}*/
                                type="email"
                                name="logemail"
                                className="form-style"
                                placeholder="Адрес электронной почты"
                                id="logemailUp"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>

                            <div className="form-group mt-2">
                              <Input
                               /* onChange={value=>empty_item.password=value}*/
                                type="password"
                                name="logpass"
                                className="form-style"
                                placeholder="Пароль"
                                id="logpassUp"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <div className="form-group mt-2">
                              <Input
                                type="password"
                                name="logpass"
                                className="form-style"
                                placeholder="Подтвердите пароль"
                                id="logpassAffirm"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
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