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
                    <div class="table">
                        <div class="row" v-for="item in pageCurrent" :key="item.id">
                            <div class="cell truncate" style="padding: 3px 3px 0px 3px; text-align: right; font-size: 14px; direction: rtl;" @click="fullText">
                                {{ item.left }}                                
                            </div>
                            <div class="cell" style="padding: 3px 3px 3px 3px; font-weight: 600; font-size: 14px;">
                                {{ item.match }}                                
                                <div style="position:relative; top:-3px; font-size: 10px; font-weight: 300; width: 100%;">{{ item.sigle }}</div>
                            </div>
                            <div class="cell truncate" style="padding: 3px 0px 3px 3px; text-align: left; font-size: 14px;" @click="fullText">
                                {{ item.right }}
                            </div>
                            <div class="cell" style="padding: 3px 0px 3px 15px; font-size: 14px;">
                                <layerView :matchId="item.id"></layerView>
                            </div>                            
                        </div>
                    </div>
                </div>
            </v-row>
            <!-- Suchergebnisse ENDE -->
            <!-- Suchergebnisse-Paging START -->
            <v-row v-if="this.$data.pageMax > 1">
                <v-pagination :length="pageMax" v-model="page" total-visible="10" :disabled="searchProgress"></v-pagination>
            </v-row>
            <!-- Suchergebnisse-Paging END -->
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

<style>
.table {
    display: table;
    font-size: 10px;
    width: 100%;
}

.row {
    display: table-row;
}

.cell {
    display: table-cell;
    padding: 5px 5px 10px 5px;
}

.truncate {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    max-width: 325px;
  }

</style>
  
<script>
import auth from "../korapJsClient/auth.js";
import kwic from "../korapJsClient/kwic.js";

export default {
    data() {
        return {
            authentication: null,
            isSignedIn: false,

            kwic: null,
            query: "[orth=Hausmeisterin/i & pos=NN]",
            language: "Poliqarp",
            languages: [],

            searchProgress: false,

            page: 1,
            pageMax: 1,
            pageCurrent: null,

            benchmark: null,

            corpusQuery: null
        };
    },

    mounted() {
        this.$data.authentication = new auth();
        this.$data.isSignedIn = this.$data.authentication.isSignedIn;

        this.$data.kwic = new kwic();
        this.$data.languages = this.$data.kwic.availableLanguages;
    },

    methods: {
        search() {
            var self = this.$data;

            self.pageMax = 1;
            self.page = 1;
            self.searchProgress = true;

            self.kwic.search(self.authentication.bearerToken, self.corpusQuery, self.query, self.language, self.page, (result) => {
                if (result == null) {
                    self.searchProgress = false;
                    return;
                }
                self.pageMax = self.kwic.searchResult_GetMaxPage(result);
                self.benchmark = self.kwic.searchResult_GetBenchmark(result);
                self.pageCurrent = self.kwic.searchResult_GetMatchesQuick(result);

                self.searchProgress = false;
            });
        },
        delete() {
            this.$data.pageCurrent = null;
        },
        fullText(target) {
            target.srcElement.style.whiteSpace = 'normal';
        }
    },

    watch: {
        page: function () {
            var self = this.$data;
            self.searchProgress = true;

            self.kwic.search(self.authentication.bearerToken, self.corpusQuery, self.query, self.language, self.page, (result) => {
                self.benchmark = self.kwic.searchResult_GetBenchmark(result);
                self.pageCurrent = self.kwic.searchResult_GetMatchesQuick(result);

                self.searchProgress = false;
            });
        }
    }
}
</script>
  
<style></style>
  