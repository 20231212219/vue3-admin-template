// Mock data for the screen view
export const getProducts = (params?: any) => {
  return Promise.resolve(
    Array.from({ length: 20 }).map((_, index) => ({
      id: index + 1,
      title: `Product ${index + 1} - High Quality Item`,
      price: Math.floor(Math.random() * 1000) + 100,
      images: ['https://picsum.photos/200/200?random=' + index],
      category: { id: (index % 5) + 1 },
    })),
  )
}

export const getCategories = () => {
  return Promise.resolve([
    { id: 1, name: 'Electronics', image: 'https://picsum.photos/200/200?random=101' },
    { id: 2, name: 'Clothing', image: 'https://picsum.photos/200/200?random=102' },
    { id: 3, name: 'Home & Garden', image: 'https://picsum.photos/200/200?random=103' },
    { id: 4, name: 'Sports', image: 'https://picsum.photos/200/200?random=104' },
    { id: 5, name: 'Toys', image: 'https://picsum.photos/200/200?random=105' },
  ])
}

export const getUsers = (params?: any) => {
  return Promise.resolve(
    Array.from({ length: 10 }).map((_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      avatar: 'https://picsum.photos/100/100?random=' + (index + 200),
      role: index === 0 ? 'admin' : 'user',
    })),
  )
}
