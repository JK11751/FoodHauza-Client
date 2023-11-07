import React, { useRef, useState } from 'react'
import { Dimensions, ImageBackground, View, StyleSheet, Pressable } from 'react-native'
import { colors } from 'theme'
import {
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { Box, Text, Center, Actionsheet, Icon, Flex, Button, HStack, Badge, VStack, Input, FormControl, Stack, WarningOutlineIcon, TextArea, ScrollView, IconButton, useToast, FlatList, Image, InputGroup, InputRightAddon, AddIcon, CloseIcon, Avatar } from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import { DonationPackState } from '../../context'
import { addItemToPack } from '../../utils/pack.utils'
// const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  img: {
    height: '100%',
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const categories = [
    {
      id: 1,
      value: "cooked",
      label: "Cooked Food"
    },
    { id: 2,
      value: "raw food",
      label: "Raw Food"},
    { id: 3,
      value: "fruits",
      label: "Fruits"},
    { id:4,
      value: "drinks",
      label: "Drinks"},
    { id: 5,
      value: "dessert",
      label: "Dessert"},
  ];

const DonationPackSelect = ({isOpen, onClose}) => {
   const {donationPack, setDonationPack} = DonationPackState();
  const [category, setCategory] = useState("cooked");
    const [foods, setFoods] = useState([]);
    const [food, setFood] = useState([]);
    const [units, setUnits] = useState("");
    const [amount, setAmount] = useState(0);
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState([]);
    const [error, setError] = useState("");
    const toast = useToast();
    const toastRef = useRef();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      console.log(result)
      setImages(prev => ([...prev, result.assets[0].uri]));
    } else {
      alert('You did not select any image')
    }
  } 
  

  const onSubmit = async () => {
    const donation = {
      food: foods,
      description: description,
      images: images,
      amount: amount,
      unit: units,
      category: category,
    };
    addItemToPack(donationPack, donation, setDonationPack);
    setAmount(0)
    setDescription("")
    setFood([])
    setImages([])
    setUnits("")
    setCategory("cooked")
    onClose()
  }
  return (
    <View style={styles.root}>
      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text
                fontSize="16"
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
                bold
              >
                Donation Details
              </Text>
            </Box>
            <ScrollView h="100%">
              <VStack w={screenWidth} px="5" h="100%">
                <Text pb="10px" pt={5} bold>
                  1. Select Food Category
                </Text>
                <ScrollView horizontal>
                  <HStack
                    space={{
                      base: 2,
                      sm: 4,
                    }}
                    mx={{
                      base: "auto",
                      md: 0,
                    }}
                  >
                    {categories.map((cat) => {
                      return (
                        <Pressable
                          key={cat.id}
                          onPress={() => {
                            setCategory(cat.value);
                            console.log(category);
                          }}
                        >
                          <Badge
                            py="2"
                            px="7"
                            borderRadius="15px"
                            colorScheme={
                              cat.value == category ? "green" : "coolGray"
                            }
                          >
                            {cat.label}
                          </Badge>
                        </Pressable>
                      );
                    })}
                  </HStack>
                </ScrollView>
                <VStack w="100%">
                  <Text pb="5" pt="10" bold>
                    2. Enter Food
                  </Text>
                  <InputGroup>
                    <Input
                      w={"77%"}
                      variant="rounded"
                      placeholder="Type the food name here"
                      value={food}
                      onChangeText={(val) => setFood(val)}
                    />
                    <InputRightAddon px={5} borderRightRadius="50">
                      <Pressable
                        bgColor={"green.600"}
                        onPress={() => {
                          setFoods((prev) => [...prev, food]);
                          setFood("");
                        }}
                      >
                        <Text>Add</Text>
                      </Pressable>
                    </InputRightAddon>
                  </InputGroup>
                  <ScrollView horizontal pt={4}>
                    <HStack
                      space={{
                        base: 2,
                        sm: 4,
                      }}
                      mx={{
                        base: "auto",
                        md: 0,
                      }}
                    >
                      {foods.map((food, index) => {
                        return (
                          <Pressable
                            key={index}
                            onPress={() => {
                              // work on this later
                              setFoods((prev) =>
                                prev.filter((f) => {
                                  f !== food;
                                })
                              );
                            }}
                          >
                            <Badge
                              display={"flex"}
                              flexDir="row"
                              py="2"
                              px="7"
                              borderRadius="10px"
                              colorScheme={"coolGray"}
                            >
                              <HStack alignItems="center">
                                <Text>{food}</Text>
                                <Box
                                  ml={3}
                                  p={1}
                                  bg={colors.primary_color}
                                  borderRadius="50"
                                >
                                  <CloseIcon size={2} color="white" />
                                </Box>
                              </HStack>
                            </Badge>
                          </Pressable>
                        );
                      })}
                    </HStack>
                  </ScrollView>
                </VStack>
                <VStack>
                  <Text pb="5" pt="10" bold>
                    3. Food Quantity
                  </Text>
                  <HStack space={2}>
                    <FormControl isRequired w="50%">
                      <Stack mx="4">
                        <FormControl.Label>Quantity</FormControl.Label>
                        <Input
                          variant="rounded"
                          placeholder="Quantity"
                          value={amount}
                          onChangeText={(val) => setAmount(val)}
                        />
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}
                        >
                          Atleast 6 characters are required.
                        </FormControl.ErrorMessage>
                      </Stack>
                    </FormControl>
                    <FormControl isRequired w="50%">
                      <Stack mx="4">
                        <FormControl.Label>Units</FormControl.Label>
                        <Input
                          variant="rounded"
                          placeholder="Units"
                          value={units}
                          onChangeText={(val) => setUnits(val)}
                        />
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}
                        >
                          Atleast 6 characters are required.
                        </FormControl.ErrorMessage>
                      </Stack>
                    </FormControl>
                  </HStack>
                </VStack>

                <VStack>
                  <Text pb="5" pt="10" bold>
                    4. Add Images
                  </Text>

                  <ScrollView horizontal pb={2}>
                    <HStack
                      space={{
                        base: 2,
                        sm: 4,
                      }}
                      mx={{
                        base: "auto",
                        md: 0,
                      }}
                    >
                      {images.map((img, index) => {
                        return (
                          <Pressable
                            key={index}
                            onPress={() => {
                              // work on this later
                              setImages((prev) =>
                                prev.filter((f) => {
                                  f !== img;
                                })
                              );
                              console.log("img", images[0]);
                            }}
                          >
                            <Box
                              display={"flex"}
                              flexDir="row"
                              // py="2"
                              borderRadius="10px"
                            >
                              <Avatar
                                borderRadius="3px"
                                source={{uri: img}}
                                alt="image"
                              />
                              <HStack alignItems="center">
                                <Text>{food}</Text>
                                <Box
                                mb={8}
                                ml={-1}
                                  p={1}
                                  bg={colors.primary_color}
                                  borderRadius="50"
                                >
                                  <CloseIcon size={2} color="white" />
                                </Box>
                              </HStack>
                            </Box>
                          </Pressable>
                        );
                      })}
                    </HStack>
                  </ScrollView>
                  <HStack alignItems="center" space="5px">
                    <IconButton
                      size={"md"}
                      w="40px"
                      variant="solid"
                      bg={colors.primary_color}
                      _icon={{
                        as: MaterialCommunityIcons,
                        name: "image-plus",
                      }}
                      onPress={pickImageAsync}
                      color="black"
                    />

                    <Text>Add Images</Text>
                  </HStack>
                </VStack>
                <VStack pb="10">
                  <Text pb="5" pt="10" bold>
                    5. Description(Optional)
                  </Text>
                  <TextArea
                    h={20}
                    placeholder="Enter any additional information about the donation you are about to make"
                    w="100%"
                    maxW="300"
                    value={description}
                    onChangeText={(val) => setDescription(val)}
                  />
                </VStack>

                <Flex flexDir="row" justifyContent="center">
                  <Button
                    borderRadius="50px"
                    h="50px"
                    w="100%"
                    textAlign="center"
                    bg={colors.primary_color}
                    position="relative"
                    // onPress={onClose}
                    onPress={onSubmit}
                  >
                    Add Donation
                  </Button>
                </Flex>
              </VStack>
            </ScrollView>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    </View>
  );}
export default DonationPackSelect
