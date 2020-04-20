import React from 'react';
import Dropdown from './Dropdown';
import MenuItem from './MenuItem';

const isMobile = () => window.innerWidth < 1024;

interface MenuProps {
  blocks: any[];
  linkTo: Function;
}

const Menu: React.FC<MenuProps> = ({ blocks, linkTo }) => {
  const mobile = isMobile();

  const items = blocks.map((b: any) => (
    <MenuItem key={b.id} anchor={linkTo(b)} hidden={b.menu_hidden}>
      <p>{b.name || `Block ${b.position}`}</p>
    </MenuItem>
  ));

  return !mobile ? (
    <div className="menu bg-darken-4">{items}</div>
  ) : (
    <Dropdown icon="bars">{items}</Dropdown>
  );
};

export default Menu;
