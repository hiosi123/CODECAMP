function solution(s) {
  char = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  dic = {};
  char.forEach((e, i) => (dic[e] = i));

  for (let i = 0; i < 10; i++) {
    if (s.includes(char[i])) {
      s.indexOf(char[i]);
      start = s.indexOf(char[i]);
      end = start + char[i].length;

      key = s.slice(start, end);

      sList = s.split("");
      sList.splice(start, end - start, i);
      s = sList.join("");
    }

    if (s.includes(char[i])) {
      i -= 1;
    }
  }
  return Number(s);
}
