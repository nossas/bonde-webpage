import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormPlugin from '../index';

describe('Form Plugin', function() {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const count = 10;
  const widget = {
    settings: {
      fields: [
        {
          kind: 'text',
          label: 'Nome',
          placeholder: 'Escreva aqui o seu nome',
          required: 'true',
          uid: 'field-1582206422711-52',
        },
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
      // count_text: 'pressões',
    },
    id: 0,
    form_entries_count: count,
  };

  const component = (
    <FormPlugin
      asyncFormEntryCreate={jest.fn().mockResolvedValue(true)}
      analyticsEvents={{ formIsFilled: jest.fn() }}
      mobilization={{ twitter_share_text: 'test' }}
      widget={widget}
      block={{ scrollTopReached: true }}
      overrides={{
        FinishCustomMessage: {
          component: <div>test</div>,
          props: {},
        },
        FinishDefaultMessage: {
          component: <div>facebook</div>,
          props: {
            href: 'www.test.com',
            message: 'test test',
            imageUrl: '',
          },
        },
      }}
    />
  );

  it('renderCount should be 0 if there"s no `count_text`', () => {
    const { container } = render(component);
    const number = container.getElementsByTagName('span');
    expect(number).toHaveLength(0);
  });

  it('renders a form with name, email, phone fields', async () => {
    const { container } = render(
      <FormPlugin
        asyncFormEntryCreate={jest.fn().mockResolvedValue(true)}
        analyticsEvents={{ formIsFilled: jest.fn() }}
        mobilization={{}}
        widget={widget}
        block={{ scrollTopReached: true }}
      />
    );

    const inputs = container.getElementsByTagName('input');
    expect(inputs).toHaveLength(3);
  });

  it("button shouldn't appear if there's no fields", () => {
    const { queryByText } = render(
      <FormPlugin
        asyncFormEntryCreate={jest.fn().mockResolvedValue(true)}
        analyticsEvents={{ formIsFilled: jest.fn() }}
        mobilization={{}}
        widget={{
          ...widget,
          settings: {
            ...widget.settings,
            fields: [],
          },
        }}
        block={{ scrollTopReached: true }}
      />
    );

    const submitButton = queryByText(/enviar/i);
    expect(submitButton).not.toBeInTheDocument();
  });

  describe('Check form usability', () => {
    it('should render fields', () => {
      const { getByLabelText, getByText } = render(component);
      // const phone = getByLabelText(/input-field-1582206476330-11/i);
      const email = getByLabelText(
        /input-field-1582206463222-60/i
      ) as HTMLInputElement;
      const name = getByLabelText(
        /input-field-1582206422711-52/i
      ) as HTMLInputElement;
      const phone = getByLabelText(
        /input-field-1582206476330-11/i
      ) as HTMLInputElement;
      const submitButton = getByText(/enviar/i);

      expect(name).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(phone).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    it('should record field changes', () => {
      const { getByLabelText } = render(component);
      // const phone = getByLabelText(/input-field-1582206476330-11/i);
      const email = getByLabelText(
        /input-field-1582206463222-60/i
      ) as HTMLInputElement;
      const name = getByLabelText(
        /input-field-1582206422711-52/i
      ) as HTMLInputElement;
      const phone = getByLabelText(
        /input-field-1582206476330-11/i
      ) as HTMLInputElement;

      fireEvent.change(name, { target: { value: 'mockname' } });
      fireEvent.change(email, { target: { value: 'mockemail@test.com' } });
      fireEvent.change(phone, { target: { value: '011989999999' } });
      expect(name.value).toBe('mockname');
      expect(email.value).toBe('mockemail@test.com');
      expect(phone.value).toBe('011989999999');
    });

    it('should render validation error', () => {
      const { getByLabelText, getByText } = render(component);
      const email = getByLabelText(
        /input-field-1582206463222-60/i
      ) as HTMLInputElement;
      const phone = getByLabelText(
        /input-field-1582206476330-11/i
      ) as HTMLInputElement;
      const submitButton = getByText(/enviar/i);

      fireEvent.change(email, { target: { value: 'mockemail@test.com' } });
      fireEvent.change(phone, { target: { value: '011989999999' } });
      fireEvent.click(submitButton);

      const error = getByText(/branco/i);
      expect(error).toHaveTextContent('Nome não pode ficar em branco');
    });
  });
});
