import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
configure({ adapter: new Adapter() });

describe('expect to render card component', () => {
  it('renders without crashing', () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });
});
