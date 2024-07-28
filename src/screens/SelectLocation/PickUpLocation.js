/* eslint-disable import/no-unresolved */
import React, { useState, useRef,useEffect } from 'react'
import { Platform, StyleSheet, Dimensions, TextInput } from 'react-native'
import {GOOGLE_MAPS_APIKEY} from "@env";
import {
  Box,
  Button,
  ChevronLeftIcon,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  View,
  Spacer,
  StatusBar,
  ThreeDotsIcon,
  VStack,
  Input,
  Pressable,
  useToast,
  KeyboardAvoidingView,
} from "native-base";
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../../theme'
import MapDisplay from '../../components/Map'
import RequestReceivedAlert from '../../components/RequestReceivedAlert'
import { useAuth } from '../../hooks/useAuth'
import { DonationPackState} from '../../context'
import { BASE_API_URL } from '../../utils/api'
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialIcons } from '@expo/vector-icons';
import { clearPack } from '../../utils/pack.utils';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "none",
    height: screenHeight,
  },
  img: {
    height: '100%',
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginTop: 10,
    height: 50,
    width: 290,
    borderRadius: 50,
    backgroundColor: '#f3f3f3',
    margin: 12,
    // borderWidth: 1,
    padding: 10,
  },
})

const PickUpLocation = ({ navigation }) => {
  const [show, setShow] = React.useState(false)
  const [origin, setOrigin] = useState({
    location: "",
    description: "",
    address: "",
  });
    const [error, setError] = React.useState("");
    const auth = useAuth();
    const {donationPack, setDonationPack} = DonationPackState()
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const toastRef = useRef();
  const data = {
    "foods": donationPack,
    "location": origin,
    "creator": auth.user._id,
    "cancelled": false,
    "approved": false,
    "requested": false,
  };


  const createDonation = async () => {
     const token = auth.token ? auth.token : null;

     const config = {
       headers: {
         "Content-type": "application/json",
         Authorization: `Bearer ${token}`,
       },
     };

     try {
       setLoading(true);
       const response = await axios.post(`${BASE_API_URL}/donations`,data ,config);
       if (response.data && response.status === 201) {
         setLoading(false);

         // Success 🎉
         console.log("response", response);
         clearPack(setDonationPack)
         setShow(true)
       }
      console.log(data)
      } catch {(err) => {
        setError(err.message);
        console.log("upload " + err.message);
      }}};

  useEffect(() => {
    if (error) {
      showMessage(error);
    }
    if (loading) {
      showLoading("loading");
    }
  }, [error, loading]);

  const showMessage = (errMessage) => {
    toastRef.current = toast.show({
      title: errMessage,
      placement: "top",
    });
  };
  const showLoading = (loadingText) => {
    toastRef.current = toast.show({
      title: loadingText,
      placement: "top",
    });
  };
  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView>
        <StatusBar barStyle="light-content" />
        <VStack h="100%" w="100%">
          <View>
            <Box bg="transparent" position={"absolute"} top={2} zIndex="10">
              <Box
                alignItems="center"
                h="70px"
                w={screenWidth}
                position="relative"
                onPress={() => {
                  navigation.navigate("NewDonationPack");
                }}
              >
                <HStack paddingTop="20px" alignItems="center">
                  <Pressable
                    onPress={() => {
                      navigation.navigate("DonationPackStart");
                    }}
                  >
                    <Box ml="20px" p="10px" bg="white" rounded="md">
                      <ChevronLeftIcon color="black" />
                    </Box>
                  </Pressable>
                  <Spacer />

                  <Spacer />
                  <Box mr="20px" p="10px" bg="white" rounded="md">
                    <ThreeDotsIcon color="black" />
                  </Box>
                </HStack>
              </Box>
            </Box>
            <Box
              w={screenWidth}
              px={30}
              py={5}
              position={"absolute"}
              top={16}
              zIndex="10"
            >
              <GooglePlacesAutocomplete
                placeholder="Search Location"
                nearbyPlacesAPI="GooglePlacesSearch"
                enablePoweredByContainer={false}
                fetchDetails={true}
                debounce={400}
                minLength={2}
                onPress={(data, details = null) => {
                  console.log(details);
                  setOrigin({
                    location: details.geometry.location,
                    description: details.description,
                    address: details.formatted_address,
                  });
                }}
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: "en",
                }}
                styles={{
                  container: {
                    flex: 0,
                  },
                  textInput: {
                    fontSize: 12,
                    width: 200,
                    backgroundColor: "#fafafa",
                  },
                }}
              />
            </Box>
            <View h={500}>
              <MapDisplay origin={origin} />
            </View>
            <VStack
              pt="10"
              alignItems="center"
              justifyContent="center"
              backgroundColor="white"
            >
              <Text fontWeight="bold" fontSize="20px">
                Select pick-up Location
              </Text>
              <Box w={screenWidth} px={30} py={1}>
                <Box mb="5">
                  <Input
                    height="50"
                    width="290"
                    mt="5"
                    variant="rounded"
                    placeholder="Search Location...."
                    value={origin.address}
                    InputRightElement={<MaterialIcons mr={5} size={24} name="location-pin" />}
                  />
                </Box>
              </Box>
              <Button
                borderRadius="50px"
                h="50px"
                w="80%"
                textAlign="center"
                bg={colors.primary_color}
                position="relative"
                onPress={""}
              >
                Confirm
              </Button>
            </VStack>
          </View>
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default PickUpLocation
