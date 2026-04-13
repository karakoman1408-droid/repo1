import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("ny-trades");
    if (saved) {
      setRows(JSON.parse(saved));
    } else {
      setRows([
        { date: "2026-04-13", market: "NAS100", time: "08:30", setup: "OB + FVG + SMT", result: "Win", pl: 300 },
        { date: "2026-04-14", market: "NAS100", time: "09:00", setup: "Sweep + FVG", result: "Loss", pl: -100 },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ny-trades", JSON.stringify(rows));
  }, [rows]);

  const stats = useMemo(() => {
    const total = rows.length;
    const wins = rows.filter((r) => r.result === "Win").length;
    const net = rows.reduce((a, b) => a + Number(b.pl || 0), 0);
    const best = rows[0]?.time || "08:30";
    return [
      { label: "Total Trades", value: total },
      { label: "Win Rate", value: total ? `${Math.round((wins / total) * 100)}%` : "0%" },
      { label: "Net P/L", value: `$${net}` },
      { label: "Best Time", value: `${best} NY` },
    ];
  }, [rows]);

  const addTrade = () => {
    const trade = {
      date: new Date().toISOString().slice(0, 10),
      market: "NAS100",
      time: "08:30",
      setup: "OB + FVG + SMT",
      result: "Win",
      pl: 300,
    };
    setRows((prev) => [trade, ...prev]);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">NY OB + FVG + SMT Journal</h1>
          <button
            onClick={addTrade}
            className="rounded-2xl px-4 py-2 shadow bg-white font-medium"
          >
            + Add Trade
          </button>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow p-5">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-2xl font-semibold mt-2">{s.value}</p>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Recent Trades</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3">Date</th>
                <th>Market</th>
                <th>Time</th>
                <th>Setup</th>
                <th>Result</th>
                <th>P/L</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-3">{r.date}</td>
                  <td>{r.market}</td>
                  <td>{r.time}</td>
                  <td>{r.setup}</td>
                  <td>{r.result}</td>
                  <td>{r.pl > 0 ? `+${r.pl}` : r.pl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
