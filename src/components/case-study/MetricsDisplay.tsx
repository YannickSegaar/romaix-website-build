import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FadeIn } from '@/components/motion';

interface MetricResult {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

interface MetricsDisplayProps {
  results: MetricResult[];
}

export function MetricsDisplay({ results }: MetricsDisplayProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((result, index) => (
        <FadeIn key={index} delay={index * 0.1}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{result.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Improvement value prominently displayed */}
              <div className="text-5xl font-bold text-primary mb-4">
                {result.improvement}
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Before:</span>
                  <span className="font-medium">{result.before}</span>
                </div>
                <div className="flex justify-between">
                  <span>After:</span>
                  <span className="font-medium text-primary">{result.after}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      ))}
    </div>
  );
}
