import React from "react";
import { useEffect, useState } from "react";
import { Layout, Space, message, notification,Modal } from "antd";
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Checkbox, Select, Table } from "antd";
import { supabase } from "./supabaseClient.js";
import Item from "antd/es/list/Item.js";
import Pagefooter from "./component/Pagefooter";
const columns = [
    {
      title:'Номер фразы',
      dataIndex:'phrase_id',
      key:'phrase_id'
  },
    {
        title:'Дата добавления',
        dataIndex:'created_at',
        key:'created_at'
    },
    {
        title:'Язык перевода',
        dataIndex:'language_id',
        key:'language_id'
    },
    {
      title:'Текст фразеологизма',
      dataIndex:'phrase_text_text',
      key:'phrase_text_text'
    },
  {
    title:'Транскрипция',
    dataIndex:'phrase_text_transcription',
    key:'phrase_text_transcription'
  },
  {
    title:'Описание фразеологизма',
    dataIndex:'phrase_text_desc',
    key:'phrase_text_desc'
  }
  ]
  
  const GridDataOption = {
    rowCount:30,
    page:1,
    orderBy:'phrase_text_id',
    from:'phrase_text'
  }
  
  export default function Activity_moderator() {
    const [phrase_text, setrequest] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
     
    const onSelectChange = (newSelectedRowKeys) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
     
  };

  const rowSelection = {
      selectedRowKeys,
      onChange:onSelectChange
  };
  
    useEffect(() => {
      getphrase().then(()=>setLoading(false))
     ;
    }, [loading]);
  
  function cancel(){
    setShow(false)
}
  
    async function getphrase() {
      // const request = await supabase.from("request").select();
      // const data = (await request).data;
      const phraseological = await supabase.from("phrase_text").select();
      const phre = (await phraseological).data;
        const data = await supabase
        .from('phrase_text')
        .select()
        .order('phrase_text_id')
      setrequest(data.data)     
    } 


    const navigate = useNavigate();
    return (
      <div className='Activ_moder'>
      <div style={{position: 'relative', left:'92%' }}>
      <Button onClick={() => {navigate("/")}} className='btn-7'>Назад</Button>
      </div>
      <Table
      loading={loading}
      dataSource={phrase_text}
      columns={columns}
      />
      <div className="footer_main section">
      <Pagefooter></Pagefooter>
      </div>
    </div>
    );
  }  