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
