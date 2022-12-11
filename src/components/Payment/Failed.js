import PageTitle from "../PageTitle/PageTitle";

const Failed = () => {
    return (
        <div className="container section">
            <PageTitle title="আপনার পেমেন্ট সম্পন্ন হয়নি" />

            <h5 className="failed_message">দুঃখিত, আপনার পেমেন্ট সম্পন্ন হয়নি।</h5>
        </div>
    )
}

export default Failed;