import HotelSeoLandingPage from '@/components/HotelSeoLandingPage';
import { hotelSeoPages, buildHotelSeoMetadata } from '@/lib/hotel-seo-pages';

const page = hotelSeoPages['hotel-proposal-packages'];

export const metadata = buildHotelSeoMetadata(page);

export default function HotelProposalPackagesPage() {
  return <HotelSeoLandingPage page={page} />;
}
