import { useEffect, useRef, useState, type FormEvent } from "react";
import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SpecodeIframeTracker } from "@/components/layout/SpecodeIframeTracker";
import { convex, isConvexConfigured } from "@/lib/convex";
import { api } from "../convex/_generated/api";
import { validateRequest, type RequestErrors, type RequestFields, type ContactMethod, type ServiceInterest } from "../convex/lib/requestValidation";

const services = [
  { value: "general", title: "General care", description: "A starting point for learning about the practice’s care and discussing whether it fits your needs.", detail: "For visitors looking for an introduction to the practice. The services offered and who they are suitable for will be confirmed here before launch." },
  { value: "wellbeing", title: "Wellbeing support", description: "Space to explore everyday wellbeing and the support you may be looking for.", detail: "For visitors exploring wellbeing support. Specific approaches, eligibility, and provider information are awaiting practice approval." },
  { value: "ongoing", title: "Ongoing care", description: "Information about follow-up care and staying connected with the practice.", detail: "For visitors interested in continued support. Follow-up options and arrangements will be described once the practice confirms them." },
];

function RequestLink() {
  return <Link className="button" to="/request">Request an appointment <span aria-hidden="true">↗</span></Link>;
}

function SiteShell({ accepted, onAccepted }: { accepted: boolean; onAccepted: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = { "/": "Welcome", "/services": "Services", "/request": "Request an appointment", "/request/received": "Request received" };
    document.title = `${titles[location.pathname] ?? "Page not found"} | Harbor Wellness`;
    const target = location.hash ? document.getElementById(location.hash.slice(1)) : document.querySelector<HTMLElement>("main h1");
    target?.focus({ preventScroll: true });
    if (location.hash) target?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  function closeMenu(returnFocus = false) {
    setMenuOpen(false);
    if (returnFocus) menuButton.current?.focus();
  }
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header container" onKeyDown={(event) => {
      if (event.key === "Escape" && menuOpen) { event.preventDefault(); closeMenu(true); }
    }}>
      <Link className="wordmark" to="/" onClick={() => closeMenu()}>Harbor Wellness<span>Practice website preview</span></Link>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="public-navigation" ref={menuButton} onClick={() => setMenuOpen(!menuOpen)}>Menu <span aria-hidden="true">{menuOpen ? "−" : "+"}</span></button>
      <nav id="public-navigation" aria-label="Main navigation" className={menuOpen ? "public-nav is-open" : "public-nav"}>
        <NavLink to="/services" onClick={() => closeMenu()}>Services</NavLink>
        <Link to="/#visitor-information" onClick={() => closeMenu()}>Visitor information</Link>
        <NavLink to="/request" className="nav-request" onClick={() => closeMenu()}>Request an appointment <span aria-hidden="true">↗</span></NavLink>
      </nav>
    </header>
    <main id="main-content" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/request" element={<RequestForm onAccepted={onAccepted} />} />
        <Route path="/request/received" element={accepted ? <Receipt /> : <Navigate to="/request" replace />} />
        <Route path="*" element={<section className="container page-opening"><p className="eyebrow">Harbor Wellness</p><h1 tabIndex={-1}>Page not found</h1><p>Let’s get you back to a familiar place.</p><Link to="/">Back to home</Link></section>} />
      </Routes>
    </main>
    <footer className="site-footer container">
      <div><Link className="footer-wordmark" to="/">Harbor Wellness</Link><p>A simple place to begin.</p></div>
      <nav aria-label="Footer navigation"><Link to="/services">Services</Link><Link to="/#visitor-information">Visitor information</Link><Link to="/request">Request an appointment</Link></nav>
      <p className="footer-note">Website preview. Care descriptions and practical details await practice approval. Not for urgent or emergency care.</p>
    </footer>
  </>;
}

