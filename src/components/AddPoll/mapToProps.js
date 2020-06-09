import { handleSaveNewQuestion } from '../../actions/questionsDispatch';

export const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    dispatchSaveNewQuestion: ({ optionOneText, optionTwoText, author }) =>
      dispatch(handleSaveNewQuestion({ optionOneText, optionTwoText, author })),
  };
};
