# Parent Reports & Dashboard Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Weekly/monthly email reports for parents + separate parent dashboard app, with message limits per plan tier.

**Architecture:**
- Signup form extended with parent email/phone as step 1
- `sibl_report.py` — new script: queries SQLite, generates HTML email, sends via Resend API
- Cron job sends weekly reports every Monday 8am GMT+7
- `sibl_parent_dashboard.py` — separate Flask app on port 8430, parent-facing stats view
- Message counting in existing `conversations` table, enforced by `sibl_guard.py`

**Tech Stack:** Python 3.11, SQLite, Resend REST API, Jinja2 (HTML email templates), Flask (dashboard)

**Pricing tiers:**
- Free (0đ): 50 messages/week, weekly email report
- Pro (99k VND): unlimited messages, weekly + monthly report, dashboard access

---

## Phase 1: Signup Form — Parent Account Step

### Task 1: Add parent fields to signup form translations (vi/en)

**Objective:** Add i18n keys for parent email/phone step

**Files:**
- Modify: `src/i18n/translations.ts`

**Step 1:** Add `step0` object (parent account) to both `vi.signup` and `en.signup` in translations.ts. Fields:
- `title` / `subtitle`
- `email` label + placeholder
- `phone` label + placeholder
- `atLeastOne` validation message
- `invalidEmail` validation message

**Step 2:** Renumber existing `step1` → `step2`, `step2` → `step3`, `step3` → `step4`, `step4` → `step5` in both locales

**Step 3:** Update `totalSteps` reference in stepIndicator translations

**Step 4:** Verify: `cd /home/nd/.openclaw/workspace/Sibl && npx astro check`

---

### Task 2: Add parent account step to SignupForm.tsx

**Objective:** New step 0 (parent email/phone) before kid profile

**Files:**
- Modify: `src/components/SignupForm.tsx`

**Step 1:** Extend `FormData` interface:
```typescript
interface FormData {
  parentEmail: string;
  parentPhone: string;
  kidName: string;
  kidAge: string;
  kidGrade: string;
  agentVibe: string;
  agentName: string;
  tosAccepted: boolean;
}
```

**Step 2:** Update `initialForm` with empty parentEmail/parentPhone

**Step 3:** Update `totalSteps` from 4 to 5

**Step 4:** Add step 0 validation to `canProceed()`:
```typescript
case 0: {
  const hasOne = form.parentEmail.trim() !== '' || form.parentPhone.trim() !== '';
  const emailValid = form.parentEmail.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.parentEmail.trim());
  return hasOne && emailValid;
}
```

**Step 5:** Shift existing step cases: 1→2, 2→3, 3→4, 4→5

**Step 6:** Add step 0 JSX block with email + phone inputs, validation error display

**Step 7:** Update `handleSubmit` to include parentEmail/parentPhone in console.log payload

**Step 8:** Verify: deploy to sibl.pages.dev, test full 5-step flow in browser

---

## Phase 2: Message Limits

### Task 3: Add weekly message counter to sibl_guard.py

**Objective:** Track and enforce 50 msgs/week (free) vs unlimited (pro)

**Files:**
- Modify: `scripts/sibl_guard.py`
- Modify: `scripts/sibl_review.py` (DB schema migration)

**Step 1:** Add `parents` table to `sibl_review.py` init_db():
```sql
CREATE TABLE IF NOT EXISTS parents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    phone TEXT,
    plan TEXT DEFAULT 'free',  -- 'free' or 'pro'
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_parents_email ON parents(email);
CREATE INDEX IF NOT EXISTS idx_parents_phone ON parents(phone);
```

**Step 2:** Add `agents` table linking parents to kid agents:
```sql
CREATE TABLE IF NOT EXISTS agents (
    id TEXT PRIMARY KEY,  -- OpenClaw agent_id
    parent_id INTEGER REFERENCES parents(id),
    kid_name TEXT,
    kid_age INTEGER,
    kid_grade TEXT,
    agent_name TEXT,
    agent_vibe TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);
```

