'use server';
/**
 * @fileOverview A Genkit flow for generating simple quiz questions from lecture notes or text.
 *
 * - generateQuizFromNotes - A function that handles the quiz generation process.
 * - GenerateQuizFromNotesInput - The input type for the generateQuizFromNotes function.
 * - GenerateQuizFromNotesOutput - The return type for the generateQuizFromNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizFromNotesInputSchema = z.object({
  lectureNotes: z
    .string()
    .describe('The lecture notes or text from which to generate quiz questions.'),
});
export type GenerateQuizFromNotesInput = z.infer<
  typeof GenerateQuizFromNotesInputSchema
>;

const QuizQuestionSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z
    .array(z.string())
    .describe(
      'An array of possible answers for multiple choice questions. Can be empty if it is a short answer question.'
    ),
  correctAnswer: z
    .string()
    .describe(
      'The correct answer to the question. For multiple choice, this should match one of the options. For short answer, it is the direct answer.'
    ),
});

const GenerateQuizFromNotesOutputSchema = z
  .array(QuizQuestionSchema)
  .describe('An array of generated quiz questions.');
export type GenerateQuizFromNotesOutput = z.infer<
  typeof GenerateQuizFromNotesOutputSchema
>;

export async function generateQuizFromNotes(
  input: GenerateQuizFromNotesInput
): Promise<GenerateQuizFromNotesOutput> {
  return generateQuizFromNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizFromNotesPrompt',
  input: {schema: GenerateQuizFromNotesInputSchema},
  output: {schema: GenerateQuizFromNotesOutputSchema},
  prompt: `You are an AI Tutoring Assistant. Your task is to generate simple quiz questions from the provided lecture notes.
Each question should test understanding of the material.
For each question, provide the question text, a list of options (if multiple-choice, otherwise leave empty), and the correct answer.
Generate at least 3 to 5 questions.

Lecture Notes:
{{{lectureNotes}}}`,
});

const generateQuizFromNotesFlow = ai.defineFlow(
  {
    name: 'generateQuizFromNotesFlow',
    inputSchema: GenerateQuizFromNotesInputSchema,
    outputSchema: GenerateQuizFromNotesOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate quiz questions.');
    }
    return output;
  }
);
