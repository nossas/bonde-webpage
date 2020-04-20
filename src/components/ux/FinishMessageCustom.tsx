import React from 'react';
import PropTypes from 'prop-types';
import DraftEditor from '../../plugins/Content/components/DraftEditor';
import SlateEditor from '../../plugins/Content/components/SlateEditor';

import { checkToParse } from '../../utils';

const FinishMessageCustom = ({ readOnly, widget: { settings } }: any) => {
  const {
    finish_message: finishMessage,
    finish_message_background: finishMessageBackground,
  } = settings;

  const content = checkToParse(finishMessage);

  return content.entityMap ? (
    <DraftEditor
      readOnly={readOnly}
      value={content}
      editorStyle={{
        backgroundColor: `rgba(${finishMessageBackground})`,
        borderRadius: 3,
      }}
    />
  ) : (
    <SlateEditor
      content={finishMessage}
      readOnly={readOnly}
      contentStyles={{ backgroundColor: '#fff', color: '#666', padding: 10 }}
    />
  );
};

//
// PropTypes
//
FinishMessageCustom.propTypes = {
  widget: PropTypes.shape({
    settings: PropTypes.shape({
      finish_message: PropTypes.string.isRequired,
      finish_message_background: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  readOnly: PropTypes.bool,
};

FinishMessageCustom.defaultProps = {
  readOnly: true,
};

export default FinishMessageCustom;
