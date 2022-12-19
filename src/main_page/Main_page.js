import React, {useEffect} from 'react';
import {Button, Form, Input, Checkbox,Select,Menu } from 'antd';
import {useNavigate} from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

export default function Main_page() {
	const navigate = useNavigate();
    
        return(
                <div className="main_page" id="main_page">
					
                    <header>
						
                        <nav>
                        <ul class="navig">
                 		<Form.Item>
						 	<Button onClick={() => {navigate('/avtorizacia/Authorization')}} className='active'>Редактирование</Button>
						 	<Button onClick={() => {navigate('/avtorizacia/Authorization')}} className='active'>Добавление</Button>
						 	<Button onClick={() => {navigate('/avtorizacia/Authorization')}} className='active'>Фразеологизм дня</Button>
							<Button onClick={() => {navigate('/avtorizacia/Authorization')}} className='active'>Чат</Button>
							<Button onClick={() => {navigate('/avtorizacia/Authorization')}} className='active'>Избранное</Button>
							<Button onClick={() => {navigate('/main/Main')}} className='active'>Перевод фразеологизмов</Button>
							<Button onClick={() => {navigate('/avtorizacia/Authorization')}} className='active'>Вход</Button>
							
						</Form.Item>
						
						
						
						 </ul>
                        </nav>
						
                    </header>


                    <div className="header-inne">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="logo">
                                        <a>Логотип</a> 
                                        
                                    </div>
                                </div>
                                <div className="button bar">
                                    <div className="modile-menu">

                                    </div>
                                    <nav className="navbar navbar-default">
                                        <div className="collapse navbar-collapse">
                                           
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

    <div className="slider" id="slider">
			<div class="container">
				<div class="row">
					<div class="col-md-7 col-sm-12 col-xs-12">
						<div class="text">
							<h1>Добро пожаловать в LINGUA IDIOM</h1>
							<p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit. Hic Laboriosam Ipsa Sequi? Laudantium Aspernatur Iusto Blanditiis, Totam Perferendis Dicta Magni. tincidunt dui. Vestibulum sodales posuere ullamcorper. Proin convallis neque pulvinar mauris vehicula, quis dictum diam ullamcorper</p>
							<div class="button">
								<Button onClick={() => {navigate('/main/Main')}} className='btn'>Перевести фразеологизм</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

        <footer id="footer" class="footer section">
			<div class="footer-top">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="logo">
								<a>Логотип</a>
							</div>
							
							<ul class="social">
								<li><a href="#"><span class="fa fa-facebook"></span></a></li>
								<li><a href="#"><span class="fa fa-twitter"></span></a></li>
								<li><a href="#"><span class="fa fa-dribbble"></span></a></li>
								<li><a href="#"><span class="fa fa-instagram"></span></a></li>
								<li><a href="#"><span class="fa fa-pinterest-p"></span></a></li>
							</ul>
							
						</div>
					</div>
				</div>
			</div>
			<div class="copyright">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<p>© 2018 Distributed by <a href="https://themewagon.com/">ThemeWagon</a></p>
						</div>
					</div>
				</div>
			</div>
		</footer>
                

        </div>           
        )
    
}
