
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  ChevronRight, 
  MessageCircle, 
  FileText, 
  HelpCircle,
  Users
} from "lucide-react";
import Link from "next/link";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const units = [
    {
      id: 1,
      title: "Introduction to Computational Thinking",
      status: "completed",
      weeks: "Week 1",
      tasks: [
        { type: "reading", title: "Logic Fundamentals", completed: true },
        { type: "discussion", title: "Unit 1 Initial Response", completed: true },
        { type: "quiz", title: "Computational Quiz", completed: true }
      ]
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      status: "current",
      weeks: "Week 2 - 3",
      tasks: [
        { type: "reading", title: "Big O Notation", completed: true },
        { type: "assignment", title: "Sorting Project", completed: false },
        { type: "discussion", title: "Optimization Forum", completed: false }
      ]
    },
    {
      id: 3,
      title: "Network Architectures",
      status: "locked",
      weeks: "Week 4",
      tasks: [
        { type: "reading", title: "TCP/IP Stack", completed: false },
        { type: "peer", title: "Network Audit Assessment", completed: false }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/courses" className="text-sm text-primary hover:underline">Courses</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">CS101</span>
          </div>
          <h1 className="text-4xl font-headline font-bold text-primary">Introduction to Computer Science</h1>
          <p className="text-muted-foreground mt-2">Master the core concepts of software engineering and algorithm design.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/courses/${params.id}/forum`}>
              <MessageCircle className="mr-2 h-4 w-4" /> Discussion
            </Link>
          </Button>
          <Button variant="outline" size="sm">
             <Users className="mr-2 h-4 w-4" /> Peer Groups
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-headline font-semibold">Weekly Learning Path</h2>
          
          <div className="relative space-y-4">
            {/* Connection Line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border -z-10" />

            {units.map((unit) => (
              <Card key={unit.id} className={cn(
                "relative overflow-hidden",
                unit.status === 'locked' && "opacity-70 bg-muted/30"
              )}>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center shrink-0 border-4 bg-background",
                    unit.status === 'completed' && "border-green-500 text-green-500",
                    unit.status === 'current' && "border-primary text-primary animate-pulse",
                    unit.status === 'locked' && "border-muted text-muted-foreground"
                  )}>
                    {unit.status === 'completed' && <CheckCircle2 className="h-6 w-6" />}
                    {unit.status === 'current' && <span className="font-bold">{unit.id}</span>}
                    {unit.status === 'locked' && <Lock className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Unit {unit.id}: {unit.title}</CardTitle>
                      <Badge variant={unit.status === 'completed' ? 'secondary' : 'default'} className={cn(
                        unit.status === 'completed' && "bg-green-100 text-green-700 hover:bg-green-100",
                        unit.status === 'locked' && "bg-muted text-muted-foreground"
                      )}>
                        {unit.status}
                      </Badge>
                    </div>
                    <CardDescription>{unit.weeks}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pl-20 pb-6">
                  <ul className="space-y-3">
                    {unit.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-center justify-between text-sm group">
                        <div className="flex items-center gap-3">
                          {task.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                          <div className="flex items-center gap-2">
                            {task.type === 'reading' && <FileText className="h-3.5 w-3.5 text-blue-500" />}
                            {task.type === 'discussion' && <MessageCircle className="h-3.5 w-3.5 text-purple-500" />}
                            {task.type === 'quiz' && <HelpCircle className="h-3.5 w-3.5 text-orange-500" />}
                            <span className={cn(task.completed && "text-muted-foreground line-through")}>
                              {task.title}
                            </span>
                          </div>
                        </div>
                        {unit.status !== 'locked' && !task.completed && (
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            Start Task
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-headline">Course Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end justify-between text-sm">
                <span className="text-muted-foreground">Overall Completion</span>
                <span className="font-bold">45%</span>
              </div>
              <Progress value={45} className="h-2" />
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-xs text-muted-foreground">Days Left</p>
                </div>
                <div className="text-center p-3 bg-secondary/5 rounded-lg">
                  <p className="text-2xl font-bold text-secondary">3</p>
                  <p className="text-xs text-muted-foreground">Assignments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-headline">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-sm" asChild>
                <Link href="#">
                  <FileText className="mr-2 h-4 w-4" /> Syllabus.pdf
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm" asChild>
                <Link href="#">
                  <FileText className="mr-2 h-4 w-4" /> Grading Rubric
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm" asChild>
                <Link href="/journal">
                  <MessageSquare className="mr-2 h-4 w-4" /> Private Journal
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { MessageSquare } from "lucide-react";
