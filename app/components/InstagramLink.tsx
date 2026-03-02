"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface InstagramLinkProps {
  href: string;
  username: string;
  children: React.ReactNode;
  className?: string;
}

export function InstagramLink({ href, username, children, className }: InstagramLinkProps) {
  const [cleanHref, setCleanHref] = useState(href);

  useEffect(() => {
    // Su mobile, puliamo l'URL rimuovendo i parametri di query
    // che potrebbero interferire con il deep linking
    if (typeof window !== 'undefined') {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        try {
          const url = new URL(href);
          // Rimuoviamo tutti i parametri di query per permettere un deep linking corretto
          url.search = '';
          
          // Assicuriamoci che l'URL sia nel formato corretto: https://www.instagram.com/username/
          let cleanUrl = url.toString();
          if (!cleanUrl.endsWith('/')) {
            cleanUrl += '/';
          }
          
          setCleanHref(cleanUrl);
        } catch {
          // Se c'è un errore nel parsing dell'URL, usa l'URL originale
          setCleanHref(href);
        }
      }
    }
  }, [href]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Rileva se siamo su mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Su mobile: non fare preventDefault, lascia che il sistema operativo gestisca il link
      // Il link con href pulito permetterà al sistema di aprire correttamente l'app Instagram
      // con il profilo specifico invece della home page
      return; // Lascia che il comportamento predefinito funzioni
    } else {
      // Su desktop: apri nel browser con parametri UTM
      e.preventDefault();
      const url = new URL(href);
      url.searchParams.set('utm_source', 'web');
      url.searchParams.set('utm_medium', 'website');
      window.open(url.toString(), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Link
      href={cleanHref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
