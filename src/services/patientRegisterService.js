import axios from "axios";
const apiClient = axios.create({
    baseURL:"http://localhost:3002",
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