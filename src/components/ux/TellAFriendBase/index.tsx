import React from 'react';
import FacebookShareButton from './ShareButtons/Facebook';
import TwitterShareButton from './ShareButtons/Twitter';
import WhatsAppShareButton from './ShareButtons/Whatsapp';
import { Wrap, Header, IconWrapper, WrapButtons } from './styles';

type Props = {
  preview?: boolean;
  mobilization: {
    twitter_share_text: string;
  };
  widget: {
    settings:
      | {
          whatsapp_text?: string;
          main_color?: string;
        }
      | Record<string, any>;
  };
  message: string;
  href: string;
  imageUrl: string;
  imageWidth?: string;
};

const TellAFriend = ({
  href,
  message,
  mobilization: { twitter_share_text: twitterShareText },
  imageUrl,
  imageWidth,
  widget: { settings },
}: Props) => {
  const { whatsapp_text = '', main_color: mainColor } = settings;
  return (
    <Wrap>
      <Header mainColor={mainColor}>{message}</Header>
      <IconWrapper className="py2">
        <img src={imageUrl} style={{ width: imageWidth || 100 }} alt="" />
      </IconWrapper>
      <p>Agora, compartilhe com seus amigos!</p>
      <WrapButtons>
        <FacebookShareButton href={href} />
        <TwitterShareButton href={href} text={twitterShareText} />
        <WhatsAppShareButton whatsappText={whatsapp_text || href} />
      </WrapButtons>
    </Wrap>
  );
};

export default TellAFriend;
