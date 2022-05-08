/**
 * Airtable apiから返ってきたデータを元にユーザーオブジェクトを生成するクラス
 * @param id id
 * @param name 名前
 * @param age 年齢
 */

export default class User {
  private constructor(
    private name: string,
    private age: number,
    private id?: string
  ) {}

  /**
   * 完全コンストラクタパターンで実装してみる
   */
  static build(name?: string, age?: number, id?: string): User {
    // nameのバリデーション
    if (!name) {
      throw new Error("名前が設定されていません。");
    }

    // ageのバリデーション
    if (!age) {
      throw new Error("年齢が設定されていません。");
    }
    if (age < 18) {
      throw new Error("未成年は登録できません。");
    }
    return new User(name, age, id);
  }
}
