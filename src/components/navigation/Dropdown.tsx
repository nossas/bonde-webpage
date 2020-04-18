import React, { useState } from 'react';
import { array, object, string } from 'prop-types';
import { BarsIcon } from '../../icons';

const DropdownMenu = (props: any) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  const handleOverlayClick = () => setOpen(false);

  const renderIcon = () => (!props.icon ? null : <BarsIcon />);

  const renderOverlay = () => {
    return !open ? null : (
      <div
        className="overlay fixed top-0 right-0 bottom-0 left-0 z1"
        onClick={handleOverlayClick}
      />
    );
  };

  const renderChildren = () => {
    return props.children.map((child: any, index: any) => {
      const props =
        child.type !== 'div' ? { onItemClick: handleOverlayClick } : {};
      return React.cloneElement(child, {
        key: 'item-' + index,
        ...props,
      });
    });
  };

  const {
    wrapperClassName,
    buttonClassName,
    menuClassName,
    menuStyle,
    text,
    children,
  } = props;

  return (
    <div
      style={{ marginTop: '5px' }}
      className={`relative ${wrapperClassName}`}
    >
      <button type="button" className={buttonClassName} onClick={handleClick}>
        {renderIcon()} {text}
      </button>
      <div
        className={`absolute nowrap z2' ${menuClassName} ${
          open ? '' : 'display-none'
        }`}
        style={menuStyle}
      >
        {children.length > 0 && renderChildren()}
      </div>
      {renderOverlay()}
    </div>
  );
};

DropdownMenu.propTypes = {
  className: string,
  menuClassName: string,
  menuStyle: object,
  wrapperClassName: string,
  buttonClassName: string,
  text: string,
  children: array,
  icon: string,
};

export default DropdownMenu;
