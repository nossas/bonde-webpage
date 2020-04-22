import React from 'react';
// import { injectIntl, intlShape } from 'react-intl';
// TODO: should remove EditorOld??
import { DraftEditor, SlateEditor } from './components';

type Props = {
  mobilization: Record<any, any>;
  widget: {
    id: number;
    settings: {
      content: string | Record<any, any>;
    };
  };
  editable?: boolean;
  handleSave: any;
  handleDelete: any;
};

const Content = ({ widget: { id, settings }, ...props }: Props) => {
  console.log('************************************');
  console.log('ContentWidget', { id });
  let content = settings.content;
  if (typeof content === 'string') {
    try {
      content = JSON.parse(content);
      console.log('ContentWidget parse to object', { content });
    } catch (e) {
      console.log('ContentWidget render HTML', { content });
      // HTML only
      return <div dangerouslySetInnerHTML={{ __html: content as string }} />;
    }
  }

  if ((content as Record<any, any>).entityMap) {
    console.log('ContentWidget render DraftEditor', { content });
    return (
      <DraftEditor {...props} readOnly={!props.editable} settings={settings} />
    );
  }

  console.log('ContentWidget render SlateEditor', { content });
  return (
    <SlateEditor {...props} readOnly={!props.editable} content={content} />
  );
};

export default Content;
