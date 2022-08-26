import { Container } from './styles';

interface FormGroupProps {
  children: React.ReactNode;
  error?: any
}

export default function FormGroup ({children, error = null}: FormGroupProps) {
  return (
    <Container>
      {children}
      {error && <small>{error}</small>}
    </Container>
  )
}
