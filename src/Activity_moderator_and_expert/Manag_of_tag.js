import React from "react";
import { useEffect, useState } from "react";
import { Layout, Space, message, notification,Modal } from "antd";
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Checkbox, Select, Table } from "antd";
import { supabase } from "../supabaseClient.js";
import Item from "antd/es/list/Item.js";
import Pagefooter from "../component/Pagefooter";
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
    from:'tags'
  }
  
  
  
  
  export default function Activity_moderator() {

    const [tags, setrequest] = useState([]);
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
      const tagc = await supabase.from("tags").select();
      const t = (await tagc).data;
        const data = await supabase
        .from('tags')
        .select()
        .order('tag_id')
      setrequest(data.data)     
    }
   
    async function change_tag(){
      setShow(true)
      for (let i = 0; i < selectedRowKeys.length; i++){  
          try {    
            const data = await supabase.from("tags").select()
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


    async function delete_row(){
      const tagc = await supabase.from("tags").select()
      const data1 = (await tagc).data;
      for (let i = 0; i < selectedRowKeys.length; i++){  
          try {
            const { error } = await supabase
            .from('tags')
            .delete()
            .eq('tag_id',selectedRowKeys.at(i));
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
  
    async function add_tag(){
      const tag_name1 = form.getFieldValue("tag_name");
      console.log(tag_name1)
      // for (let i = 0; i < selectedRowKeys.length; i++){  
          try {    
            const { error }  = await supabase
            .from('tags')
            .insert({tag_name:tag_name1})
            console.log('Точка--')           
      
      }
      
      catch (error) {
        notification.open({message:'Ошибка',description:error.message});
        console.log('Точка1--')
      }
      // }
      setShow(false)
      getphrase()
      console.log('Точка2--')
      update()
      
    
  }
   
  
    const navigate = useNavigate();
    return (
      <div className='Activ_moder'>
      <div style={{position: 'relative', left:'64%' }}>
      <Button onClick={delete_row} className='btn-7'>Удалить</Button>
      <Button onClick={update} className='btn-7'>Обновить</Button>
      <Button onClick={change_tag} className='btn-7'>Добавить</Button>
      <Button onClick={() => {navigate("/Moderator_personal_account")}} className='btn-7'>Назад</Button>
      </div>
      <Modal open = {show}
            title="Изменение категории" 
            onCancel={cancel}
            footer={[
                <Button onClick={add_tag}>
                    Добавить
                </Button>,
                <Button onClick={cancel}>
                    Назад
                </Button>
            ]}>
                <Form
                    form={form}
                    layout={"vertical"}
                    centered={true}
                    name="formRegistry"
                    style={{padding: 20}}>
                        <Form.Item
                            name="tag_name"
                            label="категория"
                            rules={[
                                {
                                    required: true,
                                    message: "категория не может быть пустым"
                                }
                            ]}>
                            <Input name="tag_name"
                            id="tag_name"
                            placeholder="категория"/>
                        </Form.Item>
                </Form>
            </Modal>
      <Table
      loading={loading}
      dataSource={tags}
      columns={columns}
      rowSelection={rowSelection}
      rowKey={(record) => record.tag_id}
      onRow={(record) => ({
        onClick: () => {
             
        },
    })}
      />
      <div className="footer_main section">
      <Pagefooter></Pagefooter>
      </div>
    </div>
    );
  }  