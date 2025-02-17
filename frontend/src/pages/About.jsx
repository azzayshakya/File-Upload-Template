import React from 'react';

const AboutPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">About Us</h2>
      <p className="mb-6">
        We are a leading company with a passion for delivering innovative solutions. Our team is dedicated to providing the best services in the industry, focusing on customer satisfaction and technological advancement.
      </p>

      <div className="bg-white p-6 shadow-md rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
        <p className="mb-4">
          Our vision is to revolutionize the industry by creating solutions that empower businesses and improve lives. We strive for excellence in everything we do.
        </p>

        <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
        <p>
          Our mission is to deliver innovative and effective products that meet the needs of our clients. We believe in continuous improvement and value-driven development to keep us ahead of the competition.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
