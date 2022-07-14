import VoxImplant, { getInstance, getMessenger } from "voximplant-websdk";
import { MessengerService } from "./CreateChat";

async function createChat() {
  const qwe = MessengerService.get();
  if (qwe) {
    const asd = await MessengerService.init();
    if (asd) {
      MessengerService.createChat();
    }
  }
}
export function initSdk() {
  const sdk = getInstance();

  const login = async () => {
    try {
      await sdk.init({
        experiments: {
          messagingV2: true,
        },
      });
      console.log("SDK is ready!");
      try {
        await sdk.connect();
        console.log("Connected");
      } catch (e) {
        console.log("Connection failed!");
      }
      try {
        await sdk.login(
          "thecrosssama2@testsdk.thecrosssama.n4.voximplant.com",
          "thecrosssama2"
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
