export interface INasaDescription {
  nasa_id: string,
  location: string,
  description: string,
  title: string,
  photographer?: string,
  keywords?: string[],
  date_created?: string,
}

export interface INasaImage {
  render?: string,
  href?: string
}

export interface INasaCardDetails {
  data: INasaDescription[],
  links: INasaImage[]
}