import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import {EditEmployee} from '../EditEmployee/EditEmployee.component';
import {EmployeesList} from '../EmployeeList/EmployeesList.component';
configure({adapter: new Adapter()});

describe('<App /> Component', () => {
  it('Should render Edit Form', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(EditEmployee).exists()).toBe(true);
  });
  it('Should render Employees List', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(EmployeesList).exists()).toBe(true);
  });
});
