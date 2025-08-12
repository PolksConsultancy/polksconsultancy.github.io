
document.writeln('<script src="ZohoEmbededAppSDK.js?v=2"></script>'); document.writeln('<script src="encodeLib.js?v=6"></script>');
var ZOHOCRM = {

    recordIds: [],
    module: "",
    ButtonPosition: "",
    currentRecords: [],

    istemplateModule: false,
    isBulk: false,

    phoneRecord: "",

    moduleFields: "",
    userFields: "",
    historyFields: "",
    selectedUser: "",
    users: [],
    currentUser: null,

    templateModule: "",
    templateRecordId: "",
    templates: {},

    isScheduled: false,
    scheduledTime: "",

    extensionTemplate: "",

    init: async function() {
        if(ZOHOCRM && ZOHOCRM.recordIds && ZOHOCRM.module) {
            if(ZOHOCRM.SET) {
                ZOHOCRM.SET();
            }
        }
        else {
            await ZOHO.embeddedApp.on("PageLoad", async function(record) {
                ZOHOCRM.recordIds = record.EntityId;
                ZOHOCRM.module = record.Entity;
                ZOHOCRM.ButtonPosition = record.ButtonPosition;
                if(ZOHOCRM.SET) {
                    ZOHOCRM.SET();
                }
            });
        }
    },
    getZAPIURL: async function(extensionInvokeAPI) {

        ZOHOCRM.extensionInvokeAPI = extensionInvokeAPI ? extensionInvokeAPI : SMS.extensionInvokeAPI ? SMS.extensionInvokeAPI : "";
        let urlParams = new URLSearchParams(window.location.search);
        let serviceOrigin = urlParams.get('serviceOrigin');
    
        let getmap = {"nameSpace":"<portal_name.extension_namespace>"};
        let resp = await ZOHO.CRM.CONNECTOR.invokeAPI("crm.zapikey",getmap);
        let zapikey = JSON.parse(resp).response;
        let domain = "com";
        if(serviceOrigin.indexOf(".zoho.") != -1){
            domain = serviceOrigin.substring(serviceOrigin.indexOf(".zoho.")+6);
        }
        return `https://platform.zoho.${domain}/crm/v2/functions/${ZOHOCRM.extensionInvokeAPI}/actions/execute?auth_type=apikey&zapikey=${zapikey}`;
    
    },
    getOrgVariable: async function(entity) {
        return await ZOHO.CRM.API.getOrgVariable(entity).then(function(apiKeyData){
            if(apiKeyData && apiKeyData.Success && apiKeyData.Success.Content && apiKeyData.Success.Content != "0"){
                return JSON.parse(apiKeyData.Success.Content);
            }
            else {
                return {};
            }
        }).catch(function(err) {
            console.log(err);
            return {};
        });
    },
    currentPageLink: async function(recordId="") {
        
        let urlParams = new URLSearchParams(window.location.search);
        let serviceOrigin = urlParams.get('serviceOrigin');
    
        let orgInfo = await ZOHO.CRM.CONFIG.getOrgInfo();
        let orgId = "";
        if(orgInfo && orgInfo.org && orgInfo.org[0] && orgInfo.org[0].zgid) {
            orgId = orgInfo.org[0].zgid;
        }

        let domain = "com";
        if(serviceOrigin.indexOf(".zoho.") != -1){
            domain = serviceOrigin.substring(serviceOrigin.indexOf(".zoho.")+6);
        }
        return `https://crm.zoho.${domain}/crm/org${orgId}/tab/${ZOHOCRM.module}/${recordId}`;
    },
    setOrgVariable: async function(entity, value) {
        return await ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", {"apiname": entity, "value": value}).then(function(res) {
            if(res && JSON.parse(res) && JSON.parse(res).status_code && JSON.parse(res).status_code == "200"){
                return true;
            }
            else {
                return false;
            }
        }).catch(function(err) {
            console.log(err);
            return false;
        });
    },
    executeFunction: async function(extensionInvokeAPI, requestData) {
        return await ZOHO.CRM.FUNCTIONS.execute(extensionInvokeAPI, requestData).then(function(data){
            if(data && data.details && data.details.output && JSON.parse(data.details.output)) {
                return JSON.parse(data.details.output);
            }
            else {
                return "";
            }
        }).catch(function(err) {
            console.log(err);
            return "";
        });
    },
    zohoHttpRequest: async function(method, request) {
        if(method == 'get') {
            return await ZOHO.CRM.HTTP.get(request).then(function(resp) {
                if(resp.includes('{') && resp.includes('}')) {
                    resp = JSON.parse(resp); 
                }
                return resp;
                
            },function(err) {
                console.log(err);
                return null;
            });
        }
        else if(method == 'post') {
            return await ZOHO.CRM.HTTP.post(request).then(function(resp) {
                if(resp.includes('{') && resp.includes('}')) {
                    resp = JSON.parse(resp);
                }
                return resp;
                
            },function(err) {
                console.log(err);
                return null;
            });
        }
        else if(method == 'put') {
            return await ZOHO.CRM.HTTP.put(request).then(function(resp) {
                if(resp.includes('{') && resp.includes('}')) {
                    resp = JSON.parse(resp);
                }
                return resp;
                
            },function(err) {
                console.log(err);
                return null;
            });
        }
        else if(method == 'patch') {
            return await ZOHO.CRM.HTTP.patch(request).then(function(resp) {
                if(resp.includes('{') && resp.includes('}')) {
                    resp = JSON.parse(resp);
                }
                return resp;
                
            },function(err) {
                console.log(err);
                return null;
            });
        }
        else if(method == 'delete') {
            return await ZOHO.CRM.HTTP.delete(request).then(function(resp) {
                if(resp.includes('{') && resp.includes('}')) {
                    resp = JSON.parse(resp); 
                }
                return resp;
                
            },function(err) {
                console.log(err);
                return null;
            });
        }
    },
    popupSize: function(width, height) {
        ZOHO.CRM.UI.Resize({height:height,width:width}).then(function(data){
            /* console.log(data); */
        });
    },
    popupClose: async function() {
        await ZOHO.CRM.UI.Popup.closeReload();
    },
    getModules: async function() {
        return await ZOHO.CRM.META.getModules().then(async function(data){
            return data.modules;        
        }).catch(function(err) {
            console.log(err);
            return "";
        });
    },
    getFields: async function(entity) {
        if(!entity) {
            return "";
        }
        return await ZOHO.CRM.META.getFields({"Entity":entity}).then(function(fields) {
            if(fields && fields.fields) {
                return fields.fields;
            }
            else {
                return "";
            }
        }).catch(function(err) {
            console.log(err);
            return "";
        });
    },    
    getRecord: async function(entity, recordIds) {
        return await ZOHO.CRM.API.getRecord({Entity:entity,RecordID:recordIds}).then(function(data){
            return data;
        }).catch(function(err) {
            console.log(err);
            return "";
        });
    },
    mandatoryField: async function(entity) {
        return await ZOHO.CRM.API.insertRecord({Entity: entity, APIData: {"_":""}}).catch(function(err) {
            if(err && err.data && err.data.length && err.data[0].details && err.data[0].details.api_name) {
                return err.data[0].details.api_name;
            }
            else {
                return "";
            }
        }).catch(function(err) {
            console.log(err);
            return "";
        });
    },  
    createRecord: async function(entity, reqData) {
        return await ZOHO.CRM.API.insertRecord({Entity:entity,APIData:reqData,Trigger:["workflow","approval","blueprint"]}).then(function(response) {
            let responseInfo	= response.data[0];
            let resCode			= responseInfo.code;
            if(resCode == 'SUCCESS'){
                return responseInfo.details.id;
            }
            else{
                return false;
            }
        }).catch(function(err) {
            console.log(err);
            return false;
        });
    },    
    updateRecord: async function(entity, reqData) {
        return await ZOHO.CRM.API.updateRecord({Entity:entity,APIData:reqData,Trigger:["workflow","approval","blueprint"]}).then(function(response) {
            let responseInfo	= response.data[0];
            let resCode			= responseInfo.code;
            if(resCode == 'SUCCESS'){
                return responseInfo.details.id;
            }
            else{
                return false;
            }
        }).catch(function(err) {
            console.log(err);
            return false;
        });
    },    
    searchRecord: async function(entity, query, type="criteria") {
        return await ZOHO.CRM.API.searchRecord({Entity:entity,Type:type,Query:query,delay:"false"}).then(function(response) {
            return response.data;
        }).catch(function(err) {
            console.log(err);
            return "";
        });
    },
    currentUserGet: async function() {
        return await ZOHO.CRM.CONFIG.getCurrentUser().then(function(data) {
            return data.users[0].id;
        }).catch(function(err) {
            console.log(err);
            return "";
        });
    },
    getAllUsers: async function() {
        return await ZOHO.CRM.API.getAllUsers({Type:"AllUsers"}).then(async function(data) {
            return data.users;
        }).catch(function(err) {
            console.log(err);
            return "";
        });
    },
    isAuthorizedToConnector: async function(extensionConnector) {        
        try {
            return await ZOHO.CRM.CONNECTOR.isConnectorAuthorized(extensionConnector).then(function(data) {
                if(data && data != "true") {
                    APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
                    return false;
                }
                else
                return true;
        
            }).catch(function(err) {
                console.log(err);
                APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
            });
        }
        catch(err) {
            console.log(err);
            APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
        }
    },
    authorizeToConnector: async function(extensionConnector) {        
        try {
            return await ZOHO.CRM.CONNECTOR.authorize(extensionConnector).then(function(data) {
                if(data && data != "true") {
                    APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
                    return false;
                }
                else {
                    APP.init();
                    return true;
                }
            }).catch(function(err) {
                console.log(err);
                APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
            });
        }
        catch(err) {
            console.log(err);
            APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
        }
    },
    revokeAuthorizedToConnector: async function(extensionConnector, afterRevokeFunction) {
        try {
            return await ZOHO.CRM.CONNECTOR.revokeConnector(extensionConnector).then(function(data) {
                if(data && data != "true") {
                    APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
                    return false;
                }
                else {
                    APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
                    return true;
                }
                
            }).catch(function(err) {
                console.log(err);
                APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
            });
        }
        catch(err) {
            console.log(err);
            APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
        }
    },
    newAuthorizeToConnector: async function(extensionConnector) {
        APP.BODY.html(encodeLib.loader({id: "loader", position: "absolute", backgroundColor: "white", zIndex: "10000", top: "0", left: "0"}));
        setTimeout(function() {
            APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
        }, 3000);
        return await ZOHOCRM.authorizeToConnector(extensionConnector);
    },
    invokeConnector: async function(extensionConnector, ApiName, body) {
        try {
            return await ZOHO.CRM.CONNECTOR.invokeAPI(extensionConnector+"."+ApiName, body).then(function(data) {
                if(data && data.response)
                return JSON.parse(data.response);
                else {
                    APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
                    return false;
                }
            }).catch(function(err) {
                console.log(err);
                APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
            });
        }
        catch(err) {
            console.log(err);
            APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
        }
    },
    invokeConnectorNotJson: async function(extensionConnector, ApiName, body) {
        try {
            return await ZOHO.CRM.CONNECTOR.invokeAPI(extensionConnector+"."+ApiName, body).then(function(data) {
                if(data && data.response)
                return data.response;
                else {
                    APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
                    return false;
                }
            }).catch(function(err) {
                console.log(err);
                APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
            });
        }
        catch(err) {
            console.log(err);
            APP.BODY.html(encodeLib.unAuthorizedBodyContent(`ZOHOCRM.newAuthorizeToConnector('${extensionConnector}');`));
        }
    },
    unAuthorizedBodyContent: async function(runFunction) {
        if(!$(".unAuthorizedDiv").length) {
            $("body").html(`<div class="unAuthorizedDiv">
                                <div class="unAuthorized" onclick="${runFunction}">Authorize</div>
                            </div>`);
        }
    },
    SET: async function() {
        ZOHOCRM.extensionTemplate = SMS.extensionTemplate ? SMS.extensionTemplate : "";
        ZOHOCRM.extensionHistory = SMS.extensionHistory ? SMS.extensionHistory : "";
        ZOHOCRM.extensionFieldModule = SMS.extensionFieldModule ? SMS.extensionFieldModule : "";
        ZOHOCRM.extensionFieldName = SMS.extensionFieldName ? SMS.extensionFieldName : "";
        ZOHOCRM.extensionFieldMessage = SMS.extensionFieldMessage ? SMS.extensionFieldMessage : "";
        ZOHOCRM.msgTextMaxLength = SMS.msgTextMaxLength ? SMS.msgTextMaxLength : "";
        ZOHOCRM.SMS_credentialSet = SMS.SEND.credentialSet ? SMS.SEND.credentialSet : "";
        ZOHOCRM.SEND_ACTION = SMS.SEND_ACTION ? SMS.SEND_ACTION : "";
        ZOHOCRM.loader = SMS.loader ? SMS.loader : "";
        ZOHOCRM.BODY = SMS.BODY ? SMS.BODY : encodeLib.BODY;
        ZOHOCRM.HTML = SMS.HTML ? SMS.HTML : encodeLib.HTML;
        ZOHOCRM.popupHeight = SMS.popupHeight ? SMS.popupHeight : 610;
        if(ZOHOCRM.module != ZOHOCRM.extensionTemplate && !ZOHOCRM.module.includes('CustomModule')) {
            ZOHOCRM.istemplateModule = false;
            ZOHOCRM.popupSize(800, ZOHOCRM.popupHeight);
            if(ZOHOCRM.ButtonPosition == "DetailView" || ZOHOCRM.ButtonPosition == "ListViewEachRecord") {
                ZOHOCRM.isBulk = false;
            }
            else {
                ZOHOCRM.isBulk = true;
            }
            await ZOHOCRM.Build();
        }
        else {    
            ZOHOCRM.istemplateModule = true;
            ZOHOCRM.popupSize(700, 540);
            if(ZOHOCRM.ButtonPosition == 'ListView' || ZOHOCRM.ButtonPosition == 'ListViewWithoutRecord') {
                ZOHOCRM.templateRecordId = "";
            }
            else if(typeof(ZOHOCRM.recordIds) == 'string') {
                ZOHOCRM.templateRecordId = ZOHOCRM.recordIds;
            }
            else {
                ZOHOCRM.templateRecordId = ZOHOCRM.recordIds[0];
            }
            await ZOHOCRM.templatePopup();
            if(ZOHOCRM.ButtonPosition == "DetailView" || ZOHOCRM.ButtonPosition == "ListViewEachRecord" || ZOHOCRM.ButtonPosition == "EditView"){
                ZOHOCRM.getRecord(ZOHOCRM.extensionTemplate, ZOHOCRM.templateRecordId).then(function(data){
                    data = data.data[0];
                    ZOHOCRM.templateModuleList.find(`.option[optionValue=${data[ZOHOCRM.extensionFieldModule]}]`).click();                        
                    ZOHOCRM.templateName.val(encodeLib.safeString(data[ZOHOCRM.extensionFieldName])).focus();
                    ZOHOCRM.templateMessage.val(encodeLib.safeString(data[ZOHOCRM.extensionFieldMessage]));
                    ZOHOCRM.loader.remove();
                });
            }
        }
    },
    Build: async function() {
        await ZOHO.CRM.API.getAllUsers({Type:"AllUsers"}).then(async function(data) {
            ZOHOCRM.users = data.users;
            await ZOHOCRM.currentUserGet().then(async function(currentLoginUser) {
                ZOHOCRM.currentUser = currentLoginUser;	/* currentUser */
                await ZOHOCRM.getFields('Users').then(async function(ufields) {
                    ZOHOCRM.userFields = ufields; /* userFields */
                    await ZOHOCRM.getFields(ZOHOCRM.module).then(async function(mFields){
                        ZOHOCRM.moduleFields = mFields;	/* moduleFields */
                        await ZOHOCRM.getFields(ZOHOCRM.extensionHistory).then(async function(hfields) {
                            ZOHOCRM.historyFields = hfields;
                            await ZOHOCRM.getRecord(ZOHOCRM.module, ZOHOCRM.recordIds).then(async function(record) {
                                ZOHOCRM.currentRecords = record.data;
                                ZOHOCRM.loader.remove();
                                ZOHOCRM.SMS_credentialSet();

                                await ZOHOCRM.selectModule(ZOHOCRM.currentRecords[0]);
                                let moduleFieldsDrop = await ZOHOCRM.moduleFieldListSetup("Insert "+ZOHOCRM.module+" Fields", ZOHOCRM.insertModuleFields, "moduleFields");
                                let userFieldsDrop = await ZOHOCRM.moduleUserFieldListSetup();
                                let templatesDrop = await ZOHOCRM.templateListSetup();
                                let messageLabels = templatesDrop+userFieldsDrop+moduleFieldsDrop;
                                let messageLabelsEelement = encodeLib.content({content: messageLabels, class: "messageLabels", positionX: "end", contentFitX: "100%", direction: "row", overflow: "unset", innerOverflow: "unset"});
                                await encodeLib.insert(ZOHOCRM.BODY, ZOHOCRM.messageTextareaLabelsSetup("Message", messageLabelsEelement, "message"), {addOn: "append"});                    
                                ZOHOCRM.MESSAGE = $("#message");
                                ZOHOCRM.MESSAGE_ERROR = $("#messageError");
                                ZOHOCRM.messageOuter = $("#messageOuter");
                                if($("#templates").length) {
                                    ZOHOCRM.TemplateList = $("#templates");
                                }

                                $('.selectedOwnerUser').click();
                    
                                let sendButtonObject = {
                                    id: "sendButton",
                                    content: "Send",
                                    margin: "0 0 0 8px",
                                    fontFamily: "'Roboto', sans-serif",
                                    innerPadding: "1px 20px 0",
                                    onclick: {
                                        thisElement: true,
                                        functionName: ZOHOCRM.SEND_ACTION
                                    }
                                }; 
                     
                                let sendButton = encodeLib.button(sendButtonObject);
                    
                                let buttonsDiv = encodeLib.content({id: "sendButtonDiv", content: sendButton, direction: "row", contentFitX: "100%", height: "65px", positionY: "center", positionX: "end", overflow: "unset", innerOverflow: "unset"});
                                encodeLib.insert(ZOHOCRM.BODY, buttonsDiv, {addOn: "append"});
                                ZOHOCRM.SEND_BUTTON = $("#sendButtonDiv");

                                let checkboxObject = {
                                    checkbox: {
                                        id: "",
                                        checkboxBorderRadius: "3px",
                                        checkboxPadding: "1px",
                                        checkboxSvgSize: "17px",
                                        checkboxClickCursor: "pointer",
                                        checkOutFunction: "ZOHOCRM.scheduleCheckboxOutFunction",
                                        checkInFunction: "ZOHOCRM.scheduleCheckboxInFunction",
                                        checkboxName: "Schedule",
                                        checkboxNameColor: "#0000008c",
                                        checkboxNamePadding: "2px 0 0 8px",
                                        checkboxNameMargin: "0 10px 0 0",
                                        checkboxContent: encodeLib.input({type: "datetime-local", minDate: new Date(), width: "227px", padding: "12px 13px 8px 12px", color: "#0000008c", id: "scheduledTime", hidden: true}),
                                        checkboxOnclick: "checkboxName"
                                    },
                                    outer: {
                                        width: "calc(100% - 90px)",
                                        fontWeight: "600"
                                    }
                                };
                                encodeLib.insert(ZOHOCRM.SEND_BUTTON.children(".content"), encodeLib.checkbox(checkboxObject), {addOn: "prepend"});
                                ZOHOCRM.scheduleTime = $("#scheduledTime");

                                await ZOHOCRM.templatePopup();

                            });
                            
                        });
                    });	
                });
            });	    
    
        });
    },
    scheduleCheckboxInFunction: async function(thisElement) {
        $("#sendButton span").text("Schedule");
        thisElement.find(".checkboxName").text("Schedule on");
        encodeLib.elementAction("show 100", ZOHOCRM.scheduleTime);
        ZOHOCRM.isScheduled = true;
        ZOHOCRM.scheduledTime = encodeLib.toIsoString(ZOHOCRM.scheduleTime.val());
    },
    scheduleCheckboxOutFunction: async function(thisElement) {
        $("#sendButton span").text("Send");
        thisElement.find(".checkboxName").text("Schedule");
        encodeLib.elementAction("hide 200", ZOHOCRM.scheduleTime);
        ZOHOCRM.isScheduled = false;
        ZOHOCRM.scheduledTime = "";
    },
    messageTextareaLabelsSetup: function(labelName, labelContent, idsName="") {
        let addInput = {
            content: {
                contentType: "textarea",
                type: "textarea",
                id: idsName,
                placeholder: "Enter Message",
                fontWeight: "600",
                color: "#0000008c",
                padding: "8px 75px 8px 14px",
                minHeight: "165px",
                maxHeight: "210px",
                borderRadius: "8px",                
                scrollbarWidth: "thin",
                attributes: `errText="* Message cannot be empty."`,
                onfocusIn: {
                    thisElement: true,
                    errorInfoElement: "#"+idsName+"Error",
                    errorInfoAction: "slideUp, 300",
                    functionName: "ZOHOCRM.textAreaToMessageCheck"
                },
                onfocusOut: {
                    thisElement: true,
                    errorInfoElement: "#"+idsName+"Error",
                    errorInfoAction: "slideDown, 300",
                    functionName: "ZOHOCRM.textAreaToMessageCheck"
                },
                onkeypress: {
                    thisElement: true,
                    eventElement: true,
                    errorInfoElement: "#"+idsName+"Error",
                    errorInfoAction: "slideDown, 300",
                    functionName: "ZOHOCRM.textAreaToMessageCheck"
                }
            },
            label: {
                content: encodeLib.content({contentType: "content", fontFamily: "system-ui", content: `<div style="width: 75px;">${labelName}</div>${labelContent}`, direction: "row", color: "#000000de", positionX: "space-between", contentFitX: "100%", positionY: "center", innerOverflow: "unset", overflow: "unset"}),
                padding: "0 0 0 1px",
                color: "#000000de",
                height: "30px",
                overflow: "unset",
                innerOverflow: "unset",
                contentType: "content",
                contentFitX: "100%"
            },
            error: {
                id: idsName+"Error",
                positionX: "end",
                padding: "0 2px 0 175px"
            },
            outer: {
                id: idsName+"Outer",
                overflow: "unset",
                innerOverflow: "unset",
                padding: "40px 0 0 0"
            },
            checkLoader: {
                width: "75px",
                height: "calc(100% - 33px)",
                top: "31px",
                padding: "0px 0px 15px"
            }           
        };
        return encodeLib.labelContent(addInput);
    },
    userFieldListSetup: async function(dropDwonName, onChange, userFieldListId, optionObject={}, attributesObj={}) {
        if(!ZOHOCRM.userFields || !Object.keys(ZOHOCRM.userFields).length) {
            await ZOHOCRM.getFields('Users').then(async function(fields) {
                ZOHOCRM.userFields = fields;
            });
        }
        ZOHOCRM.userFields.forEach(function(field) {
            if(field.json_type == "string") {
                optionObject["Users."+field.field_label] = field.field_label;
            }
        });
        if(Object.keys(optionObject).length) {
            let dropDownObject = {
                select: {
                    dropDwonName : dropDwonName,
                    optionObject: optionObject,
                    attributesObj: attributesObj,
                    onChange: onChange,
                    type: "once",
                    __encode_ownonchange: ZOHOCRM.userSelectFunction,                    
                    showSelectedSvgMargin: "1px 5px 0 0"
                },
                button: {
                    padding: "1px 14px 0 6px",
                    maxHeight: "28px",
                    minHeight: "28px",
                    fontSize: "13px",
                    cursor: "default",
                    fontWeight: "600",
                    borderRadius: "8px",
                    margin: "0 0px 0 -1px"
                },
                option: {
                    padding: "6px 15px 5px 15px",
                    minHeight: "26px",
                    cursor: "default",
                    fontSize: "12px",
                    fontWeight: "500",
                    position: "relative"
                },
                outer: {
                    id: userFieldListId,
                    width: "190px",
                    zIndex: "1000",
                    color: "#0000008c",
                    margin: "0 5px 0 0"
                },
                dropDwon: {
                    padding: "4px 0",
                    top: "30px",
                    width: "calc(100% - 2px)",
                    top: "31px",
                    maxHeight: "165px",
                    borderRadius: "8px",
                    scrollbarWidth: "thin"
                }
            };
            return encodeLib.dropDown(dropDownObject);
        }
        else {
            return "";
        }
    },
    moduleUserFieldListSetup: async function() {
        if(ZOHOCRM.users.length && ZOHOCRM.currentUser && ZOHOCRM.userFields) {
            let optionObject = {};
            let attributesObj = {};
            optionObject["__encode_head_users"] = `Users`;
            for(let userCount=0; userCount < ZOHOCRM.users.length; userCount++) {
                let user = ZOHOCRM.users[userCount];
                if(user.status == "active") {
                    optionObject["__encode-value"+user.id] = user.role.name == 'CEO' ? ZOHOCRM.currentUser == user.id ? 'Owner/Current User' : 'Owner' : ZOHOCRM.currentUser == user.id ? 'Current User' : user.full_name;
                    attributesObj["__encode-value"+user.id] = ` userId="${user.id}" type="single" showselected="true" ownonchange="true" ${user.role.name == "CEO" ? 'initialSelected="true"': ""}`;
                }
                if(userCount == ZOHOCRM.users.length-1) {
                    optionObject["__encode_head_userField"] = `<div style="display: flex;"><span class="selectedUserName" style="max-width: 70%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;">User</span>${encodeLib.htmlWhiteSpace}Fields</div>`;
                    return ZOHOCRM.userFieldListSetup("Insert Users Fields", ZOHOCRM.insertUserFields, "userFields", optionObject, attributesObj);
                }
            }
        }
        else {
            return "";
        }    
    },
    moduleFieldListSetup: async function(dropDwonName, onChange, moduleFieldListId, ModuleApiName) {
        let optionObject = {};
        ModuleApiName = ZOHOCRM.templateModule ? ZOHOCRM.templateModule : ZOHOCRM.module;
        if(!ZOHOCRM.istemplateModule && ZOHOCRM.moduleFields) {
            await ZOHOCRM.moduleFields.forEach(function(field) {
                if(field.json_type == "string") {
                    optionObject[ZOHOCRM.module+"."+field.field_label] = field.field_label;
                }
            });
        }
        else {
            await ZOHOCRM.getFields(ModuleApiName).then(async function(fields) {
                await fields.forEach(function(field) {
                    if(field.json_type == "string") {
                        optionObject[ModuleApiName+"."+field.field_label] = field.field_label;
                    }
                });
            });
        }
        if(Object.keys(optionObject).length) {
            let dropDownObject = {
                select: {
                    dropDwonName : dropDwonName,
                    optionObject: optionObject,
                    onChange: onChange,
                    type: "once"
                },
                button: {
                    padding: "1px 14px 0 6px",
                    maxHeight: "28px",
                    minHeight: "28px",
                    fontSize: "13px",
                    cursor: "default",
                    fontWeight: "600",
                    borderRadius: "8px",
                    margin: "0 0px 0 -1px"
                },
                option: {
                    padding: "7px 15px 5px 15px",
                    minHeight: "26px",
                    cursor: "default",
                    fontSize: "12px",
                    fontWeight: "500"
                },
                outer: {
                    id: moduleFieldListId,
                    width: "190px",
                    zIndex: "1000",
                    color: "#0000008c"
                },
                dropDwon: {
                    padding: "4px 0",
                    top: "30px",
                    width: "calc(100% - 2px)",
                    top: "31px",
                    maxHeight: "165px",
                    borderRadius: "8px",
                    scrollbarWidth: "thin"
                }
            };
            return encodeLib.dropDown(dropDownObject);
        }
        else {
            return "";
        }
    },
    templateListSetup: async function(optionObject = {}) {
        if(!ZOHOCRM.extensionTemplate) {
            return "";
        }
        await Object.keys(ZOHOCRM.templates).sort().reverse().forEach(function(templateId) {
            optionObject[templateId] = ZOHOCRM.templates[templateId].title;
        });
        return await ZOHOCRM.searchRecord(ZOHOCRM.extensionTemplate, `(${ZOHOCRM.extensionFieldModule}:equals:${ZOHOCRM.module})`).then(async function(resp) {
            if(resp && resp.length) {                        
                await resp.forEach(function(searchField) {
                    ZOHOCRM.templates[searchField.id] = {"title": encodeLib.safeString(searchField.Name), "content": encodeLib.safeString(searchField[ZOHOCRM.extensionFieldMessage])};
                    optionObject[searchField.id] = encodeLib.safeString(searchField.Name);
                });
            }
            else {
                optionObject["__encode_App__encode_empty"] = `No Templates`;
            }
            optionObject = encodeLib.sortingKeysToObject(optionObject, "des");
            let svgElement = "";
            let svgObject = {
                outer: {
                    width: "30px",
                    position: "relative",
                    cursor: "default"
                },
                svg: {
                    icon: "downArrow",
                    fill: "#041e49b3"
                }
            };
            downArrowSvgElement = encodeLib.svg(svgObject);
            svgObject = {
                outer: {
                    class: "dropdownButtonSelectSvg",
                    width: "20px",
                    height: "19px",
                    borderRadius: "4px",
                    position: "relative",
                    cursor: "pointer",
                    onmouseover: {
                            runCode: `$(this).find('svg').css('fill', '#b8d0f1');`
                        },
                        onmouseout: {
                            runCode: `$(this).find('svg').css('fill', '#e0e0e0');`
                        },
                        onmousedown: {
                            thisElement: true,
                            functionName: "encodeLib.svgHoverIn"
                        },
                        onmouseup: {
                            thisElement: true,
                            runCode: `$(this).find('svg').css('fill', '#b8d0f1');`,
                            functionName: "encodeLib.svgHoverOut"
                        },
                    onclick: {
                        thisElement: true,
                        functionName: "ZOHOCRM.openTemplatePopup"
                    }
                },
                svg: {
                    icon: "add",
                    fill: "#041e49b3"
                }
            };
            addSvgElement = encodeLib.svg(svgObject);
            svgElement = downArrowSvgElement + addSvgElement;       
            let dropDownObject = {
                select: {
                    dropDwonName: "Choose Template",
                    optionObject: optionObject,
                    onChange: ZOHOCRM.insertTemplates,
                    svgOnclick: true,
                    svgElement: svgElement,
                    showSelected: true,
                    showSelectedSvgMargin: "1px 10px 0 0"
                },
                button: {
                    padding: "1px 6px 0 6px",
                    maxHeight: "28px",
                    minHeight: "28px",
                    fontSize: "13px",
                    cursor: "default",
                    fontWeight: "600",
                    borderRadius: "8px",
                    margin: "0 0px 0 -1px"
                },
                option: {
                    padding: "7px 15px 5px 15px",
                    minHeight: "26px",
                    cursor: "default",
                    fontSize: "12px",
                    fontWeight: "500"
                },
                outer: {
                    id: "templates",
                    width: "210px",
                    zIndex: "1000",
                    color: "#0000008c",
                    margin: "0 5px 0 0"
                },
                dropDwon: {
                    padding: "4px 0",
                    top: "30px",
                    width: "calc(100% - 2px)",
                    top: "31px",
                    maxHeight: "165px",
                    borderRadius: "8px",
                    scrollbarWidth: "thin"
                }
            };
            if(!encodeLib.outerClickFunctions.includes(encodeLib.dropdwonSvgElementOuterClickFunc)) {
                encodeLib.outerClickFunctions.push(encodeLib.dropdwonSvgElementOuterClickFunc);
            }
            return encodeLib.dropDown(dropDownObject);
        });
    },
    openTemplatePopup: function() {
        encodeLib.elementAction("fadeIn, 100", ".templatePopup");
        encodeLib.elementAction("fadeIn, 200", ".templatePopupBody");
        ZOHOCRM.templateName.focus();
    },
    templatePopup: async function() {
        if(!ZOHOCRM.historyFields) {
            await ZOHOCRM.getFields(ZOHOCRM.extensionHistory).then(async function(hfields) {
                ZOHOCRM.historyFields = hfields;
            });
        }
        let optionObject = {};
        ZOHOCRM.historyFields.forEach(function(field) {
            let moduleFilter = true;
            if(!ZOHOCRM.istemplateModule) {
                if(field.data_type == "lookup" && field.field_label == ZOHOCRM.module.substring(0,ZOHOCRM.module.length-1)) {
                    moduleFilter = true;
                }
                else {
                    moduleFilter = false;
                }
            }
            if(field.data_type == "lookup" && moduleFilter) {
                optionObject[field.lookup.module.api_name] = field.lookup.module.api_name;
            }
        });
        let dropDownObject = {
            select: {
                dropDwonName : "Template Modules",
                optionObject: optionObject,
                onChange: ZOHOCRM.templateModuleChooseFunc
            },
            outer: {
                id: "templateModuleList",
                width: "200px",
                zIndex: "2000",
                color: "#0000008c"
            }
        };
        let addInput= {
            content: {
                contentType: "input",
                type: "text",
                id: "templateName",
                placeholder: "Template Name",
                fontWeight: "600",
                color: "#0000008c",
                padding: "8px 45px 7px 14px",
                minHeight: "37px",
                onfocusIn: {
                    thisElement: true,
                    errorInfoElement: "#templateNameError",
                    errorInfoAction: "slideUp, 300",
                    functionName: "encodeLib.inputEmptyCheck"
                },
                onfocusOut: {
                    thisElement: true,
                    errorInfoElement: "#templateNameError",
                    errorInfoAction: "slideDown, 300",
                    functionName: "encodeLib.inputEmptyCheck"
                },
                attributes: `errText="* Template name cannot be empty"`
            },
            label: {
                content: encodeLib.dropDown(dropDownObject),
                padding: "0 10px 0 0",
                color: "#000000de",
                overflow: "unset",
                innerOverflow: "unset",
                width: "200px",
                height: "max-content",
                contentType: "content",
                contentFitX: "100%"
            },
            error: {
                id: "templateNameError",
                positionX: "end",
                padding: "0 2px 0 251px"
            },
            outer: {
                id: "templateNameDiv",
                overflow: "unset",
                innerOverflow: "unset",
                direction: "row"
            },
            checkLoader: {}
        };
        let templateModuleListElement = encodeLib.labelContent(addInput);
        addInput = {
            content: {
                content: templateModuleListElement,
                overflow: "unset",
                innerOverflow: "unset"
            },
            label: {
                content: "Template Name",
                padding: "0 0 0 1px",
                color: "#000000de",
                lineClamp: 1,
                height: "32px"
            },
            outer: {
                overflow: "unset",
                innerOverflow: "unset",
                padding: "0 2px"
            }
        };
        let templateNameElement = encodeLib.labelContent(addInput);
        
        let moduleFieldsDrop = await ZOHOCRM.moduleFieldListSetup("Insert "+"Module"+" Fields", ZOHOCRM.insertTemplateModuleFields, "templateModuleFields");
        let userFieldsDrop = await ZOHOCRM.userFieldListSetup("Insert Users Fields", ZOHOCRM.insertTemplateUserFields, "templateUserFields");
        let messageLabels = userFieldsDrop+moduleFieldsDrop;
        let messageLabelsEelement = encodeLib.content({content: messageLabels, class: "templateMessageLabels", positionX: "end", contentFitX: "100%", direction: "row", overflow: "unset", innerOverflow: "unset"});
        let messageTextareaLabelsEelement = await ZOHOCRM.messageTextareaLabelsSetup("Message", messageLabelsEelement, "templateMessage");
        
        let templatePopupTitleElement = "";
        if(!ZOHOCRM.istemplateModule) {
            templatePopupTitleElement = encodeLib.content({content: "Create Template", contentType: "text", position:"relative", lineClamp: 1, fontSize: "20px", positionY: "center", height: "60px", fontWeight: "600", contentFitX: "100%"});
        }
        let templatePopupInnerBody = encodeLib.content({class:"templatePopupInnerBody", content: templatePopupTitleElement+templateNameElement+messageTextareaLabelsEelement, color: "#0000008c", contentFitX: "100%", contentFitY: "100%", positionX: "start", positionY: "center", overflow: "unset"});
        
        let closeButton = "";
        if(!ZOHOCRM.istemplateModule) {
            let closeButtonObject = {
                content: "Close",
                hoverInBackgroundColor: "rgb(0 0 0 / 8%)",
                hoverOutBackgroundColor: "rgb(0 0 0 / 4%)",
                padding: "1px 15px 0px",
                color: "#0000008c",
                fontFamily: "'Roboto', sans-serif",
                backgroundColor: "rgb(0 0 0 / 4%)",
                onclick: {
                    thisElement: true,
                    functionName: "ZOHOCRM.templatePopupClose"
                }
            };
            closeButton = encodeLib.button(closeButtonObject);
        }
        
        let saveButtonObject = {
            class: "SaveTemplate",
            content: ZOHOCRM.templateRecordId ? "Update" : "Create",
            margin: "0 0 0 8px",
            fontFamily: "'Roboto', sans-serif",
            padding: "1px 15px 0",
            onclick: {
                thisElement: true,
                functionName: "ZOHOCRM.saveTemplate"
            }
        };
        let saveButton = encodeLib.button(saveButtonObject);
        let buttonsDiv = encodeLib.content({content: closeButton+saveButton, direction: "row", contentFitX: "100%", positionX: "end", padding: "10px 0 0", height: "60px"});

        let templatePopupBody = encodeLib.content({class:"templatePopupBody", content: templatePopupInnerBody + buttonsDiv, contentFitX: "100%", borderRadius: `${ZOHOCRM.istemplateModule ? "" : "8px"}`, padding: `${ZOHOCRM.istemplateModule ? "" : "20px 30px"}`, backgroundColor: "white", boxShadow: `${ZOHOCRM.istemplateModule ? "" : "0px 1px 15px 3px rgb(60 64 67 / 30%), 0px 2px 6px 2px rgb(60 64 67 / 15%)"}`, width: "max-content", maxWidth: `${ZOHOCRM.istemplateModule ? "" : "660px"}`, minWidth: `${ZOHOCRM.istemplateModule ? "100%" : "660px"}`, contentFitY: "100%", positionX: "center", positionY: "center"});

        let templatePopup = encodeLib.content({class:"templatePopup", content: templatePopupBody, padding: `${ZOHOCRM.istemplateModule ? "100px 30px 30px 30px" : "30px"}`, backgroundColor: `${ZOHOCRM.istemplateModule ? "transparent" : "#ffffff72"}`, contentFitX: "100%", position: "fixed", top: "0", left: "0", height: "100%", contentFitY: "100%", positionX: "center", positionY: `${ZOHOCRM.istemplateModule ? "start" : "center"}`, zIndex: "4000"});
        encodeLib.insert(encodeLib.BODY, templatePopup, {addOn: "append"});
        if(!ZOHOCRM.istemplateModule) {
            $(".templatePopup").hide();
            $(".templatePopupBody").hide();
        }

        if(!ZOHOCRM.istemplateModule) {
            if(!encodeLib.outerClickFunctions.includes(ZOHOCRM.templatePopupOuterClickFunc)) {
                encodeLib.outerClickFunctions.push(ZOHOCRM.templatePopupOuterClickFunc);
            }
        }

        ZOHOCRM.templateName = $("#templateName");
        ZOHOCRM.templateNameError = $("#templateNameError");
        ZOHOCRM.templateMessage = $("#templateMessage");
        ZOHOCRM.templateMessageError = $("#templateMessageError");
        ZOHOCRM.templateModuleList = $("#templateModuleList");
        ZOHOCRM.templateModuleList.find('.option').first().click();

        if(ZOHOCRM.istemplateModule && ZOHOCRM.loader.length && !ZOHOCRM.templateRecordId) {
            ZOHOCRM.loader.remove();
            ZOHOCRM.templateName.focus();
        }

    },
    templateModuleChooseFunc: async function(dropdownThisElement, selectedKeyValueObj, dropdownOptionThisElement, prevDropdownOptionThisElement) {
        if(ZOHOCRM.templateModule && ZOHOCRM.templateModule == selectedKeyValueObj.value) {
            return;
        }
        ZOHOCRM.templateMessage.val("");
        ZOHOCRM.templateModule = selectedKeyValueObj.value;
        dropdownThisElement.find(".textContent .content span").text(selectedKeyValueObj.value);
        let moduleFieldsDrop = await ZOHOCRM.moduleFieldListSetup("Insert "+selectedKeyValueObj.value+" Fields", ZOHOCRM.insertTemplateModuleFields, "templateModuleFields");
        $("#templateModuleFields").remove();
        encodeLib.insert("#templateUserFields", moduleFieldsDrop, {addOn: "after"});
    },
    templatePopupOuterClickFunc: function(e) {
        let thisElement = $(".templatePopup");
        if (thisElement.is(e.target) || thisElement.children().is(e.target)) 
        {
            ZOHOCRM.templatePopupClose();
        }
    },
    templatePopupClose: function() {
        encodeLib.elementAction("fadeOut, 200", ".templatePopup");
        encodeLib.elementAction("fadeOut, 100", ".templatePopupBody");
    },
    saveTemplate: async function() {

        let savingPopupBodyElement = `<div class="savingBody">
                                            ${encodeLib.loader({class: "saveTemplateLoader", backgroundColor: "white", minWidth: "300px", height: "70px"})}
                                            <div class="saveTemplateSvgContent" style="height: 50px; display: flex; align-items: center; justify-content: center;">${''}</div>
                                            <div class="savingContent" style="text-align: center; padding-left: 15px; padding-bottom: 15px; padding-right: 15px;">${ZOHOCRM.templateRecordId ? 'Template updating...' : 'Template creating...'}</div>
                                        </div>`;
        let popupObject = { htmlText: savingPopupBodyElement, backgroundColor: "#ffffffa3", buttonsPosition: "center", earseAll: true };
        encodeLib.popup(popupObject);
        $(".saveTemplateSvgContent").hide();
        encodeLib.popupButtons.hide();
        
        let templateName = "";
        if(!await encodeLib.saveToInPutValueCheck(await encodeLib.inputEmptyCheck(ZOHOCRM.templateName), ZOHOCRM.templateName, ZOHOCRM.templateNameError)) {
            encodeLib.popupClose();
            return;
        }
        else {
            templateName = encodeLib.safeString(ZOHOCRM.templateName.val().trim());
        }
        let templateMessage = "";
        if(!await encodeLib.saveToInPutValueCheck(await ZOHOCRM.textAreaToMessageCheck(ZOHOCRM.templateMessage), ZOHOCRM.templateMessage, ZOHOCRM.templateMessageError)) {
            encodeLib.popupClose();
            return;
        }
        else {
            templateMessage = encodeLib.safeString(ZOHOCRM.templateMessage.val().trim());
        }

        if(templateMessage && templateName && ZOHOCRM.templateModule) {
    
            if(ZOHOCRM.ButtonPosition != 'CreateOrCloneView' && ZOHOCRM.ButtonPosition != 'ListView' && ZOHOCRM.ButtonPosition != 'ListViewWithoutRecord' && ZOHOCRM.istemplateModule) {
                let reqData = {"id": ZOHOCRM.templateRecordId};
                reqData[ZOHOCRM.extensionFieldName] = templateName;
                reqData[ZOHOCRM.extensionFieldMessage] = templateMessage;
                reqData[ZOHOCRM.extensionFieldModule] = ZOHOCRM.templateModule;
                await ZOHOCRM.updateRecord(ZOHOCRM.extensionTemplate, reqData).then(async function(resp){
                    if(resp) {
                        $(".saveTemplateSvgContent").show().html(encodeLib.svg({outer: {width: "35px", height: "35px"}, svg: {icon: "tick", fill: "green", width: "35px", height: "35px"}}));
                        $(".saveTemplateLoader").hide();
                        $(".savingContent").html("Your SMS Template is updated successfully.");
                        encodeLib.popupButtons.show();
                        await setTimeout(async function() {	
                            await ZOHOCRM.popupClose();
                        }, 1000);
                    }
                    else {
                        setTimeout(async function() {
                            $(".saveTemplateSvgContent").show().html(encodeLib.svg({outer: {width: "30px", height: "30px"}, svg: {icon: "docError", fill: "#c91919", width: "30px", height: "30px"}}));
                            $(".saveTemplateLoader").hide();
                            $(".savingContent").html("Opps! Something went wrong from server side. Please try after sometimes!!!");
                            encodeLib.popupButtons.show();
                        }, 1000); 
                    }
                });	
            }
            else{

                if(Object.keys(ZOHOCRM.templates).length && templateName in ZOHOCRM.templates) {
                    $(".saveTemplateSvgContent").show().html(encodeLib.svg({outer: {width: "30px", height: "30px"}, svg: {icon: "docError", fill: "#c91919", width: "30px", height: "30px"}}));
                    $(".saveTemplateLoader").hide();
                    $(".savingContent").html("Template name is taken. Try another.");
                    encodeLib.popupButtons.show();
                    return;
                }
                else {
                    let exitTemplateNameResp = await ZOHOCRM.searchRecord(ZOHOCRM.extensionTemplate, `(${ZOHOCRM.extensionFieldName}:equals:${templateName})`).then(async function(resp) {
                        return resp;
                    });
                    if(exitTemplateNameResp) {                        
                        $(".saveTemplateSvgContent").show().html(encodeLib.svg({outer: {width: "30px", height: "30px"}, svg: {icon: "docError", fill: "#c91919", width: "30px", height: "30px"}}));
                        $(".saveTemplateLoader").hide();
                        $(".savingContent").html("Template name is taken. Try another.");
                        encodeLib.popupButtons.show();
                        return;
                    }
                }
                let reqData = {};
                reqData[ZOHOCRM.extensionFieldName] = templateName;
                reqData[ZOHOCRM.extensionFieldMessage] = templateMessage;
                reqData[ZOHOCRM.extensionFieldModule] = ZOHOCRM.templateModule;
                await ZOHOCRM.createRecord(ZOHOCRM.extensionTemplate, reqData).then(async function(resp){
                    if(resp) {
                        $(".saveTemplateSvgContent").show().html(encodeLib.svg({outer: {width: "35px", height: "35px"}, svg: {icon: "tick", fill: "green", width: "35px", height: "35px"}}));
                        $(".saveTemplateLoader").hide();
                        $(".savingContent").html("Your SMS Template is saved successfully.");
                        encodeLib.popupButtons.show();
                        await setTimeout(async function() {    
                            if(ZOHOCRM.istemplateModule) {
                                await ZOHO.CRM.UI.Record.open({Entity:ZOHOCRM.extensionTemplate,RecordID:resp}).then(async function(data){
                                    await ZOHOCRM.popupClose();
                                });	
                            }
                            else {
                                let templatesDrop = await ZOHOCRM.templateListSetup();
                                ZOHOCRM.TemplateList.remove();
                                encodeLib.insert("#userFields", templatesDrop, {addOn: "before"});
                                ZOHOCRM.TemplateList = $("#templates");
                                setTimeout(async function() {
                                    ZOHOCRM.templateName.val("");
                                    ZOHOCRM.templateMessage.val("");
                                    encodeLib.popupClose();
                                    ZOHOCRM.templatePopupClose(); 
                                }, 300);
                            }
                        }, 500);
                    }
                    else {
                        setTimeout(async function() {
                            $(".saveTemplateSvgContent").show().html(encodeLib.svg({outer: {width: "30px", height: "30px"}, svg: {icon: "docError", fill: "#c91919", width: "30px", height: "30px"}}));
                            $(".saveTemplateLoader").hide();
                            $(".savingContent").html("Opps! Something went wrong from server side. Please try after sometimes!!!");
                            encodeLib.popupButtons.show();
                        }, 1000);
                    }    
                });	
    
            }	
        }
        else {
            setTimeout(async function() {
                $(".saveTemplateSvgContent").show().html(encodeLib.svg({outer: {width: "30px", height: "30px"}, svg: {icon: "docError", fill: "#c91919", width: "30px", height: "30px"}}));
                $(".saveTemplateLoader").hide();
                $(".savingContent").html("Template name or message are wrong.");
                encodeLib.popupButtons.show();
            }, 1000);
        } 
    },
    userSelectFunction: async function(dropdownThisElement, selectedKeyValueObj, dropdownOptionThisElement, prevDropdownOptionThisElement) {
        $(".selectedUserName").text(selectedKeyValueObj.value);
        await ZOHOCRM.getRecord('users', encodeLib.strToNumFillter(selectedKeyValueObj.id)).then(function(data) {
            ZOHOCRM.selectedUser = data.users[0];
        });
    },
    selectModule: async function(){
        let record = ZOHOCRM.currentRecords[0];
        let lookupModules = [];
        let errText = "";
        let optionObject = {};
        let bulkAattributesObj = {};
        let bulkOptionObject = {};
        let attributesObj = {};
        await ZOHOCRM.moduleFields.forEach(function(field){
            if(field.data_type == "phone") {
                errText = errText + field.field_label + '/';
                if(!ZOHOCRM.isBulk && record[field.api_name] != null) {
                    optionObject[ZOHOCRM.module+"_"+field.api_name] = ZOHOCRM.module+" - "+field.field_label;
                    attributesObj[ZOHOCRM.module+"_"+field.api_name] = `entity="${ZOHOCRM.module}" api_name="${field.api_name}" num="${record[field.api_name]}"`;
                }
                bulkOptionObject[ZOHOCRM.module+"_"+field.api_name] = ZOHOCRM.module+" - "+field.field_label;
                bulkAattributesObj[ZOHOCRM.module+"_"+field.api_name] = `entity="${ZOHOCRM.module}" api_name="${field.api_name}"`;
            }
            else if(field.data_type == "lookup"){
                if(!ZOHOCRM.isBulk && record[field.api_name] != null) {
                    lookupModules.push(field);
                }
                if(ZOHOCRM.isBulk) {
                    lookupModules.push(field);
                }
            }
        });         
        if(lookupModules.length == 0) {
            if(ZOHOCRM.isBulk) {
                optionObject = bulkOptionObject;
                attributesObj = bulkAattributesObj;
            }
            await ZOHOCRM.setDropToPhoneElement(optionObject, attributesObj, errText);
        }	
        else{
            for (let i = 0; i < lookupModules.length; i++) {
                let lookupModule = lookupModules[i].lookup.module.api_name;
                let datarecord = "";
                if(!ZOHOCRM.isBulk) {
                    let lookupId = record[lookupModules[i].api_name].id;
                    datarecord = await ZOHOCRM.getRecord(lookupModule, lookupId).then(function(datarecord) {
                        return datarecord.data[0];
                    });
                }
                await ZOHOCRM.getFields(lookupModule).then(async function(respFields) {
                    respFields.forEach(function(field) {
                        if(field.data_type == "phone") {
                            errText = errText + lookupModule + ' - ' +field.field_label + '/';
                            if(!ZOHOCRM.isBulk && datarecord[field.api_name] != null) {
                                optionObject[lookupModule+"_"+field.api_name] = lookupModule+" - "+field.field_label;
                                attributesObj[lookupModule+"_"+field.api_name] = `entity="${lookupModule}" api_name="${field.api_name}" num="${encodeLib.strToNumFillter(datarecord[field.api_name])}"`;
                            }
                            bulkOptionObject[lookupModule+"_"+field.api_name] = lookupModule+" - "+field.field_label;
                            bulkAattributesObj[lookupModule+"_"+field.api_name] = `entity="${lookupModule}" api_name="${field.api_name}"`;
                        }
                    });
                    if(i == lookupModules.length-1) {
                        if(ZOHOCRM.isBulk) {
                            optionObject = bulkOptionObject;
                            attributesObj = bulkAattributesObj;
                        }
                        await ZOHOCRM.setDropToPhoneElement(optionObject, attributesObj, errText);
                    }
                });
            }
        }
    },
    setDropToPhoneElement: async function(optionObject, attributesObj, errText) {
        if(!Object.keys(optionObject).length) {
            let popupObject = {
                htmlText: `<span style="font-weight: 600;">${errText.slice(0, -1)}</span>${encodeLib.htmlWhiteSpace}fields is empty.`,
                backgroundColor: "#ffffffa3",
                buttonsDivPadding: "20px 0 0"
            };
            encodeLib.popup(popupObject);
            optionObject["__encode_empty"] = `No Numbers`;
            if(!ZOHOCRM.isBulk) {
                attributesObj["__encode_empty"] = `num=""`;
            }
        }
        let dropDownObject = {
            select: {
                dropDwonName : "Phone Fields",
                optionObject: optionObject,
                attributesObj: attributesObj,
                showValue: true,
                onChange: ZOHOCRM.phoneRecordChooseFunc
            },
            outer: {
                id: "toNumbersList",
                width: ZOHOCRM.isBulk ? "calc(100% - 100px)" : "250px",
                zIndex: "2000",
                color: "#0000008c"
            }
        };
        let addInput= {
            content: {
                contentType: "input",
                type: "tel",
                id: "toNumber",
                placeholder: "Phone Number",
                fontWeight: "600",
                color: "#0000008c",
                padding: "8px 45px 7px 14px",
                minHeight: "37px",
                onfocusIn: {
                    thisElement: true,
                    errorInfoElement: "#toNumberError",
                    errorInfoAction: "slideUp, 300",
                    functionName: "encodeLib.inputToMobileNumberCheck"
                },
                onfocusOut: {
                    thisElement: true,
                    errorInfoElement: "#toNumberError",
                    errorInfoAction: "slideDown, 300",
                    functionName: "encodeLib.inputToMobileNumberCheck"
                },
                hidden: ZOHOCRM.isBulk ? true : false
            },
            label: {
                content: encodeLib.dropDown(dropDownObject),
                padding: ZOHOCRM.isBulk ? "0" : "0 10px 0 0",
                color: "#000000de",
                overflow: "unset",
                innerOverflow: "unset",
                height: "max-content",
                width: ZOHOCRM.isBulk ? "100%" : "250px",
                contentType: "content",
                contentFitX: "100%",
                direction: "row"
            },
            error: {
                id: "toNumberError",
                positionX: "end",
                padding: "0 2px 0 251px"
            },
            outer: {
                id: "toNumberDiv",
                overflow: "unset",
                innerOverflow: "unset",
                direction: "row"
            },
            checkLoader: {}
        };
        let toNumberListElement = encodeLib.labelContent(addInput);
        addInput = {
            content: {
                content: toNumberListElement,
                overflow: "unset",
                innerOverflow: "unset"
            },
            label: {
                content: "To",
                padding: "0 0 0 1px",
                color: "#000000de",
                lineClamp: 1,
                height: "30px"
            },
            outer: {
                id: "toOuter",
                overflow: "unset",
                innerOverflow: "unset",
                padding: "20px 2px 0 2px"
            }
        };
        encodeLib.insert(ZOHOCRM.BODY, encodeLib.labelContent(addInput), {addOn: "append"});
        encodeLib.insert(APP.BODY, encodeLib.content({id: "subHeader", padding: "0 4px", positionX: "end"}), {addOn: "prepend"});
        ZOHOCRM.toNumber = $("#toNumber");
        ZOHOCRM.toNumberError = $("#toNumberError");
        ZOHOCRM.toNumbersList = $("#toNumbersList");
        if(!ZOHOCRM.isBulk) {
            await encodeLib.countryCode({
                input: "#toNumber",
                zIndex: "2000",
                containerClass: "toNumberCountrycode",
                fixDropdownWidth: false,
                color: "rgba(0, 0, 0, 0.55)",
                fontWeight: "600",
                dropdownFontWeight: "initial",
                searchFontWeight: "initial",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                dropdownOptionHoverColor: "#f5f8ff"
            });
            ZOHOCRM.toNumbersList.find('.option').first().click();
        }
        else {
            await encodeLib.insert(ZOHOCRM.toNumbersList, `<div class="toNumberCountrycodeOut" style="width: 100px;height: 37px;margin-right: 9px;"></div>`, {addOn: 'before'});
            await encodeLib.countryCode({
                inputParent: ".toNumberCountrycodeOut",
                zIndex: "2000",
                containerClass: "toNumberCountrycode",
                fixDropdownWidth: false,
                height: "37px",
                borderRadius: "5px",
                color: "rgba(0, 0, 0, 0.55)",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                fontWeight: "600",
                dropdownFontWeight: "initial",
                searchFontWeight: "initial",
                style: "top: -1px;",
                focusBorderColor: "#1a73e8",
                width: "100px",
                dropdownOptionHoverColor: "#f5f8ff"
            });
        }
        $(".iti__country-list").css({"scrollbar-width": "thin"});
        ZOHOCRM.toNumberCountrycode = $(".toNumberCountrycode");
    },
    textAreaToMessageCheck: async function(thisElement, eventElement) {
        let errCheck = await encodeLib.inputEmptyCheck(thisElement);
        if(!errCheck) {
            let msg = $(thisElement).val().trim();
            if(!msg && !eventElement) {
                return "* Message cannot be empty.";
            }
            else if(msg) {
                if(msg.length < (ZOHOCRM.msgTextMaxLength ? ZOHOCRM.msgTextMaxLength : Infinity) || (!eventElement && msg.length <= (ZOHOCRM.msgTextMaxLength ? ZOHOCRM.msgTextMaxLength : Infinity))) {
                    if($(thisElement).attr("id") != "templates" && $(thisElement).attr("id") != "templateMessage" && ZOHOCRM.MESSAGE.variables && Object.keys(ZOHOCRM.MESSAGE.variables).length && ZOHOCRM.MESSAGE.variableElement && ZOHOCRM.MESSAGE.variableElement.length) {
                        let emptyVariableCount = 0;
                        for(variableKey in ZOHOCRM.MESSAGE.variables) !ZOHOCRM.MESSAGE.variables[variableKey] ? ++emptyVariableCount : emptyVariableCount;
                        if(emptyVariableCount) {
                            let emptyVariableErr = "";
                            ZOHOCRM.MESSAGE.variableElement.each(function() {
                                if(!$(this).val() && !emptyVariableErr) {
                                    emptyVariableErr = $(this).attr("errText");
                                }
                            });
                            return emptyVariableErr;
                        }
                        else {
                            return false;
                        }
                    }
                    return false;
                }
                else {
                    if(eventElement) {
                        eventElement.preventDefault();
                    }
                    return "* Message should be within "+ZOHOCRM.msgTextMaxLength+" characters";
                }
            }
            else {
                return $(thisElement).attr("errText");
            }
        }
        else {
            return errCheck;
        }
    },
    phoneRecordChooseFunc: function(dropdownThisElement, selectedKeyValueObj, dropdownOptionThisElement, prevDropdownOptionThisElement) {
        ZOHOCRM.phoneRecord = { entity: $(dropdownThisElement).find(".selected").attr('entity'), api_name: $(dropdownThisElement).find(".selected").attr('api_name') };
        if(!ZOHOCRM.isBulk) {
            let selectedNumer = encodeLib.strToNumFillter($(dropdownThisElement).find(".selected").attr("num"));
            ZOHOCRM.toNumber.val(selectedNumer).focus();
            if(selectedNumer && selectedNumer.length > 10 && selectedNumer.slice(0, selectedNumer.length-10)) {
                let findFirstCountry = false;
                encodeLib.rawCountryData.some(item => {
                    if(!findFirstCountry && item[1] === selectedNumer.slice(0, selectedNumer.length-10) && $(".toNumberCountrycode .enCountry__"+item[0]).length) {
                        $(".toNumberCountrycode button").click();
                        $(".toNumberCountrycode .enCountry__"+item[0]).click();
                        ZOHOCRM.toNumber.val(selectedNumer.slice(-10)).focus();
                        findFirstCountry = true;
                        return;
                    }
                });
            }
        }
        else {
            encodeLib.saveToInPutValueCheck(false, ZOHOCRM.toNumbersList, ZOHOCRM.toNumberError);
        }
    },
    setphoneRecordUpdate: function(updatePhoneRecord) {

        let recipientName = updatePhoneRecord[ZOHOCRM.phoneRecord.api_name] ? updatePhoneRecord[ZOHOCRM.phoneRecord.api_name] : "";
    
        if(ZOHOCRM.phoneRecord.entity == "Contacts" || ZOHOCRM.phoneRecord.entity == "Leads" ) {
            recipientName = updatePhoneRecord.Full_Name;
        }
        else if(ZOHOCRM.phoneRecord.entity == "Accounts") {
            recipientName = updatePhoneRecord.Account_Name;
        }	
        ZOHOCRM.phoneRecord['Mobile'] = encodeLib.strToNumFillter(updatePhoneRecord[ZOHOCRM.phoneRecord.api_name] ? updatePhoneRecord[ZOHOCRM.phoneRecord.api_name] : "");
        ZOHOCRM.phoneRecord['recipientName'] = recipientName;
        ZOHOCRM.phoneRecord['id'] = updatePhoneRecord.id;
        return;
    
    },    
    getMobileNumber: async function(currentRecord) {    
        if(!ZOHOCRM.phoneRecord || !ZOHOCRM.phoneRecord.entity) {
            ZOHOCRM.phoneRecord = {'Mobile': '', 'recipientName': '', 'id': ''};
        }
        else if(ZOHOCRM.module == ZOHOCRM.phoneRecord.entity) {
            ZOHOCRM.setphoneRecordUpdate(currentRecord);
            return;
        }
        else {    
            let moduleEntity = ZOHOCRM.phoneRecord.entity;
            if(ZOHOCRM.module == "Deals") {
                moduleEntity = ZOHOCRM.phoneRecord.entity.slice(0, -1)+'_Name';
            }    
            if(currentRecord[moduleEntity]) {
                await ZOHOCRM.getRecord(ZOHOCRM.phoneRecord.entity, currentRecord[moduleEntity].id).then(function(contactData) {
                    ZOHOCRM.setphoneRecordUpdate(contactData.data[0]);
                    return;
                });
            }
            else {
                ZOHOCRM.phoneRecord["Mobile"] = '';
                ZOHOCRM.phoneRecord["recipientName"] = '';
                ZOHOCRM.phoneRecord["id"] = '';
            }    
        }        
    },
    checkMobileNumber: async function(no, countryCode) {
        if(!countryCode) {
            countryCode = "";
        }
        no = (no+"").replace(/\D/g,'');
        if(no && countryCode && !no.startsWith(countryCode) && no.length <= 10) {
            no = countryCode+no;
        }
        return no.replace(/\D/g,''); 
    },
    insertTemplates: async function(dropdownThisElement, selectedKeyValueObj, dropdownOptionThisElement, prevDropdownOptionThisElement, variableStart, variableEnd) {
        if(!selectedKeyValueObj.id) {
            return;
        }
        $(".templateNameTitle").remove();
        if(dropdownThisElement.attr("id") == "templates" && SMS.SEND.templateIdList && SMS.SEND.templateIdList.length) {
            SMS.SEND.templateIdList.find(".selected").removeClass("selected").removeClass("selectOptionClickClass");
            SMS.SEND.templateIdList.find(".textContent .content span").text("Choose Template");
            if(SMS.SEND.templateIdList.find(".dropdownOptionSelectSvg").length) {
                SMS.SEND.templateIdList.find(".dropdownOptionSelectSvg").hide();
            }
        }
        else if(dropdownThisElement.attr("id") != "templates" && ZOHOCRM.TemplateList && ZOHOCRM.TemplateList.length) {
            ZOHOCRM.TemplateList.find(".selected").removeClass("selected").removeClass("selectOptionClickClass");
            if(ZOHOCRM.TemplateList.find(".dropdownOptionSelectSvg").length) {
                ZOHOCRM.TemplateList.find(".dropdownOptionSelectSvg").hide();
            }
        }
        if(selectedKeyValueObj.id) {
            let templateName = encodeLib.content({content: selectedKeyValueObj.value, lineClamp: 1, contentType: "text", textAlign: "right", color:"rgba(0, 0, 0, 0.55)", padding: "0 6px 0 0"});
            let svgObject = {
                outer: {
                    cursor: "pointer",
                    position: "relative",
                    onmouseover: {
                        runCode: "$(this).find('svg').css({fill: '#b75b1a'});"
                    },
                    onmouseout: {
                        runCode: "$(this).find('svg').css({fill: 'rgba(0, 0, 0, 0.55)'});"
                    },
                    onclick: {
                        thisElement: true,
                        functionName: "ZOHOCRM.removeTemplate"
                    },
                    width: "14px",
                    height: "14px",
                    attributes: `templateListId="${dropdownThisElement.attr("id")}"`
                },
                svg: {
                    icon: "close",
                    fill: "rgba(0, 0, 0, 0.55)",
                    width: "20px",
                    height: "20px"
                }
            };
            let svgElementEdit = encodeLib.svg(svgObject);
            let onLoadedElement = encodeLib.onLoaded({runCode: `$('.templateNameTitle').hide();encodeLib.elementAction('fadeIn 200', $('.templateNameTitle'));`});
            let templateNameEelement = encodeLib.content({content: templateName+svgElementEdit+onLoadedElement, class: "templateNameTitle", direction: "row", zIndex: "10", position: "relative", transition: "0.3s", backgroundColor: "#1a73e814", positionX: "end", positionY: "center", height: "20px", fontSize: "11px", padding: "0 10px 0 15px"});
            encodeLib.insert(ZOHOCRM.MESSAGE, templateNameEelement, {addOn: 'before'});
            ZOHOCRM.messageOuter.find(".messageLabels .dropDown").css({"max-height": "185px"});
            ZOHOCRM.messageOuter.find(".messageLabels .dropDown").children(".content").children(".enContent").css({"max-height": "185px"});
        }
        document.getElementById("message").style.height = `165px`;
        ZOHOCRM.MESSAGE.val(ZOHOCRM.templates[selectedKeyValueObj.id] && ZOHOCRM.templates[selectedKeyValueObj.id].content ? ZOHOCRM.getMessageWithFields(ZOHOCRM.templates[selectedKeyValueObj.id].content, ZOHOCRM.isBulk ? "" : ZOHOCRM.currentRecords[0]) : "");
        ZOHOCRM.MESSAGE.focus();
        document.getElementById("message").setSelectionRange(0, 0);
        document.getElementById("message").style.height = `${document.getElementById("message").scrollHeight}px`;
        ZOHOCRM.MESSAGE.scrollTop(0);
        ZOHOCRM.MESSAGE.variables = {};
        if($(".variableElementsOuter").length) {
            $(".variableElementsOuter").remove();
        }
        if(ZOHOCRM.templates[selectedKeyValueObj.id] && ZOHOCRM.templates[selectedKeyValueObj.id].variableStart && ZOHOCRM.templates[selectedKeyValueObj.id].variableEnd) {
            variableStart = ZOHOCRM.templates[selectedKeyValueObj.id].variableStart;
            variableEnd = ZOHOCRM.templates[selectedKeyValueObj.id].variableEnd;
        }
        SMS.SEND.templateId = "";
        if(variableStart && variableEnd) {
            SMS.SEND.templateId = selectedKeyValueObj.id;
            ZOHOCRM.MESSAGE.variables = await encodeLib.getPutVariablesToVariableString(ZOHOCRM.templates[selectedKeyValueObj.id].content, variableStart, variableEnd);
            let variableElements = "";
            await Object.keys(ZOHOCRM.MESSAGE.variables).forEach(function(variableKey, variableKeyPosition) {
                let addInput = {
                    content: {
                        contentType: "input",
                        type: "text",
                        class: "variableInput",
                        id: `variableInput_${variableKeyPosition}`,
                        placeholder: "Enter value",
                        placeholderColor: "gainsboro",
                        fontWeight: "600",
                        color: "#0000008c",
                        minHeight: "36px",
                        borderRadius: "0 4px 4px 0",
                        padding: "8px 45px 7px 14px",
                        attributes: `errText="* ${variableKey.split("__en")[0]} is empty." variable_id="${variableKey}"`,
                        onfocusIn: {
                            thisElement: true,
                            errorInfoElement: "#messageError",
                            errorInfoAction: "slideUp, 300",
                            functionName: "ZOHOCRM.textAreaToMessageCheck",
                        },
                        onfocusOut: {
                            thisElement: true,
                            errorInfoElement: "#messageError",
                            errorInfoAction: "slideDown, 300",
                            functionName: "ZOHOCRM.textAreaToMessageCheck",
                            runCode: "ZOHOCRM.MESSAGE.variables[$(this).attr('variable_id')]=$(this).val();"
                        }
                    },
                    label: {
                        content: variableKey.split("__en")[0],
                        title: variableKey.split("__en")[0],
                        padding: "0px 15px 0 15px",
                        lineClamp: 1,
                        color: "#000000de",
                        height: "36px",
                        width: "125px",
                        onclick: {
                            thisElement: true,
                            runCode: "$(this).parent().find('input').focus();"
                        }
                    },
                    outer: {
                        id: variableKey+"Outer",
                        class: "variableElement",
                        padding: "0",
                        direction: "row",
                        contentType: "inputView",
                        width: "calc(50% - 5px)",
                        backgroundColor: "#f3f8ff"
                    },
                    checkLoader: {}
                };
                variableElements += encodeLib.labelContent(addInput);
            });
            $(".variableElementsOuter").remove();
            if(variableElements) {
                encodeLib.insert(ZOHOCRM.MESSAGE, encodeLib.content({
                    content: variableElements,
                    class: "variableElementsOuter",
                    padding: "15px 10px",
                    boxShadow: "transparent 0px 0px 0px 2px inset, rgba(0, 0, 0, 0.12) 0px 1px 0px 0px inset",
                    contentFitX: "100%",
                    positionX: "center",
                    zIndex: "1000"
                }), {addOn: "after"});
                ZOHOCRM.MESSAGE.variableElement = $(".variableInput");
                encodeLib.autoAlignDivPosition(".variableElement", 345, {x: 10, y: 10}, "700px");
            }
        }
        if(ZOHOCRM.templates[selectedKeyValueObj.id].notEditable || Object.keys(ZOHOCRM.MESSAGE.variables).length || ZOHOCRM.MESSAGE.notEditable) {
            ZOHOCRM.MESSAGE.attr("readonly", "");
            ZOHOCRM.messageOuter.find(".checkLoaderClass").css("display", "none");
        }
        else {
            ZOHOCRM.MESSAGE.removeAttr("readonly");
            ZOHOCRM.messageOuter.find(".checkLoaderClass").css("display", "flex");
        }
        encodeLib.elementAction("slideUp, 300", "#messageError");       
    },
    removeTemplate: function(thisElement) { 
        $("#"+$(thisElement).attr("templateListId")).find(".selected").removeClass("selected").removeClass("selectOptionClickClass");
        if($("#"+$(thisElement).attr("templateListId")).find(".dropdownOptionSelectSvg").length) {
            $("#"+$(thisElement).attr("templateListId")).find(".dropdownOptionSelectSvg").hide();
        }
        encodeLib.elementAction("slideUp 200", $(thisElement).parent().parent());
        ZOHOCRM.MESSAGE.val("");
        ZOHOCRM.messageOuter.find(".messageLabels .dropDown").css({"max-height": "165px"});
        ZOHOCRM.messageOuter.find(".messageLabels .dropDown").children(".content").children(".enContent").css({"max-height": "165px"});
        ZOHOCRM.MESSAGE.focus();
        SMS.SEND.templateId = "";
        if(ZOHOCRM.MESSAGE.variables) {
            ZOHOCRM.MESSAGE.variables = {};
        }
        if($(".variableElementsOuter").length) {
            $(".variableElementsOuter").remove();
        }
        if(SMS.SEND.templateIdList && SMS.SEND.templateIdList.length) {
            SMS.SEND.templateIdList.find(".textContent .content span").text("Choose Template");
        }
        if(!ZOHOCRM.MESSAGE.notEditable) {
            ZOHOCRM.MESSAGE.removeAttr("readonly");
            ZOHOCRM.messageOuter.find(".checkLoaderClass").css("display", "flex");
        }
    },
    insertTemplateUserFields: function(dropdownThisElement, selectedKeyValueObj, dropdownOptionThisElement, prevDropdownOptionThisElement) {
        ZOHOCRM.insertModuleFields(dropdownThisElement, selectedKeyValueObj, dropdownOptionThisElement, prevDropdownOptionThisElement, false, true);
    },
    insertTemplateModuleFields: function(dropdownThisElement, selectedKeyValueObj, dropdownOptionThisElement, prevDropdownOptionThisElement) {
        ZOHOCRM.insertModuleFields(dropdownThisElement, selectedKeyValueObj, dropdownOptionThisElement, prevDropdownOptionThisElement, false, true);
    },
    insertUserFields: function(dropdownThisElement, selectedKeyValueObj, dropdownOptionThisElement, prevDropdownOptionThisElement) {
        ZOHOCRM.insertModuleFields(dropdownThisElement, selectedKeyValueObj, dropdownOptionThisElement, prevDropdownOptionThisElement, true);
    },
    insertModuleFields: async function(dropdownThisElement, selectedKeyValueObj, dropdownOptionThisElement, prevDropdownOptionThisElement, isUser=false, istemplateFields=false) {
        let textarea = ZOHOCRM.MESSAGE;
        if(istemplateFields) {
            textarea = ZOHOCRM.templateMessage;
        }
        else if(ZOHOCRM.MESSAGE && ZOHOCRM.MESSAGE.variables && Object.keys(ZOHOCRM.MESSAGE.variables).length && ZOHOCRM.MESSAGE.variableElement) {
            if(encodeLib.windowSelection.focusNode && encodeLib.windowSelection.focusNode.hasChildNodes() && encodeLib.windowSelection.focusNode.querySelector("input") && encodeLib.windowSelection.focusNode.querySelector("input").className.includes("variableInput")) {
                textarea = encodeLib.windowSelection.focusNode.querySelector("input");
            }
            else {
                return;
            }
        }
        else if(ZOHOCRM.MESSAGE.attr("readOnly")) {
            return;
        }
        if((ZOHOCRM.isBulk && !isUser) || istemplateFields) {
            encodeLib.cursorPositionToAddText(textarea, "${"+selectedKeyValueObj.id+"}");
        }
        else {
            let getValue = await ZOHOCRM.getMessageWithFields('${'+selectedKeyValueObj.id+'}', ZOHOCRM.currentRecords[0]);
            if(!getValue) {
                getValue = "";
            }
            encodeLib.cursorPositionToAddText(textarea, getValue);
        }
    },
    getMessageWithFields: function(message, currentRecord){
        if(currentRecord) {
            ZOHOCRM.moduleFields.forEach(function(field) {
                let replace = "${"+ZOHOCRM.module+"."+field.field_label+"}";
                if(currentRecord[field.api_name] != null)
                {
                    let value = currentRecord[field.api_name];
                    if(value.name)
                    {
                        value = value.name;
                    }
                    message = message.replaceAll(replace,value);
                }
                else
                {
                    message = message.replaceAll(replace,"");
                }
            });	
        }
        if(ZOHOCRM.selectedUser) {
            ZOHOCRM.userFields.forEach(function(field){
                let replace = "${Users."+field.field_label+"}";
                if(ZOHOCRM.selectedUser[field.api_name] != null)
                {
                    let value = ZOHOCRM.selectedUser[field.api_name];
                    if(value.name)
                    {
                        value = value.name;
                    }
                    message = message.replaceAll(replace,value);
                }
                else
                {
                    message = message.replaceAll(replace,"");
                }
            });
        }
        return message.replace(/ /g, ' ').trim();
    }

};