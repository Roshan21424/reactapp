
import './App.css'
import Navbar from './componets/Navbar'
import News from './componets/NewsItem';

import React,{Component} from 'react';
import NewsItems from './componets/NewsItems';


export default class App extends Component{

render(){
  return(<div>
    <Navbar></Navbar>
    <News page={10} country={"us"} category={"science"}></News>

  </div>
  )
   
}

}
