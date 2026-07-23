function Header() {
  return (
    <header
      data-od-id="app-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#fff',
        borderBottom: '1px solid #d96f4b',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'spaceBetween',
          height: 70,
          padding: '0 1rem',
          maxWidth: 1280,
          margin: '0 auto',
          justifyContent: 'space-between',
        }}
      >
        <a href="#" data-od-id="site-logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="../../assets/logo.png" alt="ورشة فن" style={{ height: 50, width: 'auto', objectFit: 'contain' }} />
        </a>
        <button
          aria-label="القائمة"
          data-od-id="menu-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            padding: 10,
          }}
        >
          <span style={{ display: 'block', width: 30, height: 2, background: '#8c9b58', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 30, height: 2, background: '#8c9b58', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 30, height: 2, background: '#8c9b58', borderRadius: 2 }} />
        </button>
      </div>
    </header>
  );
}

Object.assign(window, { Header });
