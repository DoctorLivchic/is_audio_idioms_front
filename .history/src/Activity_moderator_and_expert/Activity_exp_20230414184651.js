import React from 'react';
import { useEffect, useState } from "react";
import { Layout, Space, message, notification } from 'antd';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Checkbox, Select, Table } from 'antd';
import { supabase } from '../supabaseClient.js';
import Item from 'antd/es/list/Item.js';


const columns = [
  {
    title: 'Номер запроса',
    dataIndex: 'request_id',
    key: 'request_id'
  },
  {
    title: 'Пользователь',
    dataIndex: 'user_id',
    key: 'user_id'
  },
  {
    title: 'Русский перевод',
    dataIndex: 'rus_request',
    key: 'rus_request'
  },
  {
    title: 'Французский перевод',
    dataIndex: 'fre_request',
    key: 'fre_request'
  },
  {
    title: 'Корейский перевод',
    dataIndex: 'kor_request',
    key: 'kor_request'
  },
  {
    title: 'Статус запроса',
    dataIndex: 'status_id',
    key: 'status_id'
  },
  {
    title: 'Вид операции',
    dataIndex: 'type_id',
    key: 'type_id'
  }
]

const GridDataOption = {
  rowCount: 10,
  page: 1,
  orderBy: 'request_id',
  from: 'request'
}

function update() {
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
    onChange: onSelectChange
  };

  useEffect(() => {
    getrequest();
  }, []);

  async function getrequest() {
    // const request = await supabase.from("request").select();
    // const data = (await request).data;
    const request = await supabase.from("request").select();
    const req = (await request).data;
    const data = await supabase
      .from('request')
      .select()
      .eq('status_id', `${4}`)
    setrequest(data.data)
  }

  async function delete_row() {
    for (let i = 0; i < selectedRowKeys.length; i++) {
      try {
        const { error } = await supabase
          .from('request')
          .delete()
          .eq('request_id', selectedRowKeys.at(i));
        console.log("Запись удалена", selectedRowKeys.at(i))
      }
      catch (error) {
        notification.open({ message: 'Ошибка', description: 'Ошибка,некоректно введены данные' });
      }
    }
    getrequest()
    update()
  }

  async function add_request() {
    const request = await supabase.from("request").select();
    const adde = (await request.data);

    for (let i = 0; i < selectedRowKeys.length; i++) {
      try {
        const phrase = adde[selectedRowKeys.at(i)].data;
        // console.log(adde[selectedRowKeys.at(i)].data["request_id"])
        console.log(phrase)
        // const { error } = await supabase
        //   .from('phraseological')
        //   .insert({ phrase_id: '4' })
        // console.log("Запись добавленна")

      }
      catch (error) {
        notification.open({ message: 'Ошибка', description: error.message });
      }
    }

  }


  const navigate = useNavigate();
  return (
    <div className='Activ_moder'>
      <div style={{ position: 'relative', left: '63%' }}>
        <Button onClick={delete_row} className='btn-7'>Удалить</Button>
        <Button onClick={update} className='btn-7'>Обновить</Button>
        <Button onClick={add_request} className='btn-7'>Добавить запись</Button>
        <Button onClick={() => { navigate("/Moderator_personal_account") }} className='btn-7'>Назад</Button>
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