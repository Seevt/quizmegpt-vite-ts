export function debounce(fn: Function, wait: number) {
  let timer: number;
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer); // clear any pre-existing timer
    }

    // @ts-ignore
    const context = this; // get the current context

    timer = setTimeout(() => {
      fn.apply(context, args); // call the function if time expires
    }, wait);
  };
}
