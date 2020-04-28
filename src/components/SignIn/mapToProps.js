export const mapStateToProps = ({ users, loadingBar }) => {
  const finishedLoading = loadingBar.default === 0;
  return {
    users,
    finishedLoading,
  };
};
