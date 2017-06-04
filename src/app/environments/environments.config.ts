/**
 * Be sure to set NODE_ENV to the envName configured below
 * to load its configuration on Ionic serve / build or any other command
 *
 * eg: export NODE_ENV=prod && ionic serve
 */
export const environmentList = [
  {
    envName: 'khalid',
    apiEndpoint: 'http://localhost/~BAWES/whitebook/api/web/v1',
    environmentName: 'Khalid Local Machine'
  },
  {
    envName: 'krushn',
    apiEndpoint: 'http://localhost/whitebook/candidate/web/v1',
    environmentName: 'Krushn Local Machine'
  },
  {
    envName: 'anil',
    apiEndpoint: 'http://candidate.whitebook.local/v1',
    environmentName: 'Anil Local Machine'
  },
  {
    envName: 'prod',
    apiEndpoint: 'https://api.thewhitebook.com.kw/v1',
    environmentName: 'Production Server'
  },
  {
    envName: 'dev',
    apiEndpoint: 'http://devapi.thewhitebook.com.kw/v1',
    environmentName: 'Dev Server'
  }
];
