import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 *
 * @description - Groups commonly used system functions and data in a central location for
 *                easy access and update. Commonly used funtions should be included here
 *                so we don't have to import and create same funtions everywhere.
 */

const useSystemFunctions = () => {
  const navigate = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return {
    navigate,
    pathname,
    searchParams,
  };
};

export default useSystemFunctions;
