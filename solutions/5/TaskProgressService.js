import {
  Observable,
  merge,
  Subject
} from "rxjs";
import {
  mapTo,
  startWith,
  distinctUntilChanged,
  shareReplay,
  scan,
  filter,
  pairwise,
  takeUntil,
  switchMap
} from 'rxjs/operators';

const taskStarts = new Subject();
const taskCompletions = new Subject();
const displaySpinner = new Observable();

const loadUp = taskStarts.pipe(mapTo(1));
const loadDown = taskCompletions.pipe(mapTo(-1));

const loadVariations = merge(loadUp, loadDown);

const currentLoadCount = loadVariations.pipe(
  scan((totalCurrentLoads, changeInLoads) => {
    const newLoadCount = totalCurrentLoads + changeInLoads;
    return newLoadCount > 0 ? newLoadCount : 0;
  }, 0),
  startWith(0),
  distinctUntilChanged(),
  shareReplay(1)
);


const shouldHideSpinner = currentLoadCount.pipe(filter(count => count === 0));

const shouldShowSpinner = currentLoadCount.pipe(
  pairwise(),
  filter(([prev, curr]) => curr === 1 && prev === 0)
);

shouldShowSpinner
  .pipe(
    switchMap(() => displaySpinner.pipe(takeUntil(shouldHideSpinner)))
  )
  .subscribe();

function newTaskStarted() {
  taskStarts.next();
}

function existingTaskCompleted() {
  taskCompletions.next();
}

export default {};