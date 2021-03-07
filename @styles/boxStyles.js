const boxStyles = (props) => {
  return `
    ${props.marg && `margin: ${props.marg}`};
    ${props.pad && `padding: ${props.pad}`};
    ${props.bg && `background-color: ${props.bg}`};
    ${props.ht && `height: ${props.ht}`};
    ${props.wid && `width: ${props.wid}`};
    ${props.hasRadius && `border-radius: ${props.hasRadius}`};
    ${props.alignSelf && `align-self: ${props.alignSelf}`};
    ${props.border && `border: ${props.border}`};
    ${
      props.centerAll &&
      `
      align-items: center;
      justify-content: center;
    `
    };
    ${
      props.center &&
      `
      justify-content: center;
    `
    };

    ${props.absolute && `position: absolute;`};
    ${props.top && `top: ${props.top};`};
    ${props.bottom && `bottom: ${props.bottom};`};
    ${props.right && `right: ${props.right};`};
    ${props.zIndex && `zIndex: ${props.zIndex};`};
    ${props.flex && `display: flex;`};
  `;
};

export default boxStyles;
