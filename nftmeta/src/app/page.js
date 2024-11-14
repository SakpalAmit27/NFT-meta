import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-medium mb-6 font-mono">
            WELCOME TO <span className="font-nftvault font-medium text-4xl">NFTVAULT</span>
          </h1>
          <p className="text-xl mb-6 font-mono">
            Discover, buy, and sell exclusive digital assets in a trusted marketplace.
          </p>
          <Button color="primary" size="lg">Get Started</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 font-mono">WHY CHOOSE US?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Secure Transactions"
              description="Trade with confidence using blockchain technology."
            />
            <FeatureCard
              title="Exclusive Collections"
              description="Explore unique digital assets curated by top creators."
            />
            <FeatureCard
              title="User-Friendly Interface"
              description="Enjoy a seamless experience across all your devices."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join <span className="text-3xl font-medium font-nftvault">NFTVAULT</span> today</h2>
          <p className="text-lg mb-6">Start trading digital assets in a vibrant, growing community.</p>
          <Button color="secondary" size="lg">Sign Up Now</Button>
        </div>
      </section>
    </div>
  );
}

// Reusable FeatureCard component
function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
