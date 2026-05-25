import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <div className="px-4 text-center">
          <p className="mb-2 text-7xl font-bold text-muted-foreground/30">
            404
          </p>
          <h1 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
            Page not found
          </h1>
          <p className="mb-8 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
