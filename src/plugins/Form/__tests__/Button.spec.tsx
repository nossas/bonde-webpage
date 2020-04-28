import React from 'react';
import { render } from 'enzyme';
import { Button } from '../components';

describe('A suite', function() {
  const buttonText = 'Enviar';

  it('should render to static HTML', function() {
    expect(render(<Button buttonText={buttonText} />).text()).toEqual('Enviar');
  });
});
