import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Importação da fonte Roboto */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  body, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif; /* Aplica a fonte a todo o body */
    background-color: #212226; /* Fundo branco geral, se for o caso */
  }
  * {
    box-sizing: border-box;
  }
  /* Estilos para links que atuam como botões, para remover o sublinhado padrão */
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;