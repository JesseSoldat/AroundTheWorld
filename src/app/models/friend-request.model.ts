interface User {
  _id: String;
  username: String;
}

export interface FriendRequest {
  requester: User;
  recipient: User;
  status: String;
}
