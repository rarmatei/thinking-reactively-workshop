import {
  Observable,
  merge,
  Subject,
  timer,
  combineLatest
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
  switchMap,
  first
} from 'rxjs/operators';
import {
  initLoadingSpinner
} from "../services/LoadingSpinnerService";

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

const flashThresholdMs = 2000;

const shouldShowWithDelay = shouldShowSpinner.pipe(
  switchMap(() => {
    return timer(flashThresholdMs).pipe(takeUntil(shouldHideSpinner));
  })
);

const shouldHideWithDelay = combineLatest(
  shouldHideSpinner.pipe(first()),
  timer(flashThresholdMs)
);

const loadCounter = currentLoadCount.pipe(
  scan(
    ({
      loaded,
      previousLoadingCount
    }, currentLoadingCount) => {
      const currentlyLoaded = currentLoadingCount < previousLoadingCount ? loaded + 1 : loaded;
      return {
        loaded: loaded,
        max: loaded + currentLoadingCount,
        previousLoadingCount: currentLoadingCount
      };
    }, {
      loaded: 0,
      max: 0,
      previousLoadingCount: 0
    }
  )
);

const spinner = loadCounter.pipe(
  switchMap(stats => displaySpinner(stats.max, stats.loaded))
);

shouldShowWithDelay
  .pipe(
    switchMap(() => spinner.pipe(takeUntil(shouldHideWithDelay)))
  )
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