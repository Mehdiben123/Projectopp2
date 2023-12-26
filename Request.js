import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { URL_API } from './Constant';   
import { render } from 'react-dom';
const Request  = async (url, method, data) => {
  const storageGet = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      return value;
    } catch (error) {
      console.log(error);
    }
  };
      console.log("storageGet",await storageGet())
  
      if(url!=undefined && method!=undefined){
          if(method.toUpperCase()==='POST'){

         // console.log("REQUEST OBKECT ",JSON.stringify(data))
           return   fetch(URL_API+url,{
              method:'POST',
              body: data!=undefined?JSON.stringify(data):'' ,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization:await storageGet()
              } 
             }) 
         
          }
          else if(method.toUpperCase()==='GET'){
              return fetch(URL_API+url,{           
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  Authorization:await storageGet()
                } 
               })
               
               
          }
  
      }
}

export default Request;