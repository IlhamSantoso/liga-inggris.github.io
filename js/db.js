const idbPromised = idb.open('ligaInggris', 1, upgradedDb => {
    if (!upgradedDb.objectStoreNames.contains('teams')) {
        upgradedDb.createObjectStore("teams", {keyPath: "id", autoIncrement: true});
    }
});

function saveForLater(teams) {
    idbPromised
        .then( db => {
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            store.add(teams);
            return tx.complete;
        })
        .then( () => {
            alert("Data berhasil disimpan");
        })
        .catch(error =>{
            alert("Data sudah ada");
        });
}

function getAll() {
    return new Promise((resolve, reject) =>{
        idbPromised
            .then(db => {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(teams => {
                resolve(teams);
            });
    });
}

function getById(id) {
    const idParm = parseInt(id);
    return new Promise((resolve, reject) => {
        idbPromised
            .then(db => {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams").get(idParm);
                return store;
            })
            .then(team => {
                resolve(team);
            });
    });
}

function deleteById(id) {
    const idParm = parseInt(id);
    return new Promise((resolve, reject) => {
        idbPromised
            .then(db => {
                let tx = db.transaction("teams", "readwrite");
                let store = tx.objectStore("teams").delete(idParm);
                return store;
            })
            .then(team => {
                resolve(team);
            });
    });
}

