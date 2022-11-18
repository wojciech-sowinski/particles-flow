
//config

const particlesCount = 100
const windFieldStrenghtMultiplier = 0.1
const xFieldsCount = 50
const yFieldsCount = 30
const maxParticleSpeed = 1
let fieldWindAngle = 0
let mouseDown = false
let mouseDraw = true
let renderFields = true
const mouseDrawRectWidth = 200
const mouseDrawRectHeight = 200
const initialCanvasBackground='rgb(255,255,255,255)'
const refreshCanvasBackground='rgba(255,255,255,1)'
const fields = []
const particles = []

const mouse ={
    x:0,
    y:0
}

//event listeners
window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    if(mouseDown){
        let fieldsInMouseDrawRect = fields.filter(field=>{
            if(field.xCenter > mouse.x-(mouseDrawRectWidth/2) && field.xCenter < mouse.x+(mouseDrawRectWidth/2)){
                if(field.yCenter > mouse.y-(mouseDrawRectHeight/2) && field.yCenter < mouse.y+(mouseDrawRectHeight/2)){
                    field.color = 'red'
                    field.setfFeldWindAngle()
                }
            }
    })
    }
  });

window.addEventListener('mousedown',()=> mouseDown = true )
window.addEventListener('mouseup',()=> mouseDown = false)

//utils
const angle=(aX,aY,bX,bY)=>{
    const dY = bY - aY
    const dX = bX - aX
    var theta = Math.atan2(dY, dX);
        theta *= 180 / Math.PI;
        if (theta < 0) theta = 360 + theta; 
return theta;
}
const createFields = (xFields,yFields)=>{
    const fieldWidth = canvas.width / xFields
    const fieldHeight = canvas.height / yFields
    let xPos = 0,
    yPos = 0
     const Field = function(xStart,xEnd,yStart,yEnd,vector = 0) {
        this.xStart = xStart
        this.xEnd = xEnd
        this.yStart=yStart
        this.yEnd=yEnd
        this.vector
        this.xCenter = xStart+(xEnd - xStart)/2
        this.yCenter = yStart+(yEnd - yStart)/2
        this.fieldWindAngle = 0
        this.color = 'green'

        this.draw = function(){
            ctx.beginPath();
            ctx.lineWidth = 0.3;
            ctx.rect(this.xStart,this.yStart,this.xEnd,this.yEnd)
            ctx.moveTo(this.xCenter,this.yCenter)
            ctx.arc(this.xCenter,this.yCenter,1,0,360)
            let vector = (this.fieldWindAngle * Math.PI) / 180
            let x = 10 * Math.cos(vector) + this.xCenter
            let y = 10 * Math.sin(vector) + this.yCenter
            ctx.lineTo(x,y)
            ctx.strokeStyle = this.color
            ctx.stroke();
    }
        this.setfFeldWindAngle=function(){
            this.fieldWindAngle = angle(this.xCenter,this.yCenter,mouse.x,mouse.y)
        }
     }
    for (let y = 0; y < yFields; y++) {
        for (let x = 0; x < xFields; x++) {
             xPos = x * fieldWidth
             yPos = y * fieldHeight

             xCenter = xPos+(fieldWidth/2)
             yCenter = yPos-(fieldHeight/2)
            
            fields.push(new Field(xPos,xPos+fieldWidth,yPos,yPos+fieldHeight))
        }
    }
}



//set canvas
const spaceContainer = document.getElementById('particles-flow-container')
const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
spaceContainer.append(canvas)

const ctx = canvas.getContext('2d')
    ctx.fillStyle = initialCanvasBackground
    ctx.fillRect(0,0, window.innerWidth,window.innerWidth)
   

//create fields and particles
createFields(xFieldsCount,yFieldsCount)




//animate!
const animate = function () {

    fps = setTimeout(() => {
        
        ctx.beginPath()
        ctx.fillStyle = refreshCanvasBackground;
        ctx.fillRect(0,0, window.innerWidth,window.innerWidth)
        ctx.fill()

        renderFields && fields.forEach(field=>field.draw()) // render fields grid
        mouseDraw && ctx.rect(mouse.x-(mouseDrawRectWidth/2),mouse.y-(mouseDrawRectHeight/2),mouseDrawRectWidth,mouseDrawRectHeight) //render mouse rectangle


        ctx.stroke()
    
    

      requestFrameId = window.requestAnimationFrame(animate);
    }, 1000 / 60);
  };

  animate();


