import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'Xxx@gmail.com' && password === '123456') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.title}>¡Bienvenido!</Text>
      </View>

      <View style={styles.tarjetas}>
        <TextInput style={styles.input} placeholder="Usuario" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Contraseña" value={password} secureTextEntry onChangeText={setPassword} />
      </View>

      <View style={styles.boton}>
        <Button title="Ingresar" onPress={handleLogin} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.questio1}>¿Olvido sus datos de acceso?</Text>
        <Button title="Ayuda" onPress={handleLogin} />
        <Text style={styles.question2}>¿No tienes cuenta?</Text>
        <Button title="Crear Una" onPress={handleLogin} />
        <Text style={styles.smallText}>By</Text>
        <Text style={styles.subtitle}>NeoShield Inc.</Text>
      </View>      
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  titulo: { marginTop: -100, marginBottom: 50 },
  title: { fontFamily: 'times new roman', fontSize: 50, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  tarjetas: { marginInline: 8, marginTop: 20, gap: 2 },
  boton: { marginInline: 8, borderRadius: 10, marginTop: 30 },
  input: { height: 40, borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 10 },

  questio1: { paddingBottom: 10 },
  smallText: { fontSize: 15, color: 'black', textAlign: 'center', fontWeight: 'bold', marginBottom: 1 },
  subtitle: { fontSize: 23, color: 'black', textAlign: 'center', fontWeight: 'bold', marginBottom: 20 },
  footer: { top: '250', alignItems: 'center', gap: 5 },


});


//registro y usuario