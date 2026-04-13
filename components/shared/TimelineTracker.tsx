import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

export interface TimelineStep {
    title: string;
    description?: string;
    date?: string;
    status: "completed" | "current" | "upcoming";
}

interface TimelineTrackerProps {
    steps: TimelineStep[];
    direction?: "vertical" | "horizontal";
    className?: string;
}

export function TimelineTracker({ steps, direction = "vertical", className }: TimelineTrackerProps) {
    const isVertical = direction === "vertical";

    return (
        <div className={cn("flex", isVertical ? "flex-col" : "flex-row w-full justify-between items-start", className)}>
            {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                const isCompleted = step.status === "completed";
                const isCurrent = step.status === "current";

                return (
                    <div key={index} className={cn("relative flex", isVertical ? "flex-row" : "flex-col items-center flex-1")}>
                        {/* Connector */}
                        {!isLast && (
                            <div
                                className={cn(
                                    "absolute transition-colors duration-500",
                                    isVertical
                                        ? "left-4 top-8 bottom-0 w-[1px] -ml-[0.5px]"
                                        : "top-4 left-[50%] right-[-50%] h-[1px] w-full",
                                    isCompleted ? "bg-brand-action" : "bg-muted-bg"
                                )}
                                style={isVertical ? { height: 'calc(100% - 2rem)' } : {}}
                            />
                        )}

                        {/* Indicator */}
                        <div className="relative z-10">
                            {isCurrent && (
                                <div className="absolute inset-0 rounded-full animate-pulse-ring bg-brand-lime/20" />
                            )}
                            <div className={cn("flex items-center justify-center rounded-full border-2 bg-background transition-colors duration-500",
                                isVertical ? "w-8 h-8 mr-4 shrink-0" : "w-8 h-8 mb-4 shrink-0",
                                isCompleted ? "border-brand-action bg-brand-action text-white" :
                                    isCurrent ? "border-brand-lime text-brand-lime" : "border-muted-bg text-text-faint"
                            )}>
                                {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-xs font-bold leading-none">{index + 1}</span>}
                            </div>
                        </div>

                        {/* Content */}
                        <div className={cn("flex flex-col", isVertical ? "pb-10 pt-1" : "items-center text-center px-2 w-full")}>
                            <h4 className={cn("text-sm font-bold tracking-wide", isCurrent ? "text-brand-lime" : isCompleted ? "text-text-primary" : "text-text-muted")}>
                                {step.title}
                            </h4>
                            {step.description && (
                                <p className="text-xs text-text-muted mt-1.5 leading-relaxed max-w-[240px]">
                                    {step.description}
                                </p>
                            )}
                            {step.date && (
                                <time className="text-[10px] font-mono uppercase tracking-widest text-text-faint mt-2 tabular-nums">
                                    {step.date}
                                </time>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
