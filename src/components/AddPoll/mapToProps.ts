import { handleSaveNewQuestion } from '../../actions/questionsFunctions';
import { ReduxState, AuthedUserState, AppDispatch } from '../../types';

export const mapStateToProps = ({
  authedUser,
}: ReduxState): { authedUser: AuthedUserState } => {
  return {
    authedUser,
  };
};

interface DispatchToProps {
  dispatchSaveNewQuestion({
    optionOneText,
    optionTwoText,
    author,
  }: {
    optionOneText: string;
    optionTwoText: string;
    author: string;
  }): void;
}

export const mapDispatchToProps = (dispatch: AppDispatch): DispatchToProps => {
  return {
    dispatchSaveNewQuestion: ({ optionOneText, optionTwoText, author }): void =>
      dispatch(handleSaveNewQuestion({ optionOneText, optionTwoText, author })),
  };
};
