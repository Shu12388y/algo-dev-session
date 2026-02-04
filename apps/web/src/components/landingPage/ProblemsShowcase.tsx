import { motion } from "motion/react";
import { Check, Lock } from "lucide-react";

const problems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", acceptance: "52.1%", solved: true },
  { id: 2, title: "Add Two Numbers", difficulty: "Medium", acceptance: "42.3%", solved: true },
  { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", acceptance: "34.8%", solved: false },
  { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", acceptance: "38.9%", solved: false, premium: true },
  { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium", acceptance: "33.4%", solved: false },
  { id: 6, title: "Container With Most Water", difficulty: "Medium", acceptance: "54.2%", solved: true },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "text-easy";
    case "Medium": return "text-medium";
    case "Hard": return "text-hard";
    default: return "";
  }
};

export function ProblemsShowcase() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-32"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Curated problems for every skill level
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Progress from fundamentals to advanced topics with problems organized 
              by difficulty, category, and company frequency.
            </p>

            {/* Difficulty Breakdown */}
            <div className="space-y-5">
              {[
                { label: "Easy", count: 842, color: "bg-easy" },
                { label: "Medium", count: 1752, color: "bg-medium" },
                { label: "Hard", count: 906, color: "bg-hard" },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium tabular-nums">{item.count}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.count / 3500) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Problems Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl shadow-card overflow-hidden"
          >
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                <div className="col-span-1"></div>
                <div className="col-span-6">Problem</div>
                <div className="col-span-2 text-center">Difficulty</div>
                <div className="col-span-3 text-right">Acceptance</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border">
              {problems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer group"
                >
                  <div className="grid grid-cols-12 items-center text-sm">
                    <div className="col-span-1">
                      {problem.solved ? (
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                      ) : problem.premium ? (
                        <Lock className="w-4 h-4 text-medium" />
                      ) : (
                        <div className="w-5 h-5" />
                      )}
                    </div>
                    <div className="col-span-6">
                      <span className="text-foreground group-hover:text-primary transition-colors font-medium">
                        {problem.id}. {problem.title}
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <div className="col-span-3 text-right text-muted-foreground tabular-nums">
                      {problem.acceptance}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-border bg-muted/30 text-center">
              <span className="text-sm text-primary font-medium cursor-pointer hover:underline underline-offset-4">
                View all 3,500+ problems →
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
