// take in 2 strings
// return the location of smallest shared string
const findSubstringLoc = (large, input) => {
  const len2 = input.length;

  // if valid & no need for red
  if (large.includes(input)) { return { error: false, loc: len2 } };
  
  let loc = 0;

  while (large.startsWith(input.slice(0, loc+1))) {
    if (loc > len2) return { error: true, loc: len2 };
    loc++;
  }

  return { error: true, loc };
};

export default {
  findSubstringLoc
};