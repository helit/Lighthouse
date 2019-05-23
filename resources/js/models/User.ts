import { types } from 'mobx-state-tree';

const User = types.model('User', {
  id: types.identifierNumber,
  name: types.string,
  email: types.string,
  role: types.string
})
.actions(self => ({

}));

export type IUser = typeof User.Type;

export default User;