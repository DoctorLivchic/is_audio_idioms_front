import React from "react";
import { useEffect, useState } from "react";
import { Layout, Space, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Checkbox, Select, Table } from "antd";
import { supabase } from "../supabaseClient.js";
import Item from "antd/es/list/Item.js";
import Pagefooter from "../component/Pagefooter";
const columns = [
  {
    title: "Номер запроса",
    dataIndex: "request_id",
    key: "request_id",
  },
  {
    title: "Пользователь",
    dataIndex: "user_id",
    key: "user_id",
  },
  {
    title: "Русский перевод",
    dataIndex: "rus_request",
    key: "rus_request",
  },
  {
    title: "Французский перевод",
    dataIndex: "fre_request",
    key: "fre_request",
  },
  {
    title: "Корейский перевод",
    dataIndex: "kor_request",
    key: "kor_request",
  },
  {
    title: "Статус запроса",
    dataIndex: "status_id",
    key: "status_id",
  },
  {
    title: "Вид операции",
    dataIndex: "type_id",
    key: "type_id",
  },
  {
    title: "Категория",
    dataIndex: "tag_id",
    key: "tag_id",
  },
  {
    title: "Ссылка на источник",
    dataIndex: "link_phraseological",
    key: "link_phraseological",
  },
  {
    title: "Фразеологизм",
    dataIndex: "phrase_id",
    key: "phrase_id",
  },
];

const GridDataOption = {
  rowCount: 10,
  page: 1,
  orderBy: "phrase_id",
  from: "request",
};

export default function Activity_moderator() {
  const [request, setrequest] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    getrequest().then(() => setLoading(false));
  }, [loading]);

  async function getrequest() {
    // const request = await supabase.from("request").select();
    // const data = (await request).data;
    const request = await supabase.from("request").select();
    const req = (await request).data;
    const data = await supabase
      .from("request")
      .select()
      .eq("type_id", `${0}`)
      .eq("status_id", `${4}`)
      .order('request_id')
    setrequest(data.data);
  }

  function update() {
    getrequest();
  }

  async function delete_row() {
    for (let i = 0; i < selectedRowKeys.length; i++) {
      try {
        const { error } = await supabase
          .from("request")
          .delete()
          .eq("request_id", selectedRowKeys.at(i));
        console.log("Запись удалена", selectedRowKeys.at(i));
        notification.open({
          message: "Успешно",
          description: "Запись успешно удаленна",
        });
      } catch (error) {
        notification.open({ message: "Ошибка", description: error.message });
      }
    }
    getrequest();
    update();
  }

  async function edit_request() {
    try {
      for (let i = 0; i < selectedRowKeys.length; i++) {
        //Получаем выбранный запрос
        const phrase = await supabase
          .from("request")
          .select()
          .eq("phrase_id", selectedRowKeys.at(i));

        console.log(phrase.data[0]);

        for (let i = 1; i < 4; i++) {
          let lang = "";
          if (i == 1) {
            lang = "rus_request";
          } else if (i == 2) {
            lang = "kor_request";
          } else {
            lang = "fre_request";
          }
          console.log("Выбранный язык: " + lang);
          console.log("Фрэйз айди: " + phrase.data[0]["phrase_id"]);
          console.log("Передаваемый текст: " + phrase.data[0][lang]);
          const { error } = await supabase
            .from("phrase_text")
            .update({ phrase_text_text: phrase.data[0][lang] })
            .eq("phrase_id", phrase.data[0]["phrase_id"])
            .eq("language_id", i);
        }
        //Обновляем поле update_at
        var update1 = new Date().toISOString().toLocaleString();
        const { error1 } = await supabase
          .from("request")
          .update({ status_id: "3", update_at: update1 })
          .eq("phrase_id", selectedRowKeys.at(i));
      }

      notification.open({
        message: "УСПЕШНО",
        description: "Запрос был успешно добавлен в систему!",
      });
      console.log("Запись добавленна");
      update();
    } catch (error) {
      notification.open({ message: "Ошибка", description: error.message });
      update();
    }
  }

  const navigate = useNavigate();
  return (
    <div className="Activ_moder">
      <div style={{ position: "relative", left: "63%" }}>
        <Button onClick={delete_row} className="btn-7">
          Удалить
        </Button>
        <Button onClick={update} className="btn-7">
          Обновить
        </Button>
        <Button onClick={edit_request} className="btn-7">
          Обновить запись
        </Button>
        <Button
          onClick={() => {
            navigate("/Expert_personal_account");
          }}
          className="btn-7"
        >
          Назад
        </Button>
      </div>
      <Table
        loading={loading}
        dataSource={request}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={(record) => record.phrase_id}
        onRow={(record) => ({
          onClick: () => {},
        })}
      />
      <div className="footer_main section" >
       <Pagefooter></Pagefooter>
       </div>
    </div>
  );
}
