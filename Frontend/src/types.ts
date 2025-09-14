export type PhotosType = {
  id: number,
  alt: string,
  author: number,
  img_id: string,
  link_large: string,
  link_medium: string,
  link_original: string,
  link_small: string,
}[]

export type CollsType =  {
  id: number,
  title: string,
  author: number,
  photos: PhotosType
}[]

// From pixel API
export type Photo = {
  id: number,
  alt: string,
  src: {
    large: string,
    medium: string,
    original: string,
    small: string,
  }
}[]


