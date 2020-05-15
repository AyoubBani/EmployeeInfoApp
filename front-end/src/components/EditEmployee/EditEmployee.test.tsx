import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  EditEmployee,
  EditFormProps,
  CustomTextField,
  CustomRadionButton,
} from './EditEmployee.component';
import {DEFAULT_EMPLOYEE} from '../App/App';
import {Formik, Field} from 'formik';
import {Button} from '@material-ui/core';
configure({adapter: new Adapter()});

describe('<EditEmployee /> Component', () => {
  const props: EditFormProps = {
    employee: DEFAULT_EMPLOYEE,
    editEmployee: jest.fn(),
  };

  it('Should render Formik Form', () => {
    const wrapper = mount(<EditEmployee {...props} />);
    expect(wrapper.find(Formik).length).toEqual(1);
  });

  it('Should render 3 TextInput in the form', () => {
    const wrapper = mount(<EditEmployee {...props} />);
    expect(wrapper.find(CustomTextField).length).toEqual(3);
  });
  it('Should render Radio Group buttons', () => {
    const wrapper = mount(<EditEmployee {...props} />);
    expect(wrapper.find(CustomRadionButton).length).toEqual(2);
  });
  it('Should render Radio Group buttons', () => {
    const wrapper = mount(<EditEmployee {...props} />);
    expect(wrapper.find(CustomRadionButton).length).toEqual(2);
  });
  it('Should render Select input', () => {
    const wrapper = mount(<EditEmployee {...props} />);
    expect(wrapper.find(Field).length).toEqual(1);
  });

  it('Should render Submit button with in primary style', () => {
    const wrapper = mount(<EditEmployee {...props} />);
    expect(wrapper.find(Button).length).toEqual(1);
    expect(wrapper.find(Button).props().color).toEqual('primary');
  });
});
