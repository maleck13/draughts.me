Piece = function(colour, position, id)
{
    this.colour   = colour;
    this.position = position;
    this.id       = id;
    this.size     = 10;
    this.enabled  = true;
}

Piece.prototype.getId = function()
{
    return this.id;
}

Piece.prototype.render = function()
{
    if(!this.enabled)
    {
        return;
    }
    Engine.context.fillStyle   = this.colour;
    Engine.context.beginPath();
    Engine.context.arc(
        this.position.getX()
        , this.position.getY()
        , this.size
        , 0
        , Math.PI * 2
        , true
    );
    Engine.context.closePath();
    Engine.context.fill();
    //render the object to the canvas...
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

