Position = function(x, y)
{
    this.x = x*50;
    this.y = y*50;
    this.z = 1;
}

Position.prototype.getX = function()
{
    return this.x;
}

Position.prototype.getY = function()
{
    return this.y;
}

Position.prototype.getZ = function()
{
    return this.z;
}

Position.prototype.setX = function(x)
{
    this.x = x;
}

Position.prototype.setY = function(y)
{
    this.y = y;
}

Position.prototype.setZ = function(z)
{
    this.z = z;
}