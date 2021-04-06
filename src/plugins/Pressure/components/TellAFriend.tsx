import React from 'react';
// import { FormattedMessage } from 'react-intl'
import TellAFriendBase from '../../../components/ux/TellAFriendBase';

type Props = {
  preview: boolean;
  mobilization: {
    twitter_share_text: string;
  };
  widget: {
    settings: {
      whatsapp_text: string;
    };
  };
  href: string;
  imageUrl: string;
  imageWidth: string;
};

const PressureTellAFriend = ({
  preview,
  mobilization,
  widget,
  ...props
}: Props) => (
  <TellAFriendBase
    preview={preview}
    mobilization={mobilization}
    widget={widget}
    message="E-mail(s) enviado(s)!"
    {...props}
  />
);

export default PressureTellAFriend;
