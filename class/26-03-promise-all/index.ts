// new Promise((resolve, reject) => {
//   // 뭔가 특정 작업(API 보내기 등)
//   //   if (성공!!) {
//   //     resolve();
//   //   }
//   //   if (실패!!) {
//   //     reject();
//   //   }
// })
//   .then((res) => {})
//   .catch((err) => {});
const fetchData = async () => {
  console.time("=== 개별 Promise 각각 ===");
  const result1 = await new Promise((resolve, reject) => {
    // 뭔가 특정 작업(API 보내기 등)
    setTimeout(() => {
      resolve("성공시 받는 데이터");
    }, 2000);
  });
  //   console.log(result);

  const result2 = await new Promise((resolve, reject) => {
    // 뭔가 특정 작업(API 보내기 등)
    setTimeout(() => {
      resolve("성공시 받는 데이터");
    }, 3000);
  });
  //   console.log(result);

  const result3 = await new Promise((resolve, reject) => {
    // 뭔가 특정 작업(API 보내기 등)
    setTimeout(() => {
      resolve("성공시 받는 데이터");
    }, 1000);
  });
  //   console.log(result);
  console.timeEnd("=== 개별 Promise 각각 ===");
};

const fetchData2 = async () => {
  console.time("=== 한방에 Promise 한방에 ===");
  await Promise.all([
    new Promise((resolve, reject) => {
      // 뭔가 특정 작업(API 보내기 등)
      setTimeout(() => {
        resolve("성공시 받는 데이터");
      }, 2000);
    }),
    new Promise((resolve, reject) => {
      // 뭔가 특정 작업(API 보내기 등)
      setTimeout(() => {
        resolve("성공시 받는 데이터");
      }, 3000);
    }),
    new Promise((resolve, reject) => {
      // 뭔가 특정 작업(API 보내기 등)
      setTimeout(() => {
        resolve("성공시 받는 데이터");
      }, 1000);
    }),
  ]);
  console.timeEnd("=== 한방에 Promise 한방에 ===");
};

fetchData();
fetchData2();
