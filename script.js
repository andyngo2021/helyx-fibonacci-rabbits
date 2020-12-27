

function setup()
{
    
    w = windowWidth;
    h = windowHeight*.80;
    createCanvas(w, h);

    for (let i=0; i<1; i++)
    {
        c.push(new Rabbit(random(0, w), random(0, h), bunny_life_span))
    }
}

function draw()
{
    background(51); 
    for (let i=0; i<c.length; i++)
    {
        c[i].move()
    }



    // time stuff
    if (frameCount % 60 == 0) start_time++;
    // putting text in js file for now to display time -> prob should move it to html file later
    fill(255);
    textSize(100);
    text(start_time.toString(), 40, 100);
}