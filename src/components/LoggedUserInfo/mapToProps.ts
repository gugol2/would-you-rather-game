import { User, UsersState } from '../../types';

export const mapStateToProps = ({
  users,
  authedUser,
}: {
  users: UsersState;
  authedUser: string;
}): { userLogged: User } => {
  return {
    userLogged: users[authedUser],
  };
};
