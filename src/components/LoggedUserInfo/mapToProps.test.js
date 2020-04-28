import { mapStateToProps } from './mapToProps';

test('should return an object with the userLogged property adapted from the state', () => {
  const authedUserKey = '::authedUserKey::';
  const authedUserValue = '::authedUserValue::';

  const users = {
    [authedUserKey]: authedUserValue,
  };
  const props = {
    users,
    authedUser: authedUserKey,
  };
  const adaptedStateToProps = mapStateToProps(props);

  expect(adaptedStateToProps).toEqual({ userLogged: authedUserValue });
});
