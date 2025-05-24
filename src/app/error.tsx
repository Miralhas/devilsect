'use client' // Error boundaries must be Client Components
 
import NextError from 'next/error';
 
export default function Error() {
   return (
    <div>
      {/* `NextError` is the default Next.js error page component. Its type
      definition requires a `statusCode` prop. However, since the App Router
      does not expose status codes for errors, we simply pass 0 to render a
      generic error message. */}
      <NextError statusCode={0} title='Something went wrong' />
    </div>
  );
}