# BizOps 360 — Portfolio Showcase

Multi-tenant Business Operations Management SaaS, built as one shared Laravel
backend that drives three separate products through a schema-driven admin
engine — no per-industry frontend forks for the features themselves, just a
backend schema that tells the same React/Next.js UI what to render.

- **Stack:** Laravel 13, PHP 8.3+, PostgreSQL, Redis, Filament 5, Next.js
  (dynamic schema-driven admin engine), Flutter (GetX, planned), Docker /
  Laravel Sail.
- **Architecture:** Modular monolith (`Identity`, `Tenant`, `Organization`,
  `HR`, `Operations`, `CRM`, `Finance`, `Documents`, `Notifications`,
  `Industry/{Travel,RealEstate}`), each request flowing
  `Form Request → DTO → Action → Domain → Eloquent`.
- **Multi-tenancy:** every tenant-owned record carries a `tenant_id`, is
  guarded by a global scope, re-checked inside its Action, and authorized by
  a Policy.

One backend. Three products — **Office Management / Consultancy**,
**Real Estate**, and **Travel Agency** — each is the same core engine with an
industry module switched on.

---

## 1. Core Platform (shared by all three products)

Every tenant, regardless of industry, gets this common engine out of the box:

| Module | What it does |
|---|---|
| **Organization** | Companies, branches, departments, designations, teams, users, roles & permissions (RBAC) — full tenant isolation. |
| **HR** | Employee profiles, attendance (check-in/out, late/early tracking), leave requests & approvals, leave balances, holiday calendar, employee documents. |
| **Operations** | Task management — create, assign, prioritize, track by status and due date; project-linked tasks with comments and activity history. |
| **CRM** | Lead → Contacted → Interested → Follow-up → Negotiation → Converted pipeline; customer & contact management, follow-ups, notes, reminders. |
| **Finance** | Income & expense tracking, invoicing with partial payments/refunds, outstanding-dues reporting, profit & loss, invoice ageing, monthly trends. |
| **Documents** | Centralized per-employee and per-customer document storage with categories, expiry dates, and access control; signed URLs for private downloads. |
| **Reports** | Every module exposes a report, downloadable as PDF or Excel, generated straight from the backend schema. |

### Office Management product — screenshots

The *office-management* product is the common engine applied to a
consultancy/service-business tenant (no extra industry module needed —
Organization + HR + Operations + CRM + Finance covers the whole business).

| # | Screen | File |
|---|---|---|
| 1 | Dashboard — income vs. expense trend, tasks by status | [`screenshots/office-management/01-dashboard.jpg`](screenshots/office-management/01-dashboard.jpg) |
| 2 | HR → Employees | [`screenshots/office-management/02-employees.jpg`](screenshots/office-management/02-employees.jpg) |
| 3 | HR → Attendance (monthly summary + daily log) | [`screenshots/office-management/03-attendance.jpg`](screenshots/office-management/03-attendance.jpg) |
| 4 | HR → Leave requests (approve/reject/cancel) | [`screenshots/office-management/04-leave-requests.jpg`](screenshots/office-management/04-leave-requests.jpg) |
| 5 | Operations → Tasks | [`screenshots/office-management/05-tasks.jpg`](screenshots/office-management/05-tasks.jpg) |
| 6 | CRM → Leads pipeline | [`screenshots/office-management/06-crm-leads.jpg`](screenshots/office-management/06-crm-leads.jpg) |
| 7 | Finance → Invoices | [`screenshots/office-management/07-invoices.jpg`](screenshots/office-management/07-invoices.jpg) |
| 8 | Finance → Reports (P&L, invoice ageing, customer dues) | [`screenshots/office-management/08-finance-reports.jpg`](screenshots/office-management/08-finance-reports.jpg) |
| 9 | Organization → Branches | [`screenshots/office-management/09-organization-branches.jpg`](screenshots/office-management/09-organization-branches.jpg) |
| 10 | Reports catalog — every resource, exportable as PDF/Excel | [`screenshots/office-management/10-reports-catalog.jpg`](screenshots/office-management/10-reports-catalog.jpg) |

---

## 2. Real Estate Module

Switches on for real-estate tenants on top of the core engine — pure backend
schema addition, same frontend.

- **Projects** — land area, developer info, pricing, payment plans, amenities, land-share/land-record tracking, verification workflow.
- **Site visits** — lead scheduling and follow-up.
- **Offers** — negotiated pricing before booking.
- **Bookings** — unit, agreed price, installment plan, confirm/cancel workflow.

| # | Screen | File |
|---|---|---|
| 1 | Real Estate → Projects | [`screenshots/real-estate/01-projects.jpg`](screenshots/real-estate/01-projects.jpg) |
| 2 | Real Estate → Bookings | [`screenshots/real-estate/02-bookings.jpg`](screenshots/real-estate/02-bookings.jpg) |

---

## 3. Travel Agency Module

Switches on for travel-agency tenants, with its own dashboard charts.

- **Travellers** — passenger/passport profile, travel history.
- **Visa applications** — Documents Required → Documents Collected → Submitted → Processing → Approved/Rejected pipeline, per destination and visa type.
- **Bookings** — ticketing, PNR, fare, commission, payment, refund, status.
- **Dashboard** — Visa applications by stage, Bookings by status, and Sales pipeline by stage charts, alongside the shared income/expense and task charts.

| # | Screen | File |
|---|---|---|
| 1 | Travel → Visa applications | [`screenshots/travel-agency/01-visa-applications.jpg`](screenshots/travel-agency/01-visa-applications.jpg) |
| 2 | Dashboard — visa/bookings/pipeline charts | [`screenshots/travel-agency/02-dashboard-charts.jpg`](screenshots/travel-agency/02-dashboard-charts.jpg) |

---

## Engineering highlights worth mentioning on a portfolio

- **One backend, three products, zero duplicated frontend code.** The admin
  UI is a dynamic rendering engine; a tenant's industry (`travel`,
  `real_estate`, `consultancy`) determines which screens the *same* Next.js
  codebase renders, driven entirely by what `GET /api/v1/admin/schema`
  returns.
- **Strict tenant isolation** — tenant scope, policy, and an Action-level
  recheck on every tenant-owned model.
- **Layered architecture** enforced end-to-end: no business logic in
  Filament resources, controllers, or jobs — only in Actions/Domain.
- **Fully typed API contracts** — OpenAPI generated straight from code
  (`dedoc/scramble`), every response going through an API Resource.
