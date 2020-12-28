

function resetEverything()
{
    start_time = 0;
    num_months = 0;
    rabbits = [];
    num_deaths = 0;
    num_infected = 0;
    num_not_infected = 0;
}

function skipOneMonth()
{
    num_months++;
    for (let i=0; i<rabbits.length; i++)
    {
        if (rabbits[i].alive && rabbits[i].canReproduce)
        {
            rabbits.push(new Rabbit(rabbits[i].x, rabbits[i].y, -1));
            // replace with the below to make them spawn in diff area
            //rabbits.push(new Rabbit(random(0, w), random(0, h), -1));
        }

        // if (frameCount % 60*delay == 0 && rabbits[i].alive)
        if (rabbits[i].alive)
        {
            // increase age by 1 
            rabbits[i].age++;
            // basically let it reproduce after the first month
            // if (rabbits[i].age > reproduce_after+1 && !rabbits[i].canReproduce)
            if (rabbits[i].age > 0 && !rabbits[i].canReproduce)
            {
                rabbits[i].canReproduce = true;
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
        rabbits.push(new Rabbit(w/2, h/2, 0))
    }
}

function draw()
{
    background(51); 
    
    for (let i=rabbits.length-1; i>=0; i--)
    {
        if (rabbits[i].alive)
        {
            rabbits[i].move();

            if (rabbits[i].infected)
            {
                if (frameCount%60 == 0)
                {
                    rabbits[i].start++;
                    if (rabbits[i].start == die_after)
                    {
                        rabbits[i].alive = false;
                        num_deaths++;
                        num_infected--;
                    }
                }
            }
        }
        else
        {
            rabbits.splice(i, 1); // if the rabbit is dead -> remove it from the population
        }
    }

    // collision detection?
    for (let i=0; i<rabbits.length; i++)
    {
        for (let j=i+1; j<rabbits.length; j++)
        {
            rabbits[i].checkInRangeAndInfect(rabbits[j]);
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
    text("Total population size: " + rabbits.length.toString(), 40, 50);
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

    // stats
    textSize(15);
    text("Infected: " + num_infected.toString(), w-200, h-spacing*2);
    text("Non-infected: " + num_not_infected.toString(), w-200, h-spacing*3);
    text("Deaths: " + num_deaths.toString(), w-200, h-spacing*4);
}

// function mousePressed()  
// {
//     noLoop();
// }

// function mouseReleased()
// {
//     loop();
// }


/*
Notes:
- to properly demonstrate the spread of the virus, maybe spawn the rabbits in diff locations?
- need to make sure rabbits don't go beyond the border
- need to make it so that the virus can actually spread
*/

function infectRandomRabbit()
{
    if (num_infected < rabbits.length)
    {
        random(rabbits).infected = true;
        num_infected++;
        num_not_infected--;
    }
}
// note:
// there is a bug for the amount of infected and stuff