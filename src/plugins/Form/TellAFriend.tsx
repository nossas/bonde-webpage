import React from 'react';
import TellAFriendBase from '../../components/ux/TellAFriendBase';

type Props = {
  mobilization: {
    twitter_share_text: string;
  };
  widget: {
    settings:
      | {
          whatsapp_text?: string;
        }
      | Record<string, any>;
  };
  href: string;
  imageUrl: string;
};

const FormTellAFriend = ({ mobilization, widget, ...props }: Props) => (
  <TellAFriendBase
    mobilization={mobilization}
    widget={widget}
    message="Formulário salvo!"
    {...props}
  />
);

export default FormTellAFriend;
