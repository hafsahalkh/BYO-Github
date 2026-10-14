# Harbor Wellness Practice - Public Patient Information and Appointment Request Site

## Overall Vision
Harbor Wellness Practice is a responsive public website for prospective patients and supportive caregivers who need to understand a local wellness practice, decide whether its services fit their needs, and send a general request for an appointment. The site delivers a clear path from learning about care to submitting a minimal, non-clinical request; it is not a patient portal, clinical system, or real-time booking product.

## Personas
- **Prospective patient**: A person evaluating the practice who needs a quick, trustworthy overview of services, practical visit information, and a straightforward way to ask to be contacted about an appointment.
- **Caregiver or family member**: A person researching care on someone else's behalf who needs the same public information, clear contact details, and an uncomplicated request path.

## Current Authorized Override
- Online request collection is disabled at your explicit request pending verified BAA coverage for the identified care-linked request flow (HIPAA-UI-009 issue 5b79150a-67cb-4e65-9425-6b4718c9b236). No agreement evidence is asserted.
- The original request workflow below is historical/intended scope, not currently available: `/request` has no form or SDK transmission; `/request/received` redirects to the unavailable state. Backend submission rejects all requests and accepts no personal-data arguments. Existing records/schema and audit history remain intact.

## User Flows
- **Explore care and decide to reach out**: A visitor arrives from a search result, referral, or shared link on the public home page; they review the practice overview, services, care approach, and practical visit information; they choose the appointment-request call to action when the practice appears appropriate.
- **Submit a general appointment request**: From the home page, services page, or contact prompt, a visitor opens the appointment-request form; they provide only basic contact details, a preferred contact method, and a broad service-interest selection; they submit and receive an on-site confirmation that the practice will follow up. The request is not a confirmed appointment and collects no medical history, symptoms, or other sensitive intake.
- **Find practical details on a phone**: A visitor uses the compact public navigation on a small screen to reach services, frequently asked questions, location/contact details, and the request form; readable content, usable controls, and the same primary action remain available without horizontal scrolling.

## First Build Slice (Build Now)
### Goal
Prove the public front door for prospective patients: a landing-page-led, responsive experience that explains the practice and carries a visitor into a simple general appointment request without accounts, sensitive questions, or third-party services.

### Roles in First Build
- **Prospective patient or caregiver** — the single public role using the landing page and request path.

### Screens in First Build (typically 3-4, landing page is non-negotiable)
1. **Public landing/home page** — the public front door, introducing the practice, care focus, service highlights, practical trust-building information, and the primary appointment-request call to action.
2. **Services and care page** — a focused public explanation of the practice's offerings, who each offering is for, and a route back to the request action.
3. **General appointment-request form** — a no-account form limited to name, preferred contact details, preferred contact method, and broad service interest; it intentionally excludes symptoms, medical history, insurance, and detailed reasons for care.
4. **Request-received confirmation** — a real completion state that confirms receipt and explains that the practice will contact the visitor; it does not represent a booked time or create an account.

### First Build Rules
- The landing page is the highest-priority screen and establishes the reusable public-site system for the rest of the build.
- The build serves one public role only; there are no patient, provider, administrator, or staff portals.
- The request form is the natural continuation of the landing-page call to action. It requires no sign-up, authentication, payment, calendar, email, SMS, or other third-party integration.
- The request flow ends at the real on-site confirmation state, not a mock scheduling or checkout experience.
- Responsive behavior is required across phone, tablet, and desktop layouts, with accessible navigation, keyboard-operable controls, clear form validation, and readable content at each size.
- No admin back office, patient records, sensitive intake, appointment availability, reporting, profile/settings screens, or operational automation belong in this slice.
- Target time: a focused engineer-day, with most attention on the landing page and the remaining screens as narrow, real follow-ons.

## MVP Scope (P0)
The full coherent public marketing site is broader than the first proof slice, but it remains a no-account, no-integration product that supports only public education and a general request to be contacted.
- **Public information architecture**: Home, practice/care approach, services, new-visitor expectations, frequently asked questions, and contact/location details give visitors enough context to decide whether to reach out.
- **Responsive, accessible public experience**: All public pages and navigation work coherently on phone, tablet, and desktop; forms provide clear labels, validation, error recovery, and confirmation.
- **General appointment-request workflow**: Visitors can submit a minimal contact request with name, contact details, preferred contact method, and broad service interest, then see an explicit request-received outcome. This is a request for follow-up, not a time-slot booking, clinical intake, or confirmed appointment.
- **Content assumptions**: The practice supplies approved plain-language descriptions of its care focus, service offerings, practical visit guidance, location/contact details, and request-follow-up expectation. Until supplied, neutral content placeholders are clearly identified for replacement before launch.
- **No protected access is required**: The public site has no user accounts, signed-in areas, account recovery, patient history, or clinical record workflow.
- **No external service is required for the defined MVP**: The product does not depend on calendars, payment processing, transactional messaging, provider directories, clinical systems, or other third-party integrations.

