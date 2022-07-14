import * as VoxImplant from "voximplant-websdk";
import { Conversation, NewChatData, Permissions } from "../types";
const TIME_NOTIFICATION = 300000;
export class MessengerService {
  public static messenger: any = null;
  private static inst: any;
  private static setStatusTimer: any;
  private conversationEvents: any = {};

  public static get() {
    if (!MessengerService.inst) {
      MessengerService.inst = new MessengerService();
    }
    return MessengerService.inst;
  }
  private static getCurrentConversations(conversationsList: Conversation[]) {
    /**
     * The maximum number of conversations that SDK enables to get at once is 30
     * This method resolves to an array of VoxImplant.Messaging.MessengerEvents.GetConversation events
     */
    // TODO add param for amount of conversations
    // @ts-ignore
    return MessengerService.messenger
      .getConversations(conversationsList)
      .catch((e: any) => {
        console.log("MessengerService.getCurrentConversations", e);
        return [];
      });
  }
  public static async init() {
    // Get Voximplant Messenger instance
    try {
      MessengerService.messenger = VoxImplant.getMessenger();
      console.log("Messenger v2", MessengerService.messenger);
      console.log("VoxImplant.Messaging v2", VoxImplant.Messaging);
    } catch (e) {
      // Most common error 'Not authorised', so redirect to login
      console.log(e);
      // await store.dispatch('auth/relogin');
    }

    // Get the current user data
    const initialData: {
      currentUser: any;
      conversations: any;
      users: any;
    } = {
      currentUser: {},
      conversations: [],
      users: [],
    };
    await MessengerService.messenger
      .getUser(MessengerService.messenger.getMe())
      .then((evt: any) => {
        console.log("Current user data received", evt);
        initialData.currentUser = evt.user;

        return this.getCurrentConversations(evt.user.conversationsList);
      })
      .then((evts: any) => {
        console.log("Current user conversations received", evts);

        initialData.conversations = evts.length
          ? evts.map((e: any) => e.conversation)
          : [];
        const directUsersId = initialData.conversations
          .filter((conversation: any) => conversation.direct)
          .map((conversation: any) => {
            const directUser = conversation.participants.find(
              (participant: any) =>
                participant.userId !== initialData.currentUser.userId
            );
            return directUser.userId;
          });
        return MessengerService.messenger.getUsersById(directUsersId);
      })
      .then((evts: any) => {
        console.log("Conversation participants user info received", evts);
        if (localStorage.getItem("users")) {
          //@ts-ignore
          initialData.users = JSON.parse(localStorage.getItem("users"));
        } else {
          initialData.users = evts.map((e: any) => e.user);
          localStorage.setItem("users", JSON.stringify(initialData.users));
        }
      })
      .catch(console.log);

    // this.addMessengerEventListeners();

    /**
     * You have to send user presence status periodically to notify the new coming users if you are online
     * TODO You can implement invisible mode by sending setStatus(false)
     */
    const sendStatus = () =>
      setTimeout(() => {
        MessengerService.messenger.setStatus(true);
        this.setStatusTimer = sendStatus();
      }, TIME_NOTIFICATION);

    this.setStatusTimer = sendStatus();

    return initialData;
  }

  private static createNewConversation(
    participants: Array<Permissions & { userId: number }>,
    title: string,
    direct: boolean,
    publicJoin: boolean,
    uber: boolean,
    customData: object
  ) {
    console.log("-->", {
      participants,
      title,
      direct,
      publicJoin,
      uber,
      customData,
    });
    return MessengerService.messenger.createConversation(
      participants,
      title,
      direct,
      publicJoin,
      uber,
      customData
    );
  }

  public static createChat() {
    const newChatData = {
      isPublic: true,
      isUber: true,
      title: "lector",
      usersId: [22167386, 22168051],
    };
    const permissions: Permissions = {
      canWrite: true,
      canEdit: true,
      canRemove: true,
      canManageParticipants: true,
      canEditAll: false,
      canRemoveAll: false,
    };

    const participants = newChatData.usersId.map((userId: number) => {
      return {
        userId,
        ...permissions,
      };
    });

    return this.createNewConversation(
      participants,
      newChatData.title,
      false,
      newChatData.isPublic,
      newChatData.isUber,
      {
        type: "chat",
        // image: newChatData.avatar,
        // description: newChatData.description,
        permissions,
      }
    );
  }

}
