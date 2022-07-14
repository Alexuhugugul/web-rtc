export interface NewChatData {
  title: string;
  usersId: number[];
  isPublic: boolean;
  isUber: boolean;
  avatar?: number;
  description?: string;
}

export interface Permissions {
  canWrite: boolean;
  canEdit: boolean;
  canRemove: boolean;
  canManageParticipants: boolean;
  canEditAll: boolean;
  canRemoveAll: boolean;
  isOwner?: boolean;
}

export interface Conversation {
  uuid: number;
  createdAt: number;
  lastUpdate: number;
  direct: boolean;
  publicJoin: boolean;
  uberConversation: boolean;
  lastSeq: number;
  title: string;
  participants: Participant[];
  customData: ChatCustomData;
}

export interface Participant extends Permissions {
  lastRead: number;
  userId: number;
}


export interface ChatCustomData {
  type: 'chat' | 'channel' | 'direct';
  image?: string;
  description?: string;
  permissions: Permissions;
}
