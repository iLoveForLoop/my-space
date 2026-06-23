"use client";
import { useEffect } from "react";

export interface Project {
  title: string;
  stack: string[];
  description: string;
  longDescription?: string;
  liveLink?: string;
  githubLink?: string;
  role?: string;
  period?: string;
  features?: string[];
}
interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}
export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  // Prevent page scroll when modal is open, and handle ESC key
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in "
        onClick={onClose}
      />
      {/* Modal Card */}
      <div className="relative z-10 flex max-h-[95vh] w-full max-w-2xl flex-col border-4 border-black bg-neutral-50 shadow-[10px_10px_0_0_#000] animate-in zoom-in-95 duration-200 ease-out custom-scrollbar">
        
        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b-4 border-black bg-[#FC6B34] p-3.5 sm:p-4 text-black">
          <h2 className="text-lg font-black uppercase tracking-tight sm:text-xl md:text-2xl">
            {project.title}
          </h2>
          <button
            onClick={onClose}
            className="flex size-9 items-center justify-center border-2 border-black bg-white font-black text-black shadow-[2px_2px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 sm:p-6 sm:space-y-6">
          {/* Description Section */}
          <div className="space-y-2">
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-black border-b border-black pb-1">
              Project Overview & UX Focus
            </h3>
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-neutral-800">
              {project.longDescription || project.description}
            </p>
          </div>
          {/* Tech Stack Used */}
          <div className="space-y-2">
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-black border-b border-black pb-1">
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap gap-1.5 pt-1 sm:gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="border-2 border-black bg-[#FFDE4D] px-2 py-0.5 text-[11px] font-black uppercase shadow-[2px_2px_0_0_#000] sm:px-2.5 sm:py-1 sm:text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          {/* Features and UX highlights */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-black border-b border-black pb-1">
                Key Features & Technical Implementation
              </h3>
              <ul className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                {project.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="border-2 border-black bg-white p-2.5 text-xs font-bold shadow-[2.5px_2.5px_0_0_#000] sm:shadow-[3.5px_3.5px_0_0_#000] flex gap-2 items-start sm:p-3"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-black text-white">
                      {idx + 1}
                    </span>
                    <span className="text-neutral-700 leading-normal">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Modal Footer (Links/Actions) */}
        <div className="flex flex-wrap items-center justify-end gap-2 border-t-4 border-black bg-neutral-200 p-3 sm:gap-3 sm:p-4">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              Source Code
            </a>
          )}
          {project.liveLink ? (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center border-2 border-black bg-[#00F5FF] px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              Visit Project Live →
            </a>
          ) : (
            <span className="border border-neutral-400 bg-neutral-300 text-neutral-600 px-4 py-2 text-xs font-bold uppercase cursor-not-allowed">
              Internal Project
            </span>
          )}
        </div>
      </div>
    </div>
  );
}