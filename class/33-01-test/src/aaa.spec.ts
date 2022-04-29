// 1. 한개 테스트하기
it('더하기 테스트', () => {
  const a = 1;
  const b = 2;

  expect(a + b).toBe(3);
});

// 2. 여러개 묶음으로 테스트 하기
describe('나의 테스트 그룹', () => {
  it('더하기 테스트', () => {
    const a = 1;
    const b = 2;

    expect(a + b).toBe(3);
  });
  it('곱하기 테스트', () => {
    const a = 1;
    const b = 2;

    expect(a * b).toBe(2);
  });
});

// 3. 상품구매하기 테스트 예제
describe('상품구매테스트', () => {
  beforeEach(() => {
    //로그인 로직 작성!!
  });
  it('돈검중하기', () => {
    //돈을 가지고 와서 구매해보고, 체크해보는 과정이 들어간다.
    // 어디까지 디테일 하게 해야 하는가?
    // 처음부터 완벽하게 할 필요는 없음
    // 배보다 배꼽이 더 크다
    const result = true; // 돈이 충분하다고 가정
    expect(result).toBe(true);
  });

  it('상품 구매하기', () => {
    const result = true;
    expect(result).toBe(true);
  });
});
