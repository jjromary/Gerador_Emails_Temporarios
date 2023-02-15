import styled from "styled-components";

interface ButtonContainerProps {
  width?: string;
  height?: string;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: none;
  background: transparent;
  font-size: 0.75rem;
  cursor: pointer;

  @media (min-width: 640px) {
    font-size: 1rem;
    width: 30%;
  }
`;
