export const LINK_TO_REDIRECT =
  process.env.NODE_ENV !== 'production'
    ? `http:localhost:${process.env.PORT}${process.env.NEXT_PUBLIC_LINK_TO_REDIRECT}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_LINK_TO_REDIRECT}`;
