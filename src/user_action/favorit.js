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
        title:"Транскрипция",
        dataIndex: "phrase_text_transcription",
        key: "phrase_text_transcription",
    },
    {
        title:"Описание",
        dataIndex: "phrase_text_desc",
        key: "phrase_text_desc",
    }
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
        getFav();
      }

  return (
    <div className="Activ_moder">
      <div style={{ position: "relative", left: "63%" }}>
        <Button  className="btn-7">
          Удалить
        </Button>

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
      <div className="footer_main section" >
       <Pagefooter></Pagefooter>
       </div>
    </div>
  );
}
