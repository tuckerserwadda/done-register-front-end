<template>
    <div class="app-patient-register">
        <div>
        <div v-if="success">
                <Message  severity="success" :closable="false" :life="5000" :sticky="false">{{registered}}</Message>
                </div>
                <div v-if="largeImage">
                <Message  severity="error" :closable="false" :life="5000" :sticky="false"> Select image or Image Too large</Message>
                </div>
        </div>
        <div class="card">
            <div><h4 class="text-center">  Patient Register </h4></div>
            <div>
            <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                <div class="field">
                    <div class="p-float-label">
                            <InputText id="firstName" v-model="v$.firstName.$model" 
                            :class="{'p-invalid':v$.firstName.$invalid && submitted}" />
                            <label for="firstName" :class="{'p-error':v$.firstName.$invalid && submitted}">First Name*</label>
                    </div>
                    <small v-if="(v$.firstName.$invalid && submitted) || v$.firstName.$pending.$response" 
                    class="p-error">{{v$.firstName.required.$message.replace('Value', 'First Name')}}</small>
                </div>

                <div class="field">
                    <div class="p-float-label">
                            <InputText id="lastName" v-model="v$.lastName.$model" 
                            :class="{'p-invalid':v$.lastName.$invalid && submitted}" />
                            <label for="lastName" :class="{'p-error':v$.lastName.$invalid && submitted}">Last Name*</label>
                    </div>
                    <small v-if="(v$.lastName.$invalid && submitted) || v$.lastName.$pending.$response"
                     class="p-error">{{v$.lastName.required.$message.replace('Value', 'Last Name')}}</small>
                </div>
                 <div class="field">
                    <div class="p-float-label">
                            <InputText id="phoneNumber" v-model="v$.phoneNumber.$model" :class="{'p-invalid':v$.phoneNumber.$invalid && submitted}" />
                            <label for="phoneNumber" :class="{'p-error':v$.phoneNumber.$invalid && submitted}">Phone Number*</label>
                    </div>
                    <small v-if="(v$.phoneNumber.$invalid && submitted) || v$.phoneNumber.$pending.$response" 
                    class="p-error">{{v$.phoneNumber.required.$message.replace('Value', 'Phone Number')}}</small>
                </div>
                <div class="field">
                    <div class="p-float-label">
                            <InputText id="address" v-model="v$.address.$model" :class="{'p-invalid':v$.address.$invalid && submitted}" />
                            <label for="address" :class="{'p-error':v$.address.$invalid && submitted}">Address*</label>
                    </div>
                    <small v-if="(v$.address.$invalid && submitted) || v$.address.$pending.$response" 
                    class="p-error">{{v$.address.required.$message.replace('Value', 'Address')}}</small>
                </div>
                <div class="field">
                        <div class="p-float-label p-input-icon-right">
                            <i class="pi pi-envelope" />
                            <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"/>
                            <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email*</label>
                        </div>
                        <span v-if="v$.email.$error && submitted">
                            <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                            <small class="p-error">{{error.$message}}</small>
                            </span>
                        </span>
                        <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'Email')}}</small>
                    </div>
                    <div class="field col-12 md:col-4">
                        <div class="p-float-label">
                         <Calendar id="date" v-model="dateOfBirth" :showIcon="true" dateFormat="mm/dd/yy"/>
                         <label for="date" >Date of Birth</label>
                        </div>
                    </div> 
                    <div class="field col-12 md:col-4">
                        <div class="p-float-label">
                            <Calendar id="time" v-model="timeOfAppointment" :timeOnly="true" hourFormat="12" 
                            :showIcon="true" 
                            />
                            <label for="timeOfAppointment" >Appointment Time</label>
                         </div>
                    </div>
                    <div class="field">
                    <label for="driverLicense"  >Driver License*</label>
                    <InputText type='file' name="Driver License"  @change="onSelectedFile"
                    
                    />
                    </div>
                  
                    <div> 
                    <Button type="submit" label="Submit" class="mt-2" />
                    </div>
            </form>
            </div>
        </div>
    </div>
</template>

<script>
import Calendar from 'primevue/calendar';; 
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
    export default {
        name:'PatientRegister',
        props:['url'],
        components:{Calendar},
        setup: () => ({ v$: useVuelidate() }),
        data() {
            return {
                patientRegister:{},
                firstName:'',
                lastName:'',
                phoneNumber:'',
                address:'',
                email:'',
                dateOfBirth:'',
                timeOfAppointment:'',
                driverLicense:null,
                submitted: false,
                success: false,
                largeImage:false,
                registered:'Patient has been successfull registered'
            }
        },
        // form validation 
        validations(){
            return{
                firstName:{
                    required
                },
                lastName:{
                    required
                },
                address:{
                    required

                },
                phoneNumber:{
                    required
                },
                email:{
                    required,
                    email
                },
            }
        },
        methods: {
            // upload driver license method 
    onSelectedFile(event){
      const reader = new FileReader();
      reader.addEventListener('load', ()=>{
          if(event.target.files[0].size > 10000){
              this.largeImage = true
          }else{
              this.largeImage = false
               this.driverLicense = reader.result
          }
       
      })
   reader.readAsDataURL(event.target.files[0])
    },
            handleSubmit(isFormValid) {
            this.submitted = true;
            if (!isFormValid) {
                return;
            }
            // assign values to the patientRegister Object 
            if(this.driverLicense){
                this.patientRegister = {
                firstName: this.firstName,
                lastName:this.lastName,
                phoneNumber:this.phoneNumber,
                address:this.address,
                email:this.email,
                dateOfBirth:this.dateOfBirth,
                timeOfAppointment:this.timeOfAppointment,
                driverLicense:this.driverLicense
            }  
            }else{
                this.largeImage = true
                setTimeout(()=>{
                this.largeImage = false
             }, 5000)  
                return
            }
            
            //make a post api call 
            if(this.patientRegister){
            this.$store.dispatch('registerPatient', this.patientRegister)
            .then(()=>{
            // reset form after submit 
            this.success = true
            this.resetForm()
            setTimeout(()=>{
                this.success = false
                 location .reload()
             }, 5000)  
             this.submitted = false

            })
            .catch((error)=>{
                console.log(error)
            })

            }
           

        },
        // reset form method
        resetForm(){
            this.firstName =''
            this.lastName =''
            this.phoneNumber = ''
            this.address = ''
            this.email = ''
            this.dateOfBirth = ''
            this.timeOfAppointment = ''
            this.driverLicense = ''
           
        }
        },
        
    }
</script>

<style scoped >
        .field {
            margin-bottom: 1.5rem;
        }
    @media screen and (max-width: 960px) {
        .card {
            width: 80%;
        }
}
.app-patient-register{
   border: 2px solid rgb(14, 14, 110);
  border-radius: 20px;

  display: flex;
  justify-content:space-around;
  flex-direction: column;
  padding: 10px;
 
}
.card{
    text-align-last: center;
}
</style>