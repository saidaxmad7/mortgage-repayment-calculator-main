import Image from "next/image";

type CalculateProps = {
  result: {
    monthly: string;
    total: string;
  } | null;
};

export default function Calculate({ result }: CalculateProps) {
  if (!result) {
    return (
      <section className="results-card w-full md:w-1/2 bg-slate-900 text-white flex flex-col items-center justify-center p-8">
        <Image
          src="/images/illustration-empty.svg"
          alt="empty"
          width={200}
          height={200}
        />
        <h3 className="text-2xl mt-1">Results shown here</h3>
        <p className="text-center mt-3 calculate-subtitle">
          Complete the form and click "calculate repayments" to see what your
          monthly repayments would be.
        </p>
      </section>
    );
  }

  return (
    <section className="results-card w-full md:w-1/2 bg-slate-900 text-white flex flex-col justify-center p-6 md:p-8">
      <h2 className="text-xl mb-2">Your results</h2>

      <div className="bg-slate-800 p-6 rounded-lg border-t-4 border-lime-400">
        <p className="text-slate-300">Your monthly repayments</p>
        <h1 className="text-4xl font-bold text-lime-400 mt-2">
          {result.monthly}
        </h1>

        <hr className="my-6 border-slate-700" />

        <p className="text-slate-300">
          Total you'll repay over the term
        </p>
        <p className="text-xl font-semibold">
          {result.total}
        </p>
      </div>
    </section>
  );
}
