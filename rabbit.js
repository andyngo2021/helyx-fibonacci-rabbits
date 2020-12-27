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
    }

    update()
    {
        this.x += random(-5, 5);
        this.y += random(-5, 5);


    }

    show()
    {
        let rabbit_color = newborn_color;
        if (this.infected) rabbit_color = infected_color; // red for infected
        else if (this.canReproduce) rabbit_color = adult_color;
        fill(rabbit_color);
        circle(this.x, this.y, rabbit_size);
    }

    move()
    {
        if ((this.age < bunny_life_span) && this.alive)
        {
            this.update();
            this.show();
        }
        
        // kill off the bunny once it reaches the end of it's lifespan
        if (this.age == bunny_life_span)
        {
            this.alive = false;
        }

        // for each second 
        if (frameCount % 60 == 0 && this.alive)
        {
            // increase age by 1 
            this.age++;
            // basically let it reproduce after the first month
            if (this.age > reproduce_after+1 && !this.canReproduce)
            {
                this.canReproduce = true;
            }
        }
    }
}