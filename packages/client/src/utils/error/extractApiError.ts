import { AxiosError } from 'axios';

export const extractApiError = (error: AxiosError): String => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return error.response?.data?.message[0] || error.message;
};