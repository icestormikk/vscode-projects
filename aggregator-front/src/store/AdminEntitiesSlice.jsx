/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const adminEntitiesSlice = createSlice({
  name: 'adminOrdersSlice',
  initialState: {
    services: [],
    subservices: [],
    masters: [],
  },
  reducers: {
    addService(state, action) {
      const { newService } = action.payload;
      state.services.push(newService);
    },
    setServices(state, action) {
      state.services = action.payload.services;
    },
    removeService(state, action) {
      const { selectedService } = action.payload;

      if (state.services.some((el) => el.id === selectedService.id)) {
        const index = state.services.findIndex((el) => el.id === selectedService.id);
        state.services.splice(index, 1);
      }
    },
    updateService(state, action) {
      const { updatingService } = action.payload;

      if (state.services.some((el) => el.id === updatingService.id)) {
        const index = state.services.findIndex((el) => el.id === updatingService.id);
        state.services[index] = updatingService;
      }
    },

    addSubservice(state, action) {
      const { subservice } = action.payload;
      state.subservices.push(subservice);
    },
    setSubservices(state, action) {
      state.subservices = action.payload.subservices;
    },
    removeSubservice(state, action) {
      const { selectedSubservice } = action.payload;

      if (state.subservices.some((el) => el.id === selectedSubservice.id)) {
        const index = state.subservices.findIndex((el) => el.id === selectedSubservice.id);
        state.subservices.splice(index, 1);
      }
    },
    updateSubservice(state, action) {
      const { updatingSubservice } = action.payload;

      if (state.subservices.some((el) => el.id === updatingSubservice.id)) {
        const index = state.subservices.findIndex((el) => el.id === updatingSubservice.id);
        state.subservices[index] = updatingSubservice;
      }
    },

    addMaster(state, action) {
      const { master } = action.payload;
      state.masters.push(master);
    },
    setMasters(state, action) {
      state.masters = action.payload.masters;
    },
    removeMaster(state, action) {
      const { removingMaster } = action.payload;

      if (state.masters.some((el) => el.id === removingMaster.id)) {
        const index = state.masters.findIndex((el) => el.id === removingMaster.id);
        state.masters.splice(index, 1);
      }
    },
    updateMaster(state, action) {
      const { updatingMaster } = action.payload;

      if (state.masters.some((el) => el.id === updatingMaster.id)) {
        const index = state.masters.findIndex((el) => el.id === updatingMaster.id);
        state.masters[index] = updatingMaster;
      }
    },
  },
});

export const {
  addService, setServices, removeService, updateService,
  addSubservice, setSubservices, removeSubservice, updateSubservice,
  addMaster, setMasters, removeMaster, updateMaster,
} = adminEntitiesSlice.actions;
export default adminEntitiesSlice.reducer;
