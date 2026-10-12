# Project Summary

## Product Direction
- A responsive, patient-facing public website for a local clinic/wellness practice.
- It helps prospective patients and caregivers understand care offerings and submit a general request to be contacted about an appointment.

## Locked Scope
- The product is a public information and request site, not a patient portal, clinical system, or real-time scheduling product.
- The request flow is no-account and limited to basic contact details, preferred contact method, and broad service interest; it excludes medical history, symptoms, insurance, and detailed reasons for care.
- Requests are not confirmed appointments; the visitor receives an on-site receipt that the practice will follow up.
- No third-party integrations, staff/admin screens, provider directory, payments, messaging, sensitive intake, or protected areas are in the initial scope.
- The first build is landing-page-led: home, services/care page, general appointment-request form, and confirmation, responsive across phone, tablet, and desktop.

## Authentication Scaffold
- Existing authentication now uses same-origin server-set Secure HttpOnly cookies: preview proxies `/api/auth` to Convex; static hosting serves auth on the app origin. Do not restore a browser-storage cookie bridge or persistent session credential cache.
- Legacy credential-storage cleanup runs before client initialization. The session invalidation migration executed with zero legacy sessions remaining. Frozen HIPAA-AC-012 issue 33458d52-6d8c-4fde-8516-c2c5106c0e9f was verified fixed by targeted scan e0595b49-ac0a-4900-a487-c9af9e9735d3; this is not an overall compliance determination.
- The frontend remains the scaffold; the public website proof slice is still unbuilt.

## Content Assumptions
- The practice will provide approved care descriptions, service details, visitor guidance, contact/location details, and request follow-up expectations before launch.
- Neutral preview placeholders must be clearly identified; do not invent actual clinicians, addresses, testimonials, availability, or outcomes, or make placeholder contact details actionable.

## Visual and Interaction Direction
- User replied `go` to the offer to choose design defaults; no website references or visual option selections were supplied. Proposed Grounded Welcome direction is awaiting design approval: warm paper, deep plum, Source Sans 3, left-aligned typography-led composition, open service rows, and minimal motion. No new imagery is required.
- Preserve the expressly selected existing Specode PNG favicon; it does not establish Specode as the full practice brand. Use the Harbor Wellness working practice name as a simple text wordmark.
- Public responsive top navigation, inline mobile menu, and a single-column basic request form. Collect requestor name, preferred contact method and its corresponding contact detail, plus optional broad service interest; caregivers provide their own contact details.
- Receipt is shown only after actual durable server acceptance. No fake success, appointment confirmation, or promised response time. Retain form values in page memory on failure, announce states accessibly, and keep contact details out of URLs and persistent browser storage.
