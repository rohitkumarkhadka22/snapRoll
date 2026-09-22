import { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles } from "lucide-react";
import chatbotImage from "../assets/images/chatbot.jpg";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! 👋 I'm the SnapRoll Assistant. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [messages, loading, isOpen]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  // Send message
  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    /*
      Build conversation BEFORE adding the new message to state.

      This gives the backend:
      - previous user messages
      - previous AI responses
      - current user message
    */
    const conversation = [
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: userMessage,
      },
    ];

    // Show user message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Close chatbot
  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* =====================================================
          CHAT WINDOW
      ====================================================== */}
      {isOpen && (
        <div
          className="
            fixed
            bottom-24
            right-5
            z-[9999]
            flex
            h-[520px]
            w-[360px]
            flex-col
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-black/90
            shadow-[0_25px_80px_rgba(0,0,0,0.7)]
            backdrop-blur-2xl
            animate-[chatOpen_0.3s_ease-out]
            sm:right-6
          "
        >
          {/* =================================================
              HEADER
          ================================================== */}
          <div
            className="
              flex
              shrink-0
              items-center
              justify-between
              border-b
              border-white/10
              px-5
              py-4
            "
          >
            <div className="flex items-center gap-3">
              {/* BOT IMAGE */}
              <div
                className="
                  relative
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/15
                  bg-black
                  shadow-[0_8px_25px_rgba(255,255,255,0.12)]
                "
              >
                <img
                  src={chatbotImage}
                  alt="SnapRoll Assistant"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  SnapRoll Assistant
                </h3>

                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      animate-pulse
                      rounded-full
                      bg-green-400
                    "
                  />

                  <p className="text-[11px] text-white/45">
                    {loading ? "Thinking..." : "Online"}
                  </p>
                </div>
              </div>
            </div>

            {/* CLOSE */}
            <button
              onClick={closeChat}
              className="
                cursor-pointer
                rounded-full
                p-2
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

          {/* =================================================
              MESSAGES
          ================================================== */}
          <div
            onWheel={(e) => {
              e.stopPropagation();
            }}
            className="
              chatbot-messages
              min-h-0
              flex-1
              space-y-4
              overflow-y-auto
              overflow-x-hidden
              overscroll-contain
              p-4
              scroll-smooth
              touch-pan-y
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
                    max-w-[82%]
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    leading-relaxed
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
                  {/* AI LABEL */}
                  {msg.role === "assistant" && (
                    <div
                      className="
                        mb-2
                        flex
                        items-center
                        gap-2
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-wider
                        text-white/35
                      "
                    >
                      <Sparkles size={11} />
                      SnapRoll AI
                    </div>
                  )}

                  {/* MESSAGE */}
                  <span className="whitespace-pre-wrap">{msg.content}</span>
                </div>
              </div>
            ))}

            {/* =================================================
                LOADING
            ================================================== */}
            {loading && (
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
                  <div className="flex items-center gap-1.5">
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

            {/* AUTO SCROLL */}
            <div ref={messagesEndRef} className="h-px w-full" />
          </div>

          {/* =================================================
              INPUT
          ================================================== */}
          <div
            className="
              shrink-0
              border-t
              border-white/10
              bg-black/20
              p-3
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                border
                border-white/10
                bg-white/[0.05]
                p-2
                transition-all
                duration-200
                focus-within:border-white/20
                focus-within:bg-white/[0.07]
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
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-white/25
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              {/* SEND */}
              <button
                onClick={sendMessage}
                disabled={!message.trim() || loading}
                className="
                  flex
                  h-10
                  w-10
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
                "
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>

            <p className="mt-2 text-center text-[9px] text-white/20">
              SnapRoll AI can make mistakes. Check important information.
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          FLOATING CHATBOT BUTTON
      ====================================================== */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          group
          fixed
          bottom-5
          right-5
          z-[9999]
          flex
          h-14
          w-14
          cursor-pointer
          items-center
          justify-center
          overflow-hidden
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
          sm:right-6
        "
        aria-label={
          isOpen ? "Close SnapRoll Assistant" : "Open SnapRoll Assistant"
        }
      >
        {isOpen ? (
          <X
            size={22}
            className="
              text-white
              transition-all
              duration-300
              group-hover:rotate-90
            "
          />
        ) : (
          <img
            src={chatbotImage}
            alt="SnapRoll Assistant"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-110
            "
          />
        )}
      </button>

      {/* =====================================================
          ANIMATIONS + SCROLLBAR
      ====================================================== */}
      <style>{`
        @keyframes chatOpen {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chatbot-messages::-webkit-scrollbar {
          width: 5px;
        }

        .chatbot-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .chatbot-messages::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 999px;
        }

        .chatbot-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.22);
        }

        .chatbot-messages {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
        }
      `}</style>
    </>
  );
};

export default Chatbot;
