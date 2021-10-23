import { createGlobalStyle } from 'styled-components'
import HkGroteskWoff from './hkgrotesk-light-webfont.woff'

export const FontStyles = createGlobalStyle `
    @font-face {
        font-family: 'HkGrotesk Light';
        src: url(${HkGroteskWoff}) format('woff')
    }
`;