import Image from "next/image"
 
export default function NotFound() {
  return (
    <section className="auth-page-area py-5">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-xl-4 col-md-8 col-12">
                    <div className="auth-card py-5 rounded">
                        <div className="auth-card-form-body text-center">
                            <Image src="/assets/img/not-found.svg" alt="#" className='my-5' width={150} height={100} loading="lazy" />
                            <h1 className="auth-card-title">Page Not Found!</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}