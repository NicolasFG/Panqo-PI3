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
                Manzana
                <div class="mt-2">
                  <v-dialog v-model="dialog" width="500">
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
                          <v-col col=6 class="pt-3">
                            <v-icon x-large color="black">
                              mdi-camera
                            </v-icon>
                          </v-col>
                          <v-col col=6 class="pt-3">
                           <input accept="image/*" type="file">
                          </v-col>
                        </v-row>
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="dialog = false"
                        >
                          Iniciar Analisis
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-col>
              <v-col col=4 class="col_">
                Palta
                <div class="mt-2">
                  <v-dialog v-model="dialog" width="500">
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
                          <v-col col=6 class="pt-3">
                            <v-icon x-large color="black">
                              mdi-camera
                            </v-icon>
                          </v-col>
                          <v-col col=6 class="pt-3">
                             <input accept="image/*" type="file">
                          </v-col>
                        </v-row>
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="dialog = false"
                        >
                          Iniciar Analisis
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-col>
              <v-col col=4 class="col_">
                Naranja
                <div class="mt-2">
                  <v-dialog v-model="dialog" width="500">
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
                          <v-col col=6 class="pt-3">
                            <v-icon x-large color="black">
                              mdi-camera
                            </v-icon>
                          </v-col>
                          <v-col col=6 class="pt-3">
                            <input accept="image/*" type="file">
                          </v-col>
                        </v-row>
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="dialog = false"
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
      loading: false,
      selection: 1,
      model: 0,
      dialog: false,
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

      Analizar(){
        this.$router.push('/analizar')
      },
      regresarLogin(){
        this.$router.push('/')
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