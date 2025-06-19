import React from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function DetalhesScreen({ route, navigation }) {
  const { membro } = route.params;

  const excluirMembro = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este membro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            axios.delete(`http://192.168.18.151:3000/api/membros/${membro.id}`)
              .then(() => {
                Alert.alert('Sucesso', 'Membro excluído');
                navigation.navigate('Membros');
              })
              .catch(() => {
                Alert.alert('Erro', 'Não foi possível excluir o membro');
              });
          }
        }
      ]
    );
  };

  const endereco = membro.endereco || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{membro.nome}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Idade:</Text>
        <Text style={styles.value}>{membro.idade}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Endereço:</Text>
        <Text style={styles.value}>
          {endereco.rua || '-'}, {endereco.numero || '-'}{"\n"}
          {endereco.bairro || '-'}, {endereco.cidade || '-'}{"\n"}
          {endereco.estado || '-'}{"\n"}
          Ponto de referência: {endereco.pontoReferencia || '-'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Aniversário:</Text>
        <Text style={styles.value}>{membro.aniversario || '-'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Ministério:</Text>
        <Text style={styles.value}>{membro.ministerio || '-'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Célula:</Text>
        <Text style={styles.value}>{membro.celula || '-'}</Text>
      </View>

      <View style={styles.buttonGroup}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('Editar Membro', { membro })}
        />
        <View style={{ height: 10 }} />
        <Button
          title="Excluir"
          color="red"
          onPress={excluirMembro}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0F4FF',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E3A8A',
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: '#334155',
  },
  value: {
    fontSize: 16,
    color: '#475569',
    marginTop: 4,
    lineHeight: 22,
  },
  buttonGroup: {
    marginTop: 30,
  },
});
