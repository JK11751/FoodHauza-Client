// AnimatedBanner.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = 400; // Adjust based on the image width

const AnimatedBanner = () => {
  const translateX = new Animated.Value(width);

  Animated.loop(
    Animated.sequence([
      Animated.timing(translateX, {
        toValue: -IMAGE_WIDTH,
        duration: 10000, // Duration of the animation
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: width,
        duration: 0,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.banner, { transform: [{ translateX }] }]}>
        <ImageBackground
          source={{ uri: 'https://example.com/your-image.jpg' }} // Replace with your image URL
          style={styles.image}
          resizeMode="cover"
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>This is an animated banner with image and text overlay!</Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#ff6347', // Background color of the banner
    paddingVertical: 10,
  },
  banner: {
    flexDirection: 'row',
  },
  image: {
    width: IMAGE_WIDTH,
    height: 100, // Adjust based on your needs
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default AnimatedBanner;
