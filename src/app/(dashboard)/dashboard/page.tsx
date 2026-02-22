
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MessageSquare, ArrowRight, BookOpenCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const activeCourses = [
    {
      id: "cs101",
      name: "Introduction to Computer Science",
      progress: 65,
      instructor: "Dr. Emily Smith",
      nextTask: "Binary Search Quiz",
      dueDate: "Tomorrow",
      thumbnail: "https://picsum.photos/seed/cs/200/200"
    },
    {
      id: "math202",
      name: "Advanced Discrete Mathematics",
      progress: 42,
      instructor: "Prof. Michael Brown",
      nextTask: "Journal Reflection - Week 4",
      dueDate: "Oct 24",
      thumbnail: "https://picsum.photos/seed/math/200/200"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary">Welcome back, Alex!</h1>
        <p className="text-muted-foreground">Here's what's happening with your learning path today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary/5 border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpenCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+1 since last term</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
            <Clock className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peer Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Pending</div>
            <p className="text-xs text-muted-foreground">Due by Sunday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
            <CalendarDays className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8</div>
            <p className="text-xs text-muted-foreground">Top 10% of class</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-headline font-semibold">Active Courses</h2>
          <div className="grid gap-6">
            {activeCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden group hover:shadow-lg transition-all border-l-4 border-l-primary">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 aspect-video sm:aspect-square shrink-0">
                      <Image
                        src={course.thumbnail}
                        alt={course.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{course.name}</h3>
                          <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                            {course.progress}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                      </div>
                      <div className="mt-4 space-y-3">
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Next: {course.nextTask}</span>
                          </div>
                          <span className="font-medium text-destructive">{course.dueDate}</span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                          <Link href={`/courses/${course.id}`}>
                            Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-headline font-semibold">Upcoming Tasks</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <PenTool className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Assignment Submission</p>
                  <p className="text-sm text-muted-foreground">Unit 4: Discrete Structures</p>
                  <p className="text-xs font-medium text-destructive mt-1">Due in 5 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-t pt-4">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold">Peer Grading Session</p>
                  <p className="text-sm text-muted-foreground">Assess 3 fellow students' papers</p>
                  <p className="text-xs font-medium text-muted-foreground mt-1">Due Sunday, Oct 27</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-t pt-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Reflective Journal</p>
                  <p className="text-sm text-muted-foreground">Summarize your weekly findings</p>
                  <p className="text-xs font-medium text-muted-foreground mt-1">Due Friday, Oct 25</p>
                </div>
              </div>
              <Button variant="link" className="w-full text-primary p-0 h-auto font-medium" asChild>
                <Link href="/calendar">View Full Calendar</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { PenTool } from "lucide-react";
