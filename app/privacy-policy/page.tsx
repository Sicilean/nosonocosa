import Link from "next/link";
import { Footer } from "../components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f7f3ef] text-[#1f1c1a]">
      <main className="bg-[#f7f3ef] pt-28 pb-16 lg:pb-4">
        <div className="mx-auto w-full max-w-4xl px-6 sm:px-10 lg:px-16">
          <div className="lg:max-w-3xl lg:mx-auto">
            <h1 className="text-5xl font-bold text-[#1f1c1a] sm:text-6xl mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none space-y-6 text-[#1f1c1a]">
            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                1. Titolare del Trattamento
              </h2>
              <p className="text-base leading-7 sm:text-lg">
                Il titolare del trattamento dei dati personali è l'Associazione Senzanome APS, 
                con sede in Castelvetrano (TP), Italia.
              </p>
              <p className="text-base leading-7 sm:text-lg mt-2">
                Per qualsiasi richiesta relativa al trattamento dei dati personali è possibile 
                contattare il titolare all'indirizzo email:{" "}
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
                2. Dati Raccolti
              </h2>
              <p className="text-base leading-7 sm:text-lg mb-4">
                Questo sito web raccoglie i seguenti dati personali:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base leading-7 sm:text-lg ml-4">
                <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, sistema operativo, pagine visitate, data e ora di accesso, durata della visita. Questi dati vengono raccolti automaticamente durante la navigazione.</li>
                <li><strong>Cookie tecnici:</strong> cookie necessari per il funzionamento del sito web, inclusi cookie di sessione e cookie di consenso.</li>
                <li><strong>Dati forniti volontariamente:</strong> dati personali (nome, cognome, email, eventuali altri dati) forniti volontariamente dall'utente tramite form di contatto, iscrizione a newsletter o altre comunicazioni.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                3. Finalità del Trattamento
              </h2>
              <p className="text-base leading-7 sm:text-lg mb-4">
                I dati personali sono trattati per le seguenti finalità:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base leading-7 sm:text-lg ml-4">
                <li><strong>Erogazione dei servizi:</strong> fornire e gestire i servizi del sito web, inclusa la navigazione e l'accesso alle funzionalità.</li>
                <li><strong>Comunicazione:</strong> rispondere alle richieste degli utenti, fornire informazioni richieste, gestire comunicazioni.</li>
                <li><strong>Adempimenti legali:</strong> rispettare gli obblighi di legge, regolamenti e normative applicabili.</li>
                <li><strong>Miglioramento del servizio:</strong> analizzare l'utilizzo del sito (in forma aggregata e anonima) per migliorare l'esperienza utente e le funzionalità del sito.</li>
                <li><strong>Sicurezza:</strong> garantire la sicurezza del sito web e prevenire abusi o attività fraudolente.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                4. Base Giuridica del Trattamento
              </h2>
              <p className="text-base leading-7 sm:text-lg mb-4">
                Il trattamento dei dati personali si basa sulle seguenti basi giuridiche previste dal GDPR:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base leading-7 sm:text-lg ml-4">
                <li><strong>Consenso dell'interessato</strong> (art. 6, comma 1, lett. a GDPR): per i cookie non tecnici e per eventuali comunicazioni di marketing.</li>
                <li><strong>Esecuzione di un contratto</strong> (art. 6, comma 1, lett. b GDPR): per l'erogazione dei servizi richiesti dall'utente.</li>
                <li><strong>Interesse legittimo del titolare</strong> (art. 6, comma 1, lett. f GDPR): per il miglioramento del sito web e la sicurezza, previa valutazione degli interessi dell'interessato.</li>
                <li><strong>Adempimento di un obbligo di legge</strong> (art. 6, comma 1, lett. c GDPR): per il rispetto di obblighi normativi e amministrativi.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                5. Periodo di Conservazione dei Dati
              </h2>
              <p className="text-base leading-7 sm:text-lg mb-4">
                I dati personali sono conservati per il tempo strettamente necessario alle finalità per cui 
                sono stati raccolti, nel rispetto degli obblighi di legge applicabili. In particolare:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base leading-7 sm:text-lg ml-4">
                <li><strong>Dati di navigazione:</strong> conservati per un periodo massimo di 12 mesi, salvo obblighi di legge che richiedano conservazioni più lunghe.</li>
                <li><strong>Dati forniti volontariamente:</strong> conservati fino alla revoca del consenso o alla richiesta di cancellazione da parte dell'interessato, salvo obblighi di legge che richiedano conservazioni più lunghe.</li>
                <li><strong>Cookie:</strong> la durata è specificata nella Cookie Policy. Il cookie di consenso ha una durata di 12 mesi.</li>
                <li>Al termine del periodo di conservazione, i dati vengono cancellati o anonimizzati in modo sicuro.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                6. Diritti dell'Interessato
              </h2>
              <p className="text-base leading-7 sm:text-lg mb-4">
                Ai sensi degli artt. 15-22 del Regolamento (UE) 2016/679 (GDPR), l'interessato ha il diritto di:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base leading-7 sm:text-lg ml-4">
                <li><strong>Diritto di accesso</strong> (art. 15 GDPR): ottenere conferma dell'esistenza di dati personali che lo riguardano e accedere a tali dati.</li>
                <li><strong>Diritto di rettifica</strong> (art. 16 GDPR): ottenere la rettifica dei dati personali inesatti o incompleti.</li>
                <li><strong>Diritto alla cancellazione</strong> (art. 17 GDPR): ottenere la cancellazione dei dati personali quando non sono più necessari o quando il consenso è stato revocato.</li>
                <li><strong>Diritto di opposizione</strong> (art. 21 GDPR): opporsi al trattamento dei dati personali per motivi legittimi.</li>
                <li><strong>Diritto di limitazione</strong> (art. 18 GDPR): ottenere la limitazione del trattamento in determinate circostanze.</li>
                <li><strong>Diritto alla portabilità</strong> (art. 20 GDPR): ricevere i dati personali in un formato strutturato e trasmetterli ad altro titolare.</li>
                <li><strong>Diritto di revoca del consenso</strong>: revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento basato sul consenso prima della revoca.</li>
              </ul>
              <p className="text-base leading-7 sm:text-lg mt-4">
                L'esercizio di tali diritti non comporta alcun costo. Le richieste possono essere inviate all'indirizzo email del titolare indicato nella sezione "Contatti".
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                7. Trasferimento dei Dati
              </h2>
              <p className="text-base leading-7 sm:text-lg">
                I dati personali non vengono trasferiti a paesi terzi o organizzazioni internazionali 
                al di fuori dell'Unione Europea. I dati sono trattati e conservati all'interno del territorio 
                dell'Unione Europea. Qualora in futuro si rendesse necessario trasferire dati al di fuori 
                dell'UE, tale trasferimento avverrà nel rispetto delle garanzie previste dal GDPR.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                8. Contatti e Esercizio dei Diritti
              </h2>
              <p className="text-base leading-7 sm:text-lg mb-4">
                Per esercitare i propri diritti o per qualsiasi richiesta relativa al trattamento 
                dei dati personali, è possibile contattare il titolare del trattamento:
              </p>
              <p className="text-base leading-7 sm:text-lg">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@nonsonocosa.it"
                  className="text-[#ff5a43] hover:underline transition"
                >
                  info@nonsonocosa.it
                </a>
              </p>
              <p className="text-base leading-7 sm:text-lg mt-4">
                Il titolare risponderà alle richieste entro un termine massimo di 30 giorni, 
                prorogabile di ulteriori 60 giorni in caso di particolare complessità, previa 
                comunicazione all'interessato.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                9. Diritto di Reclamo
              </h2>
              <p className="text-base leading-7 sm:text-lg">
                L'interessato ha il diritto di proporre reclamo all'Autorità di controllo competente 
                (Garante per la protezione dei dati personali) qualora ritenga che il trattamento 
                dei suoi dati personali violi il GDPR. Il reclamo può essere presentato all'indirizzo:{" "}
                <a
                  href="https://www.garanteprivacy.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff5a43] hover:underline transition"
                >
                  www.garanteprivacy.it
                </a>
                {" "}o tramite posta all'indirizzo: Garante per la protezione dei dati personali, 
                Piazza di Monte Citorio n. 121, 00186 Roma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1c1a] mb-4 mt-8">
                10. Modifiche alla Privacy Policy
              </h2>
              <p className="text-base leading-7 sm:text-lg">
                Il titolare si riserva il diritto di modificare questa Privacy Policy in qualsiasi momento 
                per adeguarla a eventuali modifiche normative o organizzative. Le modifiche sostanziali 
                saranno comunicate agli interessati, quando possibile, tramite email o mediante avviso 
                sul sito web. Le modifiche saranno pubblicate su questa pagina con la data di aggiornamento.
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
