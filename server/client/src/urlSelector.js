const developmentUrl = "http:/localhost:3000/"
const productionUrl = "https://feedify-me.herokuapp.com/"

const apiUrl = process.env.NODE_ENV === "production" ? productionUrl : developmentUrl

export default apiUrl
