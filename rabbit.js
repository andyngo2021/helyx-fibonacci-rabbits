class Rabbit
{
    // need it to move in a random direction
    constructor(x, y, age)
    {
        this.x = x;
        this.y = y;
        this.age = age;
        this.alive = true;
        this.infected = false;
        this.canReproduce = false;
        //this.countDownTimer = die_after;
        this.start = 0;
        num_not_infected++;
    }

    update()
    {
        this.x += random(-rabbit_speed, rabbit_speed);
        this.y += random(-rabbit_speed, rabbit_speed)
        // if left side of screen
        if (this.x <= 0) this.x += rabbit_speed;
        // if right side of screen
        else if (this.x >= w) this.x -= rabbit_speed;

        // if top of the screen
        if (this.y <= 0) this.y += rabbit_speed;
        // if bottom of the screen
        else if (this.y >= h) this.y -= rabbit_speed;
    }

    show()
    {
        let rabbit_color = newborn_color;
        if (this.infected)
        {
            rabbit_color = infected_color; // red for infected
            
        }
        else if (this.canReproduce && reproduction_on) rabbit_color = adult_color;
        fill(rabbit_color);
        circle(this.x, this.y, rabbit_size);
    }

    move()
    {
        // if ((this.age < bunny_life_span) && this.alive)
        if (this.alive)
        {
            // comment out update to make them stand still
            this.update();
            this.show();
        }
        
        // kill off the bunny once it reaches the end of it's lifespan
        if (this.age == bunny_life_span)
        {
            this.alive = false;
        }

        // for each second 
        // MOVE THIS TO SCRIPT.JS
        // if (frameCount % 60 == 0 && this.alive)
        // {
        //     // increase age by 1 
        //     this.age++;
        //     // basically let it reproduce after the first month
        //     if (this.age > reproduce_after+1 && !this.canReproduce)
        //     {
        //         this.canReproduce = true;
        //     }
        // }
    }

    checkInRangeAndInfect(other_rabbit)
    {
        // distance equations
        if (!(this.infected && other_rabbit.infected) && (this.infected || other_rabbit.infected) && (dist(this.x, this.y, other_rabbit.x, other_rabbit.y) < rabbit_size*2)) // then they do be colliding
        {
            let random_chance = 0.5; // random chance rabbit gets infected 0->100
            if (random(0, 100) < random_chance)
            {
                this.infected = true;
                other_rabbit.infected = true;

                num_infected++;
                num_not_infected--;
            }

        }
    }
}