import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Twitter from '../Twitter';

describe('Twitter share button', () => {
  it('should render button with text', () => {
    const { getByText } = render(
      <Twitter href="http://mapalgbt.bonde.org" text="test" />
    );
    expect(getByText(/twitter/i)).toHaveTextContent('Compartilhar no Twitter');
  });
});
