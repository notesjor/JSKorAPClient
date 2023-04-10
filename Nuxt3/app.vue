<template>
  <v-app>
    <v-app-bar>
      <h1 class="text-3xl font-bold">
        KorAP: JSClient-Test
      </h1>
    </v-app-bar>
    <v-main theme="light" style="padding:100px">
      <v-row style="margin-bottom:20px">
        <v-col>
          <signin></signin>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>
                KWIC-BTN Test
            </v-card-title>
            <v-card-subtitle>
              Der Button meldet sich automatisch an und führt eine vordefinierte Suche aus.
            </v-card-subtitle>
            <v-card-text>
              <kwicBtnSearch query="[orth=Hausmeisterin/i & pos=NN]"></kwicBtnSearch>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row style="margin-bottom:20px">
        <kwicSearch></kwicSearch>
      </v-row>
      <!--
      <v-row style="margin-bottom:20px">
        <virtualCorpora></virtualCorpora>
      </v-row>
    -->
    </v-main>
    <v-footer theme="dark" style="max-height: 50px;">Test</v-footer>
  </v-app>
</template>

<script>
export default {
  methods: {
    test() {
      alert("test");
    }
  }
}
</script>

<style></style>
