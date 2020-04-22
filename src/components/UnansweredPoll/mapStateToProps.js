export const mapStateToProps = ({ questions, authedUser, users }, { qid }) => {
  const question = questions[qid] || {};

  return {
    question,
    authedUser,
    pollAuthor: users[question.author] || {},
  };
};
