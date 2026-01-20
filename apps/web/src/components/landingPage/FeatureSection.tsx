import { motion } from "framer-motion";
import { Code2, Trophy, Users, Briefcase } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Practice",
    description: "3,500+ problems across data structures, algorithms, and system design. Filter by difficulty, topic, or company.",
  },
  {
    icon: Trophy,
    title: "Compete",
    description: "Weekly contests with global rankings. Test your skills against developers worldwide in timed challenges.",
  },
  {
    icon: Users,
    title: "Discuss",
    description: "Learn from community solutions. Share approaches, discuss edge cases, and explore optimal solutions.",
  },
  {
    icon: Briefcase,
    title: "Interview prep",
    description: "Company-specific question sets from Google, Meta, Amazon, and more. Real interview patterns and frequency data.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30" id="problems">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you need to level up
          </h2>
          <p className="text-muted-foreground text-lg">
            From beginner tutorials to advanced challenges, build the skills that land offers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
