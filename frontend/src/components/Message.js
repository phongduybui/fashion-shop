import Alert from '@material-ui/lab/Alert';
import React from 'react';

const Message = ({ severity, children, mt, mb, ml, mr, m }) => {
  return (
    <Alert
      style={{
        margin: m ? m : 0,
        marginTop: mt,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        width: '100%',
      }}
      severity={severity}
    >
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  severity: 'error',
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
};

export default Message;
