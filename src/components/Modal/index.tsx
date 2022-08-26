import ReactDOM from "react-dom";
import { Container, Overlay, Footer } from "./styles";
import { Button } from "../Button";
import { ReactNode } from "react";

interface ModalProps {
  title: string;
  danger: boolean;
  cancelLabel?: string;
  confirmLabel: string;
  children: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  show: boolean;
  isLoading: boolean;
}

export default function Modal({
  title,
  danger = false,
  children,
  cancelLabel = "Cancelar",
  confirmLabel,
  onConfirm,
  onCancel,
  show,
  isLoading = false
}: ModalProps) {
  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>
        <div className="modal-body">{children}</div>

        <Footer>
          <button type="button" className="cancel-button" onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </button>
          <Button type="button" danger={danger} onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById("modal-root") as HTMLElement
  );
}
