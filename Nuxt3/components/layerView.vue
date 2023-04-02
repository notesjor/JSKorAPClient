<template>
    <v-btn @click="showToken" icon variant="tonal">
        <v-icon>mdi-file-find</v-icon>

        <v-dialog v-model="dialog" activator="parent" width="auto">
            <v-card style="min-width: 500px;">
                <v-card-text>
                    <div class="table-container">
                        <table>
                            <tr v-for="item in grid" :key="item.id">
                                <td v-for="x in item" :key="x">
                                    {{ x }}
                                </td>
                            </tr>
                        </table>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="dialog = false">Ausblenden</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<style>
.table-container {
  overflow-x: auto;
  scrollbar-width: thin;
}

table {
    position: relative;
    text-align: center;
    border: 1px solid #ccc;
}

td:nth-child(1) {
    text-align: right;
    font-weight: 800;
    margin-right: 30px;
    padding-right: 30px;
    border: 1px solid #ccc;
}

td:nth-child(n+1) {
    padding: 5px;
    border: 1px solid #ccc;
}

tr:nth-child(1) {
    background-color: rgb(var(--v-theme-primary));
    color: #fff;
    border: 1px solid #ccc;
}

tr:nth-child(n+2) {
    font-size: 12px;
    border: 1px solid #ccc;
}
</style>
  
<script>
import auth from "../korapJsClient/auth.js";
import kwic from "../korapJsClient/kwic.js";

export default {
    props: {
        matchId: {
            type: String,
            default: null
        }
    },

    data() {
        return {
            authentication: null,
            isSignedIn: false,

            kwic: null,

            dialog: false,
            grid: []
        };
    },

    mounted() {
        this.$data.authentication = new auth();
        this.$data.isSignedIn = this.$data.authentication.isSignedIn;

        this.$data.kwic = new kwic();
    },

    methods: {
        showToken() {
            var self = this.$data;

            this.$data.dialog = true;
            this.$data.kwic.match_GetLayerData(self.authentication.bearerToken, this.$props.matchId, (x) => {
                try {
                    self.grid = [];
                    self.grid.push(self.kwic.layerData_GetInfo(x));

                    x.forEach((t) => {
                        var token = [];
                        token.push(t.text);
                        t.layers.forEach((l) => {
                            token.push(l.value);
                        });
                        self.grid.push(token);
                    });

                    self.grid = self.grid[0].map((col, i) => self.grid.map(row => row[i]));

                    self.dialog = true;
                } catch {
                    self.dialog = true;
                }
            });
        },
    }
}
</script>
  
<style></style>
  