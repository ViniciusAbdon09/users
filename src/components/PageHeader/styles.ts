import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${({theme}) => theme.colors.primary.main};
    font-weight: bold;
    font-family: 'Sora';

    #arrowLeft {
      margin-right: 8px;
    }
  }

  h1 {
    font-size: 24px;
    margin-top: 8px;
  }
`;
