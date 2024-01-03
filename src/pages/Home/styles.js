import styled, { css } from 'styled-components';

export const HomeContainer = styled.main`
  min-height: calc(100vh - 110px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  gap: 2rem;
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

export const TeamsContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;

  .teams-presentation {
    width: 100%;
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    justify-content: center;
    justify-items: center;
    gap: 1rem;
    list-style: none;
  }

  #container {
    margin-left: -155px;
    width: 100%;
  }
`;

export const Team = styled.div`
  width: 100%;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${(props) => props.theme['white']};
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;

  .information {
    display: flex;
    flex-direction: column;

    h2 {
      max-width: 12rem;
      font-size: 1.5rem;
      color: ${(props) => props.theme['black-f']};
    }

    .stats {
      display: flex;
      font-size: 0.8rem;
      gap: 0.5rem;

      ul {
        list-style: none;

        .card {
          display: flex;
          margin-top: .3rem;
          gap: .2rem;

          img {
            width: .7rem;
          }
        }

        span {
          color: ${(props) => props.theme['gray-600']};
        }
      }
    }
  }

  .cast {
    padding-top: 0.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    img {
      width: clamp(3vw, 4.5rem, 25vw);
    }

    a {
      color: ${(props) => props.theme['green-300']};
    }
  }
`;

export const FilterContainer = styled.section`
  width: 100%;
  min-height: 6rem;
  border-radius: 15px;
  background-color: ${(props) => props.theme['white']};
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;

  .container-context {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    h1 {
      color: ${(props) => props.theme['black-f']};
    }
  }

  .container-league-logo img {
    margin: .4rem 0;
    width: clamp(5vw, 5rem, 22vw);
    display: grid;
    place-items: center;
    border-radius: 1pc;
    border: 2px solid ${(props) => props.theme['gray-500']};;
  }

  ${({ responsive }) => responsive === 'false' && css`
    gap: 1rem;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .container-context {
      padding-left: 1rem;

      h1 {
        margin-bottom: .3rem;
      }
    }

    .container-league-logo img {
      display: none;
    }
  `};
`;

export const ContainerHeader = styled.div`
    display: inline-flex;
    align-items: center;
    padding-left: 20px;
    gap: 0.3rem;

    h1 {
      font-size: clamp(1vw, 1.2rem, 7vw);
      color: ${(props) => props.theme['green-300']};
    }
`;
