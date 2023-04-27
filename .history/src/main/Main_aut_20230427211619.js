import React, { useEffect } from "react";
import { Button, Form, Input, Checkbox, Select, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { input1 } from "../CONST";
import { supabase } from "../supabaseClient.js";
import { async } from "q";
import { Layout } from "antd";
import { HeartTwoTone, DislikeTwoTone, LikeTwoTone } from "@ant-design/icons";
import Pagefooter from "../component/Pagefooter";
import { Authorization } from "../Authorization";
import {useState} from 'react';

const { Sider, Content } = Layout;
const { TextArea } = Input;



const contentStyle = {
  textAlign: "center",
  lineHeight: "220px",
  color: "#fff",
  backgroundColor: "#95aacc",
};

const onChange = (e) => {
  console.log("Change:", e.target.value);
};

function onChangeInput(value) {
  console.log(value);
}

//Функция смены языков в выпадающих меню
function changeLanguage() {
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
  const li = document.getElementById("like").value;
}

//Функция получения лайков
async function GetLike() {
  const firstT = document.getElementById("textAreaEnter").value;
  const firstText = firstT.toLowerCase(); //Возвращаем текст

  const phrase = await supabase
    .from("phrase_text")
    .select()
    .eq("phrase_text_text", firstText);

  const likes = await supabase
    .from("phraseological")
    .select()
    .eq("phrase_id", phrase.data[0]["phrase_id"]);

  let i = likes.data[0]['rating_like']
    return i;
}

//Функция перевода
async function translateFunction() {

  GetLike();
  
  

  const translationLanguage = document.getElementById("select_lang_exit").value; //Возвращаем выбранный язык вывода
  // console.log(translationLanguage);

  //Получаем язык на который переводим
  let lang = 0;
  if (translationLanguage == "rus") {
    lang = 1;
  } else if (translationLanguage == "kor") {
    lang = 2;
  } else {
    lang = 3;
  }

  const firstT = document.getElementById("textAreaEnter").value;
  const firstText = firstT.toLowerCase(); //Возвращаем текст к переводу
  console.log(firstText);

  //Получаем айди фразеологизма с которого переводим
  const phrase = await supabase
    .from("phrase_text")
    .select()
    .eq("phrase_text_text", firstText);

  try {
    //Получаем фразеологизм на языке, который выбран к переводу
    const translate = await supabase
      .from("phrase_text")
      .select("phrase_text_text")
      .eq("phrase_id", phrase.data[0]["phrase_id"])
      .eq("language_id", lang);
    document.getElementById("textAreaExit").value =
      translate.data[0]["phrase_text_text"]; //то выводим во второй текстБокс перевод по выбранному языку к переводу
  } catch (error) {
    notification.open({ message: "Ошибка", description: error.message });
  }

  //-------------------------------------------------------------------------------
  // Вывод лайков
}

//Функция лайка
async function likePhrase() {
  const firstT = document.getElementById("textAreaEnter").value;
  const firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма

  //Получаем айди фразеологизма
  const phrase = await supabase
    .from("phrase_text")
    .select("phrase_id")
    .eq("phrase_text_text", firstText);

  const phrase2 = await supabase
    .from("phraseological")
    .select()
    .eq("phrase_id", phrase.data[0]["phrase_id"]);

  let like = phrase2.data[0]["rating_like"];
  console.log("like: " + like);
  const { error } = await supabase
    .from("phraseological")
    .update({ rating_like: like + 1 })
    .eq("phrase_id", phrase.data[0]["phrase_id"]);
}
//Функция дизлайка
function dislikePhrase() {}
//Функция добавления в избранное
async function addToFavourite() {
  const firstT = document.getElementById("textAreaEnter").value;
  const firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма

  //Получаем айди фразеологизма
  const phrase = await supabase
    .from("phrase_text")
    .select("phrase_id")
    .eq("phrase_text_text", firstText);

  //Получаем айди пользователя
}

export default function Main() {

  
  
  
  
  

  const navigate = useNavigate();
  return (
    <div className="main_page" id="main_page">
      <header>
        <nav>
          <ul className="navig_main">
            <Form.Item>
              <Button
                onClick={() => {
                  navigate("/main_page/Main_page_aut");
                }}
                className="btn-7"
              >
                Главная
              </Button>
            </Form.Item>
          </ul>
        </nav>
      </header>

      <div className="input">
        <div className="text" align="center">
          <h1>{input1}</h1>
        </div>
      </div>

      <Layout>
        <Content style={contentStyle}>
          Content
          <div className="languagelabel">
            <Form layout={"vertical"}>
              <h4 className="h4_">"Выбор языка"</h4>
              <Form.Item name="language_left" id="language_left">
                <select
                  id="select_lang_enter"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                >
                  <option id="rus" value="rus">
                    Русский
                  </option>
                  <option id="fre" value="fre">
                    French
                  </option>
                  <option id="kor" value="kor">
                    Korean
                  </option>
                </select>
              </Form.Item>
            </Form>
          </div>
          <div className="buttom-block">
            <Form.Item>
              {/* Поле ввода фразеологизма  */}
              <TextArea
                showCount
                id="textAreaEnter"
                maxLength={100}
                /*onChange={onChange}*/ placeholder="Введите текст"
                className="Text_area"
              />
              <Button onClick={addToFavourite} icon={<HeartTwoTone />}></Button>
              <Button
                onClick={likePhrase}
                id="like"
                icon={<LikeTwoTone />}
              >{GetLike}</Button>
              <Button
                onClick={dislikePhrase}
                id="dislike"
                icon={<DislikeTwoTone />}
              >{GetLike}</Button>

              <Button
                onClick={() => {
                  navigate("");
                }}
                className="buttom-audio"
              >
                Прослушать
              </Button>
            </Form.Item>
            <Checkbox onChange={onChange}>Поиск по категории</Checkbox>
          </div>
        </Content>

        <Sider className="lef">
          <div className="headercenter">
            <div className="buttom-block-center">
              <Form.Item>
                <Button onClick={changeLanguage} className="Button_top">
                  Заменить
                </Button>
                <br></br>
                <Button
                  onClick={translateFunction}
                  className=""
                  id="translateButton"
                >
                  Перевести
                </Button>
              </Form.Item>
            </div>
          </div>
        </Sider>

        <Content style={contentStyle}>
          Content
          <div className="languagelabel">
            <Form layout="vertical">
              <h4 className="h4_">"Выбор языка"</h4>
              <Form.Item name="language_right" id="language_right">
                <select
                  id="select_lang_exit"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                >
                  <option id="rus1" value="rus">
                    Русский
                  </option>
                  <option id="fre1" value="fre">
                    French
                  </option>
                  <option id="kor1" value="kor">
                    Korean
                  </option>
                </select>
              </Form.Item>
            </Form>
          </div>
          <div className="buttom-block">
            <Form.Item>
              {/* Поле вывода переведенного фразеологизма  */}
              <TextArea
                showCount
                id="textAreaExit"
                maxLength={100}
                /*onChange={onChange}*/ placeholder="Перевод"
                className="Text_area"
              />
              <Button
                onClick={() => {
                  navigate("");
                }}
                className="buttom-audio"
              >
                Прослушать
              </Button>
            </Form.Item>
          </div>
        </Content>
      </Layout>
      <Pagefooter></Pagefooter>
    </div>
  );
}
