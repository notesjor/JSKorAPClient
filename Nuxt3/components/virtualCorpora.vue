<template>
    <v-card v-if="isSignedIn">
        <v-card-title>
            <h2 class="text-xl font-bold">
                KorAP-Virtuelle Korpora
            </h2>
        </v-card-title>
        <v-card-subtitle>
            Folgende virtuelle Korpora sind verfügbar:
        </v-card-subtitle>
        <v-card-text>
            <v-row>
                <v-col>
                    <v-btn @click="getTable" color="primary"><v-icon
                        style="margin-right: 10px;">mdi-table</v-icon>Abrufen</v-btn>
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Info
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in subCorpora" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.info }}</td>
                        </tr>
                    </tbody>
                </v-table>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field style="width:450px" label="Korpusabfrage" v-model="vcQuery"></v-text-field>                    
                </v-col>
                <v-col>
                    <v-text-field style="width:200px" label="Name (VC)" v-model="vcName"></v-text-field>
                </v-col>
                <v-col>
                    <v-btn @click="addVC" style="margin-left:10px; margin-top: 10px;" color="primary"><v-icon>mdi-plus</v-icon>Erstellen</v-btn>
                </v-col>
            </v-row>            
        </v-card-text>
    </v-card>
</template>
  
<script>
import auth from "../korapJsClient/auth.js";
import userInfo from "../korapJsClient/userInfo.js";

export default {
    data() {
        return {
            authentication: null,
            isSignedIn: false,
            dialog_signin_error: false,

            subCorpora: [],
            vcName: "",
            vcQuery: ""
        };
    },

    mounted() {
        this.$data.authentication = new auth();
        this.$data.isSignedIn = this.$data.authentication.isSignedIn;

        var ui = new userInfo();
        ui.getUserInfo(this.$data.authentication.bearerToken, function (data) {
            console.log(data);
        });
    },

    methods: {
        getTable() {
            var self = this;
            self.$data.authentication.getVirtualCorpora(function (data) {
                self.$data.subCorpora = data;
            });
        },
        addVC() {
            var self = this;
            self.$data.authentication.addVirtualCorpus(self.$data.vcName, self.$data.vcQuery, function (data) {
                self.$data.subCorpora = data;
            });
        }
    }
}
</script>
  
<style></style>
  