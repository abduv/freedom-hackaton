export function Main2() {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <header className="bg-indigo-600 text-white p-5 flex justify-between items-center shadow-md">
          <div className="text-2xl font-bold">DIT</div>
          <nav className="space-x-6">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Categories</a>
            <a href="#" className="hover:underline">Blogs</a>
            <a href="#" className="hover:underline">Testimonials</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </nav>
        </header>
  
        <section className="search-section flex flex-col items-center justify-center py-20">
          <h1 className="text-3xl font-semibold text-indigo-700 mb-6">Find your dream employee</h1>
          <div className="search-bar flex items-center w-full max-w-2xl bg-white rounded-full shadow-lg p-4 border border-gray-200">
            <textarea
              type="text"
              placeholder="Job Title, keywords..."
              rows="1"
              className="flex-grow resize-none border-none focus:outline-none focus:ring-0 bg-transparent text-gray-700 px-4"
            />
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition">
              Search
            </button>
          </div>
        </section>
      </div>
    );
  }