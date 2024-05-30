import {COINGEKO_API} from '@env';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface StatusUpdate {
  description: string;
  category: string;
  created_at: string;
  user: string;
  user_title: string;
}

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: string | null;
  platforms: {[key: string]: string};
  block_time_in_minutes: number;
  hashing_algorithm: string | null;
  categories: string[];
  public_notice: string | null;
  additional_notices: string[];
  localization: {[key: string]: string};
  description: {[key: string]: string};
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string | null;
    facebook_username: string | null;
    bitcointalk_thread_identifier: number | null;
    telegram_channel_identifier: string | null;
    subreddit_url: string | null;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number | null;
  coingecko_rank: number | null;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: {
    current_price: {[key: string]: number};
    total_value_locked: number | null;
    mcap_to_tvl_ratio: number | null;
    fdv_to_tvl_ratio: number | null;
    roi: number | null;
    ath: {[key: string]: number};
    ath_change_percentage: {[key: string]: number};
    ath_date: {[key: string]: string};
    atl: {[key: string]: number};
    atl_change_percentage: {[key: string]: number};
    atl_date: {[key: string]: string};
    market_cap: {[key: string]: number};
    market_cap_rank: number;
    fully_diluted_valuation: {[key: string]: number | null};
    total_volume: {[key: string]: number};
    high_24h: {[key: string]: number};
    low_24h: {[key: string]: number};
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_in_currency: {[key: string]: number};
    market_cap_change_in_currency: {[key: string]: number};
  };
  community_data: {
    facebook_likes: number | null;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
    reddit_accounts_active_48h: number;
  };
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: {
      additions: number;
      deletions: number;
    };
    commit_count_4_weeks: number;
  };
  public_interest_stats: {
    alexa_rank: number | null;
    bing_matches: number | null;
  };
  status_updates: StatusUpdate[];
  last_updated: string;
}

export interface CoinChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export const coinDetailsApi = createApi({
  reducerPath: 'coinDetailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: COINGEKO_API,
  }),
  endpoints: builder => ({
    getCoinDetails: builder.query<CoinData, string>({
      query: id => ({
        url: 'coins/' + id,
      }),
    }),
    getCoinChart: builder.query<
      CoinChartData,
      {id: string; vsCurrency: string}
    >({
      query: ({id, vsCurrency}) => ({
        url: `coins/${id}/market_chart`,
        params: {
          vs_currency: vsCurrency,
          days: 30,
        },
      }),
    }),
  }),
});

export const {useGetCoinDetailsQuery, useGetCoinChartQuery} = coinDetailsApi;
