import React from 'react';
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

const Content = ({ widget: { settings }, ...props }: Props) => {
  console.log("Content render >>>", { DraftEditor, SlateEditor })
  let content = settings.content;
  if (typeof content === 'string') {
    try {
      content = JSON.parse(content);
    } catch (e) {
      console.log("Render HTML Only >>>")
      // HTML only
      return <div dangerouslySetInnerHTML={{ __html: content as string }} />;
    }
  }

  if ((content as Record<any, any>).entityMap) {
    console.log("Render DraftEditor >>>")
    return (
      <DraftEditor {...props} readOnly={!props.editable} settings={settings} />
    );
  }

  console.log("Render SlateEditor >>>")
  return (
    <SlateEditor {...props} readOnly={!props.editable} content={content} />
  );
};

export default Content;
