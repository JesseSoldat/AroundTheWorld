import { User } from "./user.model";

export interface FriendRequest {
  _id: string;
  requester: User;
  recipient: User;
  status: string;
}
