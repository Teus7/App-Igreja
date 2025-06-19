import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

export default function MembrosScreen({ navigation }) {
  const [membros, setMembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    carregarMembros();
  }, [isFocused]);

  const carregarMembros = () => {
    setLoading(true);
    axios.get('http://192.168.18.151:3000/api/membros')
      .then(response => {
        setMembros(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os membros');
        setLoading(false);
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detalhes', { membro: item })}
    >
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.info}>Idade: {item.idade}</Text>
      <Text style={styles.info}>Aniversário: {item.aniversario || 'Não informado'}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={{ marginTop: 10 }}>Carregando membros...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={membros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum membro cadastrado.</Text>}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Cadastrar Membro')}
      >
        <Text style={styles.addButtonText}>➕ Novo Membro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  info: {
    fontSize: 16,
    color: '#374151',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6B7280',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
