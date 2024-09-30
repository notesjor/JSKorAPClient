<template>
    {{ Token }}
</template>
  
<script>
import auth from "../korapJsClient/auth.js";

export default {
    data() {
        return {
            authentication: null,
        };
    },

    mounted() {
        this.authentication = new auth();
    },

    computed : {
        Token() {            
            return this.authentication == null ? "" : this.authentication.bearerToken;
        }
    }
}
</script>