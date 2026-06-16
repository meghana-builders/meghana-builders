import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ContentProvider, useContent } from "../lib/contentContext";
import { ikUrl } from "../lib/imagekit";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SmoothScroll } from "../components/SmoothScroll";
import { Cursor } from "../components/Cursor";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Preloader } from "../components/Preloader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-eyebrow">404</p>
        <h1 className="mt-4 text-display-md">Off the blueprint.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This page isn't part of the structure. Let's get you back to the lobby.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block border border-gold px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-gold hover:bg-gold hover:text-background"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-eyebrow">Error</p>
        <h1 className="mt-4 text-display-md">Something didn't render.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          A small fault in the framework. We can try again.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border border-gold px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-gold hover:bg-gold hover:text-background"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] hover:border-foreground"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Meghana Builders — Crafting Landmarks in Hyderabad" },
      { name: "description", content: "Premier residential, commercial & government construction in Hyderabad. Architectural innovation meets structural excellence. Est. 2018." },
      { name: "author", content: "Meghana Builders & Developers" },
      { name: "theme-color", content: "#211b14" },
      { property: "og:title", content: "Meghana Builders — Crafting Landmarks" },
      { property: "og:description", content: "Premier residential & commercial construction in Hyderabad." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function FaviconWrapper({ children }: { children: ReactNode }) {
  const { content } = useContent();
  const { company } = content;

  useEffect(() => {
    if (company.favicon) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = ikUrl(company.favicon);
    }
  }, [company.favicon]);

  return <>{children}</>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ContentProvider>
        <FaviconWrapper>
          {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
          <SmoothScroll>
            <Cursor />
            <Navigation />
            <main>
              <Outlet />
            </main>
            <Footer />
          </SmoothScroll>
        </FaviconWrapper>
      </ContentProvider>
    </QueryClientProvider>
  );
}
