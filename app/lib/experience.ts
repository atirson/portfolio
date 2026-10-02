export const CAREER_START_YEAR = 2019;

export function getExperienceYears(now: Date = new Date()): number {
  return now.getFullYear() - CAREER_START_YEAR;
}
