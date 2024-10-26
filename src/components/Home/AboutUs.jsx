import { React, useState } from "react";
// import Modal from "react";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const AboutUs = ({ onClose }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/home");
  };

  return (
    <Modal
      open={open}
      //   onRequestClose={onClose}
      contentLabel="About Us"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg z-60 overflow-y-auto max-h-full w-4/5">
        {/* Introduction */}
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            About Home Tiffin Service
          </h1>
          <p className="text-gray-600 text-lg">
            Bringing Homestyle Meals to Your Doorstep with Love and Care
          </p>
        </section>

        {/* Our Story */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600">
            Home Tiffin Service was born out of a passion for delivering
            healthy, home-cooked meals to busy individuals and families. Our
            journey started in [Year] with the simple goal of bringing the taste
            of home to your table, no matter where you are.
          </p>
          <p className="text-gray-600 mt-4">
            Since then, we've grown from a small kitchen to a full-fledged
            tiffin service, serving hundreds of satisfied customers every day.
            Our commitment to quality, freshness, and customer satisfaction has
            been the cornerstone of our success.
          </p>
        </section>

        {/* Our Mission and Values */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Mission and Values
          </h2>
          <p className="text-gray-600">
            Our mission is simple: to provide delicious, nutritious, and
            affordable meals that remind you of home. We believe in using only
            the freshest ingredients, supporting local communities, and
            delivering meals with a personal touch.
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-4">
            <li>Quality: We never compromise on the quality of our meals.</li>
            <li>
              Customer Satisfaction: Our customers are at the heart of
              everything we do.
            </li>
            <li>Sustainability: We are committed to eco-friendly practices.</li>
            <li>Community: We believe in giving back to our community.</li>
          </ul>
        </section>

        {/* Why Choose Us */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Customized meal plans tailored to your preferences.</li>
            <li>Freshly prepared meals using locally sourced ingredients.</li>
            <li>Convenient and reliable delivery service.</li>
            <li>Exceptional customer support and satisfaction.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          {/* Back to Home Page Button */}
          <button
            onClick={handleClose} // This will close the About Us page and show the Home page
            className="border-black bg-gray-600 text-white hover:bg-white hover:text-black mt-4"
          >
            Back to Home Page
          </button>
        </section>
      </div>
    </Modal>
  );
};

export default AboutUs;
