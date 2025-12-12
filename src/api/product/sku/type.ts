export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// SKU对象的ts类型
export interface SkuData {
  category3Id?: string | number
  spuId?: string | number
  tmId?: string | number
  skuName?: string
  price?: string | number
  weight?: string | number
  skuDesc?: string
  skuAttrValueList?: any[]
  skuSaleAttrValueList?: any[]
  skuDefaultImg?: string
  isSale?: number // 1:上架 0:下架
  id?: number
  skuImageList?: any[]
}

// 获取SKU接口返回的数据ts类型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

// 获取SKU商品详情接口的ts类型
export interface SkuInfoData extends ResponseData {
  data: SkuData
}
