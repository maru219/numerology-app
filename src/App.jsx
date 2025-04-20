
import React, { useState } from 'react';

const cycleMeanings = {
  1: { meaning: '発展・はじまり', feature: '新しい価値観、仕組みがスタートする年。新たな挑戦に向いています。', message: 'あなた自身は「新たなスタート」の年にいます。周囲の流れに左右されすぎず、あなたの中でふと湧いてくる「こうしてみたい」という気持ちに耳を傾けてみるのはどうでしょう？\n\nまだ形になっていないもの、まだ誰にも話していないアイディアがあるなら、まずは少しずつ動かしてみることから始めてみてもいいかもしれません。\n\nたとえば、「新しい挑戦に一歩踏み出してみる」「思いついたアイディアをノートに書いてみる」「誰かに話してみる」など、小さな行動が大きな流れを作る予感です。\n\n周りのペースと自分のペースが違うことを気にせず、あなたのリズムで未来を描いてみるのはどうでしょう？' },
  2: { meaning: '協調・バランス', feature: '人間関係や感情の調整がテーマ。焦らず調和を意識して。' },
  3: { meaning: '創造・変動', feature: '創造力が高まり、表現や発信に向いています。変化も起こりやすい年。' },
  4: { meaning: '安定・現状維持', feature: '地に足をつけ、計画や基盤を整える時期。堅実さが大切。' },
  5: { meaning: '変化・流れ', feature: '変化の波に乗りやすい年。柔軟に行動することでチャンスが広がります。' },
  6: { meaning: '調和・愛', feature: '家族やパートナーとの関係性を育てる年。思いやりがテーマです。' },
  7: { meaning: '探求・精神性', feature: '内面を見つめ直す時期。学びや瞑想に向いています。' },
  8: { meaning: '成果・実現', feature: 'これまでの努力が形になる時。結果を意識して行動しましょう。' },
  9: { meaning: '完了・手放し', feature: '一区切りの年。不要なものを手放し、次の準備を始めましょう。', message: '社会全体は一区切りのタイミングにあります。\n\n大きな流れの中で、何かを手放したり、卒業したりする人や出来事が増えてくるかもしれません。\n\n今、あなたの周りでも、古くなった価値観や関係性を手放す流れが起きているのではないでしょうか。' },
  11: { meaning: '直感・啓示', feature: 'インスピレーションが高まる年。使命やビジョンに気づく時。' },
  22: { meaning: '理想・構築', feature: '大きな理想を現実に落とし込む年。実行力が問われます。' }
};

function calculateBirthNumber(birthdate) {
  const sum = birthdate.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  if ([11, 22, 33].includes(sum)) return sum;
  return reduceToSingleDigit(sum);
}

function reduceToSingleDigit(num) {
  while (num > 9 && ![11, 22].includes(num)) {
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return num;
}

function calculateCycle(year) {
  return reduceToSingleDigit(
    year.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
  );
}

function calculatePersonalCycle(year, birthNumber) {
  const yearCycle = calculateCycle(year);
  return reduceToSingleDigit(yearCycle + birthNumber);
}

export default function App() {
  const [birthdate, setBirthdate] = useState('');
  const [birthNumber, setBirthNumber] = useState(null);
  const [yearCycle, setYearCycle] = useState(null);
  const [personalCycle, setPersonalCycle] = useState(null);

  const currentYear = new Date().getFullYear();

  const handleCalculate = () => {
    if (birthdate.length !== 8 || isNaN(birthdate)) return;
    const bn = calculateBirthNumber(birthdate);
    const yc = calculateCycle(currentYear);
    const pc = calculatePersonalCycle(currentYear, bn);
    setBirthNumber(bn);
    setYearCycle(yc);
    setPersonalCycle(pc);
  };

  const handleReset = () => {
    setBirthdate('');
    setBirthNumber(null);
    setYearCycle(null);
    setPersonalCycle(null);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">STEP1：生年月日を入力</h1>
      <input
        type="text"
        placeholder="例：19791208"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleCalculate} className="bg-blue-500 text-white px-4 py-2 rounded">
        計算する
      </button>

      {birthNumber !== null && yearCycle !== null && personalCycle !== null && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">STEP2：診断結果</h2>
          <p className="font-semibold mb-2">🔢 あなたの誕生数：{birthNumber}</p>
          <h2 className="text-lg font-bold mb-1">🌍 社会のサイクル（{currentYear}年）：{yearCycle}「{cycleMeanings[yearCycle]?.meaning}」</h2>
          <p className="mb-1">{cycleMeanings[yearCycle]?.message}</p>

          <h2 className="text-lg font-bold mt-4 mb-1">👤 あなたの個人年サイクル（{currentYear}年）：{personalCycle}「{cycleMeanings[personalCycle]?.meaning}」</h2>
          <p className="mb-4">{cycleMeanings[personalCycle]?.message}</p>

          <p className="italic mb-6">
            この数秘診断は、あなたが「自分らしい流れ」に気づくための入口です。<br />
            今、見えてきた流れやサイクルを感じながら、
            「どんなふうに過ごしてみるのが心地よいだろう？」と、
            ちょっとだけ立ち止まってみるのもいいかもしれません🌿<br />
            もっと詳しく知りたい方のために、有料診断もご用意しています。
          </p>

          <button
            onClick={handleReset}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            別の人で試してみる
          </button>
        </div>
      )}
    </div>
  );
}
