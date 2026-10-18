"use client";

import { ArrowUpRight, Copy } from "lucide-react";
import { useState } from "react";

import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/providers/language-provider";

type ClipboardWriter = Pick<Clipboard, "writeText">;
type CopyResult = "copied" | "failed";

export async function copyEmail(
  email: string,
  clipboard: ClipboardWriter | undefined,
): Promise<CopyResult> {
  if (!clipboard) return "failed";
  try {
    await clipboard.writeText(email);
    return "copied";
  } catch {
    return "failed";
  }
}

export function Contact() {
  const [copyStatus, setCopyStatus] = useState<CopyResult | null>(null);
  const { language, t } = useLanguage();
  const { email } = portfolioData.profile;
  const externalLinks = portfolioData.socialLinks.filter((link) => link.id !== "email");

  const handleCopy = async () => {
    setCopyStatus(null);
    const result = await copyEmail(email, navigator.clipboard);
    setCopyStatus(result);
  };

  return (
    <section className="contact-section" id="contact">
      <p className="contact-kicker">06 / Contact</p>
      <h2>
        {language === "en" ? "Let's build something" : "Cùng xây dựng điều gì đó"}
        <span>{language === "en" ? " useful." : " hữu ích."}</span>
      </h2>
      <p className="contact-intro">
        {language === "en"
          ? "Open to AI engineering opportunities, computer-vision problems, and thoughtful software collaborations."
          : "Sẵn sàng cho cơ hội AI Engineering, bài toán thị giác máy tính và những hợp tác phần mềm có chiều sâu."}
      </p>

      <div className="contact-email-row">
        <a href={`mailto:${email}`}>{email}</a>
        <button aria-label={t(portfolioData.ui.copyEmail)} onClick={handleCopy} type="button">
          <Copy aria-hidden="true" size={20} />
        </button>
      </div>
      <div aria-live="polite" className="copy-status" role="status">
        {copyStatus === "copied" && t(portfolioData.ui.copied)}
        {copyStatus === "failed" && t(portfolioData.ui.copyFailed)}
      </div>

      <footer className="contact-footer">
        <span>Vu Van Tung · 2026</span>
        <div>
          {externalLinks.map((link) => (
            <a href={link.href} key={link.id} rel="noreferrer noopener" target="_blank">
              {link.label} <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
}
