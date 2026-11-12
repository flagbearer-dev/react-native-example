import { Pressable, StyleSheet, Text, View } from "react-native";

import { useFlag, useFlagsLoaded } from "./flags";

// The one place the old and new checkout part ways. The default is false, so
// the app keeps today's checkout until the flag is turned on.
export function Checkout() {
  const loaded = useFlagsLoaded();
  const newCheckout = useFlag("new-checkout", false);

  if (!loaded) {
    return <Text style={styles.muted}>Loading checkout…</Text>;
  }
  return newCheckout ? <OneStepCheckout /> : <ClassicCheckout />;
}

function ClassicCheckout() {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Checkout</Text>
      <Text style={styles.muted}>1. Shipping address</Text>
      <Text style={styles.muted}>2. Delivery</Text>
      <Text style={styles.muted}>3. Payment</Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Continue to shipping</Text>
      </Pressable>
    </View>
  );
}

function OneStepCheckout() {
  return (
    <View style={[styles.card, styles.newCard]}>
      <Text style={styles.heading}>One-step checkout</Text>
      <Text style={styles.muted}>
        Address, delivery and payment on one screen.
      </Text>
      <Pressable style={[styles.button, styles.newButton]}>
        <Text style={styles.buttonText}>Pay now</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 12,
    padding: 24,
    gap: 4,
  },
  newCard: { borderColor: "#6ee7b7", backgroundColor: "#ecfdf5" },
  heading: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  muted: { color: "#52525b", fontSize: 16 },
  button: {
    marginTop: 16,
    alignSelf: "flex-start",
    backgroundColor: "#18181b",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  newButton: { backgroundColor: "#059669" },
  buttonText: { color: "#fff", fontSize: 16 },
});
