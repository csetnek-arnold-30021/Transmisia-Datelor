function run() {
    new Vue({
      el: '#add',
      data: {
        id: 'default',
        monitor: {}
      },
      created: function () {
      },
      methods: {
        addMonitor: function() {

            this.monitor={"id": 0,
            "name": document.getElementById("name").value,
            "diagonal": document.getElementById("diagonal").value,
            "color": document.getElementById("color").value,
            "weight": document.getElementById("weight").value,
            "description": document.getElementById("description").value,
            "year": document.getElementById("year").value,
            "price": document.getElementById("price").value;
            
            return axios.put('http://localhost:3000/monitors', this.monitor).then(
               (response) => {
                    this.message = response.data;
                    console.log(this.message); // saved
                }
            );      
            
          },
        }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  