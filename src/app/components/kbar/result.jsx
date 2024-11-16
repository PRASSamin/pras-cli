"use client";
import { KBarResults, useMatches } from "kbar";
import ResultItems from "./result-items";

export default function RenderResults() {
  const { results, rootActionId } = useMatches();

  return (
    <KBarResults
      maxHeight={700}
      items={results}
      onRender={({ item, active }) => {
        if (typeof item === "string") {
          return (
            <div className="px-2 py-1.5 text-xs uppercase opacity-75 text-gray-400">
              {item}
            </div>
          );
        } else {
          return (
            <ResultItems
              action={item}
              active={active}
              rootActionId={rootActionId ?? ""}
            />
          );
        }
      }}
    />
  );
}
