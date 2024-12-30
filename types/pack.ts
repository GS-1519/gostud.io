export interface Pack {
  id: number;
  gslug: string;
  title: string;
  cover_url: string;
  costs: any; // Assuming 'Costs' is not defined in the current context, replaced with 'any' to fix the bug
  images?: string[];
} 