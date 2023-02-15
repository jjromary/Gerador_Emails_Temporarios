import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${(props) => props.theme["white"]};
        color: ${(props) => props.theme["gray900"]};
        -webkit-font-smoothing: antialiased;
    }

    body, input, text-area, button, span {
        font: 400 1rem Poppins, sans-serif;
    }

    button{
        cursor: pointer;
    }
`;
