import React from 'react';
import { shallow } from 'enzyme';
import Form from '../components/Form';
import EmailFields from '../Email/EmailFields';

describe('Pressure Form', function() {
  const widget = {
    id: 1,
    count: 0,
    settings: {
      title_text: 'Form Title',
      button_text: 'Send form',
      pressure_subject: 'Pressure Subject',
      pressure_body: 'Pressure Body',
      targets: 'Target 1 <target1@test.org>;Target 2 <target1@test.org>;',
      show_city: false,
      main_color: '#f08585',
    },
  };

  const targetList = [
    'Viviane <viviane@gmail.com>',
    'Camila <caamila@gmail.com>',
    'Lucas <lucas@gmail.com>',
    'Meire <teste@gmail.com',
    'Teste <testes2@gmail.com',
  ];

  const props = {
    onSubmit: () => 'onSubmit',
    widget,
    saving: false,
    BeforeStandardFields: () => EmailFields.before(targetList),
    AfterStandardFields: () => EmailFields.after(true),
  };

  it('should render form', () => {
    const wrapper = shallow(<Form {...props} />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render button text when not submitting or saving form', () => {
    const wrapper = shallow(<Form {...props} />)
      .find('ConnectedForm')
      .renderProp<any>('children')({ submitting: false });

    expect(wrapper.find('Button[type="submit"]').length).toEqual(1);
    expect(wrapper.find('Button').props().children).toEqual(
      widget.settings.button_text
    );
  });

  it('should render button "Enviando..." when saving form', () => {
    const wrapper = shallow(<Form {...props} saving={true} />)
      .find('ConnectedForm')
      .renderProp<any>('children')({ submitting: false });

    expect(wrapper.find('Button[type="submit"]').length).toEqual(1);
    expect(wrapper.find('Button').props().children).toEqual('Enviando...');
  });

  it('should render button "Enviando..." when submitting form', () => {
    const wrapper = shallow(<Form {...props} />)
      .find('ConnectedForm')
      .renderProp<any>('children')({ submitting: true });

    expect(wrapper.find('Button[type="submit"]').length).toEqual(1);
    expect(wrapper.find('Button').props().children).toEqual('Enviando...');
  });

  it('should render noTargetsError if passed', () => {
    const noTargetsError = 'select any target to continue';
    const wrapper = shallow(<Form {...props} noTargetsError={noTargetsError} />)
      .find('ConnectedForm')
      .renderProp<any>('children')({ submitting: false });

    const error = wrapper.find('Raise') as any;

    expect(error.props().message).toEqual(noTargetsError);
  });

  it('should pass onSubmit and initialValues to ConnectedForm', () => {
    const wrapper = shallow(<Form {...props} />);
    expect(wrapper.find('ConnectedForm').prop('initialValues')).toStrictEqual({
      subject: widget.settings.pressure_subject,
      body: widget.settings.pressure_body,
    });
    expect(wrapper.find('ConnectedForm').prop('onSubmit')).toEqual(
      props.onSubmit
    );
  });

  it('should render essential fields', () => {
    const wrapper = shallow(<Form {...props} />)
      .find('ConnectedForm')
      .renderProp<any>('children')({ submitting: false });

    expect(wrapper.find('InputField[name="name"]').length).toEqual(1);
    expect(wrapper.find('InputField[name="lastname"]').length).toEqual(1);
  });
});
