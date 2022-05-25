import { regexQQNumber } from "utils";
import { fetchGet } from "utils/axios";

test("Utils: regexQQNumber", () => {
  expect(regexQQNumber("10001")).toBe(true);
  expect(regexQQNumber("1000")).toBe(false);
  expect(regexQQNumber("1234567890123")).toBe(false);
  expect(regexQQNumber("0123456")).toBe(false);
  expect(regexQQNumber("abcdefg")).toBe(false);
  expect(regexQQNumber("100 001")).toBe(false);
});

test("Utils: fetchGet", async () => {
  const data = await fetchGet("qq.info", { qq: 793207918 });
  expect(data.qq).toBe("793207918");
  expect(data.name).toBe("一杯敬朝阳。");
});
