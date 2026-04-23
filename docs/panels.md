# User Panels

HobbyDeals has two protected panels: one for admins/moderators and one for
authenticated users.

---

## Admin panel

**Route**: `/admin`
**Access**: `role: admin | moderator`

### Dashboard

- Deals published per day (30-day chart)
- Active users and new registrations
- Average temperature of active deals
- Pending reports for review

### Moderation queue

- List of deals in `pending` status ordered by date
- Approve → changes status to `active`
- Reject → requires reason, notifies the author, changes to `rejected`
- Deal preview before moderation

### Featured management

- Mark/unmark a deal as `featured`
- Mark as `sponsored` (always visibly labeled in the feed)
- Sponsored deals do not affect temperature or organic ranking

### User management

- User table with search by username or email
- View full profile, deal history, and reputation
- Change role: `user` → `moderator` → `admin`
- Ban with reason (user sees the reason when trying to log in)
- Manual reputation adjustment in exceptional cases

### Verified stores

- Verify a merchant: activates the verified store badge
- Manage affiliate URL template per store
- View deals published for each store

### Report review

- List of pending reports with reported content inline
- Resolve: mark as reviewed and take action (remove, warn, ignore)
- Dismiss: content remains, report is closed

### Category management

- Edit name, icon (emoji), color, and description for each category
- Enable/disable categories without deleting existing deals
- Reorder categories (sort_order)

### Push notifications

- Send message to all users
- Segment by followed categories

---

## User panel

**Route**: `/perfil`
**Access**: authenticated user

### Overview

- Current reputation and relative position
- Published deals (active, pending, expired)
- Latest comments received
- Recent activity (votes cast, comments)

### My deals

- List with visual status: active / pending / expired / rejected
- Edit an active deal (title, description, price, URL)
- View rejection reason if applicable
- Delete own deal

### Saved

- Deals bookmarked as favorites
- Sort by saved date or current temperature
- Quick access to detail

### My alerts

- List of active alerts with keyword, category, and max price
- Create new alert from the panel or from the feed
- Enable/disable without deleting
- Last match history

### Favorite hobbies

- Category selection to personalize the main feed
- Same selector as onboarding, editable at any time

### Edit profile

- Username (unique on the platform)
- Display name and bio
- Avatar: upload image (Supabase Storage) or use generated initials
- Public profile URL: `/u/[username]`

### Notifications

- Enable/disable by type:
  - Price alerts (when an alert matches)
  - Replies to own comments
  - Votes on published deals
  - System announcements
- Channel: in-app / email / push (when available)

### Security

- Change email (requires confirmation)
- Change password
- Active sessions: view connected devices
- Log out from all devices
- Delete account (soft delete with 30-day grace period)
