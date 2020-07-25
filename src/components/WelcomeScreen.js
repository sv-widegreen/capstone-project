import React from 'react'
import logoCopperUltralightShadow from '../assets/logoCopperUltralightShadow.svg'
import sewrlyTextLogoShadow from '../assets/sewrlyTextLogoShadow.svg'
import startButtonNoInnerShadow from '../assets/startButtonNoInnerShadow.svg'
import Button from './Button'
import styled from 'styled-components'

export default function WelcomeScreen({ startApp }) {
  return (
    <StyledWelcome>
      <img className="logo" src={logoCopperUltralightShadow} alt="" />
      <img className="textlogo" src={sewrlyTextLogoShadow} alt="Sewrly" />
      <Button
        icon={startButtonNoInnerShadow}
        altText="start"
        onClick={startApp}
      />
      <p>- your trusty sewing planner -</p>
    </StyledWelcome>
  )
}

const StyledWelcome = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-weight: 200;
  color: var(--copper-ultralight);
  background: var(--copper-gradient);
  height: 100%;
  min-height: 100vh;

  .logo {
    margin-top: 50px;
    width: 127px;
    height: 127px;
  }

  .textlogo {
    margin-top: 28px;
    width: 300px;
    height: 173px;
  }

  p {
    padding: 34px 0;
  }

  button,
  button > img {
    width: 114px;
    height: 114px;
  }
`
