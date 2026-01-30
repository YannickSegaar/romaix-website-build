'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface IndustryFilterProps {
  industries: string[];
  selectedIndustry?: string;
}

export function IndustryFilter({
  industries,
  selectedIndustry,
}: IndustryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleIndustryClick = (industry: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (industry === null) {
      params.delete('industry');
    } else {
      params.set('industry', industry);
    }

    const query = params.toString();
    router.push(`/case-studies${query ? `?${query}` : ''}`);
  };

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <Button
        variant={!selectedIndustry ? 'default' : 'outline'}
        onClick={() => handleIndustryClick(null)}
      >
        All
      </Button>
      {industries.map((industry) => (
        <Button
          key={industry}
          variant={selectedIndustry === industry ? 'default' : 'outline'}
          onClick={() => handleIndustryClick(industry)}
        >
          {industry}
        </Button>
      ))}
    </div>
  );
}