function Home() {
  return <>
    <section className="container hero">
      <div className="hero-copy"><p className="eyebrow">Welcome to Harbor Wellness</p><h1 tabIndex={-1}>A little clarity.<br />A place to begin.</h1><p className="hero-intro">Explore care, find your bearings, and take a simple first step toward connecting with the practice.</p><div className="actions"><RequestLink /><Link className="text-link" to="/services">Explore our services <span aria-hidden="true">→</span></Link></div><p className="small muted">No account needed. A request, not a booking.</p></div>
      <aside className="hero-aside" aria-labelledby="first-step-heading"><p className="eyebrow">Your first step</p><h2 id="first-step-heading">Start with a request for contact.</h2><ol className="process-list"><li><span>01</span><p>Explore the care information.</p></li><li><span>02</span><p>Share how you’d like to be contacted.</p></li><li><span>03</span><p>Receive an on-site acknowledgment.</p></li></ol><p className="small muted">This preview saves your request. Staff follow-up and notifications are not connected yet.</p></aside>
    </section>
    <section className="container section care-overview" aria-labelledby="care-heading"><div className="section-heading"><div><p className="eyebrow">Explore care</p><h2 id="care-heading">Find a starting point that feels right.</h2></div><p className="small muted preview-label">Preview service categories.<br />Not a confirmed list of offerings.</p></div><div className="service-list">{services.map((service, i) => <div className="service-row" key={service.value}><span className="row-number" aria-hidden="true">0{i + 1}</span><h3>{service.title}</h3><p>{service.description}</p><Link to={`/services#${service.value}`} aria-label={`Read about ${service.title.toLowerCase()}`}><span aria-hidden="true">↗</span></Link></div>)}</div><Link className="text-link section-link" to="/services">Read more about care <span aria-hidden="true">→</span></Link></section>
    <section id="visitor-information" tabIndex={-1} className="visitor-band"><div className="container visitor-grid"><div><p className="eyebrow">Before you reach out</p><h2>A few practical things.</h2><p>Whether you’re exploring for yourself or supporting someone else, the same simple request form is your starting point.</p><p className="small muted">Practice-approved visitor guidance will replace this preview before public launch.</p></div><dl className="practical-details"><div><dt>Location</dt><dd>Practice location to be confirmed.</dd></div><div><dt>Hours</dt><dd>Opening hours to be confirmed.</dd></div><div><dt>Contact</dt><dd>Practice phone and email to be confirmed.</dd></div></dl></div></section>
    <section className="container section faq-section" aria-labelledby="faq-heading"><div><p className="eyebrow">Good to know</p><h2 id="faq-heading">A simpler first step.</h2></div><div className="faq-list"><details><summary>Does a request book an appointment?</summary><p>No. The form saves a request for contact. It does not reserve a time or confirm an appointment.</p></details><details><summary>Can I reach out for someone else?</summary><p>Yes. Please use your own name and contact information. Do not submit another person’s medical or personal details.</p></details><details><summary>What should I share?</summary><p>Only your name, your preferred contact method and its corresponding detail. Service interest is optional. Please leave out medical information.</p></details></div></section>
    <ContactPrompt />
  </>;
}

function ContactPrompt() {
  return <section className="container contact-prompt"><div><p className="eyebrow">When you’re ready</p><h2>Take the next small step.</h2><p>Send a basic request for contact. No paperwork or account to get started.</p></div><RequestLink /></section>;
}

function Services() {
  return <><section className="container page-opening"><p className="eyebrow">Services & care</p><h1 tabIndex={-1}>Room to explore<br />what you need.</h1><p>Get a sense of the care you may be looking for before taking your next step.</p><p className="preview-notice">Preview content: these are sample care categories, not confirmed services. Practice-approved descriptions and eligibility details are still to come.</p></section><section className="container service-details" aria-label="Preview care categories">{services.map((service, i) => <article id={service.value} tabIndex={-1} className="service-detail" key={service.value}><div><p className="eyebrow">0{i + 1} / Preview category</p><h2>{service.title}</h2></div><div><p>{service.description}</p><p className="muted">{service.detail}</p><Link className="text-link" to="/request">Request contact <span aria-hidden="true">→</span></Link></div></article>)}</section><section className="container undecided"><h2>Not sure where to start?</h2><p>You don’t need to choose a service to send a request. Select “Not sure yet” and share only your basic contact details.</p></section><ContactPrompt /></>;
}

