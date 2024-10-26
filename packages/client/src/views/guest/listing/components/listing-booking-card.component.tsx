import { Listing } from '../../../../types/listing/listing.type.ts';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

type ListingBookingCardProps = {
  listing: Listing;
}

type BookingInputs = {
  checkIn: Date,
  checkOut: Date,
};


export default function ListingBookingCard({ listing }: ListingBookingCardProps) {

  const [searchParams] = useSearchParams();

  const checkInDate = searchParams.get('checkIn');
  const checkOutDate = searchParams.get('checkOut');

  const { control, watch } = useForm<BookingInputs>({
    defaultValues: {
      checkIn: checkInDate ? new Date(checkInDate) : undefined,
      checkOut: checkOutDate ? new Date(checkOutDate) : undefined,
    },
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const differenceInDays = (watch('checkIn') && watch('checkOut')) ? Math.floor(Math.abs(watch('checkOut') - watch('checkIn')) / (1000 * 60 * 60 * 24)) : null;
  const totalPriceBeforeTax = differenceInDays ? differenceInDays * listing.costing : null;
  const totalPrice = totalPriceBeforeTax ? totalPriceBeforeTax + Math.round(totalPriceBeforeTax * 0.12) : null;

  return (
    <div className={'w-full flex  flex-col gap-4 border-2 border-base-300 rounded-xl shadow-xl p-8'}>
      <h3 className={'text-2xl font-bold'}>
        ${listing.costing} <span className={'text-xl font-normal text-gray-500'}>night</span>
      </h3>

      <form className={'flex flex-col'} id="bookingForm">
        <Controller
          control={control}
          name="checkIn"
          render={({ field }) => (
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              className="input input-bordered rounded-b-none w-full"
              placeholderText={'Check In'}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              selectsStart
              startDate={watch('checkIn')}
              endDate={watch('checkOut')}
            />)}
        />

        <Controller
          control={control}
          name="checkOut"
          render={({ field }) => (
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              className="input input-bordered rounded-none w-full"
              calendarClassName={'z-50'}
              placeholderText={'Check Out'}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              selectsEnd
              startDate={watch('checkIn')}
              endDate={watch('checkOut')}
              minDate={watch('checkIn')}
            />)}
        />
        <button className="btn btn-primary rounded-t-none">Reserve</button>
      </form>

      {
        (differenceInDays && totalPrice && totalPriceBeforeTax) && (
          <div className={'flex flex-col w-full items-center gap-4 text-lg'}>
            <p className={'text-gray-500 text-sm'}>You won't be charged yet</p>

            <div className={'flex w-full justify-between'}>
              <p>${listing.costing} x {differenceInDays} nights</p>
              <p>${totalPriceBeforeTax}</p>
            </div>

            <div className={'flex w-full justify-between'}>
              <p>12% Tax</p>
              <p>${Math.round(totalPriceBeforeTax * 0.12)}</p>
            </div>

            <div className="divider my-0" />

            <div className={'flex w-full justify-between font-bold'}>
              <p>Total</p>
              <p>${totalPrice}</p>
            </div>
          </div>
        )
      }
    </div>
  );
}