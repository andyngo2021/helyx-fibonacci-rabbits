

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
    soundFormats('mp3');
    text_font = loadFont("Assets/Nunito-Bold.ttf");
    background_music = loadSound("Assets/thisisprettyRAD.mp3");
    snap = loadSound("Assets/snap.mp3");
    dust = loadSound("Assets/dust.mp3");
}

function initializeValues()
{
    infected_color = color(219, 0, 48);
    newborn_color = color(255, 255, 255);
    adult_color = color(0, 219, 91);
    w = windowWidth*0.80;
    h = windowHeight;
    background_color = 51;
}

function setup()
{
    background_music.setVolume(0.50);

    initializeValues();
    textFont(text_font);
    p5Canvas = createCanvas(w, h);

    for (let i=0; i<num_initial_buns; i++)
    {
        rabbits.push(new Rabbit(random(w*0.40, w*0.60), random(h*0.40, h*0.60), 0))
    }
}

function windowResized()
{
    w = windowWidth*0.80;
    h = windowHeight;
    resizeCanvas(w, h);
}

function mouseClicked()
{
    if (!background_music.isPlaying())
    {
        background_music.loop();
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
    circle(w-30, spacing - 5, 10);
    text("Infected Pair: ", w-200, spacing);

    fill(adult_color); // can reproduce
    circle(w-30, spacing*2 - 5, 10);
    text("Reproductive Pair: ", w-200, spacing*2);

    fill(newborn_color);
    circle(w-30, spacing*3 - 5, 10);
    text("Nonreproductive Pair: ", w-200, spacing*3);

    // stats
    //textSize(15);
    fill(color(255));
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
    // console.log(theColor);
    background_color = theColor;
    //background(color(background_color));
    //document.getElementById("bkg-color").value = "#000000";

}

function rabbitColorChange(n)
{
    if (n==1) // Infected color
    {
        let ip_color = document.getElementById("ip-color").value;
        infected_color = color(ip_color);
    }   
    else if (n==2) // reproductive color
    {
        let rp_color = document.getElementById("rp-color").value;
        adult_color = color(rp_color);
    }
    else if (n==3) // nonreproductive color
    {
        let nrp_color = document.getElementById("nrp-color").value;
        newborn_color = color(nrp_color);
    }
}

function thanos()
{
    if (rabbits.length > 1)
    {
        let snap_victims = Math.ceil(rabbits.length/2);
        rabbits.splice(0, snap_victims);
        snap.play();
        dust.play();
        num_deaths += snap_victims;
        
        // maybe recount
        num_infected = 0;
        num_not_infected = 0;
        for (let i=0; i<rabbits.length; i++)
        {
            if (rabbits[i].infected) num_infected++;
            else num_not_infected++;
        }
    }
}