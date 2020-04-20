import React from 'react';
import FacebookShareButton from './ShareButtons/Facebook';
import TwitterShareButton from './ShareButtons/Twitter';
import WhatsAppShareButton from './ShareButtons/Whatsapp';
// import checkMarkImage from './'

type Props = {
  preview?: boolean;
  mobilization: {
    twitter_share_text: string;
  };
  widget: {
    settings: {
      whatsapp_text: string;
    };
  };
  message: any;
  href: string;
  imageUrl: string;
  imageWidth: string;
};

const TellAFriend = ({
  href,
  message,
  mobilization: { twitter_share_text: twitterShareText },
  imageUrl,
  imageWidth,
  widget: { settings },
}: Props) => {
  const { whatsapp_text = '' } = settings;
  return (
    <div className="center p3 bg-white darkengray rounded">
      <div className="m0 h3 bold">{message}</div>
      <div className="py2">
        <img
          src={imageUrl || './check-mark-image.png'}
          style={{ width: imageWidth || 100 }}
          alt=""
        />
      </div>
      <p>Agora, compartilhe com seus amigos!</p>
      <p>
        <FacebookShareButton href={href} />
      </p>
      <p>
        <TwitterShareButton href={href} text={twitterShareText} />
      </p>
      <p>
        <WhatsAppShareButton whatsappText={whatsapp_text || href} />
      </p>
    </div>
  );
};

TellAFriend.propTypes = {};

export default TellAFriend;
