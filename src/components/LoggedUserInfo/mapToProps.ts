import { User } from '../../types';

export const mapStateToProps = ({
  users,
  authedUser,
}: {
  users: { [key: string]: User };
  authedUser: string;
}): { userLogged: User } => {
  return {
    userLogged: users[authedUser],
  };
};
