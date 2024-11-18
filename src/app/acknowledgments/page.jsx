import AcknowledgmentsPageView from "./view"
import axios from "axios";
import NodeCache from 'node-cache';
import { metatag } from "@/lib/metatag";

const cache = new NodeCache({ stdTTL: 3600 });

async function fetchData() {
  const cachedData = cache.get('contributors');
  if (cachedData) {
    return cachedData;
  }
  try {
    const response = await axios.get(
      process.env.NEXT_GITHUB_CONTRIBUTORS_DATA_EP,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_GITHUB_AUTH_TOKEN}`,
        }
      }
    );
    const data = response.data;
    cache.set('contributors', data);
    return data;
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

export async function generateMetadata() {
  return metatag('Acknowledgments | PRAS CLI', 'https://cli.pras.me/acknowledgments', 'index, follow');
}