const flexMixin = (
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  flexDirection = 'row',
  flexWrap = 'nowrap'
) => ({
  display: 'flex',
  flexDirection,
  justifyContent,
  alignItems,
  flexWrap,
});

const centerFlex = (flexFlow = 'row nowrap') => ({
  display: 'flex',
  flexFlow,
  justifyContent: 'center',
  alignItems: 'center',
});

const textOverflowEllipse = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const textClamp = (lineClamp) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: lineClamp,
});

export { flexMixin, centerFlex, textOverflowEllipse, textClamp };
