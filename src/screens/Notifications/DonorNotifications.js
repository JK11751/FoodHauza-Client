import { Dimensions, StyleSheet, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, ChevronLeftIcon, Text, HStack, Pressable, Spacer, ThreeDotsIcon, IconButton, Badge } from 'native-base';
import { colors } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons';
import DonorNotificationItem from '../../components/NotificationItem/DonorNotificationItem';
import { BASE_API_URL } from '../../utils/api';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';


const DonorNotifications = ({ navigation }) => {
    const screenWidth = Dimensions.get("window").width;
    const { user } = useAuth(); 
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPending, setShowPending] = useState(false);

    const donorId = user?._id;

    useEffect(() => {
        if (donorId) {
            fetchRequests();
        }
    }, [donorId]);

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

    const handleUpdate = () => {
        fetchRequests(); // Re-fetch requests to update the list
    };

    const pendingRequests = requests.filter(request => !request.accepted);
    const pendingRequestsCount = pendingRequests.length;


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
                    <HStack paddingTop="10px" alignItems="center">
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
                        <Box position="relative">
                            <IconButton
                                icon={<MaterialIcons name="notifications" size={24} color="white" />}
                                onPress={() => setShowPending(!showPending)}
                            />
                            {pendingRequestsCount > 0 && (
                                <Badge 
                                    colorScheme="danger"
                                    rounded="full"
                                    mb={-4}
                                    mr={-4}
                                    zIndex={1}
                                    variant="solid"
                                    alignSelf="center"
                                    _text={{
                                        fontSize: 12,
                                    }}
                                >
                                    {pendingRequestsCount}
                                </Badge>
                            )}
                        </Box>
                        <ThreeDotsIcon paddingRight="50px" color="white" />
                    </HStack>
                </Box>
            </Box>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {showPending ? (
                    <>
                        <Text>Pending Requests</Text>
                        {pendingRequestsCount > 0 ? (
                            pendingRequests.map((request) => (
                                <DonorNotificationItem
                                    key={request._id}
                                    request={request}
                                    onUpdate={handleUpdate} // Pass handleUpdate as onUpdate prop
                                />
                            ))
                        ) : (
                            <Text fontSize="sm"  alignSelf={'center'}>No pending requests</Text>
                        )}
                    </>
                ) : (
                    <>
                        <Text>Today</Text>
                        {requests.length > 0 ? (
                            requests.map((request) => (
                                <DonorNotificationItem
                                    key={request._id}
                                    request={request}
                                    onUpdate={handleUpdate} // Pass handleUpdate as onUpdate prop
                                />
                            ))
                        ) : (
                            <Text >No requests found</Text>
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    );
}

export default DonorNotifications;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        padding: 16,
        paddingBottom: 30,
    },
});
