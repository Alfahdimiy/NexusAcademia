import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-lecture-notes.ts';
import '@/ai/flows/generate-quiz-from-notes.ts';