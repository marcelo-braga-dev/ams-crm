import { styled } from '@mui/material/styles';

const LabelWrapper = styled('span')(
  ({ theme }) => `
      background-color: black;
      padding: 1px 2px};
      font-size: 13px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      max-height: 3px;

      &.MuiLabel {
        &-primary {
          background-color: white;
          color: white
        }

        &-black {
          background-color: white;
          color: white;
        }

        &-secondary {
          background-color: white;
          color: white
        }

        &-success {
          background-color: white;
          color: white
        }

        &-warning {
          background-color: white;
          color: white
        }

        &-error {
          background-color: white;
          color: white
        }

        &-info {
          background-color: white;
          color: white
        }
      }
`
);

const Label = ({ className, color = 'secondary', children, ...rest }) => {
  return (
    <LabelWrapper className={'MuiLabel-' + color} {...rest}>
      {children}
    </LabelWrapper>
  );
};

export default Label;
