import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import Theme from '../config/Theme';

export const Button = ({
  children,
  onClick,
  disabled,
  loading,
  primary = false,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      {...props}
      style={[
        styles.btnBase,
        primary ? styles.btnPrimary : styles.btnSecondary,
        style,
        disabled && styles.btnDisabled,
      ]}>
      <Text style={primary ? styles.btnPrimaryText : styles.btnSecondaryText}>
        {loading ? <ActivityIndicator animating={loading} /> : children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnBase: {
    width: '100%',
    marginTop: 12,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: Theme.primary,
  },
  btnDisabled: {
    backgroundColor: Theme.gray,
  },
  btnPrimaryText: {
    color: Theme.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnSecondary: {
    backgroundColor: Theme.gray,
  },
  btnSecondaryText: {
    color: Theme.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Button;
