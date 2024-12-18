"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import { Badge } from "@/components/ui/badge";
import { Brush, Users, Trophy, Zap, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-grow flex-col">
      <main className="container flex flex-col flex-grow mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <AnimatePresence>
          <motion.div
            key={0}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Draw & Guess
            </h1>
            <p className="text-2xl text-center mb-12 text-muted-foreground">
              Unleash your creativity in this multiplayer sensation!
            </p>
          </motion.div>

          <motion.div
            key={1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-16"
          >
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/lobbies">
                Start Drawing <Zap className="ml-2" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            key={2}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <FeatureCard
              key={1}
              icon={<Brush className="w-12 h-12 text-primary" />}
              title="Intuitive Drawing Tools"
              description="Express your ideas with our smooth, responsive drawing interface."
            />
            <FeatureCard
              key={2}
              icon={<Users className="w-12 h-12 text-primary" />}
              title="Real-time Multiplayer"
              description="Connect and play with friends or random opponents worldwide."
            />
            <FeatureCard
              key={3}
              icon={<Trophy className="w-12 h-12 text-primary" />}
              title="Competitive Leaderboards"
              description="Climb the ranks and showcase your artistic and guessing skills."
            />
          </motion.div>

          <motion.div
            key={3}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Draw & Guess?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg py-2 px-4">
                Innovative Gameplay
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4">
                Cross-platform
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4">
                Regular Updates
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4">
                Community-driven
              </Badge>
            </div>
          </motion.div>

          <motion.div
            key={4}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <Sparkles className="w-16 h-16 mx-auto text-primary mb-4" />
            <p className="text-xl italic">
              &quot;The most addictive drawing game I&apos;ve ever played!&quot;
            </p>
            <p className="text-lg text-muted-foreground mt-2">
              - Game Developer Magazine
            </p>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
