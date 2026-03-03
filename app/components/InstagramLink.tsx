"use client";

import Link from "next/link";

interface InstagramLinkProps {
  href: string;
  username: string;
  children: React.ReactNode;
  className?: string;
}

export function InstagramLink({ href, username, children, className }: InstagramLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    const webUrl = `https://www.instagram.com/${username}/`;

    if (isIOS) {
      // Schema nativo iOS: apre direttamente il profilo nell'app
      const appUrl = `instagram://user?username=${username}`;
      window.location.href = appUrl;
      // Se dopo 1.5s la pagina è ancora visibile (app non installata), apri il browser
      setTimeout(() => {
        if (!document.hidden) {
          window.location.href = webUrl;
        }
      }, 1500);
    } else if (isAndroid) {
      // Intent URL Android: apre direttamente il profilo nell'app
      const intentUrl = `intent://instagram.com/_u/${username}#Intent;package=com.instagram.android;scheme=https;end`;
      window.location.href = intentUrl;
    } else {
      // Desktop: apri nel browser con parametri UTM
      const url = new URL(href);
      url.searchParams.set('utm_source', 'web');
      url.searchParams.set('utm_medium', 'website');
      window.open(url.toString(), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Link
      href={`https://www.instagram.com/${username}/`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
