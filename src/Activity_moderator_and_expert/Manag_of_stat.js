import React from "react";
import { useEffect, useState } from "react";
import { Layout, Space, message, notification,Modal } from "antd";
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Checkbox, Select, Table } from "antd";
import { supabase } from "../supabaseClient.js";
import Item from "antd/es/list/Item.js";

const columns = [
    {
        title:'Номер категории',
        dataIndex:'tag_id',
        key:'tag_id'
    },
    {
        title:'Дата добавления',
        dataIndex:'created_at',
        key:'created_at'
    },
    {
        title:'Название темы',
        dataIndex:'tag_name',
        key:'tag_name'
    }
  ]
  
  const GridDataOption = {
    rowCount:10,
    page:1,
    orderBy:'tag_id',
    from:'tagc'
  }
  
  
  
  
  export default function Activity_moderator() {

    const [tagc, setrequest] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form] = useForm()
    
  
    const onSelectChange = (newSelectedRowKeys) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
     
  };
  
  const rowSelection = {
      selectedRowKeys,
      onChange:onSelectChange
  };
  
    useEffect(() => {
      getphrase().then(()=>setLoading(false));
    }, [loading]);
  
  function update(){
  setLoading(true);
  }
  function cancel(){
    setShow(false)
}
  
  
  
    async function getphrase() {
      // const request = await supabase.from("request").select();
      // const data = (await request).data;
      const status = await supabase.from("request_status").select();
      const t = (await status).data;
        const data = await supabase
        .from('request_status')
        .select()
      setrequest(data.data)     
    }
   
    async function delete_row(){
      const status = await supabase.from("request_status").select()
      const data1 = (await status).data;
      for (let i = 0; i < selectedRowKeys.length; i++){  
          try {
            const { error } = await supabase
            .from('request_status')
            .delete()
            .eq('status_id',selectedRowKeys.at(i));
            notification.open({message:'Успешно',description:'запись поставленна на удаление'})
            console.log("Запись удалена",selectedRowKeys.at(i))           
      }
      catch (error) {
        notification.open({message:'Ошибка',description:error.message});
      }
      }
      getphrase()
      update()
      }
  
    async function push_phrase(){
      for (let i = 0; i < selectedRowKeys.length; i++){  
          try {
            const data = await supabase.from("tagc").select()
            form.setFields(Object.keys(data).map((key) => ({
              name: key,
              value: data[key],
          })))
            console.log('Точка')
            // console.log((update1.toISOString()))
           
      }
      catch (error) {
        notification.open({message:'Ошибка',description:error.message});
        console.log('Точка1')
      }
      }
      getphrase()
      console.log('Точка2')
      update()
    }
   
  
    const navigate = useNavigate();
    return (
      <div className='Activ_moder'>
      <div style={{position: 'relative', left:'65%' }}>
      <Button onClick={delete_row} className='btn-7'>Удалить</Button>
      <Button onClick={update} className='btn-7'>Обновить</Button>
      <Button onClick={push_phrase} className='btn-7'>Добавить</Button>
      <Button onClick={() => {navigate("/Moderator_personal_account")}} className='btn-7'>Назад</Button>
      </div>
     
      <Table
      loading={loading}
      dataSource={tagc}
      columns={columns}
      rowSelection={rowSelection}
      rowKey={(record) => record.tag_id}
      onRow={(record) => ({
        onClick: () => {
             
        },
    })}
      />
    </div>
    );
  }  