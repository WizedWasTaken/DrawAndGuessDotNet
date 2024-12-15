import { Card, CardContent } from "@/components/ui/card";
import { CardSpotlight } from "./ui/card-spotlight";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <CardSpotlight>
      <section className="relative z-20">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </section>
    </CardSpotlight>
  );
}
