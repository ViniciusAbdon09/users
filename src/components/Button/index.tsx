import { StyledButton } from './styles';

interface ButtonProps {
  isLoading?: boolean;
  type: "button" | "submit" | "reset" | undefined
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({disabled = false, isLoading = false, type = 'button', danger = false, children, onClick}: ButtonProps) => {
  return (
    <StyledButton type={type} disabled={disabled || isLoading} danger={danger} onClick={onClick}>
      {isLoading ? 'Carregando...' :children}
    </StyledButton>
  );

}
