export default function PricingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Pricing</h1>
      <p className="text-gray-700 max-w-xl text-center mb-8">
        Choose the plan that fits your needs. Add your pricing details here.
      </p>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="border rounded-lg p-6 shadow-md flex-1 min-w-[220px]">
          <h2 className="text-xl font-semibold mb-2">Free</h2>
          <p className="mb-4">$0/month</p>
          <ul className="text-sm text-gray-600 mb-4">
            <li>Basic features</li>
            <li>Email support</li>
          </ul>
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">Get Started</button>
        </div>
        <div className="border rounded-lg p-6 shadow-md flex-1 min-w-[220px]">
          <h2 className="text-xl font-semibold mb-2">Pro</h2>
          <p className="mb-4">$19/month</p>
          <ul className="text-sm text-gray-600 mb-4">
            <li>All Free features</li>
            <li>Advanced analytics</li>
            <li>Priority support</li>
          </ul>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Upgrade</button>
        </div>
      </div>
    </main>
  );
}
