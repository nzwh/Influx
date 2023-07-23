import { useRouter } from 'next/navigation';

const useNavigateToProfile = () => {

  const router = useRouter();

  const navigateToProfile = (handle: string) => {

    const profileUrl = `/profile/@${handle}`;
    router.push(`/profile`, profileUrl);

    return handle;
  };

  return navigateToProfile;
};

export default useNavigateToProfile;