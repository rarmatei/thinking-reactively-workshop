import {
  Observable,
  merge
} from "rxjs";
import {
  mapTo,
  startWith,
  distinctUntilChanged,
  shareReplay,
  scan,
  filter,
  pairwise
} from 'rxjs/operators';

const taskStarts = new Observable();
const taskCompletions = new Observable();
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

export default {};