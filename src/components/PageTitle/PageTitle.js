import { Helmet } from "react-helmet-async"

const PageTitle = ({ title }) => {
    return (
        <Helmet>
            <title>{title} | রকমারি.কম</title>
        </Helmet>
    )
}

export default PageTitle;