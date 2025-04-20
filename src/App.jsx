import React, { useState } from "react";

const calculateBirthNumber = (birthdate) => {
  const sum = birthdate.split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  return reduceToSingleDigit(sum);
};

const reduceToSingleDigit = (num) => {
  while (num > 9 && ![11, 22, 33].includes(num)) {
    num = num
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return num;
};

const calculateCycle = (year) => reduceToSingleDigit([...year.toString()].reduce((acc, n) => acc + +n, 0));
const calculatePersonalCycle = (year, birthNumber) => reduceToSingleDigit(calculateCycle(year) + birthNumber);

export default function App() {
  const [birthdate, setBirthdate] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (birthdate.length !== 8 || isNaN(birthdate)) return;

    const birthNumber = calculateBirthNumber(birthdate);
    const year = new Date().getFullYear();
    const yearCycle = calculateCycle(year);
    const personalCycle = calculatePersonalCycle(year, birthNumber);

    setLoading(true);
    const res = await fetch("/api/generate-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, birthNumber, yearCycle, personalCycle, year }),
    });

    const data = await res.json();
    setLoading(false);

    setResult({ birthNumber, yearCycle, personalCycle, message: data.message });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">数秘術診断（無料）</h1>

      <input
        type="text"
        placeholder="名前（ニックネーム可）"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="生年月日（例：19791208）"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleCalculate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "診断中..." : "診断する"}
      </button>

      {result && (
        <div className="mt-6">
          <p className="font-semibold">🔢 あなたの誕生数：{result.birthNumber}</p>
          <p className="mt-2">🌍 社会のサイクル（{new Date().getFullYear()}年）：{result.yearCycle}</p>
          <p>👤 あなたの個人年サイクル：{result.personalCycle}</p>
          <div className="mt-4 whitespace-pre-wrap border p-4 rounded bg-gray-50">
            {result.message}
          </div>
        </div>
      )}
    </div>
  );
}
