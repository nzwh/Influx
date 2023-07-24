import { useRouter } from 'next/navigation';

const useNavigateToProfile = (handle: string) => {

  const router = useRouter();

  const navigateToProfile = (handle: string) => {

    const profileUrl = `/profile/${handle}`;
    router.push(profileUrl);
  };

  return navigateToProfile;
};

export default useNavigateToProfile;