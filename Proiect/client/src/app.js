function run() {
    let indexComponent = new Vue({
        el: '#app',
        data: {
            monitors: [],
            monitorsService: null,
            message: ''
        },
        created: function () {
            this.monitorsService = Monitors();
            this.monitorsService.get().then(response => (this.monitors = response.data));
        },
        methods: {
            deleteMonitor: function(id) {
                console.log('HTTP DELETE spre backend, amp: ' + id);
                this.monitorsService.remove(id).then(response => {
                    this.monitorsService.get().then(response => (this.monitors = response.data));
                });
            },
        }
    });


}


document.addEventListener('DOMContentLoaded', () => {
    run();
});