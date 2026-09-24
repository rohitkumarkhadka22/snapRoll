import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Send, Sparkles } from "lucide-react";
import chatbotImage from "../assets/images/chatbot.jpg";

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

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // SMOOTH STREAMING REFS

  const streamBufferRef = useRef("");
  const streamTimerRef = useRef(null);

  // BOT ANIMATION EVERY 3 SECONDS

  useEffect(() => {
    if (isOpen) return;

    const interval = setInterval(() => {
      setBotPulse(true);

      setTimeout(() => {
        setBotPulse(false);
      }, 700);
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // AUTO SCROLL CHAT

  useEffect(() => {
    if (!isOpen) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: loading ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, loading, isOpen]);

  // FOCUS INPUT WHEN CHAT OPENS

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 200);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // CLEAN STREAM TIMER

  const cleanupStream = () => {
    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }

    streamBufferRef.current = "";
  };

  // SMOOTHLY DISPLAY BUFFERED TEXT

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

  // SEND MESSAGE - STREAMING

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    cleanupStream();

    // KEEP PREVIOUS CONVERSATION

    const conversation = messages
      .filter((msg) => msg.content && typeof msg.content === "string")
      .map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))
      .slice(-16);

    // SHOW USER + EMPTY AI MESSAGE IMMEDIATELY

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

      const response = await fetch("http://localhost:5001/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: userMessage,
          conversation,
        }),
      });

      // HANDLE HTTP ERROR

      if (!response.ok) {
        let errorMessage = "Something went wrong.";

        try {
          const errorData = await response.json();

          errorMessage = errorData.error || errorMessage;
        } catch {
          // Response wasn't JSON.
        }

        throw new Error(errorMessage);
      }

      // CHECK STREAM SUPPORT

      if (!response.body) {
        throw new Error("Streaming is not supported by this browser.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";
      let streamFinished = false;

      // READ STREAM

      while (!streamFinished) {
        const { value, done } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, {
          stream: true,
        });

        const lines = buffer.split("\n");

        // Keep incomplete line
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();

          if (!trimmed) continue;

          try {
            const data = JSON.parse(trimmed);

            // RECEIVE AI TOKEN

            if (data.token) {
              // Add token to buffer
              streamBufferRef.current += data.token;

              // Start smooth visual typing
              startSmoothTyping();
            }

            // STREAM ERROR

            if (data.error) {
              throw new Error(data.error);
            }

            // STREAM FINISHED

            if (data.done) {
              streamFinished = true;
              break;
            }
          } catch (parseError) {
            console.error("Stream parse error:", parseError);
          }
        }
      }

      // PROCESS FINAL INCOMPLETE LINE

      if (buffer.trim()) {
        try {
          const data = JSON.parse(buffer);

          if (data.token) {
            streamBufferRef.current += data.token;

            startSmoothTyping();
          }

          if (data.error) {
            throw new Error(data.error);
          }
        } catch {
          // Ignore incomplete final chunk
        }
      }

      // WAIT FOR ALL TEXT TO FINISH TYPING

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

      // CLEANUP

      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);
        streamTimerRef.current = null;
      }

      streamBufferRef.current = "";

      reader.releaseLock();
    } catch (error) {
      console.error("Chat error:", error);

      cleanupStream();

      // SHOW ERROR INSIDE CHAT

      setMessages((prev) => {
        const updated = [...prev];

        const lastIndex = updated.length - 1;

        if (updated[lastIndex]?.role === "assistant") {
          updated[lastIndex] = {
            ...updated[lastIndex],
            content:
              "Sorry, I'm having trouble connecting right now. Please try again.",
          };
        }

        return updated;
      });
    } finally {
      setLoading(false);

      // Focus input again
      setTimeout(() => {
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
    setIsOpen(false);
  };

  // RENDER

  return createPortal(
    <>
      {/* CHAT WINDOW */}

      {isOpen && (
        <div
          className="
            fixed
            z-[999999]

            bottom-3
            left-3
            right-3

            h-[calc(100dvh-24px)]
            max-h-[680px]

            sm:bottom-24
            sm:left-auto
            sm:right-5

            sm:h-[520px]
            sm:w-[360px]
            sm:max-h-none

            flex
            flex-col
            overflow-hidden

            rounded-[24px]
            sm:rounded-[28px]

            border
            border-white/10

            bg-black/95

            shadow-[0_25px_80px_rgba(0,0,0,0.7)]

            backdrop-blur-2xl

            animate-[chatOpen_0.3s_ease-out]
          "
        >
          {/* HEADER */}

          <div
            className="
              flex
              shrink-0
              items-center
              justify-between

              border-b
              border-white/10

              px-4
              py-3.5

              sm:px-5
              sm:py-4
            "
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="
                  relative
                  flex
                  h-9
                  w-9
                  shrink-0

                  items-center
                  justify-center

                  overflow-hidden

                  rounded-xl

                  border
                  border-white/15

                  bg-black

                  shadow-[0_8px_25px_rgba(255,255,255,0.12)]

                  sm:h-10
                  sm:w-10
                  sm:rounded-2xl
                "
              >
                <img
                  src={chatbotImage}
                  alt="SnapRoll Assistant"
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              </div>

              <div className="min-w-0">
                <h3
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  SnapRoll Assistant
                </h3>

                <div
                  className="
                    mt-1
                    flex
                    items-center
                    gap-1.5
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5

                      animate-pulse

                      rounded-full

                      bg-green-400
                    "
                  />

                  <p
                    className="
                      text-[11px]
                      text-white/45
                    "
                  >
                    {loading ? "Thinking..." : "Online"}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={closeChat}
              className="
                ml-3

                flex
                h-9
                w-9
                shrink-0

                cursor-pointer

                items-center
                justify-center

                rounded-full

                text-white/50

                transition-all
                duration-300

                hover:rotate-90
                hover:bg-white/10
                hover:text-white
              "
              aria-label="Close chatbot"
            >
              <X size={19} />
            </button>
          </div>

          {/* MESSAGES */}

          <div
            onWheel={(e) => {
              e.stopPropagation();
            }}
            onTouchMove={(e) => {
              e.stopPropagation();
            }}
            className="
              chatbot-messages

              min-h-0
              flex-1

              space-y-3

              overflow-y-auto
              overflow-x-hidden

              overscroll-contain

              p-3.5

              scroll-smooth

              touch-pan-y

              sm:space-y-4
              sm:p-4
            "
          >
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`
                  flex
                  ${msg.role === "user" ? "justify-end" : "justify-start"}

                  animate-[messageIn_0.25s_ease-out]
                `}
              >
                <div
                  className={`
                    max-w-[88%]

                    rounded-2xl

                    px-3.5
                    py-2.5

                    text-[13px]
                    leading-relaxed

                    sm:max-w-[82%]
                    sm:px-4
                    sm:py-3
                    sm:text-sm

                    ${
                      msg.role === "user"
                        ? `
                          rounded-br-md
                          bg-white
                          text-black
                          shadow-lg
                        `
                        : `
                          rounded-bl-md
                          border
                          border-white/10
                          bg-white/[0.06]
                          text-white/80
                          backdrop-blur-sm
                        `
                    }
                  `}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="
                        mb-1.5

                        flex
                        items-center
                        gap-2

                        text-[9px]
                        font-medium
                        uppercase
                        tracking-wider

                        text-white/35

                        sm:mb-2
                        sm:text-[10px]
                      "
                    >
                      <Sparkles size={10} />
                      SnapRoll AI
                    </div>
                  )}

                  <span
                    className="
                      whitespace-pre-wrap
                      break-words
                    "
                  >
                    {msg.content}
                  </span>
                </div>
              </div>
            ))}

            {/* LOADING DOTS */}

            {loading &&
              messages[messages.length - 1]?.role === "assistant" &&
              !messages[messages.length - 1]?.content && (
                <div
                  className="
                    flex
                    justify-start

                    animate-[messageIn_0.25s_ease-out]
                  "
                >
                  <div
                    className="
                      rounded-2xl
                      rounded-bl-md

                      border
                      border-white/10

                      bg-white/[0.06]

                      px-4
                      py-3

                      backdrop-blur-sm
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                      "
                    >
                      <span
                        className="
                          h-1.5
                          w-1.5
                          animate-bounce
                          rounded-full
                          bg-white/40
                        "
                      />

                      <span
                        className="
                          h-1.5
                          w-1.5
                          animate-bounce
                          rounded-full
                          bg-white/40
                        "
                        style={{
                          animationDelay: "150ms",
                        }}
                      />

                      <span
                        className="
                          h-1.5
                          w-1.5
                          animate-bounce
                          rounded-full
                          bg-white/40
                        "
                        style={{
                          animationDelay: "300ms",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

            <div ref={messagesEndRef} className="h-px w-full" />
          </div>

          {/* INPUT */}

          <div
            className="
              shrink-0

              border-t
              border-white/10

              bg-black/30

              p-2.5

              pb-[max(10px,env(safe-area-inset-bottom))]

              sm:p-3
            "
          >
            <div
              className="
                flex
                items-center

                gap-1.5

                rounded-2xl

                border
                border-white/10

                bg-white/[0.05]

                p-1.5

                transition-all
                duration-200

                focus-within:border-white/20
                focus-within:bg-white/[0.07]

                sm:gap-2
                sm:p-2
              "
            >
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  loading ? "SnapRoll AI is thinking..." : "Ask anything..."
                }
                disabled={loading}
                className="
                  min-w-0
                  flex-1

                  bg-transparent

                  px-2

                  text-[13px]
                  text-white

                  outline-none

                  placeholder:text-white/25

                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  sm:text-sm
                "
              />

              <button
                onClick={sendMessage}
                disabled={!message.trim() || loading}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0

                  cursor-pointer

                  items-center
                  justify-center

                  rounded-xl

                  bg-white

                  text-black

                  shadow-lg

                  transition-all
                  duration-200

                  hover:scale-105
                  hover:bg-white/90

                  active:scale-95

                  disabled:cursor-not-allowed
                  disabled:opacity-30

                  disabled:hover:scale-100

                  sm:h-10
                  sm:w-10
                "
                aria-label="Send message"
              >
                <Send
                  size={15}
                  className="
                    sm:h-4
                    sm:w-4
                  "
                />
              </button>
            </div>

            <p
              className="
                mt-1.5

                text-center

                text-[8px]
                text-white/20

                sm:mt-2
                sm:text-[9px]
              "
            >
              SnapRoll AI can make mistakes. Check important information.
            </p>
          </div>
        </div>
      )}

      {/* FLOATING CHATBOT BUTTON */}

      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
          setBotPulse(false);
        }}
        className={`
          group

          fixed

          bottom-4
          right-4

          z-[999999]

          flex
          h-12
          w-12

          cursor-pointer

          items-center
          justify-center

          overflow-visible

          rounded-full

          border
          border-white/20

          bg-black

          shadow-[0_15px_40px_rgba(0,0,0,0.5)]

          transition-all
          duration-300

          hover:scale-110

          hover:shadow-[0_20px_55px_rgba(255,255,255,0.15)]

          active:scale-95

          sm:bottom-5
          sm:right-5

          sm:h-14
          sm:w-14

          ${botPulse ? "bot-pulse" : ""}
        `}
        aria-label={
          isOpen ? "Close SnapRoll Assistant" : "Open SnapRoll Assistant"
        }
      >
        {isOpen ? (
          <X
            size={20}
            className="
              text-white

              transition-all
              duration-300

              group-hover:rotate-90

              sm:h-[22px]
              sm:w-[22px]
            "
          />
        ) : (
          <img
            src={chatbotImage}
            alt="SnapRoll Assistant"
            className="
              h-full
              w-full

              rounded-full

              object-cover
            "
          />
        )}

        {/* GREEN ONLINE LIGHT */}

        {!isOpen && (
          <span
            className="
              absolute

              right-[-2px]
              top-[5px]

              z-20

              h-3.5
              w-3.5

              rounded-full

              border-2
              border-black

              bg-green-500

              shadow-[0_0_12px_rgba(34,197,94,0.95)]

              animate-pulse

              sm:right-[-2px]
              sm:top-[7px]

              sm:h-4
              sm:w-4
            "
          />
        )}
      </button>

      {/* ANIMATIONS + SCROLLBAR */}
    </>,
    document.body,
  );
};

export default Chatbot;
