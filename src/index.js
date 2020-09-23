import React, { useState, useEffect } from 'react';
import { SafeAreaView, 
  FlatList, 
  Text, 
  StyleSheet, 
  StatusBar, 
  TouchableOpacity } from 'react-native';

import api from './services/api'

export default function App() {
  const [projects, setProjects] = useState([]);

  // UseEffect para fazer chamada na api (GET)
  // Como o segundo arg é um array vazio, ele só vai disparar uma vez
  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: "NovoProjetoReactNative",
      owner: "Fabão"
    })

    setProjects([...projects, response.data])
  }

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#7159c1'/>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({item: project}) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.6}
          onPress={handleAddProject}
          >
          <Text style={styles.buttonText}> 
            Adicionar Projeto
          </Text>
        </TouchableOpacity>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1'
  },

  project: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold'
  },

  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,

  }
    
});