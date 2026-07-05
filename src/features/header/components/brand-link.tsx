import { Link } from "@tanstack/react-router"
import { site } from "../constant"

const BrandLink = () => {
    return (

        // <Link to="/"><img className="size-15" alt="Auxload Store" src="/logo.svg"/></Link>)
        <Link to="/"
        // className="text-md` tracking-[0.35em]"
        >
            <img  className="fill-accent text-red-200 " width="100" alt={site.name}  src="/logo-favicon.svg" />
        </Link >)
}

export default BrandLink