var FORAPP = null;
FORAPP = "zohocrm";
document.writeln('<script src="zohocrm.js?v=7"></script>');
document.addEventListener("DOMContentLoaded", function (event) {
    SMS.init();
    ZOHO.embeddedApp.init();
});

var APP;
var ENAPP = null;
var SMS = {

    extensionName: 'WhatsApp Business',
    extensionAPI: 'whatsappbusiness0__',
    extensionSignal: "whatsappbusiness",
    extensionFunction: 'send',
    credentials: {},
    page: null,
    editLink: "",
    supportMail: "support@polksconsultancy.com",
    docLink: "",
    videoLink: "",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="40" viewBox="0 0 180 40" fill="none"> <g clip-path="url(#clip0_2864_5776)"> <g clip-path="url(#clip1_2864_5776)"> <path d="M9.84909 0.5H0.978027L13.633 29.2527C13.7297 29.4724 14.0421 29.4702 14.1358 29.2495L18.3447 19.3485L9.84909 0.5Z" fill="black"/> <path d="M36.8708 0.5C36.8708 0.5 23.2742 31.6392 21.453 34.5108C19.3363 37.8492 17.9334 39.1235 15.3375 39.5318C15.3135 39.5355 15.2957 39.5563 15.2957 39.5807C15.2957 39.6081 15.318 39.6304 15.3453 39.6304H23.4696C26.989 39.6304 29.527 36.6915 30.9335 34.0962C32.532 31.1464 45.8982 0.5 45.8982 0.5H36.8708Z" fill="black"/> </g> <path d="M72.2275 25.4738C72.2088 25.5149 72.1505 25.5149 72.1317 25.4738L65.408 10.7144H61.6304C61.6304 10.7144 68.5601 26.376 69.2523 27.5462C69.9287 28.6898 70.7473 29.6326 72.1797 29.6326C73.6121 29.6326 74.4307 28.6898 75.1072 27.5462C75.7994 26.376 82.7291 10.7144 82.7291 10.7144H78.9515L72.2275 25.4738Z" fill="black"/> <path d="M92.7333 26.7567C89.0796 26.7567 86.6868 24.3696 86.6868 20.0652C86.6868 15.7609 89.0796 13.3741 92.7333 13.3741C96.374 13.3741 98.7795 15.7609 98.7795 20.0652C98.7795 24.3696 96.374 26.7567 92.7333 26.7567ZM92.7333 10.2828C87.0121 10.2828 83.3322 14.0002 83.3322 20.0652C83.3322 26.1306 87.0121 29.848 92.7333 29.848C98.4415 29.848 102.134 26.1306 102.134 20.0652C102.134 14.0002 98.4415 10.2828 92.7333 10.2828Z" fill="black"/> <path d="M121.463 10.7132V29.4176H117.59L108.564 15.7429V29.4176H105.261V10.7132H109.146L118.173 24.4791V10.7132H121.463Z" fill="black"/> <path d="M130.314 21.748L133.567 14.1088C133.585 14.0659 133.646 14.0659 133.664 14.1088L136.917 21.748H130.314ZM133.615 10.4994C132.255 10.4994 131.424 11.5346 130.876 12.5698C130.314 13.6306 123.598 29.4176 123.598 29.4176H127.049L128.977 24.8884H138.254L140.182 29.4176H143.633C143.633 29.4176 136.917 13.6306 136.355 12.5698C135.807 11.5346 134.975 10.4994 133.615 10.4994Z" fill="black"/> <path d="M152.969 22.2046H158.876C158.849 25.1108 156.144 26.7568 153.278 26.7568C149.683 26.7568 147.328 24.3695 147.328 20.0653C147.328 15.418 149.508 13.3468 153.479 13.3468C155.965 13.3468 158.033 14.3666 158.468 16.7169H161.893C161.293 12.602 157.515 10.2827 153.278 10.2827C147.648 10.2827 144.028 14.0001 144.028 20.0653C144.028 26.1305 147.648 29.7753 153.278 29.7753C155.651 29.7753 158.045 28.4987 158.888 27.1503L158.877 29.4175H162.037V19.3422H152.969V22.2046Z" fill="black"/> <path d="M179.022 13.8435V10.7132H165.616V29.4176H179.022V26.287H168.918V21.3698H178.234V18.2392H168.918V13.8435H179.022Z" fill="black"/> </g> <defs> <clipPath id="clip0_2864_5776"> <rect width="178.043" height="39.1304" fill="white" transform="translate(0.978271 0.5)"/> </clipPath> <clipPath id="clip1_2864_5776"> <rect width="45" height="39.1304" fill="white" transform="translate(0.978271 0.5)"/> </clipPath> </defs> </svg>`,
    
    init: async function() {

        if ($("#outerBody").length) {
            $("#outerBody").remove();
            SMS.creditBalance = "";
        }

        if ($("#settingsPage").length) {
            $("#settingsPage").remove();
        }

        if ($(".templatePopup").length) {
            $(".templatePopup").remove();
        }

        ENAPP = ZOHOCRM;
        ZOHOCRM.init();
        SMS.extensionInvokeAPI = SMS.extensionAPI + SMS.extensionFunction;
        SMS.extensionCredential = SMS.extensionAPI + 'credentials';

        encodeLib.init();

        // let loaderDiv = encodeLib.loader({ id: "loader", position: "absolute", backgroundColor: "white", zIndex: "10000000", top: "0", left: "0" });
        // encodeLib.insert(encodeLib.BODY, loaderDiv, { addOn: "prepend" });

        let outerBody = encodeLib.content({ id: "outerBody", class: "outerBody", content: "", contentFitX: "100%", position: "relative", overflow: "auto", innerOverflow: "unset", innerDisplay: "block", height: "100%", padding: "0px", innerPosition: "relative", scrollbarWidth: "thin" });
        encodeLib.insert(encodeLib.BODY, outerBody, { addOn: "append" });

        SMS.loader = $("#loader");
        SMS.HTML = $("#outerBody");
        SMS.BODY = $("#outerBody").children(".content").first();

        await setTimeout(async function () {
            SMS.loader.remove();
        }, 2000);

        APP = SMS;

        // if (SMS.page == "settings") {
        //     SMS.SETTINGS.init();
        // }
        // else if(new URLSearchParams(window.location.search).get("t") == "settings") {
        //     await ZOHO.embeddedApp.on("PageLoad", async function () {
        //         SMS.SETTINGS.init();
        //     });
        // }
        // else {
        //     SMS.SEND.init();
        // }

        SMS.SEND.init();

    },    
    SEND: {
        init: async function() {

            SMS.extensionFieldName = "Name";
            SMS.extensionFieldMessage = SMS.extensionAPI + "Message";
            SMS.extensionFieldContactNumber = SMS.extensionAPI + "Customer_Number";
            SMS.extensionFieldModule = SMS.extensionAPI + "Module";
            // SMS.extensionFieldDeal = SMS.extensionAPI + "Deal";
            // SMS.extensionFieldContact = SMS.extensionAPI + "Contact";
            SMS.extensionFieldLead = SMS.extensionAPI + "Lead";
            // SMS.extensionFieldAccount = SMS.extensionAPI + "Account";
            // SMS.extensionFieldSchedule = SMS.extensionAPI + "Scheduled_Time";
            SMS.extensionFieldStatus = SMS.extensionAPI + "Status";
            SMS.extensionFieldMsgId = SMS.extensionAPI + "MsgId";
            SMS.extensionFieldDirection = SMS.extensionAPI + "Direction";

            // SMS.extensionTemplate = SMS.extensionAPI + "Vonage_SMS_Templates";
            SMS.extensionHistory = SMS.extensionAPI + "WhatsApp_Business_History";

            SMS.msgTextMaxLength = 160;
            SMS.SEND_ACTION = "SMS.SEND.ACTION";
            SMS.popupHeight = 610;

            SMS.HTML.css({ "max-width": "1200px", padding: "10px 30px 50px 30px", "min-width": "600px" });

            SMS.HTML.css({ height: "calc(100% - 85px)" });
            encodeLib.insert(SMS.BODY, encodeLib.scrollStyle({ element: "#" + SMS.HTML.attr("id"), marginTop: "15px", marginBottom: "62px", color: "#e2e2e2", borderRadius: "1.5px", scrollY: "6px" }), { addOn: "append" });

            

            await setTimeout(async function () {
                // await SMS.SEND.settingsPage();
            }, 1500);

        },
        settingsPage: async function () {
            APP = SMS;
            let imgObject = {
                outer: {
                    id: "appLogo",
                    width: "120px",
                    height: "40px",
                    borderRadius: "5px",
                    left: "-2px"
                },
                svg: {
                    svg: SMS.logo,
                    width: "100%",
                    height: "50px"
                }
            };
            let appLogoElement = encodeLib.svg(imgObject);    

            let settingsObj = {
                accountName: "Account",
                accountId: "",
                hideSettingsPage: new URLSearchParams(window.location.search).get("t") == "template" ? true : false,
                hideHelp: false,
                appLogo: appLogoElement,
                supportMail: SMS.supportMail,
                videoLink: SMS.videoLink,
                docLink: SMS.docLink,
                editLink: SMS.editLink
            };
            // await encodeLib.settingsPage(settingsObj);
        },
        credentialSet: async function() {

            // let k = await ZOHOCRM.searchRecord(ZOHOCRM.extensionHistory, `(${SMS.extensionFieldContactNumber}:equals:${"916383345508"})`, type="criteria");

            // k.sort(function(a, b) {
            //     var keyA = new Date(a.Created_Time),
            //       keyB = new Date(b.Created_Time);
            //     // Compare the 2 dates
            //     if (keyA < keyB) return -1;
            //     if (keyA > keyB) return 1;
            //     return 0;
            //   });

            // k.forEach(function(res) {

            //     if(res.whatsappbusiness0__Direction && res.whatsappbusiness0__Direction == "Incoming") {
            //         SMS.SEND.addMessage('incoming', res.whatsappbusiness0__Message, res.Created_Time, null);
            //     }
            //     else {
            //         SMS.SEND.addMessage('outgoing', res.whatsappbusiness0__Message, res.Created_Time, null);
            //     }
                
            // });
            // SMS.credentials = await ENAPP.getOrgVariable(SMS.extensionCredential);
            
            // if(SMS.credentials.apikey && SMS.credentials.apisecret) {
            //     if($("#accountId").length) {
            //         $("#accountId").text(`API Key: `+SMS.credentials.apikey);
            //     }
            //     // await SMS.SEND.credentialUpdate(); 
            // }
            // else {
            //     if($("#accountId").length) {
            //         $("#accountId").text(`API Key: ★★★★★★★★★`);
            //     }
            //     let popupObject = { htmlText: `<div style="min-width: 200px;">${'API Key or API Secret is empty.'}</div>`, backgroundColor: "#ffffffa3", buttonsDivPadding: "20px 0 0" };
            //     await encodeLib.popup(popupObject);
            // }
        },
        credentialUpdate: async function() {
            if(SMS.credentials.apikey && SMS.credentials.apisecret) {
                let request ={url : `https://rest.nexmo.com/account/get-balance?api_key=${SMS.credentials.apikey}&api_secret=${SMS.credentials.apisecret}`};
                let returnValue = await ENAPP.zohoHttpRequest('get', request).then(function(resp) {
                    if((!SMS.creditBalance || !SMS.creditBalance.length) && (!resp || (resp && resp.detail))) {
                        let popupObject = { htmlText: `<div style="min-width: 200px;">${resp && resp.detail ? resp.detail : 'API Key or API Secret is wrong.'}</div>`, backgroundColor: "#ffffffa3", buttonsDivPadding: "20px 0 0" };
                        encodeLib.popup(popupObject);
                    }
                    return resp;
                });
                let balance = returnValue && (returnValue.value || returnValue.value == 0) ? returnValue.value : "0.00";
                if(!SMS.creditBalance || !SMS.creditBalance.length) {
                    let appCredential = encodeLib.content({ content: `<span style="color: #2b465f;">Balance : </span><span class="creditsElementBalance" style='color: #595959;'>${balance}</span>`, contentType: "text", height: "max-content", width: "max-content", color: "#3d3d3f", fontSize: "15px", fontWeight: "600"});
                    encodeLib.insert("#subHeader", appCredential, {addOn: "prepend"});
                    SMS.creditBalance = $(".creditsElementBalance");
                }
                else {
                    SMS.creditBalance.text(balance);
                }
            }
        },
        ACTION: async function(text) {

            // if(!SMS.credentials.apikey || !SMS.credentials.apisecret) {
            //     let popupObject = { htmlText: `<div style="min-width: 200px;">${'API Key or API Secret is empty.'}</div>`, backgroundColor: "#ffffffa3", buttonsDivPadding: "20px 0 0", earseAll: true };
            //     await encodeLib.popup(popupObject);
            //     return;
            // }

            // let sendingPopupBodyElement = `<div class="sendingBody">
            //                                     <div style="text-align: center; padding: 30px 40px 0 40px; display: flex; justify-content: center; align-items: center; font-size: 16px;" class="sendingHead">
            //                                         <span>${encodeLib.loader({class: "smsSendingLoader", backgroundColor: "white", minWidth: "300px", height: "50px"})}</span>
            //                                     </div>
            //                                     <div style="padding: 0 65px 16px 65px;" class="progressBody">
            //                                         <div style="min-width: 200px;max-width: 100%;height: 2px;background-color: #f5f5f5;margin-top: 20px;">
            //                                             <div class="progress" style="height: 2px; background-color: #1a73e8; width: 0%;"></div>
            //                                             <div style="font-size: 11px;"><span class="loadingPercentage">0</span>%</div>
            //                                         </div>
            //                                     </div>
            //                                     <div style="margin-top: 10px; padding: 0 40px; text-align: center; display: flex; align-items: start; justify-content: center;flex-direction: column;">
            //                                         <div class="sendingCountDiv" style="${!ENAPP.isBulk ? 'display: none;' : ''}font-size: 16px; text-align: left; width: 100%; font-weight: 600; padding-bottom: 10px;text-align: center;"><span class="sendingCount">0</span>/${ENAPP.currentRecords.length}</div>
            //                                         <div class="sendingContent" style="display: block;width: 100%;"><span style="padding-bottom: 25px;display: block"><span style="padding-left: 11px;">Sending...</span></span></div>
            //                                     </div>
            //                                 </div>`;
            // let popupObject = { htmlText: sendingPopupBodyElement, backgroundColor: "#ffffffa3", buttonsDivPadding: "20px 0 0", earseAll: true};
            // encodeLib.popup(popupObject);
            // encodeLib.popupButtons.hide();
            
            let toNumber = "";
            if(!ENAPP.isBulk && !await encodeLib.saveToInPutValueCheck(await encodeLib.inputToMobileNumberCheck(ENAPP.toNumber), ENAPP.toNumber, ENAPP.toNumberError)) {
                encodeLib.popupClose();
                return;
            }
            else {
                toNumber = ENAPP.toNumber.val().trim();
            }
            if(ENAPP.isBulk && !await encodeLib.saveToInPutValueCheck(ENAPP.toNumbersList.find(".selectOption").val() ? false : "* Please select phone fields", ENAPP.toNumbersList, ENAPP.toNumberError)) {
                encodeLib.popupClose();
                return;
            }
            let message = text;
            // if(!await encodeLib.saveToInPutValueCheck(await ENAPP.textAreaToMessageCheck(ENAPP.MESSAGE), ENAPP.MESSAGE, ENAPP.MESSAGE_ERROR)) {
            //     encodeLib.popupClose();
            //     return;
            // }
            // else {
            //     message = ENAPP.MESSAGE.val().trim();
            // }
            // if(ENAPP.isScheduled && !ENAPP.scheduleTime.val()) {
            //     $(".sendingHead").html(encodeLib.svg({outer: {width: "32px", height: "32px"}, svg: {icon: "sendSchdule", width: "32px", height: "32px", fill: "chocolate"}}));
            //     $(".progressBody").hide();
            //     $(".sendingCountDiv").hide();
            //     $(".sendingContent").html("Please select schedule time.");
            //     // encodeLib.popupButtons.show();
            //     return;
            // }
            // else if(ENAPP.isScheduled && new Date(ENAPP.scheduleTime.val()).getTime() < new Date().getTime()) {
            //     $(".sendingHead").html(encodeLib.svg({outer: {width: "32px", height: "32px"}, svg: {icon: "sendSchdule", width: "32px", height: "32px", fill: "chocolate"}}));
            //     $(".progressBody").hide();
            //     $(".sendingCountDiv").hide();
            //     $(".sendingContent").html("Schedule time should be in future.");
            //     // encodeLib.popupButtons.show();
            //     return;
            // }
            // else if(ENAPP.isScheduled) {
            //     ENAPP.scheduledTime = encodeLib.toIsoString(ENAPP.scheduleTime.val());
            // }
            let countryCode = ENAPP.toNumberCountrycode.attr("value") ? ENAPP.toNumberCountrycode.attr("value") : "";
            if((!ENAPP.isBulk && toNumber && message) || (message)) {

                for(let i=0;i<ENAPP.currentRecords.length;i++) {
              
                    let currentRecord = ENAPP.currentRecords[i];        
                    await ENAPP.getMobileNumber(currentRecord);

                    if(!ENAPP.isBulk && toNumber != ENAPP.phoneRecord.Mobile && countryCode+toNumber != ENAPP.phoneRecord.Mobile) {
                        ENAPP.phoneRecord['Mobile'] = toNumber;
                        ENAPP.phoneRecord['recipientName'] = toNumber;
                        ENAPP.phoneRecord['id'] = '';     
                    }

                    let filledMessage = await ENAPP.getMessageWithFields(message, currentRecord);                    
                    let to = await ENAPP.checkMobileNumber(ENAPP.phoneRecord.Mobile, countryCode);
    
                    if(to != ENAPP.phoneRecord.Mobile.replace(/\D/g,'')) {
                        if(ENAPP.phoneRecord['recipientName'] == ENAPP.phoneRecord['Mobile'])				
                        ENAPP.phoneRecord['recipientName'] = to;
                        ENAPP.phoneRecord['Mobile'] = to;
                    }
                    
                    let reqData = {};
                    reqData[SMS.extensionFieldName] = `WhatsApp to ${ENAPP.phoneRecord.recipientName}`;
                    reqData[SMS.extensionFieldMessage] = filledMessage;
                    reqData[SMS.extensionFieldContactNumber] = ENAPP.phoneRecord.Mobile;
                    reqData[SMS.extensionFieldModule] = ENAPP.module;
                    reqData[SMS.extensionFieldDirection] = "Outgoing";
                    
                    ENAPP.historyFields.forEach(function(field){
                        if(field.data_type == "lookup" && ENAPP.phoneRecord.entity && ENAPP.phoneRecord.entity.includes(field.lookup.module)){
                            let fieldName = field.api_name == "Departments" && FORAPP == "zohorecruit" ? "Departments" : field.api_name == "Client" && FORAPP == "zohorecruit" ? "Clients" : field.api_name;
                            reqData[fieldName] = ENAPP.phoneRecord.id;
                        }
                        if(field.data_type == "lookup" && (field.lookup.module.api_name == ENAPP.module || (FORAPP == "zohorecruit" && field.lookup.module == ENAPP.module))) {
                            let fieldName = field.api_name == "Departments" && FORAPP == "zohorecruit" ? "Departments" : field.api_name == "Client" && FORAPP == "zohorecruit" ? "Clients" : field.api_name;
                            reqData[fieldName] = currentRecord.id;
                        }
                        
                    });

                    if(ENAPP.isScheduled && ENAPP.scheduledTime) {
                        reqData[SMS.extensionFieldSchedule] = ENAPP.scheduledTime;
                        reqData[SMS.extensionFieldStatus] = "Scheduled";

                        let requestMap = {status:"Your SMS has been scheduled successfully.", count: i};
                        await SMS.SEND.smsResponseToHistory(true, requestMap, reqData);
                    }
                    else {
                        let requestMap = { to: to, msg: filledMessage, count: i };
                        await SMS.SEND.sendSMSRequest(requestMap, reqData).then(async function(response) {
                            await SMS.SEND.sendSMSResponse(response.resp, response.requestMap, response.reqData);
                        });
                    }

                }
            }
            else {
                if(!ENAPP.isBulk) {
                    setTimeout(() => {
                        $(".sendingHead").html(encodeLib.svg({outer: {width: "24px", height: "24px"}, svg: {icon: "sendError", fill: "#cd5d04"}}));
                        $(".progressBody").hide();
                        $(".sendingCountDiv").hide();
                        $(".sendingContent").html("To number or message is wrong.");
                        // encodeLib.popupButtons.show();
                    }, 1000);
                }
            }
        },
        sendSMSRequest: async function(requestMap, reqData) {
            let request = {
                url : `https://graph.facebook.com/v22.0/581984271672102/messages`,
                headers: { Authorization: "Bearer "+"EAAmTNTZCXDTkBO3a6QuouhqCxMxmC3QyR9GEGArZAtUvy92P2X6SqqA1BYfZCEJYmuWslwhkt40PFgCPb1ZAEU7ajbJ72WZBih5t1DHVnZAqyPjRhcLJAfIJTVZBV0RU5uxYB5CdRKo24NCZAHwJladGSnj78ofWM7Q1cCLlMR8QUb4jZA1s3MhHfBIuv9ITx8bwA0Q34dj4INRnscW0R1ycqYXZAdVCl43ArBRiYZD", "Content-Type": "application/json"},
                body: {
                    "messaging_product": "whatsapp",
                    "to": requestMap.to,
                    "type": "text",                    
                    "recipient_type": "individual",
                    // "template": {
                    //     "name": "test_template", "language": { "code": "en_US" }
                    // },                    
                    "text": {
                        "preview_url": false,
                        "body": requestMap.msg
                    }
                }
            };
            return await ENAPP.zohoHttpRequest('post', request).then(function(resp) {
                return {resp: resp, requestMap: requestMap, reqData: reqData};
            });
        },
        sendSMSResponse: async function(resp, requestMap, reqData) {
            if(resp && typeof resp === 'object') {
                if(resp.messages && resp.messages[0] && resp.messages[0]["id"]) {
                    reqData[SMS.extensionFieldStatus] = "Sent";
                    reqData[SMS.extensionFieldMsgId] = resp.messages[0]["id"]+"";
                    await SMS.SEND.smsResponseToHistory(true, requestMap, reqData);
                }
                else if(resp.messages && resp.messages[0] && resp.messages[0]["error-text"]) {
                    reqData[SMS.extensionFieldStatus] = resp.messages[0]["error-text"];
                    requestMap['status'] = resp.messages[0]["error-text"];
                    if(!ENAPP.isBulk) {
                        await SMS.SEND.popupSccuessExit(false, requestMap);
                    }
                    else {
                        await SMS.SEND.smsResponseToHistory(false, requestMap, reqData);
                    }
                }
                else {
                    reqData[SMS.extensionFieldStatus] = "failed";
                    requestMap['status'] = 'SMS sent is failed.';
                    if(!ENAPP.isBulk) {
                        await SMS.SEND.popupSccuessExit(false, requestMap);
                    }
                    else {
                        await SMS.SEND.smsResponseToHistory(false, requestMap, reqData);
                    }
                }
            }
            else {
                reqData[SMS.extensionFieldStatus] = "failed";
                requestMap['status'] = 'SMS sent is failed.';
                if(!ENAPP.isBulk) {
                    await SMS.SEND.popupSccuessExit(false, requestMap);
                }
                else {
                    await SMS.SEND.smsResponseToHistory(false, requestMap, reqData);
                }
            }
        },
        addMessage: function(type, text, time, media) {

            let chatMessages = document.getElementById('chat-messages');
            time = time ? time : Date.now();
            time = SMS.SEND.getCurrentTime(time);
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;
            
            if (text) {
                messageDiv.innerHTML = `
                    <div class="message-text">${text}</div>
                    <div class="message-time">${time}</div>
                `;
            }
            
            if (media) {
                let mediaHtml = '';
                
                if (media.type === 'image') {
                    mediaHtml = `
                        <div class="media-attachment">
                            <img src="${media.url}" alt="Attached image">
                        </div>
                    `;
                } else if (media.type === 'video') {
                    mediaHtml = `
                        <div class="media-attachment">
                            <video controls>
                                <source src="${media.url}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    `;
                } else if (media.type === 'file') {
                    mediaHtml = `
                        <div class="media-attachment">
                            <div class="file">
                                <span class="file-icon">📄</span>
                                <span>${media.name}</span>
                            </div>
                        </div>
                    `;
                }
                
                if (!text) {
                    messageDiv.innerHTML = mediaHtml + `<div class="message-time">${time}</div>`;
                } else {
                    messageDiv.innerHTML += mediaHtml;
                }
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        },
        getCurrentTime: function (time) {
            const now = time ? new Date(time) : new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            return `${hours}:${minutes} ${ampm}`;
        },
        smsResponseToHistory: async function(Success, requestMap, reqData) {
            return await ENAPP.createRecord(SMS.extensionHistory, reqData).then(async function(resp) {
                if(resp) {
                    await SMS.SEND.popupSccuessExit(Success, requestMap);
                }
                else {
                    setTimeout(function() {
                        $(".sendingHead").html(encodeLib.svg({outer: {width: "24px", height: "24px"}, svg: {icon: "sendError", fill: "#cd5d04"}}));
                        $(".progressBody").hide();
                        $(".sendingCountDiv").hide();
                        $(".sendingContent").html("Opps! Something went wrong from server side. Please try after sometimes!!!");
                    }, 1000);
                }
            });
        },
        popupSccuessExit: async function(Success, requestMap) {

            if(!requestMap['status']) {
                if(!ENAPP.isBulk) {
                    requestMap['status'] = 'Your SMS has been sent successfully.';
                }
                else {
                    requestMap['status'] = 'Your Bulk SMS has been sent successfully.';
                }
            }
            
            let currentRecordPosition = requestMap.count + 1;
            let sendingposition = Number(((100/ENAPP.currentRecords.length)*currentRecordPosition)).toFixed();  

            if(!ENAPP.isBulk) {
                $(".loadingPercentage").html(sendingposition);
                $(".progress").css({"width": sendingposition+"%"});
                if(!Success) {
                    setTimeout(async function() {
                        $(".sendingHead").html(encodeLib.svg({outer: {width: "24px", height: "24px"}, svg: {icon: "sendError", fill: "#cd5d04"}}));
                        $(".progressBody").hide();
                        $(".sendingContent").html(requestMap.status);
                        // encodeLib.popupButtons.show();
                        await SMS.SEND.credentialUpdate();
                    }, 1000); 
                }
                else {
                    setTimeout(function() {
                        $(".sendingHead").html(encodeLib.svg({outer: {width: "24px", height: "24px"}, svg: {icon: "sendSuccess", fill: "green"}}));
                        $(".progressBody").hide();
                        $(".sendingContent").html(requestMap.status);
                        // encodeLib.popupButtons.show();
                        // setTimeout(function() {	ENAPP.popupClose(); }, 1500);
                    }, 1000);
                }
            }
            else {      
                if(!Success) {
                    await setTimeout(() => {
                        $(".sendingCountDiv").show();
                        $(".sendingCount").html(currentRecordPosition);
                        $(".loadingPercentage").html(sendingposition);
                        $(".progress").css({"width": sendingposition+"%"});
                        $(".sendingContent span").text(`Message ${ENAPP.isScheduled && ENAPP.scheduledTime ? 'scheduled ':'sent '} ${'is failed for this '+ENAPP.phoneRecord.recipientName+'.'}`);
                    }, 1000);
                }                
                else {
                    await setTimeout(() => {
                        $(".sendingCountDiv").show();
                        $(".sendingCount").html(currentRecordPosition);
                        $(".loadingPercentage").html(sendingposition);
                        $(".progress").css({"width": sendingposition+"%"});
                        $(".sendingContent span").text(`Message ${ENAPP.isScheduled && ENAPP.scheduledTime ? 'scheduled ':'sent ' } ${'for this '+ENAPP.phoneRecord.recipientName+'.'}`); 
                    }, 1000);
                }        
                if(ENAPP.currentRecords.length-1 == requestMap.count) {
                    setTimeout(function() {
                        $(".sendingHead").html(encodeLib.svg({outer: {width: "24px", height: "24px"}, svg: {icon: "sendSuccess", fill: "green"}}));
                        $(".progressBody").hide();
                        $(".sendingCountDiv").hide();
                        $(".sendingContent").html(`Your Bulk SMS has been ${ENAPP.isScheduled && ENAPP.scheduledTime ? 'scheduled ':'sent '}successfully.`);
                        // encodeLib.popupButtons.show();
                        // setTimeout(function() {	ENAPP.popupClose(); }, 1500);
                    }, 2000);                
                }
            }
        
        }
    },
    SETTINGS: {

        init: async function() {

            let imgObject = {
                outer: {
                    width: "135px",
                    height: "85px",
                    borderRadius: "5px"
                },
                svg: {
                    svg: SMS.logo,
                    width: "100%",
                    height: "unset"
                }
            };
            let appLogoElement = encodeLib.svg(imgObject);
            let titleText = "<div style='position: relative;left: 10px;top: 0px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size: 24px;color: #757575;padding-right: 20px;'>Settings</div>";

            let helpObj = {
                hideHelp: false,
                titleText: titleText,
                appLogo: appLogoElement
            };
            await SMS.SETTINGS.headerSetup(helpObj);

            let savedApiKeyDiv = encodeLib.content({ id: "savedApiKeyDiv", contentFitX: "100%" });
            encodeLib.insert(SMS.BODY, savedApiKeyDiv, { addOn: "append" });
            SMS.SETTINGS.savedApiKeyDiv = $("#savedApiKeyDiv");
            SMS.SETTINGS.savedApiKeyDivContent = SMS.SETTINGS.savedApiKeyDiv.children(".content").first();

            let editApiKeyDiv = encodeLib.content({ id: "editApiKey", position: "relative", contentFitX: "100%", top: "0px", zIndex: "1000", overflow: "unset", innerOverflow: "unset", hidden: true });
            encodeLib.insert(SMS.BODY, editApiKeyDiv, { addOn: "append" });
            SMS.SETTINGS.editApiKey = $("#editApiKey");
            SMS.SETTINGS.editApiKeyContent = SMS.SETTINGS.editApiKey.children(".content").first();

            let webhookLinkDiv = encodeLib.content({ id: "webhookLink", position: "relative", contentFitX: "100%", transition: "all 0.3s ease 0s;", hidden: true });
            encodeLib.insert(SMS.BODY, webhookLinkDiv, { addOn: "append" });
            SMS.SETTINGS.webhookUrlLinkOuterElement = $("#webhookLink");
            SMS.SETTINGS.webhookUrlLinkOuterElementContent = SMS.SETTINGS.webhookUrlLinkOuterElement.children(".content").first();
             
            if (FORAPP == "zohorecruit") {
                SMS.editLink = await ZOHORECRUIT.configurePageLink(SMS.extensionAPI.slice(0, -2));
            }

            let apikeyContentButton = {
                id: "savedApikey",
                class: "buttonViewElement",
                color: "#0000008c",
                padding: "7px 15px 6px 10px",
                backgroundColor: "white",
                lineClamp: 1,
                borderRadius: "10px",
                fontSize: "16px",
                onclick: {
                    thisElement: true,
                    functionName: "encodeLib.addInputFocusClass"
                }
            };

            if(!encodeLib.outerClickFunctions.includes(encodeLib.buttonFocusOuterClickFunc)) {
                encodeLib.outerClickFunctions.push(encodeLib.buttonFocusOuterClickFunc);
            }

            let svgObject = {
                outer: {
                    cursor: "pointer",
                    position: "relative",
                    right: "15px",
                    margin: "2px 0 0 0",
                    attributes: ` hoverFillIn="blue" hoverfillout="#e0e0e0"`,
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
                        functionName: SMS.editLink ? `window.open('${SMS.editLink}', '_blank')` : "SMS.SETTINGS.openEditApikeyDiv"
                    }
                },
                svg: {
                    icon: "editOutline",
                    fill: "#e0e0e0"
                }
            };
            let svgElementEdit = encodeLib.svg(svgObject);

            svgObject = {
                outer: {
                    margin: "2px 0 0 0",
                },
                svg: {
                    icon: "circleTick",
                    fill: "green"
                }
            };
            let svgElementTick = encodeLib.svg(svgObject);

            apikeyContentButton.content = {textContent: "", svgContent: svgElementEdit+svgElementTick};
            apikeyContentButton.contentType = "buttonView";
            let apikeyContentButtonElement = encodeLib.content(apikeyContentButton);

            addInput = {
                content: {
                    content: apikeyContentButtonElement
                },
                label: {
                    content: `<div style="border: 0;border-bottom: 2px;border-style: inset;padding-bottom: 5px;font-family: 'Roboto', sans-serif;color: #737373;font-size: 17px;">API Key</div>`,
                    padding: "0 0 0 1px",
                    color: "#000000de",
                    lineClamp: 1,
                    height: "50px",
                    margin: "5px 0 15px 0"
                }
            };

            encodeLib.insert(SMS.SETTINGS.savedApiKeyDivContent, encodeLib.labelContent(addInput));
            SMS.SETTINGS.savedApikeyElement = $("#savedApikey").find(".textContent .content");

            let apisecretContentButton = {
                id: "savedapisecret",
                class: "buttonViewElement",
                color: "#0000008c",
                padding: "7px 15px 6px 10px",
                backgroundColor: "white",
                lineClamp: 1,
                borderRadius: "10px",
                fontSize: "16px",
                onclick: {
                    thisElement: true,
                    functionName: "encodeLib.addInputFocusClass"
                }
            };

            if(!encodeLib.outerClickFunctions.includes(encodeLib.buttonFocusOuterClickFunc)) {
                encodeLib.outerClickFunctions.push(encodeLib.buttonFocusOuterClickFunc);
            }

            svgObject = {
                outer: {
                    cursor: "pointer",
                    position: "relative",
                    right: "15px",
                    margin: "2px 0 0 0",
                    attributes: ` hoverFillIn="blue" hoverfillout="#e0e0e0"`,
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
                        functionName: SMS.editLink ? `window.open('${SMS.editLink}', '_blank')` : "SMS.SETTINGS.openEditApikeyDiv"
                    }
                },
                svg: {
                    icon: "editOutline",
                    fill: "#e0e0e0"
                }
            };
            svgElementEdit = encodeLib.svg(svgObject);

            svgObject = {
                outer: {
                    margin: "2px 0 0 0",
                },
                svg: {
                    icon: "circleTick",
                    fill: "green"
                }
            };
            svgElementTick = encodeLib.svg(svgObject);

            apisecretContentButton.content = {textContent: "", svgContent: svgElementEdit+svgElementTick};
            apisecretContentButton.contentType = "buttonView";
            let apisecretContentButtonElement = encodeLib.content(apisecretContentButton);

            addInput = {
                content: {
                    content: apisecretContentButtonElement
                },
                label: {
                    content: `<div style="border: 0;border-bottom: 2px;border-style: inset;padding-bottom: 5px;font-family: 'Roboto', sans-serif;color: #737373;font-size: 17px;">API Secret</div>`,
                    padding: "0 0 0 1px",
                    color: "#000000de",
                    lineClamp: 1,
                    height: "50px",
                    margin: "5px 0 15px 0"
                },
                outer: {
                    margin: "20px 0 0 0"
                }
            };

            encodeLib.insert(SMS.SETTINGS.savedApiKeyDivContent, encodeLib.labelContent(addInput), {addOn: "append"});
            SMS.SETTINGS.savedapisecretElement = $("#savedapisecret").find(".textContent .content");

    
            let webhookContentButton = {
                id: "webhookUrlLink",
                class: "buttonViewElement webhookUrlContent",    
                color: "#0000008c",
                padding: "7px 15px 6px 10px",
                backgroundColor: "white",
                fontFamily: "'Roboto', sans-serif",
                fontWeight: "500",
                fontSize: "16px",
                borderRadius: "10px",
                lineClamp: 1,
                lineHeight: "1.5",
                onclick: {
                    thisElement: true,
                    functionName: "encodeLib.addInputFocusClass"
                }
            };
    
            svgObject = {
                outer: {
                    cursor: "pointer",
                    position: "relative",
                    margin: "2px 0 0 7px",
                    attributes: ` copyContent=".webhookUrlContent .textContent .content" hoverFillIn="#1967d2" hoverfillout="#e0e0e0"`,
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
                        functionName: "encodeLib.textCopyInCommand"
                    }
                },
                svg: {
                    icon: "copy",
                    fill: "#e0e0e0"
                }
            };
            let svgElementCopy = encodeLib.svg(svgObject);
    
            webhookContentButton.content = {textContent: "", svgContent: svgElementCopy};
            webhookContentButton.contentType = "buttonView";
            let webhookContentButtonElement = encodeLib.content(webhookContentButton);
    
            addInput = {
                content: {
                    content: webhookContentButtonElement
                },
                label: {
                    content: `<div style="border: 0;border-bottom: 2px;border-style: inset;padding-bottom: 5px;font-family: 'Roboto', sans-serif;color: #737373;font-size: 17px;">Webhook Url</div>`,
                    padding: "0 0 0 1px",
                    color: "#000000de",
                    lineClamp: 1,
                    height: "50px",
                    margin: "5px 0 15px 0"
                }
            };

            if(FORAPP == "zohocrm") {
                encodeLib.insert(SMS.SETTINGS.webhookUrlLinkOuterElementContent, encodeLib.labelContent(addInput));
                SMS.SETTINGS.webhookUrlLinkElement = $(".webhookUrlContent .textContent .content");
            }

            addInput = {
                content: {
                    contentType: "input",
                    type: "text",
                    id: "apikey",
                    placeholder: "API Key",
                    fontWeight: "600",
                    color: "#0000008c",
                    minHeight: "37px",
                    padding: "26px 45px 22px 18px",
                    fontSize: "16px",
                    attributes: `errText="* API Key is empty."`,
                    borderRadius: "10px",
                    onfocusIn: {
                        thisElement: true,
                        errorInfoElement: "#apikeyError",
                        errorInfoAction: "slideUp, 300",
                        functionName: "SMS.SETTINGS.apiKeyErrorCheck"
                    },
                    onfocusOut: {
                        thisElement: true,
                        errorInfoElement: "#apikeyError",
                        errorInfoAction: "slideDown, 300",
                        functionName: "SMS.SETTINGS.apiKeyErrorCheck"
                    }
                },
                label: {
                    content: `<div style="border: 0;border-bottom: 2px;border-style: inset;padding-bottom: 5px;font-family: 'Roboto', sans-serif;color: #737373;font-size: 17px;">API Key</div>`,
                    padding: "0 0 0 1px",
                    lineClamp: 1,
                    color: "#000000de",
                    height: "50px",
                    margin: "5px 0 15px 0"
                },
                error: {
                    id: "apikeyError",
                    positionX: "start",
                    padding: "0 175px 0 0"
                },
                outer: {
                    id: "apikeyOuter"
                },
                checkLoader: {
                    height: "calc(100% - 30px)",
                    top: "30px",
                    padding: "0px 0px 9px"
                }
            };
            
            encodeLib.insert(SMS.SETTINGS.editApiKeyContent, encodeLib.labelContent(addInput));
            SMS.SETTINGS.apikeyInput = $("#apikey");
            SMS.SETTINGS.apikeyInputError = $("#apikeyError");

            addInput = {
                content: {
                    contentType: "input",
                    type: "text",
                    id: "apisecret",
                    placeholder: "API Secret",
                    fontWeight: "600",
                    color: "#0000008c",
                    minHeight: "37px",
                    padding: "26px 45px 22px 18px",
                    fontSize: "16px",
                    attributes: `errText="* API Secret is empty."`,
                    borderRadius: "10px",
                    onfocusIn: {
                        thisElement: true,
                        errorInfoElement: "#apisecretError",
                        errorInfoAction: "slideUp, 300",
                        functionName: "SMS.SETTINGS.apiKeyErrorCheck"
                    },
                    onfocusOut: {
                        thisElement: true,
                        errorInfoElement: "#apisecretError",
                        errorInfoAction: "slideDown, 300",
                        functionName: "SMS.SETTINGS.apiKeyErrorCheck"
                    }
                },
                label: {
                    content: `<div style="border: 0;border-bottom: 2px;border-style: inset;padding-bottom: 5px;font-family: 'Roboto', sans-serif;color: #737373;font-size: 17px;">API Secret</div>`,
                    padding: "0 0 0 1px",
                    lineClamp: 1,
                    color: "#000000de",
                    height: "50px",
                    margin: "5px 0 15px 0"
                },
                error: {
                    id: "apisecretError",
                    positionX: "start",
                    padding: "0 175px 0 0"
                },
                outer: {
                    id: "apisecretOuter",
                    margin: "20px 0 0 0"
                },
                checkLoader: {
                    height: "calc(100% - 30px)",
                    top: "30px",
                    padding: "0px 0px 9px"
                }
            };
            
            encodeLib.insert(SMS.SETTINGS.editApiKeyContent, encodeLib.labelContent(addInput), {addOn: "append"});
            SMS.SETTINGS.apisecretInput = $("#apisecret");
            SMS.SETTINGS.apisecretInputError = $("#apisecretError");

            let closeButtonObject = {
                id: "closeButton",
                content: "Close",
                hoverInBackgroundColor: "rgb(0 0 0 / 8%)",
                hoverOutBackgroundColor: "rgb(0 0 0 / 4%)",
                padding: "1px 15px 0px",
                color: "#0000008c",
                fontFamily: "'Roboto', sans-serif",
                backgroundColor: "rgb(0 0 0 / 4%)",
                onclick: {
                    thisElement: true,
                    functionName: "SMS.SETTINGS.closeEditApikeyDiv"
                }
            };
 
            let closeButton = encodeLib.button(closeButtonObject) + encodeLib.onLoaded({runCode: `$('#closeButton').hide();`});

            let saveButtonObject = {
                id: "saveButton",
                content: "Save",
                margin: "0 0 0 8px",
                padding: "1px 20px 0",                
                fontFamily: "'Roboto', sans-serif",
                onclick: {
                    thisElement: true,
                    functionName: "SMS.SETTINGS.ACTION"
                }
            }; 
 
            let saveButton = encodeLib.button(saveButtonObject);

            let buttonsDiv = encodeLib.content({content: closeButton+saveButton, position: "relative", top: "15px", direction: "row", contentFitX: "100%", positionX: "end"});
            encodeLib.insert(SMS.SETTINGS.editApiKeyContent, buttonsDiv, {addOn: "append"});  
            SMS.SETTINGS.closeButton = $("#closeButton");
            
            addInput = {
                content: {
                    content: `If you would like to customize the integration for your needs reach out us at<b style="margin-left: 5px;user-select: all;">${SMS.supportMail ? SMS.supportMail : 'support@encodingz.com'}</b>.`,
                    innerDisplay: "inline-block",
                    lineHeight: "22px",
                    color: "#7b7b7b"
                },
                label: {
                    content: `<div style="border: 0;border-bottom: 2px;border-style: inset;padding-bottom: 5px;font-family: 'Roboto', sans-serif;color: #737373;font-size: 17px;">Contact Us</div>`,
                    padding: "0 0 0 1px",
                    color: "#000000de",
                    lineClamp: 1,
                    height: "50px",
                    margin: "5px 0 10px 0"
                },
                outer: {
                    margin: "20px 0 40px 0"
                }
            };
            encodeLib.insert(SMS.BODY, encodeLib.labelContent(addInput), { addOn: "append" });
            
            SMS.SETTINGS.SET();
    
        },
        headerSetup: async function (helpObj={}) {

            if(helpObj && !helpObj.hideHelp) {
                helpObj.hideHelp = false;
            }
            if(helpObj && !helpObj.titleText) {
                helpObj.titleText = "<div style='position: relative;left: 10px;top: 0px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;padding-right: 20px;'>Settings</div>";
            }
            if(helpObj && !helpObj.appLogo) {
                helpObj.appLogo = "";
            }

            let paddingSettingsPage = `150px`;
            if (SMS.page == "settings") {
                paddingSettingsPage = `50px`;
            }
            SMS.HTML.css({ "max-width": "1200px", padding: `65px ${paddingSettingsPage} 30px`, "min-width": "600px" });

            let svgObject = {
                outer: {
                    id: "helpVideo",
                    cursor: "pointer",
                    position: "relative",
                    left: '2px',
                    margin: "0 0 0 7px",
                    attributes: ` hoverFillIn="#ff0404" hoverFillOut="#e0e0e0"`,
                    width: "30px",
                    height: "30px",
                    borderRadius: "7px",
                    transition: "0.3s",
                    title: "Demo Video",
                    onmouseover: {
                        runCode: `$(this).find('svg').css('width', '32px');$(this).find('svg').css('height', '32px');$(this).find('svg').css('fill', '#ff0404');`
                    },
                    onmouseout: {
                        runCode: `$(this).find('svg').css('width', '30px');$(this).find('svg').css('height', '30px');$(this).find('svg').css('fill', '#e0e0e0');`
                    },
                    onmousedown: {
                        thisElement: true,
                        runCode: `$(this).find('svg').css('width', '30px');$(this).find('svg').css('height', '30px');`,
                        functionName: "encodeLib.svgHoverIn"
                    },
                    onmouseup: {
                        thisElement: true,
                        runCode: `$(this).find('svg').css('width', '32px');$(this).find('svg').css('height', '32px');$(this).find('svg').css('fill', '#ff0404');`,
                        functionName: "encodeLib.svgHoverOut"
                    },
                    onclick: {
                        thisElement: true,
                        runCode: `window.open('${SMS.videoLink}', '_blank');`
                    }
                },
                svg: {
                    icon: "video",
                    fill: "#e0e0e0",
                    width: "30px",
                    height: "30px"
                }
            };
            let svgElementVideo = encodeLib.svg(svgObject);

            svgObject = {
                outer: {
                    id: "helpDoc",
                    cursor: "pointer",
                    position: "relative",
                    left: "2px",
                    margin: "0 0 0 7px",
                    attributes: ` hoverFillIn="#387ef3" hoverFillOut="#e0e0e0"`,
                    width: "30px",
                    height: "30px",
                    borderRadius: "7px",
                    transition: "0.3s",
                    title: "Help Doc",
                    onmouseover: {
                        runCode: `$(this).find('svg').css('width', '28px');$(this).find('svg').css('height', '28px');$(this).find('svg').css('fill', '#387ef3');`
                    },
                    onmouseout: {
                        runCode: `$(this).find('svg').css('width', '26px');$(this).find('svg').css('height', '26px');$(this).find('svg').css('fill', '#e0e0e0');`
                    },
                    onmousedown: {
                        thisElement: true,
                        runCode: `$(this).find('svg').css('width', '26px');$(this).find('svg').css('height', '26px');`,
                        functionName: "encodeLib.svgHoverIn"
                    },
                    onmouseup: {
                        thisElement: true,
                        runCode: `$(this).find('svg').css('width', '28px');$(this).find('svg').css('height', '28px');$(this).find('svg').css('fill', '#387ef3');`,
                        functionName: "encodeLib.svgHoverOut"
                    },
                    onclick: {
                        thisElement: true,
                        runCode: `window.open('${SMS.docLink}', '_blank');`
                    }
                },
                svg: {
                    icon: "article",
                    fill: "#e0e0e0",
                    width: "26px",
                    height: "26px"
                }
            };
            let svgElementDoc = encodeLib.svg(svgObject);

            svgObject = {
                outer: {
                    id: "helpMail",
                    cursor: "pointer",
                    position: "relative",
                    left: "2px",
                    attributes: ` hoverFillIn="#333333" hoverFillOut="#e0e0e0"`,
                    width: "22px",
                    height: "30px",
                    borderRadius: "7px",
                    transition: "0.3s",
                    title: `${SMS.supportMail}`,
                    onmouseover: {
                        runCode: `$(this).find('svg').css('width', '29px');$(this).find('svg').css('height', '29px');$(this).find('svg').css('fill', '#333333');`
                    },
                    onmouseout: {
                        runCode: `$(this).find('svg').css('width', '27px');$(this).find('svg').css('height', '27px');$(this).find('svg').css('fill', '#e0e0e0');`
                    },
                    onmousedown: {
                        thisElement: true,
                        runCode: `$(this).find('svg').css('width', '27px');$(this).find('svg').css('height', '27px');`,
                        functionName: "encodeLib.svgHoverIn"
                    },
                    onmouseup: {
                        thisElement: true,
                        runCode: `$(this).find('svg').css('width', '29px');$(this).find('svg').css('height', '29px');$(this).find('svg').css('fill', '#333333');`,
                        functionName: "encodeLib.svgHoverOut"
                    },
                    onclick: {
                        thisElement: true,
                        runCode: `$('.supportMailText').css('transform', 'scale(1)');`
                    }
                },
                svg: {
                    icon: "helpOutline",
                    fill: "#e0e0e0",
                    width: "27px",
                    height: "27px"
                }
            };
            let svgElementHelp = encodeLib.svg(svgObject);

            let closeClickAction = "";
            if (SMS.page == "settings") {
                let closeSvgObject = {
                    outer: {
                        width: "40px",
                        height: "40px",
                        cursor: "pointer"
                    },
                    svg: {
                        icon: "close",
                        width: "40px",
                        height: "40px",
                        fill: "#e1e1e1"
                    }
                };
                closeClickAction = encodeLib.content({
                    content: encodeLib.svg(closeSvgObject),
                    contentType: "content",
                    position: "relative",
                    top: "",
                    right: "0px",
                    margin: "0 0 0 15px",
                    backgroundColor: "whitesmoke",
                    positionX: "center",
                    positionY: "center",
                    width: "30px",
                    height: "30px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    onmouseover: {
                        thisElement: true,
                        runCode: `this.style.backgroundColor='#f9efef';this.querySelector('svg').style.fill = '#b75c5c';this.style.border='1px solid #d7a5a52e';`
                    },
                    onmouseout: {
                        thisElement: true,
                        runCode: `this.style.backgroundColor='whitesmoke';this.querySelector('svg').style.fill = '#e1e1e1';this.style.border='unset';`
                    },
                    onclick: {
                        thisElement: true,
                        runCode: `SMS.page='';SMS.init();`
                    }
                });
            }

            svgObject = {
                outer: {
                    cursor: "pointer",
                    position: "relative",
                    margin: "3px 0 0 7px",
                    attributes: `copyContent=".helpSupportMail" hoverFillIn="#1967d2" hoverfillout="#e0e0e0"`,
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
                        functionName: "encodeLib.textCopyInCommand"
                    }
                },
                svg: {
                    width: "18px",
                    height: "18px",
                    icon: "copy",
                    fill: "#e0e0e0"
                }
            };
            let svgElementCopy = encodeLib.svg(svgObject);

            let mailContent = `<div class="supportMailText" style="font-size: 14px;position: absolute;width: max-content;color: #757575;display: flex;align-items: center;justify-content: center;top: 40px;text-shadow: 0 0 transparent;right: 0;cursor: default;padding: 6px 10px 7px 14px;background-color: white;border-radius: 7px;height: 23px;font-weight: 500;font-family: 'Segoe UI', sans-serif;box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 5px;transform-origin: top right;transform: scale(0);transition: 0.2s;"><div class="helpSupportMail">${SMS.supportMail}</div>${svgElementCopy}</div>`;
            let helpElement = `<div style="display: flex;">${SMS.supportMail ? svgElementHelp : ''}${SMS.supportMail ? mailContent : ''}${SMS.docLink ? svgElementDoc : ''}${SMS.videoLink ? svgElementVideo : ''}${closeClickAction}</div>`;
            let titleEelement = encodeLib.content({ content: helpObj.titleText + `${helpObj.hideHelp ? '' : helpElement}`, contentType: "content", color: "#252525", position: "relative", direction: "row", contentFitX: "100%", positionX: "space-between", positionY: "center", top: "0px", overflow: "unset", innerOverflow: "unset" });

            encodeLib.outerMailOuterClickFunc = function (e) {
                let thisElement = $(".supportMailText");
                let thisElementExtra = $("#helpMail");
                if (!thisElement.is(e.target) && thisElement.has(e.target).length === 0 && !thisElementExtra.is(e.target) && thisElementExtra.has(e.target).length === 0) {
                    thisElement.css("transform", "scale(0)");
                }
            };

            if (!encodeLib.outerClickFunctions.includes(encodeLib.outerMailOuterClickFunc)) {
                encodeLib.outerClickFunctions.push(encodeLib.outerMailOuterClickFunc);
            }
            
            let headerElement = encodeLib.content({
                content: helpObj.appLogo + titleEelement,
                position: "relative",
                direction: "row",
                positionY: "center",
                height: "120px",
                left: "0px",
                contentFitX: "100%",
                overflow: "unset",
                innerOverflow: "unset",
                zIndex: "10000"
            });
            encodeLib.insert(SMS.BODY, headerElement, { addOn: "prepend" });

        },
        SET: async function() {
            if(FORAPP == "zohorecruit") {
                let apikey = await ENAPP.getOrgVariable(SMS.extensionApikey);
                let apisecret = await ENAPP.getOrgVariable(SMS.extensionApisecret);
                SMS.credentials = {apikey: apikey, apisecret: apisecret};
            }
            else {
                SMS.credentials = await ENAPP.getOrgVariable(SMS.extensionCredential);
            }
            if(FORAPP == "zohocrm") {
                SMS.SETTINGS.setZAPIURL();
            }
            if (SMS.credentials.apikey) {
                SMS.SETTINGS.Success();
            }
            else {
                SMS.SETTINGS.fail();
            }
        },
        Success: function() {
            SMS.SETTINGS.closeEditApikeyDiv();
            SMS.SETTINGS.savedApikeyElement.html(encodeLib.safeString(SMS.credentials.apikey).substring(0,5)+"&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;");
            SMS.SETTINGS.savedapisecretElement.html(encodeLib.safeString(SMS.credentials.apisecret).substring(0,5)+"&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;");
            SMS.SETTINGS.apikeyInput.val(SMS.credentials.apikey);
            SMS.SETTINGS.apisecretInput.val(SMS.credentials.apisecret);
            SMS.loader.remove();
        },
        fail: function() {
            SMS.SETTINGS.closeButton.fadeOut();
            SMS.SETTINGS.openEditApikeyDiv();
            SMS.loader.remove();
        },
        setZAPIURL: async function() {
            let webHookurl = await ENAPP.getZAPIURL();
            SMS.SETTINGS.webhookUrlLinkElement.text(webHookurl);
            SMS.SETTINGS.webhookUrlLinkOuterElement.show();
        },
        openEditApikeyDiv: function(thisElement) {
            if(SMS.credentials.apikey) {
                SMS.SETTINGS.closeButton.fadeIn();
            }
            else {
                SMS.SETTINGS.closeButton.fadeOut();
            }
            SMS.SETTINGS.savedApiKeyDiv.hide();
            SMS.SETTINGS.webhookUrlLinkOuterElement.css({ "margin-top": "25px" });
            encodeLib.elementAction("show 500", SMS.SETTINGS.editApiKey);
            if(thisElement && $(thisElement) && $(thisElement).parent().parent().attr("id") == "savedapisecret") {
                SMS.SETTINGS.apisecretInput.focus();
            }
            else {
                SMS.SETTINGS.apikeyInput.focus();
            }
        },
        closeEditApikeyDiv: function() {       
            encodeLib.elementAction("hide", SMS.SETTINGS.editApiKey);
            SMS.SETTINGS.webhookUrlLinkOuterElement.css({ "margin-top": "20px" });
            SMS.SETTINGS.closeButton.fadeOut();
            SMS.SETTINGS.savedApiKeyDiv.show(500);
        },
        apiKeyErrorCheck: async function(thisElement) {
            let errCheck = await encodeLib.inputEmptyCheck(thisElement);
            if(!errCheck) {
                let apikeyValue = SMS.SETTINGS.apikeyInput.val().trim();                
                let apisecretValue = SMS.SETTINGS.apisecretInput.val().trim();
                if(apikeyValue && apisecretValue) {
                    let request = {url : `https://rest.nexmo.com/account/get-balance?api_key=${apikeyValue}&api_secret=${apisecretValue}`};
                    let returnValue = await ENAPP.zohoHttpRequest('get', request).then(function(resp) {
                        return resp;
                    });
                    let errText = "* API Key or API Secret is wrong.";
                    if(returnValue && (returnValue.value || returnValue.value == 0)) {
                        errText = false;
                        await encodeLib.elementAction("slideUp, 300", $(".enInputError"));
                    }
                    else if(returnValue && returnValue.detail) {
                        errText = returnValue.detail;
                    }
                    return errText;
                }
                else if(apikeyValue == "" || apisecretValue == "") {
                    return false;
                }
                else {
                    return $(thisElement).attr("errText");
                }
            }
            else {
                return errCheck;
            }
        },
        ACTION: async function() {

            let savingPopupBodyElement = `<div class="savingBody" style="min-width: 300px;">
                                            ${encodeLib.loader({class: "saveTemplateLoader", backgroundColor: "white", minWidth: "300px", height: "70px"})}
                                            <div class="savingSvgContent" style="height: 50px; display: flex; align-items: center; justify-content: center;">${''}</div>
                                            <div class="savingContent" style="text-align: center; padding-left: 15px; padding-bottom: 15px; padding-right: 15px;">${'<span style="padding-left: 15px;">Saving...</span>'}</div>
                                          </div>`;
            let popupObject = { htmlText: savingPopupBodyElement, backgroundColor: "#ffffffa3", earseAll: true };
            encodeLib.popup(popupObject);
            $(".savingSvgContent").hide();
            encodeLib.popupButtons.hide();

            let apikeyValue = "";
            if(!await encodeLib.saveToInPutValueCheck(await SMS.SETTINGS.apiKeyErrorCheck(SMS.SETTINGS.apikeyInput), SMS.SETTINGS.apikeyInput, SMS.SETTINGS.apikeyInputError)) {
                encodeLib.popupClose();
                return;
            }
            else {
                apikeyValue = SMS.SETTINGS.apikeyInput.val().trim();
            }
            let apisecretValue = "";
            if(!await encodeLib.saveToInPutValueCheck(await SMS.SETTINGS.apiKeyErrorCheck(SMS.SETTINGS.apisecretInput), SMS.SETTINGS.apisecretInput, SMS.SETTINGS.apisecretInputError)) {
                encodeLib.popupClose();
                return;
            }
            else {
                apisecretValue = SMS.SETTINGS.apisecretInput.val().trim();
            }
            if(apikeyValue && apisecretValue) {
                SMS.credentials['apikey'] = apikeyValue;
                SMS.credentials['apisecret'] = apisecretValue;
                if(SMS.credentials.apikey) {
                    SMS.SETTINGS.closeButton.fadeIn();
                }
                else {
                    SMS.SETTINGS.closeButton.fadeOut();
                }
                let setOrgVariable = await ENAPP.setOrgVariable(SMS.extensionCredential, JSON.stringify(SMS.credentials));
                if(setOrgVariable) {
                    SMS.SETTINGS.savedApikeyElement.html(encodeLib.safeString(SMS.credentials.apikey).substring(0,5)+"&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;");
                    SMS.SETTINGS.savedapisecretElement.html(encodeLib.safeString(SMS.credentials.apisecret).substring(0,5)+"&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;");
                    SMS.SETTINGS.closeEditApikeyDiv();
                    $(".savingSvgContent").show().html(encodeLib.svg({outer: {width: "35px", height: "35px"}, svg: {icon: "tick", fill: "green", width: "35px", height: "35px"}}));
                    $(".saveTemplateLoader").hide();
                    $(".savingContent").html("Saved");
                    // encodeLib.popupButtons.show();
                }
            }
        }

    }

};