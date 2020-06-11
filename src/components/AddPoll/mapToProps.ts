import { handleSaveNewQuestion } from '../../actions/questionsDispatch';
import { ReduxState, AuthedUserState } from '../../types';
import { AppDispatch } from '../../store';

export const mapStateToProps = ({
  authedUser,
}: ReduxState): { authedUser: AuthedUserState } => {
  return {
    authedUser,
  };
};

export const mapDispatchToProps = (dispatch: AppDispatch): object => {
  return {
    dispatchSaveNewQuestion: ({
      optionOneText,
      optionTwoText,
      author,
    }: {
      optionOneText: string;
      optionTwoText: string;
      author: string;
    }): void =>
      dispatch(handleSaveNewQuestion({ optionOneText, optionTwoText, author })),
  };
};
