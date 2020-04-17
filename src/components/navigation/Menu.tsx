import { array, bool, func } from 'prop-types';
import React from 'react';

// Dependency modules
import Dropdown from './Dropdown';
import MenuItem from './MenuItem';
/*import { NavbarEditionWrapper } from '@/components/navigation/navbar'*/

const Menu = ({ blocks, mobile, linkTo }: any) => {
  const items = blocks.map((b: any) => (
    <div key={b.id} className={!mobile ? 'menu-item inline-block' : ''}>
      <MenuItem anchor={linkTo(b)} hidden={b.menu_hidden}>
        <p>{b.name || `Block ${b.position}`}</p>
      </MenuItem>
    </div>
  ));

  return !mobile ? (
    <div className="lg-show center">
      <div className="bg-darken-4">{items}</div>
    </div>
  ) : (
    <div className="lg-hide">
      <Dropdown
        wrapperClassName="absolute right-0 top-0 m1"
        buttonClassName="btn bg-darken-4 white rounded"
        menuClassName="rounded bg-darken-4 white top-0 right-0"
        menuStyle={{ marginTop: '40px' }}
        icon="bars"
      >
        {items}
      </Dropdown>
    </div>
  );
};

Menu.defaultProps = {
  mobile: false,
};

Menu.propTypes = {
  linkTo: func.isRequired,
  blocks: array.isRequired,
  mobile: bool,
};

export default Menu;
