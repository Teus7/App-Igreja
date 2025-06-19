import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function DashboardScreen() {
  const [membros, setMembros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    axios.get('http://192.168.18.151:3000/api/membros')
      .then(response => {
        setMembros(response.data);
        setCarregando(false);
      })
      .catch(error => {
        console.error('Erro ao carregar membros:', error);
        setCarregando(false);
      });
  }, []);

  const totalMembros = membros.length;

  const aniversariantesDoMes = membros.filter(membro => {
    if (!membro.aniversario) return false;
    const partes = membro.aniversario.split('/');
    if (partes.length !== 3) return false;
    const mesAniversario = parseInt(partes[1]);
    const mesAtual = new Date().getMonth() + 1;
    return mesAniversario === mesAtual;
  });

  const membrosPorMinisterio = membros.reduce((acc, membro) => {
    const ministerio = membro.ministerio || 'Sem Ministério';
    acc[ministerio] = (acc[ministerio] || 0) + 1;
    return acc;
  }, {});

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando Dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard da Igreja</Text>

      <Text style={styles.item}>Total de membros: {totalMembros}</Text>
      <Text style={styles.item}>Aniversariantes deste mês: {aniversariantesDoMes.length}</Text>

      <Text style={styles.subtitle}>Membros por Ministério:</Text>
      {Object.entries(membrosPorMinisterio).map(([ministerio, quantidade]) => (
        <Text key={ministerio} style={styles.item}>
          {ministerio}: {quantidade}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
});
