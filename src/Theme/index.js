import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components'
import styled from 'styled-components'
import { Text } from 'rebass'

export default function ThemeProvider({ children }) {
  return <StyledComponentsThemeProvider theme={theme(true)}>{children}</StyledComponentsThemeProvider>
}

const theme = (darkMode = true, color) => ({
  customColor: color,
  textColor: darkMode ? color : 'black',

  panelColor: darkMode ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0)',
  backgroundColor: darkMode ? '#212429' : '#FFFFFF',

  uniswapPink: darkMode ? '#ff007a' : 'black',

  concreteGray: darkMode ? '#292C2F' : '#FAFAFA',
  inputBackground: darkMode ? '#1F1F1F' : '#FAFAFA',
  shadowColor: darkMode ? '#000' : '#2F80ED',
  mercuryGray: darkMode ? '#333333' : '#E1E1E1',

  text1: darkMode ? '#FFFFFF' : '#000000',
  text2: darkMode ? '#C3C5CB' : '#565A69',
  text3: darkMode ? '#6C7284' : '#888D9B',
  text4: darkMode ? '#565A69' : '#C3C5CB',
  text5: darkMode ? '#2C2F36' : '#EDEEF2',

  // backgrounds / greys
  bg1: darkMode ? '#212429' : '#FFFFFF',
  bg2: darkMode ? '#2C2F36' : '#F7F8FA',
  bg3: darkMode ? '#40444F' : '#EDEEF2',
  bg4: darkMode ? '#565A69' : '#CED0D9',
  bg5: darkMode ? '#565A69' : '#888D9B',

  //specialty colors
  modalBG: darkMode ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.6)',
  advancedBG: darkMode ? 'rgba(255, 255, 255, 0.2);' : 'rgba(255,255,255,0.6)',

  //primary colors
  primary1: darkMode ? '#2172E5' : '#ff007a',
  primary2: darkMode ? '#3680E7' : '#FF8CC3',
  primary3: darkMode ? '#4D8FEA' : '#FF99C9',
  primary4: darkMode ? '#376bad70' : '#F6DDE8',
  primary5: darkMode ? '#153d6f70' : '#FDEAF1',

  // color text
  primaryText1: darkMode ? '#6da8ff' : '#ff007a',

  // secondary colors
  secondary1: darkMode ? '#2172E5' : '#ff007a',
  secondary2: darkMode ? '#17000b26' : '#F6DDE8',
  secondary3: darkMode ? '#17000b26' : '#FDEAF1',

  // other
  red1: '#FF6871',
  green1: '#27AE60',
  yellow1: '#FFE270',
  yellow2: '#F3841E',
  pink: '#ff007a',

  background: 'black'
})

const TextWrapper = styled(Text)`
  color: 'white';
  color: ${({ color, theme }) => color && theme[color]};
`

export const TYPE = {
  main(props) {
    return <TextWrapper fontWeight={500} color={props.color} {...props} />
  },
  pink(props) {
    return <TextWrapper fontWeight={500} color={'#ff007a'} {...props} />
  }
}

export const Hover = styled.div`
  :hover {
    cursor: pointer;
  }
`

export const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;
  :hover {
    text-decoration: none;
  }
  :focus {
    outline: none;
    text-decoration: none;
  }
  :active {
    text-decoration: none;
  }
`

export const ThemedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1000px;
  max-width: 100vw !important;
  width: 100vw !important;
  z-index: -1;
  background: ${({ backgroundColor }) =>
    `linear-gradient(180deg, ${backgroundColor} 0%, rgba(255, 255, 255, 0) 100%);`};
`

export const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');
  html { font-family: 'Inter', sans-serif; }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }
  
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 14px;    
    color: white;
  }

  body > div {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    color: 'white'
  } 

  a {
    text-decoration: none;

    :hover {
      text-decoration: none
    }
  }

  html {
    font-size: 1rem;
    font-variant: none;
    color: 'white';
    background-color: ${({ theme }) => theme.backgroundColor};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`
