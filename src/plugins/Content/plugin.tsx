import React from 'react';
// import { injectIntl, intlShape } from 'react-intl';
// TODO: should remove EditorOld??
import { DraftEditor, SlateEditor } from '.';
import { checkToParse } from '../../utils';

type Props = {
  mobilization: Record<any, any>;
  widget: {
    settings: {
      content: string | Record<any, any>;
    };
  };
};

const Content = ({ widget: { settings } }: Props) => {
  const content = checkToParse(settings.content);
  if (typeof content === 'string')
    return (
      <div dangerouslySetInnerHTML={{ __html: settings.content as string }} />
    );

  return content.entityMap ? (
    <DraftEditor {...this.props} />
  ) : (
    <SlateEditor {...this.props} content={settings.content} readOnly />
  );
};

export default Content;
