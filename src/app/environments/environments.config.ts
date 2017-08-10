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
    frontend: 'http://localhost/~BAWES/whitebook/frontend/web', 
    environmentName: 'Khalid Local Machine'
  },
  {
    envName: 'krushn',
    apiEndpoint: 'http://localhost/whitebook/api/web/v1',
    frontend: 'http://localhost/whitebook/frontend/web', 
    environmentName: 'Krushn Local Machine'
  },
  {
    envName: 'anil',
    apiEndpoint: 'http://api.thewhitebook.local/v1',
    frontend: 'http://frontend.thewhitebook.local', 
    environmentName: 'Anil Local Machine'
  },
  {
    envName: 'prod',
    apiEndpoint: 'https://api.thewhitebook.com.kw/v1',
    frontend: 'https://frontend.thewhitebook.com.kw',
    environmentName: 'Production Server'
  },
  {
    envName: 'dev',
    //apiEndpoint: 'http://192.168.0.101/whitebook/api/web/v1',
    apiEndpoint: 'http://devapi.thewhitebook.com.kw/v1',
    frontend: 'http://dev.thewhitebook.com.kw',
    environmentName: 'Dev Server'
  }
];
