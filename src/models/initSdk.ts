import VoxImplant, { getInstance, getMessenger } from "voximplant-websdk";


export function initSdk() {
    const sdk = getInstance();

    const login = async () => {
      try {
        await sdk.init({});
        console.log("SDK is ready!");
        try {
          await sdk.connect();
          console.log("Connected");
        } catch (e) {
          console.log("Connection failed!");
        }
        try {
          await sdk.login(
            "thecrosssama@testsdk.thecrosssama.n4.voximplant.com",
            "GLlH6o^9"
          );
          console.log("Logged in!");
          createChat();
        } catch (e) {
          console.log("Login failure!", e);
        }
      } catch (e) {
        console.log("SDK init failure!");
      }
    };

    return {
      login,
    };
  }