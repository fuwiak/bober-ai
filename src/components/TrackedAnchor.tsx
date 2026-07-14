"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { reachGoal } from "@/lib/analytics";

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  goal: string;
};

export function TrackedAnchor({ goal, onClick, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        reachGoal(goal);
        onClick?.(event);
      }}
    />
  );
}
