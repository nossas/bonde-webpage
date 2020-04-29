import React from 'react';
import { Input } from '../components';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Form Input', function() {
  it('should render an input', () => {
    const field = {
      kind: 'email',
      placeholder: 'inserir email',
      label: 'Email',
      required: 'true',
    };
    const { getByPlaceholderText } = render(
      <Input
        name="test"
        field={field}
        onBlur={jest.fn()}
        onChange={jest.fn()}
      />
    );
    expect(getByPlaceholderText(/email/i)).toBeInTheDocument();
  });

  it('should render a select', () => {
    const field = {
      kind: 'dropdown',
      placeholder: 'select, um',
      label: 'Test',
      required: 'true',
    };
    render(
      <Input
        name="test"
        field={field}
        onBlur={jest.fn()}
        onChange={jest.fn()}
      />
    );

    const select = screen.getByDisplayValue(/selecione/i);
    expect(select).toBeInTheDocument();
  });
});
