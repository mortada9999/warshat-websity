'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';

/* ──────────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────────── */

export interface SessionEntry {
  date: string;
  type: 'session' | 'reward5' | 'reward10';
  note?: string;
  branch?: 'Zayouna' | 'Al-Yarmouk';
}

export interface LoyaltyMember {
  id: string;
  name: string;
  code: string;            // Unique code like WF-7X3K
  sessions: number;        // Total sessions in current cycle
  cycle: number;           // Current cycle (1, 2, 3...)
  reward5Claimed: boolean; // Has the 50% discount been claimed this cycle?
  reward10Claimed: boolean;// Has the free workshop been claimed this cycle?
  history: SessionEntry[]; // Log of all operations
  createdAt: string;
}

/* ──────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────── */

export const LOYALTY_CONFIG = {
  discountThreshold: 5,
  freeThreshold: 10,
};

const STORAGE_KEY = 'warshat_loyalty_members_v2';

/** Generate a short unique member code like WF-7X3K */
function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I/O/0/1 to avoid confusion
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `WF-${code}`;
}

/** Format current date in Arabic-friendly format */
function nowDate(): string {
  return new Date().toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ──────────────────────────────────────────────────────────────
   Demo member (for profile preview before real auth)
   ────────────────────────────────────────────────────────────── */

const createDefaultMember = (name: string, email: string): LoyaltyMember => ({
  id: email, // Use email as unique ID for now
  name: name,
  code: 'WF-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
  sessions: 0,
  cycle: 1,
  reward5Claimed: false,
  reward10Claimed: false,
  history: [],
  createdAt: nowDate(),
});

/* ──────────────────────────────────────────────────────────────
   Context
   ────────────────────────────────────────────────────────────── */

interface LoyaltyContextType {
  /** All registered members */
  members: LoyaltyMember[];
  /** The current demo/profile member */
  currentMember: LoyaltyMember;
  /** Find member by code */
  findByCode: (code: string) => LoyaltyMember | undefined;
  /** Create a new member */
  addMember: (name: string) => LoyaltyMember;
  /** Add a session to a member */
  addSession: (memberId: string, note?: string) => void;
  /** Claim the 5-session reward (50% discount) */
  claimReward5: (memberId: string) => void;
  /** Claim the 10-session reward (free workshop) — resets cycle */
  claimReward10: (memberId: string) => void;
}

const LoyaltyContext = createContext<LoyaltyContextType>({
  members: [],
  currentMember: createDefaultMember('زائر', 'guest'),
  findByCode: () => undefined,
  addMember: () => createDefaultMember('زائر', 'guest'),
  addSession: () => {},
  claimReward5: () => {},
  claimReward10: () => {},
});

/* ──────────────────────────────────────────────────────────────
   Provider
   ────────────────────────────────────────────────────────────── */

export function LoyaltyProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [members, setMembers] = useState<LoyaltyMember[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as LoyaltyMember[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMembers(parsed);
        }
      }
    } catch {
      // corrupt data — use defaults
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    }
  }, [members, hydrated]);

  const findByCode = useCallback(
    (code: string) => members.find((m) => m.code.toUpperCase() === code.toUpperCase()),
    [members],
  );

  const addMember = useCallback((name: string): LoyaltyMember => {
    let code = generateCode();
    // Ensure uniqueness
    const existing = new Set(members.map((m) => m.code));
    while (existing.has(code)) code = generateCode();

    const member: LoyaltyMember = {
      id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      name,
      code,
      sessions: 0,
      cycle: 1,
      reward5Claimed: false,
      reward10Claimed: false,
      history: [],
      createdAt: nowDate(),
    };
    setMembers((prev) => [...prev, member]);
    return member;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members]);

  const addSession = useCallback((memberId: string, note?: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== memberId) return m;
        return {
          ...m,
          sessions: m.sessions + 1,
          history: [
            { date: nowDate(), type: 'session' as const, note: note || 'جلسة جديدة' },
            ...m.history,
          ],
        };
      }),
    );
  }, []);

  const claimReward5 = useCallback((memberId: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== memberId || m.sessions < 5 || m.reward5Claimed) return m;
        return {
          ...m,
          reward5Claimed: true,
          history: [
            { date: nowDate(), type: 'reward5' as const, note: 'تم صرف خصم ٥٠٪' },
            ...m.history,
          ],
        };
      }),
    );
  }, []);

  const claimReward10 = useCallback((memberId: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== memberId || m.sessions < 10 || m.reward10Claimed) return m;
        // Reset cycle — start fresh
        return {
          ...m,
          sessions: 0,
          cycle: m.cycle + 1,
          reward5Claimed: false,
          reward10Claimed: false,
          history: [
            {
              date: nowDate(),
              type: 'reward10' as const,
              note: `تم صرف ورشة مجانية — انتهاء الدورة ${m.cycle}`,
            },
            ...m.history,
          ],
        };
      }),
    );
  }, []);

  // Current member dynamically derived from session
  const currentMember = useMemo(() => {
    if (!session?.user) return createDefaultMember('زائر', 'guest');
    
    const email = session.user.email || 'guest';
    const name = session.user.name || 'مستخدم جديد';
    
    // Find if member exists in state
    let member = members.find(m => m.id === email);
    
    if (!member) {
      member = createDefaultMember(name, email);
    }
    return member;
  }, [session, members]);

  // Auto-register session users if they don't exist
  useEffect(() => {
    if (session?.user?.email) {
      const email = session.user.email;
      const exists = members.some(m => m.id === email);
      if (!exists && hydrated) {
        setMembers(prev => [...prev, createDefaultMember(session.user?.name || 'مستخدم', email)]);
      }
    }
  }, [session, members, hydrated]);

  return (
    <LoyaltyContext.Provider
      value={{
        members,
        currentMember,
        findByCode,
        addMember,
        addSession,
        claimReward5,
        claimReward10,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
}

export function useLoyalty() {
  return useContext(LoyaltyContext);
}
