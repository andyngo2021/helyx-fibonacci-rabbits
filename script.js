

function setup()
{
    
    w = windowWidth;
    h = windowHeight*.80;
    createCanvas(w, h);

    for (let i=0; i<1; i++)
    {
        c.push(new Rabbit(w/2, h/2, 0))
    }
}

function draw()
{
    background(51); 
    
    for (let i=c.length-1; i>=0; i--)
    {
        if (c[i].alive)
        {
            c[i].move();
        }
        else
        {
            c.splice(i, 1);
        }
    }


   // after "delay" months -> reproduce
    // time stuff
    if (frameCount % 60*delay == 0)
    {
        start_time++; // uncomment for seconds 1->2->3
        reproduce_after = start_time % delay;
        if (reproduce_after == 0)
        {
            console.log(num_months);
            num_months++;
            for (let i=0; i<c.length; i++)
            {
                if (c[i].alive && c[i].canReproduce)
                {
                    c.push(new Rabbit(c[i].x, c[i].y, 0));
                }
            }
        }
    }


    // putting text in js file for now to display time -> prob should move it to html file later
    fill(255);
    textSize(50);
    text(num_months.toString() + " months", 40, h-50);
    textSize(20);
    text("Total population size: " + c.length.toString(), 40, 50);
    textSize(15);
    text("Time in seconds passed: " + start_time.toString(), w-200, h-20);
}