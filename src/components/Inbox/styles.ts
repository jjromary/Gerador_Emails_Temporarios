import styled from "styled-components";

export const InboxContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  border-top: none;
  border: 1px solid ${(props) => props.theme["skyeblue"]};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 9px;
`;

export const InboxList = styled.div`
  width: 40%;
`;

export const InboxHeader = styled.div`
  padding-left: 2px;
  height: 28px;
  border-bottom: 1px solid ${(props) => props.theme["skyeblue"]};
`;

export const BodyEmailHeader = styled.div`
  height: 28px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme["skyeblue"]};
`;

export const BodyEmail = styled.div`
  height: 600px;
  border-left: 1px solid ${(props) => props.theme["skyeblue"]};
  background-color: ${(props) => props.theme["blue50"]};
  border-radius: 8px;
`;

export const BodyEmailContent = styled.div`
  padding: 0.2rem;
`;

export const EmailTitle = styled.div`
  font-size: 0.75rem;
  border: none;

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

export const EmailText = styled.div`
  height: 500px;
  padding: 5px 0 0 2px;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  border-radius: 8px;
  overflow: auto;
  background-color: ${(props) => props.theme["white"]};

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;
