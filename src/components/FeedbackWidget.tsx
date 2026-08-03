"use client";

import { useSiteping } from "@navanta/feedback-widget/react";

/**
 * Figma-style pinned feedback widget, mounted once (singleton) in the root
 * layout. HTTP mode → every reviewer's comments hit `/api/feedback` and land
 * in one shared store, so teammates see each other's notes and author names.
 *
 * No `identity` is passed on purpose: omitting it makes the widget prompt each
 * reviewer for their name/email on their FIRST comment and remember it in that
 * browser's localStorage — the "enter your name once" behaviour we want.
 */
export function FeedbackWidget() {
  useSiteping({
    endpoint: "/api/feedback", // HTTP mode → shared across everyone
    projectName: "navanta-live",
    position: "bottom-right",
    accentColor: "#4f46e5",
    forceShow: true, // render on production + all viewports (it's a review tool)
  });
  return null;
}
