export default class virtualCorpus {
    /**
     * Reset the authentication
     * @private
     */
    getMyVirtualCorpora() {
      localStorage.setItem("owid_auth_timestamp", "");
      localStorage.setItem("owid_auth_token", "");
    }
  }
  