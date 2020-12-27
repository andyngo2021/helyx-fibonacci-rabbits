

function resetEverything()
{
    start_time = 0;
    num_months = 0;
    c = [];
}

function skipOneMonth()
{
    num_months++;
    for (let i=0; i<c.length; i++)
    {
        if (c[i].alive && c[i].canReproduce)
        {
            c.push(new Rabbit(c[i].x, c[i].y, -1));
            // replace with the below to make them spawn in diff area
            //c.push(new Rabbit(random(0, w), random(0, h), -1));
        }

        // if (frameCount % 60*delay == 0 && c[i].alive)
        if (c[i].alive)
        {
            // increase age by 1 
            c[i].age++;
            // basically let it reproduce after the first month
            // if (c[i].age > reproduce_after+1 && !c[i].canReproduce)
            if (c[i].age > 0 && !c[i].canReproduce)
            {
                c[i].canReproduce = true;
            }
        }
    }


}

function setup()
{
    infected_color = color(219, 0, 48);
    newborn_color = color(255, 255, 255);
    adult_color = color(0, 219, 91);
    w = windowWidth*0.80;
    h = windowHeight;
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
            skipOneMonth();
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


    // legend to show stuff 
    let spacing = 20; // space each one 10 px apart
    fill(infected_color); // infected color
    circle(w-50, spacing - 5, rabbit_size);
    text("Infected Rabbit Pair: ", w-200, spacing);

    fill(adult_color); // can reproduce
    circle(w-50, spacing*2 - 5, rabbit_size);
    text("Adult Rabbit Pair: ", w-200, spacing*2);

    fill(newborn_color);
    circle(w-50, spacing*3 - 5, rabbit_size);
    text("Newborn Rabbit Pair: ", w-200, spacing*3);
}

function mousePressed()
{
    noLoop();
}

function mouseReleased()
{
    loop();
}


/*
Notes:
- to properly demonstrate the spread of the virus, maybe spawn the rabbits in diff locations?
- need to make sure rabbits don't go beyond the border
- need to make it so that the virus can actually spread
*/