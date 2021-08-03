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
      

      <v-toolbar-title>Analisis</v-toolbar-title>

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
        
    <v-card
            class="mx-auto"
            max-width="344"
            color="rgb(71, 134, 65)"
          >
            <v-card-text>
              <div class="estiloA">Nombre</div>
              <v-container/>
              <p class="estiloN">
                Nombre 1
              </p>
                <v-container/>
              <p class="estiloA">Tipos</p>
              <v-container/>
              <div class="text--primary">
                <v-row justify="center">
                <v-text class="estiloN"> Tipo 1</v-text>
                </v-row>
                
              </div>
                <v-container/>
                <v-container/>
                <p class="estiloA">Advertencias</p>
              <div class="text--primary">
                  <v-container/>
                <v-row justify="center">
                <v-text class="estiloN"> Plaga</v-text>
                </v-row>
                <v-container/>
              </div>
            </v-card-text>
            <v-container/>
            <v-card-actions>
              <v-btn
                @click="regresar"
                color="rgb(241, 195, 41)"
              >
              <div>
                Regresar
              </div>
              </v-btn>
            </v-card-actions>
          </v-card>
        
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

      regresar(){
        this.$router.push('/inicio')
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