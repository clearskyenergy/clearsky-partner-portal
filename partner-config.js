// ══════════════════════════════════════════════════════════════════
// CLEARSKY PARTNER PORTAL CONFIG
// This file belongs in its OWN repository / Vercel deployment —
// SEPARATE from your internal ClearSky portal repo. Deploy this file at
// the ROOT of that separate repo (alongside index.html, sales-proposal.html,
// ClearSky_Partner_Referral_Intake.html).
//
// Recommended: deploy this repo to its own subdomain, e.g.
// partner.csebuilders.com, as a distinct Vercel project from your internal
// clearsky-portal repo. This means a partner rep's link/session has NO
// path to your internal tools (SiteMap Designer, Permit Creator, projects,
// pricing) even by guessing URLs — those files simply don't exist on this
// deployment.
// ══════════════════════════════════════════════════════════════════
//
// SETUP STEPS:
//
// 1. FIREBASE PROJECT
//    You can reuse your EXISTING ClearSky Firebase project (same one
//    config.js already points to) — just fill in the same values below.
//    Using the same project is fine because the partner allowlist check
//    happens in a SEPARATE Firestore collection ("partnerAllowlist") that
//    your internal portal never touches, and Firestore security rules
//    (see step 3) keep partner accounts from reading anything else.
//
// 2. ENABLE GOOGLE SIGN-IN FOR ANY EMAIL (not just @clearsky-usa.com)
//    In the Firebase Console > Authentication > Sign-in method > Google,
//    make sure it's enabled. Unlike your internal portal (which restricts
//    sign-in to @clearsky-usa.com via the `hd` parameter), this partner
//    auth gate does NOT restrict by domain — any Google account can sign
//    in, but only emails listed in the partnerAllowlist collection below
//    are actually granted access. This lets partners use their own
//    company's Google Workspace or personal Gmail.
//
// 3. ADD APPROVED PARTNER EMAILS (Firestore)
//    Go to Firebase Console > Firestore Database > create (if needed) a
//    collection called "partnerAllowlist". Add one document PER approved
//    partner rep, where the DOCUMENT ID is their lowercase email address:
//
//      Collection: partnerAllowlist
//      Document ID: jordan@sunrisesolar.com
//      Fields:
//        active: true
//        partnerAccount: "Sunrise Solar Partners"
//        repName: "Jordan Lee"
//        addedDate: (any string/timestamp, just for your records)
//
//    To REVOKE access without deleting the record, set active: false.
//    To add a new partner rep, just add a new document the same way —
//    NO CODE CHANGES OR REDEPLOY NEEDED, takes effect immediately.
//
// 4. FIRESTORE SECURITY RULES (recommended, do this before going live)
//    Add a rule so partner accounts can ONLY read their own allowlist
//    entry (to verify access) and write to a partner-submissions
//    collection — NOT read any of your internal "projects" collection
//    or anything else. Example rule snippet to add in Firebase Console >
//    Firestore Database > Rules:
//
//      match /partnerAllowlist/{email} {
//        allow read: if request.auth != null && request.auth.token.email == email;
//        allow write: if false; // only editable by you, via the Firebase Console directly
//      }
//      match /partnerSubmissions/{doc} {
//        allow read, write: if request.auth != null
//          && exists(/databases/$(database)/documents/partnerAllowlist/$(request.auth.token.email))
//          && get(/databases/$(database)/documents/partnerAllowlist/$(request.auth.token.email)).data.active == true;
//      }
//
//    This keeps the boundary enforced server-side too, not just by hiding
//    UI — even if someone inspects the page source or calls Firestore
//    directly, they cannot read projects/permits/pricing data, only their
//    own allowlist check and (if you wire it up later) their own
//    submissions.
//
// ══════════════════════════════════════════════════════════════════

window.CLEARSKY_PARTNER_CONFIG = {
  firebase: {
    apiKey: "AIzaSyABoM1lgOYUnd5ZadaoTMhYmA9cHa8Tyo0",
    authDomain: "clearsky-portal.firebaseapp.com",
    projectId: "clearsky-portal",
    storageBucket: "clearsky-portal.firebasestorage.app",
    messagingSenderId: "742134484347",
    appId: "1:742134484347:web:ab0f95fd221536158481de"
  }
};
