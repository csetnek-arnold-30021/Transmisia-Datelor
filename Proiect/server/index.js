var api = require('./src/api.js').app;
const fs = require('fs');
const monitorsFilepath = './src/monitors.json';

api.get('/', function (request, response) {
    response.json('NodeJS REST API');
});

api.get('/monitors', function (request, response) {
    response.json(getMonitors());
});

api.get('/monitors/:id', function (request, response) {
    let monitor = getMonitorById(request.params.id);
    if (monitor) response.json(monitor);
    response.json('not found');
});

api.put('/monitors', function (request, response) {
    response.json(request.body);
    saveMonitor(request.body);

});

api.post('/monitors', function (request, response) {

    let monitors = [];
    try {
        monitors = JSON.parse(fs.readFileSync(monitorsFilepath, 'utf8'));
    } catch (err) {
        console.error(err);
        return false;
    }
    var selmonitor = getMonitorById(request.body.id)
    if (selmonitor != null) {
        var pos = 0;
        for (var i = 0; i < monitors.length; i++) {
            if (monitors[i].id == request.body.id) pos = i;
        }
        monitors[pos] = request.body;

    }
    var selmonitor = getMonitorById(request.body.id);
    if (selmonitor != null) { monitors[request.body.id - 1] = request.body };
    try {
        fs.writeFileSync(monitorsFilepath, JSON.stringify(monitors));// salvare json array in fisier
    } catch (err) {
        console.error(err)
    }




    // cautam daca exista indexul de pe request.body
    // daca exista actualizam parametrii acestui produs/item
    // salvam in fisier produsele actualizate
    response.json('Monitor was saved succesfully');
});

api.delete('/monitors/:index', function (request, response) {
    let monitors = [];
    try {
        monitors = JSON.parse(fs.readFileSync(monitorsFilepath, 'utf8'));
    } catch (err) {
        console.error(err);
        return false;
    }
    var oof = 0;
    for (var i = 0; i < monitors.length; i++) {
        if (monitors[i].id == request.params.index) oof = i;
    }
    monitors.splice(oof, 1);
    if (monitors == null) console.log();
    else {
        try {
            fs.writeFileSync(monitorsFilepath, JSON.stringify(monitors));// salvare json array in fisier
        } catch (err) {
            console.error(err)
        }
    }
    response.json('User with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
    console.log('Server running @ localhost:3000');
});

function getMonitors() {
    let monitors = [];
    try {
        monitors = JSON.parse(fs.readFileSync(monitorsFilepath, 'utf8'));
    } catch (err) {
        console.error(err);
        return false;
    }
    return monitors;
}

function saveMonitor(monitor) {
    let monitors = getMonitors();// citire json din fisier
    let maxId = getMaxId(monitors);
    monitor.id = maxId + 1;// generare id unic
    monitors.push(monitor);// adaugare masina noua in array
    try {
        fs.writeFileSync(monitorsFilepath, JSON.stringify(monitors));// salvare json array in fisier
    } catch (err) {
        console.error(err)
    }
}

function getMaxId(monitors) {
    let max = 0;
    for (var i = 0; i < monitors.length; i++) {
        if (max < monitors[i].id) {
            max = monitors[i].id;
        }
    }
    return max;
}

function getMonitorById(id) {
    let monitors = getMonitors();// citire json din fisier
    let selectedMonitor = null;
    for (var i = 0; i < monitors.length; i++) {
        if (id == monitors[i].id) selectedMonitor = monitors[i];
    }
    return selectedMonitor;
}
