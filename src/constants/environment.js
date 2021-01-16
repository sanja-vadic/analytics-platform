const common = {
   prodHost: "http://localhost:8080",
   prodApiBasePath: "/api",
   stageHost: "http://localhost:8080",
   stageApiBasePath: "/api",
   devHost: "https://run.mocky.io",
   devApiBasePath: "/v3"
}

const prod = {
   api: {
      authUrl: common.prodHost + common.prodApiBasePath + "/auth"
   }
}

const stage = {
   api: {
      authUrl: common.stageHost + common.stageApiBasePath + "/auth"
   }
}

const dev = {
   api: {
      authUrl: common.devHost + common.devApiBasePath + "/d9a98cab-2de7-4ed9-870f-873f25f3fe29"
   }
}

let exportConf = {};
if (process.env.REACT_APP_ENVIRONMENT === 'development') {
   exportConf = dev;
} else if (process.env.REACT_APP_ENVIRONMENT === 'production') {
   exportConf = prod;
} else if (process.env.REACT_APP_ENVIRONMENT === 'stage') {
   exportConf = stage;
}

export const config = exportConf;