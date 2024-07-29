import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ImageBackground, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import io from 'socket.io-client';
import { colors } from '../../theme';
import { useAuth } from '../../hooks/useAuth';
import images from '../../theme/images';

const screenWidth = Dimensions.get('window').width;
const socket = io("https://foodhauza-backend.onrender.com");

const DonorChat = ({ route }) => {
  const { user } = useAuth();
  const { receiverId } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    socket.emit('joinChat', { userId: user._id, donationId: receiverId });

    socket.on('chatHistory', (messages) => {
      setMessages(messages);
      // Count unread messages
      const unread = messages.filter(message => !message.read && message.receiver === user._id).length;
      setUnreadCount(unread);
    });

    socket.on('newMessage', (message) => {
      if (
        (message.sender === user._id && message.receiver === receiverId) ||
        (message.sender === receiverId && message.receiver === user._id)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
        if (!message.read && message.receiver === user._id) {
          setUnreadCount(prevCount => prevCount + 1);
        }
      }
    });

    return () => {
      socket.off('chatHistory');
      socket.off('newMessage');
    };
  }, [user._id, receiverId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', {
        senderId: user._id,
        receiverId: receiverId,
        content: message,
      });
      setMessage('');
    }
  };

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
            <View style={[
              styles.messageBubble,
              item.sender === user._id
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}>
              <Text>{item.content}</Text>
            </View>
          )}
          contentContainerStyle={{ padding: 16 }}
          style={{ flex: 1, width: screenWidth }}
        />
        <Text style={styles.unreadCount}>
          Unread Messages: {unreadCount}
        </Text>
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
    backgroundColor:"white",
    padding: 8,
    borderRadius: 25,
    marginRight: 10,
  },
  messageBubble: {
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
    maxWidth: "80%",
  },
  sentMessage: {
    backgroundColor: '#3BD37E',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  unreadCount: {
    alignSelf: 'flex-start',
    margin: 10,
    fontSize: 16,
    color: colors.primary_color,
  },
});

export default DonorChat;
