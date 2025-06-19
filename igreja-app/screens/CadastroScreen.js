import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, Text, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [pontoReferencia, setPontoReferencia] = useState('');
  const [aniversario, setAniversario] = useState('');
  const [ministerio, setMinisterio] = useState('');
  const [celula, setCelula] = useState('');

  const handleCadastrar = () => {
    if (!nome || !idade) {
      Alert.alert('Erro', 'Nome e idade são obrigatórios.');
      return;
    }

    const endereco = {
      rua,
      numero,
      bairro,
      cidade,
      estado,
      pontoReferencia
    };

    const novoMembro = {
      nome,
      idade: parseInt(idade),
      endereco,
      aniversario,
      ministerio,
      celula,
    };

    axios.post('http://192.168.18.151:3000/api/membros', novoMembro)
      .then(() => {
        Alert.alert('Sucesso', 'Membro cadastrado!');
        navigation.goBack();
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível cadastrar o membro.');
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastrar Novo Membro</Text>

        <TextInput
          placeholder="Nome *"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          placeholder="Idade *"
          style={styles.input}
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
        />

        <Text style={styles.sectionTitle}>Endereço</Text>
        <TextInput
          placeholder="Rua"
          style={styles.input}
          value={rua}
          onChangeText={setRua}
        />
        <TextInput
          placeholder="Número"
          style={styles.input}
          value={numero}
          onChangeText={setNumero}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Bairro"
          style={styles.input}
          value={bairro}
          onChangeText={setBairro}
        />
        <TextInput
          placeholder="Cidade"
          style={styles.input}
          value={cidade}
          onChangeText={setCidade}
        />
        <TextInput
          placeholder="Estado"
          style={styles.input}
          value={estado}
          onChangeText={setEstado}
        />
        <TextInput
          placeholder="Ponto de referência"
          style={styles.input}
          value={pontoReferencia}
          onChangeText={setPontoReferencia}
        />

        <TextInput
          placeholder="Aniversário (YYYY-MM-DD)"
          style={styles.input}
          value={aniversario}
          onChangeText={setAniversario}
        />
        <TextInput
          placeholder="Ministério"
          style={styles.input}
          value={ministerio}
          onChangeText={setMinisterio}
        />
        <TextInput
          placeholder="Célula"
          style={styles.input}
          value={celula}
          onChangeText={setCelula}
        />

        <Button title="Cadastrar" onPress={handleCadastrar} color="#3B82F6" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0F4FF',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E3A8A',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 15,
    color: '#334155',
  },
});
