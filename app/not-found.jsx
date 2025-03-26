import Image from "next/image";

export default function NotFound() {
  return (
    <section className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="text-center p-5 bg-white shadow rounded-3 w-50 pt-2">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="h3 text-dark mb-4">Page Not Found!</h2>
        <p className="text-muted mb-4">
          The page you are looking for doesn’t exist.
        </p>
        <a href="/" className="btn btn-primary px-4 py-2">
          Go Home
        </a>
      </div>
    </section>
  );
}
