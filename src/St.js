import React, {useEffect} from 'react';
import {Button, Form, Input, Checkbox,Select,Menu } from 'antd';
import {useNavigate} from "react-router-dom";
import Pagefooter from "./component/Pagefooter";


export default function St() {
    const navigate = useNavigate();
    return(
        <div className='Manag_of_phrase'>
        <header>
          <h2>Страница не найдена </h2>					
        <nav>
        <ul className="navig_mod_acc">
        <Form.Item>
          
            <Button onClick={() => {navigate('/')}} className='btn-7'>Главная</Button>     
        </Form.Item>
        </ul>
          </nav>				
        </header>

        <footer id="footer" className="footer_main section">
         <Pagefooter></Pagefooter>
        </footer>
        </div>
    )

}
