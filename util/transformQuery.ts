const queryToNumber = (val: string | string[] | undefined): number | undefined => {
  if (val === undefined) {
    return val;
  }
  return Number(val);
}

export default queryToNumber