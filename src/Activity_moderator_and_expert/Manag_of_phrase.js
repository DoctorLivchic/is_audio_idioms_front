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
        title:'Номер текста фразеологизма',
        dataIndex:'phrase_text_id',
        key:'phrase_text_id'
    },
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
    rowCount:10,
    page:1,
    orderBy:'phrase_text_id',
    from:'phrase_text'
  }
  
  
  
  
  export default function Activity_moderator() {
    const [phrase_text, setrequest] = useState([]);
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
      const phraseological = await supabase.from("phrase_text").select();
      const phre = (await phraseological).data;
        const data = await supabase
        .from('phrase_text')
        .select()
        .order('phrase_text_id')
      setrequest(data.data)     
    }
   
    async function delete_row(){
      const phraseological = await supabase.from("phraseological").select()
      const data1 = (await phraseological).data;
      for (let i = 0; i < selectedRowKeys.length; i++){  
          try {
            const { error } = await supabase
            .from('phraseological')
            .update({status_id:'6'})
            .eq('phrase_id',selectedRowKeys.at(i));
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
  
    async function change_phrase(){
      setShow(true)
      for (let i = 0; i < selectedRowKeys.length; i++){  
          try {    
            const data = await supabase.from("phraseological").select()
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

    async function add_phrase(){ 
      const rus1 = form.getFieldValue("rus");
      const fre1 = form.getFieldValue("fre");
      const kor1 = form.getFieldValue("kor");
      const link = form.getFieldValue("link_phraseologikal")
      const tag  = form.getFieldValue("tag_id")
      console.log(rus1)
      // for (let i = 0; i < selectedRowKeys.length; i++){  
          try {    
            const { error }  = await supabase
            .from('phraseological')
            .insert({rus:rus1,fre:fre1,kor:kor1,link_phraseologikal:link,tag_id:tag})
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
      <div style={{position: 'relative', left:'59%' }}>
      <Button onClick={delete_row} className='btn-7'>Удалить</Button>
      <Button onClick={update} className='btn-7'>Обновить</Button>
      <Button onClick={change_phrase} className='btn-7'>Добавить</Button>
      <Button onClick={() => {navigate("/Moderator_personal_account")}} className='btn-7'>Назад</Button>
      </div>
      <Modal open = {show}
            title="Изменение фразеологизма" 
            onCancel={cancel}
            footer={[
                <Button onClick={add_phrase}>
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
                            name="rus"
                            label="Русский фразеологизм"
                            rules={[
                                {
                                    required: true,
                                    message: "фразеологизм не может быть пустым"
                                }
                            ]}>
                            <Input name="rus"
                            id="logrus"
                            placeholder="Русский фразеологизм"/>
                        </Form.Item>
                        <Form.Item
                            name="fre"
                            label="Французский фразеологизм"
                            rules={[
                                {
                                    required: true,
                                    message: "фразеологизм не может быть пустым"
                                }
                            ]}>
                            <Input name="fre"
                            placeholder="Французский фразеологизм"
                            id="logfre" />
                        </Form.Item>
                        <Form.Item
                            name="kor"
                            label="Корейский фразеологизм"
                            rules={[
                                {
                                    required: true,
                                    message: "Корейский не может быть пустым"
                                }
                            ]}>
                            <Input name="kor"
                            placeholder="Корейский фразеологизм"
                            id="logkor"
                             />
                        </Form.Item>
                        <Form.Item
                            name="link_phraseologikal"
                            label="Ссылка на фразеологизм"
                            rules={[
                                {
                                    required: true,
                                    message: "Укажите источник фразеологизма"
                                }
                            ]}>
                            <Input name="link_phraseologikal"
                            placeholder="Ссылка на фразеологизм" />
                        </Form.Item>
                        <Form.Item
                            name="tag_id"
                            label="Тематика фразеологизма"
                            rules={[
                                {
                                    required: true,
                                    message: "Укажите категорию фразеологизма"
                                }
                            ]}>
                            <Input name="tag_id"
                            placeholder="Тематика фразеологизма" />
                        </Form.Item>
                </Form>
            </Modal>
      <Table
      loading={loading}
      dataSource={phrase_text}
      columns={columns}
      rowSelection={rowSelection}
      
      rowKey={(record) => record.phrase_text_id}
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