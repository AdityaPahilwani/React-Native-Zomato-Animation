import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { data } from "./DATA.js";
import Card from "./components/card";

export default function App() {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
