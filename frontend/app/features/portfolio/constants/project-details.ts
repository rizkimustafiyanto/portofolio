import type { ProjectCase } from '../types/project'

export const projectDetails: Record<string, ProjectCase> = {
  'amms-dashboard': {
    problem:
      'The team needed a clearer way to monitor operational activity, reduce manual tracking, and surface important workflow data in one place.',
    responsibilities: ['Frontend development', 'Backend integration', 'Database design support'],
    solution:
      'Built a role-aware dashboard with structured navigation, analytics panels, and workflow shortcuts so users could move faster with less context switching.',
    results: [
      'Reduced manual workflow steps',
      'Improved reporting visibility',
      'Created a cleaner foundation for future features',
    ],
  },
  'laboratory-revamp': {
    problem:
      'The existing healthcare experience was harder to navigate than it needed to be, which made common tasks slower for both staff and patients.',
    responsibilities: [
      'UI refactor',
      'Information architecture updates',
      'Component system alignment',
    ],
    solution:
      'Reworked the interface around clearer task flows, better hierarchy, and reusable pieces that made future maintenance simpler.',
    results: [
      'Simpler navigation across key flows',
      'More maintainable frontend structure',
      'More consistent visual language',
    ],
  },
  'portfolio-template': {
    problem:
      'The portfolio needed to tell a stronger story while still feeling lightweight, fast, and easy to maintain.',
    responsibilities: [
      'Experience design',
      'Nuxt component architecture',
      'Motion and polish pass',
    ],
    solution:
      'Created a storytelling-first portfolio structure with reusable sections, strong spacing rules, and a more deliberate visual rhythm.',
    results: [
      'Clearer project storytelling',
      'Reusable page building blocks',
      'More scalable content structure',
    ],
  },
}
