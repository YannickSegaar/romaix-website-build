import Image from 'next/image';

interface WorkflowComparisonProps {
  beforeImage: string;
  afterImage: string;
}

export function WorkflowComparison({
  beforeImage,
  afterImage,
}: WorkflowComparisonProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 my-12">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-destructive">
          Before: Manual Process
        </h3>
        <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-destructive/20">
          <Image
            src={beforeImage}
            alt="Before workflow - manual process"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-primary">
          After: Automated with RomAIx
        </h3>
        <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-primary/20">
          <Image
            src={afterImage}
            alt="After workflow - automated with RomAIx"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
