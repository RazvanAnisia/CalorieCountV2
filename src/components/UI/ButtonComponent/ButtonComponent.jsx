import React from 'react';
import Button from '@material-ui/core/Button';

export default function ButtonComponent(props) {
  const { bIsCircle } = props;
  return <Button {...props} />;
}
