import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

export const renderWithRouter = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    ...renderOptions
  } = {},
) => {
  const Wrapper = ({ children }) => {
    return <Router history={history}>{children}</Router>;
  };

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const utils = render(ui, { wrapper: Wrapper, ...renderOptions });

  return {
    ...utils,
    history,
  };
};
