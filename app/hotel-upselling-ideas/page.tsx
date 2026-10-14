import HotelSeoLandingPage from '@/components/HotelSeoLandingPage';
import { hotelSeoPages, buildHotelSeoMetadata } from '@/lib/hotel-seo-pages';

const page = hotelSeoPages['hotel-upselling-ideas'];

export const metadata = buildHotelSeoMetadata(page);

export default function HotelUpsellingIdeasPage() {
  return <HotelSeoLandingPage page={page} />;
}
