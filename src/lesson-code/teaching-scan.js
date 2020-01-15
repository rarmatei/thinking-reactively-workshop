import { scan } from "rxjs/operators";

let currentLoadCount;
const loadCounter = currentLoadCount.pipe(
  scan(
    ({ completed, loading }, loadingUpdate) => {
      const completedUpdate =
        loadingUpdate < loading ? completed + 1 : completed;
      return {
        completed: completedUpdate,
        loading: loadingUpdate,
        max: loadingUpdate + completedUpdate
      };
    },
    {
      completed: 0,
      max: 0,
      loading: 0
    }
  )
);

/*
show that we can send loaded and total to the spinner
send a mock set of values so they can see

show animation...
as new dots come in we put them at the end of the array and it grows
another dots comes in and the array grows
show 0% to the side
as tasks finish they leave the beginning of the array
at that point we update the percentage

then a few more tasks join the end of the array
we then decrease the percentage

...don't show all the values leaving just yet

ask them to write a 1 or something in the console if you don't
understand how the percentage is supposed to work

...now that we understand the requirement, how do we actually implement it in our existing solution
well remember how we started splitting our observables into standalone streams?
well we can use the loadCounter that we created earlier

so our loudCounter gives us updates of how many things are loading at a time
and that's all the info we need...
    we need: how many things have finished loading
        we start from zero, and increment anytime this values goes down by 1
    and the size of the array - which we get by adding how many have finished loading + how many are still loading

and because we'll need to keep track of previous values 
    and store some state, we'll use .scan() again

so let's do that... 

but now there's a problem...this array will keep growing infinitely
    we need to reset it at some point

well we want to start it up anytime we need to show the spinner
    and reset it everytime we hide the spinner

so the lifecycle of our percentage indicator is exactly that 
    that of our spinner

so let's build an observable that combines them
    and we'll just call it spinner

now we can just replace it in here
and if we test it out it works

so takeaways from this:
- remember that scan keeps track of state only for the lifetime
    of the observable it's part of
    if you have state, and state needs to be reset
    really consider the lifecycle of the observable its part of rather than manually resetting it
- in this case, we found another observable that it had to share some lifecycle with 
    and combined it with that
- I also want to re-emphasise how we extracted this observable out and encapsulated all the 
    loading logic in it...whoever's using it, still only knows it's using a spinner
    






*/
