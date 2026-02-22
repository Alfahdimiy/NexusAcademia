
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  BrainCircuit, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Loader2,
  FileText,
  ClipboardList
} from "lucide-react";
import { summarizeLectureNotes } from "@/ai/flows/summarize-lecture-notes";
import { generateQuizFromNotes } from "@/ai/flows/generate-quiz-from-notes";
import { useToast } from "@/hooks/use-toast";

export default function AITutorPage() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"summary" | "quiz" | null>(null);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!notes.trim()) return;
    setIsLoading(true);
    setActiveTab("summary");
    try {
      const result = await summarizeLectureNotes({ notes });
      setSummary(result.summary);
      setQuiz([]);
    } catch (error) {
      toast({
        title: "Summarization Failed",
        description: "We couldn't process your notes at this time.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!notes.trim()) return;
    setIsLoading(true);
    setActiveTab("quiz");
    try {
      const result = await generateQuizFromNotes({ lectureNotes: notes });
      setQuiz(result);
      setSummary("");
    } catch (error) {
      toast({
        title: "Quiz Generation Failed",
        description: "We couldn't process your notes at this time.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
          <BrainCircuit className="h-8 w-8" /> AI Tutoring Assistant
        </h1>
        <p className="text-muted-foreground mt-2">Upload or paste your lecture notes to get instant summaries or practice quizzes.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-secondary" /> Lecture Notes
              </CardTitle>
              <CardDescription>Paste your notes from class or textbook readings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="The internet is a globally connected network system that uses the Internet Protocol Suite..." 
                className="min-h-[400px] resize-none"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3 w-full">
                <Button 
                  onClick={handleSummarize} 
                  disabled={isLoading || !notes.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading && activeTab === 'summary' ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Summarize
                </Button>
                <Button 
                  onClick={handleGenerateQuiz} 
                  disabled={isLoading || !notes.trim()}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  {isLoading && activeTab === 'quiz' ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ClipboardList className="mr-2 h-4 w-4" />
                  )}
                  Generate Quiz
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {!summary && quiz.length === 0 && !isLoading ? (
            <div className="h-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground bg-muted/20">
              <BrainCircuit className="h-16 w-16 mb-6 opacity-20" />
              <h3 className="text-xl font-headline font-semibold text-foreground/50">Assistant Ready</h3>
              <p className="max-w-xs mt-2">Enter your lecture notes to the left to begin your AI-enhanced study session.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {isLoading ? (
                <div className="h-full space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="animate-pulse bg-muted/50">
                      <div className="h-24" />
                    </Card>
                  ))}
                </div>
              ) : (
                <>
                  {summary && (
                    <Card className="border-l-4 border-l-primary animate-in fade-in slide-in-from-right-4 duration-500">
                      <CardHeader>
                        <CardTitle className="text-xl font-headline flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" /> Key Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {summary}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {quiz.length > 0 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                      <h3 className="text-xl font-headline font-semibold flex items-center gap-2 px-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" /> Practice Quiz
                      </h3>
                      {quiz.map((q, idx) => (
                        <Card key={idx} className="overflow-hidden">
                          <CardHeader className="bg-muted/30">
                            <CardTitle className="text-sm font-medium">Question {idx + 1}</CardTitle>
                            <p className="font-semibold">{q.question}</p>
                          </CardHeader>
                          <CardContent className="p-6">
                            {q.options && q.options.length > 0 ? (
                              <div className="space-y-2">
                                {q.options.map((option: string, i: number) => (
                                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer group">
                                    <div className="h-4 w-4 rounded-full border border-primary group-hover:bg-primary/10" />
                                    <span className="text-sm">{option}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="p-4 bg-muted/30 rounded-lg italic text-sm text-muted-foreground border border-dashed">
                                Short Answer Question - Recall the answer mentally or write it down.
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="bg-muted/20 border-t py-2">
                            <details className="w-full">
                              <summary className="text-xs font-bold text-primary cursor-pointer hover:underline uppercase tracking-wider">
                                View Correct Answer
                              </summary>
                              <div className="pt-2 text-sm text-green-600 font-bold">
                                {q.correctAnswer}
                              </div>
                            </details>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
