let rabbits = [];
let rabbit_size = 10;
let start_time = 0;
let num_months = 0;
let bunny_life_span = 100000000000 // yea idek if i need this one
let w, h;
let num_initial_buns = 1;
let delay = 10;  // 10 second delay for them to reproduce (1 month = 10 seconds)
let reproduce_after;

let die_after = 5; // amount of seconds rabbits die after 
let num_deaths = 0;
let num_infected = 0;
let num_not_infected = 0;
// colors
let infected_color; // 219, 0, 48
let newborn_color; // 255, 255, 255
let adult_color; // 0, 219, 91
