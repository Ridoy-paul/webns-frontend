export default function Home() {
  const features = [
    "✅Authentication: Email, Password, Google Oauth system.",
    "✅Parallel and Intercepting Routing System.",
    "✅Server-Side Rendering for Manage Hotels / Property Page",
    "✅Pagination in Manage Hotels Page",
    "✅Property Details Navigation",
    "✅Hotel Creation Feature",
    "✅Hotel Editing Feature",
    "✅Hotel Deletion Feature",
    "✅Social Media Sharing",
    "✅Error Handling",
  ];

  return (
    <div className="container-fluid p-0">
      <h1 className="h3 mb-3">Welcome Back!</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Feature Lists:</h5>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {features.map((feature, index) => (
                  <li key={index} className="list-group-item">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
