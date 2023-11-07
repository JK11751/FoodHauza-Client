import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Alert,
  Center,
  VStack,
  Text,
  Box,
  Collapse,
  Image,
  Button,
  AlertDialog,
} from 'native-base'
import { colors, images } from '../../theme'

const RequestReceivedAlert = ({show, setShow, navigation}) => {
  const onClose = () => setShow(false);
  return(
  <View>
    {/* <Collapse isOpen={show}> */}
    <Center position="absolute" top="-450" right="-168" backgroundColor="white">
      <VStack space={5} maxW="400">
        <AlertDialog
          w="100%"
          status="success"
          variant="outline-light"
          isOpen={show}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.Body>
              <VStack space={1} flexShrink={1} w="100%" alignItems="center">
                <Image
                  source={images.requestReceived}
                  alt="Alternate Text"
                  size="xl"
                  mt="5"
                />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: "coolGray.800",
                  }}
                >
                  Request received!
                </Text>

                <Box
                  _text={{
                    textAlign: "center",
                  }}
                  _dark={{
                    _text: {
                      color: "coolGray.600",
                    },
                  }}
                >
                  Your application has been received. We will notify recepients
                  of your very generous donation.
                </Box>
                <Button
                  borderRadius="50px"
                  h="50px"
                  // w="100%"
                  px="10"
                  my="5"
                  textAlign="center"
                  bg={colors.primary_color}
                  position="relative"
                  onPress={() => {
                    setShow(false);
                    navigation.navigate("DonorDashboard");
                  }}
                >
                  Ok. Back to home
                </Button>
              </VStack>
            </AlertDialog.Body>
          </AlertDialog.Content>
        </AlertDialog>
      </VStack>
    </Center>
    {/* </Collapse> */}
  </View>
)}

export default RequestReceivedAlert
