import elasticSearchAPI from '../../config/elasticSearch';

export const getProperties = async (
  {latitude, longitude},
  distance = '1km',
  size = 100,
) => {
  const searchQuery = {
    size,
    query: {
      bool: {
        must: {
          match_all: {},
        },
        filter: {
          geo_distance: {
            distance,
            location: {
              lat: latitude,
              lon: longitude,
            },
          },
        },
      },
    },
  };

  try {
    const response = await elasticSearchAPI.post(
      'postcode_data/_search',
      searchQuery,
    );

    return response.data.hits.hits;
  } catch (e) {
    console.log(e, 'error occured');
    return e;
  }
};
