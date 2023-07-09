import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

body {
  background-color: #263238;
  color: #E1F5FE;
}

h1,h2,h3,h4,h5,h6,p {
    margin: 0;
  }

ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

button {
  cursor: pointer;
  font-family: inherit;
}

label {
  cursor: pointer;
}
`;
