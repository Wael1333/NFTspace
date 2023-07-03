export const truncate = (input, maxLength = 16) =>
  input.length <= maxLength ? input : `${input.substring(0, maxLength - 3)}...`;
