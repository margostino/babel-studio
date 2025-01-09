import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

interface Asset {
  id: string
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: Asset[]
  createdAt: string
  updatedAt: string
  category: string
}

interface Category {
  id: string
  name: string
  count: number
  assets?: Asset[]
}

export function useAssets(categoryId?: string) {
  const queryClient = useQueryClient()

  // Fetch categories metadata
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3000/assets/categories')
      return data as Category[]
    },
  })

  // Fetch specific category content
  const categoryQuery = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/assets/categories/${categoryId}`)
      return data as Asset[]
    },
    enabled: !!categoryId, // Only fetch when categoryId is provided
  })

  // Prefetch adjacent categories
  const prefetchAdjacentCategories = async (currentCategoryId: string) => {
    const categories = categoriesQuery.data
    if (!categories) return

    const currentIndex = categories.findIndex(c => c.id === currentCategoryId)
    const adjacentIds = [
      categories[currentIndex - 1]?.id,
      categories[currentIndex + 1]?.id,
    ].filter(Boolean)

    adjacentIds.forEach(id => {
      queryClient.prefetchQuery({
        queryKey: ['category', id],
        queryFn: async () => {
          const { data } = await axios.get(`http://localhost:3000/assets/categories/${id}`)
          return data as Asset[]
        },
      })
    })
  }

  return {
    categories: categoriesQuery.data,
    isLoadingCategories: categoriesQuery.isLoading,
    categoryAssets: categoryQuery.data,
    isLoadingCategory: categoryQuery.isLoading,
    prefetchAdjacentCategories,
  }
}