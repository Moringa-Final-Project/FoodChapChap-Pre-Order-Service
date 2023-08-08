import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div >
        <footer className="footer">
      <div className="max-width">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li><a href="#">about us</a></li>
              <li><a href="#">our services</a></li>
              <li><a href="#">privacy policy</a></li>
              <li><a href="#">affiliate program</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>get help</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">returns</a></li>
              <li><a href="#">order status</a></li>
              <li><a href="#">payment options</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <a href="#">
                <FontAwesomeIcon className='icon' icon={faFacebook} />
              </a>
              <a href="#">
                <FontAwesomeIcon className='icon' icon={faInstagram} />
              </a>
              <a href="#">
                <FontAwesomeIcon className='icon' icon={faTwitter} />
              </a>
              <a href="#">
                <FontAwesomeIcon className='icon' icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer