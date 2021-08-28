function users() {
  get = function () {
    return axios.get('http://localhost:3000/monitors');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/monitors/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
