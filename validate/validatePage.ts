const validatePage = (page: number, size: number): boolean | string =>
  !gtZero(page)
    ? 'page必须大于0'
    : !isInteger(page)
      ? 'page必须为整数'
      : !gtZero(size)
        ? 'size必须大于0'
        : !isInteger(size)
          ? 'size必须为整数'
          : true;

const gtZero = (num: number) => num > 0;

const isInteger = (num: number) => Number.isInteger(num);

export { validatePage }