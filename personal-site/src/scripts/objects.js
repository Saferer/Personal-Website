export class GameObject {
  constructor(ctx, x, y) {
    this.context = ctx
    this.x = x
    this.y = y
  }

  draw = () => {}

  update = () => {}
}

export class RigidBody extends GameObject {
  constructor(ctx, x, y, vx, vy) {
    super(ctx, x, y)
    this.vx = vx
    this.vy = vy

    this.isColliding = false
  }

  move = secondsPassed => {
    this.x += this.vx * secondsPassed
    this.y += this.vy * secondsPassed
  }
}

export class Square extends RigidBody {
  constructor(ctx, x, y, vx, vy, w = 50, h = 50) {
    super(ctx, x, y, vx, vy)
    this.width = w
    this.height = h
  }

  draw = () => {
    this.context.fillStyle = this.isColliding ? "#ff8000" : "#0099b0"
    this.context.fillRect(this.x, this.y, this.width, this.height)
  }

  update = secondsPassed => {
    this.move(secondsPassed)
  }
}

export class Circle extends RigidBody {
  constructor(ctx, x, y, vx, vy, r = 25) {
    super(ctx, x, y, vx, vy)
    this.radius = r
  }

  draw = () => {
    this.context.beginPath()
    this.context.fillStyle = this.isColliding ? "#ff8000" : "#0099b0"
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    this.context.fill()
  }

  update = secondsPassed => {
    this.move(secondsPassed)
  }

  circleIntersect = otherCircle => {
    let squareDistance =
      (this.x - otherCircle.x) * (this.x - otherCircle.x) +
      (this.y - otherCircle.y) * (this.y - otherCircle.y)
    return (
      squareDistance <=
      (this.radius + otherCircle.radius) * (this.radius + otherCircle.radius)
    )
  }
}
