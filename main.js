// AXIOS GLOBALS (replaces 'custom headers' in line 147 in the case of multiple protective routes )
axios.defaults.headers.common["X-Auth-Token"] =
  // json web token from jwt.io
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

////////////////////////////////////////////////////////////////

/* *  GET REQUEST (involves getting data from an API)
 * two ways to GET REQUEST ;
 */
function getTodos() {
  /* * First way

  axios({
    * specify the method
    method: "get",

    * API Url
    url: "https://jsonplaceholder.typicode.com/todos",
    params: {
      * limits to access the first five (5) data
      _limit: 5,
    }
  })
    * gives a promise and a response (res). to access just our data, (res.data)
    * using the showOutput function (line 198) to make the api accessible to the html.
    .then((res) => showOutput(res))

    * catch errors if something goes wrong
    .catch((err) => console.error(err));
*/
  ///////                                 ///////////////////

  /* * Second Way (most preferred way) */

  axios
    /**specify the method(which is 'get') and the API Url */
    // limits to access the first five (5) data
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5", {
      // max time to get data
      timeout: 5000, // 5 seconds
    })
    /** gives a promise and a response (res). to access just our data, (res.data)
     * using the showOutput function (line 198) to make the api accessible to the html.
     */
    .then((res) => showOutput(res))
    // catch errors if something goes wrong
    .catch((err) => console.error(err));
}

/**
 * Note: some APIs only use the get method.
 * below is an example;
  https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&outputsize=compact&apikey=apiKEy
 */

/////////////////////////////////////////////////////////////////////

// POST REQUEST (involves sending data)
function addTodo() {
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      // from the data received in the get request
      userId: 1,
      id: 1,
      title: "New Todo",
      completed: false,
    })
    // returns a promise to the client side
    .then((res) => showOutput(res))
    // catch errors if something goes wrong
    .catch((err) => console.error(err));
}

//////////////////////////////////////////////////////////////////////

// PUT REQUEST (involves updating data and replacing the entire updated data)
function updatePutTodo() {
  axios
    // include the id of the data to be updated in the url. in this case its id '1'
    .put("https://jsonplaceholder.typicode.com/todos/1", {
      // data to update and the actual update in id '1'
      title: "Updated Todo",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

////////////////////////////////////////////////////////////////////////

// PATCH REQUEST (involves just updating data)
function updatePatchTodo() {
  axios
    // include the id of the data to be updated in the url. in this case its id '1'
    .patch("https://jsonplaceholder.typicode.com/todos/1", {
      // data to update and the actual update in id '1'
      title: "Updated Todo",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

//////////////////////////////////////////////////////////////////////

// DELETE REQUEST (deletes data)
function removeTodo() {
  axios
    // we pass in the id (after the API url) to indicate which data to delete
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    // this will return an empty object because the data is deleted
    .then((res) => showOutput(res))
    // catch errors if something goes wrong
    .catch((err) => console.error(err));
}

//////////////////////////////////////////////////////////////////

// SIMULTANEOUS DATA (making SIMULTANEOUS requests / getting SIMULTANEOUS data)
function getData() {
  axios
    /** say we want to SIMULTANEOUSLY mix 'todos' and 'posts' data,
     * axios.all takes in all the requests ('todos' and 'posts') in an array,
      and once all those requests / promises are fulfilled,
      we get our response and handle it.
  */
    .all([
      // this will get 'todos'
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])

    /** instead of using ;
     *
     .then((res)=>{
      showOutput(res[0]);
      showOutput(res[1]);
     })
     we can use 'axios.spread()' to give these variables more descriptive names
     * we can use only one variable in 'showOutput' parameter. here, we use 'posts'
     */
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch((err) => console.error(err));
}

//////////////////////////////////////////////////////////////////////

// CUSTOM HEADERS (send custom headers)
// say you have to be logged in to create a post
function customHeaders() {
  const config = {
    headers: {
      // type of data we sending
      "Content-Type": "application/json",
      // Authorization token
      Authorization: "sometoken",
    },
  };
  // here, we use axios.post
  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New Todo",
        completed: false,
      },
      config
    )
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

///////////////////////////////////////////////////////////////////

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello World",
    },
    // take the default transform response and add to it instead of overriding it.
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      // say we want to transform the just above title to uppercase.
      data.title = data.title.toUpperCase();
      return data;
    }),
  };

  axios(options).then((res) => showOutput(res));
}

//////////////////////////////////////////////////////////////

// ERROR HANDLING
function errorHandling() {
  axios
    .get("https://jsonplaceholder.typicode.com/todoss", {
      // limiting your catch to a certain statusCode
      // validateStatus: function(status) {
      //   return status < 500; // Reject only if status is greater or equal to 500
      // }
    })
    .then((res) => showOutput(res))
    .catch((err) => {
      // Server responded with a status other than 200 range
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if (err.response.status === 404) {
          alert("Error: Page Not Found");
        }
        // Request was made but no response
      } else if (err.request) {
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
}
//////////////////////////////////////////////////////

// CANCEL TOKEN / REQUEST (cancel requests on the go)
function cancelToken() {
  // observe the uppercase C in 'CancelToken'
  const source = axios.CancelToken.source();

  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      }
    });

  if (true) {
    source.cancel("Request canceled!");
  }
}
///////////////////////////////////////////////////////////////
// INTERCEPTING REQUESTS & RESPONSES
// this shows and updates us about events in the console
axios.interceptors.request.use(
  (config) => {
    console.log(
      `The ${config.method.toUpperCase()} Method don send request to ${
        config.url
      } at ${new Date().toGMTString()}, you dig?!`
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

///////////////////////////////////////////////////////////////

// AXIOS INSTANCE
const axiosInstance = axios.create({
  // Other custom settings
  baseURL: "https://jsonplaceholder.typicode.com",
});
// say we want to get comments
// axiosInstance.get('/comments').then(res => showOutput(res));

////////////////////////////////////////////////////////////////

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("updatePut").addEventListener("click", updatePutTodo);
document
  .getElementById("updatePatch")
  .addEventListener("click", updatePatchTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
