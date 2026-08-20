'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLoyalty } from '@/lib/loyaltyStore';
import type { LoyaltyMember } from '@/lib/loyaltyStore';
import styles from './page.module.css';

type FilterMode = 'all' | 'reached5' | 'reached10';

export default function StaffRewardsPage() {
  const { members, findByCode, addMember, addSession, claimReward5, claimReward10 } = useLoyalty();
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<LoyaltyMember | null>(null);
  const [newName, setNewName] = useState('');
  const [sessionNote, setSessionNote] = useState('');
  const [filter, setFilter] = useState<FilterMode>('all');
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState('');

  // Check URL params for direct member lookup
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const code = params.get('member');
    if (code) {
      setSearch(code);
      const found = findByCode(code);
      if (found) setSelectedMember(found);
    }
  }, [findByCode]);

  // Keep selected member in sync with store
  React.useEffect(() => {
    if (selectedMember) {
      const updated = members.find((m) => m.id === selectedMember.id);
      if (updated) setSelectedMember(updated);
    }
  }, [members, selectedMember]);

  // Filtered members list
  const filtered = useMemo(() => {
    let list = members;
    if (filter === 'reached5') list = list.filter((m) => m.sessions >= 5 && !m.reward5Claimed);
    if (filter === 'reached10') list = list.filter((m) => m.sessions >= 10 && !m.reward10Claimed);
    return list;
  }, [members, filter]);

  // Actions
  const handleSearch = () => {
    const found = findByCode(search.trim());
    if (found) {
      setSelectedMember(found);
    } else {
      showToast('لم يتم العثور على العضو');
    }
  };

  const handleCreate = () => {
    if (!newName.trim()) return;
    const member = addMember(newName.trim());
    setNewName('');
    setShowCreate(false);
    setSelectedMember(member);
    showToast(`تم إنشاء عضو جديد: ${member.code}`);
  };

  const handleAddSession = () => {
    if (!selectedMember) return;
    addSession(selectedMember.id, sessionNote || undefined);
    setSessionNote('');
    showToast('تم إضافة جلسة ✓');
  };

  const handleClaim5 = () => {
    if (!selectedMember) return;
    claimReward5(selectedMember.id);
    showToast('تم صرف خصم ٥٠٪ ✓');
  };

  const handleClaim10 = () => {
    if (!selectedMember) return;
    claimReward10(selectedMember.id);
    showToast('تم صرف ورشة مجانية — بدأت دورة جديدة! 🎉');
  };

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  return (
    <main className={styles.page}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <Link href="/" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            الرئيسية
          </Link>
          <h1 className={styles.title}>إدارة الهدايا والولاء</h1>
        </div>

        {/* ── Search bar ── */}
        <div className={styles.searchBar}>
          <input
            type="text"
            className={`form-input ${styles.searchInput}`}
            placeholder="ابحث برقم العضوية (مثال: WF-7X3K)"
            value={search}
            onChange={(e) => setSearch(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            بحث
          </button>
          <button
            className="btn btn-accent"
            onClick={() => setShowCreate(!showCreate)}
          >
            + عضو جديد
          </button>
        </div>

        {/* ── Create member form ── */}
        {showCreate && (
          <div className={styles.createForm}>
            <input
              type="text"
              className="form-input"
              placeholder="اسم العضو الجديد"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <button className="btn btn-primary" onClick={handleCreate}>
              إنشاء
            </button>
          </div>
        )}
      </div>

      {/* ── Selected Member Card ── */}
      {selectedMember && (
        <section className={styles.memberCard}>
          <div className={styles.memberHeader}>
            <div className={styles.memberAvatar}>
              {selectedMember.name.charAt(0)}
            </div>
            <div className={styles.memberInfo}>
              <h2 className={styles.memberName}>{selectedMember.name}</h2>
              <p className={styles.memberCode}>{selectedMember.code}</p>
              <p className={styles.memberMeta}>
                الدورة {selectedMember.cycle} · {selectedMember.sessions} جلسات
              </p>
            </div>
          </div>

          {/* Progress bars */}
          <div className={styles.progressBars}>
            <div className={styles.progressItem}>
              <div className={styles.progressHeader}>
                <span>خصم ٥٠٪</span>
                <span dir="ltr">{Math.min(selectedMember.sessions, 5)} / ٥</span>
              </div>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${(Math.min(selectedMember.sessions, 5) / 5) * 100}%`,
                    background: selectedMember.sessions >= 5 ? '#a25f00' : '#597257',
                  }}
                />
              </div>
              {selectedMember.sessions >= 5 && !selectedMember.reward5Claimed && (
                <span className={styles.readyBadge}>جاهز للصرف!</span>
              )}
              {selectedMember.reward5Claimed && (
                <span className={styles.claimedBadge}>✓ تم الصرف</span>
              )}
            </div>

            <div className={styles.progressItem}>
              <div className={styles.progressHeader}>
                <span>ورشة مجانية</span>
                <span dir="ltr">{Math.min(selectedMember.sessions, 10)} / ١٠</span>
              </div>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${(Math.min(selectedMember.sessions, 10) / 10) * 100}%`,
                    background: selectedMember.sessions >= 10 ? '#C08A2D' : '#597257',
                  }}
                />
              </div>
              {selectedMember.sessions >= 10 && !selectedMember.reward10Claimed && (
                <span className={styles.readyBadge}>جاهز للصرف!</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <div className={styles.addSessionRow}>
              <input
                type="text"
                className={`form-input ${styles.sessionInput}`}
                placeholder="اسم النشاط (اختياري)"
                value={sessionNote}
                onChange={(e) => setSessionNote(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleAddSession}>
                ➕ إضافة جلسة
              </button>
            </div>
            <div className={styles.rewardActions}>
              <button
                className="btn btn-accent"
                disabled={selectedMember.sessions < 5 || selectedMember.reward5Claimed}
                onClick={handleClaim5}
              >
                🎁 صرف خصم ٥٠٪
              </button>
              <button
                className="btn btn-accent"
                disabled={selectedMember.sessions < 10 || selectedMember.reward10Claimed}
                onClick={handleClaim10}
              >
                🎉 صرف ورشة مجانية
              </button>
            </div>
          </div>

          {/* History */}
          {selectedMember.history.length > 0 && (
            <div className={styles.history}>
              <h3 className={styles.historyTitle}>السجل</h3>
              <ul className={styles.historyList}>
                {selectedMember.history.map((entry, i) => (
                  <li key={i} className={styles.historyItem}>
                    <span className={styles.historyDot}
                      style={{
                        background:
                          entry.type === 'session' ? '#597257' :
                          entry.type === 'reward5' ? '#a25f00' : '#C08A2D',
                      }}
                    />
                    <span className={styles.historyNote}>{entry.note}</span>
                    <span className={styles.historyDate}>{entry.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            className={styles.closeBtn}
            onClick={() => setSelectedMember(null)}
          >
            إغلاق
          </button>
        </section>
      )}

      {/* ── Members Table ── */}
      <section className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>الأعضاء</h2>
          <div className={styles.filterBtns}>
            <button
              className={`${styles.filterBtn} ${filter === 'all' ? styles.filterActive : ''}`}
              onClick={() => setFilter('all')}
            >
              الكل ({members.length})
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'reached5' ? styles.filterActive : ''}`}
              onClick={() => setFilter('reached5')}
            >
              وصلوا ٥ ⭐
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'reached10' ? styles.filterActive : ''}`}
              onClick={() => setFilter('reached10')}
            >
              وصلوا ١٠ 🎉
            </button>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>الاسم</th>
                <th>الرمز</th>
                <th>الجلسات</th>
                <th>الدورة</th>
                <th>الحالة</th>
                <th>إجراء</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyRow}>لا يوجد أعضاء مطابقين</td>
                </tr>
              ) : (
                filtered.map((m) => (
                  <tr key={m.id}>
                    <td className={styles.nameCell}>{m.name}</td>
                    <td className={styles.codeCell}>{m.code}</td>
                    <td>{m.sessions}</td>
                    <td>{m.cycle}</td>
                    <td>
                      {m.sessions >= 10 && !m.reward10Claimed ? (
                        <span className="badge badge-orange">ورشة مجانية!</span>
                      ) : m.sessions >= 5 && !m.reward5Claimed ? (
                        <span className="badge badge-beige">خصم ٥٠٪</span>
                      ) : (
                        <span className="badge badge-green">نشط</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setSelectedMember(m)}
                      >
                        عرض
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Toast ── */}
      {toast && (
        <div className={styles.toast} role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </main>
  );
}