**Step 3:** Add `weekly_usage` table for counting:
```sql
CREATE TABLE IF NOT EXISTS weekly_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_id TEXT NOT NULL,
    week_start TEXT NOT NULL,  -- Monday date YYYY-MM-DD
    message_count INTEGER DEFAULT 0,
    UNIQUE(agent_id, week_start)
);
```

**Step 4:** Add function `check_message_limit(agent_id: str) -> dict` to sibl_guard.py:
```python
def check_message_limit(agent_id: str) -> dict:
    """Returns {allowed: bool, used: int, limit: int|None, plan: str}"""
    # Look up agent → parent → plan
    # Count messages this week
    # Free: 50/week, Pro: None (unlimited)
    # Return dict with status
```

**Step 5:** Add `OUT_LIMIT` flag code for when limit is reached

**Step 6:** Integrate into `check_input()` — if limit reached, block with friendly message:
- vi: "Minh hết quota tuần này rồi! Thứ 2 tuần sau mình lại học tiếp nha 😊"
- en: "You've used all your messages for this week! Let's continue next Monday 😊"

**Step 7:** Add test cases for limit checking (under limit, at limit, over limit, pro unlimited)

**Step 8:** Run tests: `python sibl_guard.py --test`

---

## Phase 3: Email Reports (Resend)

### Task 4: Set up Resend account and API key

**Objective:** Get Resend API key configured for Sibl

**Step 1:** Create Resend account at resend.com/signup (Andy does this — needs email verification)

**Step 2:** Add API key to Hermes secrets:
```bash
echo "re_xxxxx" > ~/.hermes/secrets/resend_api_key.txt
```

**Step 3:** Add domain (sibl.pages.dev or custom domain when available)

**Step 4:** Verify domain DNS records in Resend dashboard

---

### Task 5: Create email report generator (sibl_report.py)

**Objective:** New script that queries DB, generates HTML email, sends via Resend

**Files:**
- Create: `scripts/sibl_report.py`
- Create: `scripts/templates/weekly-report-vi.html`
- Create: `scripts/templates/weekly-report-en.html`

**Step 1:** Create `sibl_report.py` with CLI:
```bash
python sibl_report.py send-weekly [--dry-run] [--parent <id>]
python sibl_report.py send-monthly [--dry-run] [--parent <id>]
python sibl_report.py preview <parent_id>  # prints HTML to stdout
```

**Step 2:** Implement `generate_weekly_report(parent_id, week_start) -> dict`:
```python
# Queries:
# - Total messages this week
# - Messages per day (Mon-Sun bar chart in email)
# - Top 3 subjects (keyword extraction from questions)
# - Average quality score
# - Flagged conversations (count + summaries)
# - Fun highlight (most asked topic, longest conversation, etc.)
# - Usage vs limit (e.g. "32/50 messages used")
# - Token usage estimate
```

**Step 3:** Create Jinja2 HTML email template (`weekly-report-vi.html`):
- Clean, kid-friendly design (matches Sibl brand colors)
- Sections: overview stats, subjects chart, quality score, flagged items, fun highlight
- Responsive (works in Gmail, Outlook)
- Plain text fallback
- Vietnamese + English variants

**Step 4:** Implement `send_email(to_email, subject, html_body, text_body) -> dict`:
```python
# Uses Resend REST API
# POST https://api.resend.com/emails
# Headers: Authorization: Bearer <key>
# Body: { from: "Sibl <reports@sibl.pages.dev>", to: [...], subject, html, text }
```

**Step 5:** Implement `send_weekly_reports(dry_run=False)`:
- Query all parents with plan=free or plan=pro
- For each parent, get their agents
- Generate report per agent
- Send email (or print if dry_run)
- Log send status to DB

**Step 6:** Test with dry run against existing data:
```bash
python sibl_report.py preview 1  # preview for first parent
python sibl_report.py send-weekly --dry-run
```

---

### Task 6: Schedule weekly report cron job

**Objective:** Auto-send reports every Monday 8am GMT+7

