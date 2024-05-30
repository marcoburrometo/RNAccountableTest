import {COINGEKO_API, COINGEKO_API_KEY} from '@env';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// TODO: dynamic
const VS_CURRENCY = 'usd';

interface CoinListParams {
  page?: number;
}

export interface CoinListResult {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_7d: number;
  price_change_percentage_7d: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  market_cap_change_7d: number;
  market_cap_change_percentage_7d: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string; // Assuming 'date-time' is an ISO8601 string
  atl: number;
  atl_change_percentage: number;
  atl_date: string; // Assuming 'date-time' is an ISO8601 string
  roi?: string; // Optional since 'roi' might not be present for all cryptocurrencies
  last_updated: string; // Assuming 'date-time' is an ISO8601 string
  sparkline_in_7d: {
    price: number[];
  };
}

export interface CoinSearchResult {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export const coinListApi = createApi({
  reducerPath: 'coinListApi',
  baseQuery: fetchBaseQuery({
    baseUrl: COINGEKO_API,
  }),
  endpoints: builder => ({
    getCoinList: builder.query<CoinListResult[], CoinListParams>({
      query: ({page}) => ({
        url: 'coins/markets',
        params: {
          vs_currency: VS_CURRENCY,
          order: 'market_cap_desc',
          per_page: 10,
          page: page || 1,
          sparkline: true,
          price_change_percentage: '24h,7d',
          x_cg_demo_api_key: COINGEKO_API_KEY,
        },
      }),
    }),
    searchCoin: builder.query<{coins: CoinSearchResult[]}, string>({
      query: symbol => ({
        url: 'search',
        params: {
          x_cg_demo_api_key: COINGEKO_API_KEY,
          query: symbol,
        },
      }),
    }),
  }),
});

export const {useGetCoinListQuery, useSearchCoinQuery} = coinListApi;
