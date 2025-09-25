from newsapi import NewsApiClient
from dotenv import load_dotenv
import os

load_dotenv() # Load environment variables from .env file

api_key = os.getenv('API_KEY')
# Init
newsapi = NewsApiClient(api_key=api_key)

# /v2/top-headlines
# top_headlines = newsapi.get_top_headlines(q='bitcoin',
#                                           sources='bbc-news,the-verge',
#                                           category='business',
#                                           language='en',
#                                           country='us')

# /v2/everything
all_articles = newsapi.get_everything(
    q='sustainability',
    from_param='2025-08-25',
    to='2025-12-12',
    language='en',
    sort_by='relevancy',
    page=1,
    page_size=10
)
print(all_articles)

# /v2/top-headlines/sources
# sources = newsapi.get_sources()