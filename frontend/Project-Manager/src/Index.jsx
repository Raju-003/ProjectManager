import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Navigation */}
      <nav className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="font-bold text-xl text-gray-900">Project Vista</div>
        <div className="flex items-center gap-6">
          <Link to="/signup">
            <button className="btn-primary" size="sm" variant="secondary">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="btn-primary" size="sm">Log In</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Manage projects with clarity and confidence
          </h1>
          <p className="text-xl text-gray-600">
            Project Vista helps teams organize, track, and complete work efficiently through 
            visual boards and intuitive collaboration tools.
          </p>
          <div className="flex gap-4 pt-4">
            <Link to="/signup">
              <button className="btn-primary lg gap-2">
                Get Started 
              </button>
            </Link>
            <Link to="/about">
              <button className="btn-primary"  size="lg" variant="outline">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2400" 
            alt="Project Vista Dashboard" 
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Project Vista</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visual Boards</h3>
              <p className="text-gray-600">Organize tasks into visual boards that make project status clear at a glance.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Collaboration</h3>
              <p className="text-gray-600">Real-time collaboration tools that keep your entire team on the same page.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Deadline Tracking</h3>
              <p className="text-gray-600">Never miss a deadline with our intuitive calendar and reminder system.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to boost your productivity?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Project Vista to manage their projects effectively.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="font-bold text-lg text-gray-900 mb-2">Project Vista</div>
              <p className="text-gray-600 text-sm">Simplified project management for teams.</p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Project Vista. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
