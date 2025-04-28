"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [initialCost, setInitialCost] = useState(0);
  const [monthlyPlans, setMonthlyPlans] = useState([
    { startDate: "", endDate: "", cost: 0 }
  ]);
  const [penaltyPlans, setPenaltyPlans] = useState([
    { untilMonth: 12, penaltyCost: 0 }
  ]);
  const [contractStartDate, setContractStartDate] = useState("");
  const [noPenalty, setNoPenalty] = useState(false);

  const router = useRouter();
  const [regularInitialCost, setRegularInitialCost] = useState(0);
const [regularMonthlyCost, setRegularMonthlyCost] = useState(0);

  // 全角→半角変換関数
  const toHalfWidth = (str: string) => {
    return str.replace(/[０-９]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">キャンペーンシミュレーター</h1>

      <div className="flex flex-col gap-6 w-full max-w-md">

        {/* 初期費用 */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">初期費用（円）</label>
          <input
            type="text"
            value={initialCost}
            onChange={(e) => {
              const value = toHalfWidth(e.target.value);
              const num = Number(value);
              if (!isNaN(num)) {
                setInitialCost(num);
              } else if (value === "") {
                setInitialCost(0);
              }
            }}
            className="border p-2 rounded"
            placeholder="例）10000"
          />
        </div>

        {/* 契約開始日 */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">契約開始日</label>
          <input
            type="date"
            value={contractStartDate}
            onChange={(e) => setContractStartDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        {/* 月額費用プラン */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">月額費用プラン</h2>

          {monthlyPlans.map((plan, index) => (
            <div key={index} className="flex flex-col gap-2 border p-4 rounded">
              <div className="flex flex-col">
                <label className="font-semibold mb-1">月額費用（円）</label>
                <input
                  type="text"
                  value={plan.cost}
                  onChange={(e) => {
                    const value = toHalfWidth(e.target.value);
                    const num = Number(value);
                    const newPlans = [...monthlyPlans];
                    if (!isNaN(num)) {
                      newPlans[index].cost = num;
                    } else if (value === "") {
                      newPlans[index].cost = 0;
                    }
                    setMonthlyPlans(newPlans);
                  }}
                  className="border p-2 rounded"
                  placeholder="例）3000"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">適用開始日</label>
                <input
                  type="date"
                  value={plan.startDate}
                  onChange={(e) => {
                    const newPlans = [...monthlyPlans];
                    newPlans[index].startDate = e.target.value;
                    setMonthlyPlans(newPlans);
                  }}
                  className="border p-2 rounded"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">適用終了日</label>
                <input
                  type="date"
                  value={plan.endDate}
                  onChange={(e) => {
                    const newPlans = [...monthlyPlans];
                    newPlans[index].endDate = e.target.value;
                    setMonthlyPlans(newPlans);
                  }}
                  className="border p-2 rounded"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            className="bg-green-500 text-white rounded p-2 hover:bg-green-600"
            onClick={() =>
              setMonthlyPlans([...monthlyPlans, { startDate: "", endDate: "", cost: 0 }])
            }
          >
            ＋プランを追加
          </button>
        </div>

        {/* 違約金プラン */}
        <div className="flex flex-col gap-4 mt-8">
          <h2 className="text-lg font-semibold">違約金プラン</h2>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={noPenalty}
              onChange={(e) => setNoPenalty(e.target.checked)}
            />
            <label className="font-semibold">違約金なし（自由解約OK）</label>
          </div>

          {penaltyPlans.map((plan, index) => (
            <div key={index} className="flex gap-2 items-center border p-4 rounded">
              <div className="flex flex-col flex-1">
                <label className="font-semibold mb-1">何ヶ月以内の解約</label>
                <input
                  type="text"
                  value={plan.untilMonth}
                  onChange={(e) => {
                    const value = toHalfWidth(e.target.value);
                    const num = Number(value);
                    const newPlans = [...penaltyPlans];
                    if (!isNaN(num)) {
                      newPlans[index].untilMonth = num;
                    } else if (value === "") {
                      newPlans[index].untilMonth = 0;
                    }
                    setPenaltyPlans(newPlans);
                  }}
                  className="border p-2 rounded"
                  placeholder="例）12"
                />
              </div>

              <div className="flex flex-col flex-1">
                <label className="font-semibold mb-1">違約金（円）</label>
                <input
                  type="text"
                  value={plan.penaltyCost}
                  onChange={(e) => {
                    const value = toHalfWidth(e.target.value);
                    const num = Number(value);
                    const newPlans = [...penaltyPlans];
                    if (!isNaN(num)) {
                      newPlans[index].penaltyCost = num;
                    } else if (value === "") {
                      newPlans[index].penaltyCost = 0;
                    }
                    setPenaltyPlans(newPlans);
                  }}
                  className="border p-2 rounded"
                  placeholder="例）20000"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            className="bg-green-500 text-white rounded p-2 hover:bg-green-600"
            onClick={() =>
              setPenaltyPlans([...penaltyPlans, { untilMonth: 12, penaltyCost: 0 }])
            }
          >
            ＋違約条件を追加
          </button>
        </div>

        {/* 正規プラン設定 */}
<div className="flex flex-col gap-4 mt-8">
  <h2 className="text-lg font-semibold">正規プラン</h2>

  <div className="flex flex-col">
    <label className="font-semibold mb-1">初期費用（円）</label>
    <input
      type="text"
      value={regularInitialCost}
      onChange={(e) => {
        const value = toHalfWidth(e.target.value);
        const num = Number(value);
        if (!isNaN(num)) {
          setRegularInitialCost(num);
        } else if (value === "") {
          setRegularInitialCost(0);
        }
      }}
      className="border p-2 rounded"
      placeholder="例）2000"
    />
  </div>

  <div className="flex flex-col">
    <label className="font-semibold mb-1">月額費用（円）</label>
    <input
      type="text"
      value={regularMonthlyCost}
      onChange={(e) => {
        const value = toHalfWidth(e.target.value);
        const num = Number(value);
        if (!isNaN(num)) {
          setRegularMonthlyCost(num);
        } else if (value === "") {
          setRegularMonthlyCost(0);
        }
      }}
      className="border p-2 rounded"
      placeholder="例）6000"
    />
  </div>
</div>

        {/* シミュレーションボタン */}
        <button
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 mt-4"
          onClick={() => {
            if (!contractStartDate) {
              alert("契約開始日を入力してください。");
              return;
            }
          
            let campaignTotalCost = 0;
            let month = 0;
            const sortedPlans = monthlyPlans.sort((a, b) =>
              (a.startDate || "").localeCompare(b.startDate || "")
            );
            const sortedPenalties = penaltyPlans.sort((a, b) => a.untilMonth - b.untilMonth);
          
            while (month < 120) {
              month++;
          
              // キャンペーン月額費用を取得
              let monthlyFee = 0;
              for (const plan of sortedPlans) {
                if (plan.startDate && plan.endDate) {
                  const start = new Date(plan.startDate);
                  const end = new Date(plan.endDate);
                  const today = new Date(contractStartDate);
                  today.setMonth(today.getMonth() + month - 1);
                  if (today >= start && today <= end) {
                    monthlyFee = plan.cost;
                    break;
                  }
                }
              }
          
              campaignTotalCost += monthlyFee;
          
              // 違約金考慮
              let penalty = 0;
              if (!noPenalty) {
                for (const plan of sortedPenalties) {
                  if (month <= plan.untilMonth) {
                    penalty = plan.penaltyCost;
                    break;
                  }
                }
              }
          
              // キャンペーンプランが得か判定
              if (campaignTotalCost >= initialCost + penalty) {
                const startDate = new Date(contractStartDate);
                startDate.setMonth(startDate.getMonth() + month - 1);
          
                // 正規プランのコストを計算
                const regularTotalCost = regularInitialCost + regularMonthlyCost * month;
          
                let comparisonMessage = "";
                if (campaignTotalCost < regularTotalCost) {
                  const diff = regularTotalCost - campaignTotalCost;
                  comparisonMessage = `キャンペーンの方が${diff.toLocaleString()}円お得です！`;
                } else if (campaignTotalCost > regularTotalCost) {
                  const diff = campaignTotalCost - regularTotalCost;
                  comparisonMessage = `正規プランの方が${diff.toLocaleString()}円お得です！`;
                } else {
                  comparisonMessage = "キャンペーンも正規プランも同じコストです！";
                }
          
                const formattedDate = `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日`;
                router.push(`/result?result=契約開始から${month}ヶ月後、つまり ${formattedDate} 以降に得になります！ ${comparisonMessage}`);
                return;
              }
            }
          
            // 得できない場合
            const startDate = new Date(contractStartDate);
            startDate.setMonth(startDate.getMonth() + 120 - 1);
            const formattedDate = `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日`;
          
            router.push(`/result?result=${formattedDate}時点でも得できないため、このキャンペーンでは得できません。`);
          }}
        >
          シミュレーションする
        </button>

      </div>
    </main>
  );
}