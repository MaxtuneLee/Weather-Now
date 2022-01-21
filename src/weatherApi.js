import axios from "axios";
import reactDom from "react-dom";
import {city} from './App';
function weatherId(cityId){
    axios.get('https://v0.yiketianqi.com/api',{
      params: {
        appid:52311237,
        appsecret:'o4CyyoqO',
        version:'v9',
        cityid: cityId,
        unescape:1,
        vue:1,
      }
    })
    .then(function (response){
      console.log(response);
    })
    .catch(function(error){
      console.log(error);
    });
  }

  function weatherIp(){
    axios.get('https://v0.yiketianqi.com/api',{
      params: {
        appid:52311237,
        appsecret:'o4CyyoqO',
        version:'v9',
        unescape:1,
        vue:1,
      }
    })
    .then(function (response){
      console.log(response);
    })
    .catch(function(error){
      console.log(error);
    });
  }

  export {weatherId,weatherIp}