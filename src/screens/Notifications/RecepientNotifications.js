import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  Box,
  ChevronLeftIcon,
  Text,
  HStack,
  Pressable,
  Spacer,
  ThreeDotsIcon,
  ScrollView,
  Button,
} from 'native-base';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../theme';
import { BASE_API_URL } from '../../utils/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import RecepientNotificationItem from '../../components/NotificationItem/RecepientNotificationItem';

const RecepientNotifications = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const { user } = useAuth();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}/requests?user_id=${user._id}`
        );
        setNotifications(response.data);
        setFilteredNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      filterNotificationsByDate(date);
    }
    setShowDatePicker(false);
  };

  const filterNotificationsByDate = (date) => {
    const filtered = notifications.filter((notification) => {
      const pickupDate = new Date(notification.pickupDate);
      return (
        pickupDate.getDate() === date.getDate() &&
        pickupDate.getMonth() === date.getMonth() &&
        pickupDate.getFullYear() === date.getFullYear()
      );
    });
    setFilteredNotifications(filtered);
  };

  const resetFilter = () => {
    setSelectedDate(null);
    setFilteredNotifications(notifications);
  };

  const clearAll = () => {
    setFilteredNotifications([]);
  };

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
                navigation.navigate('RecepientDashboard');
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
      <View style={styles.filterContainer}>
        <Button bgColor={colors.gray} onPress={() => setShowDatePicker(true)}>Filter By Date</Button>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <Button bgColor={colors.primary_color} onPress={resetFilter}>Clear Filters</Button>
        <Button colorScheme={"red"} onPress={clearAll}>Delete All</Button>
      </View>
      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDateText}>
          {selectedDate ? selectedDate.toDateString() : 'Today'}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredNotifications.length === 0 ? (
          <Text>No notifications</Text>
        ) : (
          filteredNotifications.map((notification) => (
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  selectedDateContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  selectedDateText: {
    fontSize: 16,
    color: colors.primary_color,
  },
});

export default RecepientNotifications;
