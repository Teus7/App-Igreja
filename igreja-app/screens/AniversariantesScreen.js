import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function AniversariantesScreen() {
  const [aniversariantes, setAniversariantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://192.168.18.151:3000/api/aniversariantes')
      .then(response => {
        setAniversariantes(response.data);
        setLoading(false);
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível carregar os aniversariantes');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text>Carregando aniversariantes...</Text>
      </View>
    );
  }

  if (aniversariantes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Nenhum aniversariante neste mês.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={aniversariantes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.data}>{item.aniversario}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 16, backgroundColor: '#F0F4FF' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  data: {
    fontSize: 16,
    color: '#374151',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6B7280',
  }
});
