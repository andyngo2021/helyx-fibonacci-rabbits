let c = [];
let max_hours = 30;
let start_time = 0;
function setup()
{
    createCanvas(windowWidth, windowHeight);
    for (let i=0; i<1; i++)
    {
        c.push(new Rabbit(random(0, windowWidth), random(0, windowHeight), 20))
    }
}

function draw()
{
    background(51); 
    for (let i=0; i<1; i++)
    {
        c[i].move()
    }
}