## Build Later
### Soon After MVP
- Practice-managed handling of submitted requests, if the practice later wants the public form to become a fuller internal follow-up workflow.
- Real-time appointment availability and self-service booking only if the practice explicitly chooses to offer it.

### Later Improvements
- Patient accounts or a portal only if ongoing patient self-service becomes a defined product need.
- Provider directory, payments, messaging, or sensitive patient intake only if each is separately scoped as a new workflow.

## Deferred Integrations
- None. No third-party integration is raised or required for the current public-site scope.

## What's Been Implemented
- [x] Scaffold favicon publishing fix: preserved the existing Specode PNG favicon and wordmark; removed the unused generic SVG favicon from source and verified production output excludes it. Typecheck/lint and frontend build pass; release upload success remains unverified. No public website scope was built.
- [x] Targeted scaffold security fix: HIPAA-AC-012 issue 33458d52-6d8c-4fde-8516-c2c5106c0e9f verified fixed; auth uses server-set Secure HttpOnly cookies, same-origin preview/static transport, legacy credential cleanup, and executed session invalidation. No website scope was built in this remediation.
- [x] Public landing/home page: Grounded Welcome warm paper/plum, self-hosted Source Sans 3, open service rows, visitor details, FAQs, and request actions. All unverified practice information is labeled preview content.
- [x] Focused services page and shared responsive public navigation: inline mobile menu, keyboard/Escape support, skip link, visible focus, and footer. Specode PNG favicon and iframe tracker preserved; existing secure auth scaffold unchanged and absent from public navigation.
- [x] Historical general appointment-request and guarded receipt (now superseded by authorized collection disabling): no account, required requestor name and selected email/phone contact only, optional broad preview service interest including undecided. Shared client/server validation, blur/submit errors, first-invalid focus, real pending state and duplicate-press prevention. Contact details stay out of URLs, receipts, logs, and browser persistence; failure retains values in page memory.
- [x] Historical minimal durable Convex request storage and server acknowledgment (new acceptance now disabled), with same-transaction write auditing via the existing helper. `contact_requests` is treated as care-linked sensitive contact data; audit metadata is only `op: create`, containing no contact values. No public read/list endpoints or audit viewer.
- [x] Existing frontend typecheck/lint, explicit Convex typecheck, production Vite build, and sandbox backend sync completed successfully. Responsive and interaction requirements inspected in source; no browser interaction checks or new test harness.
- [x] Narrow TS2307 publishing-build fix: removed the exclusion of genuine Convex-generated API/runtime, server utilities, and data-model declarations so clean source builds have the imported artifacts without relying on sandbox codegen. Existing lint, forced TypeScript build, and production Vite build passed; an isolated source copy reproduced the exact missing-API error without generated files and passed with them restored. UI, real request mutation, backend contracts, secure auth, and favicon removal unchanged. Publish/upload itself remains unverified.
- [x] Authorized collection disabling: removed all request data entry, field state, SDK mutation, and success receipt; existing request screen shows unavailable, receipt route redirects. Zero-argument backend endpoint always rejects without reading/writing data or audit rows. Information pages preserved with honest availability copy; auth/favicon unchanged. Existing frontend lint/typecheck, backend typecheck, Vite build, backend sync, and safe non-personal endpoint rejection checks passed. Frontend publishing remains required to replace older deployed forms.
- [x] Narrow publishing-asset fix: verified the failed `1791836747814-7d9c37e1-fcf5-47e9-bf64-f1933f801af8-image.png` has no project references, removed only that unused public PNG, and confirmed clean production Vite output excludes it. Existing lint/typecheck and frontend production build passed. Pages, styles, fonts, logo, no-favicon state, generated Convex files, auth, and disabled request collection unchanged. Hosting error cause and upload success remain unverified.
- [ ] Remaining full-MVP practice/care approach and new-visitor content, with practice-approved service descriptions and verified location, hours, contact details, and follow-up expectations.

## Next Steps
- Publish the updated frontend through Preview to replace older deployed request forms. Backend acceptance is already disabled; older frontend assets could still transmit details until replaced. Keep request collection disabled unless agreement coverage is verified and re-enablement is separately authorized.
- Review the public information pages and unavailable request state in the preview and replace neutral sample content with practice-approved care, service, visitor, contact, location, and hours information before public launch. Preview metadata currently prevents search indexing.
- Expand approved practice/care approach and new-visitor information into the remaining full-MVP public content without adding accounts or integrations.
- Separately decide how requests will be handled operationally before accepting live patient requests. Current request functionality is disabled, with existing stored data and audit history preserved; there is no staff inbox, email/SMS notification, or guaranteed follow-up. Staff request management, actual booking, accounts, payments, messaging, and sensitive intake remain out of scope.
