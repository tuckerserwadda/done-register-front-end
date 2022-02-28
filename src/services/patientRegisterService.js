import axios from "axios";
const apiClient = axios.create({
    baseURL:"done-patient-register-1.herokuapp.com",
    withCredentials: false,
    headers:{
        Accept:"application/json",
        'Content-Type':'application/json',
    }
})

export default{
registerPatient(patientRegister){
    return apiClient.post("/patients/register", patientRegister)
},
getPatients(){
    return apiClient.get("/patients")
}
}