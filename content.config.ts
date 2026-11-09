import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    categories: defineCollection({
      type: 'data',
      source: 'categories/*.json',
      schema: z.object({
        slug: z.string(),
        name: z.string(),
        description: z.string(),
        icon: z.string()
      })
    }),
    products: defineCollection({
      type: 'data',
      source: 'products/*.json',
      schema: z.object({
        slug: z.string(),
        name: z.string(),
        description: z.string(),
        category: z.string(),
        image: z.string(),
        brand: z.string(),
        price: z.number(),
        color: z.string(),
        material: z.string(),
        level: z.string(),
        featured: z.boolean().default(false)
      })
    })
  }
})
