<template>
  <v-container>
   <template>
      <v-header
         color="green"
         padless
         >
         <v-row
            justify="center"
            no-gutters
            >
            <v-col
               class=" green py-4 text-center white--text"
               cols="12"
               >
               <strong >
                  <v-btn
                     icon
                     @click="regresar"
                     >
                     <v-icon
                        x-large
                        color="white"
                        >
                        mdi-fruit-grapes
                     </v-icon>
                  </v-btn>
                  <v-btn
                     icon
                     @click="regresarLogin"
                     >
                     <v-icon
                        large
                        color="white"
                        >
                        mdi-logout
                     </v-icon>
                  </v-btn>
               </strong>
            </v-col>
         </v-row>
      </v-header>
      <v-container>
      <!-- ACA VA EL CARROUSEL -->

      </v-container>
      <v-container/>
      <v-card
         class="mx-auto"
         max-width="500"
         >
         <v-system-bar
            color="rgb(128, 125, 125)"
            dark
            >
            <v-spacer></v-spacer>
         </v-system-bar>
         <v-toolbar
            color="grey"
            dark
            >
            <v-toolbar-title>Frutas</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
               <v-icon
                  x-large
                  color="rgb(71, 134, 65)"
                  >
                  mdi-fruit-grapes
               </v-icon>
            </v-btn>
         </v-toolbar>
         <v-container fluid class="c">
            <v-row dense class="row_">
              <v-col col=4 class="col_">
                 <router-link to="/analizar_manzana" style="color:black;text-align: left;">Manzana</router-link>
                
                <div class="mt-2">
                  <v-dialog v-model="dialog1" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="red lighten-2"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Analizar
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline grey lighten-2">
                        Analiza...
                      </v-card-title>

                      <v-card-text>
                        <v-row>
                          <v-col col=12 class="pt-3">
                           <v-file-input 
                            style="width:100%"
                            label="File input"
                            outlined dense  prepend-icon="mdi-camera"
                           v-model="image" accept="image/*" type="file"/>
                          </v-col>
                        </v-row>
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="upload(1)"
                        >
                          Iniciar Analisis
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-col>
              <v-col col=4 class="col_">
                 <router-link to="/analizar_palta" style="color:black;text-align: left;">Palta</router-link>
                
                <div class="mt-2">
                  <v-dialog v-model="dialog2" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="red lighten-2"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Analizar
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline grey lighten-2">
                        Analiza...
                      </v-card-title>

                      <v-card-text>
                        <v-row>
                          <v-col col=12 class="pt-3">
                            <v-file-input 
                            style="width:100%"
                            label="File input"
                            outlined dense prepend-icon="mdi-camera"
                           v-model="image" accept="image/*" type="file"/>
                          </v-col>
                        </v-row>
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="upload(2)"
                        >
                          Iniciar Analisis
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-col>
              <v-col col=4 class="col_">
                <router-link to="/analizar_naranja" style="color:black;text-align: left;">Naranja</router-link>
                <div class="mt-2">
                  <v-dialog v-model="dialog3" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="red lighten-2"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Analizar
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline grey lighten-2">
                        Analiza...
                      </v-card-title>

                      <v-card-text>
                        <v-row>
                          <v-col col=12 class="pt-3">
                           <v-file-input 
                            style="width:100%"
                            label="File input"
                            outlined dense
                             prepend-icon="mdi-camera"
                           v-model="image" accept="image/*" type="file"/>
                          </v-col>
                        </v-row>
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="upload(3)"
                        >
                          Iniciar Analisis
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-col>
            </v-row>
         </v-container>
      </v-card>
      <v-container/>
      <v-footer
         color="green"
         padless
         >
         <v-row
            justify="center"
            no-gutters
            >
            <v-col
               class=" green py-4 text-center white--text"
               cols="12"
               >
               {{ new Date().getFullYear() }} — <strong>panqo</strong>
            </v-col>
         </v-row>
      </v-footer>
   </template>
  </v-container>
</template>

<script>

  export default {
    data: () => ({
      image:'',
      loading: false,
      selection: 1,
      model: 0,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      nombres: [
        'Manzana',
        'Palta',
        'Naranja',
      ],
      colors: [
        'white',
        'white',
        'white',
      ],

    }),

    methods: {
      regresarLogin(){
        this.$store.dispatch('logoutUser')
        this.$router.push('/')
      },
      upload(id){
        const param = {'image':this.image,'id':id}
        this.$store.dispatch('addImage',param)
       
      }
    },
  }
</script>


<style scoped>
  .pt-3{
    padding-top: 35px;
  }
  .c{
    height: 100% !important;
  }
  .row_{
    display:flex;
    justify-content: space-between;
    width: 100%;
  }
  .col{
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
  }
  .estilo {
    font-size:50px;
    color:rgb(241, 195, 41);
        
  }

  .estiloC{
      font-size: 12px;
      color: grey;
  }

  .estiloI{
      font-size: 50px;
      color: black;
  }

  .estiloR {
    font-size: 17px;
    color: rgb(71, 134, 65);
  }
  .estiloT{
    font-size: 25px;
    color:white;
  }   

  .estiloN{
    font-size: 40px;
    color:white;
  } 

  .estiloA{
    font-size: 14px;
    color:white;
  }  


</style>