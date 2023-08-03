import Supabase from '@/src/app/backend/model/supabase';

export const handleLogout = async () => {
  try {
    const { error } = await Supabase.auth.signOut()
    if (error) throw error
    localStorage.removeItem('token');
  } catch (error) {
    alert(error)
  }
}