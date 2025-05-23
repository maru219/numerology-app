import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, birthNumber, yearCycle, personalCycle, year } = await req.json();

  const prompt = `あなたはやさしく丁寧な数秘術のガイドです。
名前は「${name}」さん。
誕生数は ${birthNumber}、個人年サイクルは ${personalCycle}、社会のサイクルは ${yearCycle}（${year}年）です。
この方に向けて「前向きな未来をデザインするヒント」となるようなやさしい導きのメッセージを出してください。
語尾は「〜してみるのはどうでしょう？」など、優しい提案の口調で、2〜3段落でお願いします。`;

  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "あなたは優しい日本語の数秘術ガイドです。数値や周期をもとにやさしくアドバイスを伝えます。",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.9,
    }),
  });

  const data = await response.json();
  const message = data.choices?.[0]?.message?.content || "メッセージの取得に失敗しました。";

  return NextResponse.json({ message });
}
