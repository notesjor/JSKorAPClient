<template>
    <v-card v-if="isSignedIn" :loading="searchProgress">
        <v-card-title>
            <h2 class="text-xl font-bold">
                KWIC-Suche
            </h2>
        </v-card-title>
        <v-card-subtitle>
            Starten Sie eine beliebige Suche gegen KorAP.
        </v-card-subtitle>
        <v-card-text>
            <!-- Suchabfrage-Maske START -->
            <v-row>
                <v-col>
                    <v-text-field v-model="query" label="Suchabfrage" placeholder="Bitte Suchabfrage hier eingeben..."
                        style="width: 450px"></v-text-field>
                </v-col>
                <v-col>
                    <v-combobox v-model="language" label="Abfragesprache" placeholder="Bitte auswählen..."
                        :items="languages" style="width: 200px;"></v-combobox>
                </v-col>
                <v-col>
                    <v-btn @click="search" style="margin-top: 10px" color="primary" :disabled="searchProgress">
                        <v-icon style="margin-right: 10px;">mdi-magnify</v-icon>
                        Suchen
                    </v-btn>
                </v-col>
            </v-row>
            <!-- Suchabfrage-Maske ENDE -->
            <!-- Suchergebnisse START -->
            <v-row>
                <div style="display: flex; justify-content: center; align-items: center; margin-top:20px">
                    <table style="display:block">
                        <tr v-for="item in pageCurrent" :key="item.id" style="font-size: 10px">
                            <td style="padding: 3px 3px 0px 3px; text-align: right; font-size: 14px;">{{ item.left }}</td>
                            <td style="padding: 3px 3px 3px 3px; font-weight: 600; font-size: 14px;">{{ item.match }}</td>
                            <td style="padding: 3px 0px 3px 3px; font-size: 14px;">{{ item.right }}</td>
                        </tr>
                    </table>
                </div>
            </v-row>
            <!-- Suchergebnisse ENDE -->
            <!-- Funktionen START -->
            <v-row style="margin-top:50px" v-if="pageCurrent != null">
                <div style="padding-top:10px">Benchmark: {{ benchmark }}</div>
                <v-spacer></v-spacer>
                <div><v-btn @click="delete">Löschen</v-btn></div>
            </v-row>
            <!-- Funktionen ENDE -->
        </v-card-text>
    </v-card>
</template>
  
<script>
import auth from "../korapJsClient/auth.js";
import kwic from "../korapJsClient/kwic.js";

export default {
    data() {
        return {
            authentication: null,
            isSignedIn: false,
            dialog_signin_error: false,

            kwic: null,
            query: "[orth=Hausmeisterin/i & pos=NN]",
            language: "Poliqarp",
            languages: [],

            searchProgress: false,

            page: 1,
            pageMax: 0,
            pageCurrent: null,

            benchmark: null,
        };
    },

    mounted() {
        this.$data.authentication = new auth();
        this.$data.isSignedIn = this.$data.authentication.isSignedIn;

        this.$data.kwic = new kwic();
        this.$data.languages = this.$data.kwic.availableLanguages;

        this.$data.searchBtn = this.$refs.searchBtn;
    },

    methods: {
        search() {
            var self = this.$data;

            self.page = 1;
            self.pageMax = 0;
            self.searchProgress = true;

            self.kwic.search(self.authentication.bearerToken, self.query, self.language, self.page, (result) => {
                var pageMax = self.kwic.searchResult_GetMaxPage(result);
                var benchmark = self.kwic.searchResult_GetBenchmark(result);
                var matches = self.kwic.searchResult_GetMatchesQuick(result);

                self.pageMax = pageMax;
                self.benchmark = benchmark;
                self.pageCurrent = matches;

                self.searchProgress = false;
            });
        },
        delete(){
            this.$data.pageCurrent = null;
        }
    }
}
</script>
  
<style></style>
  