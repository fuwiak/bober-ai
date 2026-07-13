"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function ArrowLink({ href, children, className = "", external }: ArrowLinkProps) {
  const classes = `group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-200 hover:text-accent ${className}`;

  const content = (
    <>
      <span>{children}</span>
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
        aria-hidden
      />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href as "/"} className={classes}>
      {content}
    </Link>
  );
}
