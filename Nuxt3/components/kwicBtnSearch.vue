<template>
  <div>
    <!-- BUTTON START -->
    <v-icon @click="signinSearch">mdi-open-in-new</v-icon>
    <!-- BUTTON ENDE -->
    <!-- ANMELDUNG ERFOLGREICH - SUCHE - START -->
    <v-dialog v-model="dialog_search" width="90%">
      <v-card>
        <v-card-title>
          <div style="display: flex;">
            <div style="display: inline;">
            KorAP-Belege für: <span style="font-weight:lighter; margin-left:10px; margin-right:5px">{{ query }}</span>
          <a :href="getKorapLink()" target="_blank" style="text-decoration:none"><v-icon>mdi-open-in-new</v-icon></a>
          </div>
          <div style="flex-grow: 1;"/>
          <div style="display: inline;">
            <v-icon @click="dialog_search = false">mdi-close</v-icon>
          </div>
          </div>
        </v-card-title>
        <v-card-text>
          <div v-if="pageCurrent === null">
            <h2 style="text-align:center;">Bitte warten...</h2>
            <h4 style="text-align:center;">Die KorAP-Abfrage nimmt wenige Sekunden in Anspruch.</h4>
          </div>
          <div v-else-if="pageCurrent === -1 || pageCurrent.length === 0">
            <h2 style="text-align:center;">Keine Ergebnisse</h2>
            <h4 style="text-align:center;">Die KorAP-Abfrage lieferte keine passenden Ergebnisse. Bitte probieren Sie eine
              andere Abfrage aus.</h4>
          </div>
          <div v-else>
            <v-alert color="#f9b211" dense outlined text type="warning">
              <strong>Hinweis:</strong> Diese Funktion fragt zufällige Belege aus KorAP ab.
            </v-alert>
            <div style="display: flex; justify-content: center; align-items: center; margin-top:20px">
              <div class="table">
                <div class="row" v-for="item in pageCurrent" :key="item.id">
                  <div class="cell truncate"
                    style="padding: 3px 3px 0px 3px; text-align: right; font-size: 14px; direction: rtl;"
                    @click="fullText">
                    {{ item.left }}
                  </div>
                  <div class="cell" style="padding: 3px 3px 3px 3px; font-weight: 600; text-align: center; font-size: 14px;">
                    <div>{{ item.match }}</div>
                    <div style="position:relative; top:-3px; font-size: 10px; font-weight: 300; width: 100%;">{{item.sigle }}</div>
                  </div>
                  <div class="cell truncate" style="padding: 3px 0px 3px 3px; text-align: left; font-size: 14px;"
                    @click="fullText">
                    {{ item.right }}
                  </div>
                  <div class="cell" style="padding: 3px 0px 3px 15px; font-size: 14px;">
                    <layerView :matchId="item.id"></layerView>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <v-pagination :length="pageMax" v-model="page" total-visible="10" :disabled="pageMax < 2"></v-pagination>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <!---->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ANMELDUNG ERFOLGREICH - SUCHE - ENDE -->
    <!-- FEHLER START -->
    <v-alert color="red" dense outlined text type="error" v-if="dialog_signin_error">
      Die Anmeldung war nicht erfolgreich. Bitte melden Sie sich erneut an.
    </v-alert>
    <!-- FEHLER ENDE -->
  </div>
</template>

<script>
import auth from "../korapJsClient/auth.js";
import kwic from "../korapJsClient/kwic.js";

var authentication = new auth();
var kwicSearch = new kwic();

export default {
  name: 'OwidSignin',

  props: {
    query: {
      type: String,
      default: ""
    },
    corpusQuery: {
      type: String,
      default: null
    },
    language: {
      type: String,
      default: "Poliqarp"
    }
  },

  data() {
    return {
      authentication: null,
      isSignedIn: false,
      dialog_signin_error: false,
      dialog_search: false,
      kwic: null,

      page: 1,
      pageMax: 0,
      pageCurrent: null,
    };
  },

  mounted() {
    this.$data.authentication = authentication;
    this.$data.isSignedIn = authentication.isSignedIn;

    this.$data.kwic = kwicSearch;
  },

  methods: {
    signinSearch() {
      if (this.$data.isSignedIn)
        this.kwicSearch();
      else {
        this.signIn();
        if (this.$data.isSignedIn)
          this.kwicSearch();
      }
    },
    signIn() {
      var self = this;
      self.$data.authentication.signIn(auth => {
        self.$data.isSignedIn = auth;
        if (auth)
          self.kwicSearch();
        else
          self.$data.dialog_signin_error = true;
      });
    },
    kwicSearch: function () {
      var self = this;

      self.$data.pageMax = 0;
      self.$data.page = 1;
      self.$data.dialog_search = true;

      self.$data.kwic.search(self.$data.authentication.bearerToken, self.$props.corpusQuery, self.$props.query, self.$props.language, self.$data.page, (result) => {
        if (result == null) {
          return;
        }

        self.pageMax = self.kwic.searchResult_GetMaxPage(result);
        self.pageCurrent = self.kwic.searchResult_GetMatchesQuick(result);
      });
    },
    fullText(target) {
      target.srcElement.style.whiteSpace = 'normal';
    },
    getKorapLink() {
      return this.$data.kwic.getKorapLink(this.$props.corpusQuery, this.$props.query, this.$props.language);
    },
    signOut() {
      authentication.signOut();
    }
  },

  watch: {
    page: function () {
      var self = this;
      if (self.$data.pageMax == 0)
        return;

      self.pageCurrent = null;

      self.kwic.search(self.authentication.bearerToken, self.$props.corpusQuery, self.$props.query, self.$props.language, self.page, (result) => {
        self.pageCurrent = self.kwic.searchResult_GetMatchesQuick(result);
      });
    }
  }
}
</script>

<style>
.table {
  display: table;
  font-size: 10px;
  width: 100%;
  line-height: 18px;
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
  max-width: 500px;
}
</style>
