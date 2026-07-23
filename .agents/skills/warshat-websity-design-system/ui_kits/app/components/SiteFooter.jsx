function SiteFooter() {
  return (
    <footer
      data-od-id="app-footer"
      style={{
        background: 'var(--clr-olive)',
        borderTop: '4px solid var(--clr-honey)',
        padding: '3rem 1rem',
        textAlign: 'center',
      }}
    >
      <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(246, 240, 226, 0.85)', fontWeight: 500 }}>
        © ورشة فن — جميع الحقوق محفوظة · فرعا الزيونة واليرموك
      </p>
    </footer>
  );
}

Object.assign(window, { SiteFooter });
