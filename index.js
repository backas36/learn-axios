const todoApiUrl = "https://jsonplaceholder.typicode.com/todos";
const postApiUrl = "https://jsonplaceholder.typicode.com/posts";

// AXIOS GLOBALS
// 這樣 post 之後就會自己戴上這個 X-Auth-Token
axios.defaults.headers.common["X-Auth-Token"] =
  "jM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// GET REQUEST
function getTodos() {
  //axios({
  //  method: "get",
  //  url: "https://jsonplaceholder.typicode.com/todos",
  //  params: {
  //    _limit: 5,
  //  },
  //})
  //  .then((res) => showOutput(res))
  //  .catch((err) => console.log(err));
  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      parmas: { _limit: 5 },
    })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

// POST REQUEST
function addTodo() {
  axios
    .post(todoApiUrl, {
      title: "New One Todo",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios
    .put(todoApiUrl + "/1", {
      title: "Change to New One => updated",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete(todoApiUrl + "/1")
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios
    .all([axios.get(todoApiUrl), axios.get(postApiUrl)])
    //.then((res) => {
    //  console.log(res); // array
    //  showOutput(res[1]);
    //})
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch((err) => console.error(err));
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "sometoken",
    },
  };
  axios
    .post(
      todoApiUrl,
      {
        title: "New Todo with token",
        completed: false,
      },
      config
    )
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: "POST",
    url: todoApiUrl,
    data: {
      title: "hellow world",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };
  axios(options).then((res) => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  console.log("Error Handling");
  axios
    .get("https://jsonplaceholder.typicode.com/todoss")
    .then((res) => showOutput(res))
    .catch((err) => {
      if (err.response) {
        // server responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        if (err.response.status === 404) {
          alert("Error : Page not found");
        } else if (err.request) {
          // Request was made but no response
          console.error(err.request);
        } else {
          console.error(err.mesaage);
        }
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");
  const source = axios.CancelToken.source();

  axios
    .get(todoApiUrl, {
      cancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      }
    });

  if (true) {
    source.cancel("Request canceled");
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(config);
    console.log(
      `${config.method.toUpperCase()} request send to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// ✔️✔️
// AXIOS INSTANCES
const apiBase = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

apiBase.get("/comments").then((res) => showOutput(res));

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
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);

//https://www.youtube.com/watch?v=6LyagkoRWYA
