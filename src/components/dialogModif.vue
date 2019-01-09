<template>
  <!--
    <div>
      <v-dialog :md-active.sync="activeModifDialog" v-model="valueModifDialog">
        <v-dialog-title>Modification du restaurant ...</v-dialog-title>

        <v-dialog-content>
          <v-field>
            <label>Nom</label>
            <v-input type="text" v-model="nomModif"></v-input>
          </v-field>
          <v-field>
            <label>Cuisine</label>
            <v-input type="text" v-model="cuisineModif"></v-input>
          </v-field>
        </v-dialog-content>

        <v-dialog-actions>
          <v-btn class="md-primary" @click="activeModifDialog = false">Close</v-btn>
          <v-btn type="submit" class="md-primary" @click="modifRestaurant()">Save</v-btn>
        </v-dialog-actions>
      </v-dialog>
    </div>
  -->
  <v-layout row justify-center>
    <v-dialog v-model="visible" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Modification du restaurant</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Nom" v-model="nom"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Cuisine" v-model="cuisine"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="hide()">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="modifierRestaurant()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    dialog: this.visible,
    nomm: this.nom
  }),
  methods: {
    hide() {
      this.$emit("child-hide-event");
    },
    modifierRestaurant() {
      this.$emit("child-modif-event");
    }
  },
  props: ["visible", "nom", "cuisine", "identifiant"]
};
</script>