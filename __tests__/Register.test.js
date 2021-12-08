/* 
    Jest Tests for Register screen
*/
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Register from '../app/screens/Register';


test('Given Register screen, screen renders correctly', () => {
    const screen = renderer.create(<Register />).toJSON();
    expect(screen).toMatchSnapshot();
});
