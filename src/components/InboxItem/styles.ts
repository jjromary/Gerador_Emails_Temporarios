import styled from "styled-components";

export const ImboxItemContainer = styled.div`
  button {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 2px;
    font-size: 0.75rem;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme["gray300"]};
    background: transparent;

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
  }
`;
