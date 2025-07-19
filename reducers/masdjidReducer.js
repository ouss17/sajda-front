import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: null,
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    date_created: null,
    numero: "",
    facebook: "",
    x: "",
    instagram: "",
    isAvailable: null,
    iqama_fajr: null,
    iqama_dhor: null,
    iqama_asr: null,
    iqama_maghrib: null,
    iqama_isha: null,
    nb_jumuas: null,
    jumuas: "",
    color: null,
  },
};

export const masdjidSlice = createSlice({
  name: "masdjidReducer",
  initialState,
  reducers: {
    addMasdjid: (state, action) => {
      state.value = {
        id: action.payload.id,
        name: action.payload.name,
        address: action.payload.address,
        city: action.payload.city,
        zip: action.payload.zip,
        country: action.payload.country,
        date_created: action.payload.date_created,
        numero: action.payload.numero,
        facebook: action.payload.facebook,
        x: action.payload.x,
        instagram: action.payload.instagram,
        isAvailable: action.payload.isAvailable,
        iqama_fajr: action.payload.iqama_fajr,
        iqama_dhor: action.payload.iqama_dhor,
        iqama_asr: action.payload.iqama_asr,
        iqama_maghrib: action.payload.iqama_maghrib,
        iqama_isha: action.payload.iqama_isha,
        nb_jumuas: action.payload.nb_jumuas,
        jumuas: action.payload.jumuas,
        color: action.payload.color,
      };
    },
    removeMasdjid: (state) => {
      state.value = {
        id: null,
        name: "",
        address: "",
        city: "",
        zip: "",
        country: "",
        date_created: null,
        numero: "",
        facebook: "",
        x: "",
        instagram: "",
        isAvailable: null,
        iqama_fajr: null,
        iqama_dhor: null,
        iqama_asr: null,
        iqama_maghrib: null,
        iqama_isha: null,
        nb_jumuas: null,
        jumuas: "",
        color: null,
      };
    },
  },
});
export const { addMasdjid, removeMasdjid } = masdjidSlice.actions;
export default masdjidSlice.reducer;
