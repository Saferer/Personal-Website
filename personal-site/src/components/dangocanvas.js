import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import { Circle, Square } from "../scripts/objects"

class DangoCanvas extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.oldTime = 0
    this.gameObjects = []
    this.width = 1920
    this.height = 1080
  }

  drawBackground = ctx => {
    ctx.clearRect(0, 0, this.width, this.height)
    // ctx.fillStyle = "#54b9e8"
    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  draw = ctx => {
    this.drawBackground(ctx)
  }

  detectCollisions = () => {
    let obj1
    let obj2

    for (let i = 0; i < this.gameObjects.length; i++) {
      this.gameObjects[i].isColliding = false
    }

    for (let i = 0; i < this.gameObjects.length; i++) {
      obj1 = this.gameObjects[i]
      for (let j = i + 1; j < this.gameObjects.length; j++) {
        obj2 = this.gameObjects[j]

        // Compare object1 with object2
        if (obj1.circleIntersect(obj2)) {
          obj1.isColliding = true
          obj2.isColliding = true
          let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y }
          let distance = Math.sqrt(
            (obj2.x - obj1.x) * (obj2.x - obj1.x) +
              (obj2.y - obj1.y) * (obj2.y - obj1.y)
          )
          let vCollisionNorm = {
            x: vCollision.x / distance,
            y: vCollision.y / distance,
          }
          let vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy }
          let speed =
            vRelativeVelocity.x * vCollisionNorm.x +
            vRelativeVelocity.y * vCollisionNorm.y
          if (speed < 0) {
            break
          }
          obj1.vx -= speed * vCollisionNorm.x
          obj1.vy -= speed * vCollisionNorm.y
          obj2.vx += speed * vCollisionNorm.x
          obj2.vy += speed * vCollisionNorm.y
        }
      }
    }
  }

  detectEdgeCollisions = () => {
    const canvasWidth = this.width
    const canvasHeight = this.height

    // Set a restitution, a lower value will lose more energy when colliding
    const restitution = 1

    let obj
    for (let i = 0; i < this.gameObjects.length; i++) {
      obj = this.gameObjects[i]

      // Check for left and right
      if (obj.x < obj.radius) {
        obj.vx = Math.abs(obj.vx) * restitution
        obj.x = obj.radius
      } else if (obj.x > canvasWidth - obj.radius) {
        obj.vx = -Math.abs(obj.vx) * restitution
        obj.x = canvasWidth - obj.radius
      }

      // Check for bottom and top
      if (obj.y < obj.radius) {
        obj.vy = Math.abs(obj.vy) * restitution
        obj.y = obj.radius
      } else if (obj.y > canvasHeight - obj.radius) {
        obj.vy = -Math.abs(obj.vy) * restitution
        obj.y = canvasHeight - obj.radius
      }
    }
  }
  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
  }

  createWorld = context => {
    for (let i = 0; i < 100; i++) {
      this.gameObjects.push(
        new Circle(
          context,
          this.getRndInteger(0, this.width),
          this.getRndInteger(0, this.height),
          this.getRndInteger(0, 100),
          this.getRndInteger(0, 100)
        )
      )
    }
  }

  componentDidMount = () => {
    const canvas = this.canvasRef.current
    const context = canvas.getContext("2d")
    this.createWorld(context)
    let animationFrameId
    this.oldTime = Date.now()

    //Our draw came here
    const render = () => {
      const currTime = Date.now()
      let timePassed = (currTime - this.oldTime) / 1000
      this.oldTime = currTime
      this.detectEdgeCollisions()
      this.detectCollisions()
      this.draw(context)
      this.gameObjects.forEach(obj => {
        obj.update(timePassed)
        obj.draw()
      })
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }

  render = () => {
    return (
      <Row className="justify-content-center">
        <canvas ref={this.canvasRef} width={this.width} height={this.height} />
      </Row>
    )
  }
}

export default DangoCanvas
