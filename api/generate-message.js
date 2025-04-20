import { NextResponse } from "next/server";

export async function POST(req) {
  return NextResponse.json({
    message: "✅ テスト成功！generate-message.js は正しく動作しています。",
  });
}
