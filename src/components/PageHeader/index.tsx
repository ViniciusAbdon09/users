import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { Container } from "./styles";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <Container>
      <Link to="/">
        <FaArrowLeft id="arrowLeft" /> Voltar
      </Link>
      <h1>{title}</h1>
    </Container>
  );
}
