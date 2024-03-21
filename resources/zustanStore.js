import { create } from "zustand";

export const useUserStore = create((set) => ({
  firstName: null,
  lastName: null,
  biodata: null,
  birthdate: null,
  setFirstName: (data) => set({ firstName: data }),
  setLastName: (data) => set({ lastName: data }),
  setBiodata: (data) => set({ biodata: data }),
  setBirthdate: (data) => set({ birthdate: data }),
}));

export const useImageStore = create((set) => ({
  profilPicture: null,
  setProfilePicture: (data) => set({ profilePicture: data }),
}));

export const usePronvinsiStore = create((set) => ({
  provinceId: null,
  provinceName: null,
  setProvinceId: (data) => set({ provinceId: data }),
  getProvinceName: (provinceId) =>
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
      .then((response) => response.json())
      .then((provinces) => {
        let province = provinces?.filter((item) => item.id == provinceId);
        set({ provinceName: province[0]?.name });
      }),
}));

export const useKotaStore = create((set) => ({
  regencyId: null,
  regencyName: null,
  setRegencyId: (data) => set({ regencyId: data }),
  getRegencyName: (provinceId, regencyId) =>
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
    )
      .then((response) => response.json())
      .then((regencies) => {
        let regency = regencies?.filter((item) => item.id == regencyId);
        set({ regencyName: regency[0]?.name });
      }),
}));

export const useKecamatanStore = create((set) => ({
  districtId: null,
  districtName: null,
  setDistrictId: (data) => set({ districtId: data }),
  getDistrictName: (regencyId, districtId) =>
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`
    )
      .then((response) => response.json())
      .then((districts) => {
        let district = districts?.filter((item) => item.id == districtId);
        set({ districtName: district[0]?.name });
      }),
}));

export const useKelurahanStore = create((set) => ({
  villageId: null,
  villageName: null,
  setVillageId: (data) => set({ villageId: data }),
  getVillageName: (districtId, villageId) =>
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
    )
      .then((response) => response.json())
      .then((villages) => {
        let village = villages?.filter((item) => item.id == villageId);
        set({ villageName: village[0]?.name });
      }),
}));
