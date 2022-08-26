const development = {
  apiUrl: "http://localhost:3001/",
  redirectUrl: "http://localhost:3000/"
}

const production = {
  apiUrl: "https://feedify-me.herokuapp.com/",
  redirectUrl: "https://feedify-me.herokuapp.com/"
}

const envUrls = process.env.NODE_ENV === "production" ? production : development

export default envUrls
