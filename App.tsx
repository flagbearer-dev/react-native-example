import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Checkout } from "./checkout";

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Your cart</Text>
      <Text style={styles.item}>Flagbearer T-shirt · $24</Text>
      <Checkout />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff", padding: 24, paddingTop: 96 },
  title: { fontSize: 28, fontWeight: "700" },
  item: { fontSize: 16, color: "#52525b", marginTop: 8, marginBottom: 24 },
});
