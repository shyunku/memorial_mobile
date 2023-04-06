export const colorize = {
  red: (text: any) => `\x1b[31m${text}\x1b[0m`,
  green: (text: any) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text: any) => `\x1b[33m${text}\x1b[0m`,
  blue: (text: any) => `\x1b[34m${text}\x1b[0m`,
  magenta: (text: any) => `\x1b[35m${text}\x1b[0m`,
  cyan: (text: any) => `\x1b[36m${text}\x1b[0m`,
  white: (text: any) => `\x1b[37m${text}\x1b[0m`,
  gray: (text: any) => `\x1b[90m${text}\x1b[0m`,
};
