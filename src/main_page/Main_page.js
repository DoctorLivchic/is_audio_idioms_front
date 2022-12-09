import React from "react";

class Main_page extends React.Component{
    render(){
        return(
                <div className="main_page" id="main_page">
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
                                            <ul id="nav" className="nav navbar-nav">
                                                <li className="current">
                                                    <a href="">Вход</a>
                                                </li>
                                            </ul>
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
								<a href="#" class="btn mt-4 "><i class="fa fa-briefcase"></i>Найти фразеологизм</a>
								<a href="#" class="btn"><i class="fa fa-phone"></i>Перевести фразеологизм</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

       
                

        </div>           
        )
    }
}
export default Main_page