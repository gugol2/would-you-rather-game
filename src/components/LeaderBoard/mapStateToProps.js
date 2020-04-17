export const mapStateToProps = ({users}) => {
    const usersOrderedByScore = Object.values(users).sort((a, b) => {
        return ((Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length));
    });

    return {
        usersOrderedByScore
    }
}