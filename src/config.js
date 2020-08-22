const localEndpoint = 'http://localhost:5000';
const prodEndpoint = 'http://google.com'

const endpoint = process.env.NODE_ENV === 'production' ? prodEndpoint : localEndpoint;

const config = {
    apiEndpoint: endpoint,
};

export default config;