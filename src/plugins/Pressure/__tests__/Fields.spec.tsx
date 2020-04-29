import React from 'react';
import { shallow } from 'enzyme';
import Fields from '../components/Form/Fields';

describe('Pressure Form Fields', function() {
  const fields = [
    {
      label: 'First name',
      name: 'firstName',
      placeholder: 'First name',
      disabled: false,
      type: 'text',
    },
    {
      label: 'Email',
      name: 'email',
      placeholder: 'Email',
      disabled: false,
      type: 'email',
    },
  ];

  it('should render button', () => {
    const wrapper = shallow(<Fields fields={fields} />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should default render is InputField', () => {
    const wrapper = shallow(<Fields fields={fields} />);

    expect(wrapper.find('InputField').length).toEqual(2);
  });

  it('should render TextareaField when type is textarea', () => {
    const textareaInput = {
      label: 'About',
      name: 'about',
      placeholder: 'About',
      disabled: false,
      type: 'textarea',
    };
    const wrapper = shallow(<Fields fields={[textareaInput]} />);

    expect(wrapper.find('TextareaField').length).toEqual(1);
  });

  it('should pass props to Field', () => {
    const textareaInput = {
      label: 'About',
      name: 'about',
      placeholder: 'About',
      disabled: false,
    };
    const textInput = {
      label: 'Name',
      name: 'name',
      placeholder: 'Name',
      disabled: true,
      type: 'text',
      extraProps: { dummy: true },
    };
    const wrapper = shallow(
      <Fields fields={[{ ...textareaInput, type: 'textarea' }, textInput]} />
    );

    expect(wrapper.find('TextareaField').props()).toStrictEqual(textareaInput);
    expect(wrapper.find('InputField').props()).toStrictEqual(textInput);
  });
});
