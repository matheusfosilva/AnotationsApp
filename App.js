import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [state, setState] = useState('home');
  const [anotation, setanotation] = useState('');

  useEffect(()=> {

    (async () => {
      try {
          const anotacaoLeitura = await AsyncStorage.getItem('anotation');
          setanotation(anotacaoLeitura);
      } catch (e) {
        
      }

    })();

  },[])
  

  setData = async () => {

    try {
      await AsyncStorage.setItem('anotation', anotation)
      alert('sua anotacao foi salva')
    } catch (e) {
      // save error
    }
  }

  function alterarState(props) {

    setState(props);

    if (props == 'home' ){
      setData();
    }

  }



  if (state == 'home') {
    return (

      <View style={styles.container} >

        <StatusBar backgroundColor='black' style='light' />

        <View style={styles.Header} >
          <Text style={{ textAlign: 'center', color: 'white' }} >Anotation's App</Text>
        </View>


        {
          (anotation != '') ?
            < View style={styles.Body}>
              <Text style={{ textAlign: 'center' }} > {anotation} </Text>
            </View>
            :
            < View style={styles.Body}>
              <Text style={{ textAlign: 'center', opacity: 0.3 }} >No one anotation</Text>
            </View>
        }


        <TouchableOpacity onPress={() => alterarState('edit')} style={styles.button}  >
          {
            (anotation == '') ?
              <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }} > + </Text>
              :
              <Text style={{ color: 'white', fontSize: 10, textAlign: 'center' }} > editar </Text>
          }
        </TouchableOpacity>

      </View >

    );

  } else if (state == 'edit') {
    return (
      <View style={styles.container} >

        <StatusBar backgroundColor='black' style='light' />

        <View style={styles.Header} >
          <Text style={{ textAlign: 'center', color: 'white' }} >Anotation's App</Text>
        </View>

        <View style={styles.Body}>

          <TextInput autoFocus={true} onChangeText={(texto) => setanotation(texto)} multiline={true} value={anotation} style={{
            padding: 15, height: 100, textAlignVertical: 'top'
          }} >

          </TextInput>

        </View>


        <TouchableOpacity onPress={() => alterarState('home') } style={styles.saveButton} >
          <Text style={{ color: 'white', textAlign: 'center', paddingTop: 5 }} > Salvar </Text>
        </TouchableOpacity>

      </View>
    )

  }

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight
  },

  Header: {
    backgroundColor: 'black',
    width: '100%',
    padding: 10
  },

  Body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10
  },

  button: {
    position: 'absolute',
    backgroundColor: 'black',
    width: 50,
    height: 50,
    right: 20,
    bottom: 20,
    padding: 10,
    borderRadius: 25
  },

  saveButton: {
    position: 'absolute',
    backgroundColor: 'black',
    width: 100,
    height: 50,
    right: 20,
    bottom: 20,
    padding: 10,
  }

});
