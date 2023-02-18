import styled from "styled-components";

export const ImboxItemContainer = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 5px;
  font-size: 0.75rem;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme["gray300"]};
  background: transparent;

  :focus {
    background: ${(props) => props.theme["gray100"]};
  }

  @media (min-width: 640px) {
    font-size: 1rem;
  }

  span {
    max-width: 110px;
    font-size: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 640px) {
      font-size: 1rem;
      max-width: 200px;
    }
  }
`;
