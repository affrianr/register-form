import { View, Text, StyleSheet } from "react-native";
import ImageViewer from "../components/ImageViewer";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useImageStore } from "../resources/zustanStore";

const placeholderImage = require("../assets/profil-picture.jpg");

export default function UploadScreen({ navigation }) {
  const setProfilePicture = useImageStore((state) => state.setProfilePicture);
  const profilePicture = useImageStore((state) => state.profilePicture);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingVertical: 20,
          // marginBottom: 30,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          Upload your picture
        </Text>
      </View>
      <View style={styles.imageViewer}>
        <ImageViewer
          placeholderImageSource={placeholderImage}
          selectedImage={profilePicture}
        />
      </View>
      <Button
        icon="image"
        mode="outlined"
        onPress={pickImageAsync}
        style={styles.button}
      >
        Upload here
      </Button>
      <Button
        mode="contained-tonal"
        style={styles.button}
        onPress={() => navigation.navigate("Review")}
      >
        Continue
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  imageViewer: {
    alignItems: "center",
  },
  button: {
    marginVertical: 10,
  },
});
