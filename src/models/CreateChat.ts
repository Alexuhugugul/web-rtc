import VoxImplant, { getInstance, getMessenger } from "voximplant-websdk";
import { NewChatData, Permissions } from "../types";

export class CreateConversation {
  private static createNewConversation(
    participants: ConversationParticipant,
    title: string,
    direct: boolean,
    publicJoin: boolean,
    uber: boolean,
    customData: object
  ) {
    return getMessenger().createConversation(
      participants,
      title,
      direct,
      publicJoin,
      uber,
      customData
    );
  }

  public static createChat(newChatData: NewChatData) {
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
        image: newChatData.avatar,
        description: newChatData.description,
        permissions,
      }
    );
  }
}
