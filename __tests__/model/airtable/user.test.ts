import User from "../../../src/model/airtable/user";

describe("Userモデルのテスト", () => {
  describe("validations", () => {
    describe("nameが空文字の場合", () => {
      it("エラーが発生すること", () => {
        expect(() => User.build("", 28)).toThrow("名前が設定されていません。");
      });
    });
    describe("nameがundefinedの場合", () => {
      it("エラーが発生すること", () => {
        expect(() => User.build(undefined, 28)).toThrow(
          "名前が設定されていません。"
        );
      });
    });
    describe("nameが設定されていた場合", () => {
      it("ユーザーが生成されること", () => {
        expect(User.build("太郎", 28)).toHaveProperty("name", "太郎");
      });
    });

    describe("ageがundefinedの場合", () => {
      it("エラーが発生すること", () => {
        expect(() => User.build("太郎", undefined)).toThrow(
          "年齢が設定されていません。"
        );
      });
    });
    describe("ageが18歳未満の場合", () => {
      it("エラーが発生すること", () => {
        expect(() => User.build("太郎", 17)).toThrow(
          "未成年は登録できません。"
        );
      });
    });
    describe("ageが18歳以上の場合", () => {
      it("ユーザーが生成されること", () => {
        expect(User.build("太郎", 18)).toHaveProperty("age", 18);
      });
    });
  });
});