**Step 1:** Create cron job via Hermes:
```
Schedule: 0 1 * * 1  (8am GMT+7 = 1am UTC on Monday)
Prompt: "Run the Sibl weekly email report. Execute: python3 ~/.hermes/skills/openclaw-imports/sibl-moderation/scripts/sibl_report.py send-weekly --dry-run=False. If any errors, report them."
```

**Step 2:** Test cron trigger manually

**Step 3:** Verify email arrives in test inbox

---

## Phase 4: Parent Dashboard

### Task 7: Build parent dashboard app (sibl_parent_dashboard.py)

**Objective:** Separate Flask app on port 8430 with parent-facing stats

**Files:**
- Create: `scripts/sibl_parent_dashboard.py`

**Step 1:** Create Flask app with routes:
```
GET /                    → Login page (email or phone + PIN)
GET /dashboard           → Main dashboard (after auth)
GET /api/stats/weekly    → JSON: weekly stats
GET /api/stats/monthly   → JSON: monthly stats
GET /api/conversations   → JSON: recent conversations (paginated)
GET /api/usage           → JSON: message usage vs limit
```

**Step 2:** Auth — simple email/phone + 4-digit PIN (set during signup, stored in `parents` table hashed):
```sql
ALTER TABLE parents ADD COLUMN pin_hash TEXT;
```

**Step 3:** Dashboard page — single-page HTML (inline CSS, no build step):
- **Overview card:** Messages this week, quality score, plan badge
- **Activity chart:** Messages per day (last 7 days), CSS bar chart
- **Top subjects:** Word cloud or list of most discussed topics
- **Recent conversations:** Last 10 Q&A pairs (scrollable)
- **Flagged items:** Any conversations flagged by AI review (with severity)
- **Usage meter:** Visual progress bar (32/50 messages, changes color near limit)
- **Plan upgrade CTA:** For free users nearing limits

**Step 4:** Pro-only features behind plan check:
- Monthly report (additional to weekly)
- Full conversation history (not just last 10)
- Export to CSV
- Detailed quality breakdown per dimension

**Step 5:** Dark theme to match moderation dashboard aesthetic

**Step 6:** Test locally:
```bash
python sibl_parent_dashboard.py serve --port 8430
```

**Step 7:** Verify in browser at localhost:8430

---

### Task 8: Dashboard deployment (Tailscale)

**Objective:** Expose dashboard securely for parent access

**Step 1:** If Tailscale is running, dashboard is already accessible via Tailscale IP
**Step 2:** Otherwise, document how to expose via Cloudflare Tunnel or similar
**Step 3:** Add PIN setup to signup form flow (or first dashboard login)

---

## Phase 5: Integration

### Task 9: Wire signup form to backend

**Objective:** Signup form actually creates parent + agent records in DB

**Files:**
- Modify: `scripts/sibl_review.py` (add API endpoints)
- Modify: `src/components/SignupForm.tsx` (point handleSubmit to real endpoint)

**Step 1:** Add REST endpoints to sibl_parent_dashboard.py (or a separate `sibl_api.py`):
```
POST /api/signup  → Create parent + agent records, return agent_id
```

**Step 2:** Deploy API endpoint (Cloudflare Worker or separate server)

**Step 3:** Update SignupForm.tsx handleSubmit to POST to real endpoint

**Step 4:** Test end-to-end: signup → DB record → report generation

---

## Summary

| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| 1. Signup Form | 2 | 30 min |
| 2. Message Limits | 1 | 30 min |
| 3. Email Reports | 3 | 2 hrs |
| 4. Parent Dashboard | 2 | 2 hrs |
| 5. Integration | 1 | 30 min |
| **Total** | **9 tasks** | **~5.5 hrs** |

**Key decisions baked in:**
- Resend free tier (3k emails/mo) — covers 750 kids at 1 email/week
- 50 msgs/week free limit, unlimited pro
- Weekly email every Monday 8am GMT+7
- Dashboard on port 8430, auth via email/phone + PIN
- DB tables: `parents`, `agents`, `weekly_usage` added to existing SQLite
- Pro dashboard gets extra features (full history, export, detailed quality)
