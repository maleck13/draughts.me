Piece = function(colour, position, id)
{
    this.colour   = colour;
    this.position = position;
    this.id       = id;
    this.size     = 10;
    this.enabled  = true;
    this.height   = Math.floor(Math.random()*21);
    this.animated = true;
}

Piece.prototype.getId = function()
{
    return this.id;
}

Piece.prototype.animate = function()
{
    if(this.upwards)
    {
        this.height += 0.5;
    }
    else
    {
        this.height -= 0.5;
    }

    if(this.height >=20)
    {
        this.colour = "#ff0000";
        this.upwards = false;
    }
    if(this.height <= 1)
    {
        this.colour = "#ddbbbb";
        this.upwards = true;
    }
}

Piece.prototype.render = function()
{
    if(!this.enabled)
    {
        return;
    }
    if(this.animated)
    {
        this.animate();
    }

    Engine.context.save();
    Engine.context.translate(this.position.getX(), this.position.getY());
    this.drawBottom();
    this.drawSide();
    this.drawTop();
    Engine.context.restore();
    //render the object to the canvas...
}

Piece.prototype.drawBottom = function()
{
    Engine.context.beginPath();
        Engine.context.save(); // save state
            Engine.context.scale(2, 1);
            Engine.context.arc(0, 0, this.size, 0, 2 * Math.PI, false);
        Engine.context.restore();
        
        Engine.context.fillStyle = this.colour;
        Engine.context.fill();
        Engine.context.lineWidth = 2;
        Engine.context.strokeStyle = "black";
        Engine.context.stroke();
    Engine.context.closePath();
    Engine.context.fill();
}

Piece.prototype.drawTop = function()
{
    Engine.context.beginPath();
        Engine.context.save(); // save state
            Engine.context.scale(2, 1);
            Engine.context.arc(0, -this.height, this.size, 0, 2 * Math.PI, false);
        Engine.context.restore();

        Engine.context.fillStyle = this.colour;
        Engine.context.fill();
        Engine.context.lineWidth = 2;
        Engine.context.strokeStyle = "black";
        Engine.context.stroke();
    Engine.context.closePath();
    Engine.context.fill();
}

Piece.prototype.drawSide = function()
{
    Engine.context.save();
    Engine.context.fillRect(
        0 - this.size * 2
        , -this.height
        , this.size * 4
        , this.height
    );
    Engine.context.restore();
}

Piece.prototype.enable = function()
{
    //enable rendering the object
    this.enabled = true;
}

Piece.prototype.disable = function()
{
    //disable rendering the object
    this.enabled = false;
}

Piece.prototype.setPosition = function(position)
{
    this.position = position;
}

Piece.prototype.getPosition = function()
{
    return this.position;
}

Piece.prototype.setColour = function(colour)
{
    this.colour = colour;
}

