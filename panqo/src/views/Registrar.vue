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
                 <v-text class="estilo">Registrar</v-text>
              </v-row>
            

              <v-spacer></v-spacer>
              <v-container/>
              <v-container/>
          

              <v-form  v-model="valid"> 
                <v-card-text>

                    <v-row justify="center">
                        <v-col justify="center" md="8">
                            <v-text-field 
                            v-model="loginInfo.nombre"
                            label="Nombre"
                             :rules="NombreRules"
                                hide-details="auto"
                            ></v-text-field>
                        </v-col>

                    </v-row>

                     <v-row justify="center">
                        <v-col justify="center" md="8">
                            <v-text-field v-model="loginInfo.apellido" label="Apellido"
                             :rules="ApellidoRules"
                                hide-details="auto"
                            ></v-text-field>
                        </v-col>

                    </v-row>
                  
                    <v-row justify="center">
                      <v-col justify="center" md="8">
                        <v-text-field v-model="loginInfo.email" label="Correo" :rules="emailRules"/>
                      </v-col>
                    </v-row>
                    <v-container/>
                
                    <v-row justify="center">
                      <div class="display-4">
                       
                      </div>
                      <v-col justify="center" md="8">
                        <v-text-field v-model="loginInfo.password" 
                          label="Contraseña" 
                          :type="showPassword ? 'text' : 'password' "
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="passwordRules"
                          @click:append="showPassword=!showPassword"
                        />
                      </v-col>
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
                    <v-btn x-large @click="loginUser" color="rgb(71, 134, 65)"> <v-text class="estiloI"> Registrarse </v-text> </v-btn>
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
  name: 'Registrar',
  props: {
      source: String,
    },
  data() {
    return {
      showPassword : false,
      valid:false,
     
      loginInfo:{
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        admin: false
      },
      emailRules: [
        v => !!v || 'Correo requerido',
        v => /.+@.+\..+/.test(v) || 'Correo tiene que ser valido',
      ],
      passwordRules: [
        v => !!v || 'Contraseña requirido',
        v => (v && v.length <= 20) || 'Contraseña tiene que ser menor que 20 caracteres',
      ],
        NombreRules: [
        value => !!value || 'Nombre requerido',
      ],
      ApellidoRules: [
        value => !!value || 'Apellido requirerido',
      ],
    }
  },
  watch: {
      
  },  
  mounted(){
    this.$store.dispatch("loadAll")
  },
  methods: {
    async loginUser(){
      /* Autenticar */
      //let password = '';
      //let admin = '';
      let validator = await this.$store.dispatch("loadAll");
      console.log(validator.data)
    }
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