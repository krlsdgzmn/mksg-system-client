export default function Footer() {
  return (
    <footer className="top-0 z-50 flex w-full items-center justify-center border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:sticky">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-center">
        <h2 className="text-center text-sm text-foreground/40">
          &copy; {new Date().getFullYear()} All rights reserved.
        </h2>
      </div>
    </footer>
  );
}
