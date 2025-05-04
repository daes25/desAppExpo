import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const tweets = [
  {
    id: '1',
    user: 'User.Example',
    handle: '@user.example',
    content: "this is an edited Tweet.\nwe’re testing it.",
    editedAt: '8:55 AM - 09/01/22',
    likes: 4,
  },
  {
    id: '2',
    user: 'User.Example',
    handle: '@user.example',
    content: "this is an edited Tweet.\nwe’re testing it.",
    editedAt: '8:55 AM - 09/01/22',
    likes: 4,
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio</Text>
      <FlatList
        data={tweets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tweetCard}>
            <Text style={styles.username}>{item.user} <Text style={styles.handle}>{item.handle}</Text></Text>
            <Text style={styles.tweetText}>{item.content}</Text>
            <Text style={styles.editInfo}>
              Last edited {item.editedAt}
            </Text>
            <Text style={styles.likes}>{item.likes} Likes</Text>
            <View style={styles.actions}>
              <Feather name="message-circle" size={18} />
              <Feather name="repeat" size={18} />
              <Feather name="heart" size={18} />
              <Feather name="share" size={18} />
            </View>
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 60, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  tweetCard: { borderBottomWidth: 1, borderBottomColor : '#ccc', padding: 15,},
  username: { fontWeight: 'bold', fontSize: 16, },
  handle: { fontWeight: 'normal', color: 'gray', }, 
  tweetText: { fontSize: 16, marginTop: 5, marginBottom: 5, },
  editInfo: { color: '#1DA1F2', fontSize: 12, },
  likes: { marginTop: 5, fontSize: 12, },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, },
});

/// feed de la pagina 