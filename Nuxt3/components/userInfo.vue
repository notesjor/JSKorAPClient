<template>
    <v-card v-if="isSignedIn">
        <div style="margin:10px">
            <p>Angemeldete*r Nutzer*in: {{ user.username }}</p>
        </div>
    </v-card>
</template>

<script>
import auth from "../korapJsClient/auth.js";
import userInfo from "../korapJsClient/userInfo.js";

export default {
    name: "userInfo",
    data() {
        return {
            authentication: null,
            isSignedIn: false,

            userInformation: null,
            user: {
                username: "-?-"
            }
        }
    },

    mounted() {
        this.$data.authentication = new auth();
        this.$data.isSignedIn = this.$data.authentication.isSignedIn;
        
        this.$data.userInformation = new userInfo();        
        var self = this;
        this.$data.userInformation.getUserInfo(this.$data.authentication.bearerToken, function (data) {
            console.log(data);
            self.$data.user = data;
        });
    },
}
</script>

<style></style>