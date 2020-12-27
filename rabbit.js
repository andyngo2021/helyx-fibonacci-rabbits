class Rabbit
{
    // need it to move in a random direction
    constructor(x, y, age)
    {
        this.x = x;
        this.y = y;
        this.age = age;
        this.alive = true;
    }

    update()
    {
        this.x += random(-5, 5);
        this.y += random(-5, 5);
    }

    show()
    {
        circle(this.x, this.y, 10);
    }

    move()
    {
        if ((this.age < max_hours) && this.alive)
        {
            this.update();
            this.show();
        }
        if (this.age == max_hours) this.alive = false;
        if (frameCount % 60 == 0 && this.alive)
        {
            this.age++;
        }
        
    }
}