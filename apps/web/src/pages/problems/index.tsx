/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { problems } from "../../services/api";
import LoadingPage from "../../components/loading/loading";
import ErrorPage from "../../components/error/error";

// const problems = [
//   {
//     id: 1,
//     title: "Two Sum",
//     difficulty: "Easy",
//     acceptance: 52.1,
//     solved: true,
//     tags: ["Array", "Hash Table"],
//   },
//   {
//     id: 2,
//     title: "Add Two Numbers",
//     difficulty: "Medium",
//     acceptance: 42.3,
//     solved: true,
//     tags: ["Linked List", "Math"],
//   },
//   {
//     id: 3,
//     title: "Longest Substring Without Repeating Characters",
//     difficulty: "Medium",
//     acceptance: 34.8,
//     solved: false,
//     tags: ["String", "Sliding Window"],
//   },
//   {
//     id: 4,
//     title: "Median of Two Sorted Arrays",
//     difficulty: "Hard",
//     acceptance: 38.9,
//     solved: false,
//     premium: true,
//     tags: ["Array", "Binary Search"],
//   },
//   {
//     id: 5,
//     title: "Longest Palindromic Substring",
//     difficulty: "Medium",
//     acceptance: 33.4,
//     solved: false,
//     tags: ["String", "DP"],
//   },
//   {
//     id: 6,
//     title: "Container With Most Water",
//     difficulty: "Medium",
//     acceptance: 54.2,
//     solved: true,
//     tags: ["Two Pointers"],
//   },
// ];

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"] as const;

const difficultyColor = (d: string) =>
  d === "Easy"
    ? "text-easy"
    : d === "Medium"
      ? "text-medium"
      : d === "Hard"
        ? "text-hard"
        : "";

export default function ProblemsPage() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] =
    useState<(typeof DIFFICULTIES)[number]>("All");
  const [showSolved, setShowSolved] = useState(false);

  const { data, error, loading } = useSelector(
    (state: RootState) => state.problems,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(problems()).unwrap();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Problems</h1>
            <p className="text-muted-foreground mt-1">
              Practice data structures & algorithms
            </p>
            <div className="flex gap-4 mt-3 text-sm"></div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search problems"
                className="pl-9 pr-3 py-2 rounded-xl bg-muted/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="flex bg-muted/40 rounded-xl border border-border overflow-hidden">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-3 py-2 text-sm transition ${difficulty === d ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                >
                  {d}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showSolved}
                onChange={(e) => setShowSolved(e.target.checked)}
              />
              Solved only
            </label>
          </div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl shadow-card overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-border bg-muted/30">
            <div className="grid grid-cols-10 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              <div className="col-span-1"></div>
              <div className="col-span-6">Problem</div>
              <div className="col-span-2 text-center">Difficulty</div>
            </div>
          </div>

          <div className="divide-y divide-border">
            {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {data?.data?.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="px-6 py-4 hover:bg-muted/30 cursor-pointer group"
              >
                <Link to={`/problem/${p.title}`}>
                  <div className="grid grid-cols-10 items-center text-sm">
                    <div className="col-span-7">
                      <div className="font-medium group-hover:text-primary">
                        {p.title}
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <span
                        className={`font-medium ${difficultyColor(p.type)}`}
                      >
                        {p.type}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* @ts-ignore */}
            {data?.data?.length === 0 && (
              <div className="px-6 py-10 text-center text-muted-foreground">
                No problems found
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t border-border bg-muted/30 text-center">
            <span className="text-sm text-primary font-medium hover:underline cursor-pointer">
              View all problems →
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
