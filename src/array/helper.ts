export const log =
  (message: string) =>
  <T>(value: T) =>
    console.log(message, value)
