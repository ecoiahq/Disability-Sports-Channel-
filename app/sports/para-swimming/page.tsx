const ParaSwimmingPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Para Swimming</h1>
      <p className="mb-4">
        Welcome to the Para Swimming section. Here you can find information about para swimming events, athletes, and
        news.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          <p>Check out the upcoming para swimming events.</p>
          <a href="#" className="text-blue-500 hover:underline">
            View Events
          </a>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Athletes</h2>
          <p>Learn more about the amazing para swimming athletes.</p>
          <a href="#" className="text-blue-500 hover:underline">
            Meet the Athletes
          </a>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">News</h2>
          <p>Stay up-to-date with the latest para swimming news.</p>
          <a href="#" className="text-blue-500 hover:underline">
            Read News
          </a>
        </div>
      </div>
    </div>
  )
}

export default ParaSwimmingPage