function RequestForm({ onAccepted }: { onAccepted: () => void }) {
  const navigate = useNavigate();
  const [fields, setFields] = useState<RequestFields>({ name: "", contactMethod: "email", contactDetail: "", serviceInterest: "undecided" });
  const [errors, setErrors] = useState<RequestErrors>({});
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState("");
  const inFlight = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  function blur(field: keyof RequestFields) {
    const error = validateRequest(fields)[field];
    setErrors((current) => ({ ...current, [field]: error }));
  }
  function selectMethod(method: ContactMethod) {
    if (fields.contactMethod === method) return;
    setFields({ ...fields, contactMethod: method, contactDetail: "" });
    setErrors((current) => ({ ...current, contactDetail: undefined, contactMethod: undefined }));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const nextErrors = validateRequest(fields);
    setErrors(nextErrors);
    setFailure("");
    const firstError = (["name", "contactMethod", "contactDetail", "serviceInterest"] as const).find((field) => nextErrors[field]);
    if (firstError) { form.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus(); return; }
    if (!isConvexConfigured) { setFailure("Requests are currently unavailable. Your details have not been sent. Please try again later."); return; }
    inFlight.current = true;
    setPending(true);
    try {
      const result = await convex.mutation(api.contactRequests.submit, fields);
      if (result.accepted !== true) throw new Error("Request not acknowledged");
      onAccepted();
      navigate("/request/received", { replace: true });
    } catch {
      setFailure("We couldn’t confirm that your request was saved. Your details are still here. Check your connection and try again.");
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }
  const phone = fields.contactMethod === "phone";
  return <section className="container request-page"><div className="form-column"><p className="eyebrow">A simple first step</p><h1 tabIndex={-1}>Request an appointment</h1><p>Tell us how you’d like to be contacted. This is a request for contact, not a confirmed appointment.</p><div className="preview-notice"><strong>Preview request form</strong><p>Requests are saved, but staff handling and email or text notifications are not connected. No response time is promised.</p></div><form ref={form} onSubmit={submit} noValidate aria-busy={pending}>
    <p className="form-guidance" id="request-guidance">Use your own details, including if you’re a caregiver. Please don’t include medical information. All fields are required unless marked optional.</p>
    <fieldset disabled={pending} className="form-fields" aria-describedby="request-guidance">
      <div className="field"><label htmlFor="request-name">Your name</label><input id="request-name" name="name" autoComplete="name" required maxLength={100} value={fields.name} onChange={(e) => setFields({ ...fields, name: e.target.value })} onBlur={() => blur("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <p className="field-error" id="name-error">{errors.name}</p>}</div>
      <fieldset className="contact-choice"><legend>How would you like to be contacted?</legend><div className="radio-options">{(["email", "phone"] as const).map((method) => <label key={method}><input type="radio" name="contactMethod" value={method} checked={fields.contactMethod === method} onChange={() => selectMethod(method)} onBlur={() => blur("contactMethod")} required aria-invalid={!!errors.contactMethod} aria-describedby={errors.contactMethod ? "method-error" : undefined} />{method === "email" ? "Email" : "Phone"}</label>)}</div>{errors.contactMethod && <p className="field-error" id="method-error">{errors.contactMethod}</p>}</fieldset>
      <div className="field"><label htmlFor="contact-detail">{phone ? "Your phone number" : "Your email address"}</label><input key={fields.contactMethod} id="contact-detail" name="contactDetail" type={phone ? "tel" : "email"} autoComplete={phone ? "tel" : "email"} required maxLength={phone ? 40 : 254} value={fields.contactDetail} onChange={(e) => setFields({ ...fields, contactDetail: e.target.value })} onBlur={() => blur("contactDetail")} aria-invalid={!!errors.contactDetail} aria-describedby={`contact-help${errors.contactDetail ? " contact-error" : ""}`} /><p className="field-help" id="contact-help">{phone ? "Include your country code if you’re outside the US." : "Use an address where you can be reached."}</p>{errors.contactDetail && <p className="field-error" id="contact-error">{errors.contactDetail}</p>}</div>
      <div className="field"><label htmlFor="service-interest">Service interest <span className="optional">(optional)</span></label><select id="service-interest" name="serviceInterest" value={fields.serviceInterest} onChange={(e) => setFields({ ...fields, serviceInterest: e.target.value as ServiceInterest })} onBlur={() => blur("serviceInterest")} aria-invalid={!!errors.serviceInterest} aria-describedby={`interest-help${errors.serviceInterest ? " interest-error" : ""}`}><option value="undecided">Not sure yet</option>{services.map((service) => <option value={service.value} key={service.value}>{service.title} (preview)</option>)}</select><p id="interest-help" className="field-help">These sample categories are awaiting practice approval.</p>{errors.serviceInterest && <p id="interest-error" className="field-error">{errors.serviceInterest}</p>}</div>
    </fieldset>
    <div role="alert">{failure && <p className="submit-error">{failure}</p>}</div>
    <button type="submit" className="button submit-button" disabled={pending || !isConvexConfigured}>{pending ? "Sending request…" : "Send request"}<span aria-hidden="true">→</span></button>
    <p role="status" aria-live="polite" className="small submission-status">{pending ? "Sending your request. Please wait for acknowledgment." : !isConvexConfigured ? "Requests are temporarily unavailable. Your details have not been sent." : "Your details are used only for this contact request."}</p>
  </form><p className="small muted urgent-note">Not for urgent or emergency care. If you need immediate help, contact your local emergency services.</p></div></section>;
}

function Receipt() {
  return <section className="container request-page"><div className="form-column receipt"><p className="eyebrow receipt-label">Saved successfully</p><h1 tabIndex={-1}>Request received</h1><p>Your basic contact request has been saved.</p><h2>No appointment has been booked.</h2><p>This is a request for the practice to contact you using your chosen method. It does not reserve a time.</p><div className="preview-notice"><strong>What happens in this preview?</strong><p>Your request is stored, but staff follow-up and notifications are not connected yet. No email or text confirmation has been sent, and no response time is promised.</p></div><Link className="button" to="/">Back to home <span aria-hidden="true">→</span></Link></div></section>;
}

export default function App() {
  // In-memory acknowledgment only. A direct visit or refresh cannot manufacture success.
  const [accepted, setAccepted] = useState(false);
  return <><SpecodeIframeTracker /><BrowserRouter><SiteShell accepted={accepted} onAccepted={() => setAccepted(true)} /></BrowserRouter></>;
}
