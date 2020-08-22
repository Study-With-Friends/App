const localEndpoint = 'http://localhost:5000';
// const localEndpoint = 'http://34.226.233.249';
const prodEndpoint = 'http://google.com'

const endpoint = process.env.NODE_ENV === 'production' ? prodEndpoint : localEndpoint;

const config = {
    apiEndpoint: endpoint,
};

export default config;