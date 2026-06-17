import { useQuery } from '@tanstack/react-query';
import { getCategoriesService } from '@/services/ai.service';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategoriesService.getCategories(),
    staleTime: 24 * 60 * 60 * 1000, // Cache categories for 24 hours
  });
};
