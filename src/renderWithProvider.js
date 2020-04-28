import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';

export const renderWithProvider = (
  ui,
  {
    initialState,
    reducer,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {},
) => {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
};
