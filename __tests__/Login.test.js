/* 
    Jest Tests for Login screen
*/
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../app/screens/Login';


test('Given Login screen, screen renders correctly', () => {
    const screen = renderer.create(<Login />).toJSON();
    expect(screen).toMatchSnapshot();
});
