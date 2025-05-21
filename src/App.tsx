import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { Home } from "./components/Home";
import { useRecoilState } from "recoil";
import { ThemeAtoms } from "./Atom";
import { DarkColors, LightColors } from "./modules/theme";

const GlobalStyle = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    font-family: "Noto Sans", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-variation-settings: "wdth" 100;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

const ThemeBtn = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.itemColor};
  border: 2px solid ${(props) => props.theme.itemFocusColor};
  border-radius: 20px;
  position: fixed;
  bottom: 15px;
  right: 15px;
  font-size: 10px;
  font-weight: bold;
`;

function App(){
  const [isDarkTheme, setDarkTheme] = useRecoilState(ThemeAtoms);

  return (
    <>
      <ThemeProvider theme={isDarkTheme ? DarkColors : LightColors}>
        <Home />
        <GlobalStyle />
        <ThemeBtn onClick={() => setDarkTheme((prev: boolean) => !prev)}>{isDarkTheme ? "Dark" : "Light"}</ThemeBtn>
      </ThemeProvider>
    </>
  );
};

export default App;