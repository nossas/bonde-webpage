import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Facebook from '../Facebook';

describe('Facebook share button', () => {
  it('should render button with text', () => {
    const { getByText } = render(<Facebook href="http://mapalgbt.bonde.org" />);
    expect(getByText(/facebook/i)).toHaveTextContent(
      'Compartilhar no Facebook'
    );
  });
});
