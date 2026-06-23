import { Link } from "@tanstack/react-router"
import { site } from "../constant"

const BrandLink = () => {
    return (

        // <Link to="/"><img className="size-15" alt="Auxload Store" src="/logo.svg"/></Link>)
        <div className="text-md tracking-[0.35em]">
            {site.name}
          </div>)
}

export default BrandLink