<template>


 <div class="app">
   <Header />

   <div class="app-routes">
   <div>
     <router-link class="app-portal" :to="{name: 'PatientRegister'}">
       <div class="app-portal"><Button class="p-button-primary" label="Patient Portal"/></div>
       </router-link>
   </div>
   <div>
     <router-link class="app-portal" :to="{name: 'ViewPatientRegister'}">
       <div class="app-portal"><Button class="p-button-secondary" label="Admin Portal"/></div>
       </router-link>
   </div>
   </div>
   <div class="router-views">  <router-view /></div>
   <div class="app-footer"><Footer/></div>

 </div>


</template>
<script>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"

export default {
  components:{Header, Footer}

}
</script>

<style scoped>
.app{
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 100%; */
}
.router-views{
  width: 80%;
  display: flex;
  justify-content: center;
}
.app-footer{
  bottom: 0; 
  margin-top: 20px;
}
.app-portal{
  text-decoration: none;
  margin-top: 10px;
  margin-bottom: 20px;
}



</style>
