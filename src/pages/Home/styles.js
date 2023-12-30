import styled from 'styled-components';

export const HomeContainer = styled.main`
  min-height: calc(100vh - 110px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 6;

  h2 {
    color: ${(props) => props.theme['white']};
    font-size: 2.3rem;
  }

  p {
    text-align: center;
    font-size: 1.1rem;
    color: ${(props) => props.theme['white']};
  }
`;
