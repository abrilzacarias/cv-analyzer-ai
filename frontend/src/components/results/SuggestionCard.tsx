import type { FC, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SuggestionCardProps {
  icon: ReactNode;
  title: string;
  suggestions: string[];
  emptyStateText: string;
}

export const SuggestionCard: FC<SuggestionCardProps> = ({
  icon,
  title,
  suggestions,
  emptyStateText,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="px-4 py-2 text-sm font-medium bg-chart-3/12 text-chart-3 border border-chart-3/25 hover:bg-chart-3/18 hover:scale-103 transition-all duration-200 shadow-sm rounded-xl"
            >
              {suggestion}
            </Badge>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">{emptyStateText}</p>
        )}
      </CardContent>
    </Card>
  );
};
