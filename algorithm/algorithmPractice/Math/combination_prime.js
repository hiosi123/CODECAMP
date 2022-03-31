var arr = [1, 2, 7, 6, 4];
let result = 0;
const func = function (arr, selectNumber) {
  const results = [];

  if (selectNumber === 1) return arr.map((el) => [el]);
  //combination = func([3,4],1)
  arr.forEach((fixed, index, arr) => {
    //fixed = 1, index = 0, arr = [1,2,3,4]

    const new_arr = arr.slice(index + 1);
    //new_arr = [2,3,4]
    //new_arr = [3,4]
    const combination = func(new_arr, selectNumber - 1);
    //combination = func([2,3,4], 2)
    //combination = func([3,4],1)

    const attached = combination.map((el) => [fixed, ...el]);
    // attached = [1,2,3]
    results.push(...attached);
  });
  return results;
};

const combination = func(arr, 3);

const checkPrime = (number) => {
  if (number === 1) {
    return 0;
  }
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return 0;
    }
  }
  return 1;
};

combination.forEach((e) => (result += checkPrime(e.reduce((a, b) => a + b))));
result;
