<template>
  <v-app>
    <v-app-bar>
      <h1 class="text-3xl font-bold">
        KorAP: JSClient-Test
      </h1>
    </v-app-bar>
    <v-main theme="light" style="padding:100px">
      <v-row style="margin-bottom:20px">
        <signin></signin>
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
