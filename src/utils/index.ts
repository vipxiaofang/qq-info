export const regexQQNumber = (val: string) => {
  const reg = /^[1-9][0-9]{4,11}$/;
  return reg.test(val);
};
