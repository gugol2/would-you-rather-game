interface StateProps {
  users: object;
  finishedLoading: boolean;
}

interface ReduxState {
  autheduser: string | null;
  questions: object;
  users: object;
  loadingBar: LoadingBar;
}

interface LoadingBar {
  default: number;
}

export const mapStateToProps = ({
  users,
  loadingBar,
}: ReduxState): StateProps => {
  const finishedLoading = loadingBar.default === 0;
  return {
    users,
    finishedLoading,
  };
};
