import React, { useEffect } from "react";
import { Button, Form, Input, Checkbox, Select, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Pagefooter from "../component/Pagefooter";
import { useAuth } from "../useAuth";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
export default function Main_page() {
  const navigate = useNavigate();
  const { signout } = useAuth();

  return (
    <div className="main_page" id="main_page">
      <header>
        {/* Кнопки навигации */}
        <nav>
          <ul
            style={{ position: "relative", left: "44%" }}
            className="navig_main_page_aut"
          >
            <Form.Item>
              <Button
                onClick={() => {
                  navigate("/user_action/Editing");
                }}
                className="btn-7"
              >
                Редактирование
              </Button>
              <Button
                onClick={() => {
                  navigate("/user_action/Addendum");
                }}
                className="btn-7"
              >
                Добавление
              </Button>
              {/* <Button
                onClick={() => {
                  navigate("-");
                }}
                className="btn-7"
              >
                Фразеологизм дня
              </Button> */}
              <Button
                onClick={() => {
                  navigate("/user_action/Favorit");
                }}
                className="btn-7"
              >
                Избранное
              </Button>
              {/* <Button
                onClick={() => {
                  navigate("/Users_personal_account");
                }}
                className="btn-7"
              >
                Личный кабинет
              </Button> */}
              <Button
                onClick={() => {
                  navigate("/main/Main_aut");
                }}
                className="btn-7"
              >
                Перевод фразеологизмов
              </Button>
              <Button
                onClick={() => {
                  signout(() => navigate("/", { replace: true }));
                }}
                className="btn-7"
              >
                Выход
              </Button>
              {/* <Select
                defaultValue="Дополнительно"
                style={{
                  width: 150,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "1",
                    label: "Версия для слабовидящих",
                  },
                  {
                    value: "2",
                    label: "Дополнение 1",
                  },
                  {
                    value: "3",
                    disabled: true,
                    label: "Дополнение 3",
                  },
                  {
                    value: "4",
                    label: "Дополнение 4",
                  },
                ]}
              /> */}
            </Form.Item>
          </ul>
        </nav>
      </header>

      <div className="slider" id="slider">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="text">
                <h1>Добро пожаловать в LINGUA IDIOM</h1>
                <p>В нашем словаре фразеологизмов вы узнаете много нового!</p>
                <div className="button">
                  <Button
                    onClick={() => {
                      navigate("/main/Main_aut");
                    }}
                    className="btn"
                  >
                    Перевести фразеологизм
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* футер */}

      <div id="footer_main" className="footer_main section">
        <Pagefooter></Pagefooter>
      </div>
    </div>
  );
}
