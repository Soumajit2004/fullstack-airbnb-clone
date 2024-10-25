import { Link, useNavigate, useParams } from 'react-router-dom';
import ListingImageCarousel from '../../../components/hosting/listing/listing-image-carousel.component.tsx';
import ReservationCardComponent from './components/reservation-card.component.tsx';
import { useFetchListingByID } from '../../../hooks/apiHooks/hosting/listing/fetchListingHooks.ts';
import { Listing } from '../../../types/listing/listing.type.ts';
import useDeleteListing from '../../../hooks/apiHooks/hosting/listing/useDeleteListing.ts';
import { toast } from 'react-toastify';

const ListingDetails = ({ listing }: { listing: Listing }) => {

  const { mutate: deleteListing } = useDeleteListing();
  const navigate = useNavigate();

  return <div className={'flex flex-col gap-6'}>
    <ListingImageCarousel listingImages={listing.images} />

    <div className="flex justify-between">
      <div>
        <h3 className={'text-xl font-bold'}>
          {listing.title}
        </h3>
        <p className={'text-base-300 '}>{listing.description}</p>
      </div>

      <details className="dropdown dropdown-end">
        <summary className="btn btn-circle">
          <span className="material-symbols-rounded">more_vert</span>
        </summary>
        <ul className="menu dropdown-content bg-base-200 rounded-box z-[1] w-52 p-2 shadow mt-2">
          <li>
            <Link to={'edit'}>Edit Listing</Link>
          </li>
          <li>
            <button className="btn-danger" onClick={() => {
              deleteListing(listing.id, {
                onSuccess: () => {
                  toast.success('Listing deleted successfully');
                  navigate('/hosting/listings');
                },
              });
            }}>
              Delete Listing
            </button>
          </li>
        </ul>
      </details>
    </div>

  </div>;
};

function HostingListingView() {

  const { listingId } = useParams();

  const { isFetched, data } = useFetchListingByID(listingId as string);
  const fetchedListing = data?.data;

  return isFetched && (
    <div className="grid w-full grid-cols-3 gap-4">

      <ListingDetails listing={fetchedListing} />

      <div className={'flex flex-col gap-4 col-span-2'}>
        <ReservationCardComponent />
      </div>
    </div>)
    ;
}

export default HostingListingView;