import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable,  TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {aesEncrypt} from '../common/Encryption'
import { URL_API } from '../common/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';


const Loginscreen = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin =  ()=>{
   const obj ={
    login :login,
    password:aesEncrypt(password)
   }
   console.log(obj.password)
    fetch(URL_API+'/login', {
        method: 'POST',
        body: JSON.stringify(obj) ,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
  // .then((response) => response.json() 
         
 //)
  .then(response => {
    if(response.ok){
      AsyncStorage.setItem('token', response.headers.get("authorization") )
      console.log('response', response)
      console.log('response.status', response.status)
      console.log('response.headers ==> ', response.headers);
      console.log('response.headers.authorization ==> ', response.headers.authorization);
      console.log('response.headers.authorization ==> ', response.headers.authorization);
      console.log('response.headers.Authorization get ==> ', response.headers.get("authorization"));
      navigation.navigate('Home');
    }
    else{
      alert("Login failed; " + response.status + ' | ' + response.statusText);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
      
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#b7ddeb', alignItems: 'center',width:'100%' }}>
      <View style={{ marginTop: 150 }}>
        <Image style={{width:170,height:100,margin:30}} source={require('../assets/BeeSpace_logo.png')}/>
      </View>
      <KeyboardAvoidingView>
        <View style={{ marginTop: 40 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, borderColor: '#D0D0D0', borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
            <AntDesign style={{ marginLeft: 8 }} name="user" size={24} color="gray" />
            <TextInput value={login} onChangeText={(text) => setLogin(text)} placeholderTextColor={'gray'} style={{ color: 'gray', marginVertical: 10, width: 350, fontSize: login ? 16 : 16 }} placeholder='Login' />
          </View>
        </View>
        <View style={{ marginTop: 40 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, borderColor: '#D0D0D0', borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
            <AntDesign style={{ marginLeft: 8 }} name="lock" size={24} color="gray" />
            <TextInput style={{ color: 'gray', marginVertical: 10, width: 350, fontSize: login ? 16 : 16 }} secureTextEntry={!showPassword}  onChangeText={(text) => setPassword(text)} placeholderTextColor={'gray'}  placeholder='Enter your password' />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <MaterialIcons name={showPassword ? "visibility-off" : "visibility"} size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 45 }}>
          <Pressable   style={{ width: 200, backgroundColor: '#8f8e8ed1', padding: 15, marginTop: 40, marginLeft: 'auto', marginRight: 'auto', borderRadius: 6 }} onPress={handleLogin} >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Se connecter</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
export default Loginscreen
const styles = StyleSheet.create({});