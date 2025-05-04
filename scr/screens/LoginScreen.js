import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { registrarUsuario, loginUsuario, actualizarContrasena } from '../services/usuarioService';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newResetPassword, setNewResetPassword] = useState('');

  // 📍 Login usando base de datos
  const handleLogin = () => {
    loginUsuario(username, password, (user) => {
      if (user) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    });
  };

  // 📍 Registro usando base de datos
  const handleRegister = () => {
    if (!email || !newUsername || !newPassword) {
      Alert.alert('Campos vacíos', 'Por favor, completa todos los campos para crear una cuenta');
      return;
    }
    registrarUsuario(email, newUsername, newPassword, (success) => {
      if (success) {
        Alert.alert('Registrado', 'Tu cuenta ha sido creada con éxito');
        setIsRegistering(false);
        setEmail('');
        setNewUsername('');
        setNewPassword('');
      } else {
        Alert.alert('Error', 'No se pudo registrar el usuario');
      }
    });
  };

  // 📍 Reset de contraseña usando base de datos
  const handleResetSubmit = () => {
    if (!resetEmail || !newResetPassword) {
      Alert.alert('Campos vacíos', 'Completa ambos campos para restablecer la contraseña');
      return;
    }
    actualizarContrasena(resetEmail, newResetPassword, (success) => {
      if (success) {
        Alert.alert('Éxito', 'Tu contraseña ha sido actualizada');
        setIsResettingPassword(false);
        setResetEmail('');
        setNewResetPassword('');
      } else {
        Alert.alert('Error', 'No se encontró el usuario con ese correo');
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.title}>¡Bienvenido!</Text>
      </View>

      {isResettingPassword ? (
        <View style={styles.tarjetas}>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={resetEmail}
            onChangeText={setResetEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            value={newResetPassword}
            onChangeText={setNewResetPassword}
            secureTextEntry
          />
          <View style={styles.boton}>
            <Button title="Restablecer Contraseña" onPress={handleResetSubmit} />
            <Button title="Cancelar" onPress={() => setIsResettingPassword(false)} />
          </View>
        </View>
      ) : isRegistering ? (
        <View style={styles.tarjetas}>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            value={newUsername}
            onChangeText={setNewUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={newPassword}
            secureTextEntry
            onChangeText={setNewPassword}
          />
          <View style={styles.boton}>
            <Button title="Crear Cuenta" onPress={handleRegister} />
            <Button title="Cancelar" onPress={() => setIsRegistering(false)} />
          </View>
        </View>
      ) : (
        <View style={styles.tarjetas}>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
      )}

      <View style={styles.boton}>
        {!isRegistering && !isResettingPassword ? (
          <Button title="Ingresar" onPress={handleLogin} />
        ) : null}
      </View>

      {!isResettingPassword && (
        <View style={styles.footer}>
          <Text style={styles.questio1}>¿Olvidó sus datos de acceso?</Text>
          <Button title="Ayuda" onPress={() => setIsResettingPassword(true)} />
          <Text style={styles.question2}>¿No tienes cuenta?</Text>
          <Button title="Crea Una" onPress={() => setIsRegistering(true)} />
          <Text style={styles.smallText}>By</Text>
          <Text style={styles.subtitle}>NeoShield Inc.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  titulo: { marginTop: -100, marginBottom: 50 },
  title: { fontFamily: 'times new roman', fontSize: 50, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  tarjetas: { marginInline: 8, gap: 2 },
  boton: { marginInline: 8, borderRadius: 10, marginTop: 30, gap: 7 },
  input: { height: 40, borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 10 },
  smallText: { fontSize: 15, color: 'black', textAlign: 'center', fontWeight: 'bold', marginBottom: 1 },
  subtitle: { fontSize: 23, color: 'black', textAlign: 'center', fontWeight: 'bold', marginBottom: 20 },
  footer: { top: '210', alignItems: 'center', gap: 10 }
});
