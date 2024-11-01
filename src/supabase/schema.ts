import { Database } from '../database.types';

type Diary = Database['public']['Tables']['diary']['Row'];
type Recipe = Database['public']['Tables']['recipes']['Row'];

interface RestrictedRecipe extends Recipe {
	dynamic_range: 'DR-Auto' | `DR-${'number'}`;
	wb: `${string}, ${number} Red & ${number} Blue`;
	iso: `up to ISO ${number}`;
	exposure_compensation: `${string} to ${string}`;
}

export type { Diary, RestrictedRecipe };
