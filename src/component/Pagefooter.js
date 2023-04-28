import {ArrowLeftOutlined} from '@ant-design/icons'
import {Button} from "antd";
import { useNavigate } from 'react-router-dom';

const Pagefooter = (source) => {
    const navigate = useNavigate();
    return(
        <div className="footer section">
         <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="logo">
                
                </div>

                <ul className="social">
                  <li>
                    <a href="#">
                      <span ></span>
                    </a>
                  </li>
               
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p>2023 © Словарь аудио-фразеологизмов</p>
              </div>
            </div>
          </div>
        </div>
        </div>


    )}
    
    export default Pagefooter;