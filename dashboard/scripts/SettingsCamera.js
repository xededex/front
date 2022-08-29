export class SettingsCamera {
    
    bind = {};
    actualSettings = {};


    renderSettigsPage(data, tabsLinkId = "#md-header", tabsContentId = "#myTabContent") {
        let htmlTabs = this.renderTabsHtml(data);
        $("#md-header").html(htmlTabs[0]);
        $("#myTabContent").html(htmlTabs[1]);

        for (let key in data) {
            this.bind[replaceSpace(key)] = "";
            let htmlTabForm = "";
            for (let form in data[key]) {
                this.actualSettings[replaceSpace(form)] = data[key][form]["value"];

                this.bind[replaceSpace(key)] += this.parseTypeForm(data[key][form], form) ?? "";
                
            }
        }

        this.addForms();


    }


    constructor(data, tabsLinkId = "#md-header", tabsContentId = "#myTabContent") {
        //console.log("constructor settigs");
        
    }
    



    renderTabsHtml(data) {
        let outputTabsHtml = `<ul class="nav nav-tabs" id="myTab" role="tablist">`;
        let outputTabContentHtml = ""
        
        let it = 0;
        for (let key in data) {
            outputTabContentHtml += `
            <div class="tab-pane fade ${it == 0 ? "show active" : ""}" id="${replaceSpace(key)}" role="tabpanel" aria-labelledby="Camera Settings (settings)">
                <h1>${(key)}</h1>
            </div>`
    
            outputTabsHtml += ` 
            <li class="nav-item" role="presentation"> 
                <button class="nav-link ${it == 0 ? "active" : ""}"" id="${it++}" data-bs-toggle="tab" data-bs-target="#${replaceSpace(key)}" type="button" role="tab" aria-controls="home" aria-selected="true">${key}</button>
            </li>
            `
        }
        outputTabsHtml += `</ul>>`;
    
        return [outputTabsHtml, outputTabContentHtml];
      
    }




    parseCurrSettings() {

        let searchFormClass = [
            "input",
            "select",

        ];
        //let currSettings = {};
        let selectSettings = {};
        
        $("input, select", '.modal-content').each(function( index ) {
            let id = $(this).attr("id");
            if ($( this ).val() === null) {
                selectSettings[id] = 0;
            }
            else if ($(this).attr("type") == "checkbox") {
                //selectSettings[id] = $( this ).prop('checked') + 1;
                 
            } else {
                selectSettings[id] = $( this ).val();

            }
        });

        // //console.log("selectSettings");
        // //console.log(selectSettings);
        // //console.log("end ----- select Settings");


        // //console.log("actual settings");
        // //console.log(this.actualSettings);
        // //console.log("end ----------- actual settings");
        let changedSettings  = this.findСhangedInput(selectSettings);
        return changedSettings;
        //return currSettings;

    }





    addForms() {
        for (let id in this.bind) {
            $(`#${id}`).html(this.bind[id]);
            //console.log(this.bind[id]);
        }
        //console.log("addForms");
        
        //console.log(this.actualSettings)
    }



    parseTypeForm(form, nameForm) {
        if (form.type == "ToggleWidget") {
            return this.getFormToggle(form, nameForm);
        } 

        else if (form.type == "RangeWidget") {
            return this.getFormRange(form, nameForm);
        }

        else if (form.type == "TextWidget") {
            return this.getFormText(form, nameForm);
        }

        else if (form.type == "RadioWidget" || form.type == "MenuWidget") {
            return this.getFormMenu(form, nameForm);
        }
        else if (form.type == "Date") {
            return this.getFormDate(form, nameForm);
        }
        
        

    }

    
    addOptionTags(form) {
        let add_tags = ""
        add_tags += form.isReadOnly == 1 ? "disabled" : "";
        add_tags += form.value != 0 ? " checked " : "";
        return add_tags;
        // let str = form.isReadOnly == 1 ? "disabled" : ""
        // ${form.isReadOnly == 1 ? "disabled" : ""} ${form.value != 0 ? "checked" : ""
    }

    getFormToggle(form, nameForm) {
        let html = "";
        html += `<div class='input_toggle form-group row'>`;                                // <div class="form-check"> </div>  
        html += `
       
            
            <label class="col-form-label col-sm-4" for="${replaceSpace(nameForm)}">
                ${nameForm} :  
            </label>

            <div class="col-sm-8">
                <input class="form-check-input" type="checkbox" value="" id="${replaceSpace(nameForm)}" ${this.addOptionTags(form)}>
            </div>
        
        `;
        //console.log("test");
        //console.log(html);
        html += `</div>`;
        return html;
    }

    getFormDate(form, nameForm) {
        let html = "";
        form.value = this.timeConverter(form.value);
        return this.getFormText(form, nameForm);

        
    }

   


    timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        //var month = months[a.getMonth()];
        var month = a.getMonth()
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    
    }

    getFormRange(form, nameForm) {
        let html = "";
        html = "<div class='input_range form-group row'>";

        html += `
            <label for="${replaceSpace(nameForm)}" class="col-form-label col-sm-4">${nameForm}}</label>
            <div class="col-sm-8">
                <input type="range" class="form-range" value="${form.value}" min="${form.range[0]}" max="${form.range[1]}" step="${form.range[2]}" id="${replaceSpace(nameForm)}"  ${this.addOptionTags(form)}>
            </div>
                `;
        html += `</div>`;
        //console.log("test");
        //console.log(html);
        return html;
    }

    getFormText(form, nameForm) {
        let html = "<div class='input_text form-group row'>";
        html += `<label for="${replaceSpace(nameForm)}" class="col-form-label col-sm-4">${nameForm}</label>`;
        html += `
        <div class="col-sm-8">
            <input class="form-control" type="text" value="${form.value}" placeholder="Disabled input" id="${replaceSpace(nameForm)}" aria-label="Disabled input example" ${this.addOptionTags(form)}></input>
        </div>
        
            `
        html += `</div>`
        //console.log("test");
        //console.log(html);
        return html;
    }


    findСhangedInput(allSelectedInput) {
        let changedInput = {};

        for (let key in allSelectedInput) {
            if (key == "datetime" || key == "flashexposurecompensation" || key == "thumbsize") {
                continue;
            }
            if (allSelectedInput[key] != this.actualSettings[key] && this.actualSettings[key] != undefined) {
                //console.log("test12");
                //console.log(key + " : " + allSelectedInput[key] + " : " + this.actualSettings[key]);
                
                changedInput[key] = allSelectedInput[key];
                
            }
        }


        //console.log(changedInput);
        return changedInput;

    }

    
    
    getFormMenu(form, nameForm) {
        let html = `<div class="input_menu form-group row">`;
        html += `<label for="${replaceSpace(nameForm)}" class="col-form-label col-sm-4">${nameForm}</label>`;
        html += `
        <div class="col-sm-8">
            <select id="${replaceSpace(nameForm)}" class="form-select" value=${form.value} aria-label="Default select example"> ${this.addOptionTags(form)}`;
        form.choice.forEach(choice => {
            if (choice == form.value) {
                html += `<option selected> ${choice} </option>`;
            } else {
                html += `<option value="${choice}">${choice}</option>`;
            }
        }); 

        html += `</select>`;
        html += `</div>`;
        html += `</div>`;
        //console.log("test");
        //console.log(html);
        return html;
    }


}




const replaceSpace = (str) => {
    
    // str = str.replace(/ /g, "_");
    // str = str.replace(/[()]/g, "");
    // //console.log(str)

    let resStr = str.slice(str.indexOf('('), str.indexOf(')'));
    //console.log("start test");
    //console.log(resStr);
    return str.slice(str.indexOf('(') + 1, str.indexOf(')'));
}