"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { RaisedPanel } from "../components/raised-panel";
import {
  ProjectDetailModal,
  type Project,
} from "../components/project-detail-modal";
import { profileDetails, projects, skills } from "@/data/static";
import { renderMessageContent } from "@/utils/render-message-content";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // AI Chat Bot state
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([
    {
      role: "assistant",
      content:
        "Hi, I can answer questions about Jeferson's projects, skills, and details. Feel free to ask or click one of the suggestions below!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Touch tracking refs for scroll chaining
  const startYRef = useRef(0);
  const lastYRef = useRef(0);

  // Handle mobile scroll chaining programmatically
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        startYRef.current = e.touches[0].clientY;
        lastYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (!isMobile) return;

      const currentY = e.touches[0].clientY;
      const deltaY = currentY - lastYRef.current; // Positive = swiping down, Negative = swiping up
      lastYRef.current = currentY;

      const scrollTop = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;

      // Case 1: Message container has no scrollable content
      if (maxScroll <= 0) {
        window.scrollBy(0, -deltaY);
        if (e.cancelable) e.preventDefault();
        return;
      }

      // Case 2: At top boundary and swiping down (scrolling content up)
      if (deltaY > 0 && scrollTop <= 0) {
        window.scrollBy(0, -deltaY);
        if (e.cancelable) e.preventDefault();
        return;
      }

      // Case 3: At bottom boundary and swiping up (scrolling content down)
      if (deltaY < 0 && scrollTop >= maxScroll - 1) {
        window.scrollBy(0, -deltaY);
        if (e.cancelable) e.preventDefault();
        return;
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (isMobile) {
        // Use direct assignment to prevent mobile Safari/Chrome viewport scrolling bugs
        container.scrollTop = container.scrollHeight;
      } else {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend !== undefined ? textToSend : inputValue;
    if (!text.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: text.trim() };
    const newMessages = [...messages, userMessage];

    // Clear input if sending from keyboard input
    if (textToSend === undefined) {
      setInputValue("");
    }

    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to assistant backend");
      }

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.choices[0].message.content,
          },
        ]);
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ **Error**: Connection failed. Please check that your server is running and the `.env.local` contains a valid OpenRouter API key.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 space-y-5">
      <section className="grid h-auto grid-cols-1 gap-3 p-2 bg-gray-400 sm:gap-4 sm:p-4 md:h-[calc(100dvh-2.5rem)] md:grid-cols-[2fr_1fr] md:grid-rows-2 md:overflow-hidden">
        <RaisedPanel className="flex min-h-0 flex-col justify-between gap-3 p-3 sm:gap-4 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden border-2 border-black bg-white shadow-[4px_4px_0_0_#FC6B34]">
                <Image
                  src="/profile.jpg"
                  alt="Jeferson profile photo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <h1 className="mt-1 text-xl sm:text-2xl md:text-3xl font-black">
                  Jeferson Bayking
                </h1>
                <p className="mt-1 max-w-lg text-xs sm:text-sm font-medium text-neutral-700">
                  <span className="font-bold">Full-Stack Developer</span>{" "}
                  crafting scalable web applications, intelligent AI solutions,
                  and seamless digital experiences.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                className="inline-flex h-10 w-full sm:w-auto items-center justify-center border-2 border-black bg-white px-4 text-sm font-black uppercase shadow-[5px_5px_0_0_#000] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000]"
                href="mailto:jefbay110@gmail.com"
              >
                Contact
              </a>
              <a
                className="inline-flex h-10 w-full sm:w-auto items-center justify-center border-2 border-black bg-white px-4 text-sm font-black uppercase shadow-[5px_5px_0_0_#000] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000]"
                href="resume/JEFERSON-BAYKING-RESUME.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </div>
          </div>

          <dl className="grid gap-x-6 gap-y-3 border-y-2 border-black py-3 text-[11px] sm:text-xs sm:gap-y-2 sm:grid-cols-2">
            {profileDetails.map((detail) => (
              <div
                className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                key={detail.label}
              >
                <dt className="shrink-0 font-black uppercase text-neutral-500">
                  {detail.label}
                </dt>
                <dd className="text-left font-bold sm:text-right">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="">
            <p className="text-[10px] sm:text-xs font-black uppercase">
              Skills
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  className="border-2 border-black bg-white px-2.5 py-1 text-[11px] font-bold shadow-[3px_3px_0_0_#000] sm:px-3 sm:py-1.5 sm:text-xs"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </RaisedPanel>

        <RaisedPanel className="flex h-[600px] flex-col gap-3 p-3 sm:gap-4 sm:p-4 md:h-auto md:row-span-2 md:min-h-0">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <div>
              <p className="text-[10px] sm:text-xs font-black uppercase text-neutral-500">
                Assistant
              </p>
              <h2 className="text-lg sm:text-xl font-black">AI Chat Bot</h2>
            </div>
            <div
              className={`size-3 rounded-full ring-2 ring-black ${isLoading ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`}
            />
          </div>

          {/* Chat Messages Log */}
          <div
            ref={messagesContainerRef}
            className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto custom-scrollbar pr-1 pb-1 overscroll-y-contain"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] border-2 border-black p-3 text-xs sm:text-sm font-semibold shadow-[4px_4px_0_0_#000] whitespace-pre-wrap break-words ${
                  msg.role === "user"
                    ? "ml-auto bg-black text-white shadow-[4px_4px_0_0_#FC6B34]"
                    : "bg-white text-black"
                }`}
              >
                {renderMessageContent(msg.content, msg.role === "user")}
              </div>
            ))}

            {isLoading && (
              <div className="max-w-[85%] border-2 border-black bg-white p-3 text-xs sm:text-sm font-semibold shadow-[4px_4px_0_0_#000] flex gap-1.5 items-center mr-auto">
                <span
                  className="size-2 rounded-full bg-black animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="size-2 rounded-full bg-black animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="size-2 rounded-full bg-black animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            )}

            {messages.length === 1 && !isLoading && (
              <div className="flex flex-col gap-1.5 pt-2">
                <p className="text-[9px] sm:text-[10px] font-black uppercase text-neutral-500">
                  Suggested Questions
                </p>
                <div className="flex flex-col gap-1.5">
                  {[
                    "Show me the strongest portfolio project",
                    "What are Jeferson's main technical skills?",
                    "Is Jeferson open to junior developer positions?",
                  ].map((promptText) => (
                    <button
                      key={promptText}
                      onClick={() => handleSendMessage(promptText)}
                      className="border-2 border-black bg-neutral-100 hover:bg-[#FFDE4D] text-left px-2 py-1 text-[11px] font-black uppercase shadow-[2px_2px_0_0_#000] sm:px-2.5 sm:py-1.5 sm:text-xs active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                    >
                      {promptText} →
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 border-2 border-black bg-white p-2.5 shadow-[4px_4px_0_0_#000] sm:gap-3 sm:p-3"
          >
            <input
              className="min-w-0 flex-1 bg-transparent text-xs sm:text-sm font-bold outline-none placeholder:text-neutral-500 read-only:opacity-70 disabled:cursor-not-allowed"
              placeholder={
                isLoading ? "AI Bot is thinking..." : "Ask about my work..."
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              readOnly={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="border-2 border-black bg-[#FC6B34] px-4 py-2 text-xs sm:text-sm font-black uppercase shadow-[3px_3px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#000] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Send
            </button>
          </form>
        </RaisedPanel>

        <RaisedPanel className="flex min-h-0 flex-col gap-2.5 p-3 sm:gap-3 sm:p-4">
          <div className="flex items-start justify-between gap-4 border-b-2 border-black pb-3">
            <div>
              <p className="text-[10px] sm:text-xs font-black uppercase text-neutral-500">
                Selected Work
              </p>
              <h2 className="mt-1 text-xl sm:text-2xl font-black">
                Project Showcase
              </h2>
            </div>
            <p className="shrink-0 border-2 border-black bg-[#FC6B34] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-black shadow-[3px_3px_0_0_#000]">
              {projects.length} Builds
            </p>
          </div>

          <div className="grid min-h-0 flex-1 gap-2.5 overflow-y-auto scrollbar-none pr-1 pb-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
            {projects.map((project) => (
              <div
                className="flex min-h-0 cursor-pointer flex-col justify-between gap-2.5 border-2 border-black bg-white p-2.5 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out will-change-transform hover:translate-x-1 hover:translate-y-1 hover:border-black hover:shadow-[2px_2px_0_0_#000] active:translate-x-1.5 active:translate-y-1.5 active:border-black active:shadow-[1px_1px_0_0_#000] sm:p-3"
                key={project.title}
                onClick={() => setSelectedProject(project)}
              >
                <div className="min-h-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-black leading-tight">
                      {project.title}
                    </h3>
                    {project.liveLink ? (
                      <a
                        className="shrink-0 border-2 border-black bg-[#FC6B34] px-2 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0_0_#000] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                        href={project.liveLink}
                        rel="noreferrer"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live
                      </a>
                    ) : null}
                  </div>

                  <p className="mt-2 overflow-hidden text-xs font-medium leading-snug text-neutral-700 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RaisedPanel>
      </section>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
