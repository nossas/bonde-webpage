import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Whatsapp from '../Whatsapp';

describe('Whatsapp share button', () => {
  const whatsappText = 'Foo bar text';
  it('should render button with text', () => {
    const { getByText } = render(<Whatsapp whatsappText={whatsappText} />);
    expect(getByText(/whatsapp/i)).toHaveTextContent(
      'Compartilhar no WhatsApp'
    );
  });

  it('should render a link with specific text', () => {
    const text = encodeURIComponent(whatsappText);
    const { getByText } = render(<Whatsapp whatsappText={whatsappText} />);
    const link = `https://web.whatsapp.com/send?text=${text}`;
    const component = getByText(/whatsApp/i) as HTMLAnchorElement;
    const href = component.getAttribute('href');
    expect(href).toBe(link);
  });
});
