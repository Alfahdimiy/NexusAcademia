'use server';
/**
 * @fileOverview A Genkit flow for summarizing lecture notes.
 *
 * - summarizeLectureNotes - A function that handles the lecture note summarization process.
 * - SummarizeLectureNotesInput - The input type for the summarizeLectureNotes function.
 * - SummarizeLectureNotesOutput - The return type for the summarizeLectureNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeLectureNotesInputSchema = z.object({
  notes: z
    .string()
    .describe('The lecture notes or text to be summarized.'),
});
export type SummarizeLectureNotesInput = z.infer<
  typeof SummarizeLectureNotesInputSchema
>;

const SummarizeLectureNotesOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the lecture notes.'),
});
export type SummarizeLectureNotesOutput = z.infer<
  typeof SummarizeLectureNotesOutputSchema
>;

export async function summarizeLectureNotes(
  input: SummarizeLectureNotesInput
): Promise<SummarizeLectureNotesOutput> {
  return summarizeLectureNotesFlow(input);
}

const summarizeLectureNotesPrompt = ai.definePrompt({
  name: 'summarizeLectureNotesPrompt',
  input: {schema: SummarizeLectureNotesInputSchema},
  output: {schema: SummarizeLectureNotesOutputSchema},
  prompt: `You are an AI tutoring assistant designed to provide concise summaries of lecture notes.
Your task is to review the provided lecture notes and generate a summary that highlights the key concepts, main points, and important details.
The summary should be easy to understand and help a student quickly grasp the core information.

Lecture Notes:
{{notes}}`,
});

const summarizeLectureNotesFlow = ai.defineFlow(
  {
    name: 'summarizeLectureNotesFlow',
    inputSchema: SummarizeLectureNotesInputSchema,
    outputSchema: SummarizeLectureNotesOutputSchema,
  },
  async (input) => {
    const {output} = await summarizeLectureNotesPrompt(input);
    return output!;
  }
);
