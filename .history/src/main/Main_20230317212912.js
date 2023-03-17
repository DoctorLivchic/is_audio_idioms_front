import React, {useEffect} from 'react';
import {Button, Form, Input, Checkbox, Select } from 'antd';
import {useNavigate} from "react-router-dom";
import { input1 } from '../CONST';
import { supabase } from '../supabaseClient.js';
import { async } from "q";
import role from '../App.js';
const { TextArea } = Input;

const onChange = (e) => {
 console.log('Change:', e.target.value);
};

function onChangeInput(value){
  console.log(value);
}

function changeLanguage(){
  const chosenLanguage = document.getElementById("select_lang_enter").value; //Возвращаем выбранный язык ввода
  const translationLanguage = document.getElementById("select_lang_exit").value; //Возвращаем выбранный язык вывода
  document.getElementById("select_lang_enter").value = translationLanguage; 
  document.getElementById("select_lang_exit").value = chosenLanguage;
  const firstT = document.getElementById("textAreaEnter").value;
  const firstText = firstT.toLowerCase(); //Возвращаем текст из левого блока
  const secondT = document.getElementById("textAreaExit").value; 
  const secondText = secondT.toLowerCase(); //Возвращаем текст из правого блока
  document.getElementById("textAreaEnter").value = secondT;
  document.getElementById("textAreaExit").value = firstT; 
}

async function getPhrase(){
  const phrase = await supabase.from('phraseological').select();
  return phrase;
}

async function translateFunction(){
  
  const chosenLanguage = document.getElementById("select_lang_enter").value; //Возвращаем выбранный язык ввода
  console.log(chosenLanguage);

  const translationLanguage = document.getElementById("select_lang_exit").value; //Возвращаем выбранный язык вывода
  console.log(translationLanguage);

  const firstT = document.getElementById("textAreaEnter").value;
  const firstText = firstT.toLowerCase(); //Возвращаем текст к переводу
  console.log(firstText);

  const phrase = getPhrase();
    
  const data  = (await phrase).data;

  // console.log(data[0][chosenLanguage]);


  
    for (let i=0; i<data.length; i++){

      if(data[i][chosenLanguage] == firstText){ //Сравниваем, если текст выбранного языка == введенному тексту
        document.getElementById("textAreaExit").value = data[i][translationLanguage]; //то выводим во второй текстБокс перевод по выбранному языку к переводу
      }     
    }
  if (firstText==""){
    alert("Ошибка фразеологизм не введен")
  }

}



export default function Main(){
const navigate = useNavigate();
    return(
        <div className="main_page" id="main_page">
           <header>
      <nav>
        <ul className="navig_main">
          <Form.Item>
              <Button onClick={() => {navigate('/')}} className='btn-7'>Главная</Button>
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
                          <select id="select_lang_enter" onChange={e => {
                                        console.log(e.target.value)
                                      }}>
                            <option id='rus' value="rus">Русский</option>
                            <option id='fre' value="fre">French</option>
                            <option id='kor' value="kor">Korean</option>
                          </select>
                        </Form.Item >
                        </Form>
                        </div>
                          <div className='buttom-block-left'>
                          <Form.Item>

                            {/* Поле ввода фразеологизма  */}
                           
                          <TextArea showCount id='textAreaEnter' maxLength={100} /*onChange={onChange}*/ placeholder="Введите текст" className='Text_area' />                      
                          <Button onClick={() => {navigate('')}} className='buttom-audio' >Прослушать</Button>
                          </Form.Item>
                        </div>
                    </div>



                    <div className='headercenter'>
                          <div className='buttom-block-center'>
                          <Form.Item>
                          <Button onClick={changeLanguage} className='-' >Заменить</Button>
                          <br></br>
                          <Button onClick={translateFunction} className='-' id='translateButton' >Перевести</Button>  
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
                          <select id="select_lang_exit" onChange={e => {
                                        console.log(e.target.value)
                                      }}>
                            <option id='rus1' value="rus">Русский</option>
                            <option id='fre1' value="fre">French</option>
                            <option id='kor1' value="kor">Korean</option>
                          </select>
    
                        </Form.Item >
                         </Form>
                        </div>
                          <div className='buttom-block-right'>
                          <Form.Item>

                            {/* Поле вывода переведенного фразеологизма  */}
                          <TextArea showCount id='textAreaExit' maxLength={100} /*onChange={onChange}*/ placeholder="Перевод" className='Text_area' />
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
