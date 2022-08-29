import { ConnectToCamera } from './ConnectToCamera.js';
import { SettingsCamera } from './SettingsCamera.js';

var CONFIG = {
    "id_main_table": "#tbody_info_files",                               //Таблица с информацией о файлах
    "id_image_wrapp": "#wrapper_img_from_camera"                        //Блок для отрисовки фотографии
}

const ID_PARENT_INFO_TABLE = "#tbody_info_file";
const ID_MODAL_CONFIRM_ACTION = "#exampleModalCenter";


var cameraObj = new ConnectToCamera();
var settingsCamera = new SettingsCamera();











const htmlForDropdownAction = (id) =>
{
    return `
    <div class="btn-group">
        <button type="button" class="btn btn-success">Действие</button>
        <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="visually-hidden">Переключатель выпадающего списка</span>
        </button>
        <ul class="dropdown-menu">
            <li>
                <a class="dropdown-item" href="#">
                    <button class="nav-link px-3 control_button btn btn-warning" id="${id}:del">del</button>
            
                </a>
            </li>
            <li>
                <a class="dropdown-item" href="#">
                    <button style="color:white" class="nav-link px-3 control_button btn btn-primary" id="${id}:get">get</button>
                </a>
            </li>
            <li><a class="dropdown-item" href="#">Что-то еще здесь</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Отделенная ссылка</a></li>
        </ul>
  </div>
    `
}

const sortInputData = (data) => {




}
//  <td><button class="nav-link px-3 control_button btn btn-warning" id="${img}:del">del</button></td>
// <td><button style="color:white" class="nav-link px-3 control_button btn btn-primary" id="${img}:get">get</button> </td>
//

let renderRowTableFileInfo = (parent, dict) => {                      //
    var img = dict.name;
    var path = dict.path;
    var image_dimensions = dict.info.image_dimensions;
    var image_type = dict.info.image_type;
    var file_mtime = dict.info.file_mtime;

    parent.prepend(` 
        <tr id='${fullNameToId(img)}'>
            <td> ${img} </td>
            <td> ${path} </td>
            <td> ${image_dimensions} </td>
            <td> ${image_type} </td>
            <td> ${file_mtime} </td>
          
            <td> ${htmlForDropdownAction(img)} </td>

        </tr> 
    `)
}

let addModalForBtn = (idBtn = "#settings_page", divModal = "#settings-path") => {
    $(idBtn).click((el) => {
        $(divModal).modal('toggle');
    })
    // $("settings-path")
} 





const renderImgByBase64 = (str) => {                              
    ////console.log(str);                                          
    $("img_panzoom").off()
    let image_preview = new Image();
    image_preview.src = `data:image/png;base64,${str.base64_photo}`;

    image_preview.width = 200;
    image_preview.height = 200;

    let imageFull = new Image();
    imageFull.id = "img_panzoom"
    imageFull.src = `data:image/png;base64,${str.base64_photo}`;

    imageFull.width = str.width;
    imageFull.height = str.height;
    // document.body.appendChild(image);
    // let elem = document.getElementById('wrapper_img_from_camera');
    // $("#wrapper_img_from_camera").empty();
    // $("#wrapper_img_from_camera").append(image);
    $("#full_img_container").empty();
    $("#full_img_container").prepend(imageFull);
    $("#prew_img").empty();
    $("#prew_img").append(image_preview);
    imageFull = null
    image_preview = null

    // $('#myModal').on('shown.bs.modal', function () {
    //     $('#myInput').trigger('focus')
    //   })


    let elem = document.getElementById('img_panzoom');

    addActionZoomBtn(elem);
    
    //panzoom.pan(10, 10)
    //panzoom.zoom(2, { animate: true })

    // const parent = elem.parentElement
    // // No function bind needed
    // parent.addEventListener('wheel', panzoom.zoomWithWheel)

    // // This demo binds to shift + wheel
    // parent.addEventListener('wheel', function(event) {
    // if (!event.shiftKey) return
    //     panzoom.zoomWithWheel(event)
    // })



    // Instantiate EasyZoom instances
    // var $easyzoom = $('.easyzoom').easyZoom();

    // // Get an instance API
    // var api = $easyzoom.data('easyZoom');





    // const myPanzoom = new Panzoom(document.querySelector("#wrapper_img_from_camera"), {
    //     "click" : true,
    // });
    //myPanzoom.toggleZoom();
    // //console.log(str);
    // elem.append(image);

};

