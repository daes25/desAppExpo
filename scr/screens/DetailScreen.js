import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailScreen({ route }) {
  const { item } = route.params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle</Text>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold' },
  itemText: { fontSize: 18, marginTop: 10 },
});

