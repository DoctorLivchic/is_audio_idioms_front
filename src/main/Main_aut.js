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
import { useState } from "react";

export default function Main() {
  const [buttonTextLike, setButtonTextLike] = useState(0);
  const [buttonTextDislike, setButtonTextDislike] = useState(0);
  const [tag, settag] = useState([]);
  const [chbox, setchbox] = useState("none");
  const [lidesc,setlidesc]= useState([]);
  const [litranscEnter,setlitranscEnter] = useState([]);
  const [translitExit,settranslitExit] = useState([]);

  const { Sider, Content } = Layout;
  const { TextArea } = Input;

  async function testAuth() {
    const temp = await supabase.from("user").select();

    console.log(temp.data[0]);
  }

  const contentStyle = {
    textAlign: "center",
    lineHeight: "220px",
    color: "#fff",
    backgroundColor: "#95aacc",
  };
  //-----------------функция отображения панели тегов-------------------------
  async function onChange() {
    var chec = document.getElementById("one");
    if (chec.checked) {
      setchbox("contents");
      console.log("отобразить", chbox);
    } else {
      setchbox("none");
      console.log("не отобразить", chbox);
    }
    return chbox;
  }

  function onChangeInput(value) {
    console.log(value);
  }
  //-----------------Функция перевода по категории
  async function handleChange(value) {
    const val = value;
    console.log(val);

    const translationLanguage =
      document.getElementById("select_lang_exit").value; //Возвращаем выбранный язык вывода
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
    console.log(lang+" язык")

    document.getElementById("textAreaEnter").value =""

    try {
      //Получаем фразеологизм на языке, который выбран к переводу
      const translate_tag = await supabase
        .from("phraseological")
        .select("phrase_id","tag_id")
        .eq("tag_id", val)
  
        console.log(translate_tag.data)
  
      for(let i = 0; i <= translate_tag.data.length; i++){
      const translate_tag_enter = await supabase
        .from("phrase_text")
        .select("phrase_text_text")
        .eq("phrase_id",translate_tag.data[i]["phrase_id"])
        .eq("language_id",lang)
        
        console.log(translate_tag_enter.data)
        
      document.getElementById("textAreaEnter").value +=
      translate_tag_enter.data[0]["phrase_text_text"]+" ; " //то выводим во второй текстБокс перевод по выбранному языку к переводу
    }} catch (error) {
      notification.open({ message: "Успешно", description: "Найдены все фразеологизмы по выбранной категории" });
    }
    };

  useEffect(() => {
    gettags();
  }, []);

  async function gettags() {
    const tags = await supabase.from("tags").select();
    const tag = (await tags).data;
    const data_tag = await supabase.from("tags").select();
    settag(data_tag.data);
    return data_tag;
  }

  //---------------------------Функция смены языков в выпадающих меню-----------------------------
  function changeLanguage() {
    const chosenLanguage = document.getElementById("select_lang_enter").value; //Возвращаем выбранный язык ввода
    const translationLanguage =
      document.getElementById("select_lang_exit").value; //Возвращаем выбранный язык вывода
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

  //Функция получения лайков и дизлайков
  async function GetLike() {
    const firstT = document.getElementById("textAreaEnter").value;
    const firstText = firstT.toLowerCase(); //Возвращаем текст

    if (firstText == "") {
      document.getElementById("textAreaExit").value = "";
    } else {
      const phrase = await supabase
        .from("phrase_text")
        .select()
        .eq("phrase_text_text", firstText);

      const likes = await supabase
        .from("phraseological")
        .select()
        .eq("phrase_id", phrase.data[0]["phrase_id"]);

      setButtonTextLike(likes.data[0]["rating_like"]);
      setButtonTextDislike(likes.data[0]["rating_dislike"]);
    }
  }
  //--------------------------Состояния цветов ------------------------------------------
  const [color, setcolor] = useState("");
  const [stylBut, setstylBut] = useState([]);

  async function isAddFav() {
    const fav = await supabase
      .from("favourites_phraseological")
      .select("phrase_id")
      .eq("user_id", localStorage.getItem("userID"));

    const firstT = document.getElementById("textAreaEnter").value;
    var firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма

    //Получаем айди фразеологизма
    const phrase = await supabase
      .from("phrase_text")
      .select("phrase_id")
      .eq("phrase_text_text", firstText);

    let ok = false;

    for (let i = 0; i < fav.data.length; i++) {
      if (phrase.data[0]["phrase_id"] == fav.data[i]["phrase_id"]) {
        // delFromFav();
        ok = true;
        break;
      }
    }
    if (!ok) {
      setcolor("");
      setstylBut("");
    } else {
      setstylBut("#f5988c");
      setcolor("#eb2f96");
    }
  }

  //Функция перевода
  async function translateFunction() {
    setcolor("");
    isAddFav();
    GetLike();
    const translationLanguage =
      document.getElementById("select_lang_exit").value; //Возвращаем выбранный язык вывода
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

    if (firstText == "") {
      document.getElementById("textAreaExit").value = "";
    } else {
      //Получаем айди фразеологизма с которого переводим
      const phrase = await supabase
        .from("phrase_text")
        .select()
        .eq("phrase_text_text", firstText);
      try {
        //Получаем фразеологизм на языке, который выбран к переводу
        const translate = await supabase
          .from("phrase_text")
          .select()
          .eq("phrase_id", phrase.data[0]["phrase_id"])
          .eq("language_id", lang);

          settranslitExit((translate.data[0]["phrase_text_text"]))
          setlidesc(translate.data[0]["phrase_text_desc"])
          setlitranscEnter(translate.data[0]["phrase_text_transcription"])//то выводим во второй текстБокс перевод по выбранному языку к переводу
      } catch (error) {
        notification.open({
          message: "Фразеологизм не найден",
          description:
            "Вы можете добавить фразеологизм в соответствующей вкладке",
        });
      }
      //-------------------------------------------------------------------------------

      // Вывод лайков
    }
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

    const phrase3 = await supabase
      .from("phraseological")
      .select()
      .eq("phrase_id", phrase.data[0]["phrase_id"]);

    setButtonTextLike(phrase3.data[0]["rating_like"]);
    translateFunction();
  }
  //Функция дизлайка
  async function dislikePhrase() {
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

    let like = phrase2.data[0]["rating_dislike"];
    console.log("like: " + like);
    const { error } = await supabase
      .from("phraseological")
      .update({ rating_dislike: like + 1 })
      .eq("phrase_id", phrase.data[0]["phrase_id"]);

    const phrase3 = await supabase
      .from("phraseological")
      .select()
      .eq("phrase_id", phrase.data[0]["phrase_id"]);

    setButtonTextDislike(phrase3.data[0]["rating_dislike"]);
    translateFunction();
  }
  //Функция добавления в избранное

  async function addToFavButton() {
    const fav = await supabase
      .from("favourites_phraseological")
      .select("phrase_id")
      .eq("user_id", localStorage.getItem("userID"));

    const firstT = document.getElementById("textAreaEnter").value;
    var firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма

    //Получаем айди фразеологизма
    const phrase = await supabase
      .from("phrase_text")
      .select("phrase_id")
      .eq("phrase_text_text", firstText);

    let ok = false;

    for (let i = 0; i < fav.data.length; i++) {
      if (phrase.data[0]["phrase_id"] == fav.data[i]["phrase_id"]) {
        // delFromFav();
        ok = true;
        break;
      }
    }
    if (!ok) {
      addToFavourite();
    } else {
      delFromFav();
    }
    translateFunction();
  }

  async function delFromFav() {
    if (isAddFav) {
      const firstT = document.getElementById("textAreaEnter").value;
      const firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма

      //Получаем айди фразеологизма
      const phrase = await supabase
        .from("phrase_text")
        .select("phrase_id")
        .eq("phrase_text_text", firstText);
      try {
        const { error } = await supabase
          .from("favourites_phraseological")
          .delete()
          .eq("phrase_id", phrase.data[0]["phrase_id"]);
        isAddFav();
      } catch (error) {
        console.log(error.message);
      }
    }
    translateFunction();
  }

  async function addToFavourite() {
    const firstT = document.getElementById("textAreaEnter").value;
    const firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма
    const translationLanguage =
      document.getElementById("select_lang_enter").value; //Возвращаем выбранный язык вывода
    //Получаем язык на который переводим
    let lang = 0;
    if (translationLanguage == "rus") {
      lang = 1;
    } else if (translationLanguage == "kor") {
      lang = 2;
    } else {
      lang = 3;
    }

    //Получаем айди фразеологизма
    const phrase = await supabase
      .from("phrase_text")
      .select("phrase_id")
      .eq("phrase_text_text", firstText);

    //Получаем айди пользователя
    let userID = localStorage.getItem("userID"); //получаем айди авторизованного пользователя
    console.log(userID);

    //Добавляем фразеологизм в избранные
    try {
      const { error2 } = await supabase
        .from("favourites_phraseological")
        .insert([
          {
            phrase_id: phrase.data[0]["phrase_id"],
            user_id: parseInt(userID),
            language_id: lang,
          },
        ]);
      isAddFav();
    } catch (error2) {
      alert(error2.message);
    }
  }

  const [isplaying, setisplaying] = useState(false);
  const [isplaying2, setisplaying2] = useState(false);

  async function PlayAudio() {
    const firstT = document.getElementById("textAreaEnter").value;
    const firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма

    //Получаем айди фразеологизма
    const audio_id = await supabase
      .from("phrase_text")
      .select("audio_id")
      .eq("phrase_text_text", firstText);

    //----------------------------Получаем аудиодорожку----------------------------------
    const audio_path = await supabase
      .from("audio_recording")
      .select("audio_path")
      .eq("audio_id", audio_id.data[0]["audio_id"]);

    var path =
      "https://inyxfjfjxzdevxwzukie.supabase.co/storage/v1/object/public/audio/";

    path = path + audio_path.data[0]["audio_path"];

    var audio = document.getElementById("audio");

    audio.volume = 0.7;

    audio.src = path;

    if (isplaying) {
      setisplaying(false);
      audio.pause();
    } else {
      setisplaying(true);
      audio.play();
      setisplaying(false);
    }
  }

  async function PlayAudio2() {
    const firstT = document.getElementById("textAreaExit").value;
    const firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма
    console.log(firstT.data);
    //Получаем айди фразеологизма
    const audio_id = await supabase
      .from("phrase_text")
      .select("audio_id")
      .eq("phrase_text_text", firstText);

    //Получаем аудиодорожку
    const audio_path = await supabase
      .from("audio_recording")
      .select("audio_path")
      .eq("audio_id", audio_id.data[0]["audio_id"]);

    var path =
      "https://inyxfjfjxzdevxwzukie.supabase.co/storage/v1/object/public/audio/";

    path = path + audio_path.data[0]["audio_path"];

    var audio = document.getElementById("audio");

    audio.volume = 0.7;

    audio.src = path;

    if (isplaying) {
      setisplaying2(false);
      audio.pause();
    } else {
      setisplaying2(true);
      audio.play();
      setisplaying2(false);
    }
  }

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
        <Content className="contentStyle">
          <div className="languagelabel">
            <Form layout={"vertical"}>
              <h4 className="h4_">"Выбор языка"</h4>
              <Form.Item name="language_left" id="language_left">
                <div className="buttom-audio2">
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
                </div>
              </Form.Item>
            </Form>
          </div>
          <div className="buttom-block">
            <audio id="audio" src=""></audio>
            <Form.Item>
              {/* Поле ввода фразеологизма  */}
              <TextArea
                showCount
                id="textAreaEnter"
                maxLength={100}
                /*onChange={onChange}*/ placeholder="Введите текст"
                className="Text_area"
              />

              <Button
                className="buttom-audio"
                onClick={addToFavButton}
                style={{ backgroundColor: stylBut }}
                icon={<HeartTwoTone twoToneColor={color} />}
              ></Button>

              <Button
                className="buttom-audio"
                onClick={likePhrase}
                id="like"
                icon={<LikeTwoTone />}
              >
                {buttonTextLike}
              </Button>
              <Button
                className="buttom-audio"
                onClick={dislikePhrase}
                id="dislike"
                icon={<DislikeTwoTone />}
              >
                {buttonTextDislike}
              </Button>

              <Button className="buttom-audio" onClick={PlayAudio}>
                Прослушать
              </Button>
            </Form.Item>
            <div className="buttom-audio3">
              <Checkbox id="one" onChange={onChange}>
                Поиск по категории
              </Checkbox>
            </div>
            <Form.Item style={{ display: chbox }}>
              <Select
                name="tag_id"
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

        <Content className="contentStyle">
          <div className="languagelabel">
            <Form layout="vertical">
              <h4 className="h4_">"Выбор языка"</h4>
              <Form.Item name="language_right" id="language_right">
                <div className="buttom-audio2">
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
                </div>
              </Form.Item>
            </Form>
          </div>
          <div className="buttom-block">
            <Form.Item>
              {/* Поле вывода переведенного фразеологизма  */}
              <TextArea
                showCount
                id="textAreaExit"
                value={translitExit}
                maxLength={100}
                /*onChange={onChange}*/ placeholder="Перевод"
                className="Text_area"
              />
              <Button onClick={PlayAudio2} className="buttom-audio1">
                Прослушать
              </Button>
            </Form.Item>
            <Form.Item>
              <h3>Транскрипция: {litranscEnter} </h3>
              <h3>Описание: {lidesc} </h3>
            </Form.Item>
          </div>
        </Content>
      </Layout>
      <Pagefooter></Pagefooter>
    </div>
  );
}
