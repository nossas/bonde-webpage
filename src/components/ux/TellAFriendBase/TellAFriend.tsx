import React from 'react';
import { any, shape, string } from 'prop-types';
import FacebookShareButton from './ShareButtons/Facebook';
import TwitterShareButton from './ShareButtons/Twitter';
import WhatsAppShareButton from './ShareButtons/Whatsapp';

// import checkMarkImage from './'

const TellAFriend = ({
  // preview,
  href,
  message,
  mobilization: { twitter_share_text: twitterShareText },
  imageUrl,
  imageWidth,
  widget,
}: any) => {
  const settings = widget.settings || {};
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
        <WhatsAppShareButton whatsappText={settings.whatsapp_text || href} />
      </p>
    </div>
  );
};

TellAFriend.propTypes = {
  // preview: bool,
  mobilization: shape({
    twitter_share_text: string,
  }).isRequired,
  widget: shape({
    settings: shape({
      whatsapp_text: string,
    }),
  }).isRequired,
  message: any.isRequired,
  href: string.isRequired,
  imageUrl: string,
  imageWidth: string,
};

export default TellAFriend;
