import React from 'react';
import { useEffect, useState } from "react";
import { Layout, Space } from 'antd';
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, Checkbox, Select, Table } from 'antd';
import { supabase } from '../supabaseClient.js';


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
  dataIndex:'request_status',
  key:'request_status'
},
{
  title:'Вид операции',
  dataIndex:'request_type',
  key:'request_type'
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
function delete_row(){

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
    console.log(data)
    setrequest(data)
  }

  async function fe(reqId){
      reqId=23
      const data = await supabase
      .from('request')
      .select('request_id, status_id')
      .eq('request_id', `${reqId}`)
      const reqStatus = data.data;
      console.log('request_status '+ reqStatus[0]['status_id'])
    }
  

  return (
    <div className='Activ_moder'>
    <div style={{position: 'relative', left:'50%' }}>
    <Button onClick={delete_row} className='btn-7'>Удалить</Button>
    <Button onClick={update} className='btn-7'>Обновить</Button>
    <Button onClick={fe} className='btn-7'>Добавить</Button>

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

       








        

         
    
        