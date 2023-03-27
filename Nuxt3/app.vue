<template>
  <div>
    <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <v-btn @click="test"><v-icon style="color:black">mdi-account</v-icon>Test</v-btn>  
  </div>
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

<style>

</style>
