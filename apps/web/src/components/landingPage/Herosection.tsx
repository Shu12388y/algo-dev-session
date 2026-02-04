import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Hero3D } from "./Hero3D";

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden min-h-[90vh]">
      {/* 3D Background - Full on mobile, right side on desktop */}
      <div className="absolute inset-0 sm:left-auto sm:w-3/4 lg:w-1/2 h-full">
        <Hero3D />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            New: Weekly contest rankings
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-balance mb-6"
          >
            Where developers
            <br />
            <span className="text-primary">master algorithms</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-10"
          >
            Practice coding problems, prepare for technical interviews, and join
            a global community of over 2 million developers.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Button variant="default" size="lg">
              Start practicing
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg">
              Explore problems
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-border max-w-2xl"
        >
          {[
            { value: "3,500+", label: "Coding problems" },
            { value: "2M+", label: "Active developers" },
            { value: "500+", label: "Company partners" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
