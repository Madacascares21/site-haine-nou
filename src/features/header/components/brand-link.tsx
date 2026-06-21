import { Link } from "@tanstack/react-router"
import { site } from "../constant"

const BrandLink = () => {
    return (
        <Link to="/">{site.name}</Link>)
}

export default BrandLink