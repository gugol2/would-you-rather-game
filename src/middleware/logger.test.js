import { logger } from './logger';

beforeEach(() => {
  jest.spyOn(console, 'group').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'groupEnd').mockImplementation(() => {});
});

afterEach(() => {
  console.group.mockRestore();
  console.log.mockRestore();
  console.groupEnd.mockRestore();
});

test('should log the info from the action and the state', () => {
  const result = '::result::';
  const type = '::type::';
  const state = '::state::';

  const action = {
    type,
  };

  const store = {
    getState: jest.fn(() => state),
  };

  const next = jest.fn(() => result);

  const expectedResult = logger(store)(next)(action);

  expect(expectedResult).toBe(result);

  expect(console.group).toHaveBeenCalledTimes(1);
  expect(console.group).toHaveBeenCalledWith(type);
  expect(console.log).toHaveBeenCalledTimes(1);
  expect(console.log).toHaveBeenCalledWith('The new state: ', state);
  expect(console.groupEnd).toHaveBeenCalledTimes(1);
  expect(console.groupEnd).toHaveBeenCalledWith();
});
