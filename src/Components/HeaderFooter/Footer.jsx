import React from "react";
import MasterCard from "../../assets/icons8-mastercard-96.png";
import CreditCard from "../../assets/icons8-credit-card-96.png";
import VisaCard from "../../assets/icons8-visa-96.png";
import PayPal from "../../assets/icons8-paypal-96.png";

const Footer = () => {
  const payments = [VisaCard, MasterCard, CreditCard, PayPal];
  const paymentOptions = payments.map((option, index) => {
    return (
      <div key={index}>
        <img className="h-8" src={option} alt={option.name} />
      </div>
    );
  });
  return (
    <footer className="bg-black pt-10 text-white">
      <div className="col-span-2 p-4">
        <div className="grid px-4 pb-15 md:grid-cols-12">
          <div className="col-span-4 p-4">
            <h3 className="mb-6 text-base-2 font-medium tracking-wider">
              ABOUT US
            </h3>
            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
              quidem.
            </p>
            <p className="mb-2">
              <a href="mailto:ramanthaqori@gmail.com">rthaqoir@gmail.com</a>
            </p>
            <p>
              <a href="tel:555 555 555">555 555 555</a>
            </p>
          </div>
          <div className="col-span-2 p-4">
            <h3 className="mb-6 text-base-2 font-medium uppercase tracking-wider">
              Company
            </h3>
            <ul className="flex flex-col gap-3 text-base font-normal">
              <li className="underlineAnimation footer_links">About Us</li>
              <li className="underlineAnimation footer_links">Careers</li>
              <li className="underlineAnimation footer_links">
                Store Location
              </li>
              <li className="underlineAnimation footer_links">Contact Us</li>
            </ul>
          </div>
          <div className="col-span-2 p-4">
            <h3 className="mb-6 text-base-2 font-medium uppercase tracking-wider">
              Customer Care
            </h3>
            <ul className="flex flex-col gap-3 text-base font-normal">
              <li className="underlineAnimation footer_links">Size Guide</li>
              <li className="underlineAnimation footer_links">Help & FAQs</li>
              <li className="underlineAnimation footer_links">
                Return My Order
              </li>
              <li className="underlineAnimation footer_links">
                Refer a Friend
              </li>
            </ul>
          </div>
          <div className="col-span-2 p-4">
            <h3 className="mb-6 text-base-2 font-medium uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3 text-base font-normal">
              <li className="underlineAnimation footer_links">
                Duties & Taxes
              </li>
              <li className="underlineAnimation footer_links">Shipping Info</li>
              <li className="underlineAnimation footer_links">
                Privacy Policy
              </li>
              <li className="underlineAnimation footer_links">
                Term Conditions
              </li>
            </ul>
          </div>
          <div className="col-span-2 p-4">
            <h3 className="mb-6 text-base-2 font-semibold uppercase tracking-wider">
              Follow Us
            </h3>
            <ul className="flex flex-col gap-3 text-base font-normal">
              <li className="underlineAnimation footer_links">Instagram</li>
              <li className="underlineAnimation footer_links">Facebook</li>
              <li className="underlineAnimation footer_links">Twitter</li>
              <li className="underlineAnimation footer_links">TikTok</li>
            </ul>
          </div>
        </div>
        <hr className="border- border-gray-300" />
        <div className="grid py-5 md:grid-cols-2">
          <div className="start-center flex items-center justify-center md:justify-start md:p-4">
            <p>
              &copy;2022{" "}
              <span className="text-base-1 font-semibold">rthaqori</span>. All
              rights reserved
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 md:justify-end md:p-4">
            {paymentOptions}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
