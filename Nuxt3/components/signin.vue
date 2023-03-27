<template>
    <v-card>
        <v-card-title>
            <h2 class="text-xl font-bold">
                KorAP-Anmeldung
            </h2>
        </v-card-title>
        <v-card-subtitle>
            Bevor weitere Tests erfolgen, muss die Anmeldung erfolgreich sein.
        </v-card-subtitle>
        <v-card-text>
            <v-btn @click="signIn" :color="btn_color"><v-icon style="margin-right: 10px;">mdi-login</v-icon>Anmelden</v-btn>
            <v-btn @click="reload" style="margin-left:10px" v-if="isSignedIn"><v-icon>mdi-reload</v-icon>Reload</v-btn>
        </v-card-text>
    </v-card>
</template>
  
<script>
import auth from "../korapJsClient/auth.js";

export default {
    data() {
        return {
            authentication: null,
            isSignedIn: false,
            dialog_signin_error: false,
            btn_color: "primary"
        };
    },

    mounted() {
        this.$data.authentication = new auth();
        this.$data.isSignedIn = this.$data.authentication.isSignedIn;        
    },

    methods: {
        signIn() {
            var self = this;
            self.$data.authentication.signIn(auth => {
                self.$data.isSignedIn = auth;
                if (!auth)
                    self.$data.btn_color = "error";
                else {
                    self.$data.btn_color = "success";
                    location.reload();
                }
            });
        },
        reload() {
            location.reload();
        }
    }
}
</script>
  
<style></style>
  