const addActionZoomBtn = (elem) => {
    $("zoom_in_btn").off();                     //Удаляем старые события
    $("zoom_out_btn").off();
    $("reset_btn").off();
    $("range_input").off(); 
    //const panzoom = Panzoom(elem,  { contain: 'outside' });
    let panzoom = Panzoom(elem,  { contain: 'outside', startScale: -0.125 });
    

    let zoomInButton = document.getElementById("zoom_in_btn");
    let zoomOutButton = document.getElementById("zoom_out_btn");
    let resetButton = document.getElementById("reset_btn");
    let rangeInput = document.getElementById("range_input");


    zoomInButton.addEventListener('click', panzoom.zoomIn);
    zoomOutButton.addEventListener('click', panzoom.zoomOut);
    resetButton.addEventListener('click', panzoom.reset);
    rangeInput.addEventListener('input', (event) => {
        panzoom.zoom(event.target.valueAsNumber)
    });



    // $("#zoom_in_btn").one('click', panzoom.zoomIn)
    // $("#zoom_out_btn").one('click', panzoom.zoomOut)
    // $("#reset_btn").one('click', panzoom.reset)

}; 

const activePage = () => {
    $("#connect_to_camera").html("Активно");
    $("#connect_to_camera").css("background-color", "mediumspringgreen");
    $("#connect_to_camera").css("color", "purple");



};

const fullNameToId = (nameFile) => {
    let posFirstChar = nameFile.indexOf('_');
    let posSecondChar = nameFile.indexOf('.');
    let subStr = nameFile.substring(posFirstChar + 1, posSecondChar);
    return subStr;
}



const delRowByName = (nameFIle) => {

    let id = fullNameToId(nameFIle);
    let removeBlock = "#" + id;
   ////console.log($(removeBlock))
    $(removeBlock).remove();




}


const  callbackClickControlButton = (event) => {


    var [nameFile, typeAction] = event.target.id.split(":");
    ////console.log(nameFile + "::" + typeAction);

    switch (typeAction) {
        case "get":

            $('#exampleModalCenter').modal('toggle');
            
            
            $('#get_photo').click((test) => {
                let inputCoeffResize = $("#inputResizeImg").val();
                let inputCoeffCompress = $("#inputCoeffCompress").val();
                cameraObj.getImgByName(nameFile, renderImgByBase64, inputCoeffResize, inputCoeffCompress);
                ////console.log(nameFile);
                $('#get_photo').off();
                $('#exampleModalCenter').modal('toggle');
            });
            break;
        case "del":
            cameraObj.delFileByName(nameFile, delRowByName);
            break;
        default:
            break;
    }


};


const addImginfoToTable = (dict) => {
    var block = $("#tbody_info_files");
    renderRowTableFileInfo(block, dict);
    AddActionOnBtnControll();
}


const AddActionOnBtnControll = () => {
    let aButtons = $(".control_button");
    aButtons.off();
    aButtons.click(callbackClickControlButton);
}


const sync = (data) => {
    let el = renderMetadataAllFiles;
    el(data);
}

const renderModalBody = (data) => {


    let outputHtml = 0;


}
const replaceSpace = (str) => {
    
    // str = str.replace(/ /g, "_");
    // str = str.replace(/[()]/g, "");
    // //console.log(str)

    let resStr = str.slice(str.indexOf('('), str.indexOf(')'));
    // //console.log("start test");
    // //console.log(resStr);
    return str.slice(str.indexOf('(') + 1, str.indexOf(')'));
}



const renderMetadataAllFiles = (data) => {

    let outputHtm = "";
    var parent = $("#tbody_info_files");
    parent.empty();


    for (var img in data) {
        let tmp_obj = data[img];
        tmp_obj.name = img;
        renderRowTableFileInfo(parent, tmp_obj);
    }
    data = null;
    parent = null;
    AddActionOnBtnControll();

    

};
// "free_space_odroid" : {
//     "type" : 'byte',
//     "total" : disck_info.total,
//     "used" : disck_info.used,
// }
const GBYTES_TO_BYTES = 1073741824;

// const renderTabsHtml = (data) => {
//     let outputTabsHtml = `<ul class="nav nav-tabs" id="myTab" role="tablist">`;
//     let outputTabContentHtml = ""
    
//     let it = 0;
//     for (let key in data) {
//         outputTabContentHtml += `
//         <div class="tab-pane fade ${it == 0 ? "show active" : ""}" id="${replaceSpace(key)}" role="tabpanel" aria-labelledby="Camera Settings (settings)">
//             <h1>${(key)}</h1>
//         </div>`

