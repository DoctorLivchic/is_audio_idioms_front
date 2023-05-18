
import { Layout, Space } from 'antd';
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, Checkbox, Select,notification } from 'antd';
import { supabase } from '../supabaseClient.js';
import Pagefooter from "../component/Pagefooter";
import { useState } from "react";
import React, { useEffect } from "react";
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

  const [tag, settag] = useState([]);

  useEffect(() => {
    gettags();
  }, []);

  async function handleChange  (value)  {
    const a = value
    console.log(a)
    return (a)
  }


  async function gettags() {
    const tags = await supabase.from("tags").select();
    const tag = (await tags).data;
    const data_tag = await supabase.from("tags").select();
    settag(data_tag.data);
    return data_tag;
  }

//Регистрация нового Запроса
async function addrequest(value){
  const rus = document.getElementById("log_rus").value;
  const fre = document.getElementById("log_fre").value;
  const kor = document.getElementById("log_kor").value;
  const link = document.getElementById("log_link").value;
  const tag = value;
  const request_status1 = 1;
  const Request_type1 = 1;
  //Получаем айди пользователя
  let userID = localStorage.getItem("userID"); //получаем айди авторизованного пользователя
  console.log(userID);
  console.log(tag)
  //Запись 
  if(validrus(rus)){
    if(validfre(fre)){
      if(validkor(kor)){ 
        try{
          const { error } = await supabase
          .from('request')
          .insert({ rus_request: rus, fre_request: fre, kor_request: kor , status_id : request_status1, type_id : Request_type1,link_phraseological : link, user_id: parseInt(userID),tag_id:tag })
        }catch (error) {
          notification.open({message:'Ошибка',description:error.message})
          }
        notification.open({message:'Успешно',description:'Вы успешно добавили запрос!'})
        // window.location.reload();
      }else{
        setRed('log_kor');
        notification.open({message:'Ошибка',description:'Вы ввели некорректный корейский перевод!'})
        document.getElementById("log_kor").value = "";
      }
    }else{
      setRed('log_fre');
      notification.open({message:'Ошибка',description:'Вы ввели некорректный французский перевод перевод!'})
      document.getElementById("log_fre").value = "";
    }
  }else{
    setRed('log_rus');
    notification.open({message:'Ошибка',description:'Вы ввели некорректный русский перевод!'})
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
                align="center">             
                <label for="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front_Add">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb">Введите информацию о фразеологизме</h4>             
                          <div className="form-group">
                            <input
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
                            <input
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
                            <input
                              type="text"
                              name="log_kor"
                              className="form-style"
                              placeholder="Корейский перевод"
                              id="log_kor"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>

                          <div className="form-group mt-2">
                            <input
                              type="text"
                              name="log_link"
                              className="form-style"
                              placeholder="Ссылка на фразеологизм"
                              id="log_link"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                     
                     
                           <div className="form-group mt-2">
                          <Form.Item style={{ height:"5%" }} >
                          <Select
                            id='log_tag_id'
                            name="log_tag_id"
                            style={{ height:"5%"}} 
                            defaultValue="Выберите значение"
                            onChange={handleChange}
                            options={tag?.map((tag) => {
                              return {
                                label: tag.tag_name,
                                value: tag.tag_id,
                              };
                            })}
                          />
                          </Form.Item>
                          </div> 
                          <Form.Item>
                              <Button onClick={() => {addrequest()}} className='btn' style={{ position: "relative", left: "-6%" }}>Отправить</Button>
                          </Form.Item>
                       </div> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
             </div>        

          <div id="footer" className="footer_main section">
           <Pagefooter></Pagefooter>
          </div>
      </div>
    </div>
    );
  
      }