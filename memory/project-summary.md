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
