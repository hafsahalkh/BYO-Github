# Frozen security remediation

Scope is immutable: only the issue below. No other checks or product features are included.

- [x] 33458d52-6d8c-4fde-8516-c2c5106c0e9f — HIPAA-AC-012: removed credential persistence/replay and persistent session cache; native server-set Secure HttpOnly cookies via same-origin auth (Vite proxy in preview, Convex static hosting in deployment); legacy localStorage/sessionStorage keys removed before client initialization. Internal session migration executed: cutoff 1791835865616, invalidated 0, remaining 0. Existing frontend and account capabilities preserved; no accounts or roles added.

Native verification: frontend and backend TypeScript checks, lint and Vite build passed. HTTP get-session and sign-out passed through preview proxy and directly on static hosting; cookie responses were Secure/HttpOnly with no bridge header. Static bundle uploaded and verified served. No project automated tests were present; no browser or authenticated sign-in interaction test performed. Final changes inspected for scope.

Targeted HIPAA verification: scan e0595b49-ac0a-4900-a487-c9af9e9735d3 completed; expected issue status resolved, outcome fixed, verifiedByThisScan true. This verifies only the frozen issue, not overall HIPAA compliance.
