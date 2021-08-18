import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    @font-face {
        font-family: 'Font Name';
        src: local('Font Name'), local('FontName');

        font-weight: 300;
        font-style: normal;        
    }
`;

        /* url(${NameOfYourFontWoff2}) format('woff2'),
        url(${NameOfYourFontWoff}) format('woff'); */