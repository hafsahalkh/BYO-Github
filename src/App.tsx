import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SpecodeIframeTracker } from "@/components/layout/SpecodeIframeTracker";

const services = [
  { value: "general", title: "General care", description: "A starting point for learning about the practice’s care and discussing whether it fits your needs.", detail: "For visitors looking for an introduction to the practice. The services offered and who they are suitable for will be confirmed here before launch." },
  { value: "wellbeing", title: "Wellbeing support", description: "Space to explore everyday wellbeing and the support you may be looking for.", detail: "For visitors exploring wellbeing support. Specific approaches, eligibility, and provider information are awaiting practice approval." },
  { value: "ongoing", title: "Ongoing care", description: "Information about follow-up care and staying connected with the practice.", detail: "For visitors interested in continued support. Follow-up options and arrangements will be described once the practice confirms them." },
];

function RequestLink() {
  return <Link className="button" to="/request">Request an appointment <span aria-hidden="true">↗</span></Link>;
}

function SiteShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = { "/": "Welcome", "/services": "Services", "/request": "Request an appointment", "/request/received": "Requests unavailable" };
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
        <Route path="/request" element={<RequestUnavailable />} />
        <Route path="/request/received" element={<Navigate to="/request" replace />} />
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
      <div className="hero-copy"><p className="eyebrow">Welcome to Harbor Wellness</p><h1 tabIndex={-1}>A little clarity.<br />A place to begin.</h1><p className="hero-intro">Explore care, find your bearings, and take a simple first step toward connecting with the practice.</p><div className="actions"><RequestLink /><Link className="text-link" to="/services">Explore our services <span aria-hidden="true">→</span></Link></div><p className="small muted">Online requests are currently unavailable.</p></div>
      <aside className="hero-aside" aria-labelledby="first-step-heading"><p className="eyebrow">Your first step</p><h2 id="first-step-heading">Start by exploring care.</h2><ol className="process-list"><li><span>01</span><p>Explore the care information.</p></li><li><span>02</span><p>Read the visitor information.</p></li><li><span>03</span><p>Check the current request status.</p></li></ol><p className="small muted">Online request collection is disabled. This preview does not collect contact details.</p></aside>
    </section>
    <section className="container section care-overview" aria-labelledby="care-heading"><div className="section-heading"><div><p className="eyebrow">Explore care</p><h2 id="care-heading">Find a starting point that feels right.</h2></div><p className="small muted preview-label">Preview service categories.<br />Not a confirmed list of offerings.</p></div><div className="service-list">{services.map((service, i) => <div className="service-row" key={service.value}><span className="row-number" aria-hidden="true">0{i + 1}</span><h3>{service.title}</h3><p>{service.description}</p><Link to={`/services#${service.value}`} aria-label={`Read about ${service.title.toLowerCase()}`}><span aria-hidden="true">↗</span></Link></div>)}</div><Link className="text-link section-link" to="/services">Read more about care <span aria-hidden="true">→</span></Link></section>
    <section id="visitor-information" tabIndex={-1} className="visitor-band"><div className="container visitor-grid"><div><p className="eyebrow">Before you reach out</p><h2>A few practical things.</h2><p>Whether you’re exploring for yourself or supporting someone else, you can read the care and visitor information here. Online requests are currently unavailable.</p><p className="small muted">Practice-approved visitor guidance will replace this preview before public launch.</p></div><dl className="practical-details"><div><dt>Location</dt><dd>Practice location to be confirmed.</dd></div><div><dt>Hours</dt><dd>Opening hours to be confirmed.</dd></div><div><dt>Contact</dt><dd>Practice phone and email to be confirmed.</dd></div></dl></div></section>
    <section className="container section faq-section" aria-labelledby="faq-heading"><div><p className="eyebrow">Good to know</p><h2 id="faq-heading">A simpler first step.</h2></div><div className="faq-list"><details><summary>Does a request book an appointment?</summary><p>No. Online request collection is currently disabled. This website does not reserve a time or confirm an appointment.</p></details><details><summary>Can I reach out for someone else?</summary><p>You can explore the information for someone else, but this website is not accepting requests or personal details.</p></details><details><summary>What should I share?</summary><p>Nothing at this time. Request collection is disabled, and this website has no request form for personal or medical information.</p></details></div></section>
    <ContactPrompt />
  </>;
}

function ContactPrompt() {
  return <section className="container contact-prompt"><div><p className="eyebrow">When you’re ready</p><h2>Take the next small step.</h2><p>Online requests are currently unavailable. You can still explore the practice information.</p></div><RequestLink /></section>;
}

function Services() {
  return <><section className="container page-opening"><p className="eyebrow">Services & care</p><h1 tabIndex={-1}>Room to explore<br />what you need.</h1><p>Get a sense of the care you may be looking for before taking your next step.</p><p className="preview-notice">Preview content: these are sample care categories, not confirmed services. Practice-approved descriptions and eligibility details are still to come.</p></section><section className="container service-details" aria-label="Preview care categories">{services.map((service, i) => <article id={service.value} tabIndex={-1} className="service-detail" key={service.value}><div><p className="eyebrow">0{i + 1} / Preview category</p><h2>{service.title}</h2></div><div><p>{service.description}</p><p className="muted">{service.detail}</p><Link className="text-link" to="/request">Request contact <span aria-hidden="true">→</span></Link></div></article>)}</section><section className="container undecided"><h2>Not sure where to start?</h2><p>Explore the preview care categories at your own pace. Online requests are currently unavailable, and no contact details are collected.</p></section><ContactPrompt /></>;
}

function RequestUnavailable() {
  return <section className="container request-page"><div className="form-column"><p className="eyebrow">Request status</p><h1 tabIndex={-1}>Online requests are unavailable</h1><div className="preview-notice"><strong>Request collection is disabled</strong><p>This website is not accepting appointment or contact requests. No personal details are collected or sent through this page, and no request or appointment has been created.</p></div><p>You can still explore the care and visitor information.</p><Link className="button" to="/">Back to home <span aria-hidden="true">→</span></Link><p className="small muted urgent-note">Not for urgent or emergency care. If you need immediate help, contact your local emergency services.</p></div></section>;
}

export default function App() {
  return <><SpecodeIframeTracker /><BrowserRouter><SiteShell /></BrowserRouter></>;
}
