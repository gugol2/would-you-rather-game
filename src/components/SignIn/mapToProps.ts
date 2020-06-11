import { ReduxState, UsersState } from '../../types';

export const mapStateToProps = ({
  users,
  loadingBar,
}: ReduxState): { users: UsersState; finishedLoading: boolean } => {
  const finishedLoading = loadingBar.default === 0;

  return {
    users,
    finishedLoading,
  };
};
