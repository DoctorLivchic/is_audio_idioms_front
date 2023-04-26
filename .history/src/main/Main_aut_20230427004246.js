import React, { useEffect } from "react";
import { Button, Form, Input, Checkbox, Select, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { input1 } from "../CONST";
import { supabase } from "../supabaseClient.js";
import { async } from "q";
import { Layout } from "antd";
import { HeartTwoTone, DislikeTwoTone, LikeTwoTone } from "@ant-design/icons";

const { Sider, Content } = Layout;
const { TextArea } = Input;

const contentStyle = {
  textAlign: "center",
  lineHeight: "220px",
  color: "#fff",
  backgroundColor: "#b7cbf7",
};

const onChange = (e) => {
  console.log("Change:", e.target.value);
};

function onChangeInput(value) {
  console.log(value);
}

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
}

async function getPhrase() {
  const chosenLanguage = document.getElementById("select_lang_enter").value;

  const firstT = document.getElementById("textAreaEnter").value;
  const firstText = firstT.toLowerCase(); //Возвращаем текст к переводу

  let lang = 0;
  if (chosenLanguage == "rus") {
    lang = 1;
  } else if (chosenLanguage == "kor") {
    lang = 2;
  } else {
    lang = 3;
  }
  const phrase = await supabase
    .from("phrase_text")
    .select("phrase_id")
    .eq("phrase_text_text", firstText);
  return phrase;
}

async function translateFunction() {
  // const chosenLanguage = document.getElementById("select_lang_enter").value; //Возвращаем выбранный язык ввода
  // console.log(chosenLanguage);

  const translationLanguage = document.getElementById("select_lang_exit").value; //Возвращаем выбранный язык вывода
  // console.log(translationLanguage);

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

  const phrase = getPhrase();
  console.log("Выбранный фразеологизм: "+ phrase.data() {
    return {
      
    }
  },)
  try {
    const translate = await supabase
      .from("phrase_text")
      .select("phrase_text_text")
      .eq(phrase.data[0]["phrase_id"]);
    document.getElementById("textAreaExit").value = translate[0][lang]; //то выводим во второй текстБокс перевод по выбранному языку к переводу
  } catch (error) {
    notification.open({ message: "Ошибка", description: error.message });
  }
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
              <Button icon={<HeartTwoTone />}>2</Button>
              <Button icon={<LikeTwoTone />}>25</Button>
              <Button icon={<DislikeTwoTone />}>2</Button>

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
    </div>
  );
}
