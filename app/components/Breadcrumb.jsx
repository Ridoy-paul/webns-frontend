import Link from "next/link"; export default function Breadcrumb({title = ''}) { return ( <section className="breadcrumb__section breadcrumb__bg"> <div className="container"> <div className="row row-cols-1"> <div className="col"> <div className="breadcrumb__content text-center"> <h1 title={title} className="breadcrumb__content--title mb-25">{title}</h1> <ul className="breadcrumb__content--menu d-flex justify-content-center"> <li className="breadcrumb__content--menu__items"> <Link title='Tolet BD | Basa Vara | Bachelor seat vara in Bangladesh' href="/">Home</Link> </li> <li className="breadcrumb__content--menu__items"> <span>{title}</span> </li> </ul> </div> </div> </div> </div> </section> ); }