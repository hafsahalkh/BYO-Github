# Project Summary

## Product Direction
- A responsive, patient-facing public website for a local clinic/wellness practice.
- It helps prospective patients and caregivers understand care offerings. Online request collection is disabled by explicit authorization pending verified BAA coverage for the identified care-request data flow; no agreement evidence is established.

## Locked Scope
- The product is a public information and request site, not a patient portal, clinical system, or real-time scheduling product.
- The originally implemented no-account request flow is now disabled: `/request` shows an honest unavailable state with no data-entry controls or submit SDK call; `/request/received` always redirects there, never confirming success.
- No third-party integrations, staff/admin screens, provider directory, payments, messaging, sensitive intake, or protected areas are in the initial scope.
- The first build is landing-page-led: home, services/care page, general appointment-request form, and confirmation, responsive across phone, tablet, and desktop.

## Authentication Scaffold
- Existing authentication now uses same-origin server-set Secure HttpOnly cookies: preview proxies `/api/auth` to Convex; static hosting serves auth on the app origin. Do not restore a browser-storage cookie bridge or persistent session credential cache.
- Legacy credential-storage cleanup runs before client initialization. The session invalidation migration executed with zero legacy sessions remaining. Frozen HIPAA-AC-012 issue 33458d52-6d8c-4fde-8516-c2c5106c0e9f was verified fixed by targeted scan e0595b49-ac0a-4900-a487-c9af9e9735d3; this is not an overall compliance determination.
- Public home and services remain implemented. The existing request route is unavailable and the receipt route redirects to it. No auth changes or accounts were needed.

## Content Assumptions
- The practice will provide approved care descriptions, service details, visitor guidance, contact/location details, and request follow-up expectations before launch.
- Neutral preview placeholders must be clearly identified; do not invent actual clinicians, addresses, testimonials, availability, or outcomes, or make placeholder contact details actionable.

## Visual and Interaction Direction
- Grounded Welcome was approved and implemented: warm paper, deep plum, locally hosted Source Sans 3, left-aligned typography-led composition, open service rows, and minimal functional motion. No photography, emblems, or card grids.
- The latest approved preference is no favicon: remove the PNG asset and HTML icon reference without replacement. Preserve logo.svg and use the Harbor Wellness working practice name as a simple text wordmark.
- Public responsive top navigation and inline mobile menu are preserved. The unavailable request message reuses existing shell/styles; information-page copy no longer claims requests are being saved.

## Request Persistence and Remaining Work
- `contactRequests.submit` is a zero-argument rejecting endpoint: it accepts no former PHI fields, returns no success, and makes no database or audit writes. `contact_requests` (confirmed care-linked PHI inventory), existing records, schema, and prior audit history are preserved, not inspected or deleted. No public read/list endpoints, audit viewer, new audit metadata, or audit abstractions were added.
- Backend disabling was synced and safely checked with empty and non-personal extra-field arguments, both rejected. Updated frontend assets still require publishing to replace older deployed forms; blocking server acceptance alone cannot stop an old frontend transmitting a payload.
- Backend sync, existing frontend lint/typecheck, explicit Convex typecheck, and production Vite build passed. No browser testing setup was added and no browser pass is claimed.
- Exact HIPAA-UI-009 issue 5b79150a-67cb-4e65-9425-6b4718c9b236 was verified fixed and resolved by completed targeted scan 71e90475-2cdc-47f1-8adb-5b680ec8f6a1 after collection disabling. No other issue was scanned or resolved; this is not an overall compliance determination.
- Staff inbox/handling, notifications, booking, and integrations are not built. Decide operational follow-up separately before live use. Next public slice is practice-approved care approach/new-visitor content and replacement of preview services/location/contact/hours. Preview metadata uses noindex until launch readiness.
