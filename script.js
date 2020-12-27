let c = [];
let max_hours = 30;
let start_time = 0;
let w, h;

function setup()
{
    w = windowWidth;
    h = windowHeight*.80;
    createCanvas(w, h);

    for (let i=0; i<1; i++)
    {
        c.push(new Rabbit(random(0, w), random(0, h), 20))
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