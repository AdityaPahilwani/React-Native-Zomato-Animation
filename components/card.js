import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  NativeModules,
  LayoutAnimation,
} from "react-native";

const { width, height } = Dimensions.get("window");

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

let cardWidth = width * 0.9;
const space = 10;
const borderRadius = 10;
const imageW = 80;
const imageH = 80;
const altImageH = 200;
const descriptionW = cardWidth - imageW;
const textSize = 24;
const descriptionSize = 20;
const descriptionL = 2;
const Card = (props) => {
  const { image, title, description } = props;
  const [imageWidth, setImageWidth] = useState(imageW);
  const [imageHeight, setImageHeight] = useState(imageH);
  const [descriptionWidth, setDescriptionWidth] = useState(descriptionW);
  const [descriptionLines, setDescriptionLines] = useState(descriptionL);

  let toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setImageWidth(imageWidth === imageW ? cardWidth : imageW);
    setImageHeight(imageHeight === imageH ? altImageH : imageH);
    setDescriptionWidth(
      descriptionWidth === descriptionW ? cardWidth : descriptionW
    );
    setDescriptionLines(
      descriptionLines === descriptionL ? null : descriptionL
    );
  };
  return (
    <Animated.View style={styles.cardContainer}>
      <Pressable onPress={toggle}>
        <Animated.View style={styles.imageContainer(imageWidth, imageHeight)}>
          <Animated.Image style={styles.image} source={{ uri: image }} />
        </Animated.View>
      </Pressable>
      <Animated.View style={styles.description(descriptionWidth)}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.descriptionText} numberOfLines={descriptionLines}>
            {description}
          </Text>
        </View>
        <Pressable style={styles.button}>
          <Text style={{ color: "black", fontSize: 20 }}>Add</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: "auto",
    width: cardWidth,
    borderRadius: borderRadius,
    overflow: "hidden",
    marginVertical: space,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageContainer: (imageWidth, imageHeight) => ({
    width: imageWidth,
    height: imageHeight,
    overflow: "hidden",
    alignItems: "center",
    padding: 5,
  }),
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius,
  },
  description: (descriptionWidth) => ({
    height: "auto",
    width: descriptionWidth,
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  }),
  textContainer: {
    height: "auto",
    width: "75%",
  },
  title: {
    fontSize: textSize,
    color: "black",
  },

  descriptionText: {
    fontSize: descriptionSize,
    fontWeight: "bold",
    color: "grey",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius,
    width: "20%",
  },
});
export default Card;
