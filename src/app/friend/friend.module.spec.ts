import { FriendModule } from './friend.module';

describe('FriendModule', () => {
  let friendModule: FriendModule;

  beforeEach(() => {
    friendModule = new FriendModule();
  });

  it('should create an instance', () => {
    expect(friendModule).toBeTruthy();
  });
});
