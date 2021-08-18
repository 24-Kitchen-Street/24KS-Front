import React from 'react'
import styled from "styled-components"


const LoadingScreen = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 99999999;
    padding: 40px;
    background-color: #00bfb6;
`

const Logo = styled.img `
    width: 300px;
    height: 300px;
    padding: 0.5rem;
    margin: 0px;
`

const Title = styled.div `
  font-family: 'Libre Baskerville', serif;
`


export function Loading () {
    return (
        <LoadingScreen>
            <div>
                <Logo src="logo.png" alt="logo"/>
            </div>
            <div>
                <Title>Welcome to</Title>
            </div>
            <div>
                <Logo src="cgTextLogo.png" alt="club-geist" />
            </div>
        </LoadingScreen>
    )

}