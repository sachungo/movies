import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.React = React;
