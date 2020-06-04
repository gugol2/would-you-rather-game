import { mapStateToProps } from './mapToProps';

test('adapt the state to props when loadingBar is not finished', () => {
  const users = '::users::';
  const loadingBar = {};

  const state = { users, loadingBar };
  const adaptedStateToProps = mapStateToProps(state);

  expect(adaptedStateToProps).toEqual({
    users,
    finishedLoading: false,
  });
});

test('adapt the state to props when loadingBar is finished', () => {
  const users = '::users::';
  const loadingBar = { default: 0 };

  const state = { users, loadingBar };
  const adaptedStateToProps = mapStateToProps(state);

  expect(adaptedStateToProps).toEqual({
    users,
    finishedLoading: true,
  });
});
