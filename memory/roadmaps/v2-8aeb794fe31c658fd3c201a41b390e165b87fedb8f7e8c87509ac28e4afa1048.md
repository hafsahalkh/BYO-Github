# Harbor Wellness Practice - Public Patient Information and Appointment Request Site

## Overall Vision
Harbor Wellness Practice is a responsive public website for prospective patients and supportive caregivers who need to understand a local wellness practice, decide whether its services fit their needs, and send a general request for an appointment. The site delivers a clear path from learning about care to submitting a minimal, non-clinical request; it is not a patient portal, clinical system, or real-time booking product.

## Personas
- **Prospective patient**: A person evaluating the practice who needs a quick, trustworthy overview of services, practical visit information, and a straightforward way to ask to be contacted about an appointment.
- **Caregiver or family member**: A person researching care on someone else's behalf who needs the same public information, clear contact details, and an uncomplicated request path.

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
- [x] Targeted scaffold security fix: HIPAA-AC-012 issue 33458d52-6d8c-4fde-8516-c2c5106c0e9f verified fixed; auth uses server-set Secure HttpOnly cookies, same-origin preview/static transport, legacy credential cleanup, and executed session invalidation. No website scope was built in this remediation.
- [ ] Public landing/home page
- [ ] Public information pages and responsive navigation
- [ ] General appointment-request and confirmation flow

> Update this section as features are built. Check items off as they become real.

## Next Steps
- Build the landing page, focused services information, and no-account request path as the first public proof slice.
- Expand the approved public content into the complete MVP information architecture and validate it across phone, tablet, and desktop use.
- Confirm whether future operational follow-up should remain outside the site or become a separately scoped request-management workflow.
