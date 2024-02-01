const axios = require("axios");
import config from "./config";

axios
  .post(config.apiUrl + "/filter-accommodation", {
    filters: {
      name: "",
      address: "",
      location: "",
      type: "",
      priceFrom: "",
      priceTo: "",
      capacity: "",
    },
  })
  .then(function (response) {
    console.log(response.data);
    console.log(response.message);
    console.log(response.accommodations);
  })
  .catch(function (error) {
    console.log("Error!!!");
    console.log(error);
  });
