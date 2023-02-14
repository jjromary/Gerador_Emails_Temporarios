import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.875rem;

  @media (min-width: 768px) {
    width: 768px;
  }
`;

export const Header = styled.header`
  margin: 2rem;
`;
export const FieldContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  label {
    width: 100%;
    font-size: 14px;
    padding-left: 0.5rem;

    @media (min-width: 640px) {
      font-size: 1rem;
    }
  }
`;

export const ProvisoryContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme["skyeblue"]};

  input {
    width: 70%;
    border: none;
    padding-left: 0.5rem;
    font-size: 0.75rem;

    :focus {
      outline: 0;
    }

    @media (min-width: 640px) {
      font-size: 1rem;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    width: 30%;
    border: none;
    border-left: 1px solid ${(props) => props.theme["gray100"]};
    background: transparent;
    height: 30px;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export const UpdateDataContainer = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 3rem;

  @media (min-width: 640px) {
    width: 50%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    border: none;
    background: transparent;
  }
`;
