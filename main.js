
document.writeln('<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>');
document.writeln('<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap">');
document.writeln('<script src="ZohoEmbededAppSDK.js?v=3"></script>');
document.addEventListener("DOMContentLoaded", function (event) {
    ZOHO.embeddedApp.on("PageLoad", async function(record) {
        if(record.Entity && record.EntityId) {
            if(record.ButtonPosition) {
                APP.recordId = record.EntityId[0];
            }
            else {
                APP.recordId = record.EntityId;
            }
            APP.module = record.Entity;
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
    currentUser: {},
    allUsers: {},
    currentContactId: "",
    contacts: {},
    at: "",
    realtimeDuplicateChaeckArr: [],
    lastMessageDirection: "",
    dealStagesList: "",
    currentUserIconElement: "#profile-pic",
    sidebarElement: ".sidebar",
    loaderElement: "#loader",
    sendModeType: 'single',
    isBulk: false,
    selectedContacts: [],
    whatsappTemplates: {},
    logo: `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="40" viewBox="0 0 180 40" fill="none"> <g clip-path="url(#clip0_2864_5776)"> <g clip-path="url(#clip1_2864_5776)"> <path d="M9.84909 0.5H0.978027L13.633 29.2527C13.7297 29.4724 14.0421 29.4702 14.1358 29.2495L18.3447 19.3485L9.84909 0.5Z" fill="black"/> <path d="M36.8708 0.5C36.8708 0.5 23.2742 31.6392 21.453 34.5108C19.3363 37.8492 17.9334 39.1235 15.3375 39.5318C15.3135 39.5355 15.2957 39.5563 15.2957 39.5807C15.2957 39.6081 15.318 39.6304 15.3453 39.6304H23.4696C26.989 39.6304 29.527 36.6915 30.9335 34.0962C32.532 31.1464 45.8982 0.5 45.8982 0.5H36.8708Z" fill="black"/> </g> <path d="M72.2275 25.4738C72.2088 25.5149 72.1505 25.5149 72.1317 25.4738L65.408 10.7144H61.6304C61.6304 10.7144 68.5601 26.376 69.2523 27.5462C69.9287 28.6898 70.7473 29.6326 72.1797 29.6326C73.6121 29.6326 74.4307 28.6898 75.1072 27.5462C75.7994 26.376 82.7291 10.7144 82.7291 10.7144H78.9515L72.2275 25.4738Z" fill="black"/> <path d="M92.7333 26.7567C89.0796 26.7567 86.6868 24.3696 86.6868 20.0652C86.6868 15.7609 89.0796 13.3741 92.7333 13.3741C96.374 13.3741 98.7795 15.7609 98.7795 20.0652C98.7795 24.3696 96.374 26.7567 92.7333 26.7567ZM92.7333 10.2828C87.0121 10.2828 83.3322 14.0002 83.3322 20.0652C83.3322 26.1306 87.0121 29.848 92.7333 29.848C98.4415 29.848 102.134 26.1306 102.134 20.0652C102.134 14.0002 98.4415 10.2828 92.7333 10.2828Z" fill="black"/> <path d="M121.463 10.7132V29.4176H117.59L108.564 15.7429V29.4176H105.261V10.7132H109.146L118.173 24.4791V10.7132H121.463Z" fill="black"/> <path d="M130.314 21.748L133.567 14.1088C133.585 14.0659 133.646 14.0659 133.664 14.1088L136.917 21.748H130.314ZM133.615 10.4994C132.255 10.4994 131.424 11.5346 130.876 12.5698C130.314 13.6306 123.598 29.4176 123.598 29.4176H127.049L128.977 24.8884H138.254L140.182 29.4176H143.633C143.633 29.4176 136.917 13.6306 136.355 12.5698C135.807 11.5346 134.975 10.4994 133.615 10.4994Z" fill="black"/> <path d="M152.969 22.2046H158.876C158.849 25.1108 156.144 26.7568 153.278 26.7568C149.683 26.7568 147.328 24.3695 147.328 20.0653C147.328 15.418 149.508 13.3468 153.479 13.3468C155.965 13.3468 158.033 14.3666 158.468 16.7169H161.893C161.293 12.602 157.515 10.2827 153.278 10.2827C147.648 10.2827 144.028 14.0001 144.028 20.0653C144.028 26.1305 147.648 29.7753 153.278 29.7753C155.651 29.7753 158.045 28.4987 158.888 27.1503L158.877 29.4175H162.037V19.3422H152.969V22.2046Z" fill="black"/> <path d="M179.022 13.8435V10.7132H165.616V29.4176H179.022V26.287H168.918V21.3698H178.234V18.2392H168.918V13.8435H179.022Z" fill="black"/> </g> <defs> <clipPath id="clip0_2864_5776"> <rect width="178.043" height="39.1304" fill="white" transform="translate(0.978271 0.5)"/> </clipPath> <clipPath id="clip1_2864_5776"> <rect width="45" height="39.1304" fill="white" transform="translate(0.978271 0.5)"/> </clipPath> </defs> </svg>`,
    init: async function() {

        APP.extensionFieldId = "id";
        APP.extensionFieldName = "Name";
        APP.extensionFieldOwner = "Owner";
        APP.extensionFieldMessage = APP.extensionAPI + "WhatsApp_Message";    // WhatsApp_Message
        APP.extensionFieldEncodeMessage = APP.extensionAPI + "Encode_Message";
        APP.extensionFieldWhatsAppNumber = APP.extensionAPI + "WhatsApp_Number";
        APP.extensionFieldModule = APP.extensionAPI + "Module";
        APP.extensionFieldLastMessage = APP.extensionAPI + "Last_Message0";
        APP.extensionFieldContact = APP.extensionAPI + "Contact";
        APP.extensionFieldLead = APP.extensionAPI + "Lead";
        APP.extensionFieldAccount = APP.extensionAPI + "Account";
        APP.extensionFieldFrom = APP.extensionAPI + "From";
        APP.extensionFieldTo = APP.extensionAPI + "To";
        APP.extensionFieldStatus = APP.extensionAPI + "Status";
        APP.extensionFieldMsgId = APP.extensionAPI + "MsgId";
        APP.extensionFieldDirection = APP.extensionAPI + "Direction";
        APP.extensionFieldActiveTime = APP.extensionAPI + "Active_Time";  
        APP.extensionFieldTimestamp = APP.extensionAPI + "Timestamp";        
        APP.extensionFieldReactionFrom = APP.extensionAPI + "Reaction_From";        
        APP.extensionFieldReactionTo = APP.extensionAPI + "Reaction_To";
        APP.extensionFieldReplyMessageId = APP.extensionAPI + "Reply_Message_Id";

        APP.extensionHistory = APP.extensionAPI + "WhatsApp_Business_History";
        APP.extensionContacts = APP.extensionAPI + "WhatsApp_Contacts";
        APP.extensionAPIAt = APP.extensionAPI+"at";

        await APP.inboxChatSetup();
        await APP.clickFunctions();
        await APP.settingsPopup();
        

    },
    clickFunctions: function() {


        let contactList = document.getElementById('chat-list');
        contactList.addEventListener('click', async (e) => { 
            if(e.target.closest('.contactItem')) {
                APP.contactListClickFunction(e);
            }
        });

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
                let filteredChats = filter ? Object.values(APP.contacts).filter(chat => chat.details.Name.toLowerCase().includes(filter.toLowerCase())) : Object.values(APP.contacts);
                Object.values(filteredChats).forEach(chat => {
                    APP.addContactList(chat.id);
                });
            });
        }

        $('#filterModuleList').on('change', function(e) {
            let value = this.value;
            $(".filterMode-module-selected-text").text(value ? value+'s' : 'All Modules');
            APP.filterModeChangeAction(e.target.closest("#filterMode-modules"), true);
            return;
            $(".filter-container .rowOptionsButton.selected").removeClass("selected");
            this.parentNode.parentNode.setAttribute("class", "rowOptionsButton selected");
            value = this.value;
            var chatList = document.getElementById('chat-list');
            chatList.innerHTML = '';
            let filteredChats = value ? Object.values(APP.contacts).filter(chat => chat.details[APP.extensionFieldModule] && chat.details[APP.extensionFieldModule].toLowerCase().includes(value.toLowerCase())) : value == "" ? Object.values(APP.contacts) : '';
            Object.values(filteredChats).forEach(chat => {
                APP.addContactList(chat.id);
            });
        });

        document.addEventListener('click', (e) => {
            APP.outerClickFunctions(e);
        });

    },
    outerClickFunctions: function(e) {

        let thisElement, thisElement2, thisElement3 = "";

        if($(e.target).hasClass('chatUser-avatar')) {
            $(".dropdownOuter").css({transform: "scale(1)", top: $(e.target).parent().position().top+$(e.target).parent().height()+2, left: $(e.target).parent().position().left+$(e.target).parent().width()-37});
        }
        else {
            $(".dropdownOuter").css({transform: "scale(0)"});
        }

        thisElement = $(".message-text-to-react-icon");
        if(thisElement.is(e.target) || thisElement.has(e.target).length != 0) {
            $(".reactionPoupButton").css({transform: "scale(1)"});
            $(e.target).parent().parent().parent().parent().addClass("reactionOpened");
            $(".reactionPoupButton .reactionButtonImg").attr("msgid", $(e.target).attr("msgid"));
            APP.positionNotificationBox(e.clientX + $(e.target).width()-e.offsetX, e.clientY + $(e.target).height()-e.layerY);
        }
        else {
            $(".reactionPoupButton").css({transform: "scale(0)"});
        }

        // template
        if(e.target.closest('#templates-btn')) {
            $("#templates-list-outer").toggle();
        }        
        else if(e.target.closest('.template-item')) {
            $("#templates-list-outer").hide();
        }
        else if(e.target.closest('#templates-list-outer')) {
            $("#templates-list-outer").show();
        }
        else {
            $("#templates-list-outer").hide();
        }

        // emoji
        if(e.target.closest('#emoji-btn')) {
            $("#emoji-picker").toggle();
        }
        else if(e.target.closest('#emoji-picker')) {
            $("#emoji-picker").show();
        }
        else {
            $("#emoji-picker").hide();
        }
        // emoji click
        if(e.target.closest('.singleEmoji')) {
            APP.emojiAddFunction(e.target.closest('.singleEmoji'));
        }

        // record details
        if(e.target.closest('#recordDetailsSelectOption')) {
            $("#contact-details").show();
        }
        if(e.target.closest('#recordDetailsCloseButton')) {
            $("#contact-details").hide();
        }

        if(e.target.closest('#leadSelectOption')) {
            $(".rowOptionsButtonSelected").removeClass("rowOptionsButtonSelected");
            $("#leadSelectOption").addClass("rowOptionsButtonSelected");
            APP.contactDetailsSetup("Leads");
        }
        if(e.target.closest('#contactSelectOption')) {
            $(".rowOptionsButtonSelected").removeClass("rowOptionsButtonSelected");
            $("#contactSelectOption").addClass("rowOptionsButtonSelected");
            APP.contactDetailsSetup("Contacts");
        }
        if(e.target.closest('#contactCreateSelectOption')) {
            APP.contactToDealCreateConfirmation(APP.contactRecord);
        }
        if(e.target.closest('#leadCreateSelectOption')) {
            APP.leadToContactCreateConfirmation(APP.contactRecord);
        }

        if($(e.target).attr('id') == "dealMapConfirmCondainer") {
            $("#dealMapConfirmCondainer").remove();
            return;
        }

        if(e.target.closest('.recordFieldEditOuter')) {
            let thisEditElement = e.target.closest('.recordFieldEditOuter');
            APP.closeEditPopup();
            this.parentNode.insertAdjacentHTML('afterend', editPopupDiv);
            let editPopupId = document.querySelector('#setDataPopupDiv');
            editPopupId.style.padding = "0 0 30px 0px";
            let editPopupOuter = document.querySelector('.setDataPopupOuter');
            editPopupOuter.style.padding = "20px 20px 18px 20px";
            document.querySelector(".setDataPopupButtonSave").setAttribute("action-id", "name");
    
            document.querySelector('.setDataPopupInputText').style.display = "block";
            document.querySelector('.setDataPopupTextAreaText').style.display = "none";
            document.querySelector('.setDataPopupInputColor').style.display = "none";
    
            document.querySelector('.setDataPopupInputText').setAttribute("placeholder", document.querySelector('.simpleNoteHeadText').innerText);
            document.querySelector('.setDataPopupInputText').setAttribute("value", document.querySelector('.simpleNoteHeadText').innerText);
            
            document.querySelector('.setDataPopupInputText').focus();
            document.querySelector('.setDataPopupInputText').setSelectionRange(document.querySelector('.setDataPopupInputText').value.length, document.querySelector('.setDataPopupInputText').value.length);
    
            this.style.display = 'none';
        }

        thisElement = $("#filterMode-all");
        if(thisElement.is(e.target) || thisElement.has(e.target).length != 0) {
            APP.filterModeChangeAction(e.target.closest('.rowOptionsButton'));
        }

        thisElement = $("#filterMode-yours");
        if(thisElement.is(e.target) || thisElement.has(e.target).length != 0) {
            APP.filterModeChangeAction(e.target.closest('.rowOptionsButton'));
        }

        thisElement = $("#filterMode-inactive");
        if(thisElement.is(e.target) || thisElement.has(e.target).length != 0) {
            APP.filterModeChangeAction(e.target.closest('.rowOptionsButton'));
        }

        thisElement = $("#filterMode-modules");
        thisElement2 = $("#filterModuleList");
        if(thisElement.is(e.target) || thisElement.has(e.target).length != 0 || thisElement2.is(e.target) || thisElement2.has(e.target).length != 0) {
            APP.filterModeChangeAction(e.target.closest('.rowOptionsButton'));
        }

        // templates crm contacts fields popup


    },
    loader: function(elementId) {
        if(!$(".loaderStyle").length) {
            let loaderStyle = `<style class="loaderStyle">/* message loading style */ .enLoadingInner { margin: 0 auto; background-color: #fff; border-radius: 50%; box-shadow: 0 1px 1px 0 rgba(0,0,0,.06),0 2px 5px 0 rgba(0,0,0,.2); display: flex; align-items: center; justify-content: center; width: 35px; height: 35px; } .enLoadingOuter { display: flex; flex: none; justify-content: center; padding: 15px 0px; box-sizing: border-box; } .enLoadingSvgCircle { stroke: #ccc; stroke-dasharray: 1,150; stroke-dashoffset: 0; stroke-linecap: round; animation: enLoadingSvgCircle 1.5s ease-in-out infinite; } .enLoadingSVG { animation: enLoadingSVG 2s linear infinite; } @keyframes enLoadingSVG{ to{transform:rotate(1turn)} } @keyframes enLoadingSvgCircle{ 0%{stroke-dasharray:1,150;stroke-dashoffset:0} 50%{stroke-dasharray:90,150;stroke-dashoffset:-35} to{stroke-dasharray:90,150;stroke-dashoffset:-124} } /* message loading style */</style>`;
            $("body").append(loaderStyle);
        }
        return `<div id="${elementId}" class="enContent" style="height: 100%; background-color: white;color: black; overflow: hidden;  line-height: initial; resize: none; display: flex; align-items: center; justify-content: center; flex-direction: column; font-size: inherit; font-weight: inherit; word-break: break-word; word-wrap: break-word; box-sizing: border-box;   width: 100%; padding: 0; cursor: default;   font-family: sans-serif;      z-index: 10000000; position: absolute; left: 0;  top: 0;      max-width: 100%; min-width: 0; text-align: left; white-space: normal;     "><div style="display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%; height: 100%;   max-width: 100%; min-width: 0; overflow: hidden; word-break: break-word; word-wrap: break-word; white-space: normal; text-align: left;    " class="content"><div class="enLoadingInner" title="loading…"><svg class="enLoadingSVG" width="17" height="17" viewBox="0 0 46 46" role="status"><circle class="enLoadingSvgCircle" cx="23" cy="23" r="20" fill="none" stroke-width="6" style="stroke: rgb(57 82 234);"></circle></svg></div></div></div>`;
    },
    getRecordFunction: async function(module, recordId) {
        return await ZOHO.CRM.API.getRecord({Entity:module,RecordID:recordId}).then(async function(resp){
            return resp.data[0];
        });
    },
    getFieldsFunction: async function(module) {
        return await ZOHO.CRM.META.getFields({"Entity":module}).then(function(data){
            return data.fields;
        });
    },
    currentUserSet: async function() {
        return await await ZOHO.CRM.CONFIG.getCurrentUser().then(function(data){
            return data.users[0];
        });
    },
    allUsersGet: async function() {
        return await ZOHO.CRM.API.getAllUsers({Type:"AllUsers"}).then(async function(data){
            let allUsers = {};
            await data.users.forEach(function(user) {
                if(user.status == "active") {
                    allUsers[user.id] = user;
                }
            });
            return allUsers;
        });
    },
    allUsersGetSet: async function() {
        let assignUserElements = "";
        await Object.values(APP.allUsers).forEach(function(user) {
            assignUserElements += `<div class="dropdownList" userid="${user.id}">
                                        <div class="dropdownListIcon">
                                            <div class="dropdownListIconSize">
                                                <img src="${user.image_link}">
                                            </div>
                                        </div>
                                        <div class="dropdownListText">${user.full_name}</div>
                                    </div>`;
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
    },
    getZapikey: async function() {
        return await ZOHO.CRM.CONNECTOR.invokeAPI("crm.zapikey", {"nameSpace":"<portal_name.extension_namespace>"}).then(function(resp) {
            return JSON.parse(resp).response;
        });
    },
    dealStageListSet: async function() {
        let dealFieldsList = await APP.getFieldsFunction("Deals");
        let Stage = "";
        await dealFieldsList.forEach(function(field) {
            if(field.api_name == "Stage") {
                field.pick_list_values.forEach(function(stage) {
                    Stage += `<option value="${stage.display_value}">${stage.display_value}</option>`;
                });
            }
        });
        return `<select id="map_Stage">${Stage}</select>`;
    },
    popupResize: async function() {
        return await ZOHO.CRM.UI.Resize({height:"600",width:"1000"}).then(function(data){
            return data;
        });
    },
    inboxChatSetup: async function() {

        APP.body = document.body;
        APP.initialChatDiv = document.querySelector(".initialChatDiv");

        APP.loaderElement = document.createElement('div');
        APP.loaderElement.innerHTML = APP.loader("loader");

        APP.body.appendChild(APP.loaderElement);

        APP.contactList = document.getElementById('chat-list');
        APP.chatLoader = APP.loader("contactloader");
        
        APP.filterModes = {};
        APP.filterModeTypes = ["all", "yours", "leads", "contacts", "inActive", "users", "single", "bulk"];

        APP.filterModeTypes.forEach(function(mode) {
            APP.filterModes[mode] = {
                currentPage: 1,
                pageCompleted: false,
                contacts: []
            };
        });

        APP.contactList.addEventListener('scroll', function() {
            if(APP.isContactLoading) return;
            let scrollTop = APP.contactList.scrollTop;
            let scrollHeight = APP.contactList.scrollHeight;
            let clientHeight = APP.contactList.clientHeight;
            if(scrollTop + clientHeight >= scrollHeight - 100) {
                APP.loadContacts();
            }
        });

        APP.messagesContainer = document.getElementById('messages-container');
        APP.messagesContainer.addEventListener('scroll', function() {
            APP.updateStickyDateLabel();
            if(APP.isMessageLoading) return;
            let scrollTop = APP.messagesContainer.scrollTop;
            let scrollHeight = APP.messagesContainer.scrollHeight;
            let clientHeight = APP.messagesContainer.clientHeight;
            if(scrollTop <= 100) {
                APP.loadMessages(APP.currentContactId);
            }
        });

        if(APP.module && APP.recordId) {
            await APP.popupResize();
            $(".contact-details").remove();
            $(".search-container").remove();
            $(".filter-container").remove();
            $(".accountPage").remove();
            APP.selectedModule = APP.module;
            APP.selectedRecord = await APP.getRecordFunction(APP.module, APP.recordId);
            APP.selectedRecordFields = await APP.getFieldsFunction(APP.module);
            APP.filterMode = "single";
        }
        else {
            APP.filterMode = "all";
        }

        APP.currentUser = await APP.currentUserSet();
        // document.getElementById("profile-pic").setAttribute("src", APP.currentUser.image_link);
        APP.selectedUser = APP.currentUser;

        APP.allUsers = await APP.allUsersGet();
        await APP.allUsersGetSet();

        APP.dealStagesList = await APP.dealStageListSet();

        APP.reactionElementOpen();

        APP.isContactLoading = false;
        APP.contactsPerPage = 200;
        await APP.loadContacts();

        await APP.firebaseSetup();
        await APP.realtimeListener();
        await APP.startListenerForCRMFieldsPlaceholder();

        $(APP.loaderElement).remove();
        
    },
    filterModeChangeAction: function(thisSelected, dropdwonChangeAccess=false) {
        if(!dropdwonChangeAccess && thisSelected.getAttribute("class").includes("selected")) {
            return;
        }
        $(".filter-container .rowOptionsButton.selected").removeClass("selected");
        thisSelected.setAttribute("class", "rowOptionsButton selected");
        if(thisSelected.getAttribute("id") == "filterMode-yours") {
            APP.filterMode = "yours";
        }
        else if(thisSelected.getAttribute("id") == "filterMode-inactive") {
            APP.filterMode = "inActive";
        }
        else if(thisSelected.getAttribute("id") == "filterMode-modules") {
            document.getElementById('filterModuleList').focus();
            document.getElementById('filterModuleList').click();
            if(APP.filterMode == "all" && $("#filterModuleList").val() == "") {
                return;
            }
            else if($("#filterModuleList").val() == "Lead") {
                APP.filterMode = "leads";
            }
            else if($("#filterModuleList").val() == "Contact") {
                APP.filterMode = "contacts";
            }
            else {
                APP.filterMode = "all";
            }
        }
        else {
            APP.filterMode = "all";
        }
        APP.contactList.innerHTML = "";
        APP.filterModes[APP.filterMode].contacts.forEach(async contactId => {
            await APP.addContactList(contactId, "loaded");
        });
        if(APP.filterModes[APP.filterMode].contacts.length < APP.contactsPerPage+1) {
            APP.loadContacts();
        }
    },
    loadContacts: async function() {
        if(APP.filterModes[APP.filterMode].pageCompleted) {
            return;
        }
        APP.isContactLoading = true;
        $("#chat-list").append(APP.loader("contactloader"));
        APP.contactListloader = document.getElementById('contactloader');
        setTimeout(async function() {
            await APP.getContacts(APP.filterModes[APP.filterMode].currentPage);
            APP.filterModes[APP.filterMode].currentPage++;
            APP.isContactLoading = false;
            APP.contactListloader.remove();
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
        else if(APP.filterMode == "single") {
            let selectedNumbers = {};
            let searchQuery = "";
            if(APP.selectedRecord && APP.selectedRecordFields){
                APP.selectedRecordFields.forEach(async function(field) {
                    if(field.data_type == "phone" && APP.selectedRecord[field.api_name]) {
                        let phoneValue = APP.selectedRecord[field.api_name].replace(/[( )+]/g, '');
                        let selectedNumberDetails = {};
                        selectedNumberDetails[APP.extensionFieldWhatsAppNumber] = phoneValue;
                        selectedNumbers[phoneValue] = selectedNumberDetails;
                        searchQuery += `or(${APP.extensionFieldWhatsAppNumber}:equals:${phoneValue})`;
                    }
                });
            }
            if(searchQuery) {
                searchQuery = searchQuery.slice(2);
                return await ZOHO.CRM.API.searchRecord({Entity:APP.extensionContacts,Type:"criteria",Query:`(${searchQuery})`}).then(async function(data) {
                    if(data.data) {
                        data.data.forEach(function(selectedRecord) {
                            if(selectedRecord[APP.extensionFieldWhatsAppNumber]) {
                                selectedNumbers[selectedRecord[APP.extensionFieldWhatsAppNumber]] = selectedRecord;
                            }
                        });
                    }
                    return await APP.getContactsResponse({info: data.info, data: Object.values(selectedNumbers)});
                });
            }
            else {
                return await APP.getContactsResponse({info: { more_records: false }, data: Object.values(selectedNumbers)});
            }
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
        if(data && data.data) {
            let loadedContactsCount = data.data.length;
            let loadedContacts = [];
            data.data.forEach(async (contact) => {
                let contactId = contact[APP.extensionFieldWhatsAppNumber];
                if(!APP.contacts[contactId]) {
                    APP.contacts[contactId] = {
                        id: contactId,
                        unread: 0,
                        details: contact,
                        notifications: {},
                        messages: {},
                        pageCompleted: false,
                        currentPage: 1
                    };
                }
                else {
                    APP.contacts[contactId].details = contact;
                }
                if(APP.contacts[contactId].details && APP.contacts[contactId].details[APP.extensionFieldLastMessage] && APP.contacts[contactId].details[APP.extensionFieldLastMessage].id) {
                    APP.contacts[contactId].details[APP.extensionFieldLastMessage] = await APP.getRecordFunction(APP.extensionHistory, APP.contacts[contactId].details[APP.extensionFieldLastMessage].id);
                }
                else {
                    APP.contacts[contactId].details[APP.extensionFieldLastMessage] = {};
                }
                if(!APP.filterModes[APP.filterMode].contacts.includes(contactId)) {
                    let currentTime = new Date();
                    let oneWeekAgo = currentTime.setDate(currentTime.getDate() - 7);
                    let contactLastActivityTime = APP.contacts[contactId].details[APP.extensionFieldActiveTime] ? APP.contacts[contactId].details[APP.extensionFieldActiveTime] : "";
                    if(APP.filterMode != "inActive" || new Date(contactLastActivityTime) < oneWeekAgo) {
                        APP.filterModes[APP.filterMode].contacts.push(contactId);
                        loadedContacts.push(APP.contacts[contactId]);
                    }
                }
                loadedContactsCount -= 1;
                if(!loadedContactsCount) {
                    // sorted = Object.fromEntries(Object.entries(k).sort(([, a], [, b]) => a.text - b.text));
                    loadedContacts.sort((a, b) => new Date(b.details[APP.extensionFieldActiveTime]) - new Date(a.details[APP.extensionFieldActiveTime]));
                    loadedContacts.forEach(async function(contact) {  // contact active, his, timestamp
                        await APP.addContactList(contact.id, "loaded");
                    });
                }
            });
        }
    },
    addContactList: async function(contactId, type) {

        let contact = APP.contacts[contactId];
        let lastMessage = contact.details && contact.details[APP.extensionFieldLastMessage] && contact.details[APP.extensionFieldLastMessage] ? contact.details[APP.extensionFieldLastMessage] : {};
        let img = contact.details && contact.details.avatar ? contact.details.avatar : "person.png";
        let ownerImg = contact.details && contact.details.Owner && contact.details.Owner.id && APP.allUsers[contact.details.Owner.id].image_link ? APP.allUsers[contact.details.Owner.id].image_link : "user-thumbnail.png";
        let name = contact.details && contact.details.Name ? contact.details.Name : contactId;
        let time = lastMessage && lastMessage[APP.extensionFieldTimestamp] ? APP.formatWhatsAppTime(lastMessage[APP.extensionFieldTimestamp]) : 'New';
        let user = lastMessage && lastMessage[APP.extensionFieldDirection] && lastMessage[APP.extensionFieldDirection] == "incoming" ? '' : contact.details && contact.details.Owner && contact.details.Owner.name && APP.currentUser.id != contact.details.Owner.id ? contact.details.Owner.name : 'You';
        let status = lastMessage && lastMessage[APP.extensionFieldDirection] && lastMessage[APP.extensionFieldDirection] == "incoming" ? '' : lastMessage && lastMessage[APP.extensionFieldStatus] ? lastMessage[APP.extensionFieldStatus] == "sent" ? APP.sentStatus : lastMessage[APP.extensionFieldStatus] == "delivered" ? APP.deliveredStatus : lastMessage[APP.extensionFieldStatus] == "read" ? APP.readStatus : APP.addedStatus : APP.addedStatus;          
        let message = lastMessage && lastMessage[APP.extensionFieldMessage] ? lastMessage[APP.extensionFieldMessage] : 'Start Coversation';
        let encodeMessage = lastMessage && lastMessage[APP.extensionFieldEncodeMessage] ? lastMessage[APP.extensionFieldEncodeMessage] : message;
        message = decodeURIComponent(decodeURIComponent(encodeMessage));

        let statusElement = status && message != 'Start Coversation' ? `<div class="contactListContntBodyStatus"><span class="contactListContntBodyStatusIcon">${status}</span></div>` : '';
        let userElement = user && message != 'Start Coversation' ? `<div class="contactListContntBodySender"><div class="contactListContntBodySenderIn"><span class="contactListContntBodySenderName">${user}</span><span>:&nbsp;</span></div></div>` : '';
        let messageElement = `${statusElement} ${userElement} <span class="contactListContntBodyContent">${message}</span>`;

        let module = contact.details && contact.details && contact.details[APP.extensionFieldModule] ? contact.details[APP.extensionFieldModule] : "";
        let contantListElement = `<div class="contactList">
                <div class="contactListIn contactItem ${contactId === APP.currentContactId ? 'active' : ''}" data-id="${contactId}" id="contactid-${contactId}">
                    <div class="contactSelectionBox">
                        <input type="checkbox" class="contact-checkbox" ${APP.selectedContacts.includes(contactId)? "checked": "" } data-id="${contactId}" onclick="APP.handleOnContactSelectionOnChange('${contactId}', this.checked)">
                    </div>
                    <div class="contactListImgOut">
                        <div class="contactListImgIn">
                            <div class="contactListImgMain">
                                <div class="contactListImgMain">
                                <svg viewBox="0 0 48 48" height="212" width="212" preserveAspectRatio="xMidYMid meet" class="contactListImgMainSVG" fill="none"><title>default-contact-refreshed</title><path d="M24 23q-1.857 0-3.178-1.322Q19.5 20.357 19.5 18.5t1.322-3.178T24 14t3.178 1.322Q28.5 16.643 28.5 18.5t-1.322 3.178T24 23m-6.75 10q-.928 0-1.59-.66-.66-.662-.66-1.59v-.9q0-.956.492-1.758A3.3 3.3 0 0 1 16.8 26.87a16.7 16.7 0 0 1 3.544-1.308q1.8-.435 3.656-.436 1.856 0 3.656.436T31.2 26.87q.816.422 1.308 1.223T33 29.85v.9q0 .928-.66 1.59-.662.66-1.59.66z" fill="#606263" class="x1d6ck0k"></path></svg>
                                <div class="contactListOwnerImg">
                                    <span class="contactListOwnerImgSpan">
                                        <img src="${ownerImg}" alt="${''}" class="chat-avatar chatUser-avatar">
                                    </span>
                                </div>
                                
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="contactListContntOut">
                        <div class="contactListContntHead">
                            <div class="contactListContntHeadName">
                                <span title="${name}" class="contactListContntHeadNameText">${name}</span>
                                ${APP.contactModuleIconChoose(module)}
                            </div>
                            <div class="contactListContntHeadTime">${time}</div>
                        </div>
                        <div class="contactListContntBodyOut">
                            <div class="contactListContntBodyIn">
                                <span class="contactListContntBody" title="${message}">
                                    ${messageElement}
                                </span>
                            </div>
                            <div class="contactListContntMore">
                                ${contact.unread > 0 ? `<div class="unread-count">${contact.unread}</div>` : ''}
                                <span class=""></span><span class=""></span><span class=""></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        if($("#contactid-"+contactId).length && contact.details[APP.extensionFieldActiveTime]) {
            $("#contactid-"+contactId).parent().parent().html(contantListElement);
        }
        else if(!$("#contactid-"+contactId).length) {
            let contactElement = document.createElement('div');
            contactElement.className = `chat-item`;
            contactElement.dataset.id = contactId;
            contactElement.innerHTML = contantListElement;
            APP.contactList.appendChild(contactElement);
        }
        if(type != "loaded") {
            APP.moveContactToTop(contactId);
        }
    },
    contactModuleIconChoose: function(module) {
        return module && module == 'Lead' ? `<span class="contactListContntModule contactListContntModuleLead">${APP.svg.lead}</span>` : module && module == 'Contact' ? `<span class="contactListContntModule contactListContntModuleContact">${APP.svg.contact}</span>` : '';
    },
    histroryMap: function(contactId, messageId) {

        let message = APP.contacts[contactId].messages[messageId];
        
        let historyRecordData = {};
        historyRecordData[APP.extensionFieldId] = message[APP.extensionFieldId] ? message[APP.extensionFieldId] : "";
        historyRecordData[APP.extensionFieldName] = message[APP.extensionFieldName] ? message[APP.extensionFieldName] : "";
        historyRecordData[APP.extensionFieldOwner] = message[APP.extensionFieldOwner] ? message[APP.extensionFieldOwner] : "";
        historyRecordData[APP.extensionFieldWhatsAppNumber] = message[APP.extensionFieldWhatsAppNumber] ? message[APP.extensionFieldWhatsAppNumber] : "";
        historyRecordData[APP.extensionFieldFrom] = message[APP.extensionFieldFrom] ? message[APP.extensionFieldFrom] : "";
        historyRecordData[APP.extensionFieldTo] = message[APP.extensionFieldTo] ? message[APP.extensionFieldTo] : "";
        historyRecordData[APP.extensionFieldMessage] = message[APP.extensionFieldMessage] ? message[APP.extensionFieldMessage] : "";
        historyRecordData[APP.extensionFieldEncodeMessage] = message[APP.extensionFieldEncodeMessage] ? message[APP.extensionFieldEncodeMessage] : "";
        historyRecordData[APP.extensionFieldTimestamp] = APP.toIsoString(new Date(message[APP.extensionFieldTimestamp] ? Number(message[APP.extensionFieldTimestamp]) : ""));
        historyRecordData[APP.extensionFieldDirection] = message[APP.extensionFieldDirection] ? message[APP.extensionFieldDirection] : "";
        historyRecordData[APP.extensionFieldStatus] = message[APP.extensionFieldStatus] ? message[APP.extensionFieldStatus] : "";
        historyRecordData[APP.extensionFieldMsgId] = message[APP.extensionFieldMsgId] ? message[APP.extensionFieldMsgId] : "";
        historyRecordData[APP.extensionFieldReactionFrom] = message[APP.extensionFieldReactionFrom] ? message[APP.extensionFieldReactionFrom] : "";
        historyRecordData[APP.extensionFieldReactionTo] = message[APP.extensionFieldReactionTo] ? message[APP.extensionFieldReactionTo] : "";
        historyRecordData[APP.extensionFieldModule] = message[APP.extensionFieldModule] ? message[APP.extensionFieldModule] : "";
        historyRecordData[APP.extensionFieldLead] = message[APP.extensionFieldLead] ? message[APP.extensionFieldLead] : "";        
        historyRecordData[APP.extensionFieldContact] = message[APP.extensionFieldContact] ? message[APP.extensionFieldContact] : "";
        historyRecordData[APP.extensionFieldReplyMessageId] = message[APP.extensionFieldReplyMessageId] ? message[APP.extensionFieldReplyMessageId] : "";

        historyRecordData = Object.entries(historyRecordData).reduce((acc, [k, v]) => v ? {...acc, [k]:v} : acc , {});
        return historyRecordData;
        
    },
    contactMap: function(contactId) {   // contactObject = Object.assign(contactObject, changeContactObjectObject);

        let contact = APP.contacts[contactId];

        let contactRecordData = {};
        contactRecordData[APP.extensionFieldId] = contact.details && contact.details[APP.extensionFieldId] ? contact.details[APP.extensionFieldId] : "";
        contactRecordData[APP.extensionFieldName] = contact.details && contact.details[APP.extensionFieldName] ? contact.details[APP.extensionFieldName] : "";
        contactRecordData[APP.extensionFieldOwner] = contact.details && contact.details[APP.extensionFieldOwner] ? contact.details[APP.extensionFieldOwner] : "";
        contactRecordData[APP.extensionFieldWhatsAppNumber] = contact.details && contact.details[APP.extensionFieldWhatsAppNumber] ? contact.details[APP.extensionFieldWhatsAppNumber] : "";
        contactRecordData[APP.extensionFieldLastMessage] = contact.details && contact.details[APP.extensionFieldLastMessage] && contact.details[APP.extensionFieldLastMessage].id ? contact.details[APP.extensionFieldLastMessage].id : "";
        contactRecordData[APP.extensionFieldActiveTime] = contact.details && contact.details[APP.extensionFieldActiveTime] ? APP.toIsoString(new Date(contact.details[APP.extensionFieldActiveTime])) : "";
        contactRecordData[APP.extensionFieldStatus] = contact.details && contact.details[APP.extensionFieldStatus] ? contact.details[APP.extensionFieldStatus] : "";
        contactRecordData[APP.extensionFieldModule] = contact.details && contact.details[APP.extensionFieldModule] ? contact.details[APP.extensionFieldModule] : "";
        contactRecordData[APP.extensionFieldLead] = contact.details && contact.details[APP.extensionFieldLead] ? contact.details[APP.extensionFieldLead] : "";        
        contactRecordData[APP.extensionFieldContact] = contact.details && contact.details[APP.extensionFieldContact] ? contact.details[APP.extensionFieldContact] : "";

        contactRecordData = Object.entries(contactRecordData).reduce((acc, [k, v]) => v ? {...acc, [k]:v} : acc , {});
        return contactRecordData;
        
    },
    contactListClickFunction: async function(e) {

        if($(e.target).hasClass('contact-checkbox')) {           
            return;
        }

        let contactElement = e.target.closest('.contactItem');
        APP.resetMessageInputContainer();
        if(APP.isBulk) {
            if(contactElement && contactElement.querySelector(".contact-checkbox")) {
                let checkbox = contactElement.querySelector(".contact-checkbox");
                checkbox.checked = !checkbox.checked;
                APP.handleOnContactSelectionOnChange(contactElement.dataset.id, checkbox.checked);
            }
            return;
        }
        if(contactElement && APP.currentContactId != contactElement.dataset.id) {
            
            if(APP.initialChatDiv) APP.initialChatDiv.remove();
            $(".contactItem.active").removeClass("active");
            contactElement.setAttribute("class", "contactListIn contactItem active");

            APP.currentContactId = contactElement.dataset.id;
            let contactId = APP.currentContactId;
            if(!APP.contacts[contactId].initied) {
                if(APP.contacts[contactId].details[APP.extensionFieldContact]) {
                    APP.contacts[contactId].details[APP.extensionFieldModule] = "Contact";
                }
                else if(APP.contacts[contactId].details[APP.extensionFieldLead]) {
                    APP.contacts[contactId].details[APP.extensionFieldModule] = "Lead";
                }
                else {
                    await ZOHO.CRM.API.searchRecord({Entity: "Contacts", Type:"phone",Query: contactId, delay:false}).then( async function(data){
                        if(!data || !data.data) {
                            await ZOHO.CRM.API.searchRecord({Entity: "Leads", Type:"phone",Query: contactId, delay:false}).then(async function(resp){
                                if(!resp || !resp.data) {
                                    let lastname = APP.contacts[contactId].details[APP.extensionFieldName] != contactId ? APP.contacts[contactId].details[APP.extensionFieldName] : contactId;
                                    await ZOHO.CRM.API.insertRecord({Entity: "Leads",APIData:{Last_Name: lastname, Phone: contactId},Trigger:["workflow"]}).then(function(response){
                                        APP.contacts[contactId].details[APP.extensionFieldName] = lastname;
                                        APP.contacts[contactId].details[APP.extensionFieldModule] = "Lead";
                                        APP.contacts[contactId].details[APP.extensionFieldLead] = response.data[0].details.id;
                                    });
                                }
                                else {
                                    APP.contacts[contactId].details[APP.extensionFieldName] = resp.data[0].Full_Name;
                                    APP.contacts[contactId].details[APP.extensionFieldModule] = "Lead";
                                    APP.contacts[contactId].details[APP.extensionFieldLead] = resp.data[0].id;
                                }
                            });
                        }
                        else {
                            APP.contacts[contactId].details[APP.extensionFieldName] = data.data[0].Full_Name;
                            APP.contacts[contactId].details[APP.extensionFieldModule] = "Contact";
                            APP.contacts[contactId].details[APP.extensionFieldContact] = data.data[0].id;
                        }
                    });
                }
                APP.contacts[contactId].initied = true;
                await APP.contactAction(contactId);
            }
            APP.selectedModule = APP.contacts[contactId].details[APP.extensionFieldModule]+"s";
            await APP.contactDetailsSetup(contactId);

            APP.isMessageLoading = false;
            APP.messagesPerPage = 200;
            APP.lastMessageDirection = "";

            if(contactElement.querySelector(".unread-count")) {
                contactElement.querySelector(".unread-count").remove();
            }

            APP.contacts[contactId].unread = 0;

            let messagesContainer = document.getElementById('messages-container');
            messagesContainer.innerHTML = "";

            if(Object.keys(APP.contacts[contactId].messages).length) {
                let sortingContacts = Object.values(APP.contacts[contactId].messages).sort((a, b) => new Date(b[APP.extensionFieldTimestamp]) - new Date(a[APP.extensionFieldTimestamp]));
                sortingContacts.forEach(async message => {
                    await APP.addMessage(message[APP.extensionFieldMsgId], contactId, "loaded");
                });
            }
            if(Object.keys(APP.contacts[contactId].messages).length < APP.messagesPerPage+1) {
                await APP.loadMessages(contactId);
            }
            APP.currentChatUnreadNotification();
            $("#message-input").focus();
        }
    },
    
    contactHeaderSetup: function(contactId) {
        let contact = APP.contacts[contactId];
        if (!contact) return;

        let urlParams = new URLSearchParams(window.location.search);
        let serviceOrigin = urlParams.get('serviceOrigin');
        let recordId = contact.details[APP.extensionFieldModule] == "Contact" && contact.details[APP.extensionFieldContact] ? contact.details[APP.extensionFieldContact].id : contact.details[APP.extensionFieldLead] ? contact.details[APP.extensionFieldLead].id : "";
        let recordLink = serviceOrigin+"/crm/tab/"+contact.details[APP.extensionFieldModule]+"s/"+ recordId;
        let contactHeaderInfo = document.querySelector('#chat-header .chat-header-info');
        contactHeaderInfo.innerHTML = `<div class="chat-header-info-head">
                                            <img src="${contact.avatar ? contact.avatar: 'person.png'}" alt="${contactId}" class="profile-pic">
                                            <div class="chat-header-name">
                                                <span class="chat-header-nameText">
                                                    <span class="chat-header-nameTextDiv">${contact.details.Name ? contact.details.Name : contactId}</span>
                                                    <span class="chat-header-nameTextOpen ${contact.details[APP.extensionFieldModule] == "Contact" ? 'chat-header-nameTextOpen-contact': 'chat-header-nameTextOpen-lead'}" onclick="window.open('${recordLink}', '_blank');">${contact.details[APP.extensionFieldModule]} ${APP.svg.opentab}</span>
                                                </span>
                                                <span class="chat-header-nameId">+${contactId}</span>
                                            </div>
                                        </div>
                                        <div class="chat-header-info-body">
                                            <div class="rowOptions" id="createModuleSelectOption">
                                                ${contact.details[APP.extensionFieldModule] == "Contact" ? `
                                                    <button class="rowOptionsButton" id="contactCreateSelectOption">
                                                        <div class="rowOptionsButtonIn">
                                                            <span>Create Deal</span>
                                                        </div>
                                                    </button>` : ''}
                                                ${contact.details[APP.extensionFieldModule] == "Lead" ? `
                                                    <button class="rowOptionsButton" id="leadCreateSelectOption">
                                                        <div class="rowOptionsButtonIn">
                                                            <span>Create Contact</span>
                                                        </div>
                                                    </button>` : ''}
                                                <div id="recordDetailsSelectOption">
                                                    <svg width="24" viewBox="0 96 960 960" height="24" xmlns="http://www.w3.org/2000/svg" style="position: absolute;top: 9px;left: 9px;width: 20px;height: 20px;background-color: #77848d;border-radius: 4px;transform: skew(10deg, 0deg);z-index: 0;"> <path d="M0 0h22v22H0z" sandboxuid="0" style=" fill: red; stroke: red; "></path></svg>
                                                    <svg class="simpleNoteIconToIframeOpenSvg" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" style="z-index: 1;"><path d="M720 843q26 0 43.5-17.5T781 782q0-26-17.5-43.5T720 721q-26 0-43.5 17.5T659 782q0 26 17.5 43.5T720 843Zm0 122q31 0 57.5-14t43.5-40q-23-13-49-20t-52-7q-26 0-52 7t-49 20q17 26 43.5 40t57.5 14Zm0 106q-95 0-161.5-66.5T492 843q0-95 66.5-161.5T720 615q95 0 161.5 66.5T948 843q0 95-66.5 161.5T720 1071ZM317 462h326q22 0 37.5-15.5T696 409q0-22-15.5-37.5T643 356H317q-22 0-37.5 15.5T264 409q0 22 15.5 37.5T317 462Zm121 507H194q-45 0-75.5-30.5T88 863V293q0-45 30.5-75.5T194 187h572q45 0 75.5 30.5T872 293v283q-34-20-73.5-30.5T720 535h-12q-6 0-12 1-10-7-25-9t-28-2H317q-22 0-37.5 15.5T264 578q0 22 15.5 37.5T317 631h179q-14 14-25 30t-21 33H317q-22 0-37.5 15.5T264 747q0 22 15.5 37.5T317 800h98q-2 11-2.5 21.5T412 843q0 33 6 64.5t20 61.5Z"></path></svg>
                                                    <svg viewBox="0 0 30 30" height="10" class="simpleNoteIconToIframeDir" x="0px" y="0px" style=" position: absolute; width: 10px; top: 6px; right: 3px; transition: 0.2s;transform: scale(0);transform-origin: left;background-color: transparent;"><path fill="#a2acb2" d="M11,21.212L17.35,15L11,8.65l1.932-1.932L21.215,15l-8.282,8.282L11,21.212z" style=" "></path></svg>
                                                </div>
                                            </div>
                                        </div>`;
        $("#contactid-"+contactId+" .contactListContntHeadName").html(`<span title="${contact.details.Name}" class="contactListContntHeadNameText">${contact.details.Name}</span>${APP.contactModuleIconChoose(contact.details[APP.extensionFieldModule])}`);
    },
    contactDetailsSetup: async function(contactId) {
        let contact = APP.contacts[contactId];
        $(".contact-info").html(APP.loader);
        let contactFieldList = ["First_Name", "Last_Name", "Account_Name", "Email", "Phone", "Mobile", "Secondary_Email", "Description", "Lead_Source", "Assistant", "Asst_Phone", "Home_Phone", "Other_Phone", "Created_Time", "Full_Name"];
        let leadFieldList = ["First_Name", "Last_Name", "Company", "Email", "Phone", "Mobile", "Description", "Website", "Lead_Status", "Lead_Source", "Created_Time", "Full_Name"];
        let fieldArr = contact.details[APP.extensionFieldModule] == "Leads" ? leadFieldList : contactFieldList;
        APP.contactFieldsForPlaceHolders = fieldArr;
        await ZOHO.CRM.API.searchRecord({Entity: contact.details[APP.extensionFieldModule]+"s",Type:"phone",Query: contactId.replaceAll(" ", ""),delay:false}).then(async function(data){
            if(!data || !data.data) {
                $(".contact-info").html("");
                await APP.contactHeaderSetup(contactId);
                return;
            }
            APP.selectedRecord = data.data[0];
            await APP.contactHeaderSetup(contactId);

            let fieldFlowElement = "";
            fieldArr.forEach(function(field) {
                let fieldValue = field == "Created_Time" && APP.selectedRecord[field] ? new Date(APP.selectedRecord[field]).toDateString() : field == "Account_Name" && APP.selectedRecord[field] && APP.selectedRecord[field].name ? APP.selectedRecord[field].name : APP.selectedRecord[field] ? APP.selectedRecord[field] : "";
                if(fieldValue) {
                    fieldFlowElement += `<div class="field-row">
                                            <div class="field-label">
                                                <div>${field.replaceAll('_', ' ')}</div>
                                                <div class="recordFieldEditOuter" data-record-id="${APP.selectedRecord.id}" data-field-api="${field}" onclick="APP.editPopupDiv(event);">
                                                    <div class="recordFieldEdit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="m20.41 4.94-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path></svg>
                                                        <span class="recordFieldEditText">edit</span>
                                                    </div>
                                                </div>
                                            </div>
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
                                                <h1 class="record-name">${APP.selectedRecord["Full_Name"]}</h1>
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
                                            <h2 class="section-title">${contact.details[APP.extensionFieldModule]} Information</h2>
                                            ${fieldFlowElement}
                                            </div>
                                        </div>
                                        </div>`;
            $(".contact-info").html(recordDetailsViewElement);
        });
    },
    function(e) {
        APP.editPopupDiv = `<div class="setDataPopupMainOuter" id="setDataPopupDiv">
                                <div class="setDataPopupOuter">
                                    <style>
                                    .setDataPopupMainOuter {
                                        box-sizing: border-box;
                                        position: relative;
                                    }
                                    .setDataPopupMainOuter.setDataPopupNumberOuter {
                                        box-sizing: border-box;
                                        position: relative;
                                        position: fixed;
                                        width: 100%;
                                        height: 100%;
                                        top: 0;
                                        left: 0;
                                        background-color: #ffffffc2;
                                        display: flex;
                                        z-index: 100;
                                        align-items: center;
                                        justify-content: center;
                                    }
                                    .setDataPopupOuter {
                                        background-color: #fff;
                                        border-radius: 8px;
                                        box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%), 0px 2px 6px 2px rgb(60 64 67 / 15%);
                                        color: #000000de;
                                        overflow: auto;
                                        position: relative;
                                        z-index: 40;
                                        border: rgba(0,0,0,0);
                                        outline: 2px solid rgba(0,0,0,0);
                                        padding: 24px 32px;
                                        width: 100%;
                                        box-sizing: border-box;
                                    }
                                    .setDataPopupOuter.setNumberPopupOuter {
                                        width: 30%;
                                        min-width: 200px;
                                    }
                                    .setDataPopupFormInputs {
                                        padding-bottom: 20px;
                                        display: block;
                                        position: relative;
                                    }
                                    .setDataPopupForm {
                                        font-family: 'Roboto';
                                    }

                                    /* Chrome, Safari, Edge, Opera */
                                input[type=number]::-webkit-outer-spin-button,
                                input[type=number]::-webkit-inner-spin-button {
                                -webkit-appearance: none;
                                margin: 0;
                                }

                                /* Firefox */
                                input[type=number] {
                                -moz-appearance: textfield;
                                }

                                label.setDataPopupInputLabel {
                                color: #0000008c;
                                display: block;
                                font-size: 13px;
                                padding-bottom: 8px;
                                user-select: none;
                                }

                                input.setDataPopupInputText, textarea.setDataPopupTextAreaText {
                                font-family: "SF Pro Text", "SF Pro Icons", system, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", "Ubuntu", "Cantarell", "Fira Sans", sans-serif;
                                border: transparent;
                                outline: 2px solid transparent;
                                background: #fff;
                                border: 0;
                                border-radius: 4px;
                                box-sizing: border-box;
                                color: #000000de;
                                font-size: 16px;
                                font-weight: 400;
                                line-height: 20px;
                                margin: 0;
                                max-width: 100%;
                                padding: 8px 12px;
                                -webkit-transition: box-shadow .15s;
                                transition: box-shadow .15s;
                                vertical-align: middle;
                                -webkit-appearance: none;
                                box-shadow: 0 0 0 2px transparent inset, 0 0 0 1px #0000001f inset;
                                width: 390px;
                                max-height: 36px;
                                width: 100%;
                                }

                                input.setDataPopupInputText {
                                    padding: 8px 12px;
                                }

                                textarea.setDataPopupTextAreaText {
                                    height: 100px;
                                    min-height: 100px;
                                    max-height: 300px;
                                    min-width: 100%;
                                    max-width: 100%;
                                    font-size: 15px;
                                    resize: none;
                                }

                                .setDataPopupButtons {
                                display: flex;
                                flex-flow: row;
                                justify-content: flex-end;
                                }

                                .setDataPopupButtonClose, .setDataPopupButtonSave, .setDataPopupButtonTitle {
                                font-family: "SF Pro Text", "SF Pro Icons", system, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", "Ubuntu", "Cantarell", "Fira Sans", sans-serif;
                                font-size: 14px;
                                font-weight: 500;
                                -webkit-appearance: button;
                                background: transparent;
                                box-sizing: border-box;
                                position: relative;
                                -webkit-user-select: none;
                                user-select: none;
                                cursor: pointer;
                                outline: none;
                                border: none;
                                -webkit-tap-highlight-color: rgba(0,0,0,0);
                                display: inline-block;
                                white-space: nowrap;
                                text-decoration: none;
                                vertical-align: baseline;
                                text-align: center;
                                margin: 0;
                                min-width: 64px;
                                line-height: 28px;
                                padding: 0 16px;
                                border-radius: 4px;
                                overflow: visible;
                                --mdc-shape-small: 8px;
                                padding-left: 10px;
                                padding-right: 10px;
                                border: 0;
                                border-radius: var(--mdc-shape-small);
                                text-transform: none;
                                letter-spacing: .25px;
                                min-width: 60px;
                                -webkit-transition: box-shadow .2s ease,background-color .2s ease;
                                transition: box-shadow .2s ease,background-color .2s ease;
                                --mdc-text-button-label-text-color: #0000008c;
                                box-shadow: 0 0 0 0 rgb(0 0 0 / 20%), 0 0 0 0 rgb(0 0 0 / 14%), 0 0 0 0 rgb(0 0 0 / 12%);
                                color: #0000008c;
                                }

                                .setDataPopupButtonSave {
                                    background-color: #1a73e8;
                                    box-shadow: none;
                                    color: #fff;
                                    --theme-color-focus-outline: #fff;
                                    outline-offset: -4px;
                                    margin-left: 8px;
                                }

                                .setDataPopupButtonClose:hover {
                                    background: rgba(0,0,0,0.06);
                                }

                                .setDataPopupButtonTitle:hover {
                                    background: #e7fce3;
                                    color: #359c86;
                                }

                                .setDataPopupButtonSave:hover {
                                    background-color: #1967d2;
                                }

                                .setDataPopupButtonTitle {
                                    position: absolute;
                                    left: 10px;
                                    transition: 0.2s;
                                    background: #e7fce3;
                                    color: #359c86;
                                }

                                input.setDataPopupInputText:focus, textarea.setDataPopupTextAreaText:focus {
                                    box-shadow: 0 0 0 2px #1a73e8 inset, 0 0 0 1px #0000001f inset;
                                }

                                input.setDataPopupInputColor {
                                    width: 33px;
                                    border: 0;
                                    padding: 7px;
                                    margin: 0;
                                    background-color: transparent;
                                    border-radius: 20px;
                                    height: 36px;
                                    outline: 0;
                                    position: absolute;
                                }
                                    </style>
                                    <div class="setDataPopupForm">
                                        <div class="setDataPopupFormInputs">
                                            <label class="setDataPopupInputLabel">Name</label>
                                            <input class="setDataPopupInputColor" type="color">
                                            <input class="setDataPopupInputText" type="text">
                                            <textarea class="setDataPopupTextAreaText" placeholder="Note contact info"></textarea>
                                        </div>
                                        <div class="setDataPopupButtons">
                                            <div class="setDataPopupButtonClose"><span>Close</span></div>
                                            <div class="setDataPopupButtonSave"><span>Save</span></div>
                                        </div>
                                    </div>
                                </div>
                                </div>`;

    },
    closeEditPopup: function(){
        if(document.querySelectorAll('#setDataPopupDiv').length) {
            document.querySelector('#setDataPopupDiv').remove();
        }
        if(document.querySelectorAll('.simpleNoteNameEdit').length) {
            let editPopupNameOpen = document.querySelector('.simpleNoteNameEdit');
            editPopupNameOpen.style.display = 'flex';
        }
        if(document.querySelectorAll('.simpleNotePhoneEdit').length) {
            let editPopupNameOpen = document.querySelector('.simpleNotePhoneEdit');
            editPopupNameOpen.style.display = 'flex';
        }
        if(document.querySelectorAll('.simpleNoteEmailEdit').length) {
            let editPopupNameOpen = document.querySelector('.simpleNoteEmailEdit');
            editPopupNameOpen.style.display = 'flex';
        }
        if(document.querySelectorAll('.simpleNoteFirstNameEdit').length) {
            let editPopupNameOpen = document.querySelector('.simpleNoteFirstNameEdit');
            editPopupNameOpen.style.display = 'flex';
        }
        if(document.querySelectorAll('.simpleNoteLastNameEdit').length) {
            let editPopupNameOpen = document.querySelector('.simpleNoteLastNameEdit');
            editPopupNameOpen.style.display = 'flex';
        }
        if(document.querySelectorAll('.simpleNoteDetailEdit').length) {
            let editPopupDetailOpen = document.querySelector('.simpleNoteDetailEdit');
            editPopupDetailOpen.style.display = 'flex';
        }
        if(document.querySelectorAll('.simpleNoteDetailsText').length) {
            document.querySelector('.simpleNoteDetailsText').style.display = "-webkit-box";
        }
    },
    loadMessages: async function(contactId) {
        if(APP.contacts[contactId].pageCompleted) {
            return;
        }
        APP.isMessageLoading = true;
        messagesContainer = document.getElementById('messages-container');
        $('#messages-container').prepend(APP.loader("contactloader"));
        APP.contactListloader = document.getElementById('contactloader');
        setTimeout(async function() {
            await APP.getMessages(contactId);
            APP.contacts[contactId].currentPage++;
            APP.isMessageLoading = false;
            APP.contactListloader.remove();
        }, 1000);
    },
    getMessages: async function(contactId) {
        return await ZOHO.CRM.API.searchRecord({Entity:APP.extensionHistory,Type:"criteria",Query:`(${APP.extensionFieldWhatsAppNumber}:equals:${contactId})`, per_page:APP.messagesPerPage, page:APP.contacts[contactId].currentPage}).then(async function(data) {
            return await APP.getMessagesResponse(data, contactId);
        });
    },
    getMessagesResponse: function(data, contactId) {
        if(data && data.info && !data.info.more_records) {
            APP.contacts[contactId].pageCompleted = true;
        }
        if(data && data.data) {
            let loadedMessagesCount = data.data.length;
            let loadedMessages = [];
            data.data.forEach(async (messageRecord) => {
                if(messageRecord[APP.extensionFieldMsgId] && !APP.contacts[contactId].messages[messageRecord[APP.extensionFieldMsgId]]) {
                    APP.contacts[contactId].messages[messageRecord[APP.extensionFieldMsgId]] = messageRecord;
                    loadedMessages.push(messageRecord);
                }
                loadedMessagesCount -= 1;
                if(!loadedMessagesCount) {
                    loadedMessages.sort((a, b) => new Date(b[APP.extensionFieldTimestamp]) - new Date(a[APP.extensionFieldTimestamp]));
                    loadedMessages.forEach(async function(message) {
                        await APP.addMessage(message[APP.extensionFieldMsgId], contactId, "loaded");
                    });
                }
            });
        }
    },
    contactAction: async function(contactId) {
        let contactRecordMap = await APP.contactMap(contactId);
        if(contactRecordMap && contactRecordMap.id) {
            await ZOHO.CRM.API.updateRecord({Entity: APP.extensionContacts, APIData: contactRecordMap, Trigger:["workflow"]}).then(function(data){
                // // console.log(data);
            });
        }
        else {
            await ZOHO.CRM.API.searchRecord({Entity: APP.extensionContacts, Type:"phone",Query: contactId, delay:false}).then( async function(data){
                if(data && data.data) {
                    contactRecordMap.id = data.data[0].id;
                    await ZOHO.CRM.API.updateRecord({Entity: APP.extensionContacts, APIData: contactRecordMap, Trigger:["workflow"]}).then(function(data){
                        // // console.log(data);
                    });
                }
                else {
                    await ZOHO.CRM.API.insertRecord({Entity: APP.extensionContacts, APIData: contactRecordMap, Trigger:["workflow"]}).then(function(data){
                        // // console.log(data);
                    });
                }
            });
        }
    },
    histroyAction: async function(contactId, messageId) {
        let histroyRecordMap = await APP.histroryMap(contactId, messageId);
        if(histroyRecordMap && histroyRecordMap.id) {
            if(histroyRecordMap[APP.extensionFieldReactionFrom] || histroyRecordMap[APP.extensionFieldReactionTo]) {
                delete histroyRecordMap[APP.extensionFieldTimestamp];
            }
            await ZOHO.CRM.API.updateRecord({Entity: APP.extensionHistory, APIData: histroyRecordMap, Trigger:["workflow"]}).then(function(data){
                // console.log(data);
            });
        }
        else {
            await ZOHO.CRM.API.insertRecord({Entity: APP.extensionHistory, APIData: histroyRecordMap, Trigger:["workflow"]}).then(function(data){
                // console.log(data);
            });
        }
    },
    sortingArrOfOject: function() {

    },
    currentChatUnreadNotification: function() {
        if(Object.keys(APP.contacts[APP.currentContactId].notifications).length) {
            Object.keys(APP.contacts[APP.currentContactId].notifications).forEach(function(key) {          
                let message = APP.contacts[APP.currentContactId].notifications[key];
                let message_id = APP.contacts[APP.currentContactId].notifications[key][APP.extensionFieldMsgId];    
                APP.contacts[APP.currentContactId].messages[message_id] = message;
                delete APP.contacts[APP.currentContactId].notifications[key];
                setTimeout(() => {
                    APP.database.ref('incomingMessages/'+key).remove().then(() => {
                        // console.log("Data deleted successfully");
                    }).catch((error) => {
                        // console.log("Error deleting data: ", error);
                    });
                }, 2000);
            });
        }
    },
    reactionSentMessage: function(thisSelected) {
        let reaction = $(thisSelected).text();
        let msgId = $(thisSelected).attr("msgid");
        $(".reactionOpened").removeClass("reactionOpened");
        let message_id = decodeURIComponent(msgId).replaceAll("_", ".").replaceAll("-", "=");
        APP.contacts[APP.currentContactId].messages[message_id][APP.extensionFieldReactionTo] = reaction
        APP.addMessage(message_id, APP.currentContactId, "outgoing"); 
        $("#"+msgId+" .reactionShowInmsgBoxOuter").css({"display": "flex"});
        let request = {
            url : `https://graph.facebook.com/v22.0/581984271672102/messages`,
            headers: { 
                "Authorization": "Bearer "+APP.at,
                "Content-Type": "application/json"
            },
            body: {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: APP.currentContactId,
                type: "reaction",
                reaction: {
                    message_id: message_id,
                    emoji: reaction // e.g., "👍", "❤️", "😂"
                }
            }
        };

        ZOHO.CRM.HTTP.post(request).then(async function(resp) {
            let searchRecord = await ZOHO.CRM.API.searchRecord({Entity:APP.extensionHistory, Type:"criteria",Query:`(${APP.extensionFieldMsgId}:equals:${decodeURIComponent(msgId).replaceAll("_", ".").replaceAll("-", "=")})`});
            if(searchRecord.data) {
                let contactRecordData = {
                    id: searchRecord.data[0].id
                };
                contactRecordData[APP.extensionFieldReactionTo] = encodeURIComponent(encodeURIComponent(reaction));
                await ZOHO.CRM.API.updateRecord({Entity: APP.extensionHistory,APIData:contactRecordData,Trigger:["workflow"]}).then(function(data){});
            }
        });
    },
    reactionElementOpen: async function() {
        let reactionElement = `<div class="reactionPoupButton" id="reactionPoupButton">
    <div class="rectionBUttonOuter">
        <div class="rectionButton">
            <div class="reactionButtonIn">
                <div>
                    <span class="reactionButtonImg" onclick="APP.reactionSentMessage(this);">👍</span>
                </div>
            </div>
        </div>

        <div class="rectionButton">
            <div class="reactionButtonIn">
                <div>
                    <span class="reactionButtonImg" onclick="APP.reactionSentMessage(this);">❤️</span>
                </div>
            </div>
        </div>

        <div class="rectionButton">
            <div class="reactionButtonIn">
                <div>
                    <span class="reactionButtonImg" onclick="APP.reactionSentMessage(this);">😂</span>
                </div>
            </div>
        </div>

        <div class="rectionButton">
            <div class="reactionButtonIn">
                <div>
                    <span class="reactionButtonImg" onclick="APP.reactionSentMessage(this);">🙏</span>
                </div>
            </div>
        </div>
        <div class="reactionAddButton">
            <div class="reactionButtonIn">
                <div>
                    <span aria-hidden="true" data-icon="plus" class="x1t495xr">
                        <svg viewBox="0 0 24 24" width="26" preserveAspectRatio="xMidYMid meet" class=""><title>plus</title><path fill="currentColor" d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path></svg>
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>`;

        
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
        }).then(function(contactResponse) {
            // setTimeout(() => {
                APP.updateLeadAfterConversion(leadRecord.id, contactResponse.data[0].details.id);
            // }, 1000);
            
        }).catch(function(error) {
            // console.log("Error in contact to deal conversion:", error);
            let errorStr = error.data[0].details.api_name+" "+error.data[0].message;
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
            ">${errorStr}</div>`);
            throw error; // Re-throw for caller to handle
        });
    },
    contactToDealCreateConfirmation: function() {

        if($("#dealMapConfirmCondainer").length) {
            return;
        }

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
                    APP.updateContactAfterConversion(contactRecord.id, dealResponse.data[0].details.id);
                // }, 1000);
                // console.log("Deal created successfully with ID:", dealResponse);
                
        }).catch(function(error) {
            // console.log("Error in contact to deal conversion:", error);
            throw error; // Re-throw for caller to handle
        });
    },
    updateLeadAfterConversion: function(lead_id, contact_id) {
        let updateData = {
            "Conversion_Status": "Converted",
            "Converted_Contact": contact_id,
            id: lead_id,
            "Last_Conversion_Date": new Date().toISOString()
        };
        
        ZOHO.CRM.API.updateRecord({
            Entity: "Leads",
            APIData: updateData
        }).then(function(response) {
            if($("#leadSelectOption").length) {
                $("#leadSelectOption").hide();
            }
            if($("#contactSelectOption").length) {
                $("#contactSelectOption").show();
            }
            APP.contacts[APP.currentContactId].details[APP.extensionFieldModule] = "Contact";
            APP.contacts[APP.currentContactId].details[APP.extensionFieldContact] = contact_id;
            APP.contacts[APP.currentContactId].details[APP.extensionFieldLead] = "";
            APP.filterModes["leads"].contacts = APP.filterModes["leads"].contacts.filter(e => e !== lead_id);
            APP.contactAction(APP.currentContactId);
            ZOHO.CRM.API.deleteRecord({Entity:"Leads",RecordID: lead_id})
            .then(function(data){
                // console.log(data)
            });
            // console.log("lead updated after conversion");
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
                $("#contactSelectOption").click();
            }, 1000);
        }).catch(function(error) {
            console.warn("Failed to update contact after conversion", error);
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
            // console.log("Contact updated after conversion");
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
    moveContactToTop: function(contactId) {
        var contactList = document.getElementById('chat-list');
        let contacts = Array.from(document.querySelectorAll('.chat-item'));
        if (contacts.length < 2) return;
        const contactToMove = contacts.find(c => c.getAttribute('data-id') === contactId.toString());
        // // console.log(contactToMove);
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
    svg: {
        openlink: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h560v-240q0-17 11.5-28.5T800-480q17 0 28.5 11.5T840-440v240q0 33-23.5 56.5T760-120H200Zm560-584L416-360q-11 11-28 11t-28-11q-11-11-11-28t11-28l344-344H600q-17 0-28.5-11.5T560-800q0-17 11.5-28.5T600-840h200q17 0 28.5 11.5T840-800v200q0 17-11.5 28.5T800-560q-17 0-28.5-11.5T760-600v-104Z"/></svg>`,
        contactinfo: `<svg elementid="option" xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25" style="fill: #77848d;width: 25px;height: 23px;"><path d="M720 843q26 0 43.5-17.5T781 782q0-26-17.5-43.5T720 721q-26 0-43.5 17.5T659 782q0 26 17.5 43.5T720 843Zm0 122q31 0 57.5-14t43.5-40q-23-13-49-20t-52-7q-26 0-52 7t-49 20q17 26 43.5 40t57.5 14Zm0 106q-95 0-161.5-66.5T492 843q0-95 66.5-161.5T720 615q95 0 161.5 66.5T948 843q0 95-66.5 161.5T720 1071ZM317 462h326q22 0 37.5-15.5T696 409q0-22-15.5-37.5T643 356H317q-22 0-37.5 15.5T264 409q0 22 15.5 37.5T317 462Zm121 507H194q-45 0-75.5-30.5T88 863V293q0-45 30.5-75.5T194 187h572q45 0 75.5 30.5T872 293v283q-34-20-73.5-30.5T720 535h-12q-6 0-12 1-10-7-25-9t-28-2H317q-22 0-37.5 15.5T264 578q0 22 15.5 37.5T317 631h179q-14 14-25 30t-21 33H317q-22 0-37.5 15.5T264 747q0 22 15.5 37.5T317 800h98q-2 11-2.5 21.5T412 843q0 33 6 64.5t20 61.5Z"></path></svg>`,
        close: `<svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="currentColor" enable-background="new 0 0 24 24"><title>x</title><path d="M19.6004 17.2L14.3004 11.9L19.6004 6.60005L17.8004 4.80005L12.5004 10.2L7.20039 4.90005L5.40039 6.60005L10.7004 11.9L5.40039 17.2L7.20039 19L12.5004 13.7L17.8004 19L19.6004 17.2Z"></path></svg>`,
        lead: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" xml:space="preserve" version="1.1" viewBox="0 0 40 40"> <image width="40" height="40" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABsxJREFUWEfVmH1sVlcdx7/n5d7n3uetPIUVKm+b0ywal2DUGDUmC8Y5dGi6paiwF7p2IKy8UwgTDVkYWEpBiowFWhgvwlbGcGCB6RI1TmNMdInJEjNxm9AgZYy2PK/33nPOz9wHMayjlfI8T7Kdv27uPfd3Pr/v73fO+Z3D8CFv7EPOh48uYNthvzOjC41plQAMQD5AHNAEGAZIC+CGYGhkH8O+zKBogwvAGAUigiUtMAZE2CDGxxN/WVIvPn+jaA5rfdsxkzv994LrCwdxl8H4BRAJaCMRQMGWDBQOBj5ylggOThxG6aJTpP2ik5YdQyEHRCPAZ6qApxtD3A+2YQE3vuTR7y9KyLR5MpKV7UfWMf9GBurXkZ2pvnGqxC+Dhv43o4MioZ1Ti5n39Q30bapOv3y7stHZ7IwOsLU7T7/rE+Baf/WXS93XKjGZvvXMQEoLfvmOIIadzWJ0gNuPEJ3+ByCEfvD4avlSJQBntOYmKeaem+YCbYtGGeLN3US/7g0Q9azGY2vYnkoA3rueJssIztaO9dD12ChDfA0wrsWSoy2ioyKAbfk7JJy3SgJMGrP0yEpnWyUAp2+mqQ7hnZIAqwiN3SvsYUPctDszXhmTgp1457kGVhiNI1/bSB+PSPyzJMB4IBYdXS1+NnTgeXu9u6uc7N/OZ1LwVD8m2DFMiOi/rn0o+rmbhZy+niY6EfSWBggsOrrc/gDgit0+9QUWai0NuMCFywYx20LM9TrbH3UevxnIGa00iXGcKwkwys2qY0udtusHbNrtN+jA2lMdNW+2zxV3hd8adgVfVpb8A2UzONicKK5pc/eSE4a9fgu5sRQofNeXBoWLdPh8bxvVSKCvJMCIZKuOL7beB/jdTmrWGWy3ybvz0DLnrWvw9T/NUVS62NfMWN3OdE3Bs/piLIKYY8BIQSkbUb8fu5ZXFx2YuZnGacK7JQFWcbW8e2l06/UK1u+gaREfrycT6V8805SsC7/V76C4dE3aLmjsW2gXAeq3DP5pUrW807ddYWeVnxRSn83pd/c2W9PKpqBdQNOJJ+2uoTk1e2/vhYKZOP7u6uzblGan+3yxIFOwQNpMP7TE+s3N5OA9m2lctFQFuaH6UysjL95owO+3+7u1TDcNJqpReyVXCLj4zs8XO7+6vm9DR/o2bQnbcDIWyZQi+9KBBexi2OeedeREY8iXFGKt8Oirq+z9N6PI0D4z2z2qZhrZhAvL60fUjEEmz/DC6qv7bljZMA+FkgCh+ZxXWuSh96myhyZPEfR6L9HY/BWOAgcYv4Cq2AQwz2zpmidW1G0q3M8s8dkxPDfGc2OWRbDHEFKXfHHx4GK2qGwKCq0fO9ni7r0GOLsr+BFU8JQdSPhcIclc5KMD8AtjEPXeg3KrAI+Qq7HkkVlMj6T8l7aQm9LIlaSg1Prhnhb3YDjQAzv8LyhFf57sFPCesqY8/0T03FCAhftVzwVffDPupbH/iWQxlHO25eqsqLnLg/UvDIjM4RZ5oqhgOSaJ8Gj2yTWRw6HBlv3n6Xy2FjyD+IEWlh1OnWUvBm/0D8hPS61+0jnfWjOrlYjFAW5lcaU/hp7/5mBZFLQNf+TESnkghGnclaexMYNNc2IjnpQe2UdjqwaDS85Eq9D2IHO/1+Z/URuLyPJrfY/eOL7GOVO2SSIUGk6usp8LDT68dYCmTk2m1z/Ak/9vVv9wOxHFC9jQ4A7rTLgFZkvOQei5PcvdfcW99dk8uUkHHxMa/XkBzgElAGgFhjSESSGSHIThQO/ZKtRMBtrrblzKh/a+8TTVChvnS5okwuDxkyvtztDggo6BIG9s6cCHiVbBC8+7DEXQsBkPIGRBlIUraiCSOLPzIfbJ4dS+byPdziXeLglQgs/tWS6LCpa7laWa4RrzTrXYu8sNF9orSzUjGW/sWSYrcqorSw5ywsJTK+ydlVBwxga6jVm4eEs5uL2b6JUzABk9q2etPFIJwJnrKBpYyH4qBWxdOMqD+8bns/Tbf9uQWXylZ631x0oAFqsZ60phCk/i2fmjBNz0sqLXLgqkVHB4IINtxFk0rEgUJIggCciDoBmgtAEZfvUCSRgwCCXDZ04yCESgOVmB0hAWBR4YIhqKay4yManvy0VU2yTmoGvB1Sp8aBt2lW99wbv86pteCm4CcRdAEEAbDm0EAuj/Xb8ZPfL1mxE6BIVRpviP1h40CJYdh1cwSAiGT4xj2NQwSgV/3BW0IKKeuuzbjiAO5WkwxqAZhwJgFzVS4Kz4MGwL13IKz3PhBWboi9HFC0x51QASegBXVGJXxw/k/FEpWImcuxWbH9076lvxthL//AcynK9WbANnvgAAAABJRU5ErkJggg=="/> </svg>`,
        contact: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" xml:space="preserve" version="1.1" viewBox="0 0 40 40"> <image width="40" height="40" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAB5NJREFUWEftmHlsFccdx78ze737+TZ2wZhAIT2QWqqitn/1SJtESUVMRBqOBDdgY0IDgRhQAAkHSIvAhuDH4YMGIsW0SlSC1KopIpCKqk1p01KFNGmDOIwph22e/a59uzu7M9Wa0mBsv/jZRkqlzp+7M7/5zPd3zO6P4FM+yKecD//bgNXN1gyqWH/RoMJOEoBSUJWCyABsQBaAI32CD4idcQJPJ0FzcuD3J7p/XBEqvHNyRgXXtCbqfpcObAwCCFDAMR2YgoFTCYQpUAEwycpMKJSM7wsVhktchYfHcbQ2PIAnI+CWg/EDp6O0clKuZpxPyfemLCRUDpqQXP0AxG7u7dc+DhVbA7ENEEe9+UyyIDwEPOWB8BsgKQWS1wLhHjhURoqY7EvhPOWP1y914cQLRdkBbm1Lt/2pg82bnI/L26tCE+5WQs1uFiJ+DXhrI8kO8MU2p+33XXTePUGja/cib9HdAnwgYgorqeLE81kCbjooIieT+NE0NdG9p3pgAI8V8Pd3CZFmDG/Vqtkp+OwrduPlTumZCaXi8s75dNguntUgJlgK1DeXk3PDOcSIAOe8JqQy3dr/Xreo/HIJ7d42Xx1QAu7c/NEWdr+HOr/piGrwEQFDJvhKuXmiocLznUygWQPWtArRngCKAiYYlyBbMnol4LoOnFo9ME7czWftZffFeuRjZYoBW/HALT4aACoDkwr4hU1zpXuGgswacG69wzqSXB6fZ0H1+WDHgOs2cCWRwodbAoOWpkcaDMG8DMIKIBc4KEIpNZlIzrNSxQjLQOk41O58kjQMBpk1oGvkwUahlQqr+bKtLpwaMruuhbWS1x8jzqAbNFhfE5y+A58Eno5979e1Ocdu2SjywYingem5+o1NC/wFYwboGlrU5GyO9tINJUU4v/cpMnkoFz28UywmDlpjvB0n15T3U3jda8I43WFqXywysf2JgTeFa3NECroLl+11Nv9T0A1T5HhH05Jw2VCADzWwbxlMPuGVdPxqtb8f4KaDhvhrr4aJpfrVXY/5S8dUwVURp+5Dk26cUiguRhbSSZkysSIihCWAz/s6o9sXF+e7c+va+B9OXSNfD9g9UIP++W1Pa4fGFHB+K9vSndTXT/EEz+9ZSod0sbvpwxHxzS6OtydKFtIpFT0CmOjtRkyRIeveI0dqPRVjlsWuocoDIsfLnV3nCHtyGkt3R5bkfWId/G5ElPot8UZvD2bmFhLcQDIR5lbtL1fmt4xZHZxTJ1SlAObZhOuuGFQliKgt8C8mIW4Y+GC9d8w/crNOkln14sYVhjwXULKDSKkUlxkQ1w2c2TA44LJ9bBcLycs/Oud+gAbAbUBLAPnhGMaH5ShspWpblXZ4TGOwMmK3XAGpmqyYH+2r8U0bzPjsnew+03KOcdmCJmtIUhNIKCgJAte5gKZ7IfIdGFEJU32p7q5x/nF31tOsFbwFsuBltrWnB2tL/PT9/TXS9DsBH9lhzew1yancsARdIshh0QNRXf6JaSlGkEhhroHLnMycVqa0/jlqyEF4MIWI6EtLaV+W3xojBlza4mw+H6cbxuVb51/5oTYgi1c0d7KYXSibEvCzmsHv6FsQiw7EW/ROtYrbGgqLsWv3YvLsqAGfeUmsO+NYL34uSM/uq1am3n7qin3s270p+bhKOEITqDzUNXj7mk070hf+pnrKOQeOLP/4QCNW8PFGsTZtYGtZiXk28oSnH2B1vdiWpFjtzUvip5XBYWX2sh1mxUVJPWwZPTi2Nu+/a0YE+HgkVVpAaX2H4cwtC1GDgpd3Mb916GnS46ryXJP189NM/sGMUPJq/cLQoFfYnTE7K2JO56b6niwsyClVe72O9P0SZgXofsXkO45xMc4xPpdB8fsgpYCONHBNBwoJvL+tI8bzrfzNjmTnA+FAMUISO5TvoVNIWCpSIKjKCXMU2MIAPDYck8PppZauk3TxP2L+8mSXDJ+DgjfWkRtZA7oLFjTyzhs2KSwKpJHiXigxHTHJQFIJR0+ukPsycNVu59VLMTo/FgCKNRO6IcBUD4RjQ4IMTm1Q5kASGhQGKGHASQG2xwHvlJAE8o/WkeiIAG+5pqYp3XIhzqrKw753m5fIX73dZbN3WjMSVJwSpiTL3ACBAqK4sgFCCFAqoFIJCc2GnJAgVAIST8Pn1SHLOe8cXiV/Y9RZXLPf2HE9rq0s8ooPmpfSL2S6T0fzLqsYvH2jVU3O1vet1NrPepQLe6q9Q/5TjAZuVC5eucep/zujz00KsUvNT6kTRwsy1PoHG01hJFS8vT7LH/cVe9m2izFz9eRC3r5jcaj8bgFWtAgRvwocz7b1sXJ3fNslS159b7GCuOHcn4jTzh5OfG7nyBEyoxyMApQLUAG4TTlIAOcUhHKIvgNRu69BJ5ybzST3ncRBHAohQaQVRZR7wvhFZ7uO4y/kZtdZqGlMLDmDQFMAQJAKMMuCyQUc4vbiVCgEEP9pdA2tLs8ofCFV0U7cemnj6BrXYv+R8Yqas0//jB/iTI4q5Tq6e3oCqCqo1KcIVOH2BzM7XtzUceihG5DyPUgw592XK/uXMnfRsO7QuxV7w7H7f8DhqJRpzr8BOyrOVgfEfycAAAAASUVORK5CYII="/> </svg>`,
        opentab: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" xml:space="preserve" version="1.1" viewBox="0 0 40 40"> <image width="40" height="40" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABlBJREFUWEftl2uMVOUZx//vec915szs7K7oQkSjeKX9YGxIeokptfZDJdEYaxPFLWLRtVzkLiyWstgiK6y6wIxVjBWERQGLRkK9YDdWTfQDbWqUqKkXbi6sO7vMMHPmnPOe99JME6iLA8zsbowxnC/ny/O8z+/9/8/zvO8h+JY/5FvOh7OAw3XorIK1KDixTdlvtJHgqznfiII3P65UthTAKWahWU0o2Qo0ZKA+RbEOiLiELWIYbeRgxJ0FXS32w8chvxHASe1CybiGC6hCgRPk44ArBRyfghsSkmqIPIAWi2gaq2U674jPPCPgg7tEyxhbe3x//+lN0spbNDwUPRN6wkDEOfScCh6803SOZ/5yrbJMGgSC2UjYQExj8HImUknAV0VEcGEA6GUC4+KyM3OXOfe0gOtekVH3h1IXMoJU6rSE1DfguAE4dxEB8MI8XEnx4h8Sg9y5JaNcwVBIkByUlgISgFf04FILXkBgUg5PF7i0jj7Rcbt9zykBH9ktP9r5PrmcRBxXjpIHDgyQXwW+zCmT6EqAUEASojgHpOIgFgAKaMQgpoxMWQCDHshS9wpn/8k7u2Wbos5APy9EjbAEYCQBQwBMld8MOcZxRSrasnJKanJFwN9sVI35wyzLdBOFiP/i7Vbj9Vq68EyxZcCxBfBDAJwAYOwYQo3AMOKwJUEhIrisTqxvv1NvqQh462NsWilrPHn5eRKrWuiINlDzahVnBMWYHsETPpilo17GwCwFoQg0H/AAXNmAdPsUMqsi4LSnxbLebNT2w/Mt3H8rGTHAGx7qSxiEHXMSLriWRLl7vBBweASuC0hqw9GAHl/i+6PEMx3N5pSKgLO6xIoPDntLfnJRDH+6WR8RwMlrVVIS5GMRMODkUCdTyB8N0FBnvfjULO2m5s6e3pJvnZtKNqCXM1zWEHU90uzeXhFw5aajG/59LDVldH0enbelhg1Y7lyq/IIKbMgGAhoBfi5AHEZ6yyL9hI2/TecKzI+5ecvA2ESYyUy1K8/BNVv8J189Yk6bMFrD8mFafFNaNeohslq8AFpKgOg+OOOQhKa3z4+fgCsrVW6ehA++9wBHvUUmvXKf/reKCnY8xzLdPXT6cAFvWOeNobLwRVJLQcVMhIxA9wABkXlugX5CnZO7ftKj6rpdc8mgyTHIxvbN7NE3v6RzhgN4fabYFDB6eJQTgUY2pG6gNCCgm0jvWPh/W880kioq+MeN4ap3+vWFQwX8eVo1ylBm6x2GmGXD9wDuKRgm6Xh+PllYLdQpbzMPPM0efvconTcUwGs71IU5iX1XpAow/AQUVcj5BIJg2a4F5IGhwJVzBlm8ciPrfKufzq4V8MaOcLynm3tdC0gyAaZFyBWAhGbO2b6Yrhkq3NcBN7M1b31J760F8Ma14XhK9b1a6MGxEnBjwKGsQCDkzN2LzcxX4dq6+CfFo9G4jplO1SNssIJDAJy9SfYd6S2eY8UTCAnwxQBQTzFt5yLy1MnK3b01UD0HJRxOLty+2DlQjbKDAbu8dW/2mDN/PEbH0snVH3Vznshn3ytpjS5chAFaXmsl6ysVn/2XrOrtbURJRBNe+r25p3bAHbk/797v3DMhJfHQ1OptKBe6O8P2HGHBtpfmJledqvD0jVzt6yOgTJu4cwn5R82Ay5/30nv6YzOujgHLm6tXsJpC5Zjpm7j66BCFRnDN64vJ29XkDbK47dloRfd/9CWTxgGLarC4mkLlmBkbsurzvkZEik/cfZ9Ru4JLt5ZWv3NQW3DNeQaWNY/sffB/gJul+nygBBWZP3p5vvluNRsbpODvNgQzPivq6UuMCJmW2r7Baopdt1oo09AgZHjpq/PsT6rJOenHptgUhMFhGiXxvYvkGyt+bf+smkWqienYqQ52f4bz7RLHjlZjaHOwXGjuC9Hf936gX9voclwwhuLic8S/bIpA1+CWfx8UgYKCLMcqCc5BPb+AXOh7Bw1iIGZq44UBLaK0hwlJkga7+MP9sR/sG8jjGJeINcRb/9pitVezqa+dJMeTWrcV/vnxp8WrQ70JvHzLHMbjmwbEgIdLkiGYtJc9Oy9e07l8Sqmnri/8tN4k97ta7CrHQMLUiV0rJ+PK9znp2+exrX3MXPryvSSsdY2qv4VaFx6p+LOAw1XyrILfeQX/Czx7t0cjY7uBAAAAAElFTkSuQmCC"/> </svg>`,
        svg: ``
    },
    addedStatus: `<svg viewBox="0 0 16 15" width="16" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 16 15"><title>msg-time</title><path fill="currentColor" d="M9.75,7.713H8.244V5.359c0-0.276-0.224-0.5-0.5-0.5H7.65c-0.276,0-0.5,0.224-0.5,0.5v2.947 c0,0.276,0.224,0.5,0.5,0.5h0.094c0.001,0,0.002-0.001,0.003-0.001S7.749,8.807,7.75,8.807h2c0.276,0,0.5-0.224,0.5-0.5V8.213 C10.25,7.937,10.026,7.713,9.75,7.713z M9.75,2.45h-3.5c-1.82,0-3.3,1.48-3.3,3.3v3.5c0,1.82,1.48,3.3,3.3,3.3h3.5 c1.82,0,3.3-1.48,3.3-3.3v-3.5C13.05,3.93,11.57,2.45,9.75,2.45z M11.75,9.25c0,1.105-0.895,2-2,2h-3.5c-1.104,0-2-0.895-2-2v-3.5 c0-1.104,0.896-2,2-2h3.5c1.105,0,2,0.896,2,2V9.25z"></path></svg>`,
    sentStatus: `<svg viewBox="0 0 12 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>msg-check</title><path d="M11.1549 0.652832C11.0745 0.585124 10.9729 0.55127 10.8502 0.55127C10.7021 0.55127 10.5751 0.610514 10.4693 0.729004L4.28038 8.36523L1.87461 6.09277C1.8323 6.04622 1.78151 6.01025 1.72227 5.98486C1.66303 5.95947 1.60166 5.94678 1.53819 5.94678C1.407 5.94678 1.29275 5.99544 1.19541 6.09277L0.884379 6.40381C0.79128 6.49268 0.744731 6.60482 0.744731 6.74023C0.744731 6.87565 0.79128 6.98991 0.884379 7.08301L3.88047 10.0791C4.02859 10.2145 4.19574 10.2822 4.38194 10.2822C4.48773 10.2822 4.58929 10.259 4.68663 10.2124C4.78396 10.1659 4.86436 10.1003 4.92784 10.0156L11.5738 1.59863C11.6458 1.5013 11.6817 1.40186 11.6817 1.30029C11.6817 1.14372 11.6183 1.01888 11.4913 0.925781L11.1549 0.652832Z" fill="currentcolor"></path></svg>`,
    deliveredStatus: `<svg viewBox="0 0 16 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>msg-dblcheck</title><path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="currentColor"></path></svg>`,
    readStatus: `<svg viewBox="0 0 16 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>msg-dblcheck</title><path fill="#53bdeb" d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="currentColor"></path></svg>`,
    lastMessageLabelDate: null,
    firstMessageLabelDate: null,
    addMessage: async function(messageId, contactId, type) {

        if(!messageId) return;
        if(APP.currentContactId != contactId) return;
        if(!APP.contacts[contactId].messages[messageId]) return;

        let message = APP.contacts[contactId].messages[messageId];

        messagesContainer = document.getElementById('messages-container');
        messageElement = document.createElement('div');
        messageElement.className = "message-content";
        let msgId = message[APP.extensionFieldMsgId] ? encodeURIComponent(message[APP.extensionFieldMsgId].replaceAll(".", "_").replaceAll("=", "-")) : "";
        messageElement.id = msgId;
        if(message[APP.extensionFieldEncodeMessage]) {
            let messageInColor = "White";
            let messageOutColor = "#d9fdd3";
            let incoming = message[APP.extensionFieldDirection] == 'incoming' ? true : false;
            messageElement.className = "message-content "+(incoming ? "message-incoming" : "message-outgoing");
            let messageDirection = incoming ? 'message-in' : 'message-out';
            let messageboxHook = incoming ? `<span aria-hidden="true" class="message-in-content"><svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg></span>` : `<span aria-hidden="true" class="message-in-content"><svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg></span>`;
            let messageToReact = `<div class="message-text-to-react-out"><i class="fa-solid fa-reply" onclick="APP.handleReplyMessageBtnOnClick('${messageId}', '${contactId}')"></i><div class="message-text-to-react-in"><div><div class="message-text-to-react"><span class="message-text-to-react-icon" msgId="${msgId}"><svg viewBox="0 0 15 15" width="15" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>react</title><path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.5C0 11.6305 3.36946 15 7.5 15C11.6527 15 15 11.6305 15 7.5C15 3.36946 11.6305 0 7.5 0C3.36946 0 0 3.36946 0 7.5ZM10.995 8.69333C11.1128 8.67863 11.2219 8.66503 11.3211 8.65309C11.61 8.63028 11.8076 8.91918 11.6784 9.13965C10.8573 10.6374 9.29116 11.793 7.50455 11.793C5.71794 11.793 4.15181 10.6602 3.33072 9.16246C3.18628 8.91918 3.37634 8.63028 3.66524 8.65309C3.79123 8.66749 3.93521 8.68511 4.09426 8.70457C4.94292 8.80842 6.22074 8.96479 7.48174 8.96479C8.81855 8.96479 10.1378 8.80025 10.995 8.69333ZM5.41405 7.37207C6.05761 7.37207 6.60923 6.72851 6.60923 6.02978C6.60923 5.30348 6.05761 4.6875 5.41405 4.6875C4.77048 4.6875 4.21886 5.33106 4.21886 6.02978C4.20967 6.75609 4.77048 7.37207 5.41405 7.37207ZM10.7807 6.05619C10.7807 6.74114 10.24 7.37201 9.60912 7.37201C8.97825 7.37201 8.4375 6.76818 8.4375 6.05619C8.4375 5.37124 8.97825 4.74037 9.60912 4.74037C10.24 4.74037 10.7807 5.34421 10.7807 6.05619Z" fill="currentColor"></path></svg></span></div></div></div></div>`;
            let messageTime = APP.getCurrentTime(message[APP.extensionFieldTimestamp]);
            let messageText = decodeURIComponent(decodeURIComponent(message[APP.extensionFieldEncodeMessage]));
            let messageChatImg = `<div class="message-chat-img-div"><img alt="" draggable="false" class="message-chat-img" tabindex="-1" src="${incoming ? 'person.png' : APP.currentUser.image_link ? APP.currentUser.image_link : 'person.png'}"></div>`;
            let messageOwnerName = !incoming && message.Owner && typeof(message.Owner) == "object" && message.Owner.name ? `<div class="message-owner"><span class="message-owner-name">${message.Owner.name}</span></div>` : !incoming && message.Owner && typeof(message.Owner) == "string" && APP.allUsers[message.Owner] && APP.allUsers[message.Owner].full_name ? `<div class="message-owner"><span class="message-owner-name">${APP.allUsers[message.Owner].full_name}</span></div>` : '';
            let reactionFrom = message[APP.extensionFieldReactionFrom] ? decodeURIComponent(decodeURIComponent(message[APP.extensionFieldReactionFrom])) : '';
            let reactionTo = message[APP.extensionFieldReactionTo] ?  decodeURIComponent(decodeURIComponent(message[APP.extensionFieldReactionTo])) : '';

            let rections = reactionFrom && reactionTo ? reactionFrom+reactionTo+" 2" : reactionFrom ? reactionFrom : reactionTo ? reactionTo : '';

            let startConvIcon = messageboxHook;
            let startConvImag = messageChatImg;
            let startConvOwner = messageOwnerName;
            if(APP.lastMessageDirection != message[APP.extensionFieldDirection]) {
                APP.lastMessageDirection = message[APP.extensionFieldDirection];
                // messageElement.className = "message-content startConversation";
                // startConvIcon = messageboxHook;
                // startConvImag = messageChatImg;
                // startConvOwner = messageOwnerName;
            }

            let messageStatus = incoming ? '' : `<div class="message-status-out"><span class="message-status">${message[APP.extensionFieldStatus] == "sent" ? APP.sentStatus : message[APP.extensionFieldStatus] == "delivered" ? APP.deliveredStatus : message[APP.extensionFieldStatus] == "read" ? APP.readStatus : APP.addedStatus}</span></div>`;
            messageElement.innerHTML = `<div class="message-content-inner" data-id="">
                                        <div class="${ messageDirection }">
                                            <div class="message-content-main">
                                                ${startConvIcon}${startConvImag}
                                                
                                                ${messageToReact}
                                                <div class="message-content-main-div">
                                                    <div>
                                                        <div class="message-content-main-div-in">
                                                            ${startConvOwner}
                                                            <div class="reply-message-content-out"></div>
                                                            <div class="data-pre-plain-text-out">
                                                                <div class="data-pre-plain-text"><span dir="ltr" class="message-text"><span class="message">${messageText}</span></span><span class=""><span class="message-text-hide-formate"><span class="message-out-status-width"></span><span class="message-text-hide">${messageTime}</span></span></span></div>
                                                            </div>
                                                            <div class="message-time-out" data-timestamp="${new Date(message[APP.extensionFieldTimestamp]).getTime()}">
                                                                <div class="message-time-in"><span class="message-time" dir="auto">${messageTime}</span>${messageStatus}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span class=""><div class="message-text-to-out"><div class="message-text-to-in"><span class="message-text-to"><svg viewBox="0 0 18 18" height="18" width="18" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 18 18"><title>down-context</title><path fill="currentColor" d="M3.3,4.6L9,10.3l5.7-5.7l1.6,1.6L9,13.4L1.7,6.2L3.3,4.6z"></path></svg></span></div></div></span>
                                                </div>  
                                                <div class="reactionShowInmsgBoxOuter" style="display: ${rections ? 'flex' : 'none'};">
                                                    <button class="reactionShowInmsgButton">
                                                        <div class="reactionShowInmsgButtonIn">
                                                            <div class="reactionShowInmsgOut">
                                                                <div class="reactionShowInmsgIn">
                                                                    <span class="messageRectionEelement">
                                                                        ${rections}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>            
                                            </div>
                                        </div>
                                    </div>`;
        }

        messageElement.addEventListener('mouseover', function() {
            this.querySelector(".message-text-to-react-out").setAttribute('style', 'display: flex !important;');              
            this.querySelector(".message-text-to-out").setAttribute('style', 'display: flex !important;');
        });
        messageElement.addEventListener('mouseout', function() {                    
            this.querySelector(".message-text-to-react-out").setAttribute('style', 'display: none !important;');
            this.querySelector(".message-text-to-out").setAttribute('style', 'display: none !important;');
        });

        const msgDate = new Date(message[APP.extensionFieldTimestamp]).getTime();
        const formattedDate = APP.formatDateForStickyDateLabel(msgDate);
        if($("#"+msgId).length) {
            $("#"+msgId).html(messageElement.innerHTML);
        }
        else if (type == "loaded") {
            const existingLabel = [...messagesContainer.children].find( (child) => child.className.includes("date-label") && child.querySelector(".message-time-out").textContent === formattedDate );
            if (existingLabel) { existingLabel.remove(); }
            messagesContainer.prepend(messageElement);
            APP.addDateLabel(msgDate, 'prepend');
        }
        else {
            if (formattedDate !== APP.lastMessageLabelDate) {
                APP.addDateLabel(msgDate, 'append');
            }
            messagesContainer.appendChild(messageElement);
        }

        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Add right-click menu for messages
        // messageElement.addEventListener('contextmenu', (e) => {
        //     e.preventDefault();
        //     showMessageContextMenu(e, message);
        // });
        if(message[APP.extensionFieldReplyMessageId]){
            APP.replyMessageUIContent(messageId, contactId);
        }
        APP.handleMessagesOrderBasedOnTimeInChat();
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
    formatWhatsAppTime: function(timestamp) {
        let now = new Date();
        let date = new Date(timestamp);

        let diffInSeconds = Math.floor((now - date) / 1000);
        let diffInMinutes = Math.floor(diffInSeconds / 60);
        let diffInHours = Math.floor(diffInMinutes / 60);

        if (date.toDateString() === now.toDateString()) {
            let hours = String(date.getHours()).padStart(2, '');
            let minutes = String(date.getMinutes()).padStart(2, '0');
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert 0 to 12
            return `${hours}:${minutes} ${ampm}`;
        }
        
        let yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) {
            return 'yesterday';
        }
        
        let diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
            return date.toLocaleDateString([], { weekday: 'long' });
        }
        
        let day = String(date.getDate()).padStart(2, '');
        let month = String(date.getMonth() + 1).padStart(2, '');
        let year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
    },
    toIsoString: function(date) {
        if(!date) return;
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
    sendMessage: async function(){
        if(APP.isBulk){
            if(APP.selectedContacts.length == 0){
                // console.log("selected contacts: 0");
                return;
            }
            APP.renderLoaderPopupForBulkSending();
            for(let i=0; i< APP.selectedContacts.length; i++){
                let contactId = APP.selectedContacts[i];
                contactId = Number(contactId);
                if(!contactId || !APP.contacts[contactId]) continue;
                try{
                    await APP.sendMessageToContact(contactId);
                }
                catch(error){
                    // console.log(error);
                }
            }
            setTimeout(() => {
                document.getElementById('message-input').textContent = "";
                APP.closeLoaderPopupForBulkSending();
                APP.showNotification("Messages sent successfully");
                APP.resetMessageInputContainer();
            }, 3000);
            return;
        }
        else{
            APP.sendMessageToContact();
        }
    },
    sendMessageToContact: async function(contactId=null) {
        contactId = contactId ? contactId : APP.currentContactId;
        if(!contactId) return;
        if(!APP.contacts[contactId]) return;
        if(!APP.contacts[contactId].messages) APP.contacts[contactId].messages = {};
        let messageInput = document.getElementById('message-input');
        let messageText = messageInput.innerText.trim();
    
        if(!messageText) return;
        let parameters = [];
        if(APP.selectedTemplate && APP.selectedTemplate.display_text_content) {
            messageText = APP.selectedTemplate.display_text_content;
            if(APP.selectedTemplate.placeholders && APP.selectedTemplate.placeholders.length > 0){
                parameters = await APP.getAllCurrentTemplateParameters();
                messageText = APP.updatePlaceholderValuesInMessageText(messageText);
                if(parameters == false) return;
            }
        }

        let message_id = new Date().getTime()+"";
        let from = "";
        let contactName = "WhatsApp Message to "+ contactId && APP.contacts[contactId] && APP.contacts[contactId].details && APP.contacts[contactId].details[APP.extensionFieldName] ? APP.contacts[contactId].details[APP.extensionFieldName] : contactId;
        let owner = contactId && APP.contacts[contactId] && APP.contacts[contactId].details && APP.contacts[contactId].details[APP.extensionFieldOwner] && APP.contacts[contactId].details[APP.extensionFieldOwner].id ? APP.contacts[contactId].details[APP.extensionFieldOwner].id : '';
        let to = contactId;
        let time = Number(message_id);
        let text = messageText;
        let encodeText = encodeURIComponent(encodeURIComponent(messageText));
        let reactionFrom = "";
        let reactionTo = "";

        let message = {};

        message[APP.extensionFieldId] = "";
        message[APP.extensionFieldName] = contactName;
        message[APP.extensionFieldOwner] = owner;
        message[APP.extensionFieldWhatsAppNumber] = contactId;
        message[APP.extensionFieldFrom] = from;
        message[APP.extensionFieldTo] = to;
        message[APP.extensionFieldMessage] = String(text);
        message[APP.extensionFieldEncodeMessage] = String(encodeText);
        message[APP.extensionFieldTimestamp] = time;
        message[APP.extensionFieldDirection] = "outgoing";
        message[APP.extensionFieldStatus] = "send";
        message[APP.extensionFieldMsgId] = message_id;
        message[APP.extensionFieldReactionFrom] = reactionFrom;
        message[APP.extensionFieldReactionTo] = reactionTo;
        if(APP.replyTagMessageId){
            message[APP.extensionFieldReplyMessageId] = APP.replyTagMessageId;
        }
        if(APP.selectedModule && APP.selectedRecord) {
            message[APP.extensionFieldModule] = APP.selectedModule.substring(0, APP.selectedModule.length-1);
            message[APP.extensionAPI+APP.selectedModule] = APP.selectedRecord.id;
        }

        APP.contacts[contactId].messages[message_id] = message;
        if(!APP.isBulk) {
            APP.addMessage(message_id, contactId, "sendMessage");
            messageInput.textContent = '';
            $("#templates-placeholders").hide();
        }

        let sendButton = document.getElementById('send-button');
        sendButton.classList.remove('active');

        let contact = {};
        contact[APP.extensionFieldId] = "";
        contact[APP.extensionFieldName] = contactName;
        contact[APP.extensionFieldOwner] = owner;
        contact[APP.extensionFieldWhatsAppNumber] = contactId;
        contact[APP.extensionFieldLastMessage] = contactId && APP.contacts[contactId] && APP.contacts[contactId].messages && APP.contacts[contactId].messages[message_id] ? APP.contacts[contactId].messages[message_id] : message;
        contact[APP.extensionFieldActiveTime] = time;
        contact[APP.extensionFieldStatus] = "";
        if(APP.selectedModule && APP.selectedRecord) {
            contact[APP.extensionFieldModule] = APP.selectedModule.substring(0, APP.selectedModule.length-1);
            contact[APP.extensionAPI+APP.selectedModule] = APP.selectedRecord.id;
        }

        contact = Object.entries(contact).reduce((acc, [k, v]) => v ? {...acc, [k]:v} : acc , {});
        APP.contacts[contactId].details = Object.assign(APP.contacts[contactId].details, contact);
        await APP.addContactList(contactId);

        let reqBody = {};
        if(APP.selectedTemplate){
            reqBody = {
                "messaging_product": "whatsapp",
                "to": contactId,
                "type": "template",                    
                "recipient_type": "individual",
                "template": {
                    "name": APP.selectedTemplate.name, 
                    "language": { "code": APP.selectedTemplate.language },
                },
            };
            if(parameters.length){
                reqBody.template.components = parameters;
            }
        }
        else{
            reqBody = {
                "messaging_product": "whatsapp",
                "to": contactId,
                "type": "text",                    
                "recipient_type": "individual",
                "text": {
                    "preview_url": false,
                    "body": String(messageText)
                }
            };
        }

        if(APP.replyTagMessageId && APP.replyTagMessageId.startsWith("wamid.")) {
            reqBody["context"] = {
                "message_id": APP.replyTagMessageId
            };
        }

        let request = {
            url : `https://graph.facebook.com/v22.0/581984271672102/messages`,
            headers: { 
                "Authorization": "Bearer "+APP.at,
                "Content-Type": "application/json"
            },
            body: reqBody
        };

        ZOHO.CRM.HTTP.post(request).then(async function(resp) {
            if(resp) {
                resp = JSON.parse(resp);
            }
            if(resp && resp.messages && resp.messages[0] && resp.messages[0].id) {
                message[APP.extensionFieldMsgId] = resp.messages[0].id;
                APP.contacts[contactId].messages[message_id][APP.extensionFieldMsgId] = resp.messages[0].id
                APP.contacts[contactId].messages[resp.messages[0].id] = APP.contacts[contactId].messages[message_id];
                delete APP.contacts[contactId].messages[message_id];
                contact[APP.extensionFieldLastMessage] = contactId && APP.contacts[contactId] && APP.contacts[contactId].messages && APP.contacts[contactId].messages[resp.messages[0].id] ? APP.contacts[contactId].messages[resp.messages[0].id] : message;
                $("#"+encodeURIComponent(message_id.replaceAll(".", "_").replaceAll("=", "-"))).attr("id", encodeURIComponent(resp.messages[0].id.replaceAll(".", "_").replaceAll("=", "-")));                
                $("#"+encodeURIComponent(resp.messages[0].id.replaceAll(".", "_").replaceAll("=", "-"))).find(".message-text-to-react-icon").attr("msgid", encodeURIComponent(resp.messages[0].id.replaceAll(".", "_").replaceAll("=", "-")));
                message_id = resp.messages[0].id;
            }
            else {
                message[APP.extensionFieldStatus] = "faild";
            }
            // APP.contacts[APP.currentContactId].messages.push(historyRecordData);
            contact = Object.entries(contact).reduce((acc, [k, v]) => v ? {...acc, [k]:v} : acc , {});
            APP.contacts[contactId].details = Object.assign(APP.contacts[contactId].details, contact);

            await APP.histroyAction(contactId, message_id);
            await APP.contactAction(contactId);
            if(!APP.isBulk) {
                APP.resetMessageInputContainer();
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
                apiKey: "AIzaSyBCf6IVr19vkFBrrKD8KM8-G7pIewuwlwQ",
                authDomain: "whatsapp-ddb1d.firebaseapp.com",
                databaseURL: "https://whatsapp-ddb1d-default-rtdb.europe-west1.firebasedatabase.app",
                projectId: "whatsapp-ddb1d",
                storageBucket: "whatsapp-ddb1d.firebasestorage.app",
                messagingSenderId: "539599988080",
                appId: "1:539599988080:web:87978ba53561d30c881bb5"
            };
    
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
    
            // Get a reference to the database service
            APP.database = firebase.database();
    },
    realtimeListener: function() {
        APP.database.ref('incomingMessages').on('child_added', async (snapshot) => {
            let data = snapshot.val();
            let key  = snapshot.key;
            if(APP.realtimeDuplicateChaeckArr[key]) return;
            APP.realtimeDuplicateChaeckArr[key] = key;
            if(!data || !data.messages || !data.messages[0]) {
                return;
            }

            let message_id = data.messages[0].reaction && data.messages[0].reaction.message_id ? data.messages[0].reaction.message_id : data.messages[0].id;
            let from = data.messages[0].from;
            let contactId = from;
            let contactName = "incoming from "+ contactId && APP.contacts[contactId] && APP.contacts[contactId].details && APP.contacts[contactId].details[APP.extensionFieldName] ? APP.contacts[contactId].details[APP.extensionFieldName] : data.contacts && data.contacts[0] && data.contacts[0].profile && data.contacts[0].profile.name ? data.contacts[0].profile.name : contactId;
            let owner = contactId && APP.contacts[contactId] && APP.contacts[contactId].details && APP.contacts[contactId].details[APP.extensionFieldOwner] && APP.contacts[contactId].details[APP.extensionFieldOwner].id ? APP.contacts[contactId].details[APP.extensionFieldOwner].id : '';
            let to = data.metadata.display_phone_number;
            let time = contactId && APP.contacts[contactId] && APP.contacts[contactId].messages && APP.contacts[contactId].messages[message_id] && APP.contacts[contactId].messages[message_id][APP.extensionFieldTimestamp] ? Number(APP.contacts[contactId].messages[message_id][APP.extensionFieldTimestamp]) * 1000 : Number(data.messages[0].timestamp) * 1000;
            let text = data.messages[0].text && data.messages[0].text.body ? data.messages[0].text.body : '';            
            let encodeText = encodeURIComponent(encodeURIComponent(text));
            let reactionFrom = data.messages[0].reaction && data.messages[0].reaction.emoji ? data.messages[0].reaction.emoji : "";
            let reactionTo = "";
            let replyMessageId = data.messages[0].context && data.messages[0].context.id ? data.messages[0].context.id : "";

            let message = {};
            message[APP.extensionFieldId] = "";
            message[APP.extensionFieldName] = contactName;
            message[APP.extensionFieldOwner] = owner;
            message[APP.extensionFieldWhatsAppNumber] = contactId;
            message[APP.extensionFieldTimestamp] = time;
            if(!data.messages[0].reaction) {
                message[APP.extensionFieldFrom] = from;
                message[APP.extensionFieldTo] = to;
                message[APP.extensionFieldMessage] = text;
                message[APP.extensionFieldEncodeMessage] = encodeText;
                message[APP.extensionFieldDirection] = "incoming";
                message[APP.extensionFieldStatus] = "received";
            }
            else {
                message[APP.extensionFieldReactionFrom] = reactionFrom;
                message[APP.extensionFieldReactionTo] = reactionTo;
            }
            message[APP.extensionFieldReplyMessageId] = replyMessageId;
            message[APP.extensionFieldMsgId] = message_id;
            // if(APP.selectedModule && APP.selectedRecord) {
            //     message[APP.extensionFieldModule] = APP.selectedModule.substring(0, APP.selectedModule.length-1);
            //     message[APP.extensionAPI+APP.selectedModule] = APP.selectedRecord.id;
            // }

            if(contactId && APP.contacts[contactId] && APP.contacts[contactId].messages && APP.contacts[contactId].messages[message_id]) {
                if(!reactionFrom) {
                    APP.contacts[contactId].messages[message_id][APP.extensionFieldReactionFrom] = "";
                }
                message = Object.entries(message).reduce((acc, [k, v]) => v ? {...acc, [k]:v} : acc , {});
                APP.contacts[contactId].messages[message_id] = Object.assign(APP.contacts[contactId].messages[message_id], message);
            }
            else if(contactId && APP.contacts[contactId] && APP.contacts[contactId].messages) {
                APP.contacts[contactId].messages[message_id] = message;
            }

            let contact = {};
            contact[APP.extensionFieldId] = "";
            contact[APP.extensionFieldName] = contactName;
            contact[APP.extensionFieldOwner] = owner;
            contact[APP.extensionFieldWhatsAppNumber] = contactId;
            contact[APP.extensionFieldLastMessage] = contactId && APP.contacts[contactId] && APP.contacts[contactId].messages && APP.contacts[contactId].messages[message_id] ? APP.contacts[contactId].messages[message_id] : message;
            contact[APP.extensionFieldActiveTime] = reactionFrom ? '' : time;
            contact[APP.extensionFieldStatus] = "";
            // if(APP.selectedModule && APP.selectedRecord) {
            //     contact[APP.extensionFieldModule] = APP.selectedModule.substring(0, APP.selectedModule.length-1);
            //     contact[APP.extensionAPI+APP.selectedModule] = APP.selectedRecord.id;
            // }
            
            if(APP.contacts[contactId]) {
                contact = Object.entries(contact).reduce((acc, [k, v]) => v ? {...acc, [k]:v} : acc , {});
                APP.contacts[contactId].details = Object.assign(APP.contacts[contactId].details, contact);
                APP.contacts[contactId]["notifications"][key] = message;
            }
            else {
                let newContactNotification = {};
                newContactNotification[key] = message;
                APP.contacts[contactId] = {
                    id: contactId,
                    unread: 0,
                    details: contact,
                    notifications: newContactNotification,
                    messages: {},                        
                    pageCompleted: false,
                    currentPage: 1
                };
                APP.contacts[contactId].messages[message_id] = message;

                await ZOHO.CRM.API.searchRecord({Entity: "Contacts", Type:"phone",Query:contactId, delay:false}).then( async function(data){
                    if(!data || !data.data) {
                        await ZOHO.CRM.API.searchRecord({Entity: "Leads", Type:"phone",Query:contactId, delay:false}).then(async function(resp){
                            if(resp && resp.data) {
                                APP.contacts[contactId].details[APP.extensionFieldName] = resp.data[0].Full_Name;
                                APP.contacts[contactId].details[APP.extensionFieldModule] = "Lead";
                                APP.contacts[contactId].details[APP.extensionFieldLead] = resp.data[0].id;
                            }
                        });
                    }
                    else {
                        APP.contacts[contactId].details[APP.extensionFieldName] = data.data[0].Full_Name;
                        APP.contacts[contactId].details[APP.extensionFieldModule] = "Contact";
                        APP.contacts[contactId].details[APP.extensionFieldContact] = data.data[0].id;
                    }
                });
            }
            
            if(APP.currentContactId == contactId) {
                APP.addMessage(message_id, contactId, "incoming");            
                delete APP.contacts[contactId].notifications[key];
                setTimeout(() => {
                    APP.database.ref('incomingMessages/'+key).remove().then(() => {
                        // // console.log("Data deleted successfully");
                    }).catch((error) => {
                        // console.log("Error deleting data: ", error);
                    });
                }, 2000);
            }
            else if(data.messages[0].type == "text" && APP.currentContactId != contactId) {
                APP.contacts[contactId].unread += 1;
            }
            if(!APP.filterModes["all"].contacts.includes(contactId)) {
                APP.filterModes["all"].contacts.push(contactId);
            }
            await APP.addContactList(contactId);
            
        }, (error) => {
            // console.log("Listener error:", error);
        });


        APP.database.ref('outgoingMessages').on('child_added', (snapshot) => {
            let data = snapshot.val();
            let key  = snapshot.key;
            if(APP.realtimeDuplicateChaeckArr[key]) return;
            APP.realtimeDuplicateChaeckArr[key] = key;
            if(!data || !data.statuses || !data.statuses[0]) {
                return;
            }

            let message_id = data.statuses[0].id;
            let from = "";
            let to = data.statuses[0].recipient_id;
            let contactId = to;
            let contactName = contactId && APP.contacts[contactId] && APP.contacts[contactId].details && APP.contacts[contactId].details[APP.extensionFieldName] ? APP.contacts[contactId].details[APP.extensionFieldName] : data.contacts && data.contacts[0] && data.contacts[0].profile && data.contacts[0].profile.name ? data.contacts[0].profile.name : contactId;
            let owner = contactId && APP.contacts[contactId] && APP.contacts[contactId].details && APP.contacts[contactId].details[APP.extensionFieldOwner] && APP.contacts[contactId].details[APP.extensionFieldOwner].id ? APP.contacts[contactId].details[APP.extensionFieldOwner].id : '';
            let time = data.statuses[0].timestamp;
            let status = data.statuses[0].status;            

            if(contactId && APP.contacts[contactId] && APP.contacts[contactId].messages[message_id]) {
                let thisStatus = APP.contacts[contactId].messages[message_id][APP.extensionFieldStatus];
                if((thisStatus != "read" && status == "read") || (thisStatus != "read" && status == "delivered") || (thisStatus != "delivered" && thisStatus != "read" && status == "sent")) {
                    APP.contacts[contactId].messages[message_id][APP.extensionFieldStatus] = status;
                    let message = APP.contacts[contactId].messages[message_id];
                    if(message && message[APP.extensionFieldMessage]) {
                        let contact = APP.contacts[contactId];
                        contact[APP.extensionFieldId] = "";
                        contact[APP.extensionFieldName] = contactName;
                        contact[APP.extensionFieldOwner] = owner;
                        contact[APP.extensionFieldWhatsAppNumber] = contactId;
                        contact[APP.extensionFieldLastMessage] = contactId && APP.contacts[contactId] && APP.contacts[contactId].messages && APP.contacts[contactId].messages[message_id] ? APP.contacts[contactId].messages[message_id] : message;
                        contact[APP.extensionFieldActiveTime] = time;
                        contact[APP.extensionFieldStatus] = "";
                        // if(APP.selectedModule && APP.selectedRecord) {
                        //     contact[APP.extensionFieldModule] = APP.selectedModule.substring(0, APP.selectedModule.length-1);
                        //     contact[APP.extensionAPI+APP.selectedModule] = APP.selectedRecord.id;
                        // }
                        contact = Object.entries(contact).reduce((acc, [k, v]) => v ? {...acc, [k]:v} : acc , {});
                        APP.contacts[contactId].details = Object.assign(APP.contacts[contactId].details, contact);
                        APP.addContactList(contactId);
                    }
                    APP.addMessage(message_id, contactId, "outgoing"); 
                }
            }
            setTimeout(() => {
                APP.database.ref('outgoingMessages/'+key).remove().then(() => {
                    // console.log("Data deleted successfully");
                }).catch((error) => {
                    // console.log("Error deleting data: ", error);
                });
            }, 2000);

        }, (error) => {
            // console.log("Listener error:", error);
        });

    },
    emojiOpenFunction: function() {
        $(".emojiListBox").toggle();
    },
    emojiAddFunction: function(thisSelected) {
        $(".message-input").append($(thisSelected).text());
    },
    emojiSectionClick: function(section) {
        $("._icon.selected").removeClass("selected")
        $($("._icon")[section]).addClass("selected");
        $("#emojiMainDiv").scrollTop(0);
        $("#emojiMainDiv").scrollTop($($(".smiley-groups-heading")[section]).parent().position().top);
    },
    settingsPopup: async function() {
        APP.passwordOpenIcon = `<svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>visibility-on</title><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12Z" fill="currentColor"></path></svg>`;
        APP.passwordCloseIcon = `<svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>visibility-off</title><path d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.26 7.61 16.99 4.5 11.99 4.5C10.59 4.5 9.25 4.75 8.01 5.2L10.17 7.36C10.74 7.13 11.35 7 12 7ZM2 4.27L4.28 6.55L4.74 7.01C3.08 8.3 1.78 10.02 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.8 19.08L19.73 22L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z" fill="currentColor"></path></svg>`;
        APP.settingsPopupElement = `<div class="popupInit accessKeyPopup" style="opacity: 0; overflow: auto; width: 100%; height: 100%; top: 0px; visibility: visible; position: fixed; box-sizing: border-box; background-color: rgba(0, 0, 0, 0.32); z-index: 0; left: 0px; transition: 0.1s;"><div class="popupInitIn" role="dialog" style="width: 100%;min-height: 100%;height: 600px;justify-content: center;flex-direction: column;box-sizing: border-box;display: flex;align-items: center;" onclick="$(event.target).attr('class') == $('.accessKeyPopup .popupInitIn').attr('class') ? APP.settingsPopupClose() : '';"><div class="popupInitBody" data-animate-modal-popup="true" style="opacity: 1; transform: scaleX(0) scaleY(0); padding: 22px 24px 20px; overflow: hidden; width: 400px; box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 18px 0px, rgba(0, 0, 0, 0.1) 0px 8px 10px 0px; flex-direction: column; flex: 0 0 auto; box-sizing: border-box; display: flex; border-radius: 18px; background-color: rgb(255, 255, 255); transition: 0.3s;"><div class="popupInitBodyOut" data-animate-modal-body="true" style=" flex-shrink: 1; white-space: normal; position: relative; word-wrap: break-word; flex-basis: 100%; flex-grow: 1; "><div class="popupInitBodyIn" style=" font-size: .8875rem; line-height: 1.43; "><div class="popupInitBodyMain" style=" display: flex; flex-direction: column; flex-wrap: nowrap; align-self: auto; justify-self: auto; min-width: 0; min-height: 0; "> <div class="popupInitBodyMainIn" style=" "> <div class="popupInitBodyTitle" style="min-width: 0;min-height: 0;flex-shrink: 1;flex-wrap: nowrap;flex-basis: auto;align-self: center;order: 0;flex-grow: 0;justify-self: auto;width: 100%;text-align: left;padding-left: 15px;padding-bottom: 20px;"><div class="popupInitBodyTitleText" style=" padding-top: 20px; color: #0a0a0a; font-size: 1.1875rem; line-height: 1.4737; font-weight: 600; ">Enter your access token</div></div> <div style="padding-bottom: 12px;min-width: 0;min-height: 0;padding-top: 20px;padding-left: 8px;flex-shrink: 1;flex-wrap: nowrap;align-self: stretch;flex-basis: auto;padding-right: 8px;order: 0;flex-grow: 0;justify-self: auto;" padding="40,8,12,8" class="popupInitBodyInputOut"><div class="popupInitBodyInputIn" style=" min-width: 150px; border-bottom-width: 1px; border-bottom-style: solid; padding-bottom: 1px; border-bottom-color: #959393; background-color: #fff; display: flex; position: relative; "><input class="popupInitBodyInput" placeholder="Access Token" type="password" fdprocessedid="43n9wk" style=" border-bottom-style: unset; border-top-width: unset; border-top-style: unset; border-bottom-width: unset; overflow-x: hidden; padding-top: 6px; border-top-color: unset; border-bottom-color: unset; overflow-y: hidden; padding-bottom: 6px; color: var(--primary); padding-right: 6px; border-left-width: unset; background-color: #fff; border-right-color: unset; border-left-style: unset; border-left-color: unset; font-size: 1rem; border-right-width: unset; flex-grow: 1; padding-left: 6px; border-right-style: unset; outline: none; -webkit-user-select: text; margin: 0; font-family: &quot;Segoe UI&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, &quot;Lucida Grande&quot;, Arial, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, sans-serif; "><button class="popupInitBodyInputButton" tabindex="0" type="button" aria-label="Show" style=" margin: 0; font-family: &quot;Segoe UI&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, &quot;Lucida Grande&quot;, Arial, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, sans-serif; background: none; border: 0; outline: none; padding: 0; font-size: 100%; cursor: pointer; color: inherit; " onclick="$('.accessKeyPopup .popupInitBodyInput').attr('type') == 'text' ? $('.accessKeyPopup .popupInitBodyInput').attr('type', 'password').parent().find('.popupInitBodyInputButtonSpan').html(APP.passwordCloseIcon) : $('.accessKeyPopup .popupInitBodyInput').attr('type', 'text').parent().find('.popupInitBodyInputButtonSpan').html(APP.passwordOpenIcon);"><span aria-hidden="true" data-icon="visibility-off" class="popupInitBodyInputButtonSpan" style=" color: #1daa61; "><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>visibility-off</title><path d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.26 7.61 16.99 4.5 11.99 4.5C10.59 4.5 9.25 4.75 8.01 5.2L10.17 7.36C10.74 7.13 11.35 7 12 7ZM2 4.27L4.28 6.55L4.74 7.01C3.08 8.3 1.78 10.02 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.8 19.08L19.73 22L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z" fill="currentColor"></path></svg></span></button></div><div class="" style=" padding-top: 4px; display: flex; flex-direction: row; "><div>&nbsp;</div></div></div> </div> <div class="popupInitBodyMainOut popupInitBodyTitle" style="min-width: 0;min-height: 0;flex-shrink: 1;flex-wrap: nowrap;flex-basis: auto;align-self: center;order: 0;flex-grow: 0;justify-self: auto;width: 100%;text-align: left;padding-left: 15px;padding-bottom: 20px;display: none;"><div class="popupInitBodyTitleText" style=" padding-top: 20px; color: #0a0a0a; font-size: 1.1875rem; line-height: 1.4737; font-weight: 600; ">Saving...</div></div><div class="popupBottomDiv" paddingtop="20" style="min-width: 0px;min-height: 0px;padding-top: 20px;flex-flow: row;place-self: stretch auto;flex-basis: auto;display: flex;column-gap: 16px;order: 0;align-items: flex-start;flex-grow: 0;justify-content: flex-end;"><button class="popupBottomCloseButton" fdprocessedid="arjw17" style="margin: 0;font-family: &quot;Segoe UI&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, &quot;Lucida Grande&quot;, Arial, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, sans-serif;background: none;border: 0;outline: none;border-bottom-width: 1px;padding-top: 10px;border-top-color: transparent;border-bottom-style: solid;padding-bottom: 10px;border-top-width: 1px;border-bottom-color: transparent;border-top-style: solid;line-height: 1.1429;border-left-width: 1px;padding-right: 24px;white-space: nowrap;border-right-style: solid;border-right-color: transparent;border-right-width: 1px;font-weight: 500;border-top-right-radius: 24px;transition-property: all;padding-left: 24px;transition-timing-function: ease-out;transition-duration: .18s;border-bottom-left-radius: 24px;background-color: #f7f5f3;border-left-style: solid;border-top-left-radius: 24px;display: inline-block;position: relative;border-bottom-right-radius: 24px;color: #00000099;outline-offset: 2px;border-left-color: transparent;font-size: .875rem;cursor: pointer;" onclick="$('.accessKeyPopup .popupInitIn').click();"><div class="popupBottomCloseButtonDiv"><div class="popupBottomCloseButtonText" gap="8" style="flex-grow: 1;">Cancel</div></div></button><button class="popupBottomSaveButton" fdprocessedid="u1g4au" style="margin: 0;font-family: &quot;Segoe UI&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, &quot;Lucida Grande&quot;, Arial, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, sans-serif;background: none;border: 0;outline: none;border-bottom-width: 1px;padding-top: 10px;border-top-color: transparent;border-bottom-style: solid;padding-bottom: 10px;border-top-width: 1px;border-bottom-color: transparent;border-top-style: solid;line-height: 1.1429;border-left-width: 1px;padding-right: 24px;white-space: nowrap;border-right-style: solid;border-right-color: transparent;border-right-width: 1px;font-weight: 500;border-top-right-radius: 24px;transition-property: all;padding-left: 24px;transition-timing-function: ease-out;transition-duration: .18s;border-bottom-left-radius: 24px;background-color: #1daa61;border-left-style: solid;border-top-left-radius: 24px;display: inline-block;position: relative;border-bottom-right-radius: 24px;color: #fff;outline-offset: 2px;border-left-color: transparent;font-size: .875rem;cursor: pointer;" onclick="APP.saveAccessToken($('.accessKeyPopup .popupInitBodyInput').val());"><div class="popupBottomSaveButtonDiv"><div class="popupBottomSaveButtonText" gap="8" style="flex-grow: 1;">Save</div></div></button></div></div></div></div></div></div></div>`;
        $("body").append(APP.settingsPopupElement);
        
        APP.credential = await ZOHO.CRM.API.getOrgVariable(APP.extensionAPIAt).then(function(apiKeyData){
            if(apiKeyData && apiKeyData.Success && apiKeyData.Success.Content && apiKeyData.Success.Content != "0"){
                return JSON.parse(apiKeyData.Success.Content);
            }
            else {
                return {};
            }
        });

        APP.at = APP.credential[APP.extensionAPIAt];
        $('.accessKeyPopup .popupInitBodyInput').val(APP.at);
        await APP.renderWhatsappTemplates();
    },
    settingsPopupOpen: function() {
        $('.accessKeyPopup.popupInit').css('opacity', '1').css('z-index', '800').find('.popupInitBody').css('transform', 'scaleX(1) scaleY(1)');
        $('.accessKeyPopup .popupInitBodyInput').focus();
    },
    settingsPopupClose: function() {
        $('.accessKeyPopup.popupInit').css('opacity', '0').css('z-index', '0').find('.popupInitBody').css('transform', 'scaleX(0) scaleY(0)');
    },
    saveAccessToken: async function(accesskey) {
        accesskey = accesskey.trim();
        if(!accesskey) return;
        let value = {};
        value[APP.extensionAPIAt] = accesskey;
        $(".accessKeyPopup .popupInitBodyMainIn").css("display", "none");
        $(".accessKeyPopup .popupInitBodyMainOut").css("display", "block");        
        $(".accessKeyPopup .popupInitBodyMainOut .popupInitBodyTitleText").text("Saving...");
        return await ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", {"apiname": APP.extensionAPIAt, "value": value}).then(async function(res) {
            if(res && JSON.parse(res) && JSON.parse(res).status_code && JSON.parse(res).status_code == "200"){
                APP.at = accesskey;
                $(".accessKeyPopup .popupInitBodyMainOut .popupInitBodyTitleText").text("Saved");
                setTimeout(function() {
                    if($(".accessKeyPopup .popupInitBodyMain").is(":visible")) {
                        APP.settingsPopupClose();
                        $(".accessKeyPopup .popupInitBodyMainIn").css("display", "block");
                        $(".accessKeyPopup .popupInitBodyMainOut").css("display", "none");
                        $(".accessKeyPopup .popupInitBodyMainOut .popupInitBodyTitleText").text("Saving...");
                    }
                }, 1000);
                await APP.renderWhatsappTemplates();
                return true;
            }
            else {
                $(".accessKeyPopup .popupInitBodyMainOut .popupInitBodyTitleText").text("Failed");
                setTimeout(function() {
                    if($(".accessKeyPopup .popupInitBodyMain").is(":visible")) {
                        APP.settingsPopupClose();
                        $(".accessKeyPopup .popupInitBodyMainIn").css("display", "block");
                        $(".accessKeyPopup .popupInitBodyMainOut").css("display", "none");
                        $(".accessKeyPopup .popupInitBodyMainOut .popupInitBodyTitleText").text("Saving...");
                    }
                }, 1000);
                return false;
            }
        });
    },
    addNumberPopup: function() {
        APP.passwordOpenIcon = `<svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>visibility-on</title><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12Z" fill="currentColor"></path></svg>`;
        APP.passwordCloseIcon = `<svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>visibility-off</title><path d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.26 7.61 16.99 4.5 11.99 4.5C10.59 4.5 9.25 4.75 8.01 5.2L10.17 7.36C10.74 7.13 11.35 7 12 7ZM2 4.27L4.28 6.55L4.74 7.01C3.08 8.3 1.78 10.02 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.8 19.08L19.73 22L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z" fill="currentColor"></path></svg>`;
        APP.settingsPopupElement = `<div class="popupInit addNumberPopup" style="opacity: 0; overflow: auto; width: 100%; height: 100%; top: 0px; visibility: visible; position: fixed; box-sizing: border-box; background-color: rgba(0, 0, 0, 0.32); z-index: 0; left: 0px; transition: 0.1s;"><div class="popupInitIn" role="dialog" style="width: 100%;min-height: 100%;height: 600px;justify-content: center;flex-direction: column;box-sizing: border-box;display: flex;align-items: center;" onclick="$(event.target).attr('class') == $('.addNumberPopup .popupInitIn').attr('class') ? APP.addNumberPopupClose() : '';"><div class="popupInitBody" data-animate-modal-popup="true" style="opacity: 1; transform: scaleX(0) scaleY(0); padding: 22px 24px 20px; overflow: hidden; width: 400px; box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 18px 0px, rgba(0, 0, 0, 0.1) 0px 8px 10px 0px; flex-direction: column; flex: 0 0 auto; box-sizing: border-box; display: flex; border-radius: 18px; background-color: rgb(255, 255, 255); transition: 0.3s;"><div class="popupInitBodyOut" data-animate-modal-body="true" style=" flex-shrink: 1; white-space: normal; position: relative; word-wrap: break-word; flex-basis: 100%; flex-grow: 1; "><div class="popupInitBodyIn" style=" font-size: .8875rem; line-height: 1.43; "><div class="popupInitBodyMain" style=" display: flex; flex-direction: column; flex-wrap: nowrap; align-self: auto; justify-self: auto; min-width: 0; min-height: 0; "> <div class="popupInitBodyMainIn" style=" "> <div class="popupInitBodyTitle" style="min-width: 0;min-height: 0;flex-shrink: 1;flex-wrap: nowrap;flex-basis: auto;align-self: center;order: 0;flex-grow: 0;justify-self: auto;width: 100%;text-align: left;padding-left: 15px;padding-bottom: 20px;"><div class="popupInitBodyTitleText" style=" padding-top: 20px; color: #0a0a0a; font-size: 1.1875rem; line-height: 1.4737; font-weight: 600; ">Enter your access token</div></div> <div style="padding-bottom: 12px;min-width: 0;min-height: 0;padding-top: 20px;padding-left: 8px;flex-shrink: 1;flex-wrap: nowrap;align-self: stretch;flex-basis: auto;padding-right: 8px;order: 0;flex-grow: 0;justify-self: auto;" padding="40,8,12,8" class="popupInitBodyInputOut"><div class="popupInitBodyInputIn" style=" min-width: 150px; border-bottom-width: 1px; border-bottom-style: solid; padding-bottom: 1px; border-bottom-color: #959393; background-color: #fff; display: flex; position: relative; "><input class="popupInitBodyInput" placeholder="Access Token" type="password" fdprocessedid="43n9wk" style=" border-bottom-style: unset; border-top-width: unset; border-top-style: unset; border-bottom-width: unset; overflow-x: hidden; padding-top: 6px; border-top-color: unset; border-bottom-color: unset; overflow-y: hidden; padding-bottom: 6px; color: var(--primary); padding-right: 6px; border-left-width: unset; background-color: #fff; border-right-color: unset; border-left-style: unset; border-left-color: unset; font-size: 1rem; border-right-width: unset; flex-grow: 1; padding-left: 6px; border-right-style: unset; outline: none; -webkit-user-select: text; margin: 0; font-family: &quot;Segoe UI&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, &quot;Lucida Grande&quot;, Arial, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, sans-serif; "><button class="popupInitBodyInputButton" tabindex="0" type="button" aria-label="Show" style=" margin: 0; font-family: &quot;Segoe UI&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, &quot;Lucida Grande&quot;, Arial, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, sans-serif; background: none; border: 0; outline: none; padding: 0; font-size: 100%; cursor: pointer; color: inherit; " onclick="$('.addNumberPopup .popupInitBodyInput').attr('type') == 'text' ? $('.addNumberPopup .popupInitBodyInput').attr('type', 'password').parent().find('.popupInitBodyInputButtonSpan').html(APP.passwordCloseIcon) : $('.addNumberPopup .popupInitBodyInput').attr('type', 'text').parent().find('.popupInitBodyInputButtonSpan').html(APP.passwordOpenIcon);"><span aria-hidden="true" data-icon="visibility-off" class="popupInitBodyInputButtonSpan" style=" color: #1daa61; "><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>visibility-off</title><path d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.26 7.61 16.99 4.5 11.99 4.5C10.59 4.5 9.25 4.75 8.01 5.2L10.17 7.36C10.74 7.13 11.35 7 12 7ZM2 4.27L4.28 6.55L4.74 7.01C3.08 8.3 1.78 10.02 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.8 19.08L19.73 22L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z" fill="currentColor"></path></svg></span></button></div><div class="" style=" padding-top: 4px; display: flex; flex-direction: row; "><div>&nbsp;</div></div></div> </div> <div class="popupInitBodyMainOut popupInitBodyTitle" style="min-width: 0;min-height: 0;flex-shrink: 1;flex-wrap: nowrap;flex-basis: auto;align-self: center;order: 0;flex-grow: 0;justify-self: auto;width: 100%;text-align: left;padding-left: 15px;padding-bottom: 20px;display: none;"><div class="popupInitBodyTitleText" style=" padding-top: 20px; color: #0a0a0a; font-size: 1.1875rem; line-height: 1.4737; font-weight: 600; ">Saving...</div></div><div class="popupBottomDiv" paddingtop="20" style="min-width: 0px;min-height: 0px;padding-top: 20px;flex-flow: row;place-self: stretch auto;flex-basis: auto;display: flex;column-gap: 16px;order: 0;align-items: flex-start;flex-grow: 0;justify-content: flex-end;"><button class="popupBottomCloseButton" fdprocessedid="arjw17" style="margin: 0;font-family: &quot;Segoe UI&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, &quot;Lucida Grande&quot;, Arial, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, sans-serif;background: none;border: 0;outline: none;border-bottom-width: 1px;padding-top: 10px;border-top-color: transparent;border-bottom-style: solid;padding-bottom: 10px;border-top-width: 1px;border-bottom-color: transparent;border-top-style: solid;line-height: 1.1429;border-left-width: 1px;padding-right: 24px;white-space: nowrap;border-right-style: solid;border-right-color: transparent;border-right-width: 1px;font-weight: 500;border-top-right-radius: 24px;transition-property: all;padding-left: 24px;transition-timing-function: ease-out;transition-duration: .18s;border-bottom-left-radius: 24px;background-color: #f7f5f3;border-left-style: solid;border-top-left-radius: 24px;display: inline-block;position: relative;border-bottom-right-radius: 24px;color: #00000099;outline-offset: 2px;border-left-color: transparent;font-size: .875rem;cursor: pointer;" onclick="$('.addNumberPopup .popupInitIn').click();"><div class="popupBottomCloseButtonDiv"><div class="popupBottomCloseButtonText" gap="8" style="flex-grow: 1;">Cancel</div></div></button><button class="popupBottomSaveButton" fdprocessedid="u1g4au" style="margin: 0;font-family: &quot;Segoe UI&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, &quot;Lucida Grande&quot;, Arial, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, sans-serif;background: none;border: 0;outline: none;border-bottom-width: 1px;padding-top: 10px;border-top-color: transparent;border-bottom-style: solid;padding-bottom: 10px;border-top-width: 1px;border-bottom-color: transparent;border-top-style: solid;line-height: 1.1429;border-left-width: 1px;padding-right: 24px;white-space: nowrap;border-right-style: solid;border-right-color: transparent;border-right-width: 1px;font-weight: 500;border-top-right-radius: 24px;transition-property: all;padding-left: 24px;transition-timing-function: ease-out;transition-duration: .18s;border-bottom-left-radius: 24px;background-color: #1daa61;border-left-style: solid;border-top-left-radius: 24px;display: inline-block;position: relative;border-bottom-right-radius: 24px;color: #fff;outline-offset: 2px;border-left-color: transparent;font-size: .875rem;cursor: pointer;" onclick="APP.saveAccessToken($('.addNumberPopup .popupInitBodyInput').val());"><div class="popupBottomSaveButtonDiv"><div class="popupBottomSaveButtonText" gap="8" style="flex-grow: 1;">Save</div></div></button></div></div></div></div></div></div></div>`;
        $("body").append(APP.settingsPopupElement);
    },
    addNumberPopupOpen: function() {
        $('.addNumberPopup.popupInit').css('opacity', '1').css('z-index', '900').find('.popupInitBody').css('transform', 'scaleX(1) scaleY(1)');
        $('.addNumberPopup .popupInitBodyInput').focus();
    },
    addNumberPopupClose: function() {
        $('.addNumberPopup.popupInit').css('opacity', '0').css('z-index', '0').find('.popupInitBody').css('transform', 'scaleX(0) scaleY(0)');
    },
    updateSendModeType: function(type){
        $(".whatsapp-container").removeClass(APP.sendModeType);
        $(".whatsapp-container").addClass(type);
        APP.sendModeType = type;
        APP.isBulk = type == "bulk"? true: false;
        APP.resetBulkInitConfigs();
        // console.log("current send mode: "+ APP.sendModeType);
    },
    resetBulkInitConfigs: function(){
        APP.resetMessageInputContainer();
        $(".selectAll-checkbox-inp").prop("checked", false);
        $(".contact-checkbox").prop("checked", false);
        APP.selectedContacts = [];
        if(APP.initialChatDiv) APP.initialChatDiv.remove();
        if(APP.isBulk){
            if($(".bulk-selected-chats-list-div-text").length) return;
            //show initial selected chats name and number list. hide chat-header, messages-container. and here show list of selected contacts
            $(".chat-header").hide();
            $(".messages-container").hide();
            $("#chat-area").prepend(`
                <div class="bulk-selected-chats-list-div">
                    <div class="bulk-selected-chats-list-div-inner">
                        <div class="bulk-selected-chats-list-div-text">You have selected ${APP.selectedContacts.length} contacts.</div>
                        <div class="selected-chats-list"></div>
                    </div>
                </div>
            `);
        }
        else{
            $(".chat-header").show();
            $(".messages-container").show();
            $(".bulk-selected-chats-list-div").remove();
            if(APP.initialChatDiv) {
                document.getElementById("chat-area").insertAdjacentHTML("afterbegin", `<div class="initialChatDiv">Start Conversation</div>`);
                APP.initialChatDiv = document.querySelector(".initialChatDiv");
            }
        }
    },

    resetMessageInputContainer: function(){
        APP.selectedTemplate = null;
        $("#message-input").html("");
        $("#templates-placeholders").empty();
        $("#templates-placeholders").hide();
        APP.removeReplyTagMessage();
        $("#templates-list-outer").hide();
    },

    handleBulkSelectAllCheckboxOnChange: function(){
        const isChecked = $(".selectAll-checkbox-inp").is(":checked");
        $(".contact-checkbox").prop("checked", isChecked);
        if (isChecked) {
            $(".contact-checkbox").map(function () {
                let contactId = $(this).data("id").toString();
                if(!APP.selectedContacts.includes(contactId)) APP.selectedContacts.push(contactId);
                APP.renderSelectedBulkContacts(contactId);
                return contactId
            }).get();
        } 
        else {
            APP.selectedContacts = [];
            APP.renderSelectedBulkContacts(null, false);
        }
        // console.log("Bulk selection updated:", APP.selectedContacts);
    },
    
    handleOnContactSelectionOnChange: function(contactId, isChecked){
        contactId = contactId.toString();
        if(isChecked && !APP.selectedContacts.includes(contactId)){
            APP.selectedContacts.push(contactId);
            APP.renderSelectedBulkContacts(contactId);
        }
        else{
            APP.selectedContacts = APP.selectedContacts.filter(function(contact) {
                return contact !== contactId;
            });
            APP.renderSelectedBulkContacts(contactId, false);
        }
        const allChecked = $(".contact-checkbox").length === APP.selectedContacts.length;
        $(".selectAll-checkbox-inp").prop("checked", allChecked); 
    },

    renderSelectedBulkContacts: function(contactId, isChecked = true){
        const contact = APP.contacts[contactId];
        const selectedChatsList = document.querySelector(".selected-chats-list");
        $(".bulk-selected-chats-list-div-text").text(`You have selected ${APP.selectedContacts.length} contacts.`);
        if(!APP.isBulk) return;
        if(!isChecked){
            contactId? document.querySelector(`.selected-chat-div.contact_${contactId}`).remove(): selectedChatsList.innerHTML = "";
            return;
        }
        if(contact && !document.querySelector(`.selected-chat-div.contact_${contactId}`)){
            const chatDiv = document.createElement("div");
            chatDiv.className = `selected-chat-div contact_${contactId}`;
            chatDiv.innerHTML = `<div class="selected-chat-div-inner">
                <div class="selected-chat-div-text">${contactId}</div>
            </div>`;
            selectedChatsList.appendChild(chatDiv);
        }
        
    },
    
    renderLoaderPopupForBulkSending: function() {
        let loaderPopup = document.createElement('div');
        loaderPopup.className = 'loader-popup';
        loaderPopup.innerHTML = `
            <div class="loader-popup-inner">
                <div class="loader-popup-content">
                    <div class="loader-popup-header">
                        <span class="loader-popup-title">Messages sending to all selected contacts...</span>
                    </div>
                    <div class="loader-popup-body">
                        <p>Please wait while we process your messages.</p>
                    </div>
                </div>
            </div>
        `;
        document.querySelector("body").appendChild(loaderPopup);
    }, 

    closeLoaderPopupForBulkSending: function() {
        let loaderPopup = document.querySelector('.loader-popup');
        if (loaderPopup) {
            loaderPopup.remove();
        }
    },

    // fetch whatsapp business api templates using api and render these list in ui and send to message
    fetchTemplates: async function() {
        try {
            let request = {
                url : `https://graph.facebook.com/v22.0/1424878765161652/message_templates`,
                headers: { 
                    "Authorization": "Bearer "+APP.at
                }
            };
            
            await ZOHO.CRM.HTTP.get(request).then(async function(resp) {
                // console.log(resp);
                if(resp && JSON.parse(resp) && JSON.parse(resp).data && JSON.parse(resp).data.length > 0){
                    let templates = JSON.parse(resp).data;
                    // console.log(templates);
                    templates.forEach( async (template) => {
                        template.display_name = template.name.replace(/_/g, " ");
                        template.display_text_content = "";
                        let previewContent = "";
                        template.components.forEach((component) => {
                            if (component.type === "HEADER" && component.text) {
                              previewContent += `${component.text}`;
                            }
                            if (component.type === "BODY" && component.text) {
                              previewContent += `${component.text}`;
                            }
                            if (component.type === "FOOTER" && component.text) {
                              previewContent += `${component.text}`;
                            }
                            if (component.type === "BUTTONS") {
                              component.buttons.forEach((button) => {
                                previewContent += `${button.text}`;
                              });
                            }
                        });
                        template.display_text_content = previewContent;
                        let placeholders = await APP.getPlaceHoldersListFromTemplate(template);
                        template.placeholders = placeholders;
                        template = await APP.PlaceholderValuesInMessageText(template);
                        APP.whatsappTemplates[template.name] = template;
                    });
                }
                else{
                    // console.log("error in fetching templates");
                }
            });
        } 
        catch (error) {
            console.error('Error fetching templates:', error.message);
            return;
        }
    },

    getPlaceHoldersListFromTemplate: async function(template) {
        let placeholders = [];
        if(template && template.components && template.components.length > 0){
            template.components.forEach((component) => {
                if (component.type === "HEADER" && component.text) {
                    let headerText = component.text;
                    let matches = headerText.match(/{{(.*?)}}/g);
                    if (matches) {
                        matches.forEach((match) => {
                            placeholders.push({
                                name: match.replace(/{{|}}/g, ""),
                                type: component.type.toLowerCase()
                            });
                        });
                    }
                }
                if (component.type === "BODY" && component.text) {
                    let bodyText = component.text;
                    let matches = bodyText.match(/{{(.*?)}}/g);
                    if (matches) {
                        matches.forEach((match) => {
                            placeholders.push({
                                name: match.replace(/{{|}}/g, ""),
                                type: component.type.toLowerCase()
                            });
                        });
                    }
                }
                if (component.type === "FOOTER" && component.text) {
                    let footerText = component.text;
                    let matches = footerText.match(/{{(.*?)}}/g);
                    if (matches) {
                        matches.forEach((match) => {
                            placeholders.push({
                                name: match.replace(/{{|}}/g, ""),
                                type: component.type.toLowerCase()
                            });
                        });
                    }
                }
                if (component.type === "BUTTONS") {
                    component.buttons.forEach((button) => {
                        let buttonText = button.text;
                        let matches = buttonText.match(/{{(.*?)}}/g);
                        if (matches) {
                            matches.forEach((match) => {
                                placeholders.push({
                                    name: match.replace(/{{|}}/g, ""),
                                    type: component.type.toLowerCase()
                                });
                            });
                        }
                    });
                }
            });
        }
        return placeholders;
    },

    renderWhatsappTemplates: async function(templates) {
        await APP.fetchTemplates();
        document.getElementById("templates-list-outer").innerHTML = "";
        if(Object.keys(APP.whatsappTemplates).length == 0){
            // console.log("No templates available");
            return;
        }
        let templateList = document.createElement('div');
        templateList.className = 'templates-list-innr';
        Object.keys(APP.whatsappTemplates).forEach(template => {
            let templateData = APP.whatsappTemplates[template];
            let templateItem = document.createElement('div');
            templateItem.className = 'template-item';
            templateItem.innerHTML = `<div class="template-name" onclick="APP.handleTemplateOnClick('${template}')">${templateData.display_name}</div>`;
            templateList.appendChild(templateItem);
        });
        document.getElementById("templates-list-outer").appendChild(templateList);
    },

    showWhatsappTemplates: function(event) {
        // event.preventDefault();
        // event.stopPropagation();
        // $("#templates-list-outer").toggle();
        // return;
    },

    handleTemplateOnClick: function(templateName) {
        $("#templates-list-outer").hide();
        let template = JSON.parse(JSON.stringify(APP.whatsappTemplates[templateName]));
        if(template){
            // console.log("Selected template: ", template);
            let clearTemplateBtn = `<div class="clear-template-btn" onclick="APP.resetMessageInputContainer();">x</div>`;
            APP.selectedTemplate = template;
            template.display_text_content = template.display_text_content.trim().replace(/\n/g, "<br>");
            $("#message-input").html(template.name);
            $("#templates-placeholders").empty();
            $("#templates-placeholders").show();
            $("#templates-placeholders").html(`${clearTemplateBtn}${template.display_html_content}`);
            // if(template.placeholders){
            //     template = APP.PlaceholderValuesInMessageText(template);
            //     $("#templates-placeholders").html(`${clearTemplateBtn}${template.display_html_content}`);
            //     // let placeholders = template.placeholders;
            //     // let placeholderInputs = "";
            //     // placeholders.forEach((placeholder) => {
            //     //     placeholderInputs += `<input type="text" data-id="${placeholder.name}" data-type="${placeholder.type}" class="template-placeholder-input" placeholder="{{${placeholder.name}}}" />`;
            //     // });
            // }
        }
        else{
            console.log("Template not found");
        }
    },

    getAllCurrentTemplateParameters: function() {
        const components = [];
        let isNotValid = false;
        $(".template-placeholder-input").each(function () {
            const sectionType = $(this).data("type"); 
            const parameterName = $(this).data("id"); 
            const parameterValue = $(this).val();
            if(!parameterValue) {
                isNotValid = true;
                return false;
            }
            let section = components.find(comp => comp.type === sectionType);
            if (!section) {
                section = { type: sectionType, parameters: [] };
                components.push(section);
            }
    
            section.parameters.push({
                type: "text", 
                text: parameterValue,
                parameter_name: parameterName
            });
        });
    
        return isNotValid? false: components;
    },
    updatePlaceholderValuesInMessageText: function(messageText) {
        let updatedText = messageText;
        $(".template-placeholder-input").each(function () {
            const parameterName = $(this).data("id"); 
            const parameterValue = $(this).val(); 
            updatedText = updatedText.replace(`{{${parameterName}}}`, parameterValue);
        });
        return updatedText;
    },
    PlaceholderValuesInMessageText: function(template) {
        if(template.placeholders) {
            let headerContent = "";
            let bodyContent = "";
            let footerContent = "";
            let buttonContent = "";
            template.components.forEach((component) => {
                if(component.type == "HEADER") {
                    headerContent = component.text;
                }
                else if(component.type == "BODY") {
                    bodyContent = component.text;
                }
                else if(component.type == "FOOTER") {
                    footerContent = component.text;
                }
                else if(component.type == "BUTTONS") {
                    component.buttons.forEach((button) => {
                        buttonContent += `<span>${button.text}</span>`;
                    });
                }
            });
            template.placeholders.forEach((placeholder) => {
                if(placeholder.type == "header") {
                    headerContent = headerContent.replace(`{{${placeholder.name}}}`, `<input type="text" data-id="${placeholder.name}" data-type="${placeholder.type}" class="template-placeholder-input" placeholder="{{${placeholder.name}}}" />`);
                }
                else if(placeholder.type == "body") {
                    bodyContent = bodyContent.replace(`{{${placeholder.name}}}`, `<input type="text" data-id="${placeholder.name}" data-type="${placeholder.type}" class="template-placeholder-input" placeholder="{{${placeholder.name}}}" />`);
                }
                else if(placeholder.type == "footer") {
                    footerContent = footerContent.replace(`{{${placeholder.name}}}`, `<input type="text" data-id="${placeholder.name}" data-type="${placeholder.type}" class="template-placeholder-input" placeholder="{{${placeholder.name}}}" />`);
                }
            });
            let messageContent = "";
            if(headerContent) {
                messageContent += `<div class="mesgtemplateShowDiv mesgtemplateShowHeader">${headerContent}</div>`;
            }
            if(bodyContent) {
                messageContent += `<div class="mesgtemplateShowDiv mesgtemplateShowBody">${bodyContent}</div>`;
            }
            if(footerContent) {
                messageContent += `<div class="mesgtemplateShowDiv mesgtemplateShowFooter">${footerContent}</div>`;
            }
            if(buttonContent) {
                messageContent += `<div class="mesgtemplateShowDiv mesgtemplateShowButton">${buttonContent}</div>`;
            }
            template.display_html_content = messageContent;
        }
        return template;
    },
    handleReplyMessageBtnOnClick: function(messageId, contactId, returnElem=false) {
        // add message content to message-reply-tag element in ui.
        if(!messageId) return;
        if(APP.currentContactId != contactId) return;
        if(!APP.contacts[contactId].messages[messageId]) return;
        let message = APP.contacts[contactId].messages[messageId];
        let msgId = message[APP.extensionFieldMsgId] ? encodeURIComponent(message[APP.extensionFieldMsgId].replaceAll(".", "_").replaceAll("=", "-")) : "";
        
        if(message && message["whatsappbusiness0__WhatsApp_Message"]){
            let messageText = message["whatsappbusiness0__WhatsApp_Message"];
            if(messageText && messageText.length > 0){
                let replyDiv = document.querySelector("#message-reply-tag");
                let contentHTML = `<div class="reply-message-content">
                        <div class="reply-message-author">${message["whatsappbusiness0__Direction"]=="incoming" ? APP.currentContactId: "You"}</div>
                        <div class="reply-message-text">${messageText}</div>
                    </div>`
                let innerHTML = `<div class="message-reply-tag-inner">
                    ${contentHTML}
                    <div class="close-reply-message" onclick="APP.removeReplyTagMessage()">
                        <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none">
                            <title>close</title>
                            <path d="M19.77 6.23L17.54 4L12 9.54L6.46 4L4.23 6.23L9.77 12L4.23 17.77L6.46 20L12 14.46L17.54 20L19.77 17.77L14.23 12L19.77 6.23Z" fill="currentColor"></path>
                        </svg>    
                    </div>
                </div>`;

                if(returnElem) return contentHTML;
                APP.removeReplyTagMessage();
                APP.replyTagMessageId = messageId;
                replyDiv.innerHTML = innerHTML
                $("#message-reply-tag").show();
            }
        }
    },

    removeReplyTagMessage: function() {
        APP.replyTagMessageId = null;
        let replyDiv = document.querySelector("#message-reply-tag");
        replyDiv.innerHTML = "";
        $("#message-reply-tag").hide();
    },

    replyMessageUIContent: async function(messageId, contactId) {
        if(!messageId) return;
        if(APP.currentContactId != contactId) return;
        if(!APP.contacts[contactId].messages[messageId]) return;
        let message = APP.contacts[contactId].messages[messageId];
        if(!message[APP.extensionFieldReplyMessageId]) return;
        let replyMessageId = message[APP.extensionFieldReplyMessageId];
        if(!APP.contacts[contactId].messages[replyMessageId]) {
            await APP.fetchMessageRecordByID(replyMessageId, contactId);
            if(!APP.contacts[contactId].messages[replyMessageId]) return;
        };
        let msgId = message[APP.extensionFieldMsgId] ? encodeURIComponent(message[APP.extensionFieldMsgId].replaceAll(".", "_").replaceAll("=", "-")) : "";
        let replyMessageHTML = await APP.handleReplyMessageBtnOnClick(replyMessageId, contactId, true);
        let mensionDiv = $(`#${msgId} .message-content-main-div-in .reply-message-content-out`);
        if(mensionDiv){
            mensionDiv.prepend(`<div class="reply-message-content-in">${replyMessageHTML}</div>`);
        }
    },

    fetchMessageRecordByID: async function(messageId, contactId) {
        let searchCriteria = `(${APP.extensionFieldMsgId}:equals:${messageId})`; 
        return await ZOHO.CRM.API.searchRecord({
            Entity: "whatsappbusiness0__WhatsApp_Business_History", 
            Type: "criteria",
            Query: searchCriteria,
        })
        .then(function (response) {
            
            if (response && response.data) {
                // console.log("Search Results:", response.data);
                let record = response.data[0];
                if (record) {
                    APP.contacts[contactId].messages[messageId] = record;
                    return record;
                } 
                else {
                    // console.log("No matching records found.");
                    return null;
                }
            } 
            else {
                // console.log("No matching records found.");
                return null;
            }
        })
        .catch(function (error) {
            console.error("Error searching records:", error);
            return null;
        });
    },

    handleMessagesOrderBasedOnTimeInChat: function() {
        const messagesContainer = document.getElementById("messages-container");
        const messagesArray = Array.from(messagesContainer.getElementsByClassName("message-content"));
        messagesArray.sort((a, b) => {
            const timestampA = parseInt(a.querySelector(".message-time-out").getAttribute("data-timestamp"), 10);
            const timestampB = parseInt(b.querySelector(".message-time-out").getAttribute("data-timestamp"), 10);
            return timestampA - timestampB;
        });
        messagesContainer.innerHTML = ""; 
        messagesArray.forEach((message) => {
            messagesContainer.appendChild(message);
        });
    },

    formatDateForStickyDateLabel: function (dateInput) {
        const inputDate = new Date(Number(dateInput));
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const isToday = inputDate.toDateString() === today.toDateString();
        const isYesterday = inputDate.toDateString() === yesterday.toDateString();
        if (isToday) {
            return "Today";
        } 
        else if (isYesterday) {
            return "Yesterday";
        } 
        else {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return inputDate.toLocaleDateString(undefined, options);
        }
    },
    
    hideStickyDateLabelTimeout: null,
    updateStickyDateLabel: function () {
        const messagesContainer = document.getElementById('messages-container');
        const stickyDateLabel = document.getElementById('sticky-date-label');
        const messages = document.querySelectorAll('.message-content');
        const containerTop = messagesContainer.getBoundingClientRect().top;

        clearTimeout(APP.hideStickyDateLabelTimeout);

        for (const message of messages) {
            const rect = message.getBoundingClientRect();
            if (rect.top >= containerTop) {
                if (message.classList.contains('date-label')) {
                    stickyDateLabel.textContent = message.querySelector('.message-time-out').textContent;
                    stickyDateLabel.style.display = 'block';
                } 
                else {
                    const date = message.querySelector('.message-time-out').getAttribute('data-timestamp'); 
                    const dateLabel = APP.formatDateForStickyDateLabel(date);
                    if (dateLabel) {
                        stickyDateLabel.textContent = dateLabel;
                        stickyDateLabel.style.display = 'block';
                    } 
                    else {
                        stickyDateLabel.style.display = 'none'; 
                    }
                }
                APP.hideStickyDateLabelTimeout = setTimeout(() => {
                    stickyDateLabel.style.display = 'none';
                }, 2000);
                return;
            }
        }
        stickyDateLabel.style.display = 'none';
    },

    addDateLabel: function (date, direction = 'append') {
        const formattedDate = APP.formatDateForStickyDateLabel(date);
        if (formattedDate === APP.lastMessageLabelDate) return;

        const messagesContainer = document.getElementById('messages-container');

        const dateLabel = document.createElement('div');
        dateLabel.className = 'message-content date-label';
        dateLabel.innerHTML = `<div class="message-time-out" data-timestamp="${date}">${formattedDate}</div>`;
        dateLabel.setAttribute('data-date', formattedDate);

        if (direction === 'append' && !messagesContainer.querySelector(`.message-content.date-label[data-date="${formattedDate}"]`)) {
            messagesContainer.appendChild(dateLabel);
            APP.lastMessageLabelDate = formattedDate;
        } 
        else if (direction === 'prepend') {
            const firstChild = messagesContainer.firstChild;
            messagesContainer.insertBefore(dateLabel, firstChild);
            APP.firstMessageLabelDate = formattedDate;
        }
    },




    activeInput: null,
    triggerPos: 0,
    popupActive: false,
    contactFieldsForPlaceHolders: [],

    getFieldsPopupCaretPosition: function (input){
        return input.selectionStart;
    },

    setFieldsPopupCaretPosition: function (input, pos) {
        input.setSelectionRange(pos, pos);
        input.focus();
    },

    filterCRMFieldsInPlaceholderPopup: function (query) {
        if (!query) {
            return APP.contactFieldsForPlaceHolders;
        }
        if(query.startsWith("#")){
            query = query.substring(1);
        }
        let result = APP.contactFieldsForPlaceHolders.filter((field) =>
            field.toLowerCase().startsWith(query.toLowerCase())
        );
        return result.length? result: APP.contactFieldsForPlaceHolders;
    },

    showCRMFieldsPlaceholderPopup: function (x, y, fields) {
        const fieldsPopup = document.getElementById("fields-popup");
        fieldsPopup.innerHTML = `<ul>${fields .map((field, index) => `<li data-index="${index}">${field}</li>`) .join("")}</ul>`;
        
        fieldsPopup.style.display = "block";
        fieldsPopup.style.left = `${x}px`;
        fieldsPopup.style.top = `calc(${y}px - ${fieldsPopup.offsetHeight}px - 50px)`;
        APP.popupActive = true;
    },

    hideCRMFieldsPlaceholderPopup: function() {
        const fieldsPopup = document.getElementById("fields-popup");
        fieldsPopup.style.display = "none";
        APP.popupActive = false;
        APP.activeInput = null;
        APP.triggerPos = 0;
    },

    startListenerForCRMFieldsPlaceholder: function() {
        const chatBox = document.querySelector(".chat-area");
        const fieldsPopup = document.getElementById("fields-popup");

        chatBox.addEventListener("keydown", (e) => {
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
                APP.activeInput = e.target;

                if (e.key === "#") {
                    APP.triggerPos = APP.getFieldsPopupCaretPosition(APP.activeInput);
                    APP.popupActive = true;

                    const rect = APP.activeInput.getBoundingClientRect();
                    const lineHeight = 20;
                    APP.showCRMFieldsPlaceholderPopup( rect.left, rect.top + rect.height + lineHeight, APP.contactFieldsForPlaceHolders );
                }

                if (APP.popupActive) {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        const selectedField = fieldsPopup.querySelector("li.selected");
                        if (selectedField) {
                            APP.handleFieldSelection(selectedField.textContent);
                        }
                    }

                    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                        e.preventDefault();
                        const items = Array.from(fieldsPopup.querySelectorAll("li"));
                        const selectedIndex = items.findIndex((item) => item.classList.contains("selected") );
                        items.forEach((item) => item.classList.remove("selected"));
                        let newIndex = e.key === "ArrowDown" ? (selectedIndex + 1) % items.length : (selectedIndex - 1 + items.length) % items.length;
                        items[newIndex].classList.add("selected");
                    }
                }

                if (e.key === "Backspace" || e.key === "Delete") {
                    const cursorPos = APP.getFieldsPopupCaretPosition(APP.activeInput);
                    const value = APP.activeInput.value;
                    const textAfterTrigger = value.substring(APP.triggerPos, cursorPos);
                    if (APP.popupActive && textAfterTrigger === "") {
                        APP.hideCRMFieldsPlaceholderPopup();
                    }
                }
            }
        });
        
        // Handle input for filtering popup
        chatBox.addEventListener("input", (e) => {
            if (APP.popupActive && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) {
                const cursorPos = APP.getFieldsPopupCaretPosition(APP.activeInput);
                const value = APP.activeInput.value;
                const textAfterTrigger = value.substring(APP.triggerPos, cursorPos);

                if (!value.includes("#") || cursorPos <= APP.triggerPos) {
                    APP.hideCRMFieldsPlaceholderPopup();
                    return;
                }

                const filteredFields = APP.filterCRMFieldsInPlaceholderPopup(textAfterTrigger);
                if(filteredFields.length > 0) {
                    const rect = APP.activeInput.getBoundingClientRect();
                    const lineHeight = 20;
                    APP.showCRMFieldsPlaceholderPopup( rect.left, rect.top + rect.height + lineHeight, filteredFields );
                }
                else {
                    APP.hideCRMFieldsPlaceholderPopup();
                }
            }
        });
        
        // Handle popup item click
        fieldsPopup.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                APP.handleFieldSelection(e.target.textContent);
            }
        });

    },

    handleFieldSelection(selectedField) {
        const cursorPos = APP.getFieldsPopupCaretPosition(APP.activeInput);
        const value = APP.activeInput.value;
        const beforeTrigger = value.substring(0, APP.triggerPos - 1);
        const afterTrigger = value.substring(cursorPos);

        APP.activeInput.value = beforeTrigger + "${contact." + selectedField + "}" + afterTrigger;
        APP.setFieldsPopupCaretPosition(APP.activeInput, beforeTrigger.length + selectedField.length + 11);
        APP.hideCRMFieldsPlaceholderPopup();
    },

};
