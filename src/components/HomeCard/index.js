import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Flex, Box, ChevronRightIcon } from 'native-base';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
});

const HomeCard = ({ title = '', description = '', onPress = () => {} }) => (
  <TouchableOpacity onPress={onPress}>
    <Flex
      px="30px"
      py="35px"
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box w="90%">
        <Text style={styles.title}>{title}</Text>
        <Text>{description}</Text>
      </Box>
      <ChevronRightIcon />
    </Flex>
  </TouchableOpacity>
);

HomeCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onPress: PropTypes.func,
};

export default HomeCard;
