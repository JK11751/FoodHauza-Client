/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Badge, Box, HStack, Pressable, Spacer } from 'native-base'

const AccountTypeCard = ({ title, description }) => (
  <View>
    <Box alignItems="center">
      <Pressable maxW="96">
        {({ isHovered, isFocused, isPressed }) => (
          <Box
            bg={
              isPressed
                ? 'coolGray.200'
                : isHovered
                ? 'coolGray.200'
                : 'coolGray.100'
            }
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
            p="5"
            rounded="8"
            shadow={3}
            borderWidth="1"
            borderColor="coolGray.300"
          >
            <HStack alignItems="center">
              <Badge
                colorScheme="darkBlue"
                _text={{
                  color: 'white',
                }}
                variant="solid"
                rounded="4"
              >
                Business
              </Badge>
              <Spacer />
              <Text fontSize={10} color="coolGray.800">
                1 month ago
              </Text>
            </HStack>
            <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
              {title}
            </Text>
            <Text mt="2" fontSize="sm" color="coolGray.700">
              {description}
            </Text>
          </Box>
        )}
      </Pressable>
    </Box>
  </View>
)

export default AccountTypeCard
