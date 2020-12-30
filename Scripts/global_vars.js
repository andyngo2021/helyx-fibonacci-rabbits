let rabbits = [];
let rabbit_size = 10;
let rabbit_speed = 5;
let start_time = 0;
let num_months = 0;
let bunny_life_span = 100000000000 // yea idek if i need this one
let reproduction_on = true;
let w, h;
let infection_rate = 0.05;
let num_initial_buns = 1; // initial population
let num_offspring = 1;
let delay = 10;  // 10 second delay for them to reproduce (1 month = 10 seconds)
let reproduce_after;
let max_months = 999999999999999999; // it will lag out before this LOL
let die_after = 10; // amount of seconds rabbits die after 
let num_deaths = 0;
let num_infected = 0;
let num_not_infected = 0;
// colors
let infected_color; // 219, 0, 48
let newborn_color; // 255, 255, 255
let adult_color; // 0, 219, 91
let text_font;
let background_color;
let background_music;
let pandemic = false;
let p5Canvas;


// lifespan of an infected rabbit -> die_after/delay
// ex: die_after = 5 (5 seconds) and delay (10 seconds = 1 month) -> half a month before dying


// functions to change 

