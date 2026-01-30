import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { caseStudySchema, type CaseStudyMetadata } from './schemas/case-study';

const caseStudiesDirectory = path.join(process.cwd(), 'src/content/case-studies');

export interface CaseStudy extends CaseStudyMetadata {
  content: string;
}

/**
 * Get all case studies sorted by date (newest first)
 */
export function getAllCaseStudies(): CaseStudy[] {
  // Check if directory exists
  if (!fs.existsSync(caseStudiesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(caseStudiesDirectory);
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'));

  const caseStudies = mdxFiles.map((fileName) => {
    const fullPath = path.join(caseStudiesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter
    const { data, content } = matter(fileContents);

    // Validate frontmatter with Zod (slug is part of metadata)
    const metadata = caseStudySchema.parse(data);

    return {
      content,
      ...metadata,
    };
  });

  // Sort by date descending (newest first)
  return caseStudies.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

/**
 * Get a single case study by slug
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const fullPath = path.join(caseStudiesDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  try {
    const metadata = caseStudySchema.parse(data);

    return {
      content,
      ...metadata,
    };
  } catch (error) {
    console.error(`Error parsing case study:`, error);
    return null;
  }
}

/**
 * Get related case studies based on tag and industry similarity (Jaccard similarity)
 */
export function getRelatedCaseStudies(
  currentSlug: string,
  limit: number = 2
): CaseStudy[] {
  const allStudies = getAllCaseStudies();
  const current = allStudies.find((s) => s.slug === currentSlug);

  if (!current) {
    return [];
  }

  // Jaccard similarity: |A ∩ B| / |A ∪ B|
  const scoredStudies = allStudies
    .filter((s) => s.slug !== currentSlug)
    .map((study) => {
      const currentTags = new Set(current.tags);
      const studyTags = new Set(study.tags);

      // Add industry as implicit tag for matching
      currentTags.add(current.industry);
      studyTags.add(study.industry);

      const intersection = new Set(
        [...currentTags].filter((x) => studyTags.has(x))
      );
      const union = new Set([...currentTags, ...studyTags]);

      const similarity = union.size > 0 ? intersection.size / union.size : 0;

      return { study, similarity };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);

  return scoredStudies.map((s) => s.study);
}

/**
 * Get all unique industries from case studies
 */
export function getAllIndustries(): string[] {
  const caseStudies = getAllCaseStudies();
  const industries = [...new Set(caseStudies.map((study) => study.industry))];
  return industries.sort();
}
