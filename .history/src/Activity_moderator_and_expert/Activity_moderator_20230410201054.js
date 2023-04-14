import React from 'react';
import { useEffect, useState } from "react";
import { Layout, Space, message, notification } from 'antd';
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, Checkbox, Select, Table } from 'antd';
import { supabase } from '../supabaseClient.js';
import Item from 'antd/es/list/Item.js';


const columns = [
  {
      title:'Номер запроса',
      dataIndex:'request_id',
      key:'request_id'
  },
  {
      title:'Пользователь',
      dataIndex:'user_id',
      key:'user_id'
  },
  {
      title:'Русский перевод',
      dataIndex:'rus_request',
      key:'rus_request'
  },
  {
      title:'Французский перевод',
      dataIndex:'fre_request',
      key:'fre_request'
  },
  {
    title:'Корейский перевод',
    dataIndex:'kor_request',
    key:'kor_request'
},
{
  title:'Статус запроса',
  dataIndex:'status_id',
  key:'status_id'
},
{
  title:'Вид операции',
  dataIndex:'type_id',
  key:'type_id'
}
]

const GridDataOption = {
  rowCount:10,
  page:1,
  orderBy:'request_id',
  from:'request'
}

function update(){
window.location.reload();
}




export default function Activity_moderator() {
  const [request, setrequest] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
   
};

const rowSelection = {
    selectedRowKeys,
    onChange:onSelectChange
};

  useEffect(() => {
    getrequest();
  }, []);

  async function getrequest() {
    const request = await supabase.from("request").select();
    const data = (await request).data;


    setrequest(data)
    
  }
  
  async function fe(reqId){
    const req = await supabase.from("request").select().data;
    for(let i = 0; i < req.length; i++){
      const data = await supabase
      .from('request')
      .select('request_id, status_id')
      .eq('status_id', `${1}`)
      const reqStatus = data.data;
      console.log('request_status '+ reqStatus[0]['request_id'])

    }
    
  }
 
  async function delete_row(){
    const request = await supabase.from("request").select().filter('type_id','not.gt',1);
    const data1 = (await request).data;
    for (let i = 0; i < selectedRowKeys.length; i++){  
        try {
          const { error } = await supabase
          .from('request')
          .delete()
          .eq('request_id',selectedRowKeys.at(i));
          console.log("Запись удалена")
    }
    catch (error) {
      notification.open({message:'Ошибка',description:'Ошибка,некоректно введены данные'});
    }
    }
    }

 

  const navigate = useNavigate();
  return (
    <div className='Activ_moder'>
    <div style={{position: 'relative', left:'55%' }}>
    <Button onClick={delete_row} className='btn-7'>Удалить</Button>
    <Button onClick={update} className='btn-7'>Обновить</Button>
    <Button onClick={"-"} className='btn-7'>Добавить</Button>
    <Button onClick={() => {navigate("/Moderator_personal_account")}} className='btn-7'>Назад</Button>
    <Button onClick={fe} className='btn-7'>12</Button>
    </div>
    <Table
   
    dataSource={request}
    columns={columns}
    rowSelection={rowSelection}
    rowKey={(record) => record.request_id}
    onRow={(record) => ({
      onClick: () => {
           
      },
  })}
    />
  </div>
  );
}  