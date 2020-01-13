import {
  Observable
} from "rxjs";
import {
  taskStarted,
  taskCompleted
} from "./TaskProgressService";

export function showLoadingStatus() {
  return source => {
    return new Observable(observer => {
      taskStarted();
      return source.subscribe({
        next: val => observer.next(val),
        error: err => {
          taskCompleted();
          observer.error(err);
        },
        complete: () => {
          taskCompleted();
          observer.complete();
        }
      });
    });
  };
}