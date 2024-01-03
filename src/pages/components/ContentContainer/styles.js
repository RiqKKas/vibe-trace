import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	max-width: 1280px;
  /* height: calc(100% - 70px); */
	padding: 1rem;
	margin: 0 auto;

  #subTitle {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #subTitle h1 {
    width: 430px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: ${(props) => props.theme['white']};
    border-radius: 1rem;
    padding: 1rem;
  }
`;
