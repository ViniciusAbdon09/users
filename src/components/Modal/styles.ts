import styled from "styled-components";

export const Overlay = styled.div`
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(3px);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div<{danger?: boolean}>`
  max-width: 450px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
  margin: 16px;

  > h1 {
    font-size: 22px;
    color: ${({theme, danger}) => {
      return danger ? theme.colors.danger.main : theme.colors.gray[900]
    }}
  }

  .modal-body {
    margin-top: 24px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 32px;

  .cancel-button {
    outline: none;
    border: none;
    background: transparent;
    height: 52px;
    font-size: 16px;
    margin-right: 24px;
    color: ${({theme}) => theme.colors.gray[200]};

    &[disabled] {
      cursor: not-allowed;
    }
  }
`;
