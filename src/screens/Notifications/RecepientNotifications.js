import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, ChevronLeftIcon, Text, HStack, Pressable, Spacer, ThreeDotsIcon, ScrollView } from 'native-base';
import { colors } from '../../theme';
import RecepientNotificationItem from '../../components/NotificationItem/RecepientNotificationItem';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth'; 
import { BASE_API_URL } from '../../utils/api';

const RecepientNotifications = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();  


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}/requests?user_id=${user._id}`); 
        setNotifications(response.data);
      } catch (error) {
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);
  

  return (
    <View style={styles.container}>
      <Box backgroundColor="#FFFFFF">
        <Box
          alignItems="center"
          borderBottomLeftRadius="20px"
          borderBottomRightRadius="20px"
          h="70px"
          w={screenWidth}
          bg={colors.primary_color}
          position="relative"
        >
          <HStack paddingTop="20px" alignItems="center">
            <Pressable
              onPress={() => {
                navigation.navigate("RecepientDashboard");
              }}
            >
              <ChevronLeftIcon paddingLeft="50px" color="white" />
            </Pressable>
            <Spacer />
            <Text color="#FFFFFF" fontSize="20px" fontWeight="700">
              Notifications
            </Text>
            <Spacer />
            <ThreeDotsIcon paddingRight="50px" color="white" />
          </HStack>
        </Box>
      </Box>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notifications.length === 0 ? (
          <Text>No notifications</Text>
        ) : (
          notifications.map(notification => (
            <RecepientNotificationItem
              key={notification._id}
              notification={notification}
               navigation={navigation}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 30,
    paddingBottom: 30,
  },
});

export default RecepientNotifications;
