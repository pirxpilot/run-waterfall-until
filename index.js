module.exports = waterfallUntil;

/**
 * Process the list of tasks one by one,ending processing as soon as one task says so.
 * The next task is invoked with parameters set by the previous task.
 * It is a cross between async operations: waterfall and some.
 *
 * @param tasks list of tasks
 * @param ...parameters any number of parameters to be passed to the first task
 * @param callback the last argument is an optional callback called after tasks have been processed;
 *   called with error followed by the parameters passed from the last invoked task
 */
function waterfallUntil(tasks, ...parameters) {
  const callback = parameters.length && parameters.pop();
  let current = 0;
  let isSync = true;

  if (tasks.length) {
    tasks[0](...parameters, each);
  } else {
    done(null, ...parameters);
  }
  isSync = false;

  function done(...args) {
    if (!callback) {
      return;
    }
    if (isSync) {
      setTimeout(() => callback(...args), 0);
    } else {
      callback(...args);
    }
  }

  function each(err, exitNow, ...args) {
    if (err || exitNow || ++current >= tasks.length) {
      done(err, ...args);
    } else {
      tasks[current](...args, each);
    }
  }
}
