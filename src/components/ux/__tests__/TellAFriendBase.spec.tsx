import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TellAFriendBase from '../TellAFriendBase';

describe('Tell a Friend Base', () => {
  it('should render three buttons', () => {
    const { container } = render(
      <TellAFriendBase
        mobilization={{
          twitter_share_text: 'Twitter Share Text',
        }}
        widget={{
          settings: {
            whatsapp_text: 'Foo Bar',
          },
        }}
        message="Foo Bar Message"
        href="http://foo.bar"
        imageUrl=""
      />
    );
    const buttons = container.getElementsByTagName('button');
    const link = container.getElementsByTagName('a');
    expect(buttons).toHaveLength(2);
    expect(link).toHaveLength(1);
  });

  it('should call the window open once', () => {
    const { getByText } = render(
      <TellAFriendBase
        mobilization={{
          twitter_share_text: 'Twitter Share Text',
        }}
        widget={{
          settings: {
            whatsapp_text: 'Foo Bar',
          },
        }}
        message="Foo Bar Message"
        href="http://foo.bar"
        imageUrl=""
      />
    );
    const submitButton = getByText(/facebook/i);
    (global as any).open = jest.fn();
    fireEvent.click(submitButton);
    expect((global as any).open).toBeCalledTimes(1);
  });
});
