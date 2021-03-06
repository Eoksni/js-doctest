/* eslint no-eval: "off", no-console: "off" */
import path from 'path';
import nodeEval from 'node-eval';

export const evalExpression = (evalString, filePath) => {
  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require,no-unused-vars
    const moduleObj = require(filePath);
    const code = `${evalString}`;
    const result = nodeEval(code, filePath, moduleObj);
    return { result };
  } catch (error) {
    return { error };
  }
};

export const evalValue = (evalString) => {
  const wrappedEvalString = `(${evalString})`;
  try {
    return { result: eval(wrappedEvalString) };
  } catch (error) {
    return { error };
  }
};

export default ({ resultString, stringToEval }, filePath) => {
  const fullFilePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);
  const actual = evalExpression(resultString, fullFilePath);
  const expected = evalValue(stringToEval);
  return { actual, expected };
};
