import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedAddPoll } from '../AddPoll';
import { ConnectedLeaderBoard } from '../LeaderBoard';
import { ConnectedPollDetailsContainer } from '../PollDetailsContainer';
import { NoMatch } from '../NoMatch';
import { ConnectedPollTabs } from '../PollTabs';

export const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route
        path="/login"
        render={({ location }) => {
          const { from } = location.state || { from: { pathname: '/' } };

          return <Redirect to={from} />;
        }}
      />

      <Route exact path="/">
        <ConnectedPollTabs />
      </Route>

      <Route path="/add">
        <ConnectedAddPoll />
      </Route>

      <Route
        path="/questions/:question_id"
        component={ConnectedPollDetailsContainer}
      />

      <Route path="/leaderboard">
        <ConnectedLeaderBoard />
      </Route>

      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};
