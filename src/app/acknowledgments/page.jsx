import AcknowledgmentsPageView from "./view"
import axios from "axios";

async function fetchData() {
    try {
        const response = await axios.get(
            process.env.NEXT_GITHUB_CONTRIBUTORS_DATA_EP,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_GITHUB_AUTH_TOKEN}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error.code);

        return [];
    }
}


export default async function AcknowledgmentsPage() {
    const data = await fetchData();

    return <AcknowledgmentsPageView contributors={data} />
}

AcknowledgmentsPage.displayName = "AcknowledgmentsPage"