
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock, MessageCircle, Send, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function DiscussionForumPage({ params }: { params: { id: string } }) {
  const [hasPosted, setHasPosted] = useState(false);
  const [initialResponse, setInitialResponse] = useState("");
  const { toast } = useToast();

  const handlePost = () => {
    if (initialResponse.trim().length < 50) {
      toast({
        title: "Response too short",
        description: "Your initial response must be at least 50 characters to unlock the discussion.",
        variant: "destructive"
      });
      return;
    }
    setHasPosted(true);
    toast({
      title: "Response Posted!",
      description: "You have unlocked the discussion forum.",
    });
  };

  const otherPosts = [
    {
      user: "Sarah Miller",
      avatar: "https://picsum.photos/seed/sarah/100/100",
      content: "I think computational thinking is really about breaking down problems into smaller, manageable chunks. This abstraction allows us to focus on what matters most.",
      date: "2 hours ago",
      replies: 3
    },
    {
      user: "David Chen",
      avatar: "https://picsum.photos/seed/david/100/100",
      content: "Agree with Sarah. Also, pattern recognition is key. If we can see where we've solved a similar problem before, we can reuse those solutions.",
      date: "5 hours ago",
      replies: 1
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/courses/${params.id}`}><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Discussion Forum</h1>
          <p className="text-muted-foreground">Unit 1: The Foundations of Computing</p>
        </div>
      </div>

      <Card className="border-primary bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl">Unit 1 Discussion Prompt</CardTitle>
          <CardDescription>
            Discuss how computational thinking can be applied to everyday decision-making processes. Provide at least two concrete examples.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 rounded-lg border text-sm italic text-muted-foreground">
            <strong>Requirement:</strong> To ensure original thought, you must post your initial response before you can view and reply to your peers.
          </div>
        </CardContent>
      </Card>

      {!hasPosted ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Initial Response</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Type your academic response here..." 
                className="min-h-[200px]"
                value={initialResponse}
                onChange={(e) => setInitialResponse(e.target.value)}
              />
              <p className="text-xs text-muted-foreground text-right">
                {initialResponse.length} / 50 characters minimum
              </p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handlePost} className="gap-2">
                <Send className="h-4 w-4" /> Post Response
              </Button>
            </CardFooter>
          </Card>

          <div className="relative">
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/30">
              <Lock className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="font-headline font-semibold text-lg">Discussion Locked</p>
              <p className="text-sm text-muted-foreground max-w-xs text-center mt-2">
                Post your response to unlock {otherPosts.length} peer contributions and participate in the discussion.
              </p>
            </div>
            
            <div className="space-y-4 opacity-30 pointer-events-none blur-[2px]">
              {otherPosts.map((_, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                      <div className="h-3 w-16 bg-muted animate-pulse rounded" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-full bg-muted animate-pulse rounded mb-2" />
                    <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="https://picsum.photos/seed/user1/150/150" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold">You (Alex Johnson)</h4>
                  <Badge variant="outline">Initial Response</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{initialResponse}</p>
            </CardContent>
          </Card>

          <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" /> Peer Contributions
          </h3>

          <div className="space-y-4">
            {otherPosts.map((post, idx) => (
              <Card key={idx} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback>{post.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold">{post.user}</h4>
                      <Badge variant="secondary" className="text-[10px] h-5">Student</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{post.content}</p>
                </CardContent>
                <CardFooter className="pt-0 flex items-center gap-4 text-xs text-primary font-medium">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    {post.replies} Replies
                  </div>
                  <div className="hover:underline">Reply to Post</div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
