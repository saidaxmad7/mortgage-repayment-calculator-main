"use client";

import Calculate from "@/components/Calculate";
import Inputs from "@/components/Inputs";
import { useState } from "react";

export default function Home() {
    const [result, setResult] = useState<{
        monthly: string;
        total: string;
    } | null>(null);

    return (
        <main className='min-h-screen flex items-center justify-center bg-slate-100 px-4 flex-col md:flex-row w-full rounded-xl overflow-hidden shadow-lg'>
            <div className='page bg-white flex max-w-5xl w-full rounded-xl overflow-hidden shadow-lg'>
                <Inputs setResult={setResult} />
                <Calculate result={result} />
            </div>
        </main>
    );
}
