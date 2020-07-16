import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormPlugin from '../index';
import { addValueToFields } from '../utils';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const count = 10;
const widget = {
  settings: {
    fields: [
      {
        kind: 'email',
        label: 'Seu melhor e-mail',
        placeholder: 'Escreva aqui o seu email',
        required: 'true',
        uid: 'field-1582206463222-60',
      },
      {
        kind: 'number',
        label: 'Whatsapp (com DDD)',
        placeholder: 'Escreva aqui o seu whats (somente numeros)',
        required: 'true',
        uid: 'field-1582206476330-11',
      },
    ],
    button_text: 'enviar',
    count_text: 'pressões',
  },
  id: 0,
  form_entries_count: count,
};

test('Form renders according with placed logics', () => {
  const component = render(
    <FormPlugin
      asyncFormEntryCreate={jest.fn()}
      analyticsEvents={{ formIsFilled: jest.fn() }}
      mobilization={{}}
      widget={widget}
    />
  );

  const { getByLabelText, getByText } = component;

  // email
  expect(getByLabelText(/input-field-1582206463222-60/i)).toBeInTheDocument();
  // phone
  expect(getByLabelText(/input-field-1582206476330-11/i)).toBeInTheDocument();
  // button
  expect(getByText(/enviar/i)).toBeInTheDocument();
  // count
  expect(getByText(/pressões/i)).toBeInTheDocument();
});

test('Form successful flow works as expected', async () => {
  const mockedValues = {
    email: 'mockemail@teste.com',
    'input-field-1582206463222-60': 'mockemail@teste.com',
    phone: '12989999999',
    'input-field-1582206476330-11': '12989999999',
  };

  const handleSubmit = jest
    .fn()
    .mockResolvedValue({ type: 'WIDGET_FORM_ENTRY_CREATE_REQUEST' });

  const { getByLabelText, getByText } = render(
    <FormPlugin
      asyncFormEntryCreate={handleSubmit}
      analyticsEvents={{ formIsFilled: jest.fn() }}
      mobilization={{ twitter_share_text: 'test', id: 0 }}
      widget={widget}
      overrides={{
        FinishCustomMessage: {
          component: () => <div>test</div>,
          props: {},
        },
        FinishDefaultMessage: {
          component: () => <button>Compartilhe no facebook</button>,
          props: {
            href: 'www.test.com',
            message: 'test test',
            imageUrl: '',
          },
        },
      }}
    />
  );

  const email = getByLabelText(
    /input-field-1582206463222-60/i
  ) as HTMLInputElement;
  const phone = getByLabelText(
    /input-field-1582206476330-11/i
  ) as HTMLInputElement;
  const submitButton = getByText(/enviar/i);

  fireEvent.change(email, { target: { value: mockedValues.email } });
  fireEvent.change(phone, { target: { value: mockedValues.phone } });
  fireEvent.click(submitButton);

  expect(email.value).toBe(mockedValues.email);
  expect(phone.value).toBe(mockedValues.phone);

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  const submitting = getByText(/enviando/i);
  expect(submitting).toBeInTheDocument();

  const submitValues = {
    formEntry: {
      widget_id: widget.id,
      fields: JSON.stringify(
        addValueToFields(widget.settings.fields, mockedValues)
      ),
    },
    mobilizationId: 0,
  };

  expect(handleSubmit).toBeCalledWith(submitValues);
  await waitFor(() => {
    expect(submitting).not.toBeInTheDocument();
  });
});

describe('Form error flow works as expected', () => {
  it('should omit those components', () => {
    const { container, queryByText } = render(
      <FormPlugin
        asyncFormEntryCreate={jest.fn()}
        analyticsEvents={{ formIsFilled: jest.fn() }}
        mobilization={{}}
        widget={{
          ...widget,
          settings: {
            ...widget.settings,
            fields: [],
            count_text: undefined,
          },
        }}
      />
    );

    // no count
    expect(container.getElementsByTagName('span')).toHaveLength(0);

    // no buttons
    const submitButton = queryByText(/enviar/i);
    expect(submitButton).not.toBeInTheDocument();
  });

  it('should trigger a validation error', () => {
    const { getByLabelText, getByText, getAllByText } = render(
      <FormPlugin
        asyncFormEntryCreate={jest.fn()}
        analyticsEvents={{ formIsFilled: jest.fn() }}
        mobilization={{}}
        widget={widget}
      />
    );

    const phone = getByLabelText(
      /input-field-1582206476330-11/i
    ) as HTMLInputElement;
    const submitButton = getByText(/enviar/i);

    fireEvent.change(phone, { target: { value: '1198880195' } });
    fireEvent.click(submitButton);

    const errors = getAllByText(/branco/i);
    expect(errors[0]).toHaveTextContent(
      'Seu melhor e-mail não pode ficar em branco'
    );
    expect(errors).toHaveLength(1);
  });

  it('should display an error message if bad req', async () => {
    const mockedValues = {
      email: 'mockemail@teste.com',
      'input-field-1582206463222-60': 'mockemail@teste.com',
      phone: '12989999999',
      'input-field-1582206476330-11': '12989999999',
    };

    const handleSubmit = jest.fn().mockRejectedValue('form submit error');

    const { getByLabelText, getByText } = render(
      <FormPlugin
        asyncFormEntryCreate={handleSubmit}
        analyticsEvents={{ formIsFilled: jest.fn() }}
        mobilization={{ twitter_share_text: 'test', id: 0 }}
        widget={widget}
      />
    );

    const email = getByLabelText(
      /input-field-1582206463222-60/i
    ) as HTMLInputElement;
    const phone = getByLabelText(
      /input-field-1582206476330-11/i
    ) as HTMLInputElement;
    const submitButton = getByText(/enviar/i);

    fireEvent.change(email, { target: { value: mockedValues.email } });
    fireEvent.change(phone, { target: { value: mockedValues.phone } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const error = getByText(/houve um erro ao enviar o formulário/i);
      expect(error).toBeInTheDocument();
    });
  });
});
