import { mapStateToProps, mapDispatchToProps } from './mapToProps';
import { handleSaveNewQuestion as mockedHandleSaveNewQuestion } from '../../actions/questionsDispatch';

jest.mock('../../actions/questionsDispatch', () => ({
  handleSaveNewQuestion: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('mapStateToProps', () => {
  test('check that the adapter returns the authedUser JUST as it gets if from the store', () => {
    const authedUser = '::authedUser::';

    const props = {
      authedUser,
    };

    const adaptedProps = mapStateToProps(props);
    expect(adaptedProps).toEqual({ authedUser });
  });
});

describe('mapDispatchToProps', () => {
  const optionOneText = '::optionOneText::';
  const optionTwoText = '::optionTwoText::';
  const author = '::author::';
  const questionSaved = '::questionSaved::';
  const dispatch = jest.fn();

  test('mapDispatchToProps', () => {
    mockedHandleSaveNewQuestion.mockImplementation(() => questionSaved);

    const dispatchToProps = mapDispatchToProps(dispatch);

    // returns an object with a dispatchSaveNewQuestion of type function
    expect(dispatchToProps).toEqual({
      dispatchSaveNewQuestion: expect.any(Function),
    });

    // call the fuction
    dispatchToProps.dispatchSaveNewQuestion({
      optionOneText,
      optionTwoText,
      author,
    });

    // check what the function does
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(questionSaved);

    expect(mockedHandleSaveNewQuestion).toHaveBeenCalledTimes(1);
    expect(mockedHandleSaveNewQuestion).toHaveBeenCalledWith({
      optionOneText,
      optionTwoText,
      author,
    });
  });
});
