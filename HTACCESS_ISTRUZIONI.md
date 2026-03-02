# ISTRUZIONI PER RISOLVERE IL REDIRECT A WWW SU HOSTINGER

## PROBLEMA
Il sito viene reindirizzato a `www.nonsonocosa.it` che causa errore SSL perché il certificato è valido solo per `nonsonocosa.it` (senza www).

## SOLUZIONE PASSO-PASSO

### PASSO 1: Verifica e Rimuovi Redirect nel Pannello Hostinger

1. **Accedi a Hostinger hPanel**
2. Vai a **"Domini"** → seleziona **`nonsonocosa.it`**
3. Cerca la sezione **"Redirect"** o **"URL Redirect"** o **"Reindirizzamenti"**
4. **Se trovi un redirect a `www.nonsonocosa.it`**, **ELIMINALO** o **DISATTIVALO**
5. Salva le modifiche

### PASSO 2: Verifica e Sostituisci .htaccess

1. Vai a **"File Manager"** in Hostinger
2. Apri la cartella **`public_html`** (root del sito)
3. **Abilita la visualizzazione dei file nascosti** (cerca l'opzione "Mostra file nascosti" o "Show hidden files")
4. Cerca il file **`.htaccess`**
5. **Se esiste, ELIMINALO o RINOMINALO** in `.htaccess.backup`
6. **Crea un NUOVO file** chiamato **`.htaccess`** (con il punto all'inizio!)
7. **Copia e incolla** il contenuto qui sotto:

---

## CONTENUTO DEL FILE .htaccess

```apache
# Forza HTTPS e rimuovi WWW (compatibile con certificato SSL esistente)
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # PRIORITÀ 1: Se la richiesta ha www, reindirizza SEMPRE a versione senza www
  # Questo deve essere PRIMA del controllo HTTPS per evitare errori SSL
  RewriteCond %{HTTP_HOST} ^www\.nonsonocosa\.it$ [NC]
  RewriteRule ^(.*)$ https://nonsonocosa.it%{REQUEST_URI} [L,R=301]
  
  # PRIORITÀ 2: Se la richiesta è HTTP, reindirizza a HTTPS (solo per non-www)
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP_HOST} ^nonsonocosa\.it$ [NC]
  RewriteRule ^(.*)$ https://nonsonocosa.it%{REQUEST_URI} [L,R=301]
</IfModule>

# Gestione delle directory con trailing slash (compatibile con Next.js trailingSlash: true)
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Se la richiesta è per una directory senza trailing slash, aggiungilo
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_URI} !(.*)/$
  RewriteRule ^(.*)$ $1/ [L,R=301]
  
  # Se la richiesta è per una directory, cerca index.html
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^(.*)$ $1/index.html [L]
</IfModule>

# Headers di sicurezza
<IfModule mod_headers.c>
  # Forza HTTPS per 1 anno (HSTS)
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains" env=HTTPS
  
  # Prevenzione clickjacking
  Header always set X-Frame-Options "SAMEORIGIN"
  
  # Prevenzione MIME type sniffing
  Header always set X-Content-Type-Options "nosniff"
  
  # XSS Protection
  Header always set X-XSS-Protection "1; mode=block"
  
  # Referrer Policy
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Compressione GZIP per migliorare le performance
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache per risorse statiche
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType video/mp4 "access plus 1 year"
  ExpiresByType font/otf "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Gestione errori personalizzati (opzionale)
ErrorDocument 404 /404.html

# Prevenzione errori 403 - Permetti accesso ai file necessari
<IfModule mod_authz_core.c>
  # Apache 2.4+
  <FilesMatch "\.(jpg|jpeg|png|gif|svg|ico|css|js|pdf|mp4|otf|woff|woff2|ttf|eot|html|htm)$">
    Require all granted
  </FilesMatch>
</IfModule>

<IfModule !mod_authz_core.c>
  # Apache 2.2 fallback
  <FilesMatch "\.(jpg|jpeg|png|gif|svg|ico|css|js|pdf|mp4|otf|woff|woff2|ttf|eot|html|htm)$">
    Order Allow,Deny
    Allow from all
  </FilesMatch>
</IfModule>

# Disabilita directory listing
Options -Indexes +FollowSymLinks
```

---

### PASSO 3: Verifica DNS

1. Vai a **"DNS"** → **`nonsonocosa.it`**
2. Verifica che non ci siano record **CNAME** o **A** che puntano a `www`
3. Se ci sono, rimuovili o modificali

### PASSO 4: Test

1. **Svuota la cache del browser** (Ctrl+Shift+Delete o Cmd+Shift+Delete)
2. Prova `https://nonsonocosa.it` → dovrebbe rimanere su `nonsonocosa.it` (senza www)
3. Prova `https://www.nonsonocosa.it` → dovrebbe reindirizzare a `https://nonsonocosa.it`

## SE IL PROBLEMA PERSISTE

Se dopo questi passaggi il problema persiste, contatta il supporto Hostinger e chiedi di:
- Rimuovere qualsiasi redirect a livello server per `www.nonsonocosa.it`
- Verificare che non ci siano configurazioni Apache che forzano il www

## NOTA IMPORTANTE

Il file `.htaccess` nella cartella `out/` è già corretto. Devi solo sostituirlo su Hostinger seguendo le istruzioni sopra.
