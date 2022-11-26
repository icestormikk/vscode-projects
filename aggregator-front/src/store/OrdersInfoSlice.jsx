/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const ordersInfoSlice = createSlice({
  name: 'ordersInfo',
  initialState: {
    isVisible: false,
    selectedSubservices: [],
    masters: [],
    subservicesToMasters: {},
    subservicesToDates: {},
    totalForbiddenSubservicesIDs: [],
  },
  reducers: {
    hide(state) {
      state.isVisible = false;
    },
    show(state) {
      state.isVisible = true;
    },
    clearCart(state) {
      state.selectedSubservices = [];
      state.masters = [];
      state.subservicesToMasters = [];
      state.subservicesToDates = {};
      state.totalForbiddenSubservicesIDs = [];
      state.isVisible = false;
    },

    addSubserviceToCart(state, action) {
      if (state.selectedSubservices.length < process.env.REACT_APP_SHOPPING_CART_LIMIT) {
        const { subservice } = action.payload;

        if (state.isVisible !== true) { state.isVisible = true; }

        if (!state.totalForbiddenSubservicesIDs.includes(subservice.id)) {
          state.selectedSubservices.push(subservice);
          state.subservicesToMasters[subservice.id] = [];
          state.subservicesToDates[subservice.id] = {};

          subservice.incompatibleServicesIDs.forEach(
            (id) => {
              if (!state.totalForbiddenSubservicesIDs.includes(id)) {
                state.totalForbiddenSubservicesIDs.push(id);
              }
            },
          );
        }
      }
    },
    removeSubserviceFromCart(state, action) {
      const { subservice } = action.payload;
      const subserviceId = subservice.id;
      const index = state.selectedSubservices.map(
        (elem) => elem.id,
      ).indexOf(subserviceId);

      if (index > -1) {
        state.selectedSubservices.splice(index, 1);
        delete state.subservicesToMasters[subserviceId];
        delete state.subservicesToDates[subserviceId];
      }

      action.payload.subservice.incompatibleServicesIDs.forEach((id) => {
        if (!state.selectedSubservices.map((elem) => elem.id).includes(subservice.id)) {
          state.totalForbiddenSubservicesIDs.pop(id);
        }
      });

      if (state.selectedSubservices.length === 0) { state.isVisible = false; }
    },

    addMasterToSubservice(state, action) {
      const { masterId } = action.payload;
      const { chosenSubserviceId } = action.payload;

      if (Object.keys(state.subservicesToMasters).includes(`${chosenSubserviceId}`)) {
        const masters = state.subservicesToMasters[chosenSubserviceId];

        if (!masters.some((elem) => elem.id === masterId)) {
          masters.push({ id: masterId, isSelected: masters.length === 0 });
        }
      }
    },
    removeMasterFromSubservice(state, action) {
      const { masterId } = action.payload;
      const { chosenSubservice } = action.payload;

      if (Object.keys(state.subservicesToMasters).includes(`${chosenSubservice.id}`)) {
        const masters = state.subservicesToMasters[chosenSubservice.id];
        const deletingMasterIndex = masters.findIndex((elem) => elem.id === masterId);

        if (deletingMasterIndex > -1) {
          state.subservicesToMasters[chosenSubservice.id].splice(deletingMasterIndex, 1);
        }
      }
    },

    addMaster(state, action) {
      const { master } = action.payload;
      if (!state.masters.map((element) => element.id).includes(master.id)) {
        state.masters.push(master);
      }
    },
    replaceMaster(state, action) {
      const { subserviceId } = action.payload;
      const { newSelectedMasterId } = action.payload;

      if (Object.keys(state.subservicesToMasters).includes(`${subserviceId}`)) {
        const masters = state.subservicesToMasters[subserviceId];
        if (masters.some((elem) => elem.id === newSelectedMasterId)) {
          masters.forEach((elem) => {
            elem.isSelected = (elem.id === newSelectedMasterId);
          });
        }
      }
    },

    setSubserviceDate(state, action) {
      const { subserviceId } = action.payload;
      const { timestamp } = action.payload;

      if (Object.keys(state.subservicesToDates).includes(`${subserviceId}`)) {
        state.subservicesToDates[subserviceId] = timestamp;
      }
    },
    clearSubservicesToDatesObject(state) {
      state.subservicesToDates = {};
    },
  },
});

export const {
  show, hide, clearCart,
  addSubserviceToCart, removeSubserviceFromCart,
  addMasterToSubservice, removeMasterFromSubservice,
  addMaster, replaceMaster,
  setSubserviceDate, clearSubservicesToDatesObject,
} = ordersInfoSlice.actions;
export default ordersInfoSlice.reducer;
