
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, BookOpen, BrainCircuit, ShieldCheck, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">NexusAcademia</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/courses">
            Courses
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/login">
            Login
          </Link>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                    Master Your Future with Structured Learning
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Experience a peer-driven, AI-enhanced learning environment designed for modern education. Weekly paths, journal reflections, and collaborative assessments.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-primary text-primary-foreground">
                    Explore Courses
                  </Button>
                  <Button variant="outline" size="lg">
                    Request Demo
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl lg:aspect-square">
                <Image
                  alt="Hero Image"
                  className="object-cover"
                  fill
                  src="https://picsum.photos/seed/campus/1200/800"
                  data-ai-hint="university library"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">Core Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to succeed in a digital-first academic world.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Weekly Learning Path</h3>
                <p className="text-muted-foreground">Structured content delivery mapped across your academic term.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Peer Assessment</h3>
                <p className="text-muted-foreground">Learn by evaluating and receiving feedback from your fellow students.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">AI Tutoring</h3>
                <p className="text-muted-foreground">Summarize complex lectures and generate quizzes instantly with GenAI.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Learning Journal</h3>
                <p className="text-muted-foreground">Direct private channel with instructors for weekly academic reflections.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Secure Assignments</h3>
                <p className="text-muted-foreground">Robust and secure submission system for all your coursework needs.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Modern Discussion</h3>
                <p className="text-muted-foreground">Engage in forums where original thought is prioritized through post-first rules.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-muted/50">
        <p className="text-xs text-muted-foreground">© 2024 NexusAcademia Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
