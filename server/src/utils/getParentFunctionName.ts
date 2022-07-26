import IErrorStack from '../types/getParentFunctionName';

function getParentFunctionName(): string {
  Error.stackTraceLimit = 11;
  const obj: IErrorStack = {};
  Error.captureStackTrace(obj, getParentFunctionName);
  const { stack } = obj;
  if (!stack) return '';

  const parentLine = stack.split('\n')[11]
  if (!parentLine) return '';

  const parentFunctionMatch = parentLine.match(/\s*at (.*)/)
  if (!parentFunctionMatch) return '';

  const parentFunctionName = parentFunctionMatch[1];
  return parentFunctionName;
}

export default getParentFunctionName;