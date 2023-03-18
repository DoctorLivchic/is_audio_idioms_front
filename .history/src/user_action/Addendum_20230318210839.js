import React from 'react';
import { Layout, Space } from 'antd';
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, Checkbox, Select } from 'antd';
import { supabase } from '../supabaseClient.js';

export default function Addendum()  {


//Валидация руского перевода
function validrus(rus_request) {
  var re = /^[А-ЯЁ\s]+$/i;
  var valid = re.test(rus_request);
  return valid;
}

//Валидация французского перевода
function validfre(rus_request) {
  var re = /^[A-Z\s]+$/i;
  var valid = re.test(rus_request);
  return valid;
}

//Валидация корейского перевода
function validkor(rus_request) {
  var re = /^[가-힣\s]+$/i;
  var valid = re.test(rus_request);
  return valid;
}

function setRed(formId){
    document.getElementById(formId).setAttribute("class","form-style1")
  }

//Регистрация нового Запроса
async function addrequest(){
  const rus = document.getElementById("log_rus").value;
  const fre = document.getElementById("log_fre").value;
  const kor = document.getElementById("log_kor").value;
  const request_status1 = 1;
  const Request_type1 = 1;

  //Запись 
  if(validrus(rus)){
    if(validfre(fre)){
      if(validkor(kor)){
        try{
          const { error } = await supabase
          .from('request_')
          .insert({ rus_request: rus, fre_request: fre, kor_request: kor , request_status : request_status1, Request_type : Request_type1 })
        }catch (error) {
            alert(error.error_description || error.message)
          }
        alert("Вы успешно добавили запрос!");
      }else{
        setRed('log_kor');
        alert("Вы ввели некорректный корейский перевод!");
        document.getElementById("log_kor").value = "";
      }
    }else{
      setRed('log_fre');
      alert("Вы ввели некорректный французский перевод перевод!");
      document.getElementById("log_fre").value = "";
    }
  }else{
    setRed('log_rus');
    alert("Вы ввели некорректный русский перевод!");
    document.getElementById("log_rus").value = "";
  }
}


const navigate = useNavigate();
      return (
        <div className='Addendum'>
        <header>
          <nav>
            <ul className="navig_main">
              <Form.Item>
                  <Button onClick={() => {navigate('/main_page/Main_page_aut')}} className='btn-7'>Главная</Button>
              </Form.Item>
            </ul>
          </nav>
        </header> 

        <div className="section">
        <div className="container">
         
              <div
                className="section pb-5 pt-5 pt-sm-2 text-center"
                align="center"
              >             
                <label for="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front_Add">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb">Введите информацию о фразеологизме</h4>             
                          <div className="form-group">
                            <Input
                              type="text"
                              name="log_rus"
                              className="form-style"
                              placeholder="Русский перевод"
                              id="log_rus"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          
                          <div className="form-group mt-2">
                            <Input
                              type="text"
                              name="log_fre"
                              className="form-style"
                              placeholder="Французский перевод"
                              id="log_fre"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>

                          <div className="form-group mt-2">
                            <Input
                              type="text"
                              name="log_kor"
                              className="form-style"
                              placeholder="Корейский перевод"
                              id="log_kor"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <Form.Item>
                              <Button onClick={() => {addrequest()}} className='btn'>Отправить</Button>
                          </Form.Item>
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
    </div>
    );
  
      }