import styled from 'styled-components/native';

interface ButtonProps {
  backgroundColor?: string;
  width?: string;
  disabled?: boolean;
}

interface RoundedProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const StyledButton = styled.Pressable<ButtonProps>`
  background-color: ${props =>
    props.disabled
      ? props.theme.palette.common.gray6
      : props.backgroundColor ?? props.theme.palette.common.blue};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  width: ${props => props.width ?? 'auto'};
  flex-direction: row;
  gap: 8px;
  max-height: 40px;
`;

export const StyledRoundCtaButton = styled(StyledButton)<RoundedProps>`
  height: ${props => props.height ?? '40px'};
  border-radius: ${props => props.borderRadius ?? '24px'};
  opacity: ${props => (props.disabled ? 0.8 : 1)};
  width: ${props => props.width ?? 'auto'};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
