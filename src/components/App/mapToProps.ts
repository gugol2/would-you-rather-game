import { ReduxState, AuthedUserState } from '../../types';

export const mapStateToProps = ({
  authedUser,
}: ReduxState): { authedUser: AuthedUserState } => {
  return {
    authedUser,
  };
};
