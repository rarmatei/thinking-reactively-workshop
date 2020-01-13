import { Observable, merge, Subject, timer } from "rxjs";
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
} from "rxjs/operators";
import { initLoadingSpinner } from "../services/LoadingSpinnerService";

const taskStarts = new Subject();
const taskCompletions = new Subject();

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

const shouldShowWithDelay = shouldShowSpinner.pipe(
  switchMap(() => {
    return timer(2000).pipe(takeUntil(shouldHideSpinner));
  })
);

shouldShowWithDelay
  .pipe(switchMap(() => displaySpinner().pipe(takeUntil(shouldHideSpinner))))
  .subscribe();

function displaySpinner(total, loaded) {
  return new Observable(() => {
    const loadingSpinnerInstance = initLoadingSpinner(total, loaded);
    loadingSpinnerInstance.then(spinner => spinner.show());
    return () => {
      loadingSpinnerInstance.then(spinner => spinner.hide());
    };
  });
}

function newTaskStarted() {
  taskStarts.next();
}

function existingTaskCompleted() {
  taskCompletions.next();
}

export default {};
