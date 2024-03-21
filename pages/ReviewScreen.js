import { TextInput, Modal, Portal, Button } from "react-native-paper";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import DatePicker from "react-native-modern-datepicker";
import { AntDesign } from "@expo/vector-icons";
import {
  useImageStore,
  useKecamatanStore,
  useKelurahanStore,
  useKotaStore,
  usePronvinsiStore,
  useUserStore,
} from "../resources/zustanStore";
import ImageViewer from "../components/ImageViewer";
import { StatusBar } from "expo-status-bar";

export default function ReviewScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const selectedProvinceId = usePronvinsiStore((state) => state.provinceId);
  const selectedRegencyId = useKotaStore((state) => state.regencyId);
  const selectedDistrictId = useKecamatanStore((state) => state.districtId);
  const selectedVillageId = useKelurahanStore((state) => state.villageId);
  const getProvinceName = usePronvinsiStore((state) => state.getProvinceName);
  const getRegencyName = useKotaStore((state) => state.getRegencyName);
  const getDistrictName = useKecamatanStore((state) => state.getDistrictName);
  const getVillageName = useKelurahanStore((state) => state.getVillageName);
  const firstName = useUserStore((state) => state.firstName);
  const lastName = useUserStore((state) => state.lastName);
  const biodata = useUserStore((state) => state.biodata);
  const birthdate = useUserStore((state) => state.birthdate);
  const province = usePronvinsiStore((state) => state.provinceName);
  const regency = useKotaStore((state) => state.regencyName);
  const district = useKecamatanStore((state) => state.districtName);
  const village = useKelurahanStore((state) => state.villageName);
  const profilePicture = useImageStore((state) => state.profilePicture);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProvinceName(selectedProvinceId);
        await getRegencyName(selectedProvinceId, selectedRegencyId);
        await getDistrictName(selectedRegencyId, selectedDistrictId);
        await getVillageName(selectedDistrictId, selectedVillageId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <StatusBar />
      <ScrollView style={style.container}>
        <View style={style.body}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <ImageViewer
              // placeholderImageSource={placeholderImage}
              selectedImage={profilePicture}
            />
          </View>
          <View style={style.form}>
            <TextInput
              mode="outlined"
              label="First Name"
              disabled
              value={firstName}
              placeholder="Type your first name"
              right={<TextInput.Affix text="/100" />}
              style={{ backgroundColor: "white" }}
            />
            <TextInput
              mode="outlined"
              label="Last Name"
              disabled
              value={lastName}
              placeholder="Type your last name"
              right={<TextInput.Affix text="/100" />}
              style={{ backgroundColor: "white" }}
            />
            <TextInput
              multiline
              label="Biodata"
              disabled
              value={biodata}
              numberOfLines={4}
              maxLength={200}
              placeholder="Type your biodata"
              right={<TextInput.Affix text="/200" />}
              style={style.textArea}
              //   onChangeText={(text) => onChangeText(text)}
            />
            <Text>Birthdate</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextInput
                placeholder="YYYY/MM/DD"
                disabled
                style={{
                  flex: 4,
                  borderRadius: 10,
                }}
                value={birthdate}
              />
              <Portal>
                <Modal
                  visible={visible}
                  //   onDismiss={handleModal}
                  contentContainerStyle={{
                    padding: 10,
                  }}
                >
                  <DatePicker />
                  <Text>Click anywhere to dismiss</Text>
                </Modal>
              </Portal>
              <Button
                style={{ justifyContent: "center" }}
                //   onPress={handleModal}
              >
                <AntDesign name="calendar" size={24} color="black" />
              </Button>
            </View>

            <Text>Provinsi:</Text>
            <TextInput
              disabled
              value={province}
              placeholder="Provinsi"
              style={{ backgroundColor: "white" }}
            />
            <Text>Kabupaten/Kota</Text>
            <TextInput
              disabled
              value={regency}
              placeholder="Kabupaten/Kota"
              style={{ backgroundColor: "white" }}
            />
            <Text>Kecamatan</Text>
            <TextInput
              disabled
              value={district}
              placeholder="Kecamatan"
              style={{ backgroundColor: "white" }}
            />
            <Text>Kelurahan/Desa</Text>
            <TextInput
              value={village}
              disabled
              placeholder="Kelurahan/Desa"
              style={{ backgroundColor: "white" }}
            />
          </View>
          <Button
            mode="contained-tonal"
            onPress={() => navigation.navigate("Upload")}
          >
            Register
          </Button>
        </View>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 30,
  },
  form: {
    // padding: 10,
    marginBottom: 30,
  },
  textArea: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 5,
  },
});
