
export class ConnectToCamera {


    ConnectToCamera() {
        console.log("constr");

    }


    sync() {
        
    }

    getCameraConfig(objSettings) {
        let endpointConfig= this.__makeUrl(["getsettings"]);
        this.objSettings = objSettings;


        this.__executeAjax(endpointConfig, (data) => objSettings.renderSettigsPage(data));
    }

    

    

    reloadCamera(callback) {
        let endpoint_reload = this.__makeUrl(["put", "reload"]);

        this.__executeAjax(endpoint_reload, (data) => console.log(data));
    }


    init(ipStr) {
        this.endpoint = ipStr
        this.__localSaveData = null;
        this.condition = null;
        this.localFiles = {};
        this.currImg = null;
        this.rootUrlApi = "api";
      
        this.successInitCamera = null;
        
        
        this.__executeAjax(this.__makeUrl("login"), (data) => {
            console.log(this);
            console.log(data);
            this.successInitCamera = true;
        })
    }




    getImgByName(nameFIle, callback, coeff = 10, coefCompress = 100) {

        let url = this.__makeUrl(["get", nameFIle]);
        
        this.__executeAjax(url, callback, {
            "сoeff" : coeff,                                            // коэффициент ресайза
            "coeff_compress" : coefCompress,
        });
    }



    delFileByName(nameFIle, callback) {

        let endpoint_del = this.__makeUrl(["del", nameFIle]);
        this.__executeAjax(endpoint_del, callback(nameFIle))


        console.log("delFileByNAme");
    }



    capture(callback) {
        let urlForCapture = this.__makeUrl("capture");
        this.__executeAjax(urlForCapture, callback);
    }

    

    __executeAjaxPromise(url, data) {
        return new Promise((succeed, fail) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.addEventListener("load", () => {
                if (xhr.status >=200 && xhr.status < 400)
                    succeed(xhr.response);
                else
                    fail(new Error(`Request failed: ${xhr.statusText}`));
            });
            xhr.addEventListener("error", () => fail(new Error("Network error")));
            xhr.send(data);
      
      
        })};





    __executeAjax(url, fnc_succes, params = null, _method = 'get') {
        console.log(url);


        $.ajax({

            url: url,

            //url: 'http://127.0.0.1:8000/api/login/',         /* Куда пойдет запрос */

            method: _method,             /* Метод передачи (post или get) */

            dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
            data: {
                params,
            },

            success: fnc_succes

        });


    };


    
    syncWithCamera(callback) {
        let endpoint_api = this.__makeUrl("refresh");
        this.__executeAjax(endpoint_api, callback)
    };


    changeSettingsCamera(diff, callback) {
        
        let endpEditSettings = this.__makeUrl(["post", "settings"]);
        this.__executeAjax(endpEditSettings, (data) => console.log(data), 
        {
            "changedData" : diff,
        }, 'post');


        console.log(diff);

    }



    __makeUrl(add) {
        //return `${this.ip}:${this.port}/${root}/${add}`;
        var outputStr = "http://" + this.endpoint + "/" + this.rootUrlApi;
        if (Array.isArray(add)) {
            add.forEach(el => {
                outputStr += "/" + el ;
            });
        } else {
            outputStr += "/" + add;
        }

        

        return outputStr;
    };


    getInfoFilesys(callback) {
        let endpoint_sys = this.__makeUrl(["get", "infosys"]);
        this.__executeAjax(endpoint_sys, callback);
    };


    getAllFiles(callback) {
        let endpointUrl = this.__makeUrl(["get", "all"]);
        this.__executeAjax(endpointUrl, callback)

        //return this.__localSaveData;

    };

}



