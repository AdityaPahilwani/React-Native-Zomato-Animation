import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  Text,
  Pressable,
  Dimensions,
  Modal,
} from "react-native";
import { data } from "./DATA.js";
import Card from "./components/card";

const { height, width } = Dimensions.get("window");
export default function App() {
  const DATA = [
    { key: "Best in Thali" },
    { key: "Recommended" },
    { key: "Match Day Combos" },
    { key: "Thali" },
    { key: "Main Course" },
    { key: "Breads" },
    { key: "Rice and Biryani" },
    { key: "Starters" },
  ];
  const toHeight = 320;
  const toWidth = 200;
  const height = useRef(new Animated.Value(0)).current;
  const width = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const borderTopLeftRadius = useRef(new Animated.Value(toHeight)).current;
  const [toggle, setToggle] = useState(false);
  const genTime = 500;
  const animate = () => {
    if (!toggle) {
      setToggle(true);
      Animated.parallel([
        Animated.timing(height, {
          toValue: toHeight,
          duration: genTime,
          useNativeDriver: false,
        }),
        Animated.timing(width, {
          toValue: toWidth,
          duration: genTime,
          useNativeDriver: false,
        }),
        Animated.timing(borderTopLeftRadius, {
          toValue: 15,
          duration: genTime,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: genTime ,
          useNativeDriver: true,
        }),
        Animated.timing(height, {
          toValue: 0,
          duration: genTime ,
          useNativeDriver: false,
        }),
        Animated.timing(width, {
          toValue: 0,
          duration: genTime ,
          useNativeDriver: false,
        }),
        Animated.timing(borderTopLeftRadius, {
          toValue: toHeight,
          duration: genTime ,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setToggle(false);
      });
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{
          alignItems: "center",
        }}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Card
              image={item.image}
              title={item.title}
              description={item.description}
            ></Card>
          );
        }}
      />

      {toggle && <Pressable style={styles.bgDrop(toggle)} onPress={animate} />}
      <Pressable style={styles.bottomButton} onPress={animate}>
        <Text style={styles.text}>{toggle ? "Close" : "Menu"}</Text>
      </Pressable>
      <Animated.View
        style={styles.bottomFlip(height, width, borderTopLeftRadius)}
      >
        {DATA.map((item, index) => {
          return (
            <Animated.Text style={styles.menuText(opacity)} key={index}>
              {item.key}
            </Animated.Text>
          );
        })}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: (toggle) => ({
    flex: 1,
    backgroundColor: toggle ? "rgba(0, 0, 0, 0.6)" : "white",
    alignItems: "center",
    justifyContent: "center",
  }),
  bgDrop: (toggle) => ({
    height: height,
    width: width,
    backgroundColor: toggle ? "rgba(0, 0, 0, 0.6)" : "white",
    position: "absolute",
    bottom: 0,
    right: 0,
    top: 0,
    opacity: toggle ? 1 : 0,
    alignItems: "center",
    justifyContent: "center",
  }),
  bottomButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
  menuText: (opacity) => ({
    color: "black",
    fontSize: 24,
    letterSpacing: 1,
    marginHorizontal: 10,
    opacity: opacity,
  }),
  bottomFlip: (height, width, borderTopLeftRadius) => ({
    position: "absolute",
    bottom: 80,
    right: 20,
    borderTopLeftRadius: borderTopLeftRadius,
    height: height,
    width: width,
    borderRadius: 10,
    alignItems: "flex-start",
    backgroundColor: "white",
    overflow: "hidden",
  }),
});
