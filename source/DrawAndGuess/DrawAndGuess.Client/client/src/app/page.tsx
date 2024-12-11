"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brush, Users, Trophy, Zap, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <AnimatePresence>
          <motion.div
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-16"
          >
            <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/lobbies">
                Start Drawing <Zap className="ml-2" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<Brush className="w-12 h-12 text-primary" />}
              title="Intuitive Drawing Tools"
              description="Express your ideas with our smooth, responsive drawing interface."
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-primary" />}
              title="Real-time Multiplayer"
              description="Connect and play with friends or random opponents worldwide."
            />
            <FeatureCard
              icon={<Trophy className="w-12 h-12 text-primary" />}
              title="Competitive Leaderboards"
              description="Climb the ranks and showcase your artistic and guessing skills."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Draw & Guess?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg py-2 px-4">Innovative Gameplay</Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4">Cross-platform</Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4">Regular Updates</Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4">Community-driven</Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <Sparkles className="w-16 h-16 mx-auto text-primary mb-4" />
            <p className="text-xl italic">
              "The most addictive drawing game I've ever played!"
            </p>
            <p className="text-lg text-muted-foreground mt-2">
              - Game Developer Magazine
            </p>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/20">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

