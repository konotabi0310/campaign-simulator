"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Result() {
const searchParams = useSearchParams();
const resultText = searchParams.get("result");

return (
<div className="bg-gray-100 p-6 rounded text-center text-lg">
{resultText || "結果が見つかりませんでした。"}
</div>
);
}

export default function ResultPage() {
return (
<main className="flex flex-col items-center justify-center min-h-screen p-4">
<h1 className="text-2xl font-bold mb-6">シミュレーション結果</h1>
<Suspense fallback={<div>Loading...</div>}>
<Result />
</Suspense>
</main>
);
}