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
                 <v-text class="estilo">Log in</v-text>
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
                        <router-link class="estiloC" to="/recuperarContra" > <v-text class="estiloC"> ¿Olvidaste tu constraseña? </v-text> </router-link>
                    </v-row>
                    <v-container/>
                    <v-container/>
                

                 
                </v-card-text>
                <v-row justify="center">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn x-large @click="loginUser" color="rgb(71, 134, 65)"> <v-text class="estiloI"> Ingresa </v-text> </v-btn>
                  </v-card-actions>

                </v-row>

                <v-row justify="center">	
                  <router-link class="estiloR" to="/registrar" > <v-text class="estiloR"> ¿No tienes una cuenta? ¡Registrate aquí! </v-text> </router-link>
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
  name: 'Login',
  props: {
      source: String,
    },
  data() {
    return {
      showPassword : false,
      valid:false,
      loginInfo:{
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
      ]
    }
  }, 
  mounted(){
    this.$store.dispatch("loadAll")
  },
  methods: {
    async loginUser(){
      /* Autenticar */
      this.$router.push('/inicio')
      let password = '';
      let admin = '';
      let validator = await this.$store.dispatch("loadAll");
      console.log(validator.data)
       for(var i = 0; i < validator.data.length; i++){
         if(this.loginInfo.email === validator.data[i].email){
           password = validator.data[i].password;
           if(validator.data[i].admin == true){
                admin = validator.data[i].admin;
                this.loginInfo.admin = admin
           }else{
                this.loginInfo.admin = false;
           }
         }
       }
       if(this.loginInfo.password == password){
          /* Fin Autenticar */
          let user = await this.$store.dispatch('loginUser',this.loginInfo);
          console.log(user);
          if(user.error){
            alert(user.error)
          }else{
            alert('Gracias por iniciar sesión, ' + user.username);
          }
       }else{
         alert('Correo/Contraseña incorrectos, intenta denuevo')
       }
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