import React from "react";
import Button from "./presentational/Button";
import {
  existingTaskCompleted,
  newTaskStarted
} from "../lesson-code/TaskProgressService";

const doVeryQuickWork = () => {
  newTaskStarted();
  new Promise(resolve => {
    setTimeout(() => {
      existingTaskCompleted();
      //TODO change this to contain callback
      resolve();
    }, 300);
  });
};

const doAlmostQuickWork = () => {
  newTaskStarted();
  new Promise(resolve => {
    setTimeout(() => {
      existingTaskCompleted();
      resolve();
    }, 2200);
  });
};

const SlowExample = () => {
  return (
    <>
      <Button onClick={doVeryQuickWork}> QUICK task - 300 ms</Button>{" "}
      <Button onClick={doAlmostQuickWork}> Almost quick task - 2200ms</Button>{" "}
    </>
  );
};

export default SlowExample;
