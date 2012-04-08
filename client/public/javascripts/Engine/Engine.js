(function(){
    Engine = {};

    Engine.init = function(canvas)
    {
        Engine.canvas = document.getElementById(canvas);
        Engine.objects = new Array();

        Engine.context = "";

        Engine.setupCanvas();

        Engine.lastRender = new Date().getTime();
        Engine.timePassed = 0;

        setInterval(Engine.render, 50);
    }

    Engine.setupCanvas = function()
    {
        if(Engine.canvas.getContext) {
            // Initaliase a 2-dimensional drawing context
            Engine.context = Engine.canvas.getContext('2d');
        }
        else
        {
            console.log("failed to get context");
        }
    }

    Engine.addObject = function(object)
    {
        if(
               typeof object.render  !== "function"
            || typeof object.enable  !== "function"
            || typeof object.disable !== "function"
            || typeof object.getId   !== "function"
        )
        {
            return;
        }
        Engine.objects.push(object);
    }

    Engine.removeObject = function(object)
    {
        for(id in Engine.objects)
        {
            var potentialObject = Engine.objects[id];
            if(potentialObject.getId() === object.getId())
            {
                Engine.objects.splice(id, 1);
            }
        }
    }

    Engine.render = function()
    {
        var now = new Date().getTime();
        Engine.timePassed = now - Engine.lastRender;
        Engine.lastRender = now;
        Engine.context.clearRect(
            0
            , 0
            , Engine.canvas.width
            , Engine.canvas.height
        );
        Engine.objects.sort(function(a, b){
           return a.position.getZ() - b.position.getZ();
        });
        for(id in Engine.objects)
        {
            var object = Engine.objects[id];
            object.render();
        }
    }

    Engine.getTimePassed = function()
    {
        return Engine.timePassed;
    }

    return Engine;
}());