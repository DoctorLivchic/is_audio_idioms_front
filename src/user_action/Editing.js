import React from "react";
import { Layout, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Checkbox, Select,notification } from "antd";
import { supabase } from "../supabaseClient.js";
import Pagefooter from "../component/Pagefooter";
const { Search } = Input;

export default function Editing() {
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };

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
    var re = /^[ㄱ-모\s]+$/i;
    var valid = re.test(rus_request);
    return valid;
  }

  function setRed(formId) {
    document.getElementById(formId).setAttribute("class", "form-style1");
  }

  async function getPhrase() {
    const phrase = await supabase.from("phraseological").select();
    return phrase;
  }

  async function translateFunction() {
  //   const chosenLanguage = document.getElementById("select_lang_enter").value; //Возвращаем выбранный язык ввода
  //   console.log(chosenLanguage);

  //   const translationLanguage_fre = "fre"; //Возвращаем выбранный язык вывода
  //   console.log(translationLanguage_fre);

  //   const translationLanguage_rus = "rus"; //Возвращаем выбранный язык вывода
  //   console.log(translationLanguage_rus);

  //   const translationLanguage = "kor"; //Возвращаем выбранный язык вывода
  //   console.log(translationLanguage);

  //   const firstT = document.getElementById("textIn").value;
  //   const firstText = firstT.toLowerCase(); //Возвращаем текст к переводу
  //   console.log(firstText);

  //   const phrase = getPhrase();

  //   const data = (await phrase).data;

  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i][chosenLanguage] == firstText) {
  //       //Сравниваем, если текст выбранного языка == введенному тексту
  //       document.getElementById("log_kor").value = data[i][translationLanguage]; //то выводим во второй текстБокс перевод по выбранному языку к переводу
  //     }
  //     if (data[i][chosenLanguage] == firstText) {
  //       document.getElementById("log_rus").value =
  //         data[i][translationLanguage_rus];
  //     }
  //     if (data[i][chosenLanguage] == firstText) {
  //       document.getElementById("log_fre").value = 
  //         data[i][translationLanguage_fre];
  //     }
  //   }
  // }

 
  const translationLanguage =
    document.getElementById("select_lang_enter").value; //Возвращаем выбранный язык вывода
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

  const firstT = document.getElementById("textIn").value;
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

      document.getElementById("log_rus").value =
        translate.data[0]["phrase_text_text"]; //то выводим во второй текстБокс перевод по выбранному языку к переводу
    } catch (error) {
      notification.open({ message: "Фразеологизм не найден", description: "Вы можете добавить фразеологизм в соответствующей вкладке" });
    }
    //-------------------------------------------------------------------------------
    
    // Вывод лайков
  }
}




  //Регистрация нового Запроса(редактирование)
  async function addrequest() {
    const rus = document.getElementById("log_rus").value;
    const fre = document.getElementById("log_fre").value;
    const kor = document.getElementById("log_kor").value;
    const request_status1 = 1;
    const Request_type1 = 0;
    let userID = localStorage.getItem("userID"); //получаем айди авторизованного пользователя
    //Запись
    if (validrus(rus)) {
      if (validfre(fre)) {
        if (validkor(kor)) {
          try {
            const { error } = await supabase
              .from("request")
              .insert({
                rus_request: rus,
                fre_request: fre,
                kor_request: kor,
                status_id: request_status1,
                type_id: Request_type1,
                user_id: parseInt(userID),
                phrase_id:27
              });
          } catch (error) {
            alert(error.error_description || error.message);
          }
          notification.open({message:'Успешно',description:'Вы успешно добавили запрос!'})
        } else {
          setRed("log_kor");
          notification.open({message:'Ошибка',description:'Вы ввели некорректный корейский перевод!'})
          document.getElementById("log_kor").value = "";
        }
      } else {
        setRed("log_fre");
        notification.open({message:'Ошибка',description:'Вы ввели некорректный французский перевод перевод!'})
        document.getElementById("log_fre").value = "";
      }
    } else {
      setRed("log_rus");
      notification.open({message:'Ошибка',description:'Вы ввели некорректный русский перевод!'})
      document.getElementById("log_rus").value = "";
    }
  }

  const navigate = useNavigate();
  return (
    <div className="Editing" id="Editing">
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

      <div className="container">
        <div className="section pb-5 pt-5 pt-sm-2 text-center" align="center">
          <label for="reg-log"></label>
          <div className="card-3d-wrap mx-auto">
            <div className="card-3d-wrapper">
              <div className="card-front_Add">
                <div className="center-wrap">
                  <div className="section text-center">
                    <h4 className="mb">
                      Введите информацию о изменении фразеологизма
                    </h4>

                    <div className="form-group mt-2">
                      <Form layout={"vertical"}>
                        <Form.Item
                          name="language_left"
                          id="language_left"
                          label={
                            <label style={{ color: "white" }}>
                              Выбор языка
                            </label>
                          }
                        >
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

                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Введите фразеологизм "
                        className="form-style"
                        name="textIn"
                        autoComplete="off"
                        id="textIn"
                      />
                    </div>

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
                      />
                      <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <Form.Item>
                      <Button
                        onClick={() => {
                          addrequest();
                        }}
                        className="btn"
                      >
                        Отправить
                      </Button>
                      <Button
                        onClick={() => {
                          translateFunction();
                        }}
                        className="btn"
                      >
                        Найти
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer id="footer" className="footer_main section">
        <Pagefooter></Pagefooter>
      </footer>
    </div>
  );
}
