import nhost from "nhost-js-sdk";

const config = {
  base_url: "https://backend-2gcuqdxy.nhost.app",
};

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };