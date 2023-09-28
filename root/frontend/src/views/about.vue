<template>
  <div class="container text-center container-posts">
    <div class="">
      <div class="container">
        <h1 class="display-4 p-4">Organización de la Estaca Resistencia Sur y la Rama Puerto Tirol</h1>
        <hr>
        <p>"Así que, a nadie se exime de la justicia y las leyes de Dios, para que todas las cosas se hagan con orden y solemnidad ante él, de acuerdo con la verdad y la rectitud." - DyC 107:34</p>
      </div>
    </div>

    <!-- Organigrama -->
    <div class="organigrama">
      <div class="estaca">
        <h1>Estaca</h1>
        <ul>
          <li>Presidencia de Estaca</li>
          <li @click="togglePresidenciaEstaca">
            <button>{{ mostrarPresidenciaEstaca ? 'Ocultar' : 'Mostrar' }}</button>
          </li>
            <ul v-if="mostrarPresidenciaEstaca">
            <li v-for="(miembro, index) in presidenciaEstaca" :key="index">
              <router-link
                :to="{ name: 'LiderDetails', params: { 
                  nombreLider: miembro.nombre,
                  cargo: miembro.cargo,
                  foto: miembro.foto
                }}"
              >
                {{ miembro.cargo }}
              </router-link>
              <!-- Add more details as needed -->
            </li>
          </ul>

          <hr>
          <li>Patriarca</li>
          <hr>
          <li>Sumo Consejo</li>
          <li @click="toggleSumoConsejo">
            <button>{{ mostrarSumoConsejo ? 'Ocultar' : 'Mostrar' }}</button>
          </li>
          <ul v-if="mostrarSumoConsejo">
            <li v-for="(miembro, index) in sumoConsejo" :key="index">
              <router-link :to="{ name: 'LiderDetails', params: { nombreLider: miembro } }">{{ miembro }}</router-link>
            </li>
          </ul>
          <hr>
          <li>Presidente del Cuorum de Elderes</li>
          <li @click=togglePresidenciaElderEstaca>
              <button>{{ mostrarPresidenciaElderEstaca ? 'Ocultar' : 'Mostrar' }}</button>
          </li>
          <ul v-if="mostrarPresidenciaElderEstaca">
              <li v-for="(miembro, index) in presidenciaElderEstaca" :key="index">
                  <router-link :to="{name: 'LiderDetails', params: {nombreLider:miembro}}">{{ miembro }}</router-link>
              </li>
          </ul>
          <hr>
          <li>Presidencia de la sociedad de socorro</li>
          <li @click=togglePresidenciaSocEstaca>
              <button>{{ mostrarPresidenciaSocEstaca ? 'Ocultar' : 'Mostrar' }}</button>
          </li>
          <ul v-if="mostrarPresidenciaSocEstaca">
              <li v-for="(miembro, index) in presidenciaSocEstaca" :key="index">
                  <router-link :to="{name: 'LiderDetails', params: {nombreLider:miembro}}">{{ miembro }}</router-link>
              </li>
          </ul>
          <hr>
          <li>Presidencia de los hombres jovenes</li>
          <li @click=togglePresidenciaHJEstaca>
              <button>{{ mostrarPresidenciaHJEstaca ? 'Ocultar' : 'Mostrar' }}</button>
          </li>
          <ul v-if="mostrarPresidenciaHJEstaca">
              <li v-for="(miembro, index) in presidenciaHJEstaca" :key="index">
                  <router-link :to="{name: 'LiderDetails', params: {nombreLider:miembro}}">{{ miembro }}</router-link>
              </li>
          </ul>
          <hr>
          <li>Presidencia de las mujeres jovenes</li>
          <li @click=togglePresidenciaMJEstaca>
              <button>{{ mostrarPresidenciaMJEstaca ? 'Ocultar' : 'Mostrar' }}</button>
          </li>
          <ul v-if="mostrarPresidenciaMJEstaca">
              <li v-for="(miembro, index) in presidenciaMJEstaca" :key="index">
                  <router-link :to="{name: 'LiderDetails', params: {nombreLider:miembro}}">{{ miembro }}</router-link>
              </li>
          </ul>
          <hr>
          <li>Presidencia de la primaria</li>
          <li @click=togglePresidenciaPrimariaEstaca>
              <button>{{ mostrarPresidenciaPrimariaEstaca ? 'Ocultar' : 'Mostrar' }}</button>
          </li>
          <ul v-if="mostrarPresidenciaPrimariaEstaca">
              <li v-for="(miembro, index) in presidenciaPrimariaEstaca" :key="index">
                  <router-link :to="{name: 'LiderDetails', params: {nombreLider:miembro}}">{{ miembro }}</router-link>
              </li>
          </ul>
          
        </ul>
      </div>

      <div class="rama">
        <h1>Rama</h1>
        <ul>
          <li>Presidencia de rama</li>
          <li @click=togglePresidenciaRama>
              <button>{{ mostrarPresidenciaRama ? 'Ocultar' : 'Mostrar' }}</button>
          </li>
          <ul v-if="mostrarPresidenciaRama">
              <li v-for="(miembro, index) in presidenciaRama" :key="index">
                  <router-link :to="{name: 'LiderDetails', params: {nombreLider:miembro}}">{{ miembro }}</router-link>
              </li>
          </ul>
          <hr>
          <li>Presidencia del cuorum de Élderes</li>
          <li @click=togglePresidenciaElderRama>
              <button>{{ mostrarPresidenciaElderRama ? 'Ocultar' : 'Mostrar' }}</button>
          </li>
          <ul v-if="mostrarPresidenciaElderRama">
              <li v-for="(miembro, index) in presidenciaElderRama" :key="index">
                  <router-link :to="{name: 'LiderDetails', params: {nombreLider:miembro}}">{{ miembro }}</router-link>
              </li>
          </ul>
          <hr>
          <li>Presidencia de la Sociedad de Socorro</li>
          <li @click=togglePresidenciaSocRama>
              <button>{{ mostrarPresidenciaSocRama ? 'Ocultar' : 'Mostrar' }}</button>
          </li>
          <ul v-if="mostrarPresidenciaSocRama">
              <li v-for="(miembro, index) in presidenciaSocRama" :key="index">
                  <router-link :to="{name: 'LiderDetails', params: {nombreLider:miembro}}">{{ miembro }}</router-link>
              </li>
          </ul>
          <hr>
          <li>Presidencia de los hombres Jovenes</li>
          <li @click=togglePresidenciaHJRama>
              <button>{{ mostrarPresidenciaHJRama ? 'Ocultar' : 'Mostrar' }}</button>
          </li>
          <ul v-if="mostrarPresidenciaHJRama">
              <li v-for="(miembro, index) in presidenciaHJRama" :key="index">
                  <router-link :to="{name: 'LiderDetails', params: {nombreLider:miembro}}">{{ miembro }}</router-link>
              </li>
          </ul>
          <hr>
          <li>Presidencia de las mujeres jovenes</li>
          <li @click=togglePresidenciaMJRama>
              <button>{{ mostrarPresidenciaMJRama ? 'Ocultar' : 'Mostrar' }}</button>
          </li>
          <ul v-if="mostrarPresidenciaMJRama">
              <li v-for="(miembro, index) in presidenciaMJRama" :key="index">
                  <router-link :to="{name: 'LiderDetails', params: {nombreLider:miembro}}">{{ miembro }}</router-link>
              </li>
          </ul>
          <hr>
          <li>Presidencia de la primaria</li>
          <li @click=togglePresidenciaPrimariaRama>
              <button>{{ mostrarPresidenciaPrimariaRama ? 'Ocultar' : 'Mostrar' }}</button>
          </li>
          <ul v-if="mostrarPresidenciaPrimariaRama">
              <li v-for="(miembro, index) in presidenciaPrimariaRama" :key="index">
                  <router-link :to="{name: 'LiderDetails', params: {nombreLider:miembro}}">{{ miembro }}</router-link>
              </li>
          </ul>
          
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      presidenciaEstaca : [
      { nombre: "Presidente Estaca", cargo: "Presidente", foto: "Detalles del Presidente" },
        { nombre: "1er Consejero Estaca", cargo: "1er Consejero", foto: "Detalles del 1er Consejero" },
        { nombre: "2do Consejero Estaca", cargo: "2do Consejero", foto: "Detalles del 2do Consejero" },
        
      ],
      presidenciaElderEstaca : [
      "Presidente",
        "1er Consejero",
        "2do Consejero"
      ],
      presidenciaSocEstaca : [
      "Presidente",
        "1er Consejero",
        "2do Consejero"
      ],
      presidenciaHJEstaca : [
      "Presidente",
        "1er Consejero",
        "2do Consejero"
      ],
      presidenciaMJEstaca: [
      "Presidente",
        "1er Consejero",
        "2do Consejero"
      ],
      presidenciaPrimariaEstaca : [
      "Presidente",
        "1er Consejero",
        "2do Consejero"
      ],
      // -> Inicia Rama
      presidenciaRama : [
      "Presidente",
        "1er Consejero",
        "2do Consejero"
      ],
        presidenciaElderRama : [
        "Presidente",
        "1er Consejero",
        "2do Consejero"
        ],
        presidenciaSocRama : [
        "Presidente",
        "1er Consejero",
        "2do Consejero"
        ],
        presidenciaHJRama : [
        "Presidente",
        "1er Consejero",
        "2do Consejero"
        ],
        presidenciaMJRama: [
        "Presidente",
        "1er Consejero",
        "2do Consejero"
        ],
        presidenciaPrimariaRama: [
        "Presidente",
        "1er Consejero",
        "2do Consejero"
        ],
      sumoConsejo: [
        "Miembro 1",
        "Miembro 2",
        "Miembro 3",
        "Miembro 4",
        "Miembro 5",
        "Miembro 6",
        "Miembro 7",
        "Miembro 8",
        "Miembro 9",
        "Miembro 10",
        "Miembro 11",
        "Miembro 12",
      ],
      mostrarSumoConsejo: false,
      mostrarPresidenciaEstaca: false,
      mostrarPresidenciaElderEstaca: false,
      mostrarPresidenciaSocEstaca:false,
      mostrarPresidenciaHJEstaca:false,
      mostrarPresidenciaMJEstaca:false,
      mostrarPresidenciaPrimariaEstaca:false,
      // -> Inicia Rama
      mostrarPresidenciaRama: false,
      mostrarPresidenciaElderRama: false,
      mostrarPresidenciaSocRama:false,
      mostrarPresidenciaHJRama:false,
      mostrarPresidenciaMJRama:false,
      mostrarPresidenciaPrimariaRama:false
    };
  },
  methods: {
    toggleSumoConsejo() {
      this.mostrarSumoConsejo = !this.mostrarSumoConsejo;
    },
    togglePresidenciaEstaca(){
      this.mostrarPresidenciaEstaca = !this.mostrarPresidenciaEstaca;
    },
    togglePresidenciaElderEstaca(){
      this.mostrarPresidenciaElderEstaca = !this.mostrarPresidenciaElderEstaca;
    },
    togglePresidenciaSocEstaca(){
      this.mostrarPresidenciaSocEstaca = !this.mostrarPresidenciaSocEstaca;
    },
    togglePresidenciaHJEstaca(){
      this.mostrarPresidenciaHJEstaca = !this.mostrarPresidenciaHJEstaca;
    },
    togglePresidenciaMJEstaca(){
      this.mostrarPresidenciaMJEstaca = !this.mostrarPresidenciaMJEstaca;
    },
    togglePresidenciaPrimariaEstaca(){
      this.mostrarPresidenciaPrimariaEstaca = !this.mostrarPresidenciaPrimariaEstaca;
    },
    togglePresidenciaRama(){
      this.mostrarPresidenciaRama = !this.mostrarPresidenciaRama;
    },
    togglePresidenciaElderRama(){
      this.mostrarPresidenciaElderRama = !this.mostrarPresidenciaElderRama;
    },
    togglePresidenciaSocRama(){
      this.mostrarPresidenciaSocRama = !this.mostrarPresidenciaSocRama;
    },
    togglePresidenciaHJRama(){
      this.mostrarPresidenciaHJRama = !this.mostrarPresidenciaHJRama;
    },
    togglePresidenciaMJRama(){
      this.mostrarPresidenciaMJRama = !this.mostrarPresidenciaMJRama;
    },
    togglePresidenciaPrimariaRama(){
      this.mostrarPresidenciaPrimariaRama = !this.mostrarPresidenciaPrimariaRama;
    }
  },
}
</script>

<style scoped>
html {
  overflow: hidden;
}
.container-posts {
  padding: 2rem;
}

body {
  width: 100vw;
  max-height: 100vh;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

ul {
  list-style-type: none;
}

.organigrama {
  display: flex;
  justify-content: space-around;
  align-items: flex-start; /* Alinear los elementos en la parte superior */
  margin-bottom: 6rem;
}

.estaca, .rama {
  flex: 1; /* Para ocupar el mismo espacio en el contenedor flex */
  padding: 1rem;
  border: 1px solid black;
}

.estaca h1, .rama h1 {
  text-align: center;
}

.estaca ul, .rama ul {
  list-style-type: none;
  padding-left: 1rem;
}
</style>
