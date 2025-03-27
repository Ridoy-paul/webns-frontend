'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Link, dynamicCategories } from '@/app/components/Link';

export default function Footer() {
  const currentPath = usePathname();
  const isUserPath = currentPath.includes('/user');

  return (
    <footer
      style={{ display: isUserPath ? 'none' : 'block', backgroundColor: '#006847', color: '#fffff' }}
      className="pt-5 pb-3 text-light"
    >
      <div className="container">
        <div className="row">
          {/* About Us Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="footer__widget--title fw-bold">Tolet BD</h4>
            <p className="text-j text-light">
              Tolet BD is your trusted platform for finding rental properties in Bangladesh. Whether you're looking for a <strong>house</strong>, <strong>bachelor room</strong>, 
              <strong>hostel seat</strong>, <strong>sublet</strong>, or a <strong>commercial space </strong>, our platform connects tenants and landlords easily.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h4 className="footer__widget--title fw-bold">Property Type</h4>
            <ul className="footer__widget--menu footer__widget--inner text-light">
              {dynamicCategories.map(cat => (
                <li key={cat.id} className="footer__widget--menu__list">
                  <Link href={`/properties?category=${cat.index}`}>{cat.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h4 className="footer__widget--title fw-bold">Useful Links</h4>
            <ul className="footer__widget--menu footer__widget--inner text-light">
              <li className="footer__widget--menu__list"><Link href="/about-us">About Us</Link></li>
              <li className="footer__widget--menu__list"><Link href="/contact-us">Contact Us</Link></li>
              <li className="footer__widget--menu__list"><Link href="/faq">FAQ</Link></li>
              <li className="footer__widget--menu__list"><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
              <li className="footer__widget--menu__list"><Link href="/refund-policy">Refund Policy</Link></li>
              <li className="footer__widget--menu__list"><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li className="footer__widget--menu__list"><Link href="/support-policy">Support Policy</Link></li>
            </ul>
          </div>

          {/* Play Store & QR Code Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="footer__widget--title fw-bold">Download Our App</h4>
            <p className="text-light">Download the Tolet BD app for a better experience.</p>
            <div className="d-flex align-items-center">
              <a href="https://play.google.com/store/apps/details?id=com.toletbd" target="_blank" rel="noopener noreferrer" className="me-3">
                <Image 
                  src="assets/img/icon/google-play.svg" 
                  alt="Download from Play Store" 
                  width={160} 
                  height={50} 
                  className="img-fluid" 
                />
              </a>
           
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <hr />
        <div className="footer__bottom pt-2 pb-1 border-top">
          <div className="row align-items-center">
            <div className="col-md-6 col-12">
              <p className="text-light mb-0">
                Copyright © 2023 Tolet BD. All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 col-12 text-md-end">
              <div className="footer__payment">
                <img
                  src="/assets/img/other/payment-visa-card.png"
                  alt="Visa card payment method"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
