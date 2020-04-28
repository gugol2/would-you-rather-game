export const mapStateToProps = ({ users, authedUser }) => {
  return {
    userLogged: users[authedUser],
  };
};
