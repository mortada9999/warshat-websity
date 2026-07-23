function Sidebar({ active = 'workshops', onNavigate }) {
  const items = [
    { id: 'workshops', label: 'الورش' },
    { id: 'activities', label: 'النشاطات' },
    { id: 'kids', label: 'الأطفال' },
    { id: 'admin', label: 'الإدارة' },
  ];
  return (
    <aside
      data-od-id="sidebar-nav"
      style={{
        width: 220,
        flexShrink: 0,
        background: 'var(--clr-surface)',
        borderLeft: '1px solid var(--clr-border)',
        padding: '1.25rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minHeight: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <img src="../../assets/logo.png" alt="ورشة فن" style={{ height: 36 }} />
        <strong style={{ color: 'var(--clr-heading)', fontFamily: 'var(--font-heading)' }}>ورشة فن</strong>
      </div>
      <nav aria-label="التنقل الرئيسي">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            data-od-id={`nav-${item.id}`}
            onClick={() => onNavigate && onNavigate(item.id)}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'right',
              padding: '0.65rem 0.85rem',
              marginBottom: 4,
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.92rem',
              background: active === item.id ? 'var(--clr-olive)' : 'transparent',
              color: active === item.id ? '#fff' : 'var(--clr-text-muted)',
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div style={{ marginTop: 'auto', fontSize: 12, color: 'var(--clr-text-dim)' }}>
        الزيونة · اليرموك
      </div>
    </aside>
  );
}

Object.assign(window, { Sidebar });
