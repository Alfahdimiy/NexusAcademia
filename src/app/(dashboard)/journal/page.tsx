
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  History, 
  Send, 
  MessageSquare, 
  UserCircle2, 
  CheckCircle,
  Clock,
  ChevronDown,
  MoreVertical
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function JournalPage() {
  const [reflection, setReflection] = useState("");
  const { toast } = useToast();

  const handlePost = () => {
    if (!reflection.trim()) return;
    toast({
      title: "Reflection submitted",
      description: "Your instructor has been notified of your weekly entry."
    });
    setReflection("");
  };

  const journals = [
    {
      id: 1,
      week: "Week 3",
      date: "Oct 18, 2024",
      content: "This week I found the topic of Big O notation particularly challenging. I spent a lot of time reviewing the nested loop examples. I'm still a bit confused about how to account for amortized complexity in dynamic arrays.",
      status: "replied",
      instructorReply: "Great reflection, Alex. Amortized complexity is tricky. I've uploaded a supplementary video in Unit 2 resources that specifically addresses dynamic array resizing. Check it out!",
      instructorName: "Dr. Emily Smith"
    },
    {
      id: 2,
      week: "Week 2",
      date: "Oct 11, 2024",
      content: "Enjoyed the introduction to data structures. Arrays and Linked Lists are clear to me now. Looking forward to trees and graphs.",
      status: "read",
      instructorReply: null,
      instructorName: "Dr. Emily Smith"
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Learning Journal</h1>
          <p className="text-muted-foreground mt-2">A private, secure communication channel between you and your instructors for weekly reflections.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2">
             <History className="h-4 w-4" /> Entry History
           </Button>
        </div>
      </div>

      <Card className="border-l-4 border-l-primary shadow-sm bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl">Submit Reflection - Week 4</CardTitle>
          <CardDescription>Share your academic breakthroughs, challenges, or questions from this week's material.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="I found the concept of... particularly interesting/challenging because..." 
            className="min-h-[150px] bg-white"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          />
          <div className="flex justify-between items-center text-sm text-muted-foreground italic">
            <p>Only your instructor can see this.</p>
            <Button onClick={handlePost} className="bg-primary hover:bg-primary/90 gap-2">
              <Send className="h-4 w-4" /> Submit Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
           <MessageSquare className="h-5 w-5 text-primary" /> Past Reflections
        </h3>

        <div className="space-y-6">
          {journals.map((journal) => (
            <div key={journal.id} className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 py-4">
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <History className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold">{journal.week} Reflection</h4>
                      <Badge variant={journal.status === 'replied' ? 'default' : 'secondary'} className={cn(
                        journal.status === 'replied' && "bg-green-100 text-green-700 hover:bg-green-100",
                        journal.status === 'read' && "bg-blue-100 text-blue-700 hover:bg-blue-100"
                      )}>
                        {journal.status === 'replied' ? (
                          <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Instructor Replied</span>
                        ) : (
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Instructor Read</span>
                        )}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{journal.date}</p>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">{journal.content}</p>
                </CardContent>
              </Card>

              {journal.instructorReply && (
                <div className="ml-8 pl-8 border-l-2 border-primary/20 space-y-2 animate-in slide-in-from-left-4 duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src={`https://picsum.photos/seed/instructor/100/100`} />
                      <AvatarFallback>I</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-bold">{journal.instructorName}</span>
                    <span className="text-xs text-muted-foreground">Instructor</span>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg border border-primary/10 shadow-sm">
                    <p className="text-sm text-foreground leading-relaxed italic">{journal.instructorReply}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