//         outputTabsHtml += ` 
//         <li class="nav-item" role="presentation"> 
//             <button class="nav-link ${it == 0 ? "active" : ""}"" id="${it++}" data-bs-toggle="tab" data-bs-target="#${replaceSpace(key)}" type="button" role="tab" aria-controls="home" aria-selected="true">${key}</button>
//         </li>
//         `
//     }
//     outputTabsHtml += `</ul>>`;

//     return [outputTabsHtml, outputTabContentHtml];
  
// }

const getHtmlForm = (form) => {


}



const renderForm = (addingTabId, data) => {
    for (let key in data) {
        let htmlTabForm = "";
        for (let form in data[key]) {
            
            
        }
    }

}



const renderSettingsPage = (data) => {

    let settingsCamera = new SettingsCamera(data);
    settingsCamera.addForms();
  

}

const renderFilesysData = (data) => {
    let spaceCameraProcently = data["free_space_camera"];
    let usedSpaceOdroid = data["free_space_odroid"]["used"];
    let totalSpaceOdroid = data["free_space_odroid"]["total"];
    let usOdroidSpaceProc = usedSpaceOdroid / totalSpaceOdroid;

    let odroidBar = $("#info_space_odroid");
    let max = odroidBar.attr("max");

    odroidBar.val(max * usOdroidSpaceProc)

    let cameraBar = $("#info_space_camera");
    max = cameraBar.attr("max");


    $("#odroid_info").append(
        `
        <span class="progress-value"> Используется : ${(usedSpaceOdroid / GBYTES_TO_BYTES).toFixed(4)} ГБ </span>
        <span class="progress-value"> Всего : ${(totalSpaceOdroid / GBYTES_TO_BYTES).toFixed(4)} ГБ </span> 
        `
    )

    cameraBar.val(max * (spaceCameraProcently / 100));



}


function main() {




   

    addModalForBtn()


    $(document).ready(function () {
        $("#get_settings_camera").click(() => {
            //console.log("cache " + $.cache)
            //console.log($.cache)
            cameraObj.getCameraConfig(settingsCamera);
    
    
            // $("#modal-body").
    
            // $("#modal-header").generIn("")
            //console.log("test");
        });

        $("#get_info_filesys").click(() => {
            cameraObj.getInfoFilesys(renderFilesysData);
        });


        $("#config_btn").click(() => {
            cameraObj.getCameraConfig(renderTabsHtml);
        })



        $("#get_all_files").click(() => {
            //console.log("get_all_files");
            var data = cameraObj.getAllFiles(renderMetadataAllFiles);

            //console.log("end render____");


        });

        $("#refresh").click(() => {
            cameraObj.syncWithCamera(sync);


        })



        $("#reload_btn").click(() => {
            cameraObj.reloadCamera();
        })


        $("#connect_to_camera").click(() => {

            //console.log("connect_to_camera");
            cameraObj.init($('#ip_input').val());
            activePage();



        });



        // $("#get_all_files").click(() => {



        $("#capture").click(() => {
            cameraObj.capture(addImginfoToTable);
        });


        // const myModal = new HystModal({
        //     linkAttributeName: "data-hystmodal",
        //     // настройки (не обязательно), см. API
        // });

        
       




        $("#apply_settings").click(() => {
            var diff = settingsCamera.parseCurrSettings();

            //console.log("testrqw");
            $($("#confirmModal  div.modal-body")[0]).html(

            (function () {
                let resOutputHtml = '';
                let iter = 1;
                for (let key in diff) {
                    resOutputHtml += `<p> ${iter++}. Значение <strong> ${key} </strong> на <strong> ${diff[key]} </strong> </p>`;
                    
                }   
                return resOutputHtml;
            })());

            


            $("#confirmModalBtn").one('click', (el) => {
               // //console.log("diff_inner_confirm");
                cameraObj.changeSettingsCamera(diff, (el) => console.log(el));
                ////console.log(diff);




            });

          

            
           

            ////console.log("diff : ");
           
            //SettingsCamera.parseCurrSettings();


        })




    })



    // $('#exampleModalCenter').on('show.bs.modal', function (event) {
    //     var button = $(event.relatedTarget) // Button that triggered the modal
    //     var recipient = button.data('whatever') // Extract info from data-* attributes
    //     // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    //     // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    //     var modal = $(this)
    //     modal.find('.modal-title').text('New message to ' + recipient)
    //     modal.find('.modal-body input').val(recipient)
    //   })


}

main();
