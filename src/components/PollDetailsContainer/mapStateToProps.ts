import { RouteComponentProps, QuestionsState } from '../../types';

type RouteInfo = { question_id: string };

export const mapStateToProps = (
  { authedUser, questions }: { authedUser: string; questions: QuestionsState },
  { match }: RouteComponentProps<RouteInfo>,
): { qid: string; answered: boolean } => {
  const { params } = match;
  const question = questions[params.question_id];
  const answered = question
    ? question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
    : false;

  return {
    qid: question ? question.id : '',
    answered,
  };
};
