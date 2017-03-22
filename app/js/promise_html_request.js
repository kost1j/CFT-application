function httpGet(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
            if (this.status = 200) {
                resolve(JSON.parse(xhr.responseText));
            }else{
                reject("Ошибка данных");
            }
        };

        xhr.onerror = function() {
            reject("Network Error");
        };

        xhr.send();
    });

};
