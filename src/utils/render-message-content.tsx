import React from "react";

function sanitizeUrl(url: string): string {
  // Replace unicode dashes (en-dash \u2013, em-dash \u2014, minus sign \u2212, hyphen \u2010, etc.) with standard ASCII hyphen-minus (-)
  // LLMs often convert standard ASCII hyphens into en-dashes/em-dashes, which causes browsers to Punycode-encode hostnames.
  return url.replace(/[\u2010-\u2015\u2212]/g, "-");
}

export function renderMessageContent(content: string, isUser: boolean = false) {
  // Regex to split by bold text, markdown links, or plain URLs
  const regex = /(\*\*.*?\*\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s]+)/g;
  const parts = content.split(regex);

  const linkClass = isUser
    ? "text-[#00F5FF] underline font-extrabold hover:text-white transition-colors break-all"
    : "text-[#FC6B34] underline font-extrabold hover:text-black transition-colors break-all";

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-extrabold">
              {part.slice(2, -2)}
            </strong>
          );
        }

        if (part.startsWith("[") && part.includes("](")) {
          const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (match) {
            const [, linkText, linkUrl] = match;
            return (
              <a
                key={i}
                href={sanitizeUrl(linkUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {linkText}
              </a>
            );
          }
        }

        if (part.startsWith("http://") || part.startsWith("https://")) {
          let href = part;
          let trailing = "";
          // Strip trailing punctuation so it doesn't break the URL
          const punctuationMatch = part.match(/([.,!?)]+)$/);
          if (punctuationMatch) {
            trailing = punctuationMatch[1];
            href = part.slice(0, -trailing.length);
          }
          return (
            <React.Fragment key={i}>
              <a
                href={sanitizeUrl(href)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {href}
              </a>
              {trailing}
            </React.Fragment>
          );
        }

        return part;
      })}
    </>
  );
}