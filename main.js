document.writeln('<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>'); document.writeln('<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap">');
document.writeln('<script src="ZohoEmbededAppSDK.js?v=3"></script>');
document.addEventListener("DOMContentLoaded", function (event) {
    // $(".contact-details").remove();
    ZOHO.embeddedApp.on("PageLoad", async function(record) {
        if(record.Entity && record.EntityId) {
            if(record.ButtonPosition) {
                APP.recordId = record.EntityId[0];
            }
            else {
                APP.recordId = record.EntityId;
            }
            APP.module = record.Entity;
            $(".contact-details").remove();
            $(".search-container").remove();
            $(".filter-container").remove();
            $(".accountPage").remove();
        }
        APP.init();
    });
    ZOHO.embeddedApp.init();
});

 let isTyping = false;

var APP = {

    extensionName: 'WhatsApp Business',
    extensionAPI: 'whatsappbusiness0__', // whatsappbusiness0__
    extensionSignal: "incomingmessages",
    extensionFunction: 'webhook',
    credentials: {},
    currentUser: {},
    allUsers: {},
    currentChatId: "",
    contacts: {},
    editLink: "",
    supportMail: "support@polksconsultancy.com",
    docLink: "",
    videoLink: "",
    realtimeDuplicateChaeckArr: [],
    lastMessageDirection: "",
    dealStagesList: "",
    currentUserIconElement: "#profile-pic",
    sidebarElement: ".sidebar",
    loaderElement: "#loader",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="40" viewBox="0 0 180 40" fill="none"> <g clip-path="url(#clip0_2864_5776)"> <g clip-path="url(#clip1_2864_5776)"> <path d="M9.84909 0.5H0.978027L13.633 29.2527C13.7297 29.4724 14.0421 29.4702 14.1358 29.2495L18.3447 19.3485L9.84909 0.5Z" fill="black"/> <path d="M36.8708 0.5C36.8708 0.5 23.2742 31.6392 21.453 34.5108C19.3363 37.8492 17.9334 39.1235 15.3375 39.5318C15.3135 39.5355 15.2957 39.5563 15.2957 39.5807C15.2957 39.6081 15.318 39.6304 15.3453 39.6304H23.4696C26.989 39.6304 29.527 36.6915 30.9335 34.0962C32.532 31.1464 45.8982 0.5 45.8982 0.5H36.8708Z" fill="black"/> </g> <path d="M72.2275 25.4738C72.2088 25.5149 72.1505 25.5149 72.1317 25.4738L65.408 10.7144H61.6304C61.6304 10.7144 68.5601 26.376 69.2523 27.5462C69.9287 28.6898 70.7473 29.6326 72.1797 29.6326C73.6121 29.6326 74.4307 28.6898 75.1072 27.5462C75.7994 26.376 82.7291 10.7144 82.7291 10.7144H78.9515L72.2275 25.4738Z" fill="black"/> <path d="M92.7333 26.7567C89.0796 26.7567 86.6868 24.3696 86.6868 20.0652C86.6868 15.7609 89.0796 13.3741 92.7333 13.3741C96.374 13.3741 98.7795 15.7609 98.7795 20.0652C98.7795 24.3696 96.374 26.7567 92.7333 26.7567ZM92.7333 10.2828C87.0121 10.2828 83.3322 14.0002 83.3322 20.0652C83.3322 26.1306 87.0121 29.848 92.7333 29.848C98.4415 29.848 102.134 26.1306 102.134 20.0652C102.134 14.0002 98.4415 10.2828 92.7333 10.2828Z" fill="black"/> <path d="M121.463 10.7132V29.4176H117.59L108.564 15.7429V29.4176H105.261V10.7132H109.146L118.173 24.4791V10.7132H121.463Z" fill="black"/> <path d="M130.314 21.748L133.567 14.1088C133.585 14.0659 133.646 14.0659 133.664 14.1088L136.917 21.748H130.314ZM133.615 10.4994C132.255 10.4994 131.424 11.5346 130.876 12.5698C130.314 13.6306 123.598 29.4176 123.598 29.4176H127.049L128.977 24.8884H138.254L140.182 29.4176H143.633C143.633 29.4176 136.917 13.6306 136.355 12.5698C135.807 11.5346 134.975 10.4994 133.615 10.4994Z" fill="black"/> <path d="M152.969 22.2046H158.876C158.849 25.1108 156.144 26.7568 153.278 26.7568C149.683 26.7568 147.328 24.3695 147.328 20.0653C147.328 15.418 149.508 13.3468 153.479 13.3468C155.965 13.3468 158.033 14.3666 158.468 16.7169H161.893C161.293 12.602 157.515 10.2827 153.278 10.2827C147.648 10.2827 144.028 14.0001 144.028 20.0653C144.028 26.1305 147.648 29.7753 153.278 29.7753C155.651 29.7753 158.045 28.4987 158.888 27.1503L158.877 29.4175H162.037V19.3422H152.969V22.2046Z" fill="black"/> <path d="M179.022 13.8435V10.7132H165.616V29.4176H179.022V26.287H168.918V21.3698H178.234V18.2392H168.918V13.8435H179.022Z" fill="black"/> </g> <defs> <clipPath id="clip0_2864_5776"> <rect width="178.043" height="39.1304" fill="white" transform="translate(0.978271 0.5)"/> </clipPath> <clipPath id="clip1_2864_5776"> <rect width="45" height="39.1304" fill="white" transform="translate(0.978271 0.5)"/> </clipPath> </defs> </svg>`,
    loader: `<div id="loader" class="enContent " style="height: 100%; background-color: white;color: black; overflow: hidden;  line-height: initial; resize: none; display: flex; align-items: center; justify-content: center; flex-direction: column; font-size: inherit; font-weight: inherit; word-break: break-word; word-wrap: break-word; box-sizing: border-box;   width: 100%; padding: 0; cursor: default;   font-family: sans-serif;      z-index: 10000000; position: absolute; left: 0;  top: 0;      max-width: 100%; min-width: 0; text-align: left; white-space: normal;     "><div style="display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%; height: 100%;   max-width: 100%; min-width: 0; overflow: hidden; word-break: break-word; word-wrap: break-word; white-space: normal; text-align: left;    " class="content"><div class="enLoadingInner" title="loading…"><svg class="enLoadingSVG" width="17" height="17" viewBox="0 0 46 46" role="status"><circle class="enLoadingSvgCircle" cx="23" cy="23" r="20" fill="none" stroke-width="6" style="stroke: rgb(57 82 234);"></circle></svg></div></div></div>`,
    currentUserSet: async function() {
        await ZOHO.CRM.CONFIG.getCurrentUser().then(function(data){
            APP.currentUser = data.users[0];
            $(APP.currentUserIconElement).attr("src", APP.currentUser.image_link);
        });
    },
    allUsersGet: async function() {
        await ZOHO.CRM.API.getAllUsers({Type:"AllUsers"}).then(async function(data){
            let assignUserElements = "";
            await data.users.forEach(function(user) {
                if(user.status == "active") {
                    APP.allUsers[user.id] = user;
                    assignUserElements += `<div class="dropdownList" userid="${user.id}">
                                                <div class="dropdownListIcon">
                                                    <div class="dropdownListIconSize">
                                                        <img src="${user.image_link}">
                                                    </div>
                                                </div>
                                                <div class="dropdownListText">${user.full_name}</div>
                                            </div>`;
                }
            });
            
            $(APP.sidebarElement).append(`<div class="dropdownOuter" id="userAssignDropdown">
                                <div class="dropdownInner">
                                    <div class="dropdownList dropdownListTitle">
                                        <div class="dropdownListText">Assign User</div>
                                    </div>
                                    <hr class="dropdownSeprate">
                                    ${assignUserElements}
                                </div>
                            </div>`);
        });
    },
    getZapikey: function() {
        //         let getmap = {"nameSpace":"<portal_name.extension_namespace>"};
        //         let resp = await ZOHO.CRM.CONNECTOR.invokeAPI("crm.zapikey",getmap);
        //         let zapikey = JSON.parse(resp).response;
        // APP.database.ref('zapikey/'+currentUser.full_name).set({
        //     zapikey: zapikey
        //   });
    },
    dealStageListSet: async function() {
        let dealStagesList = [];
        await ZOHO.CRM.META.getFields({"Entity":"Deals"}).then(function(data){
            data.fields.forEach(function(field) {
                if(field.api_name == "Stage") {
                    dealStagesList = field.pick_list_values;
                } 
            });
        });
        let Stage = "";
        dealStagesList.forEach(function(stage) {
            Stage += `<option value="${stage.display_value}">${stage.display_value}</option>`;
        });
        APP.dealStagesList = `<select id="map_Stage">${Stage}</select>`;
    },
    popupResize: async function() {
        await ZOHO.CRM.UI.Resize({height:"600",width:"1000"}).then(function(data){
            console.log(data);
        });
    },
    recordChatSetup: async function() {
        APP.selectedModule = APP.module;
        await APP.popupResize();
        APP.contactList = document.getElementById('chat-list');
        await ZOHO.CRM.META.getFields({"Entity":APP.module}).then(function(data){
            let phoneFields = [];
            let phoneNumbers = [];
            data.fields.forEach(function(field) {
                if(field.data_type == "phone") {
                    phoneFields.push(field.api_name);
                }
            });
            ZOHO.CRM.API.getRecord({Entity:APP.module,RecordID:APP.recordId})
            .then(async function(resp){
                APP.selectedRecord = resp.data[0];
                phoneFields.forEach(function(phoneField) {
                    if(resp.data[0][phoneField]) {phoneNumbers.push(resp.data[0][phoneField]);}
                });
                phoneNumbers.forEach(async function(phone, i) {
                    APP.contacts[phone] = {
                        id: phone,
                        unread: 0,
                        details: {},
                        notifications: {},
                        messages: []
                    };
                    await ZOHO.CRM.API.searchRecord({Entity:APP.extensionContacts,Type:"phone",Query:phone,delay:false}).then(async function(data){
                        if(data && data.data) {
                            let contact = {};
                            data.data.forEach(async thisContact => {
                                contact = thisContact;
                                APP.contacts[contact[APP.extensionFieldWhatsAppNumber]] = {
                                    id: contact[APP.extensionFieldWhatsAppNumber],
                                    unread: 0,
                                    details: contact,
                                    notifications: {},
                                    messages: []
                                };
                                await APP.startChatListAddFunction(APP.contacts[thisContact[APP.extensionFieldWhatsAppNumber]]);
                            });
                            let contactElement = APP.createContactElement(APP.contacts[phone]);
                            APP.contactList.appendChild(contactElement);
                        }
                        else {
                            let recordData = {};
                            recordData[APP.extensionFieldName] = phone.replaceAll(" ", "").replaceAll("+", "");
                            recordData[APP.extensionFieldWhatsAppNumber] = phone.replaceAll(" ", "").replaceAll("+", "");
                            ZOHO.CRM.API.insertRecord({Entity:APP.extensionContacts,APIData:recordData,Trigger:["workflow"]}).then(function(data){
                                console.log(data);
                            });
                            let contactElement = APP.createContactElement(APP.contacts[phone]);
                            APP.contactList.appendChild(contactElement);
                        }
                    });
                });
                $(APP.loaderElement).remove();
                await APP.realtimeListener(); 
            });
        });
    },
    inboxChatSetup: async function() {

        APP.filterModeAll = document.getElementById('filterMode-all');
        APP.filterModeYours = document.getElementById('filterMode-yours');
        APP.filterModeInactive = document.getElementById('filterMode-inactive');
        APP.filterModeModules = document.getElementById('filterMode-modules');
        // APP.contactList = document.getElementById('filterMode-users');

        APP.filterModeAll.addEventListener('click', async function() {
            $(".filter-container .rowOptionsButton.selected").removeClass("selected");
            this.setAttribute("class", "rowOptionsButton selected");
            APP.filterMode = "all";
            APP.contactList.innerHTML = "";
            APP.filterModes[APP.filterMode].contacts.forEach(contactId => {
                let contactElement = APP.createContactElement(APP.contacts[contactId]);
                APP.contactList.appendChild(contactElement);
            });
            APP.loadContacts();
        });

        APP.filterModeYours.addEventListener('click', async function() {
            $(".filter-container .rowOptionsButton.selected").removeClass("selected");
            this.setAttribute("class", "rowOptionsButton selected");
            APP.filterMode = "yours";
            APP.contactList.innerHTML = "";
            APP.filterModes[APP.filterMode].contacts.forEach(contactId => {
                let contactElement = APP.createContactElement(APP.contacts[contactId]);
                APP.contactList.appendChild(contactElement);
            });
            APP.loadContacts();
        });

        APP.filterModeInactive.addEventListener('click', async function() {
            $(".filter-container .rowOptionsButton.selected").removeClass("selected");
            this.setAttribute("class", "rowOptionsButton selected");
            APP.filterMode = "inActive";
            APP.contactList.innerHTML = "";
            APP.filterModes[APP.filterMode].contacts.forEach(contactId => {
                let contactElement = APP.createContactElement(APP.contacts[contactId]);
                APP.contactList.appendChild(contactElement);
            });
            APP.loadContacts();
        });

        APP.filterModeModules.addEventListener('click', async function() {
            // $(".filter-container .rowOptionsButton.selected").removeClass("selected");
            // this.setAttribute("class", "rowOptionsButton selected");
            // APP.filterMode = "all";
            // APP.contactList.innerHTML = "";
            // APP.filterModes[APP.filterMode].contacts.forEach(contactId => {
            //     let contactElement = APP.createContactElement(APP.contacts[contactId]);
            //     APP.contactList.appendChild(contactElement);
            // });
            // APP.loadContacts();
        });

        APP.contactList = document.getElementById('chat-list');
        APP.chatLoader = `<div id="contactloader" class="enContent " style="height: 100%;background-color: white;color: black;overflow: hidden;line-height: initial;resize: none;display: flex;align-items: center;justify-content: center;flex-direction: column;font-size: inherit;font-weight: inherit;word-break: break-word;word-wrap: break-word;box-sizing: border-box;width: 100%;padding: 0;cursor: default;font-family: sans-serif;z-index: 10000000;left: 0;top: 0;max-width: 100%;min-width: 0;text-align: left;white-space: normal;position: relative;height: 60px;"><div style="display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%; height: 100%;   max-width: 100%; min-width: 0; overflow: hidden; word-break: break-word; word-wrap: break-word; white-space: normal; text-align: left;    " class="content"><div class="enLoadingInner" title="loading…"><svg class="enLoadingSVG" width="17" height="17" viewBox="0 0 46 46" role="status"><circle class="enLoadingSvgCircle" cx="23" cy="23" r="20" fill="none" stroke-width="6" style="stroke: rgb(57 82 234);"></circle></svg></div></div></div>`;
        APP.isLoading = false;
        
        APP.contactsPerPage = 200;
        APP.filterModes = {};
        APP.filterModeTypes = ["all", "yours", "leads", "contacts", "inActive", "users"];

        APP.filterModeTypes.forEach(function(mode) {
            APP.filterModes[mode] = {
                currentPage: 1,
                pageCompleted: false,
                contacts: []
            };
        });

        APP.filterMode = "all";
        
        // Initial load
        await APP.loadContacts();
        $(APP.loaderElement).remove();
        await APP.realtimeListener();
        
        // Scroll event listener
        APP.contactList.addEventListener('scroll', function() {
            if(APP.isLoading) return;
            let scrollTop = APP.contactList.scrollTop;
            let scrollHeight = APP.contactList.scrollHeight;
            let clientHeight = APP.contactList.clientHeight;
            if(scrollTop + clientHeight >= scrollHeight - 100) {
                APP.loadContacts();
            }
        });
    },
    loadContacts: async function() {
        if(APP.filterModes[APP.filterMode].pageCompleted) {
            return;
        }
        APP.isLoading = true;
        $("#chat-list").append(APP.chatLoader);
        APP.loadingIndicator = document.getElementById('contactloader');
        setTimeout(async function() {
            let loadedContacts = await APP.getContacts(APP.filterModes[APP.filterMode].currentPage);
            loadedContacts.forEach(contact => {
                let contactElement = APP.createContactElement(contact);
                APP.contactList.appendChild(contactElement);
            });
            APP.filterModes[APP.filterMode].currentPage++;
            APP.loadingIndicator.remove();
            APP.isLoading = false;
            APP.loadingIndicator.style.display = 'none';
        }, 1000);
    },
    getContacts: async function() {
        if(APP.filterMode == "leads" || APP.filterMode == "contacts") {
            let filterModule = APP.filterMode[0].toUpperCase()+APP.filterMode.substring(1).substring(0, APP.filterMode.length-2);
            return await ZOHO.CRM.API.searchRecord({Entity:APP.extensionContacts,Type:"criteria",Query:`(${APP.extensionFieldModule}:equals:${filterModule})`, per_page:APP.contactsPerPage, page:APP.filterModes[APP.filterMode].currentPage}).then(async function(data){
                return await APP.getContactsResponse(data);
            });
        }
        else if(APP.filterMode == "yours" || APP.filterMode == "users") {
            let userId = APP.filterMode == "yours" ? APP.currentUser.id : APP.selectedUser.id;
            return await ZOHO.CRM.API.searchRecord({Entity:APP.extensionContacts,Type:"criteria",Query:`(${APP.extensionFieldOwner}:equals:${userId})`, per_page:APP.contactsPerPage, page:APP.filterModes[APP.filterMode].currentPage}).then(async function(data){
                return await APP.getContactsResponse(data);
            });
        }
        else {
            return await ZOHO.CRM.API.getAllRecords({Entity:APP.extensionContacts, sort_by: APP.extensionFieldActiveTime, sort_order:"desc", per_page:APP.contactsPerPage, page:APP.filterModes[APP.filterMode].currentPage}).then(async function(data){
                return await APP.getContactsResponse(data);
            });
        }
    },
    getContactsResponse: function(data) {
        if(data && data.info && !data.info.more_records) {
            APP.filterModes[APP.filterMode].pageCompleted = true;
        }
        let loadedContacts = [];
        if(data && data.data) {
            data.data.forEach(async contact => {
                if(!APP.contacts[contact[APP.extensionFieldWhatsAppNumber]]) {
                    APP.contacts[contact[APP.extensionFieldWhatsAppNumber]] = {
                        id: contact[APP.extensionFieldWhatsAppNumber],
                        unread: 0,
                        details: contact,
                        notifications: {},
                        messages: []
                    };
                }
                if(!APP.filterModes[APP.filterMode].contacts.includes(APP.contacts[contact[APP.extensionFieldWhatsAppNumber]])) {
                    let currentTime = new Date();
                    let oneWeekAgo = currentTime.setDate(currentTime.getDate() - 7);
                    if(APP.filterMode != "inActive") { // || new Date(APP.contacts[contact[APP.extensionFieldWhatsAppNumber]].details.Modified_Time) < oneWeekAgo
                        APP.filterModes[APP.filterMode].contacts.push(contact[APP.extensionFieldWhatsAppNumber]);
                        loadedContacts.push(APP.contacts[contact[APP.extensionFieldWhatsAppNumber]]);
                    }
                }
                await APP.startChatListAddFunction(contact);
            });
        }
        return loadedContacts;
    },
    createContactElement: function(chat) {
        chatList = document.getElementById('chat-list');
        var chatItem = document.createElement('div');
        chatItem.id = "chatid-"+chat.id;
        chatItem.className = `chat-item ${chat.id === APP.currentChatId ? 'active' : ''}`;
        chatItem.dataset.id = chat.id;
        
        chatItem.innerHTML = `
            <div class="chat-avatars">
                <img src="${chat.details && chat.details.avatar ? chat.details.avatar : "person.png"}" alt="${chat.details && chat.details.Name ? chat.details.Name : chat.id}" class="chat-avatar">
                <img src="${chat.details && chat.details.Owner && chat.details.Owner.id && APP.allUsers[chat.details.Owner.id].image_link ? APP.allUsers[chat.details.Owner.id].image_link : "user-thumbnail.png"}" alt="${chat.details && chat.details.Name ? chat.details.Name : chat.id}" class="chat-avatar chatUser-avatar">
            </div>
            <div class="chat-info">
                <div class="chat-header">
                    <div class="chat-header-deatils">
                        <div class="chat-name">${chat.details && chat.details.Name ? chat.details.Name : chat.id}</div>
                        ${APP.module && APP.recordId ? '' : `<div class="chat-module">${chat.details[APP.extensionFieldModule] ? chat.details[APP.extensionFieldModule] : 'Contact'}</div>`}
                    </div>
                    <div class="chat-time">${chat.details && chat.details.Modified_Time ? APP.getCurrentTime(chat.details.Modified_Time) : 'New'}</div>
                </div>
                <div class="chat-preview">
                    <div class="chat-message">${chat.details && chat.details[APP.extensionFieldLastMessage] ? chat.details[APP.extensionFieldDirection] && chat.details[APP.extensionFieldDirection] == "incoming" ? chat.details[APP.extensionFieldLastMessage] : "You: "+chat.details[APP.extensionFieldLastMessage] : 'Start Coversation'}</div>
                    ${chat.unread > 0 ? `<div class="unread-count">${chat.unread}</div>` : ''}
                </div>
            </div>
        `;
        return chatItem;
    },
    startChatListAddFunction: async function(contact) {
        if(APP.filterModes || !APP.filterModes[APP.filterMode].contacts.length)
        ZOHO.CRM.API.searchRecord({Entity:APP.extensionHistory,Type:"criteria",Query:`(${APP.extensionFieldWhatsAppNumber}:equals:${contact[APP.extensionFieldWhatsAppNumber]})`}).then(function(searchRecord) {
            if(searchRecord.data) {
                if(!APP.contacts[contact[APP.extensionFieldWhatsAppNumber]].messages.length) {
                    APP.contacts[contact[APP.extensionFieldWhatsAppNumber]].messages = APP.contacts[contact[APP.extensionFieldWhatsAppNumber]].messages.concat(searchRecord.data);
                    APP.contacts[contact[APP.extensionFieldWhatsAppNumber]].messages.sort(function(a, b) {
                        var keyA = new Date(a.Created_Time), keyB = new Date(b.Created_Time);
                        // Compare the 2 dates
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    });
                }
                if($("#chatid-"+contact[APP.extensionFieldWhatsAppNumber]).length) {
                    $("#chatid-"+contact.id+" .chat-message").html(APP.contacts[contact[APP.extensionFieldWhatsAppNumber]].details[APP.extensionFieldLastMessage]);
                    $("#chatid-"+contact.id+" .chat-time").html(APP.getCurrentTime(APP.contacts[contact[APP.extensionFieldWhatsAppNumber]].details[APP.extensionFieldActiveTime]));
                }
                else {
                    let contactElement = APP.createContactElement(APP.contacts[contact[APP.extensionFieldWhatsAppNumber]]);
                    APP.contactList.appendChild(contactElement);
                }
            }
        });
    },
    sortingArrOfOject: function() {

    },
    currentChatUnreadNotification: function() {
        if(Object.keys(APP.contacts[APP.currentChatId].notifications).length) {
            Object.keys(APP.contacts[APP.currentChatId].notifications).forEach(function(key) {              
                APP.contacts[APP.currentChatId].messages.push(APP.contacts[APP.currentChatId].notifications[key]);
                delete APP.contacts[APP.currentChatId].notifications[key];
                setTimeout(() => {
                    APP.database.ref('incomingMessages/'+key).remove().then(() => {
                        console.log("Data deleted successfully");
                    }).catch((error) => {
                        console.error("Error deleting data: ", error);
                    });
                }, 2000);
            });
        }
    },
    reactionElementOpen: async function() {
        let reactionElement = `<div class="reactionPoupButton" id="reactionPoupButton"><div class="rectionBUttonOuter"><div class="rectionButton"><div class="reactionButtonIn"><div><img alt="👍" class="reactionButtonImg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="background-position: 0px -64px;display: inline-block;vertical-align: top;zoom: 1;border: 0;background-size: 160px 160px;background-image: url(https://web.whatsapp.com/emoji/v1/16/0/1/sprite/w/40/38.webp);transform: scale(.9375);visibility: visible;width: 32px;height: 32px;image-rendering: -webkit-optimize-contrast;"></div></div></div>

                                    <div class="rectionButton"><div class="reactionButtonIn"><div><img alt="❤️" class="reactionButtonImg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="background-position: 0px -64px;display: inline-block;vertical-align: top;zoom: 1;border: 0;background-size: 160px 160px;background-image: url(https://web.whatsapp.com/emoji/v1/16/0/1/sprite/w/40/38.webp);transform: scale(.9375);visibility: visible;width: 32px;height: 32px;image-rendering: -webkit-optimize-contrast;background-position: -128px -128px;background-image: url(https://web.whatsapp.com/emoji/v1/16/0/1/sprite/w/40/7.webp);"></div></div></div>
                                    
                                    <div class="rectionButton"><div class="reactionButtonIn"><div><img alt="😂" class="reactionButtonImg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="background-position: 0px -64px;display: inline-block;vertical-align: top;zoom: 1;border: 0;background-size: 160px 160px;background-image: url(https://web.whatsapp.com/emoji/v1/16/0/1/sprite/w/40/38.webp);transform: scale(.9375);visibility: visible;width: 32px;height: 32px;image-rendering: -webkit-optimize-contrast;background-position: -64px -96px;background-image: url(https://web.whatsapp.com/emoji/v1/16/0/1/sprite/w/40/82.webp);"></div></div></div>
                                    
                                    <div class="rectionButton"><div class="reactionButtonIn"><div><img alt="🙏" class="reactionButtonImg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="background-position: 0px -64px;display: inline-block;vertical-align: top;zoom: 1;border: 0;background-size: 160px 160px;background-image: url(https://web.whatsapp.com/emoji/v1/16/0/1/sprite/w/40/38.webp);transform: scale(.9375);visibility: visible;width: 32px;height: 32px;image-rendering: -webkit-optimize-contrast;background-position: -96px -96px;background-image: url(https://web.whatsapp.com/emoji/v1/16/0/1/sprite/w/40/88.webp);"></div></div></div>
                                    <div class="reactionAddButton"><div class="reactionButtonIn"><div style="
                                        text-transform: uppercase;
                                        background-color: #f2f2f7;
                                        border-radius: 50%;
                                        transition-timing-function: cubic-bezier(.4,0,.2,1);
                                        padding-top: 0;
                                        width: 32px;
                                        padding-bottom: 0;
                                        height: 32px;
                                        justify-content: center;
                                        padding-left: 0;
                                        transition-property: box-shadow;
                                        font-weight: 500;
                                        display: flex;
                                        cursor: pointer;
                                        box-shadow: none;
                                        align-items: center;
                                        padding-right: 0;
                                        font-size: .875rem;
                                        transition-duration: .08s;
                                        color: #ffffff;
                                    "><span aria-hidden="true" data-icon="plus" class="x1t495xr"><svg viewBox="0 0 24 24" width="26" preserveAspectRatio="xMidYMid meet" class=""><title>plus</title><path fill="currentColor" d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path></svg></span></div></div></div></div></div>`;

        
        $("body").append(reactionElement);



    },
    positionNotificationBox: function(clickX, clickY) {
        let notificationBox = document.getElementById("reactionPoupButton");
        const boxWidth = notificationBox.offsetWidth;
        const boxHeight = notificationBox.offsetHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate available space in all directions
        const spaceRight = viewportWidth - clickX;
        const spaceLeft = clickX;
        const spaceBelow = viewportHeight - clickY;
        const spaceAbove = clickY;
        
        // Reset positioning
        notificationBox.style.left = '';
        notificationBox.style.right = '';
        notificationBox.style.top = '';
        notificationBox.style.bottom = '';
        
        // Position horizontally
        if (spaceRight >= boxWidth || spaceRight >= spaceLeft) {
          // Position to the right of click
          notificationBox.style.left = `${clickX}px`;
        } else {
          // Position to the left of click
          notificationBox.style.right = `${viewportWidth - clickX}px`;
        }
        
        // Position vertically
        if (spaceBelow >= boxHeight || spaceBelow >= spaceAbove) {
          // Position below click
          notificationBox.style.top = `${clickY}px`;
        } else {
          // Position above click
          notificationBox.style.bottom = `${viewportHeight - clickY}px`;
        }
      },  
    init: async function() {

        APP.extensionFieldName = "Name";
        APP.extensionFieldOwner = "Owner";
        APP.extensionFieldMessage = APP.extensionAPI + "WhatsApp_Message";    // WhatsApp_Message
        APP.extensionFieldWhatsAppNumber = APP.extensionAPI + "WhatsApp_Number";
        APP.extensionFieldModule = APP.extensionAPI + "Module";
        APP.extensionFieldLastMessage = APP.extensionAPI + "Last_Message";
        APP.extensionFieldDeal = APP.extensionAPI + "Deal";
        APP.extensionFieldContact = APP.extensionAPI + "Contact";
        APP.extensionFieldLead = APP.extensionAPI + "Lead";
        APP.extensionFieldAccount = APP.extensionAPI + "Account";
        APP.extensionFieldFrom = APP.extensionAPI + "From";
        APP.extensionFieldTo = APP.extensionAPI + "To";
        APP.extensionFieldStatus = APP.extensionAPI + "Status";
        APP.extensionFieldMsgId = APP.extensionAPI + "MsgId";
        APP.extensionFieldLastMsgId = APP.extensionAPI + "Last_Message_ID";
        APP.extensionFieldDirection = APP.extensionAPI + "Direction";
        APP.extensionFieldActiveTime = APP.extensionAPI + "Active_Time";

        APP.extensionHistory = APP.extensionAPI + "WhatsApp_Business_History";
        APP.extensionContacts = APP.extensionAPI + "WhatsApp_Contacts";

        await APP.firebaseSetup();
        await APP.currentUserSet();
        await APP.allUsersGet();
        await APP.dealStageListSet();

        APP.reactionElementOpen();

        APP.selectedUser = APP.currentUser;

        if(APP.module && APP.recordId) {
            await APP.recordChatSetup();
        }
        else {
            await APP.inboxChatSetup();
        }   

        // Chat list item click
        var chatList = document.getElementById('chat-list');
        chatList.addEventListener('click', async (e) => { APP.chatListClickFunction(e); });

        // Send message
        var sendButton = document.getElementById('send-button');
        sendButton.addEventListener('click', APP.sendMessage);
        var messageInput = document.getElementById('message-input');
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                APP.sendMessage();
            }
        });

        // Typing indicator
        var messageInput = document.getElementById('message-input');
        messageInput.addEventListener('input', () => {
            if (messageInput.textContent.trim() && !isTyping) {
                sendButton.classList.add('active');
            } else if (!messageInput.textContent.trim() && isTyping) {
                sendButton.classList.remove('active');
            }
            isTyping = !!messageInput.textContent.trim();
        });

        // Search chats
        var searchInput = document.getElementById('search-input');
        if(searchInput) {
            searchInput.addEventListener('input', (e) => {
                let filter = e.target.value;
                var chatList = document.getElementById('chat-list');
                chatList.innerHTML = '';
                let filteredChats = filter ? Object.values(APP.contacts).filter(chat => chat.id.toLowerCase().includes(filter.toLowerCase())) : Object.values(APP.contacts);
                console.log(filteredChats);
                Object.values(filteredChats).forEach(chat => {
                    let contactElement = APP.createContactElement(chat);
                    APP.contactList.appendChild(contactElement);
                });
            });
        }

        if(document.querySelector("#leadSelectOption"))
        document.querySelector("#leadSelectOption").addEventListener('click', (e) => {
            $(".rowOptionsButtonSelected").removeClass("rowOptionsButtonSelected");
            $("#leadSelectOption").addClass("rowOptionsButtonSelected");
            APP.showRecordDetailsView("Leads");
        });

        if(document.querySelector("#contactSelectOption"))
        document.querySelector("#contactSelectOption").addEventListener('click', (e) => {
            $(".rowOptionsButtonSelected").removeClass("rowOptionsButtonSelected");
            $("#contactSelectOption").addClass("rowOptionsButtonSelected");
            APP.showRecordDetailsView("Contacts");
        });

        $('#filterModuleList').on('change', function() {
            $(".filter-container .rowOptionsButton.selected").removeClass("selected");
            this.parentNode.parentNode.setAttribute("class", "rowOptionsButton selected");
            let value = this.value;
            $(".filterMode-module-selected").text(value ? value+'s' : 'All Modules');
            var chatList = document.getElementById('chat-list');
            chatList.innerHTML = '';
            let filteredChats = value ? Object.values(APP.contacts).filter(chat => chat.details[APP.extensionFieldModule] && chat.details[APP.extensionFieldModule].toLowerCase().includes(value.toLowerCase())) : value == "" ? Object.values(APP.contacts) : '';
            Object.values(filteredChats).forEach(chat => {
                let contactElement = APP.createContactElement(chat);
                APP.contactList.appendChild(contactElement);
            });
        });

        document.addEventListener('click', (e) => {
            if($(e.target).hasClass('chatUser-avatar')) {
                $(".dropdownOuter").css({transform: "scale(1)", top: $(e.target).parent().position().top+$(e.target).parent().height()+2, left: $(e.target).parent().position().left+$(e.target).parent().width()-37});
            }
            else {
                $(".dropdownOuter").css({transform: "scale(0)"});
            }
            let thisElement = $(".message-text-to-react");
            if(thisElement.is(e.target) || thisElement.has(e.target).length != 0) {
                
                $(".reactionPoupButton").css({transform: "scale(1)"});
                console.log(e.clientX, $(e.target).width(), e.layerX, e.clientX + $(e.target).width()-e.layerX, $(e.target));
                APP.positionNotificationBox(e.clientX + $(e.target).width()-e.offsetX, e.clientY + $(e.target).height()-e.layerY);
            }
            else {
                $(".reactionPoupButton").css({transform: "scale(0)"});
            }
            if($(e.target).attr('id') == "dealMapConfirmCondainer") {   
                $("#dealMapConfirmCondainer").remove();        
                return;
            }
            // emojiPicker.classList.remove('show');
            // attachmentOptions.classList.remove('show');
            
        });

        APP.unusedCodes();

    },
    chatListClickFunction: async function(e) {
        if($(e.target).hasClass('chatUser-avatar')) {           
            return;
        }
        if($(".initialChatDiv").length) {
            $(".initialChatDiv").remove();
        }
        APP.lastMessageDirection = "";

        var chatItem = e.target.closest('.chat-item');
        if(chatItem && APP.currentChatId != chatItem.dataset.id) {
            APP.currentChatId = chatItem.dataset.id;
            if(APP.contacts[APP.currentChatId].details[APP.extensionFieldContact]) {
                APP.contacts[APP.currentChatId].details[APP.extensionFieldModule] = "Contact";
                await APP.showRecordDetailsView("Contacts");
            }
            else if(APP.contacts[APP.currentChatId].details[APP.extensionFieldLead]) {
                // APP.contacts[APP.currentChatId].details[APP.extensionFieldModule] = "Lead";
                // await APP.showRecordDetailsView("Leads");
                await ZOHO.CRM.API.searchRecord({Entity: "Contacts", Type:"phone",Query:APP.currentChatId.replaceAll(" ", ""), delay:false}).then( async function(data){
                    if(!data || !data.data) {
                        APP.contacts[APP.currentChatId].details[APP.extensionFieldModule] = "Lead";
                        await APP.showRecordDetailsView("Leads");
                    }
                    else {
                        APP.contacts[APP.currentChatId].details[APP.extensionFieldModule] = "Contact";
                        APP.contacts[APP.currentChatId].details[APP.extensionFieldContact] = data.data[0].id;
                        await APP.showRecordDetailsView("Contacts");
                    }
                });
            }
            else {
                await ZOHO.CRM.API.searchRecord({Entity: "Contacts", Type:"phone",Query:APP.currentChatId.replaceAll(" ", ""), delay:false}).then( async function(data){
                    if(!data || !data.data) {
                        await ZOHO.CRM.API.searchRecord({Entity: "Leads", Type:"phone",Query:APP.currentChatId.replaceAll(" ", ""), delay:false}).then(async function(resp){
                            if(!resp || !resp.data) {
                                let response = await ZOHO.CRM.API.insertRecord({Entity: "Lead",APIData:{Last_Name: APP.currentChatId, phone: APP.currentChatId.replaceAll(" ", "")},Trigger:["workflow"]}).then(function(data){});
                                APP.contacts[APP.currentChatId].details[APP.extensionFieldModule] = "Lead";
                                APP.contacts[APP.currentChatId].details[APP.extensionFieldLead] = response.data[0].id;
                                await APP.showRecordDetailsView("Leads");
                            }
                            else {
                                APP.contacts[APP.currentChatId].details[APP.extensionFieldModule] = "Lead";
                                APP.contacts[APP.currentChatId].details[APP.extensionFieldLead] = resp.data[0].id;
                                await APP.showRecordDetailsView("Leads");
                            }
                        });
                    }
                    else {
                        APP.contacts[APP.currentChatId].details[APP.extensionFieldModule] = "Contact";
                        APP.contacts[APP.currentChatId].details[APP.extensionFieldContact] = data.data[0].id;
                        await APP.showRecordDetailsView("Contacts");
                    }
                });
            }

            $(".active").removeClass("active");
            chatItem.setAttribute("class", "chat-item active");

            if(chatItem.querySelector(".unread-count")) {
                chatItem.querySelector(".unread-count").remove();
            }

            APP.contacts[APP.currentChatId].unread = 0;

            if(Object.keys(APP.contacts[APP.currentChatId].messages).length) {
                APP.currentChatUnreadNotification();
                APP.renderMessages(APP.currentChatId);
                return;
            }
            else {
                let searchRecord = await ZOHO.CRM.API.searchRecord({Entity:APP.extensionHistory,Type:"criteria",Query:`(${APP.extensionFieldWhatsAppNumber}:equals:${APP.currentChatId})`});
                if(searchRecord.data) {
                    APP.contacts[APP.currentChatId].messages = APP.contacts[APP.currentChatId].messages.concat(searchRecord.data);
                    APP.currentChatUnreadNotification();
                    APP.contacts[APP.currentChatId].messages.sort(function(a, b) {
                        var keyA = new Date(a.Created_Time), keyB = new Date(b.Created_Time);
                        // Compare the 2 dates
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    });
                }
                APP.renderMessages(APP.currentChatId);
            }
        }
        $("#message-input").focus();
    },
    showRecordDetailsView: async function(module) {
        if(!module || module == "nulls"){
            $(".contact-info").html('');
            return;
        }
        $(".contact-info").html(APP.loader);
        if(module == "Leads") {
            $(".rowOptionsButtonSelected").removeClass("rowOptionsButtonSelected");
        $("#leadSelectOption").addClass("rowOptionsButtonSelected");
        // ZOHO.CRM.API.updateRecord({
        //     Entity: "Contacts",
        //     APIData: updateData
        // });
        }
        else if(module == "Contacts") {
            $(".rowOptionsButtonSelected").removeClass("rowOptionsButtonSelected");
        $("#contactSelectOption").addClass("rowOptionsButtonSelected");
        }
        
        let contactFieldList = ["First_Name", "Last_Name", "Account_Name", "Email", "Phone", "Mobile", "Secondary_Email", "Description", "Lead_Source", "Assistant", "Asst_Phone", "Home_Phone", "Other_Phone", "Created_Time", "id", "Full_Name"];
        let leadFieldList = ["First_Name", "Last_Name", "Company", "Email", "Phone", "Mobile", "Description", "Website", "Lead_Status", "Lead_Source", "Created_Time", "id", "Full_Name"];
        let fieldArr = module == "Leads" ? leadFieldList : contactFieldList;
        await ZOHO.CRM.API.searchRecord({Entity: module,Type:"phone",Query:APP.currentChatId.replaceAll(" ", ""),delay:false})
        .then(function(data){
            if(!data || !data.data) return;
            record = data.data[0];
            APP.contacts[APP.currentChatId].details.Name = record.Full_Name;
            if(module == "Leads") {
                APP.leadRecord = record;
            }
            else if(module == "Contacts") {
                APP.contactRecord = record;
            }
            console.log(record); 
            let fieldFlowElement = "";
            fieldArr.forEach(function(field) {
                let fieldValue = field == "Created_Time" && record[field] ? new Date(record[field]).toDateString() : field == "Account_Name" && record[field] && record[field].name ? record[field].name : record[field] ? record[field] : "";
                if(fieldValue) {
                    fieldFlowElement += `<div class="field-row">
                <div class="field-label">${field.replaceAll('_', ' ')}</div>
                <div class="field-value">${fieldValue}</div>
            </div>`;   
                }
            });
            let recordDetailsViewElement = `<div class="record-container">
                                        <div class="record-header">
                                            <div>
                                            <div class="record-title">
                                                <img src="person.png" class="record-avatar">
                                                <div>
                                                <h1 class="record-name">${record["Full_Name"]}</h1>
                                                </div>
                                                <div class="rowOptions" id="createModuleSelectOption">
                                                    ${module == "Contacts" ? `<button class="rowOptionsButton" id="contactCreateSelectOption">
                                                        <div class="rowOptionsButtonIn">
                                                        <div>Create Deal</div>
                                                        </div>
                                                    </button>` : ''}
                                                    ${module == "Leads" ? `<button class="rowOptionsButton" id="leadCreateSelectOption">
                                                        <div class="rowOptionsButtonIn">
                                                        <div>Create Contact</div>
                                                        </div>
                                                    </button>` : ''}
                                                </div>
                                            </div>
                                            </div>
                                            <div class="record-actions">
                                            <button class="btn btn-outline">Edit</button>
                                            <button class="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                        <div class="record-sections">
                                            <div class="section">
                                            <h2 class="section-title">${module.substring(0, module.length-1)} Information</h2>
                                            ${fieldFlowElement}
                                            </div>
                                        </div>
                                        </div>`;
            $(".contact-info").html(recordDetailsViewElement);
            if(module == "Contacts" && document.querySelector("#contactCreateSelectOption")) {
                document.querySelector("#contactCreateSelectOption").addEventListener('click', (e) => {
                    APP.contactToDealCreateConfirmation(APP.contactRecord);
                });
            }
            else if(module == "Leads" && document.querySelector("#leadCreateSelectOption")) {
                document.querySelector("#leadCreateSelectOption").addEventListener('click', (e) => {
                    APP.leadToContactCreateConfirmation(APP.contactRecord);
                });
            }
        });
    },
    leadToContactCreateConfirmation: function() {

        let k = APP.loader+`<div style="
        z-index: 100000000;
        height: 100%;
        position: absolute;
        display: flex;
        overflow: hidden;
        align-items: center;
        width: 100%;
        justify-content: center;
        bottom: 0;
        padding: 0px 0px 35px 0px;
        left: 5px;
    ">Creating..</div>`;
    $("body").append(`<div id="dealMapConfirmCondainer"><div class="map-container">${k}</div></div>`);
                            
        APP.leadToContactCreate(APP.leadRecord);
    },
    leadToContactCreate: function(leadRecord, initialRecord={}) {
        
        leadRecord = leadRecord ? leadRecord : APP.leadRecord;
        ZOHO.CRM.API.insertRecord({
                Entity: "Contacts",
                APIData: leadRecord
            }).then(function(dealResponse) {
                $("#dealMapConfirmCondainer .map-container").html(`<div style="
                    z-index: 100000000;
                    height: 100%;
                    position: absolute;
                    display: flex;
                    overflow: hidden;
                    align-items: center;
                    width: 100%;
                    justify-content: center;
                    bottom: 0;
                    padding: 0px 0px 35px 0px;
                    left: 5px;
                ">Created.</div>`);
                setTimeout(() => {
                    $("#dealMapConfirmCondainer").remove();
                }, 1000);
                
        }).catch(function(error) {
            console.error("Error in contact to deal conversion:", error);
            let k = error.data[0].details.api_name+" "+error.data[0].message;
            $("#dealMapConfirmCondainer .map-container").html(`<div style="
                z-index: 100000000;
                height: 100%;
                position: absolute;
                display: flex;
                overflow: hidden;
                align-items: center;
                width: 100%;
                justify-content: center;
                bottom: 0;
                padding: 0px 0px 35px 0px;
                left: 5px;
            ">${k}</div>`);
            throw error; // Re-throw for caller to handle
        });
    },
    contactToDealCreateConfirmation: function() {

    let mapFieldElements = "";
    ["Deal_Name", "Stage", "Closing_Date", "Amount", "Probability", "Next_Step"].forEach(function(field) {
            mapFieldElements += `<tr>
                        <td>${field.replaceAll("_", " ")} ${field == "Deal_Name" ? `<span class="map-required-indicator">*</span>` : ''}</td>
                        <td>
                            ${field == "Deal_Name" ? `<select id="map_Deal_Name">
                                <option value="Full_Name" selected="">Full Name (default)</option>
                                <option value="Salutation">Salutation</option>
                                <option value="Full_Name">First Name</option>
                                <option value="Last_Name">Last Name</option>
                            </select>` : field == "Stage" ? APP.dealStagesList : field == "Closing_Date" ? `<input id="map_Closing_Date" type="date" placeholder="Closing Date">` : field == "Amount" ? `<input  id="map_Amount" type="number" placeholder="Amount">` : field == "Probability" ? `<input  id="map_Probability" type="number" placeholder="Probability %">` : field == "Next_Step" ? `<input  id="map_Next_Step" type="text" placeholder="Next Step">` : ''}
                        </td>
                    </tr>`;
    });
    $("body").append(`<div id="dealMapConfirmCondainer">
    <div class="map-container">
            <h4>Contact to Deal Field Mapping</h4>
            <p class="map-description">
                All the contact fields have been mapped to deals.
                Fill in the missing mandatory<span class="map-required-indicator">*</span>  fields.
            </p>
            
            <table class="map-mapping-table">
                <thead>
                    <tr>
                        <th width="40%">Deal Field</th>
                        <th width="60%">Map to Contact Field</th>
                    </tr>
                </thead>
                <tbody>
                    ${mapFieldElements}
                </tbody>
            </table>
            <div class="map-button-group">
                <button class="map-btn map-btn-secondary" id="map-btn-secondary">Cancel</button>
                <button class="map-btn map-btn-primary" id="map-btn-primary">Create Deal</button>
            </div>
            </div>
            </div>`);
                            
            document.querySelector("#map-btn-primary").addEventListener('click', (e) => {
                APP.contactToDealCreate(APP.contactRecord);
            });        
            document.querySelector("#map-btn-secondary").addEventListener('click', (e) => {
                $("#dealMapConfirmCondainer").remove();
            });
    },
    contactToDealCreate: function(contactRecord, initialRecord={}) {


        contactRecord = contactRecord ? contactRecord : APP.contactRecord;
        let Deal_Name = document.getElementById("map_Deal_Name").value;
        let Stage = document.getElementById("map_Stage").value;
        let Closing_Date = document.getElementById("map_Closing_Date").value;
        let Amount = document.getElementById("map_Amount").value;
        let Probability = document.getElementById("map_Probability").value;
        let Next_Step = document.getElementById("map_Next_Step").value;

        $("#dealMapConfirmCondainer .map-container").html(APP.loader+`<div style="
            z-index: 100000000;
            height: 100%;
            position: absolute;
            display: flex;
            overflow: hidden;
            align-items: center;
            width: 100%;
            justify-content: center;
            bottom: 0;
            padding: 0px 0px 35px 0px;
            left: 5px;
        ">Creating..</div>`);
        
        contactRecord.Contact_Name = { id: contactRecord.id };
        contactRecord.Deal_Name = contactRecord[Deal_Name] ? contactRecord[Deal_Name] : contactRecord.First_Name && contactRecord.Last_Name ? contactRecord.First_Name+" "+contactRecord.Last_Name : contactRecord.Last_Name;
        contactRecord.Stage = Stage;
        contactRecord.Closing_Date = Closing_Date ? new Date(Closing_Date).toISOString().split('T')[0] : "";
        contactRecord.Amount = String(Amount);
        contactRecord.Probability = Number(Probability);
        contactRecord.Next_Step = Next_Step;
        ZOHO.CRM.API.insertRecord({
                Entity: "Deals",
                APIData: contactRecord
            }).then(function(dealResponse) {
                // setTimeout(() => {
                    APP.updateContactAfterConversion(contactRecord.id, dealResponse.id);
                // }, 1000);
                console.log("Deal created successfully with ID:", dealResponse);
                
        }).catch(function(error) {
            console.error("Error in contact to deal conversion:", error);
            throw error; // Re-throw for caller to handle
        });
    },
    updateContactAfterConversion: function(contactId, dealId) {
        let updateData = {
            "Conversion_Status": "Converted",
            "Converted_Deal": dealId,
            id: contactId,
            "Last_Conversion_Date": new Date().toISOString()
        };
        
        ZOHO.CRM.API.updateRecord({
            Entity: "Contacts",
            APIData: updateData
        }).then(function(response) {
            console.log("Contact updated after conversion");
            $("#dealMapConfirmCondainer .map-container").html(`<div style="
                z-index: 100000000;
                height: 100%;
                position: absolute;
                display: flex;
                overflow: hidden;
                align-items: center;
                width: 100%;
                justify-content: center;
                bottom: 0;
                padding: 0px 0px 35px 0px;
                left: 5px;
            ">Created.</div>`);
            setTimeout(() => {
                $("#dealMapConfirmCondainer").remove();
            }, 1000);
        }).catch(function(error) {
            console.warn("Failed to update contact after conversion", error);
        });
    },
    mappingPageShow: function() {
        
        let k = `<div class="map-container">
            <h4>Lead to Contact Field Mapping</h4>
            <p class="map-description">
                All the contact fields have been mapped to deals, fill in the missing mandatory fields. 
                Required fields are marked with <span class="map-required-indicator">*</span>.
            </p>
            
            <table class="map-mapping-table">
                <thead>
                    <tr>
                        <th width="40%">Lead Field</th>
                        <th width="60%">Map to Contact Field</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
            <div class="map-button-group">
                <button class="map-btn btn-secondary">Cancel</button>
                <button class="map-btn btn-primary">Convert Lead</button>
            </div>
            </div>`;
    },
    moduleFilter: function(value) {
        
        
    },
    moveContactToTop: function(contactId) {
        var contactList = document.getElementById('chat-list');
        let contacts = Array.from(document.querySelectorAll('.chat-item'));
        if (contacts.length < 2) return;
        const contactToMove = contacts.find(c => c.getAttribute('data-id') === contactId.toString());
        console.log(contactToMove);
        if (!contactToMove || contacts[0].getAttribute('data-id') === contactId.toString()) return;
        
        // Remove the contact from its current position
        contactToMove.remove();
        
        // Get the current top contact
        const currentTopContact = contacts[0];
        
        // Add the contact to the top of the list
        contactList.insertBefore(contactToMove, currentTopContact);
        
        // Add animation class
        contactToMove.classList.add('move-up');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            contactToMove.classList.remove('move-up');
        }, 500);
        
        // Add slight animation to other contacts moving down
        if (currentTopContact) {
            currentTopContact.classList.add('move-down');
            setTimeout(() => {
                currentTopContact.classList.remove('move-down');
            }, 500);
        }
    },
    renderMessages: function(chatId) {
        var messagesContainer = document.getElementById('messages-container');
        var chatHeader = document.getElementById('chat-header');
        messagesContainer.innerHTML = '';
        
        var chat = Object.values(APP.contacts).find(c => c.id == chatId);
        
        if (!chat) return;
        
        // Update chat header
        var chatHeaderInfo = chatHeader.querySelector('.chat-header-info');
        chatHeaderInfo.innerHTML = `
        <div class="chat-header-info-head">
            <img src="${chat.avatar ? chat.avatar: 'person.png'}" alt="${chatId}" class="profile-pic">
            <div class="chat-header-name"><span class="chat-header-nameText">${chat.details.Name}</span><span class="chat-header-nameId">+${chat.id}</span></div>
        </div>
        <div class="chat-header-info-body">
            <div class="rowOptions" id="createModuleSelectOptionInRecord">
                ${APP.module == "Contacts" ? `<button class="rowOptionsButton" id="contactCreateSelectOption">
                    <div class="rowOptionsButtonIn">
                    <div>Create Deal</div>
                    </div>
                </button>` : ''}
                ${APP.module == "Leads" ? `<button class="rowOptionsButton" id="leadCreateSelectOption">
                    <div class="rowOptionsButtonIn">
                    <div>Create Contact</div>
                    </div>
                </button>` : ''}
            </div>
        </div>
        `;

        if(APP.module == "Contacts" && document.querySelector("#contactCreateSelectOption")) {
            document.querySelector("#contactCreateSelectOption").addEventListener('click', (e) => {
                APP.contactToDealCreateConfirmation(APP.contactRecord);
            });
        }
        else if(APP.module == "Leads" && document.querySelector("#leadCreateSelectOption")) {
            document.querySelector("#leadCreateSelectOption").addEventListener('click', (e) => {
                APP.leadToContactCreateConfirmation(APP.contactRecord);
            });
        }
        
        // Render messages
        chat.messages.forEach(message => {
            APP.addMessage(message);
        });

        
        
        // Mark messages as read
        // if (chat.unread > 0) {
        //     chat.unread = 0;
        //     APP.renderChatList();
        // }
    },
    addedStatus: `<svg viewBox="0 0 16 15" width="16" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 16 15"><title>msg-time</title><path fill="currentColor" d="M9.75,7.713H8.244V5.359c0-0.276-0.224-0.5-0.5-0.5H7.65c-0.276,0-0.5,0.224-0.5,0.5v2.947 c0,0.276,0.224,0.5,0.5,0.5h0.094c0.001,0,0.002-0.001,0.003-0.001S7.749,8.807,7.75,8.807h2c0.276,0,0.5-0.224,0.5-0.5V8.213 C10.25,7.937,10.026,7.713,9.75,7.713z M9.75,2.45h-3.5c-1.82,0-3.3,1.48-3.3,3.3v3.5c0,1.82,1.48,3.3,3.3,3.3h3.5 c1.82,0,3.3-1.48,3.3-3.3v-3.5C13.05,3.93,11.57,2.45,9.75,2.45z M11.75,9.25c0,1.105-0.895,2-2,2h-3.5c-1.104,0-2-0.895-2-2v-3.5 c0-1.104,0.896-2,2-2h3.5c1.105,0,2,0.896,2,2V9.25z"></path></svg>`,
    sentStatus: `<svg viewBox="0 0 12 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>msg-check</title><path d="M11.1549 0.652832C11.0745 0.585124 10.9729 0.55127 10.8502 0.55127C10.7021 0.55127 10.5751 0.610514 10.4693 0.729004L4.28038 8.36523L1.87461 6.09277C1.8323 6.04622 1.78151 6.01025 1.72227 5.98486C1.66303 5.95947 1.60166 5.94678 1.53819 5.94678C1.407 5.94678 1.29275 5.99544 1.19541 6.09277L0.884379 6.40381C0.79128 6.49268 0.744731 6.60482 0.744731 6.74023C0.744731 6.87565 0.79128 6.98991 0.884379 7.08301L3.88047 10.0791C4.02859 10.2145 4.19574 10.2822 4.38194 10.2822C4.48773 10.2822 4.58929 10.259 4.68663 10.2124C4.78396 10.1659 4.86436 10.1003 4.92784 10.0156L11.5738 1.59863C11.6458 1.5013 11.6817 1.40186 11.6817 1.30029C11.6817 1.14372 11.6183 1.01888 11.4913 0.925781L11.1549 0.652832Z" fill="currentcolor"></path></svg>`,
    deliveredStatus: `<svg viewBox="0 0 16 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>msg-dblcheck</title><path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="currentColor"></path></svg>`,
    readStatus: `<svg viewBox="0 0 16 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>msg-dblcheck</title><path fill="#53bdeb" d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="currentColor"></path></svg>`,
    addMessage: function(message) {

        messagesContainer = document.getElementById('messages-container');
        messageElement = document.createElement('div');
        messageElement.className = "message-content";
        messageElement.id = message[APP.extensionFieldMsgId] ? message[APP.extensionFieldMsgId].replaceAll(".", "_").replaceAll("=", "_") : "";
                
                if (message.replyTo) {
                    const repliedMessage = currentContact.messages.find(m => m.id === message.replyTo);
                    if (repliedMessage) {
                        messageElement.innerHTML += `
                            <div class="reply-indicator">
                                <p>Replying to <span class="replying-to">${message.outgoing ? 'you' : currentContact.name}</span></p>
                                <p>${repliedMessage.text || 'Media'}</p>
                            </div>
                        `;
                    }
                }
                else if (message.attachment) {
                    if (message.attachment.type === 'photo') {
                        messageElement.innerHTML += `
                            <div class="media-message">
                                <img src="${message.attachment.url}" alt="Photo">
                                <div class="download-btn">
                                    <i class="fas fa-download"></i>
                                </div>
                            </div>
                        `;
                    } else if (message.attachment.type === 'document') {
                        messageElement.innerHTML += `
                            <div class="message-content">
                                <div class="message-text">
                                    <i class="fas fa-file-pdf"></i> ${message.attachment.name} (${message.attachment.size})
                                </div>
                                <div class="download-btn">
                                    <i class="fas fa-download"></i>
                                </div>
                            </div>
                        `;
                    }
                }
                else {

                    let messageInColor = "White";
                    let messageOutColor = "#d9fdd3";
                    let incoming = message[APP.extensionFieldDirection] == 'incoming' ? true : false;
                    let messageDirection = incoming ? 'message-in' : 'message-out';
                    let messageboxHook = incoming ? `<span aria-hidden="true" class="message-in-content"><svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg></span>` : `<span aria-hidden="true" class="message-in-content"><svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg></span>`;
                    let messageToReact = incoming ? `<div class="message-text-to-react-out"><div class="message-text-to-react-in"><div><div class="message-text-to-react"><span class="message-text-to-react-icon"><svg viewBox="0 0 15 15" width="15" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>react</title><path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.5C0 11.6305 3.36946 15 7.5 15C11.6527 15 15 11.6305 15 7.5C15 3.36946 11.6305 0 7.5 0C3.36946 0 0 3.36946 0 7.5ZM10.995 8.69333C11.1128 8.67863 11.2219 8.66503 11.3211 8.65309C11.61 8.63028 11.8076 8.91918 11.6784 9.13965C10.8573 10.6374 9.29116 11.793 7.50455 11.793C5.71794 11.793 4.15181 10.6602 3.33072 9.16246C3.18628 8.91918 3.37634 8.63028 3.66524 8.65309C3.79123 8.66749 3.93521 8.68511 4.09426 8.70457C4.94292 8.80842 6.22074 8.96479 7.48174 8.96479C8.81855 8.96479 10.1378 8.80025 10.995 8.69333ZM5.41405 7.37207C6.05761 7.37207 6.60923 6.72851 6.60923 6.02978C6.60923 5.30348 6.05761 4.6875 5.41405 4.6875C4.77048 4.6875 4.21886 5.33106 4.21886 6.02978C4.20967 6.75609 4.77048 7.37207 5.41405 7.37207ZM10.7807 6.05619C10.7807 6.74114 10.24 7.37201 9.60912 7.37201C8.97825 7.37201 8.4375 6.76818 8.4375 6.05619C8.4375 5.37124 8.97825 4.74037 9.60912 4.74037C10.24 4.74037 10.7807 5.34421 10.7807 6.05619Z" fill="currentColor"></path></svg></span></div></div></div></div>` : `<div class="message-text-to-react-out"><div class="message-text-to-react-in"><div><div class="message-text-to-react"><span class="message-text-to-react-icon"><svg viewBox="0 0 15 15" width="15" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>react</title><path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.5C0 11.6305 3.36946 15 7.5 15C11.6527 15 15 11.6305 15 7.5C15 3.36946 11.6305 0 7.5 0C3.36946 0 0 3.36946 0 7.5ZM10.995 8.69333C11.1128 8.67863 11.2219 8.66503 11.3211 8.65309C11.61 8.63028 11.8076 8.91918 11.6784 9.13965C10.8573 10.6374 9.29116 11.793 7.50455 11.793C5.71794 11.793 4.15181 10.6602 3.33072 9.16246C3.18628 8.91918 3.37634 8.63028 3.66524 8.65309C3.79123 8.66749 3.93521 8.68511 4.09426 8.70457C4.94292 8.80842 6.22074 8.96479 7.48174 8.96479C8.81855 8.96479 10.1378 8.80025 10.995 8.69333ZM5.41405 7.37207C6.05761 7.37207 6.60923 6.72851 6.60923 6.02978C6.60923 5.30348 6.05761 4.6875 5.41405 4.6875C4.77048 4.6875 4.21886 5.33106 4.21886 6.02978C4.20967 6.75609 4.77048 7.37207 5.41405 7.37207ZM10.7807 6.05619C10.7807 6.74114 10.24 7.37201 9.60912 7.37201C8.97825 7.37201 8.4375 6.76818 8.4375 6.05619C8.4375 5.37124 8.97825 4.74037 9.60912 4.74037C10.24 4.74037 10.7807 5.34421 10.7807 6.05619Z" fill="currentColor"></path></svg></span></div></div></div></div>`;
                    let messageTime = APP.getCurrentTime(message.Created_Time);
                    let messageText = message[APP.extensionFieldMessage];
                    let messageChatImg = `<div class="message-chat-img-div"><img alt="" draggable="false" class="message-chat-img" tabindex="-1" src="${incoming ? 'person.png' : APP.currentUser.image_link ? APP.currentUser.image_link : 'person.png'}"></div>`;
                    let messageOwnerName = !incoming && message.Owner && typeof(message.Owner) == "object" && message.Owner.name ? `<div class="message-owner"><span class="message-owner-name">${message.Owner.name}</span></div>` : !incoming && message.Owner && typeof(message.Owner) == "string" && APP.allUsers[message.Owner] && APP.allUsers[message.Owner].full_name ? `<div class="message-owner"><span class="message-owner-name">${APP.allUsers[message.Owner].full_name}</span></div>` : '';

                    let startConvIcon = "";
                    let startConvImag = "";
                    let startConvOwner = "";
                    if(APP.lastMessageDirection != message[APP.extensionFieldDirection]) {
                        APP.lastMessageDirection = message[APP.extensionFieldDirection];
                        messageElement.className = "message-content startConversation";
                        startConvIcon = messageboxHook;
                        startConvImag = messageChatImg;
                        startConvOwner = messageOwnerName;
                    }

                    let messageStatus = incoming ? '' : `<div class="message-status-out"><span class="message-status">${message[APP.extensionFieldStatus] == "sent" ? APP.sentStatus : message[APP.extensionFieldStatus] == "delivered" ? APP.deliveredStatus : message[APP.extensionFieldStatus] == "read" ? APP.readStatus : APP.addedStatus}</span></div>`;
                    messageElement.innerHTML = `<div class="message-content-inner" data-id="">
                                                <div class="${ messageDirection }">
                                                    <div class="message-content-main">
                                                        ${startConvIcon}${startConvImag}${messageToReact}
                                                        <div class="message-content-main-div">
                                                            <div>
                                                                <div class="message-content-main-div-in">
                                                                    ${startConvOwner}
                                                                    <div class="data-pre-plain-text-out">
                                                                        <div class="data-pre-plain-text"><span dir="ltr" class="message-text"><span class="message">${messageText}</span></span><span class=""><span class="message-text-hide-formate"><span class="message-out-status-width"></span><span class="message-text-hide">${messageTime}</span></span></span></div>
                                                                    </div>
                                                                    <div class="message-time-out">
                                                                        <div class="message-time-in"><span class="message-time" dir="auto">${messageTime}</span>${messageStatus}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span class=""><div class="message-text-to-out"><div class="message-text-to-in"><span class="message-text-to"><svg viewBox="0 0 18 18" height="18" width="18" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 18 18"><title>down-context</title><path fill="currentColor" d="M3.3,4.6L9,10.3l5.7-5.7l1.6,1.6L9,13.4L1.7,6.2L3.3,4.6z"></path></svg></span></div></div></span>
                                                        </div>                
                                                    </div>
                                                </div>
                                            </div>`;
                }

                        
                // Add right-click menu for messages
                // messageElement.addEventListener('contextmenu', (e) => {
                //     e.preventDefault();
                //     showMessageContextMenu(e, message);
                // });
                
                
                  messageElement.addEventListener('mouseover', function() {
                    this.querySelector(".message-text-to-react-out").style.display = 'flex';                    
                    this.querySelector(".message-text-to-out").style.display = 'flex';
                });
                
                // Add mouseout event listener to return to original state
                messageElement.addEventListener('mouseout', function() {                    
                    this.querySelector(".message-text-to-react-out").style.display = 'none';
                    this.querySelector(".message-text-to-out").style.display = 'none';
                });
                messagesContainer.appendChild(messageElement);

                // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    showNotification: function(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    },
    getCurrentTime: function(time) {
        var now = time ? new Date(time) : new Date();
        let hours = now.getHours();
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return `${hours}:${minutes} ${ampm}`;
    },
    toIsoString: function(date) {
        let tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function(num) {
                return (num < 10 ? '0' : '') + num;
            };
      
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            dif + pad(Math.floor(Math.abs(tzo) / 60)) +
            ':' + pad(Math.abs(tzo) % 60);
    },
    sendMessage: async function() {

        messageInput = document.getElementById('message-input');
        var messageText = messageInput.textContent.trim();
        
        if (!messageText) return;
        if (!APP.contacts[APP.currentChatId]) return;

        let historyRecordData = {};
        historyRecordData[APP.extensionFieldName] = "WhatsApp Message to "+APP.contacts[APP.currentChatId].details.Name;
        historyRecordData[APP.extensionFieldOwner] = APP.currentUser.id;
        historyRecordData[APP.extensionFieldWhatsAppNumber] = APP.currentChatId;
        historyRecordData[APP.extensionFieldFrom] = "";
        historyRecordData[APP.extensionFieldTo] = APP.currentUser.id;
        historyRecordData[APP.extensionFieldMessage] = messageText;
        historyRecordData[APP.extensionFieldTimestamp] = APP.toIsoString(new Date());
        historyRecordData[APP.extensionFieldDirection] = "outgoing";
        historyRecordData[APP.extensionFieldStatus] = "added";

        if(APP.selectedModule && APP.selectedRecord) {
            historyRecordData[APP.extensionFieldModule] = APP.selectedModule.substring(0, APP.selectedModule.length-1);
            historyRecordData[APP.extensionAPI+APP.selectedModule] = APP.selectedRecord.id;
        }

        APP.addMessage(historyRecordData);

        sendButton = document.getElementById('send-button');
        messageInput.textContent = '';
        sendButton.classList.remove('active');

        let contactRecordData = {};
        contactRecordData[APP.extensionFieldName] = APP.contacts[APP.currentChatId].details.Name;
        // contactRecordData[APP.extensionFieldOwner] = APP.currentUser.id;
        contactRecordData[APP.extensionFieldWhatsAppNumber] = APP.currentChatId;
        contactRecordData[APP.extensionFieldLastMessage] = messageText;
        contactRecordData[APP.extensionFieldActiveTime] = APP.toIsoString(new Date());
        contactRecordData[APP.extensionFieldDirection] = "outgoing";
        contactRecordData[APP.extensionFieldStatus] = "added";

        if(APP.selectedModule && APP.selectedRecord) {
            contactRecordData[APP.extensionFieldModule] = APP.selectedModule.substring(0, APP.selectedModule.length-1);
            contactRecordData[APP.extensionAPI+APP.selectedModule] = APP.selectedRecord.id;
        }

        $("#chatid-"+APP.currentChatId+" .chat-message").html(contactRecordData[APP.extensionFieldLastMessage]);
        $("#chatid-"+APP.currentChatId+" .chat-time").html(APP.getCurrentTime(contactRecordData[APP.extensionFieldActiveTime]));

        let request = {
            url : `https://graph.facebook.com/v22.0/581984271672102/messages`,
            headers: { 
                "Authorization": "Bearer "+"EAAmTNTZCXDTkBO3gpqAHGHNuZBicKy7ehR1zQh01ZAdcrFtGbjvfArlqnamegWQLi3qLJCgLOFQdN10w94MuZBDIJZA2aERKZCsuJBBJAHZA1ntLqox2iSxjjVAbneJZCmSIusrow26adrRRfqdVuXlcBmuBY6ATYwVsyuv7zQVxMuVIGuc0ZCgNxHnnZC7HiGM89Heo1ogGGQt0S8LvmsZAW8UFhPXLBAc3FnQiO3s",
                "Content-Type": "application/json"
            },
            body: {
                "messaging_product": "whatsapp",
                "to": APP.currentChatId,
                "type": "text",                    
                "recipient_type": "individual",
                // "template": {
                //     "name": "test_template", "language": { "code": "en_US" }
                // },                    
                "text": {
                    "preview_url": false,
                    "body": String(messageText)
                }
            }
        };

        ZOHO.CRM.HTTP.post(request).then(async function(resp) {
            if(resp) {
                resp = JSON.parse(resp);
            }
            if(resp && resp.messages && resp.messages[0] && resp.messages[0].id) {
                historyRecordData[APP.extensionFieldMsgId] = resp.messages[0].id;
                contactRecordData[APP.extensionFieldLastMsgId] = resp.messages[0].id;
                $(".message-content").last().attr("id", resp.messages[0].id.replaceAll(".", "_").replaceAll("=", "_"))
            }
            else {
                historyRecordData[APP.extensionFieldStatus] = "faild";
                contactRecordData[APP.extensionFieldStatus] = "faild";
            }
            APP.contacts[APP.currentChatId].messages.push(historyRecordData);
            // APP.contacts[APP.currentChatId].details = contactRecordData;
            APP.contacts[APP.currentChatId].details = Object.assign(APP.contacts[APP.currentChatId].details, contactRecordData);
            if(APP.module && APP.recordId) {
                historyRecordData[APP.extensionAPI+APP.module.substring(0, APP.module.length-1)] = APP.recordId;
                contactRecordData[APP.extensionAPI+APP.module.substring(0, APP.module.length-1)] = APP.recordId;
            }
            await ZOHO.CRM.API.insertRecord({Entity: APP.extensionHistory,APIData:historyRecordData,Trigger:["workflow"]}).then(function(data){});
            let searchRecord = await ZOHO.CRM.API.searchRecord({Entity:APP.extensionContacts, Type:"criteria",Query:`(${APP.extensionFieldWhatsAppNumber}:equals:${APP.currentChatId})`});
            if(searchRecord.data) {
                contactRecordData.id = searchRecord.data[0].id;
                contactRecordData.Name = searchRecord.data[0].Name;
                await ZOHO.CRM.API.updateRecord({Entity: APP.extensionContacts,APIData:contactRecordData,Trigger:["workflow"]}).then(function(data){});
            }
            else {
                await ZOHO.CRM.API.insertRecord({Entity: APP.extensionContacts,APIData:contactRecordData,Trigger:["workflow"]}).then(function(data){});
            }
        });
        
    },
    safeString: function(rawStr) {
        if(!rawStr || rawStr+"".trim() === "") {
            return "";
        }
        return $('<textarea/>').text(rawStr).html();
    },
    firebaseSetup: function() {
        // Your Firebase config
        var firebaseConfig = {
            apiKey: "AIzaSyBo03-xCIbQSvb9HdYjhC8FRLwMUuYzI4U",
            authDomain: "enprojecttest.firebaseapp.com",
            databaseURL: "https://enprojecttest-default-rtdb.firebaseio.com",
            projectId: "enprojecttest",
            storageBucket: "enprojecttest.firebasestorage.app",
            messagingSenderId: "771895717983",
            appId: "1:771895717983:web:25295df2887ad04c79abea"
            };
    
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
    
            // Get a reference to the database service
            APP.database = firebase.database();
    },
    realtimeListener: function() {
        APP.database.ref('incomingMessages').on('child_added', (snapshot) => {
            let data = snapshot.val();
            let key  = snapshot.key;
            if(APP.realtimeDuplicateChaeckArr[key]) return;
            APP.realtimeDuplicateChaeckArr[key] = key;
            if(!data || !data.messages || !data.messages[0]) {
                return;
            }
            let historyRecordData = {};
            historyRecordData[APP.extensionFieldName] = "incoming from "+ data.messages[0].from && APP.contacts[data.messages[0].from] && APP.contacts[data.messages[0].from].details && APP.contacts[data.messages[0].from].details[APP.extensionFieldName] ? APP.contacts[data.messages[0].from].details[APP.extensionFieldName] : data.messages[0].from;
            historyRecordData[APP.extensionFieldOwner] = data.messages[0].from && APP.contacts[data.messages[0].from] && APP.contacts[data.messages[0].from].details && APP.contacts[data.messages[0].from].details[APP.extensionFieldOwner] && APP.contacts[data.messages[0].from].details[APP.extensionFieldOwner].id ? APP.contacts[data.messages[0].from].details[APP.extensionFieldOwner].id : APP.currentUser.id;
            historyRecordData[APP.extensionFieldWhatsAppNumber] = data.messages[0].from;
            historyRecordData[APP.extensionFieldFrom] = data.messages[0].from;
            historyRecordData[APP.extensionFieldTo] = "";
            historyRecordData[APP.extensionFieldMessage] = data.messages[0].text.body;
            historyRecordData[APP.extensionFieldTimestamp] = APP.toIsoString(new Date(data.messages[0].timestamp));
            historyRecordData[APP.extensionFieldDirection] = "incoming";
            historyRecordData[APP.extensionFieldStatus] = "received";

            if(APP.selectedModule && APP.selectedRecord) {
                historyRecordData[APP.extensionFieldModule] = APP.selectedModule.substring(0, APP.selectedModule.length-1);
                historyRecordData[APP.extensionAPI+APP.selectedModule] = APP.selectedRecord.id;
            }

            historyRecordData["Created_Time"] = APP.toIsoString(new Date());
            if(APP.contacts[data.messages[0].from]) {
                APP.contacts[data.messages[0].from]["notifications"][key] = historyRecordData;
            }
            else {
                let newContactNotification = {};
                newContactNotification[key] = historyRecordData;
                APP.contacts[data.messages[0].from] = {
                    id: data.messages[0].from,
                    unread: 0,
                    details: {},
                    notifications: newContactNotification,
                    messages: []
                };
            }
            if(APP.currentChatId == data.messages[0].from) {                
                APP.contacts[data.messages[0].from].messages.push(historyRecordData);
                delete APP.contacts[data.messages[0].from].notifications[key];
                APP.addMessage(historyRecordData);
                setTimeout(() => {
                    APP.database.ref('incomingMessages/'+key).remove().then(() => {
                        console.log("Data deleted successfully");
                    }).catch((error) => {
                        console.error("Error deleting data: ", error);
                    });
                }, 2000);
            }
            let contactRecordData = {};
            contactRecordData[APP.extensionFieldName] = data.messages[0].from && APP.contacts[data.messages[0].from] && APP.contacts[data.messages[0].from].details && APP.contacts[data.messages[0].from].details[APP.extensionFieldName] ? APP.contacts[data.messages[0].from].details[APP.extensionFieldName] : data.messages[0].from;
            contactRecordData[APP.extensionFieldOwner] = data.messages[0].from && APP.contacts[data.messages[0].from] && APP.contacts[data.messages[0].from].details && APP.contacts[data.messages[0].from].details[APP.extensionFieldOwner] && APP.contacts[data.messages[0].from].details[APP.extensionFieldOwner].id ? APP.contacts[data.messages[0].from].details[APP.extensionFieldOwner].id : "";
            contactRecordData[APP.extensionFieldWhatsAppNumber] = data.messages[0].from;
            contactRecordData[APP.extensionFieldLastMessage] = data.messages[0].text.body;
            contactRecordData[APP.extensionFieldActiveTime] = APP.toIsoString(new Date(data.messages[0].timestamp));
            contactRecordData[APP.extensionFieldDirection] = "incoming";
            contactRecordData[APP.extensionFieldStatus] = "received";

            if(APP.selectedModule && APP.selectedRecord) {
                contactRecordData[APP.extensionFieldModule] = APP.selectedModule.substring(0, APP.selectedModule.length-1);
                contactRecordData[APP.extensionAPI+APP.selectedModule] = APP.selectedRecord.id;
            }

            if(APP.currentChatId != data.messages[0].from) {
                APP.contacts[data.messages[0].from].unread += 1;
            }

            // APP.contacts[data.messages[0].from].details = contactRecordData;
            APP.contacts[data.messages[0].from].details = Object.assign(APP.contacts[data.messages[0].from].details, contactRecordData);
            
            if($("#chatid-"+data.messages[0].from).length) {
                if(!$("#chatid-"+data.messages[0].from+" .unread-count").length && APP.currentChatId != data.messages[0].from) {
                    $("#chatid-"+data.messages[0].from+" .chat-preview").append(`<div class="unread-count">${APP.contacts[data.messages[0].from].unread}</div>`);
                }
                else if(APP.currentChatId != data.messages[0].from) {
                    $("#chatid-"+data.messages[0].from+" .unread-count").html(APP.contacts[data.messages[0].from].unread);
                }
                $("#chatid-"+data.messages[0].from+" .chat-message").html(APP.contacts[data.messages[0].from].details[APP.extensionFieldLastMessage]);
                $("#chatid-"+data.messages[0].from+" .chat-time").html(APP.getCurrentTime(APP.contacts[data.messages[0].from].details.Modified_Time));
                APP.moveContactToTop(data.messages[0].from);
            }
            else {
                let contactElement = APP.createContactElement(APP.contacts[data.messages[0].from]);
                APP.contactList.appendChild(contactElement);
            }
            
        }, (error) => {
            console.error("Listener error:", error);
            document.getElementById('data-container').textContent = "Error: " + error.message;
        });


        APP.database.ref('outgoingMessages').on('child_added', (snapshot) => {
            let data = snapshot.val();
            let key  = snapshot.key;
            if(APP.realtimeDuplicateChaeckArr[key]) return;
            APP.realtimeDuplicateChaeckArr[key] = key;
            if(!data || !data.statuses || !data.statuses[0]) {
                return;
            }

            if(data.statuses[0].recipient_id && APP.contacts[data.statuses[0].recipient_id]) {
                let chatMessage = {};
                APP.contacts[data.statuses[0].recipient_id].messages.find((o, i) => {
                    if(o[APP.extensionFieldMsgId] === data.statuses[0].id) {
                        APP.contacts[data.statuses[0].recipient_id].messages[i][APP.extensionFieldStatus] = data.statuses[0].status;
                        chatMessage = APP.contacts[data.statuses[0].recipient_id].messages[i];
                        return true;
                    }
                });

                if(chatMessage && chatMessage[APP.extensionFieldMessage]) {
                    let chat = Object.values(APP.contacts).find(c => c.id == data.statuses[0].recipient_id);
                    let contactRecordData = {};
                    contactRecordData[APP.extensionFieldName] = chat && chat.details && chat.details[APP.extensionFieldName] ? chat.details[APP.extensionFieldName] : data.statuses[0].recipient_id;
                    contactRecordData[APP.extensionFieldOwner] = chat && chat.details && chat.details[APP.extensionFieldOwner] && chat.details[APP.extensionFieldOwner].id ? chat.details[APP.extensionFieldOwner].id : "";
                    contactRecordData[APP.extensionFieldWhatsAppNumber] = data.statuses[0].recipient_id;
                    contactRecordData[APP.extensionFieldLastMessage] = chatMessage[APP.extensionFieldMessage];
                    contactRecordData[APP.extensionFieldActiveTime] = APP.toIsoString(new Date(data.statuses[0].timestamp));
                    contactRecordData[APP.extensionFieldDirection] = "outgoing";
                    contactRecordData[APP.extensionFieldStatus] = data.statuses[0].status;

                    // APP.contacts[data.statuses[0].recipient_id].details = contactRecordData;
                    APP.contacts[data.statuses[0].recipient_id].details = Object.assign(APP.contacts[data.statuses[0].recipient_id].details, contactRecordData);
                    
                    if($("#chatid-"+data.statuses[0].recipient_id).length) {
                        $("#chatid-"+data.statuses[0].recipient_id+" .chat-message").html(`${data.statuses[0].status == "sent" ? APP.sentStatus : data.statuses[0].status == "delivered" ? APP.deliveredStatus : data.statuses[0].status == "read" ? APP.readStatus : APP.addedStatus}`+APP.contacts[data.statuses[0].recipient_id].details[APP.extensionFieldLastMessage]);
                        $("#chatid-"+data.statuses[0].recipient_id+" .chat-time").html(APP.getCurrentTime(APP.contacts[data.statuses[0].recipient_id].details.Modified_Time));
                        // APP.moveContactToTop(data.messages[0].from);
                    }
                    else {
                        // APP.addChat(APP.contacts[data.messages[0].from]);
                    }
                }
            }
            if($("#"+data.statuses[0].id.replaceAll(".", "_").replaceAll("=", "_")).length) {
                $("#"+data.statuses[0].id.replaceAll(".", "_").replaceAll("=", "_")+" .message-status").html(`${data.statuses[0].status == "sent" ? APP.sentStatus : data.statuses[0].status == "delivered" ? APP.deliveredStatus : data.statuses[0].status == "read" ? APP.readStatus : APP.addedStatus}`);
            }
            setTimeout(() => {
                APP.database.ref('outgoingMessages/'+key).remove().then(() => {
                    console.log("Data deleted successfully");
                }).catch((error) => {
                    console.error("Error deleting data: ", error);
                });
            }, 2000);

        }, (error) => {
            console.error("Listener error:", error);
            document.getElementById('data-container').textContent = "Error: " + error.message;
        });

    },
    unusedCodes: function() {

        var emojiBtn = document.getElementById('emoji-btn');
        var emojiPicker = document.getElementById('emoji-picker');
        var emojiGrid = document.getElementById('emoji-grid');
        var attachmentBtn = document.getElementById('attachment-btn');
        var attachmentOptions = document.getElementById('attachment-options');
        var attachPhoto = document.getElementById('attach-photo');
        var mediaPreview = document.getElementById('media-preview');
        var previewImage = document.getElementById('preview-image');
        var previewCancel = document.getElementById('preview-cancel');
        var previewSend = document.getElementById('preview-send');
        var chatHeader = document.getElementById('chat-header');
        var contactDetails = document.getElementById('contact-details');
        var backButton = document.getElementById('back-button');
        var profilePic = document.getElementById('profile-pic');
        var settingsPage = document.getElementById('settings-page');
        var settingsBack = document.getElementById('settings-back');
        var notification = document.getElementById('notification');

        // Attach photo
        attachPhoto.addEventListener('click', () => {
            attachmentOptions.style.display = 'none';
            // In a real app, this would open a file picker
            // For demo, we'll simulate selecting an image
            previewImage.src = 'https://via.placeholder.com/300x200';
            mediaPreview.style.display = 'block';
        });
        
        function handleAttachment(type) {
            switch (type) {
                case 'photo':
                    // Simulate photo upload
                    showNotification('Uploading photo...');
                    setTimeout(() => {
                        const newMessage = {
                            id: Date.now(),
                            text: '',
                            time: getCurrentTime(),
                            outgoing: true,
                            status: 'delivered',
                            attachment: {
                                type: 'photo',
                                url: 'https://picsum.photos/300/200?' + Math.random()
                            }
                        };
                        currentContact.messages.push(newMessage);
                        renderMessages(currentContact.messages);
                        
                        // Simulate reply
                        setTimeout(() => {
                            const replyMessage = {
                                id: Date.now(),
                                text: 'Nice photo!',
                                time: getCurrentTime(),
                                outgoing: false,
                                status: 'delivered'
                            };
                            currentContact.messages.push(replyMessage);
                            renderMessages(currentContact.messages);
                            showNotification(`New message from ${currentContact.name}`);
                        }, 2000);
                    }, 1000);
                    break;
                case 'document':
                    // Simulate document upload
                    showNotification('Uploading document...');
                    setTimeout(() => {
                        const newMessage = {
                            id: Date.now(),
                            text: '',
                            time: getCurrentTime(),
                            outgoing: true,
                            status: 'delivered',
                            attachment: {
                                type: 'document',
                                name: 'Document_' + Math.floor(Math.random() * 1000) + '.pdf',
                                size: (Math.random() * 5 + 1).toFixed(1) + ' MB'
                            }
                        };
                        currentContact.messages.push(newMessage);
                        renderMessages(currentContact.messages);
                    }, 1000);
                    break;
                case 'audio':
                    showNotification('Recording audio...');
                    break;
                case 'location':
                    showNotification('Sharing location...');
                    break;
                case 'contact':
                    showNotification('Sharing contact...');
                    break;
            }
        }

        // Media preview actions
        previewCancel.addEventListener('click', () => {
            mediaPreview.style.display = 'none';
        });
        
        previewSend.addEventListener('click', () => {
            var chat = Object.values(APP.contacts).find(c => c.id == APP.currentChatId);
            var newMessage = {
                text: '[Photo]',
                time: APP.getCurrentTime(),
                incoming: false,
                status: 'delivered'
            };
            chat.messages.push(newMessage);
            chat.lastMessage = 'You: [Photo]';
            chat.time = 'Just now';
            APP.renderMessages(APP.currentChatId);
            APP.renderChatList();
            mediaPreview.style.display = 'none';
            
            // Simulate reply after 1-3 seconds
            setTimeout(() => {
                var replies = [
                    'Nice photo!',
                    'Thanks for sharing!',
                    'Where was this taken?',
                    'Looking good!'
                ];
                var randomReply = replies[Math.floor(Math.random() * replies.length)];
                
                var replyMessage = {
                    text: randomReply,
                    time: APP.getCurrentTime(),
                    incoming: true
                };
                
                chat.messages.push(replyMessage);
                chat.lastMessage = randomReply;
                chat.time = 'Just now';
                APP.renderMessages(APP.currentChatId);
                APP.renderChatList();
                
                // Show notification if chat is not active
                if (chat.id !== APP.currentChatId) {
                    APP.showNotification(`${chat.name}: ${randomReply}`);
                }
            }, 1000 + Math.random() * 2000);
        });

        emojiBtn = document.getElementById('emoji-btn');
        emojiPicker = document.getElementById('emoji-picker');

// Emoji picker
            emojiBtn.addEventListener('click', toggleEmojiPicker);
            emojiPicker.querySelectorAll('.emoji').forEach(emoji => {
                emoji.addEventListener('click', () => {
                    messageInput.value += emoji.textContent;
                    messageInput.focus();
                });
            });

            // Toggle emoji picker
        function toggleEmojiPicker(e) {
            e.stopPropagation();
            emojiPicker.classList.toggle('show');
            attachmentOptions.classList.remove('show');
        }

    attachmentBtn = document.getElementById('attachment-btn');
    attachmentOptions = document.getElementById('attachment-options');

    // Attachment options
    attachmentBtn.addEventListener('click', toggleAttachmentOptions);
    attachmentOptions.querySelectorAll('.attachment-option').forEach(option => {
        option.addEventListener('click', () => {
            const type = option.getAttribute('data-type');
            handleAttachment(type);
            toggleAttachmentOptions();
        });
    });

    // Toggle attachment options
    function toggleAttachmentOptions(e) {
            e.stopPropagation();
            attachmentOptions.classList.toggle('show');
            emojiPicker.classList.remove('show');
        }
        
        // Click outside to close popups
        // Close dropdowns when clicking elsewhere
        
        
        
        // Profile pic click to show settings
        if(profilePic)
        profilePic.addEventListener('click', () => {
            settingsPage.style.display = 'flex';
            sidebar.style.display = 'none';
            chatArea.style.display = 'none';
            contactDetails.style.display = 'none';
        });
        
        // Back button from settings
        settingsBack.addEventListener('click', () => {
            settingsPage.style.display = 'none';
            sidebar.style.display = 'flex';
            chatArea.style.display = 'flex';
        });


    }

};