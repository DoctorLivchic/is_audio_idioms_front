import React from "react";

class Main_page extends React.Component{
    render(){
        return(
                <div className="header" id="header">
                    <div className="header-inne">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="logo">
                                        <a>Логотип</a> 
                                        /*Вставить лого*/
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


                   
                </div>

                   
        )
    }
}
export default Main_page