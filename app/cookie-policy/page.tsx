import Link from "next/link";
import { Footer } from "../components/Footer";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#f7f3ef] text-[#1f1c1a]">
      <main className="bg-[#f7f3ef] pt-28 pb-16 lg:pb-4">
        <div className="mx-auto w-full max-w-4xl px-6 sm:px-10 lg:px-16">
          <div className="lg:max-w-3xl lg:mx-auto">
            <h1 className="text-5xl font-bold text-[#1f1c1a] sm:text-6xl mb-8">
              Cookie Policy
            </h1>
            
            <div className="prose prose-lg max-w-none space-y-6 text-[#1f1c1a]">
            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                Cosa sono i Cookie
              </h2>
              <p className="text-base leading-7 sm:text-lg">
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo 
                quando visiti un sito web. I cookie permettono al sito di ricordare le tue 
                azioni e preferenze per un periodo di tempo, così non devi reinserirle ogni 
                volta che torni sul sito o navighi da una pagina all'altra.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                Tipi di Cookie Utilizzati
              </h2>
              <p className="text-base leading-7 sm:text-lg mb-4">
                Questo sito utilizza esclusivamente cookie tecnici e cookie di consenso, 
                conformemente alla normativa vigente (Direttiva ePrivacy 2002/58/CE e GDPR).
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#1f1c1a] mb-2 mt-6">
                    Cookie Tecnici (Necessari)
                  </h3>
                  <p className="text-base leading-7 sm:text-lg mb-2">
                    Questi cookie sono essenziali per il funzionamento del sito web e non possono 
                    essere disattivati. Permettono funzionalità di base come la navigazione tra 
                    le pagine e l'accesso ad aree protette del sito. Senza questi cookie, 
                    alcune funzionalità del sito non funzionerebbero correttamente.
                  </p>
                  <p className="text-base leading-7 sm:text-lg">
                    <strong>Base giuridica:</strong> Interesse legittimo del titolare (art. 6, comma 1, lett. f GDPR) 
                    per garantire il corretto funzionamento del sito web. Non è richiesto il consenso 
                    per i cookie tecnici ai sensi della Direttiva ePrivacy.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#1f1c1a] mb-2 mt-6">
                    Cookie di Consenso
                  </h3>
                  <p className="text-base leading-7 sm:text-lg mb-2">
                    Utilizziamo un cookie per memorizzare la tua scelta riguardo all'accettazione 
                    o al rifiuto dei cookie non tecnici. Questo cookie viene salvato localmente sul tuo 
                    dispositivo e ha una durata di 12 mesi.
                  </p>
                  <p className="text-base leading-7 sm:text-lg">
                    <strong>Nome cookie:</strong> cookieConsent<br />
                    <strong>Durata:</strong> 12 mesi<br />
                    <strong>Finalità:</strong> memorizzare la preferenza dell'utente riguardo ai cookie<br />
                    <strong>Base giuridica:</strong> Consenso dell'interessato (art. 6, comma 1, lett. a GDPR)
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                Gestione dei Cookie
              </h2>
              <p className="text-base leading-7 sm:text-lg mb-4">
                Puoi gestire o eliminare i cookie in qualsiasi momento attraverso le impostazioni 
                del tuo browser. Tuttavia, tieni presente che disabilitare i cookie tecnici potrebbe 
                compromettere alcune funzionalità del sito.
              </p>
              <p className="text-base leading-7 sm:text-lg">
                Per maggiori informazioni su come gestire i cookie nei principali browser:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base leading-7 sm:text-lg ml-4 mt-4">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff5a43] hover:underline transition"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff5a43] hover:underline transition"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff5a43] hover:underline transition"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-9956-1d1f0fcfb5a8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff5a43] hover:underline transition"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                Cookie di Terze Parti
              </h2>
              <p className="text-base leading-7 sm:text-lg">
                Attualmente questo sito <strong>non utilizza cookie di terze parti</strong> per il tracciamento, 
                la profilazione o la pubblicità. Il sito utilizza esclusivamente cookie tecnici e cookie di consenso 
                gestiti direttamente dal titolare del trattamento.
              </p>
              <p className="text-base leading-7 sm:text-lg mt-4">
                Qualora in futuro si rendesse necessario implementare servizi di terze parti che utilizzano 
                cookie (ad esempio servizi di analisi, social media, pubblicità), questa policy verrà aggiornata 
                di conseguenza con informazioni dettagliate sui cookie di terze parti utilizzati, le loro finalità 
                e le modalità di gestione del consenso.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                Base Giuridica e Consenso
              </h2>
              <p className="text-base leading-7 sm:text-lg mb-4">
                L'utilizzo dei cookie su questo sito è conforme alla normativa vigente:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base leading-7 sm:text-lg ml-4">
                <li><strong>Cookie tecnici:</strong> non richiedono il consenso ai sensi della Direttiva ePrivacy 2002/58/CE, 
                in quanto necessari per il funzionamento del sito. La base giuridica è l'interesse legittimo del titolare 
                (art. 6, comma 1, lett. f GDPR).</li>
                <li><strong>Cookie di consenso:</strong> richiedono il consenso dell'utente. La base giuridica è il consenso 
                dell'interessato (art. 6, comma 1, lett. a GDPR).</li>
              </ul>
              <p className="text-base leading-7 sm:text-lg mt-4">
                Il consenso può essere revocato in qualsiasi momento modificando le impostazioni del browser 
                o cancellando i cookie salvati. La revoca del consenso non pregiudica la liceità del trattamento 
                basato sul consenso prima della revoca.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                Contatti
              </h2>
              <p className="text-base leading-7 sm:text-lg">
                Per qualsiasi domanda riguardo all'utilizzo dei cookie su questo sito o per esercitare i propri diritti, 
                è possibile contattare il titolare del trattamento all'indirizzo email:{" "}
                <a
                  href="mailto:info@nonsonocosa.it"
                  className="text-[#ff5a43] hover:underline transition"
                >
                  info@nonsonocosa.it
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                Modifiche alla Cookie Policy
              </h2>
              <p className="text-base leading-7 sm:text-lg">
                Il titolare si riserva il diritto di modificare questa Cookie Policy in qualsiasi momento 
                per adeguarla a eventuali modifiche normative, tecnologiche o organizzative. Le modifiche 
                sostanziali saranno comunicate agli utenti, quando possibile, mediante avviso sul sito web. 
                Le modifiche saranno pubblicate su questa pagina con la data di aggiornamento.
              </p>
              <p className="text-base leading-7 sm:text-lg mt-4">
                Si consiglia di consultare periodicamente questa pagina per essere informati su eventuali 
                modifiche all'utilizzo dei cookie.
              </p>
              <p className="text-sm text-[#6c655f] mt-4">
                Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT", { 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[#bcb6b0]">
            <Link
              href="/"
              className="inline-block text-[#ff5a43] hover:underline transition font-medium"
            >
              ← Torna alla home
            </Link>
          </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
