<template>
  <v-container>
    <v-form >
      <v-container class="fill-height" fluid justify="center">
        <v-row align="center" justify="center">
          <v-col md="6">

            <v-card >
              <v-container/>
              <v-container/>
              <v-container/>
            <v-row justify="center">

            <v-avatar >
              <v-icon
                x-large
                color="rgb(71, 134, 65)"
              >
                mdi-fruit-grapes
              </v-icon>
            </v-avatar>
            </v-row>

              <v-container/>
                
                <v-row justify="center">
                 <v-text class="estilo">Recuperar </v-text>
                </v-row>
                <v-row justify="center">
                 <v-text class="estilo">Contraseña </v-text>
                </v-row>

              <v-spacer></v-spacer>
              <v-container/>
              <v-container/>
          

              <v-form  v-model="valid"> 
                <v-card-text>
                  
                    <v-row justify="center">
                      <v-col justify="center" md="8">
                        <v-text-field v-model="loginInfo.email" label="Correo" :rules="emailRules"/>
                      </v-col>
                    </v-row>
                    <v-container/>
                
                    <v-row justify="center">
                      <div class="display-4">
                       
                      </div>
                   
                    </v-row>

                     <v-row justify="center">	
                        <router-link class="estiloC" to="/" > <v-text class="estiloC"> ¿Ya tienes una cuenta? ¡Ingresa aquí! </v-text> </router-link>
                    </v-row>
                    <v-container/>
                    <v-container/>
                

                 
                </v-card-text>
                <v-row justify="center">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn x-large @click="loginUser" color="rgb(71, 134, 65)"> <v-text class="estiloI"> Recuperar </v-text> </v-btn>
                  </v-card-actions>

                </v-row>
                <v-container/>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>


<script>
export default {
  name: 'RecuperarContra',
  props: {
      source: String,
    },
  data() {
    return {
      
      valid:false,
     
      loginInfo:{
        email: '',
        admin: false
      },
      emailRules: [
        v => !!v || 'Correo requerido',
        v => /.+@.+\..+/.test(v) || 'Correo tiene que ser valido',
      ],
      
    }
  },
  watch: {
   
  },  
  mounted(){
    this.$store.dispatch("loadAll")
  },
  methods: {
       
  },
}
</script>


<style scoped>


  .estilo {
    font-size:50px;
    color:black;
        
  }

  .estiloC{
      font-size: 12px;
      color: grey;
      
  }

  .estiloI{
      font-size: 17px;
      color: white;
  }
  .estiloR {
    font-size: 17px;
    color: rgb(71, 134, 65);
  }
  .estiloT{
    font-size: 25px;
  }   


</style>