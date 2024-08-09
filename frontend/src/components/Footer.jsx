import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.column}>
          <h4 style={styles.heading}>Company</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}><Link to="/about" style={styles.link}>About Us</Link></li>
            <li style={styles.listItem}><Link to="/careers" style={styles.link}>Careers</Link></li>
            <li style={styles.listItem}><Link to="/blog" style={styles.link}>Blog</Link></li>
            <li style={styles.listItem}><Link to="/contact" style={styles.link}>Contact Us</Link></li>
          </ul>
        </div>
        <div style={styles.column}>
          <h4 style={styles.heading}>Resources</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}><Link to="/help" style={styles.link}>Help Center</Link></li>
            <li style={styles.listItem}><Link to="/faqs" style={styles.link}>FAQs</Link></li>
            <li style={styles.listItem}><Link to="/privacy-policy" style={styles.link}>Privacy Policy</Link></li>
            <li style={styles.listItem}><Link to="/terms" style={styles.link}>Terms of Service</Link></li>
          </ul>
        </div>
        <div style={styles.column}>
          <h4 style={styles.heading}>Connect</h4>
          <div style={styles.socialIcons}>
            <a href="https://facebook.com" style={styles.socialLink}><Facebook /></a>
            <a href="https://twitter.com" style={styles.socialLink}><Twitter /></a>
            <a href="https://instagram.com" style={styles.socialLink}><Instagram /></a>
            <a href="https://linkedin.com" style={styles.socialLink}><LinkedIn /></a>
          </div>
        </div>
      </div>
      <div style={styles.bottomBar}>
        <p style={styles.copyText}>© 2024 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 0',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  column: {
    flex: '1',
    margin: '0 10px',
  },
  heading: {
    fontSize: '18px',
    marginBottom: '15px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '10px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    transition: 'color 0.2s',
    ':hover': {
      color: '#ddd',
    },
  },
  socialIcons: {
    display: 'flex',
    gap: '10px',
  },
  socialLink: {
    color: '#fff',
    fontSize: '24px',
    transition: 'color 0.2s',
    ':hover': {
      color: '#ddd',
    },
  },
  bottomBar: {
    textAlign: 'center',
    borderTop: '1px solid #444',
    paddingTop: '10px',
    marginTop: '20px',
  },
  copyText: {
    margin: 0,
  },
};

export default Footer;
