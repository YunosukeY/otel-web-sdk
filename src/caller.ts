export type Caller = {
  file: string;
  line: number;
  column: number;
  function: string;
  stack: string;
};

export const getCaller = (depth: number = 0): Caller | undefined => {
  const stack = new Error().stack;
  if (stack === undefined) {
    return undefined;
  }

  const stackLines = stack.split("\n").slice(depth + 2);
  const callerLine = stackLines[0];

  const match = callerLine.match(/at (.*) \((.*):(\d+):(\d+)\)/);
  if (match === null) {
    return undefined;
  }
  const [, func, file, line, column] = match;

  return {
    file,
    line: parseInt(line, 10),
    column: parseInt(column, 10),
    function: func,
    stack: stackLines.join("\n"),
  };
};
