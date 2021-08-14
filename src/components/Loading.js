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
`

const Logo = styled.img `
    width: 300px;
    height: 300px;
`


export function Loading () {
    return (
        <LoadingScreen>
            <div>
                <Logo src="logo.png" alt="logo"/>
            </div>
        </LoadingScreen>
    )

}