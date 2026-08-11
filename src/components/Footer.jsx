import '../styles/footer.css';

const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          &copy; {CURRENT_YEAR} Aaron Walton. All rights
          reserved.
        </p>
        <a className="footer__back-to-top" href="#top">
          Back to top &uarr;
        </a>
      </div>
    </footer>
  );
}

export default Footer;
