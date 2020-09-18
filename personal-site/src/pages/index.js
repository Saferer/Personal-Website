import React from "react"
import PageContainer from "../components/page"
import Card from "../components/card"
import { Row, Col, Container } from "react-bootstrap"
import Blu from "../img/Blu.png"
import DisLogo from "../img/DiscordLogo.svg"
import SteamLogo from "../img/SteamLogo.svg"
import GithubLogo from "../img/GithubLogo.svg"

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <PageContainer>
        <Container fluid style={{ padding: 0, marginTop: "20px" }}>
          <Row className="justify-content-center">
            <Col md="10">
              <img src={Blu} className="profile" />
            </Col>
          </Row>
          <Row className="justify-content-center social-icon-container">
            <a href="https://discordapp.com/users/134137594928693248">
              <img src={DisLogo} className="social-icon" />
            </a>
            <a href="https://github.com/saferer">
              <img src={GithubLogo} className="social-icon" />
            </a>
            <a href="https://steamcommunity.com/id/saferer/">
              <img src={SteamLogo} className="social-icon" />
            </a>
          </Row>
        </Container>
      </PageContainer>
    )
  }
}
