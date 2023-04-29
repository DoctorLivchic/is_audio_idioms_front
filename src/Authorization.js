import React, { useState, useEffect } from "react";
import { Button, Form, Input, Checkbox, Affix, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient.js";
import { async } from "q";
import { func } from "prop-types";
import Pagefooter from "./component/Pagefooter";

//const [active, setActive] = useState(false)

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
function comparePass(password, passAffirm) {
  if (password == passAffirm) {
    if (password != "") return true;
  } else {
    return false;
  }
}

export default function Authorization() {
  function setRed(formId) {
    document.getElementById(formId).setAttribute("class", "form-style1");
  }
  function setWhite(formId) {
    document.getElementById(formId).setAttribute("class", "form-style");
  }
  //Получение таблицы user
  async function getUser() {
    const profiles = await supabase.from("user").select();
    return profiles;
  }
  //const el = document.querySelector('.form-style'); // получаем наш параграф
  //const styles = window.getComputedStyle(el); // получаем объект со всеми вычисленными стилями

  // //Получаем роль авторизованного пользователя
  // async function getRole() {
  //   let email = document.getElementById("logemailIn").value;
  //   const userRole = await supabase
  //     .from("user")
  //     .select("role_id")
  //     .eq("email", email);
  //   console.log(userRole);
  //   return userRole;
  // }

  //Регистрация нового пользователя
  async function addUser() {
    const email1 = document.getElementById("logemailUp").value;
    const password1 = document.getElementById("logpassUp").value;
    const name1 = document.getElementById("logname").value;
    const passAffirm = document.getElementById("logpassAffirm").value;
    //console.log(styles.box-shadow)

    //Запись
    if (validName(name1)) {
      if (ValidMail(email1)) {
        if (comparePass(password1, passAffirm)) {
          try {
            const { error } = await supabase.from("user").insert({
              name: name1,
              email: email1,
              password: password1,
              role_id: 3,
              login: email1,
            });
          } catch (error) {
            notification.open({
              message: "Ошибка",
              description: error.message,
            });
          }
          notification.open({
            message: "Успешно",
            description: "Регистрация прошла успешно",
          });
          window.location.reload();
        } else {
          setRed("logpassUp");
          setRed("logpassAffirm");
          notification.open({
            message: "Ошибка",
            description: "Ваши пароли не совпадают!",
          });
          document.getElementById("logpassUp").value = "";
          document.getElementById("logpassAffirm").value = "";
        }
      } else {
        setRed("logemailUp");
        setWhite("logname");
        notification.open({
          message: "Ошибка",
          description: "Вы ввели некорректный email!",
        });
        document.getElementById("logemailUp").value = "";
      }
    } else {
      setRed("logname");
      notification.open({
        message: "Ошибка",
        description: "Вы ввели некорректное имя!",
      });
      document.getElementById("logname").value = "";
    }

    //попытка получить последнего добавленного юзера

    const user = getUser();
    const data = (await user).data;

    // const usr = data[data.length-1]; //получаем последнюю запись
  }

  //Авторизация пользователя
  async function logIn() {
    const email = document.getElementById("logemailIn").value;
    const password = document.getElementById("logpassIn").value;

    //Ищем пользователя в таблице - если нет - выдаем ошибку
    try {
      const user = await supabase
        .from("user")
        .select()
        .eq("login", email)
        .eq("password", password);

      if (user.data.length == 0) {
        setRed("logpassIn");
        setRed("logemailIn");
        notification.open({
          message: "Ошибка",
          description: "Вы ввели некорректные данные!",
        });
      } else {
        if (user.data[0]["role_id"] == 1) {
          navigate("/Moderator_personal_account");
          notification.open({
            message: "Успешно",
            description: "Вы успешно авторизовались!",
          });
          
        } else if (user.data[0]["role_id"] == 2) {
          navigate("/Expert_personal_account");
          notification.open({
            message: "Успешно",
            description: "Вы успешно авторизовались!",
          });
        } else {
          navigate("/main_page/Main_page_aut");
          notification.open({
            message: "Успешно",
            description: "Вы успешно авторизовались!",
          });
        }
      }
    } catch (error) {
      notification.open({ message: "Ошибка", description: error.message });
    }

    // var index = -1;
    // //Получение всех профилей
    // const user = getUser();
    // console.log(user)
    // const data = (await user).data;
    // console.log(data)
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i]["email"] == email) {
    //     index = i;
    //     break;
    //   }
    // }

    // if (index == -1) {
    //   setRed("logemailIn");
    //   notification.open({message:'Ошибка',description:'Почта введена некорректно или такой почты не существует!'});
    // } else {
    //   if (data[index]["password"] == password) {
    //     if (data[index]["role_id"] == 1) {
    //       navigate("/Moderator_personal_account");
    //       notification.open({message:'Успешно',description:'Вы успешно авторизовались!'});
    //     }
    //     if (data[index]["role_id"] == 2) {
    //       navigate("/Expert_personal_account");
    //       notification.open({message:'Успешно',description:'Вы успешно авторизовались!'});
    //     }
    //     if (data[index]["role_id"] == 3) {
    //       navigate("/main_page/Main_page_aut");
    //       notification.open({message:'Успешно',description:'Вы успешно авторизовались!'});
    //     }
    //   } else {
    //     if (data[index]["password"] != password) {
    //       setRed("logpassIn");
    //       setWhite("logemailIn");
    //       notification.open({message:'Ошибка',description:'Вы ввели некорректный пароль!'});
    //     } else {
    //       navigate("/main_page/Main_page_aut");
    //       notification.open({message:'Успешно',description:'Вы успешно авторизовались!'});
    //     }
    //   }
    // }
  }

  const navigate = useNavigate();
  return (
    <div className="authorization">
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div
                className="section pb-5 pt-5 pt-sm-2 "
                align="center"
                
              >
                <h5 className="mb-0 pb-3">
                  <span>Авторизоваться </span>
                  <span>Зарегистрироваться</span>
                </h5>

                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb">Авторизоваться</h4>
                          <div className="form-group">
                            <input
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
                            <input
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
                            <Button
                              onClick={() => {
                                logIn();
                              }}
                              className="btn"
                            >
                              Авторизоваться
                            </Button>
                            <Button
                              onClick={() => {
                                navigate("/");
                              }}
                              className="btn"
                            >
                              Назад
                            </Button>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Зарегистрироваться</h4>
                          <div className="form-group">
                            <input
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
                            <input
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
                            <input
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
                            <input
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
                              <Button onClick={addUser} className="btn">
                                Регистрация
                              </Button>
                              <Button
                                onClick={() => {
                                  navigate("/");
                                }}
                                className="btn"
                              >
                                Назад
                              </Button>
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
     <div className="footer_main section">
      <Pagefooter></Pagefooter>
     </div>
    </div>
  );
}
