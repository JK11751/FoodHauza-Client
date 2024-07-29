import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ImageBackground, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import io from 'socket.io-client';
import { colors } from '../../theme';
import { useAuth } from '../../hooks/useAuth';
import images from '../../theme/images';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/api';

const screenWidth = Dimensions.get('window').width;
const socket = io("http://10.0.2.2:5000");

const ResChat = ({ route }) => {
  const { user } = useAuth();
  const [receiverId, setReceiverId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  
      

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        source={images.background_img}
        resizeMode="cover"
        style={styles.img}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={{
              padding: 8,
              backgroundColor: item.sender === user._id ? '#3BD37E' : '#fff',
              marginVertical: 4,
              borderRadius: 8,
              alignSelf: item.sender === user._id ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
            }}>
              <Text>{item.content}</Text>
            </View>
          )}
          contentContainerStyle={{ padding: 16 }}
          style={{ flex: 1, width: screenWidth }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Message"
            style={styles.input}
          />
          <Button color={colors.primary_color} title="Send" onPress={sendMessage} />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  img: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: colors.lightGray,
    backgroundColor: colors.white,
    padding: 8,
    width: screenWidth,
  },
  input: {
    flex: 1,
    paddingLeft: 16,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default ResChat;