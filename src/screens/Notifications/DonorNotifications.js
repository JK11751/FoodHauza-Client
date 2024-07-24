import { Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, ChevronLeftIcon, Text, HStack, Pressable, Spacer, ThreeDotsIcon, ScrollView } from 'native-base';
import { colors } from '../../theme';
import DonorNotificationItem from '../../components/NotificationItem/DonorNotificationItem';
import { BASE_API_URL } from '../../utils/api';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

const DonorNotifications = ({ navigation }) => {
    const screenWidth = Dimensions.get("window").width;
    const { user } = useAuth(); // Get user from the auth hook
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const donorId = user._id;

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(
                  `${BASE_API_URL}/donations/requests/${donorId}`
                );
                setRequests(response.data);
            } catch (error) {
                console.error("Failed to fetch donation requests", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [donorId]);

    if (loading) {
        return <ActivityIndicator size="large" color={colors.primary_color} />;
    }

    return (
        <View>
            <Box backgroundColor="#FFFFFF">
                <Box
                    alignItems="center"
                    borderBottomLeftRadius="20px"
                    borderBottomRightRadius="20px"
                    h="70px"
                    w={screenWidth}
                    bg={colors.primary_color}
                    position="relative"
                    onPress={() => {
                        navigation.navigate("DonorDashboard");
                    }}
                >
                    <HStack paddingTop="20px" alignItems="center">
                        <Pressable
                            onPress={() => {
                                navigation.navigate("DonorDashboard");
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
            <ScrollView p={"30px"}>
                <Text>Today</Text>
                {requests.length > 0 ? (
                    requests.map((request) => (
                        <DonorNotificationItem
                            key={request._id}
                            request={request}
                        />
                    ))
                ) : (
                    <Text>No requests found</Text>
                )}
            </ScrollView>
        </View>
    );
}

export default DonorNotifications;

const styles = StyleSheet.create({});
