import { Box, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 40,
    '& > .MuiButton-root': {
      borderRadius: 0,
      minWidth: 48,
    },
    '& > .MuiButton-root .MuiButton-startIcon': {
      marginRight: 0,
    },
    '& > input': {
      border: '1px solid rgba(0,0,0,0.1)',
      outline: 'none',
      maxWidth: 60,
      textAlign: 'center',
      fontSize: '16px',
    },
  },
}));

const QuantityInput = () => {
  const [quantity, setQuantity] = useState(1);
  const classes = useStyles();
  const handleInputChange = (e) => {
    let value = Number(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };
  const decreaseQuantity = () => {
    if (quantity >= 2) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <Box display='flex' alignItems='stretch' className={classes.root}>
      <Button
        variant='contained'
        disableElevation
        startIcon={<AiOutlineMinus />}
        onClick={decreaseQuantity}
      />
      <input
        type='text'
        value={Number(quantity)}
        onChange={handleInputChange}
      />
      <Button
        variant='contained'
        disableElevation
        startIcon={<AiOutlinePlus />}
        onClick={() => setQuantity(quantity + 1)}
      />
    </Box>
  );
};

export default QuantityInput;
