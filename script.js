

function resetEverything()
{
    start_time = 0;
    num_months = 0;
    num_initial_buns = 1;
    rabbits = [];
    num_deaths = 0;
    num_infected = 0;
    num_not_infected = 0;
    pandemic = false;
    reproduction_on = true;
    // reset the sliders
    // doc.getelemtnbyid blahbalh
}

function skipOneMonth()
{
    if (num_months < max_months)
    {
        num_months++;
        for (let i=0; i<rabbits.length; i++)
        {
            updateDeathTimerByMonth(rabbits[i]);
            if (reproduction_on && rabbits[i].alive && rabbits[i].canReproduce)
            {
                for (let j=0; j<num_offspring; j++)
                    rabbits.push(new Rabbit(rabbits[i].position.x, rabbits[i].position.y, -1));
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
}

function resumeReproduction()
{
    reproduction_on = true;
}

function pauseReproduction()
{
    reproduction_on = false;
}

function preload()
{
    text_font = loadFont("Nunito-Bold.ttf");
}

function initializeValues()
{
    infected_color = color(219, 0, 48);
    newborn_color = color(255, 255, 255);
    adult_color = color(0, 219, 91);
    w = windowWidth*0.79;
    h = windowHeight*0.95;
    background_color = 51;
    
}

function setup()
{
    initializeValues();
    textFont(text_font);
    createCanvas(w, h);

    for (let i=0; i<num_initial_buns; i++)
    {
        rabbits.push(new Rabbit(random(w*0.40, w*0.60), random(h*0.40, h*0.60), 0))
    }
}


function updateDeathTimerByMonth(rabbit)
{
    if (rabbit.infected && pandemic)
    {
        rabbit.start += delay/10;
        if (rabbit.start >= die_after)
        {
            rabbit.alive = false;
            num_deaths++;
            num_infected--;
        }
    }
}

function updateDeathTimer(rabbit)
{
    if (rabbit.infected && pandemic)
    {
        rabbit.start++;
        if (rabbit.start == die_after)
        {
            rabbit.alive = false;
            num_deaths++;
            num_infected--;
        }
    }
}

function draw()
{
    background(color(background_color)); 
    
    for (let i=rabbits.length-1; i>=0; i--)
    {
        if (rabbits[i].alive)
        {
            rabbits[i].move();

            if (pandemic && rabbits[i].infected)
            {
                if (frameCount%60 == 0) // one second has passed
                {
                    updateDeathTimer(rabbits[i]);
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
        if (reproduce_after == 0 && num_months < max_months)
        {
            skipOneMonth();
        }
        

    }

    if (num_infected == 0 && pandemic)
    {
        pandemic = false;
    }

    // putting text in js file for now to display time -> prob should move it to html file later
    fill(255);
    textSize(50);
    text(num_months.toString() + " months", 40, h-50);
    textSize(20);
    text("Total population size: " + rabbits.length.toString(), 40, 50);


    textSize(15);
    // legend to show stuff 
    let spacing = 20; // space each one 10 px apart
    fill(infected_color); // infected color
    circle(w-30, spacing - 5, rabbit_size);
    text("Infected Pair: ", w-200, spacing);

    fill(adult_color); // can reproduce
    circle(w-30, spacing*2 - 5, rabbit_size);
    text("Reproductive Pair: ", w-200, spacing*2);

    fill(newborn_color);
    circle(w-30, spacing*3 - 5, rabbit_size);
    text("Nonreproductive Pair: ", w-200, spacing*3);

    // stats
    //textSize(15);
    text("Infected: " + num_infected.toString(), w-225, h-spacing*2);
    text("Non-infected: " + num_not_infected.toString(), w-225, h-spacing*3);
    text("Deaths: " + num_deaths.toString(), w-225, h-spacing*4);
    text("Time in seconds passed: " + start_time.toString(), w-225, h-20);
}


function infectRandomRabbit()
{
    if (num_infected < rabbits.length)
    {
        random(rabbits).infected = true;
        num_infected++;
        num_not_infected--;
        pandemic = true;
    }
}
// note:
// there is a bug for the amount of infected and stuff

function changeColor()
{
    var theInput = document.getElementById("bkg-color");
    var theColor = theInput.value;
    console.log(theColor);
    background_color = theColor;
    //background(color(background_color));
    document.getElementById("bkg-color").value = "#000000";

}
      
function sigmoid(val)
{
    let e = 2.71828;
    let num = 1;
    let denom = 1+pow(e, -val);
    return num/denom;
}