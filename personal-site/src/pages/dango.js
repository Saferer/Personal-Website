import React from "react"
import PageContainer from "../components/page"
import DangoCanvas from "../components/dangocanvas"

export default class About extends React.Component {
  render() {
    return (
      <PageContainer>
        <DangoCanvas width={600} height={1000}></DangoCanvas>
      </PageContainer>
    )
  }
}
