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

    <v-container fluid>
      <v-row dense>
        
          <v-carousel v-model="model">
    <v-carousel-item
      v-for="(color,i) in colors"
      :key="color"
    >
    
      <v-sheet
        :color="color"
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            <v-text class="estiloI"> {{ nombres[i] }} </v-text>
          
          <v-container/>

          <v-card
            class="mx-auto"
            max-width="344"
            color="rgb(71, 134, 65)"
          >
            <v-card-text>
              <div class="estiloA">Origen</div>
              <v-container/>
              <p class="estiloN">
                Mexico
              </p>

              <p class="estiloA">Tipos</p>
              <v-container/>
              <div class="text--primary">
                <v-row justify="center">
                <v-text class="estiloN"> Tipo 1</v-text>
                </v-row>
                <v-container/>
                <v-container/>
                <v-row justify="center">
                <v-text class="estiloN"> Tipo 2</v-text>
                </v-row>
              </div>
            </v-card-text>
            <v-container/>
            <v-card-actions>
              <v-btn
                @click="Analizar"
                color="rgb(241, 195, 41)"
              >
              <div>
                Analizar
              </div>
              </v-btn>
            </v-card-actions>
          </v-card>
          
          </div>

        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
        
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
        this.$router.push('/login')
      },
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>


<style scoped>


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