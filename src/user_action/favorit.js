import React from "react";
import { useEffect, useState } from "react";
import { Layout, Space, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Checkbox, Select, Table } from "antd";
import { supabase } from "../supabaseClient.js";
import Item from "antd/es/list/Item.js";
import Pagefooter from "../component/Pagefooter.js";

const columns = [
  {
    title: "Фразеологизм",
    dataIndex: "phrase_text_text",
    key: "phrase_text_text",
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
    title: "Транскрипция",
    dataIndex: "phrase_text_transcription",
    key: "phrase_text_transcription",
  },
  {
    title: "Описание",
    dataIndex: "phrase_text_desc",
    key: "phrase_text_desc",
  },
];

const GridDataOption = {
  rowCount: 10,
  page: 1,
  orderBy: "phrase_text_id",
  from: "phrase_text",
};

export default function Favorit() {
  const navigate = useNavigate();
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
    getFav().then(() => setLoading(false));
  }, [loading]);

  async function getFav() {
    //1. Получить избранные фразеологизмы по пользователю

    try {
      const getID = await supabase
        .from("favourites_phraseological")
        .select("phrase_id, language_id")
        .eq("user_id", localStorage.getItem("userID"));
      console.log(getID.data.length);
      for (let i = 0; i < getID.data.length; i++) {
        // const getFavourites = await supabase
        //   .from("phrase_text")
        //   .select(
        //     "phrase_text_text, phrase_text_transcription, phrase_text_desc"
        //   )
        //   .in("phrase_id", [getID.data[i]["phrase_id"]])
        //   .in("language_id", [getID.data[i]["language_id"]]);
        // console.log(getFavourites);
        // setrequest(getFavourites.data);
      }

      const getFavourites = await supabase
        .from("phrase_text")
        .select("phrase_text_text, phrase_text_transcription, phrase_text_desc")
        .in(
          "phrase_id",
          await supabase
            .from("favourites_phraseological")
            .select("phrase_id")
            .eq("user_id", localStorage.getItem("userID"))
        )
        .in(
          "language_id",
          await supabase
            .from("favourites_phraseological")
            .select("language_id")
            .eq("user_id", localStorage.getItem("userID"))
        );
      const object = { ...getFavourites.data };
      console.log(object);
      // setrequest(object);

      // const { data, error } = await supabase
      //   .from("phraseological")
      //   .select(
      //     "phrase_text.phrase_text_text, phrase_text.phrase_text_transcription, phrase_text.phrase_text_desc, phraseological.tag_id, phraseological.link_phraseological"
      //   )
      //   .join("phrase_text", {
      //     on: "phrase_text.phrase_id = phraseological.phrase_id",
      //   })
      //   .in(
      //     "phraseological.phrase_id",
      //     supabase
      //       .from("favourites_phraseological")
      //       .select("phrase_id")
      //       .eq("user_id", 23)
      //       .eq(
      //         "favourites_phraseological.language_id",
      //         "phrase_text.language_id"
      //       )
      //   );
      // console.log(getFavourites);
    } catch (error) {
      console.log(error);
    }
  }

  function update() {
    getFav();
  }

  return (
    <div className="Activ_moder">
      <div style={{ position: "relative", left: "63%" }}>
        <Button className="btn-7">Удалить</Button>

        <Button
          onClick={() => {
            navigate("/main_page/Main_page_aut");
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
      <div className="footer_main section">
        <Pagefooter></Pagefooter>
      </div>
    </div>
  );
}
