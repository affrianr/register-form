import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate("Registration")}
      >
        Create New Account
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
