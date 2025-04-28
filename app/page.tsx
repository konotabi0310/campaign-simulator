"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [initialCost, setInitialCost] = useState(0);
  const [monthlyPlans, setMonthlyPlans] = useState<
    { startDate: string; endDate: string; cost: number }[]
  >([{ startDate: "", endDate: "", cost: 0 }]);
  const [penaltyPlans, setPenaltyPlans] = useState<
    { untilMonth: number; penaltyCost: number }[]
  >([{ untilMonth: 12, penaltyCost: 0 }]);
  const [contractStartDate, setContractStartDate] = useState("");
  const [noPenalty, setNoPenalty] = useState(false);
  const [regularInitialCost, setRegularInitialCost] = useState(0);
  const [regularMonthlyCost, setRegularMonthlyCost] = useState(0);

  const router = useRouter();

  const toHalfWidth = (str: string) =>
    str.replace(/[０-９]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">キャンペーンシミュレーター</h1>
      <div className="w-full max-w-md flex flex-col gap-6">

        {/* 初期費用 */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">初期費用（円）</label>
          <input
            type="text"
            value={initialCost}
            onChange={(e) => {
              const v = toHalfWidth(e.target.value);
              const n = Number(v);
              setInitialCost(!isNaN(n) ? n : 0);
            }}
            className="border rounded p-2"
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
            className="border rounded p-2"
          />
        </div>

        {/* 月額費用プラン */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">月額費用プラン</h2>
          {monthlyPlans.map((plan, i) => (
            <div key={i} className="border rounded p-4 flex flex-col gap-2">
              <label className="font-semibold">月額費用（円）</label>
              <input
                type="text"
                value={plan.cost}
                onChange={(e) => {
                  const v = toHalfWidth(e.target.value);
                  const n = Number(v);
                  const arr = [...monthlyPlans];
                  arr[i].cost = !isNaN(n) ? n : 0;
                  setMonthlyPlans(arr);
                }}
                className="border rounded p-2"
                placeholder="例）3000"
              />
              <label className="font-semibold">適用開始日</label>
              <input
                type="date"
                value={plan.startDate}
                onChange={(e) => {
                  const arr = [...monthlyPlans];
                  arr[i].startDate = e.target.value;
                  setMonthlyPlans(arr);
                }}
                className="border rounded p-2"
              />
              <label className="font-semibold">適用終了日</label>
              <input
                type="date"
                value={plan.endDate}
                onChange={(e) => {
                  const arr = [...monthlyPlans];
                  arr[i].endDate = e.target.value;
                  setMonthlyPlans(arr);
                }}
                className="border rounded p-2"
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 text-white rounded p-2"
            onClick={() =>
              setMonthlyPlans([
                ...monthlyPlans,
                { startDate: "", endDate: "", cost: 0 },
              ])
            }
          >
            ＋プランを追加
          </button>
        </div>

        {/* 違約金プラン */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">違約金プラン</h2>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={noPenalty}
              onChange={(e) => setNoPenalty(e.target.checked)}
            />
            違約金なし（自由解約OK）
          </label>
          {!noPenalty &&
            penaltyPlans.map((plan, i) => (
              <div key={i} className="border rounded p-4 flex gap-2">
                <div className="flex-1 flex flex-col">
                  <label className="font-semibold">何ヶ月以内の解約</label>
                  <input
                    type="text"
                    value={plan.untilMonth}
                    onChange={(e) => {
                      const v = toHalfWidth(e.target.value);
                      const n = Number(v);
                      const arr = [...penaltyPlans];
                      arr[i].untilMonth = !isNaN(n) ? n : 0;
                      setPenaltyPlans(arr);
                    }}
                    className="border rounded p-2"
                    placeholder="例）12"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="font-semibold">違約金（円）</label>
                  <input
                    type="text"
                    value={plan.penaltyCost}
                    onChange={(e) => {
                      const v = toHalfWidth(e.target.value);
                      const n = Number(v);
                      const arr = [...penaltyPlans];
                      arr[i].penaltyCost = !isNaN(n) ? n : 0;
                      setPenaltyPlans(arr);
                    }}
                    className="border rounded p-2"
                    placeholder="例）20000"
                  />
                </div>
              </div>
            ))}
          {!noPenalty && (
            <button
              type="button"
              className="bg-green-500 text-white rounded p-2"
              onClick={() =>
                setPenaltyPlans([
                  ...penaltyPlans,
                  { untilMonth: 12, penaltyCost: 0 },
                ])
              }
            >
              ＋違約条件を追加
            </button>
          )}
        </div>

        {/* 正規プラン設定 */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">正規プラン</h2>
          <label className="font-semibold">初期費用（円）</label>
          <input
            type="text"
            value={regularInitialCost}
            onChange={(e) => {
              const v = toHalfWidth(e.target.value);
              const n = Number(v);
              setRegularInitialCost(!isNaN(n) ? n : 0);
            }}
            className="border rounded p-2"
            placeholder="例）2000"
          />
          <label className="font-semibold">月額費用（円）</label>
          <input
            type="text"
            value={regularMonthlyCost}
            onChange={(e) => {
              const v = toHalfWidth(e.target.value);
              const n = Number(v);
              setRegularMonthlyCost(!isNaN(n) ? n : 0);
            }}
            className="border rounded p-2"
            placeholder="例）6000"
          />
        </div>

        {/* シミュレーションボタン */}
        <button
          className="bg-blue-500 text-white rounded p-3 mt-4"
          onClick={() => {
            if (!contractStartDate) {
              alert("契約開始日を入力してください。");
              return;
            }

            let campaignTotal = initialCost;
            let month = 0;
            const sp = [...monthlyPlans].sort((a, b) =>
              (a.startDate || "").localeCompare(b.startDate || "")
            );
            const pp = [...penaltyPlans].sort((a, b) => a.untilMonth - b.untilMonth);

            while (month < 120) {
              month++;
              // 月額取得
              let fee = 0;
              for (const p of sp) {
                if (p.startDate && p.endDate) {
                  const s = new Date(p.startDate);
                  const e = new Date(p.endDate);
                  const t = new Date(contractStartDate);
                  t.setMonth(t.getMonth() + month - 1);
                  if (t >= s && t <= e) {
                    fee = p.cost;
                    break;
                  }
                }
              }
              campaignTotal += fee;
              // 違約金
              let pen = 0;
              if (!noPenalty) {
                for (const x of pp) {
                  if (month <= x.untilMonth) {
                    pen = x.penaltyCost;
                    break;
                  }
                }
              }
              // 正規コスト
              const regularTotal = regularInitialCost + regularMonthlyCost * month;
              // 比較
              if (campaignTotal >= pen + initialCost) {
                const d = new Date(contractStartDate);
                d.setMonth(d.getMonth() + month - 1);
                const formatted = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
                let msg = "";
                if (campaignTotal < regularTotal) {
                  msg = `キャンペーンの方が${(regularTotal - campaignTotal).toLocaleString()}円お得！`;
                } else if (campaignTotal > regularTotal) {
                  msg = `正規プランの方が${(campaignTotal - regularTotal).toLocaleString()}円お得！`;
                } else {
                  msg = "どちらも同じコストです！";
                }
                router.push(
                  `/result?result=契約開始から${month}ヶ月後（${formatted}）以降に得になります！${msg}`
                );
                return;
              }
            }
            const d10 = new Date(contractStartDate);
            d10.setMonth(d10.getMonth() + 119);
            const f10 = `${d10.getFullYear()}年${d10.getMonth() + 1}月${d10.getDate()}日`;
            router.push(
              `/result?result=${f10}時点でも得できないため、このキャンペーンでは得できません。`
            );
          }}
        >
          シミュレーションする
        </button>
      </div>
    </main>
  );
}