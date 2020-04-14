// import React from 'react';
// import { connect } from 'react-redux';
// import { ConnectedPollDashboard } from './PollDashboard';
// import { ConnectedSignIn } from './SignIn';

// const Home = ({authedUser}) => {
//     if(authedUser) {
//         return (
//             <ConnectedPollDashboard />
//         )
//     } else {
//         return (
//             <ConnectedSignIn />
//         )
//     }

// }

// const mapStateToProps = ({authedUser}) => {
//     return {
//         authedUser
//     }
// };

// export const ConnectedHome = connect(mapStateToProps)(Home);

// TODO: delete this component