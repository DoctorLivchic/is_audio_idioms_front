import React from "react";
import { Router } from "react-router-dom";
import { input1 } from '../CONST';


class Main extends React.Component {
    render() {
    return(
        <div className="App">
        <header>
        <div className='info'><h1>{input1}</h1></div>
        </header>
       <div className='headerleft'>
         <div className='languageleft'>
           <p>language 1</p>
         </div>
           <div className='buttom-block-left'>
                 <button>
                 <img width={30} height={30} src='img/micro.png' />
                 </button>              
           </div>
         <div className='search-block-left'>
             <input placeholder='Поиск...'/>
         </div>
       </div>
         <div className='headercenter'>
           <button>
           <img width={30} height={30} src='img/zam.png' />
           </button>
         </div>
         
         <div className='headerRight'>
           <div className='languageRight'>
             <p>language 2</p>
           </div>
               
           <div className='buttom-block-right'>
             <button>
             <img width={33} height={30} src='img/micro.png' />
             </button>
           </div>
               <div className='search-block-right'>
                 <input placeholder='Поиск...'/>
                  </div> 
              
         </div>
        </div> 

          
    )
}}
export default Main;