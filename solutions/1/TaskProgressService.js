import {
  Observable
} from "rxjs";

/*
when the loader needs to show
  --> show the loader..until it's time to hide it
---
when does the loader need to show?
  when the count of tasks goes from zero to 1
when does the loader need to hide?
  when the count goes to zero
how do we count?
  start from zero
  when an async task starts, increase the count by 1
  when a task ends, decrease the count by 1
---
data sources:
- async task started
- async task ended
- show spinner
*/

const taskStarts = new Observable();
const taskCompletions = new Observable();
const showSpinner = new Observable();

export default {};