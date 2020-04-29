import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormPlugin, { renderCount } from '../index';

describe('Form Plugin', function() {
  const count_text = 'inscritos';
  const count = 10;
  const block = { scrollTopReached: true };
  const widget = {
    form_entries_count: count,
    settings: { count_text },
  };
  const mobilization = { body_font: 'sans-serif' };

  it('renderCount should render the count text', () => {
    const { getByText } = render(renderCount({ block, widget, mobilization }));
    expect(getByText(/[count_text]/i)).toBeInTheDocument();
  });

  it('renderCount should render the count number', () => {
    const { getByText } = render(renderCount({ block, widget, mobilization }));
    expect(getByText(/[count]/i)).toBeInTheDocument();
  });

  it('renderCount should be 0 if there"s no `count_text`', () => {
    const count = 10;
    const widget = {
      settings: {
        fields: [],
        button_text: 'enviar',
        // count_text: 'pressões',
      },
      id: 0,
      form_entries_count: count,
    };
    const { container } = render(
      <FormPlugin
        asyncFormEntryCreate={jest.fn()}
        analyticsEvents={{}}
        mobilization={{}}
        widget={widget}
        block={{ scrollTopReached: true }}
      />
    );
    const number = container.getElementsByTagName('span');
    expect(number).toHaveLength(0);
  });
});
