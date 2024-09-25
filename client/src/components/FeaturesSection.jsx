import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="features-section py-20 bg-gray-100 text-center">
      <h2 className="text-3xl font-semibold mb-10">Platform Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        <div className="feature-item bg-white p-6 shadow-md">
          <h3 className="text-2xl font-bold mb-4">Chatroom Access</h3>
          <p>Join discussions with fellow residents in real-time.</p>
        </div>
        <div className="feature-item bg-white p-6 shadow-md">
          <h3 className="text-2xl font-bold mb-4">Announcements</h3>
          <p>Stay updated with important community announcements.</p>
        </div>
        <div className="feature-item bg-white p-6 shadow-md">
          <h3 className="text-2xl font-bold mb-4">In/Out Logging</h3>
          <p>Manage and track your apartment's entry and exit records.</p>
        </div>
        <div className="feature-item bg-white p-6 shadow-md">
          <h3 className="text-2xl font-bold mb-4">Complaint System</h3>
          <p>File and track complaints quickly and efficiently.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
