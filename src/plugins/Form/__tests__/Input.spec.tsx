import React from 'react';
import Input from '../components/Input';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Form Input', function() {
  it('should render an input tag with type email if field kind is email', () => {
    const field = {
      kind: 'email',
      placeholder: 'inserir email',
      label: 'Email',
      required: 'true',
    };
    const { container } = render(
      <Input
        name="test"
        field={field}
        onBlur={jest.fn()}
        onChange={jest.fn()}
      />
    );
    const email = container.querySelector('input[type="email"]');
    expect(email).toBeInTheDocument();
  });

  it('should render a select input when field kind equals dropdown', () => {
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
