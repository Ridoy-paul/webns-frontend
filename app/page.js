export default function Home() {
  const features = [
    "✅ User Authentication System: Login, Registration.",
    "✅ Database Seeder for Category and Ticket Status.",
    "✅ Create Ticket system with file attachment upload.",
    "✅ Only Admin can edit ticket information.",
    "✅ Role based Ticket List show. Admin can see all user tiekets, User can see only their tickets.",
    "✅ Ticket wise Live chat system using web-sockets.",
    "✅ Simple Dashboard Ticket Status Report",
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
