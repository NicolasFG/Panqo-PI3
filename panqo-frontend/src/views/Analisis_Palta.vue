<template>
  <div class="page">
    <div class="fondo_palta">
      <div class="informacion">
        <v-row>
          <v-col col=6>
            <div class="title">
              Nombre
            </div>
            <div class="infoo">
              Palta Fuerte
            </div>
          </v-col>
          <v-col col=6>
            <div class="title">
              Tipo
            </div>
            <div class="infoo">
              Palta Hass
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col col=12>
            <div class="title">
              Último análisis
            </div>
             <div class="infoo">
              28/07/2021
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col col=12>
            <div class="title">
              Estado
            </div>
            <div class="infoo">
              Apto
            </div>
          </v-col>
        </v-row>
      </div>
      <img src="@/assets/pngwing 1.png" class="img">
    </div>
    <div class="ultimos_datos">
      <div class="title2">
        Últimos datos
      </div>
      <div class="infoo">
        31/07/2021 - Palta nabal o nava - Apto<br>
        26/07/2021 - Palta fuerte - No Apto<br>
        24/07/2021 - Palta ester - Apto<br>
        21/07/2021 - Palta bacon - No Apto<br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.page{
  width: 100%;
  height: 812px;
  display:flex;
  flex-direction: column;
  align-items: center;
}
.fondo_palta{
  background-color: #64814A;
  height: 300px;
  width: 100%;
  display:flex;
  flex-direction: column;
  align-items: center;
}
.informacion{
  height: 100%;
  width: 90%;
  color:white;
}
.title{
  font-size: 15px !important;
  font-weight: 300;
}
.infoo{
  font-size: 18px !important;
  font-weight: 500;
}
.ultimos_datos{
  height: 512px;
  background-color: white;
  width: 100%;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
}
.title2{
  font-size: 22px !important;
  font-weight: 500;
}
.img{
  position: relative;
  left: 120px;
  top: 70px;
  width: 130px;
  height: 130px;
}
</style>