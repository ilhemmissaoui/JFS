import axios from 'axios';

const getFAQ = async (token) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/faqs`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};
const faqService = {
  getFAQ,
};
export default faqService;
