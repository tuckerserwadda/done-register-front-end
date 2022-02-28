import { createStore } from "vuex";
import patientRegisterService from "../services/patientRegisterService";

export default createStore({
  state: {
    patientRegister:[]
  },
  mutations: {
    SET_PATIENT_REGISTER(state, patientRegister){
      state.patientRegister.push(patientRegister)
    },
    GET_PATIENTS(state,patientRegister){
      state.patientRegister = patientRegister
    }
  },
  actions: {
    // register new Patient 
    async registerPatient({commit},patientRegister){
      try {
       await patientRegisterService.registerPatient(patientRegister);
        commit('SET_PATIENT_REGISTER', patientRegister);
        
      } catch (error) {
        console.log(error)
        throw (error);
      }
    },
    // get registered patients
    async getPatients({commit}){
      try {
       const Response = await patientRegisterService.getPatients();
        commit('GET_PATIENTS', Response.data);
        
      } catch (error) {
        console.log(error)
        throw (error);
      }
    },
  },
  modules: {},
});
