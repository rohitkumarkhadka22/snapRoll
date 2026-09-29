import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Send, Sparkles } from "lucide-react";
import chatbotImage from "../assets/images/chatbot.jpg";
import { parseStreamLine } from "../utils/ndjson";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const CHAT_ENDPOINT = `${API_BASE_URL}/api/chat`;
const MAX_MESSAGE_LENGTH = 2000;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [botPulse, setBotPulse] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! 👋 I'm the SnapRoll Assistant. How can I help you today?",
    },
  ]);

  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  // STREAMING

  const streamBufferRef = useRef("");
  const streamTimerRef = useRef(null);
  const abortControllerRef = useRef(null);
  const requestTimeoutRef = useRef(null);
  const requestTimedOutRef = useRef(false);
  const pulseTimeoutRef = useRef(null);
  const focusTimeoutRef = useRef(null);

  // SMART CHATGPT-STYLE SCROLL

  const shouldAutoScrollRef = useRef(true);
  const forceScrollRef = useRef(false);
  const scrollFrameRef = useRef(null);
  const touchYRef = useRef(null);

  // SCROLL TO BOTTOM

  const scrollToBottom = (behavior = "auto") => {
    const container = messagesContainerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  };

  // CHECK SCROLL POSITION

  const updateScrollPosition = () => {
    const container = messagesContainerRef.current;

    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    const isNearBottom = distanceFromBottom <= 40;
    shouldAutoScrollRef.current = isNearBottom;

    if (!isNearBottom && scrollFrameRef.current) {
      cancelAnimationFrame(scrollFrameRef.current);
      scrollFrameRef.current = null;
      forceScrollRef.current = false;
    }
  };

  const pauseAutoScroll = () => {
    shouldAutoScrollRef.current = false;
    forceScrollRef.current = false;

    if (scrollFrameRef.current) {
      cancelAnimationFrame(scrollFrameRef.current);
      scrollFrameRef.current = null;
    }
  };

  // USER SCROLL

  const handleMessagesScroll = () => {
    updateScrollPosition();
  };

  const handleMessagesWheel = (event) => {
    if (event.deltaY < 0) pauseAutoScroll();
  };

  const handleMessagesTouchStart = (event) => {
    touchYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleMessagesTouchMove = (event) => {
    const nextY = event.touches[0]?.clientY;

    if (nextY !== undefined && touchYRef.current !== null && nextY > touchYRef.current) {
      pauseAutoScroll();
    }

    touchYRef.current = nextY ?? null;
  };

  // CHATGPT-STYLE AUTO SCROLL

  useEffect(() => {
    if (!isOpen) return;

    if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);

    if (forceScrollRef.current) {
      scrollFrameRef.current = requestAnimationFrame(() => {
        const container = messagesContainerRef.current;

        if (!container) return;

        container.scrollTop = container.scrollHeight;

        forceScrollRef.current = false;
        shouldAutoScrollRef.current = true;
        scrollFrameRef.current = null;
      });

      return () => cancelAnimationFrame(scrollFrameRef.current);
    }

    if (shouldAutoScrollRef.current) {
      scrollFrameRef.current = requestAnimationFrame(() => {
        const container = messagesContainerRef.current;

        if (!container) return;

        container.scrollTop = container.scrollHeight;
        scrollFrameRef.current = null;
      });
    }

    return () => {
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
    };
  }, [messages, isOpen]);

  // BOT PULSE

  useEffect(() => {
    if (isOpen) return;

    const triggerJiggle = () => {
      setBotPulse(true);
      clearTimeout(pulseTimeoutRef.current);

      pulseTimeoutRef.current = setTimeout(() => {
        setBotPulse(false);
      }, 1100);
    };

    const initialJiggle = setTimeout(triggerJiggle, 1200);
    const interval = setInterval(triggerJiggle, 5500);

    return () => {
      clearTimeout(initialJiggle);
      clearInterval(interval);
      clearTimeout(pulseTimeoutRef.current);
    };
  }, [isOpen]);

  // FOCUS INPUT WHEN CHAT OPENS

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();

      shouldAutoScrollRef.current = true;

      requestAnimationFrame(() => {
        scrollToBottom("auto");
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // CLEAN STREAM

  const cleanupStream = () => {
    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }

    streamBufferRef.current = "";
  };

  useEffect(
    () => () => {
      abortControllerRef.current?.abort();
      clearTimeout(requestTimeoutRef.current);
      clearTimeout(focusTimeoutRef.current);
      clearTimeout(pulseTimeoutRef.current);
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);

      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
      streamBufferRef.current = "";
    },
    [],
  );

  // STOP GENERATING

  const stopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    cleanupStream();

    setMessages((prev) => {
      const last = prev[prev.length - 1];
      return last?.role === "assistant" && !last.content ? prev.slice(0, -1) : prev;
    });

    setLoading(false);

    shouldAutoScrollRef.current = false;

    focusTimeoutRef.current = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // SMOOTH AI TYPING

  const startSmoothTyping = () => {
    if (streamTimerRef.current) return;

    streamTimerRef.current = setInterval(() => {
      if (!streamBufferRef.current) {
        clearInterval(streamTimerRef.current);
        streamTimerRef.current = null;
        return;
      }

      const chunk = streamBufferRef.current.slice(0, 2);

      streamBufferRef.current = streamBufferRef.current.slice(2);

      setMessages((prev) => {
        const updated = [...prev];

        const lastIndex = updated.length - 1;

        if (updated[lastIndex]?.role === "assistant") {
          updated[lastIndex] = {
            ...updated[lastIndex],
            content: updated[lastIndex].content + chunk,
          };
        }

        return updated;
      });
    }, 20);
  };

  // SEND MESSAGE

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    cleanupStream();

    shouldAutoScrollRef.current = true;
    forceScrollRef.current = true;

    // CREATE ABORT CONTROLLER

    const controller = new AbortController();

    abortControllerRef.current = controller;
    requestTimedOutRef.current = false;
    requestTimeoutRef.current = setTimeout(() => {
      requestTimedOutRef.current = true;
      controller.abort();
    }, 60_000);

    // KEEP PREVIOUS CONVERSATION

    const conversation = messages
      .filter((msg) => msg.content && typeof msg.content === "string")
      .map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))
      .slice(-16);

    // SHOW USER MESSAGE + EMPTY AI MESSAGE

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
      {
        role: "assistant",
        content: "",
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      // SEND REQUEST

      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: userMessage,
          conversation,
        }),

        signal: controller.signal,
      });

      // HTTP ERROR

      if (!response.ok) {
        let errorMessage = "Something went wrong.";

        try {
          const errorData = await response.json();

          errorMessage = errorData.error || errorMessage;
        } catch {
          // Ignore invalid JSON.
        }

        throw new Error(errorMessage);
      }

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/x-ndjson")) {
        throw new Error("The assistant service returned an invalid response.");
      }

      // STREAM CHECK

      if (!response.body) {
        throw new Error("Streaming is not supported by this browser.");
      }

      const reader = response.body.getReader();

      const decoder = new TextDecoder();

      let buffer = "";
      let streamFinished = false;
      let receivedToken = false;

      // READ STREAM

      while (!streamFinished) {
        const { value, done } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, {
          stream: true,
        });

        const lines = buffer.split("\n");

        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();

          if (!trimmed) continue;

          const data = parseStreamLine(trimmed);
          if (!data) continue;

          if (typeof data.token === "string") {
            receivedToken = true;
            streamBufferRef.current += data.token;
            startSmoothTyping();
          }

          if (data.done) {
            streamFinished = true;
            break;
          }
        }
      }

      // PROCESS FINAL BUFFER

      if (buffer.trim()) {
        const data = parseStreamLine(buffer);
        if (typeof data?.token === "string") {
          receivedToken = true;
          streamBufferRef.current += data.token;
          startSmoothTyping();
        }
      }

      if (!receivedToken) {
        throw new Error("The assistant returned an empty response.");
      }

      // WAIT FOR LOCAL TYPING TO FINISH

      await new Promise((resolve) => {
        const waitForTyping = () => {
          if (!streamBufferRef.current) {
            resolve();
            return;
          }

          setTimeout(waitForTyping, 20);
        };

        waitForTyping();
      });

      // CLEAN STREAM

      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);

        streamTimerRef.current = null;
      }

      streamBufferRef.current = "";

      try {
        reader.releaseLock();
      } catch {
        // Already released.
      }
    } catch (error) {
      if (error?.name !== "AbortError" || requestTimedOutRef.current) {
        cleanupStream();

        setMessages((prev) => {
          const updated = [...prev];

          const lastIndex = updated.length - 1;

          if (updated[lastIndex]?.role === "assistant") {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: requestTimedOutRef.current
                ? "The assistant took too long to respond. Please try again."
                : error?.message === "Unable to connect to AI"
                  ? "The assistant is temporarily unavailable. Please try again shortly."
                  : "Sorry, I couldn't complete that request. Check your connection and try again.",
            };
          }

          return updated;
        });
      }
    } finally {
      clearTimeout(requestTimeoutRef.current);
      requestTimeoutRef.current = null;
      requestTimedOutRef.current = false;
      abortControllerRef.current = null;

      setLoading(false);

      focusTimeoutRef.current = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // ENTER KEY

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      sendMessage();
    }
  };

  // CLOSE CHAT

  const closeChat = () => {
    if (loading) {
      stopGenerating();
    }

    setIsOpen(false);
  };

  return createPortal(
    <>
      {/* CHAT WINDOW */}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="SnapRoll Assistant"
          data-lenis-prevent
          className="fixed right-3 bottom-3 left-3 z-[999999] flex h-[calc(100dvh-24px)] max-h-[680px] animate-[chatOpen_0.3s_ease-out] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-black/95 shadow-[0_25px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl sm:right-5 sm:bottom-24 sm:left-auto sm:h-[520px] sm:max-h-none sm:w-[360px] sm:rounded-[28px]"
        >
          {/* HEADER */}

          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3.5 sm:px-5 sm:py-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_8px_25px_rgba(255,255,255,0.12)] sm:h-10 sm:w-10 sm:rounded-2xl">
                <img
                  src={chatbotImage}
                  alt="SnapRoll Assistant"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-white">SnapRoll Assistant</h3>

                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />

                  <p className="text-[11px] text-white/45">{loading ? "Thinking..." : "Online"}</p>
                </div>
              </div>
            </div>

            <button
              onClick={closeChat}
              className="ml-3 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/50 transition-all duration-300 hover:rotate-90 hover:bg-white/10 hover:text-white"
              aria-label="Close chatbot"
            >
              <X size={19} />
            </button>
          </div>

          {/* MESSAGES */}

          <div
            ref={messagesContainerRef}
            data-lenis-prevent
            onScroll={handleMessagesScroll}
            onWheel={handleMessagesWheel}
            onTouchStart={handleMessagesTouchStart}
            onTouchMove={handleMessagesTouchMove}
            className="chatbot-messages min-h-0 flex-1 touch-pan-y space-y-3 overflow-x-hidden overflow-y-auto overscroll-contain p-3.5 sm:space-y-4 sm:p-4"
            style={{
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-[messageIn_0.25s_ease-out]`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed sm:max-w-[82%] sm:px-4 sm:py-3 sm:text-sm ${
                    msg.role === "user"
                      ? `rounded-br-md bg-white text-black shadow-lg`
                      : `rounded-bl-md border border-white/10 bg-white/[0.06] text-white/80 backdrop-blur-sm`
                  } `}
                >
                  {msg.role === "assistant" && (
                    <div className="mb-1.5 flex items-center gap-2 text-[9px] font-medium tracking-wider text-white/35 uppercase sm:mb-2 sm:text-[10px]">
                      <Sparkles size={10} />
                      SnapRoll AI
                    </div>
                  )}

                  <span className="break-words whitespace-pre-wrap">{msg.content}</span>
                </div>
              </div>
            ))}

            {/* LOADING DOTS */}

            {loading &&
              messages[messages.length - 1]?.role === "assistant" &&
              !messages[messages.length - 1]?.content && (
                <div className="flex animate-[messageIn_0.25s_ease-out] justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" />

                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40"
                        style={{
                          animationDelay: "150ms",
                        }}
                      />

                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40"
                        style={{
                          animationDelay: "300ms",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

            <div className="h-px w-full" />
          </div>

          {/* INPUT */}

          <div className="shrink-0 border-t border-white/10 bg-black/30 p-2.5 pb-[max(10px,env(safe-area-inset-bottom))] sm:p-3">
            <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.05] p-1.5 transition-all duration-200 focus-within:border-white/20 focus-within:bg-white/[0.07] sm:gap-2 sm:p-2">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                onKeyDown={handleKeyDown}
                placeholder={loading ? "SnapRoll AI is thinking..." : "Ask anything..."}
                disabled={loading}
                className="min-w-0 flex-1 bg-transparent px-2 text-[13px] text-white outline-none placeholder:text-white/25 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
              />

              {/* SEND / STOP BUTTON */}

              <button
                onClick={loading ? stopGenerating : sendMessage}
                disabled={!loading && !message.trim()}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-white text-black shadow-lg transition-all duration-200 hover:scale-105 hover:bg-white/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100 sm:h-10 sm:w-10"
                aria-label={loading ? "Stop generating" : "Send message"}
              >
                {loading ? (
                  <span className="h-3.5 w-3.5 rounded-[3px] bg-black sm:h-4 sm:w-4" />
                ) : (
                  <Send size={15} className="sm:h-4 sm:w-4" />
                )}
              </button>
            </div>

            <p className="mt-1.5 text-center text-[8px] text-white/20 sm:mt-2 sm:text-[9px]">
              SnapRoll AI can make mistakes. Check important information.
            </p>
          </div>
        </div>
      )}

      {/* FLOATING CHATBOT BUTTON */}

      <button
        onClick={() => {
          if (isOpen) closeChat();
          else setIsOpen(true);
          setBotPulse(false);
        }}
        className={`chatbot-launcher group fixed right-4 bottom-4 z-[999999] h-13 w-13 cursor-pointer items-center justify-center overflow-visible rounded-full border border-amber-100/25 bg-linear-to-br from-zinc-700 via-black to-black shadow-[0_16px_45px_rgba(0,0,0,0.65),0_0_28px_rgba(245,158,11,0.10)] transition-[transform,box-shadow,border-color] duration-300 hover:scale-110 hover:border-amber-100/45 hover:shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_38px_rgba(245,158,11,0.22)] active:scale-95 sm:right-5 sm:bottom-5 sm:h-15 sm:w-15 ${isOpen ? "hidden sm:flex" : "flex"} ${botPulse ? "bot-jiggle" : ""} `}
        aria-label={isOpen ? "Close SnapRoll Assistant" : "Open SnapRoll Assistant"}
      >
        {isOpen ? (
          <X
            size={20}
            className="text-white transition-all duration-300 group-hover:rotate-90 sm:h-[22px] sm:w-[22px]"
          />
        ) : (
          <>
            <span className="chatbot-launcher-ring chatbot-launcher-ring-one pointer-events-none absolute rounded-full border border-amber-100/20" />
            <span className="chatbot-launcher-ring chatbot-launcher-ring-two pointer-events-none absolute rounded-full border border-white/10" />

            <span
              className={`pointer-events-none absolute right-[calc(100%+12px)] hidden w-max items-center gap-2 rounded-full border border-white/10 bg-black/85 px-3.5 py-2 text-[10px] font-medium tracking-[0.08em] text-white/70 shadow-xl backdrop-blur-xl transition-all duration-300 sm:flex ${
                botPulse
                  ? "translate-x-0 opacity-100"
                  : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              <Sparkles size={11} className="text-amber-200" />
              Ask SnapRoll AI
            </span>

            <span className="absolute inset-1 z-0 rounded-full bg-linear-to-br from-amber-100/25 via-transparent to-rose-300/15" />

            <img
              src={chatbotImage}
              alt="SnapRoll Assistant"
              className="relative z-10 h-full w-full rounded-full object-cover p-0.5 transition-transform duration-300 group-hover:scale-[1.03] group-hover:rotate-[-3deg]"
            />
          </>
        )}

        {!isOpen && (
          <span className="absolute top-[5px] right-[-2px] z-20 h-3.5 w-3.5 animate-pulse rounded-full border-2 border-black bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.95)] sm:top-[7px] sm:right-[-2px] sm:h-4 sm:w-4" />
        )}
      </button>
    </>,
    document.body,
  );
};

export default Chatbot;
