import { TextInput, Modal, Portal, Button } from "react-native-paper";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import DatePicker from "react-native-modern-datepicker";
import { AntDesign } from "@expo/vector-icons";
import {
  useKecamatanStore,
  useKelurahanStore,
  useKotaStore,
  usePronvinsiStore,
  useUserStore,
} from "../resources/zustanStore";

export default function RegistrationScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const setFirstName = useUserStore((state) => state.setFirstName);
  const setLastName = useUserStore((state) => state.setLastName);
  const setBiodata = useUserStore((state) => state.setBiodata);
  const setBirthdate = useUserStore((state) => state.setBirthdate);
  const setProvinceId = usePronvinsiStore((state) => state.setProvinceId);
  const setRegencyId = useKotaStore((state) => state.setRegencyId);
  const setDistrictId = useKecamatanStore((state) => state.setDistrictId);
  const setVillageId = useKelurahanStore((state) => state.setVillageId);
  const firstName = useUserStore((state) => state.firstName);
  const lastName = useUserStore((state) => state.lastName);
  const biodata = useUserStore((state) => state.biodata);
  const birthdate = useUserStore((state) => state.birthdate);
  const selectedProvinceId = usePronvinsiStore((state) => state.provinceId);
  const selectedRegencyId = useKotaStore((state) => state.regencyId);
  const selectedDistrictId = useKecamatanStore((state) => state.districtId);
  const province = usePronvinsiStore((state) => state.provinceName);
  const regency = useKotaStore((state) => state.regencyName);
  const district = useKecamatanStore((state) => state.districtName);
  const village = useKelurahanStore((state) => state.villageName);

  console.log(province, regency, district, village);

  const getProvince = () =>
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
      .then((response) => response.json())
      .then((provinces) => {
        let newArray = provinces?.map((item) => {
          return { key: item.id, value: item.name };
        });
        setProvinces(newArray);
      });

  const fetchRegencies = async (selectedProvinceId) => {
    try {
      const response = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinceId}.json`
      );
      const regencies = await response.json();
      let newArray = regencies?.map((item) => {
        return { key: item.id, value: item.name };
      });
      setRegencies(newArray);
    } catch (error) {
      console.log(error, "fetchRegencies");
    }
  };

  const fetchDistricts = async (selectedRegencyId) => {
    try {
      console.log(selectedRegencyId, "<<<<<<< di fetchDistricts");
      const response = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegencyId}.json`
      );
      const disctricts = await response.json();
      let newArray = disctricts?.map((item) => {
        return { key: item.id, value: item.name };
      });
      setDistricts(newArray);
    } catch (error) {
      console.log(error, "<<<< error di fetchDistricts");
    }
  };

  const fetchVilages = async (selectedDistrictId) => {
    try {
      const response = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrictId}.json`
      );
      const villages = await response.json();
      let newArray = villages?.map((item) => {
        return { key: item.id, value: item.name };
      });
      setVillages(newArray);
    } catch (error) {
      console.log(error, "<<<<< error di fetchVillages");
    }
  };

  useEffect(() => {
    getProvince();
    fetchRegencies(selectedProvinceId);
    fetchDistricts(selectedRegencyId);
    fetchVilages(selectedDistrictId);
  }, [selectedProvinceId, selectedRegencyId, selectedDistrictId]);

  const handleModal = () => setVisible(!visible);

  return (
    <ScrollView
      style={style.container}
      // contentContainerStyle={{ flex: 1, padding: 20, justifyContent: "center" }}
    >
      <View>
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
            Create Account
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "normal",
            }}
          >
            Fill your detail
          </Text>
        </View>
        <View style={style.form}>
          <TextInput
            mode="outlined"
            label="First Name"
            onChangeText={setFirstName}
            value={firstName}
            placeholder="Type your first name"
            right={<TextInput.Affix text="/100" />}
            style={{ backgroundColor: "white" }}
          />
          <TextInput
            mode="outlined"
            label="Last Name"
            onChangeText={setLastName}
            value={lastName}
            placeholder="Type your last name"
            right={<TextInput.Affix text="/100" />}
            style={{ backgroundColor: "white" }}
          />
          <TextInput
            multiline
            label="Biodata"
            onChangeText={setBiodata}
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
                onDismiss={handleModal}
                contentContainerStyle={{
                  padding: 10,
                }}
              >
                <DatePicker onSelectedChange={(value) => setBirthdate(value)} />
                <Text>Click anywhere to dismiss</Text>
              </Modal>
            </Portal>
            <Button style={{ justifyContent: "center" }} onPress={handleModal}>
              <AntDesign name="calendar" size={24} color="black" />
            </Button>
          </View>

          <Text>Provinsi:</Text>
          <SelectList
            setSelected={setProvinceId}
            data={provinces}
            placeholder="Provinsi"
            boxStyles={{ backgroundColor: "white" }}
            dropdownStyles={{ backgroundColor: "white" }}
          />
          <Text>Kabupaten/Kota</Text>
          <SelectList
            setSelected={setRegencyId}
            data={regencies}
            placeholder="Kabupaten/Kota"
            boxStyles={{ backgroundColor: "white" }}
            dropdownStyles={{ backgroundColor: "white" }}
          />
          <Text>Kecamatan</Text>
          <SelectList
            setSelected={setDistrictId}
            data={districts}
            placeholder="Kecamatan"
            boxStyles={{ backgroundColor: "white" }}
            dropdownStyles={{ backgroundColor: "white" }}
          />
          <Text>Kelurahan/Desa</Text>
          <SelectList
            setSelected={setVillageId}
            data={villages}
            placeholder="Kelurahan/Desa"
            boxStyles={{ backgroundColor: "white" }}
            dropdownStyles={{ backgroundColor: "white" }}
          />
        </View>
        <Button
          mode="contained-tonal"
          onPress={() => navigation.navigate("Upload")}
        >
          Continue
        </Button>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
