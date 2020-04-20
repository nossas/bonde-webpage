import React from 'react';
// import { injectIntl, intlShape } from 'react-intl';
// TODO: should remove EditorOld??
import { DraftEditor, SlateEditor } from './components';
import { checkToParse } from '../../utils';

type Props = {
  mobilization: Record<any, any>;
  widget: {
    settings: {
      content: string | Record<any, any>;
    };
  };
  readOnly: boolean;
  handleSave: Function;
  handleDelete: (event: any) => void;
};

const Content = ({ widget: { settings }, ...props }: Props) => {
  const content = checkToParse(settings.content);
  if (typeof content === 'string')
    return (
      <div dangerouslySetInnerHTML={{ __html: settings.content as string }} />
    );

  return content.entityMap ? (
    <DraftEditor {...props} settings={settings} />
  ) : (
    <SlateEditor {...props} content={settings.content} />
  );
};

export default Content;
