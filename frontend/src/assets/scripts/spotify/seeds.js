/* eslint-disable import/prefer-default-export */
// this will contain the configs for the different emotions.
export const seeds = {
  anger: {
    degree: {
      high: {
        seed_tracks: '7kmqLNZdsKOq9wYoo2Ib0X', // She Ain't Shit - Young L3x
      },
      low: {
        seed_tracks: '4c2xt1trwYZpMqPWY35Xi9', // Jaded - Drake
      },
    },
  },
  contempt: {
    degree: {
      high: {
        seed_tracks: '358bOvBiZCS9fRzNYosw6c', // Like a Boy - Ciara
      },
      low: {
        seed_tracks: '1h20yRsf5WeuHbohrlfcCt', // Me Or The Papes - Jeru The Damaja
      },
    },
  },
  disgust: {
    degree: {
      high: {
        seed_tracks: '6eYxmK9fdL4hwLnXG2zY3s', // Look At Me! - XXXTENTACION
      },
      low: {
        seed_tracks: '3GVkPk8mqxz0itaAriG1L7', // Everybody Dies... XXXTENTACION
      },
    },
  },
  fear: {
    degree: {
      high: {
        seed_tracks: '5tvkmC4DhXYPu24W6bt2kl', // Herbal Tea - Artificial.Music
      },
      low: {
        seed_tracks: '4g2T3FUjXH6XuboKw60hHX', // Into The Wild - Wrabel
      },
    },
  },
  happiness: {
    degree: {
      high: {
        seed_tracks: '5b88tNINg4Q4nrRbrCXUmg', // Happy - Pharrell
        target_danceability: 0.8,
        // target_tempo: 0.75,
        // target_popularity: 0.8,
        // target_valence: 0.8,
      },
      low: {
        seed_tracks: '0oZbYnNWqYBbiX2Rv3A2rb', // Birocratic - Shakedown
        target_danceability: 0.8,
        // target_tempo: 0.75,
        // target_popularity: 0.8,
        // target_valence: 0.5,
      },
    },
  },
  neutral: {
    degree: {
      high: {
        seed_tracks: '5nMaFvH4APmJipUSAMYmUQ', // Early Spring - .sinh/Masego
        target_danceability: 0.5,
        // target_tempo: 0.5,
        // target_popularity: 0.8,
        // target_valence: 0.5,
      },
      low: {
        seed_tracks: '4EBKHFBd3bCOmunwxKZ5aD', // ikigai - Idealism
        target_danceability: 0.25,
        // target_tempo: 0.5,
        // target_popularity: 0.5,
        // target_valence: 0.5,
      },
    },
  },
  sadness: {
    degree: {
      high: {
        seed_tracks: '1D5q7cBDHLBDbzQDVrS6E3', // Bad Idea - pxzvc&shiloh
      },

      low: {
        seed_tracks: '27mDTC0vlah03ezVsuWRfi', // feel - eevee
      },
    },
  },
  surprise: {
    degree: {
      high: {
        seed_tracks: '1vxw6aYJls2oq3gW0DujAo', // Crazy - Gnarls Barkley
      },
      low: {
        seed_tracks: '1jCipeOA23ueS9yPBfhdCO', // A Town Where You... - Anime Kei
      },
    },
  },
};
