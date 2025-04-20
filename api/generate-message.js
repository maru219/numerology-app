export const config = {
  runtime: "nodejs",
};

import { NextResponse } from "next/server";

export async function POST(req) {
  return NextResponse.json({
    message: "これはテスト用のメッセージです。APIの呼び出しなしで関数が正常動作するかを確認しています。"
  });
}
