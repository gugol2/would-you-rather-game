import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import React from 'react';
import { render } from '@testing-library/react';
// import PropTypes from 'prop-types';

export const renderWithRouter = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    ...renderOptions
  } = {},
) => {
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => {
    return <Router history={history}>{children}</Router>;
  };

  const utils = render(ui, { wrapper: Wrapper, ...renderOptions });

  return {
    ...utils,
    history,
  };
};

// Wrapper.propTypes = {
//     children: PropTypes.node.isRequired,
//   };
