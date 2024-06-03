import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjB4ZGVlcGFrIiwiaWQiOjEsImlhdCI6MTcxNzIzMzkxOH0.8vtSC3C6lAdbWKitZWd52OGYPnFQzdEe_3W6iIGDBHw'
    }
})

export default instance