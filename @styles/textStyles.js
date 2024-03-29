const textStyles = (props, css) => {
  return `
    color:  ${props.color ? props.color : "#000000"};
    font-size: 16px;
    line-height: ${props.lineHeight ? props.lineHeight : "16px"};
    letter-spacing: 0.2px;
    background-color: transparent;

    ${
      props.inputHeader &&
      `
      color: gray;
      font-size: 12px;
      letter-spacing: 0.9px;
      margin: 0 0 8px;
    `
    };

    ${
      props.h1 &&
      `
      font-size: 28px;
      line-height: 35px;
      text-align: center;
      letter-spacing: 0;
    `
    };

    ${
      props.h2 &&
      `
      font-size: 22px;
      line-height: 22px;
      letter-spacing: -0.24px;
    `
    };

    ${
      props.h3 &&
      `
      font-size: 16px;
      line-height: 16px;
      letter-spacing: 0.5px;
    `
    };

    ${
      props.secondary &&
      `
      line-height: 17px;
      letter-spacing: 0.5px;
      color: gray
    `
    };

   
    ${props.weight && `font-weight: ${props.weight}`};
    ${props.size && `font-size: ${props.size}`};
    ${props.center && `text-align: center`};
    ${props.right && `text-align: right`};
    ${props.marg && `margin: ${props.marg}`};
    ${props.pad && `padding: ${props.pad}`};
    ${props.wid && `width: ${props.wid}`};
    ${props.spacing && `letter-spacing: ${props.spacing}`};
    ${props.textTransform && `text-transform: ${props.textTransform}`};
    ${
      !props.h1 &&
      !props.h2 &&
      !props.h3 &&
      `line-height: ${props.lineHeight || props.size}`
    };
  `;
};

export default textStyles;
