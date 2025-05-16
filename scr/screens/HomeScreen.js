import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Feather, FontAwesome, Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';

const generateTweets = () => {
  const tweets = [];
  for (let i = 1; i <= 50; i++) {
    tweets.push({
      id: `${i}`,
      user: `User${i}`,
      username: `@user${i}`,
      content: `Este es el tweet número ${i}. Estamos haciendo una prueba de scroll.`,
      editedAt: `Last edited 8:55 AM · 09/01/22`,
      likes: Math.floor(Math.random() * 100),
      liked: false,
    });
  }
  return tweets;
};

const initialTweets = generateTweets();

export default function App() {
  const [tweets, setTweets] = useState(initialTweets);
  const [searchText, setSearchText] = useState('');
  const [activeScreen, setActiveScreen] = useState('home');

  // Filtrar tweets según el texto de búsqueda
  const filteredTweets = tweets.filter(
    (tweet) =>
      tweet.user.toLowerCase().includes(searchText.toLowerCase()) ||
      tweet.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleLike = (id) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === id
          ? {
            ...tweet,
            liked: !tweet.liked,
            likes: tweet.liked ? tweet.likes - 1 : tweet.likes + 1,
          }
          : tweet
      )
    );
  };

  const showAlert = (action) => {
    Alert.alert(`${action}`, `${action} action clicked`);
  };

  const handleNav = (screen) => {
    setActiveScreen(screen);
    if (screen === 'create') {
      Alert.alert('Crear publicación', 'Aquí puedes subir una nueva publicación');
    } else {
      Alert.alert('Navegación', `Te moviste a la pantalla: ${screen}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchBar}>
        <Feather name="user" size={24} color="#ccc" />
        <TextInput
          style={styles.input}
          placeholder="Buscar en SafeTweet"
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Título */}
      <Text style={styles.title}>Inicio</Text>

      {/* Lista de tweets filtrados */}
      <FlatList
        data={filteredTweets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tweet}>
            <View style={styles.userInfo}>
              <Feather name="user" size={40} color="#bbb" />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.username}>{item.user}</Text>
                <Text style={styles.handle}>{item.username}</Text>
              </View>
            </View>

            <Text style={styles.content}>{item.content}</Text>

            <Text style={styles.edited}>
              <Feather name="edit-3" size={12} color="#1D9BF0" />{' '}
              <Text style={{ color: '#1D9BF0' }}>{item.editedAt}</Text>
            </Text>

            <Text style={styles.likes}>{item.likes} Likes</Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => showAlert('Comment')}>
                <Feather name="message-circle" size={20} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => showAlert('Retweet')}>
                <Feather name="repeat" size={20} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleLike(item.id)}>
                <FontAwesome
                  name={item.liked ? 'heart' : 'heart-o'}
                  size={20}
                  color={item.liked ? '#e0245e' : 'gray'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => showAlert('Share')}>
                <Feather name="share" size={20} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Navegación inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => handleNav('home')}>
          <Ionicons
            name="home-outline"
            size={26}
            color={activeScreen === 'home' ? '#1D9BF0' : '#888'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNav('search')}>
          <AntDesign
            name="search1"
            size={24}
            color={activeScreen === 'search' ? '#1D9BF0' : '#888'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNav('create')}>
          <MaterialIcons
            name="add-circle-outline"
            size={30}
            color={activeScreen === 'create' ? '#1D9BF0' : '#888'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNav('notifications')}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={activeScreen === 'notifications' ? '#1D9BF0' : '#888'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNav('profile')}>
          <Ionicons
            name="person-circle-outline"
            size={26}
            color={activeScreen === 'profile' ? '#1D9BF0' : '#888'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  searchBar: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, backgroundColor: '#f1f1f1', borderRadius: 25, paddingHorizontal: 10, height: 35, },
  input: { flex: 1, paddingLeft: 10, fontSize: 14 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  tweet: { borderTopWidth: 0.5, borderColor: '#ddd', paddingHorizontal: 15, paddingVertical: 10, },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  username: { fontWeight: 'bold' },
  handle: { color: 'gray', fontSize: 12 },
  content: { fontSize: 16, marginBottom: 5 },
  edited: { fontSize: 12, marginBottom: 5 },
  likes: { fontWeight: 'bold', marginBottom: 5 },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 5, },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderColor: '#ddd', backgroundColor: '#fff', },
});
