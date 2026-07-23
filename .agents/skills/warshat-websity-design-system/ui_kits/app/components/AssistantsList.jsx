function AssistantsList({ workshops = [], selectedId, onSelect }) {
  return (
    <div
      data-od-id="workshop-list-rail"
      style={{
        width: 280,
        flexShrink: 0,
        borderLeft: '1px solid var(--clr-border)',
        background: 'var(--clr-mint)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
      }}
    >
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--clr-border)' }}>
        <div style={{ fontSize: 12, color: 'var(--clr-honey)', fontWeight: 700, letterSpacing: '0.06em' }}>
          قائمة الورش
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-heading)', fontSize: '1.15rem' }}>
          الاستفسارات
        </div>
      </div>
      <div style={{ overflow: 'auto', flex: 1 }}>
        {workshops.map((w) => {
          const active = w.id === selectedId;
          return (
            <button
              key={w.id}
              type="button"
              data-od-id={`list-item-${w.id}`}
              onClick={() => onSelect && onSelect(w.id)}
              style={{
                display: 'flex',
                gap: 10,
                width: '100%',
                textAlign: 'right',
                padding: '0.85rem 1rem',
                border: 'none',
                borderBottom: '1px solid var(--clr-border)',
                cursor: 'pointer',
                background: active ? 'var(--clr-surface)' : 'transparent',
                fontFamily: 'var(--font-body)',
              }}
            >
              <img
                src={w.image}
                alt=""
                style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
              />
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontWeight: 700, color: 'var(--clr-text)', fontSize: 14 }}>
                  {w.title}
                </span>
                <span style={{ display: 'block', fontSize: 12, color: 'var(--clr-text-dim)' }}>{w.branch}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { AssistantsList });
