'use client';
import { useState } from "react";

export function ContactForm({ t }: { t: any }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const NAME_LIMIT = 100;
  const EMAIL_LIMIT = 100;
  const MESSAGE_LIMIT = 300;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.errorSendingMessage);

      setFeedback(t.sentMessage);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setFeedback(err.message || t.errorSendingMessage);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-xl"
    >
      <label className="text-black text-xl md:text-2xl font-medium font-satoshi leading-8">
        {t.name}
      </label>
      <div className="relative">
        <input
          type="text"
          value={name}
          maxLength={NAME_LIMIT}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-14 rounded-[5px] border border-black px-4 pr-16"
          required
        />
        <span className="absolute bottom-2 right-3 text-sm text-black/40 font-satoshi">
          {name.length}/{NAME_LIMIT}
        </span>
      </div>

      <label className="text-black text-xl md:text-2xl font-medium font-satoshi leading-8">
        Email
      </label>
      <div className="relative">
        <input
          type="email"
          value={email}
          maxLength={EMAIL_LIMIT}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-14 rounded-[5px] border border-black px-4 pr-16"
          required
        />
        <span className="absolute bottom-2 right-3 text-sm text-black/40 font-satoshi">
          {email.length}/{EMAIL_LIMIT}
        </span>
      </div>

      <label className="text-black text-xl md:text-2xl font-medium font-satoshi leading-8">
        {t.message}
      </label>
      <div className="relative">
        <textarea
          value={message}
          maxLength={MESSAGE_LIMIT}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-28 rounded-[5px] border border-black px-4 py-2 resize-none pr-16"
          required
          placeholder={t.placeholderMessage}
        />
        <span className="absolute bottom-2 right-3 text-sm text-black/40 font-satoshi">
          {message.length}/{MESSAGE_LIMIT}
        </span>
      </div>

      <button
        type="submit"
        disabled={isSending}
        className={`w-full max-w-xs md:max-w-sm px-8 py-3 rounded-[5px] flex items-center justify-center gap-2.5 mx-auto transition-all duration-200 ${
          isSending ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-orange-700"
        }`}
      >
        <span className="text-white text-base font-medium font-satoshi leading-8">
          {isSending ? t.sendingMessage : t.sendMessage}
        </span>
      </button>

      {feedback && (
        <div className="text-center text-sm mt-2 text-black/70 font-satoshi">
          {feedback}
        </div>
      )}
    </form>
  );
}
