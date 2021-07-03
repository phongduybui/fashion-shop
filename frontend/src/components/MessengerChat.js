import React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const MessengerChat = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    target: window ? window : undefined,
    threshold: 350,
  });

  return (
    trigger && (
      <MessengerCustomerChat
        pageId='100181122341499'
        appId='1232387687186692'
        themeColor='#F50057'
        minimized={true}
      />
    )
  );
};

export default MessengerChat;
