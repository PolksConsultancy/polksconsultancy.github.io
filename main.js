document.writeln('<script src="ZohoEmbededAppSDK.js?v=3"></script>');
document.writeln('<script src="encodeLib.js?v=3"></script>');
document.addEventListener("DOMContentLoaded", function (event) {
    
    $(".contact-details").remove();
    ZOHO.embeddedApp.on("PageLoad", async function(record) {
        if(record.Entity && record.EntityId) {
            if(record.ButtonPosition) {
                recordId = record.EntityId[0];
            }
            else {
                recordId = record.EntityId;
            }
            module = record.Entity;
            // $(".contact-details").remove();
            $(".accountPage").remove();
        }
        APP.init();
    });
    ZOHO.embeddedApp.init();
});

var phoneNumbers = [];
var module;
var recordId;
 // Sample chat data
 var chatData = {};
 var currentUser = {};
 // Current chat state
 let currentChatId = "";
 let isTyping = false;

 var rtdKeys = {};

var APP = {

    extensionName: 'WhatsApp Business',
    extensionAPI: 'whatsappbusiness0__',
    extensionSignal: "whatsappbusiness",
    extensionFunction: 'send',
    credentials: {},
    editLink: "",
    supportMail: "support@polksconsultancy.com",
    docLink: "",
    videoLink: "",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="40" viewBox="0 0 180 40" fill="none"> <g clip-path="url(#clip0_2864_5776)"> <g clip-path="url(#clip1_2864_5776)"> <path d="M9.84909 0.5H0.978027L13.633 29.2527C13.7297 29.4724 14.0421 29.4702 14.1358 29.2495L18.3447 19.3485L9.84909 0.5Z" fill="black"/> <path d="M36.8708 0.5C36.8708 0.5 23.2742 31.6392 21.453 34.5108C19.3363 37.8492 17.9334 39.1235 15.3375 39.5318C15.3135 39.5355 15.2957 39.5563 15.2957 39.5807C15.2957 39.6081 15.318 39.6304 15.3453 39.6304H23.4696C26.989 39.6304 29.527 36.6915 30.9335 34.0962C32.532 31.1464 45.8982 0.5 45.8982 0.5H36.8708Z" fill="black"/> </g> <path d="M72.2275 25.4738C72.2088 25.5149 72.1505 25.5149 72.1317 25.4738L65.408 10.7144H61.6304C61.6304 10.7144 68.5601 26.376 69.2523 27.5462C69.9287 28.6898 70.7473 29.6326 72.1797 29.6326C73.6121 29.6326 74.4307 28.6898 75.1072 27.5462C75.7994 26.376 82.7291 10.7144 82.7291 10.7144H78.9515L72.2275 25.4738Z" fill="black"/> <path d="M92.7333 26.7567C89.0796 26.7567 86.6868 24.3696 86.6868 20.0652C86.6868 15.7609 89.0796 13.3741 92.7333 13.3741C96.374 13.3741 98.7795 15.7609 98.7795 20.0652C98.7795 24.3696 96.374 26.7567 92.7333 26.7567ZM92.7333 10.2828C87.0121 10.2828 83.3322 14.0002 83.3322 20.0652C83.3322 26.1306 87.0121 29.848 92.7333 29.848C98.4415 29.848 102.134 26.1306 102.134 20.0652C102.134 14.0002 98.4415 10.2828 92.7333 10.2828Z" fill="black"/> <path d="M121.463 10.7132V29.4176H117.59L108.564 15.7429V29.4176H105.261V10.7132H109.146L118.173 24.4791V10.7132H121.463Z" fill="black"/> <path d="M130.314 21.748L133.567 14.1088C133.585 14.0659 133.646 14.0659 133.664 14.1088L136.917 21.748H130.314ZM133.615 10.4994C132.255 10.4994 131.424 11.5346 130.876 12.5698C130.314 13.6306 123.598 29.4176 123.598 29.4176H127.049L128.977 24.8884H138.254L140.182 29.4176H143.633C143.633 29.4176 136.917 13.6306 136.355 12.5698C135.807 11.5346 134.975 10.4994 133.615 10.4994Z" fill="black"/> <path d="M152.969 22.2046H158.876C158.849 25.1108 156.144 26.7568 153.278 26.7568C149.683 26.7568 147.328 24.3695 147.328 20.0653C147.328 15.418 149.508 13.3468 153.479 13.3468C155.965 13.3468 158.033 14.3666 158.468 16.7169H161.893C161.293 12.602 157.515 10.2827 153.278 10.2827C147.648 10.2827 144.028 14.0001 144.028 20.0653C144.028 26.1305 147.648 29.7753 153.278 29.7753C155.651 29.7753 158.045 28.4987 158.888 27.1503L158.877 29.4175H162.037V19.3422H152.969V22.2046Z" fill="black"/> <path d="M179.022 13.8435V10.7132H165.616V29.4176H179.022V26.287H168.918V21.3698H178.234V18.2392H168.918V13.8435H179.022Z" fill="black"/> </g> <defs> <clipPath id="clip0_2864_5776"> <rect width="178.043" height="39.1304" fill="white" transform="translate(0.978271 0.5)"/> </clipPath> <clipPath id="clip1_2864_5776"> <rect width="45" height="39.1304" fill="white" transform="translate(0.978271 0.5)"/> </clipPath> </defs> </svg>`,
    
    init: async function() {

        APP.extensionFieldName = "Name";
        APP.extensionFieldMessage = APP.extensionAPI + "Message";
        APP.extensionFieldContactNumber = APP.extensionAPI + "WhatsApp_Number";
        APP.extensionFieldModule = APP.extensionAPI + "Module";
        // APP.extensionFieldDeal = APP.extensionAPI + "Deal";
        // APP.extensionFieldContact = APP.extensionAPI + "Contact";
        APP.extensionFieldLead = APP.extensionAPI + "Lead";
        // APP.extensionFieldAccount = APP.extensionAPI + "Account";
        // APP.extensionFieldSchedule = APP.extensionAPI + "Scheduled_Time";
        APP.extensionFieldStatus = APP.extensionAPI + "Status";
        APP.extensionFieldMsgId = APP.extensionAPI + "MsgId";
        APP.extensionFieldDirection = APP.extensionAPI + "Direction";

        // APP.extensionTemplate = APP.extensionAPI + "Vonage_SMS_Templates";
        APP.extensionHistory = APP.extensionAPI + "WhatsApp_Business_History";

        await APP.firebaseSetup();

        ZOHO.CRM.CONFIG.getCurrentUser().then(function(data){
            currentUser = data.users[0];
            $("#profile-pic").attr("src", currentUser.image_link)
        });

        APP.allUsers = {};
        await ZOHO.CRM.API.getAllUsers({Type:"AllUsers"})
        .then(function(data){
            data.users.forEach(function(user) {
                APP.allUsers[user.id] = user;
            });
        });

        

        if(module && recordId) {
            ZOHO.CRM.UI.Resize({height:"600",width:"1000"}).then(function(data){
                console.log(data);
            });
            await ZOHO.CRM.META.getFields({"Entity":module}).then(function(data){
                let phoneFields = [];
                data.fields.forEach(function(field) {
                    if(field.data_type == "phone") {
                        phoneFields.push(field.api_name);
                    }
                });
                ZOHO.CRM.API.getRecord({Entity:module,RecordID:recordId})
                .then(async function(resp){
                    phoneFields.forEach(function(phoneField) {
                        if(resp.data[0][phoneField]) {phoneNumbers.push(resp.data[0][phoneField]);}
                    });
                    phoneNumbers.forEach(function(phone) {
                        ZOHO.CRM.API.searchRecord({Entity:"whatsappbusiness0__WhatsApp_Contacts",Type:"phone",Query:phone,delay:false})
                        .then(async function(data){
                            data.data.forEach(contact => {
                                chatData[contact.whatsappbusiness0__WhatsApp_Number+""] = {
                                    id: contact.whatsappbusiness0__WhatsApp_Number,
                                    unread: 0,
                                    details: contact,
                                    notifications: {},
                                    messages: []
                                };
                            });
                            $("#loader").remove();
                            await APP.renderChatList("", chatData);
                            await APP.realtimeListener();
                        });
                    });     
                })
            });
        }
        else {
            await ZOHO.CRM.API.getAllRecords({Entity:"whatsappbusiness0__WhatsApp_Contacts",sort_order:"asc",per_page:200,page:1}).then(async function(data){
                data.data.forEach(contact => {
                    chatData[contact.whatsappbusiness0__WhatsApp_Number+""] = {
                        id: contact.whatsappbusiness0__WhatsApp_Number,
                        unread: 0,
                        details: contact,
                        notifications: {},
                        messages: []
                    };
                });
                $("#loader").remove();
                await APP.renderChatList("", chatData);
                await APP.realtimeListener();
            });
        }

        // DOM Elements
        var chatList = document.getElementById('chat-list');
        var messagesContainer = document.getElementById('messages-container');
        var messageInput = document.getElementById('message-input');
        var sendButton = document.getElementById('send-button');
        var searchInput = document.getElementById('search-input');
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

        // Chat list item click
        chatList.addEventListener('click', async (e) => {
            if($(".initialChatDiv").length) {
                $(".initialChatDiv").remove();
            }
            APP.lastMessageDirection = "";
            if($(e.target).hasClass('chatUser-avatar')) {
                $(".simpleNoteOptionOuter").remove();
                let u = "";
                Object.values(APP.allUsers).forEach(function(record) {
                    u += `<div title="${record.full_name}" class="simpleNoteOptionSub" elementid="option" action-id="platform" value="${record.id}">
                            <div class="simpleNoteOptionSubInner" elementid="option">
                                <div class="simpleNoteOptionSubIcon" elementid="option">
                                    <img src="${record.image_link ? record.image_link : 'person.png'}" style="    width: 24px;    height: 24px;    border-radius: 50%;">
                                </div>
                                <div class="simpleNoteOptionSubText" elementid="option">
                                    <h3 class="simpleNoteOptionTextHead" elementid="option">${record.full_name}</h3>
                                </div>
                                
                            </div>
                        </div>`;
            
            
                });
            
                let h = `<div class="simpleNoteOptionOuter" elementid="option" style="/* margin-top: 140px; */width: 166px;border-radius: 10px;transform-origin: top center;transform: scale(0);margin-left: 25px;">
            <style>
                .simpleNoteOptionOuter {
                    display: flex;
                    flex: 1 1 auto;
                    flex-direction: column;
                    padding: 0;
                    width: 215px;
                    overflow: hidden;
                    box-shadow: 0 2px 5px 0 rgba(11,20,26,.26), 0 2px 10px 0 rgba(11,20,26,.16);
                    box-sizing: border-box;
                    background-color: #fff;
                    color: #000000de;
                    border-radius: 3px;
                    position: absolute;
                    z-index: 100;
                    box-sizing: border-box;
                    padding: 9px 0px;
                    max-height: 272px;
                    overflow: auto;
                    transform-origin: right top;
                    transform: scale(0);
                    transition: box-shadow 0.2s cubic-bezier(0.32, 0.08, 0.24, 1) 0s, transform 0.2s cubic-bezier(0.32, 0.08, 0.24, 1) 0s, -webkit-box-shadow 0.2s cubic-bezier(0.32, 0.08, 0.24, 1) 0s, -webkit-transform 0.2s cubic-bezier(0.32, 0.08, 0.24, 1) 0s;
            }
            
            .customLabelsList {
                width: 100%;
                border: 0;
                border-top: 1px solid #e9edef;
            }
            
            .simpleNoteOptionInner {
            -webkit-box-direction: normal;
            font-family: Roboto,"Helvetica Neue",sans-serif;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            margin-bottom: 0;
            margin-top: 0;
            flex-direction: column;
            display: flex;
            flex-grow: 1;
            padding: 0;
            }
            
            .simpleNoteOptionSub {
            cursor: pointer;
            position: relative;
            font-size: 16px;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            width: 100%;
            padding: 0;
            color: #0000008c;
            text-decoration: none;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            justify-content: center;
            height: auto;
            min-height: 37px;
            transition: .2s background-color cubic-bezier(0.4, 0, 0.2, 1);
            /* border-top: 1px solid rgba(155,155,155,.2); */
            }
            
            .simpleNoteOptionSubInner {
                display: flex;
                flex-direction: row;
                align-items: center;
                box-sizing: border-box;
                padding: 0 25px 0 16px;
                position: relative;
                height: inherit;
                overflow: hidden;
                transition: 0.3s;
            }
            
            .simpleNoteOptionSubIcon {
                object-fit: cover;
                flex-shrink: 0;
                align-items: center;
                border-radius: 100%;
                box-sizing: border-box;
                color: #0000008c;
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 22px;
                transition: 0.3s;
            }
            
            .simpleNoteOptionSubRemove {
                box-sizing: border-box;
                font-size: 24px;
                color: #667781;
                width: 0;
                height: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: 0.2s;
                padding: 15px;
                border-radius: 100%;
                margin-right: -46px;
                margin-left: 15px;
            }
            
            .simpleNoteOptionSubRemove:hover {
                color: #c50000;
            }
            
            .simpleNoteOptionSubRemove:active {
                background-color: #0b141a1a;
            }
            
            .simpleNoteOptionSubRemove.simpleNoteOptionSubRemoveHovered {
                margin-right: -5px;
            }
            
            .simpleNoteOptionSubIcon svg {
            fill: currentColor;
            }
            
            .simpleNoteOptionSubText {
                display: flex;
                flex-direction: column;
                flex: auto;
                box-sizing: border-box;
                overflow: hidden;
                padding: 0;
                padding-right: 0;
                padding-left: 16px;
                transition: 0.3s;
            }
            
            h3.simpleNoteOptionTextHead {
                overflow: hidden;
                text-overflow: ellipsis;
                display: block;
                margin: 0;
                font-weight: normal;
                white-space: nowrap;
                color: #3b4a54;
                font-family: "SF Pro Text", "SF Pro Icons", system, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", "Ubuntu", "Cantarell", "Fira Sans", sans-serif;
                font-size: 16px;
                letter-spacing: .24px;
                line-height: 14.5px;
                text-align: left;
                box-sizing: border-box;
                padding: 7px 0px;
                word-wrap: break-word;
                text-overflow: ellipsis;
            }
            
            p.simpleNoteOptionTextInfo {
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-weight: normal;
            letter-spacing: .24px;
            white-space: normal;
            color: #0000008c;
            font-size: 12px;
            line-height: 16px;
            margin-top: 4px;
            text-align: left;
            }
            
            .simpleNoteOptionSub:hover {
            background-color: #f5f6f6;
            }
            
            .simpleNoteOptionSubHide {
                opacity: 0.5;
                cursor: default;
            }
            
            .simpleNoteOptionSubHide:hover {
            background-color: transparent !important;
            }
            
            .simpleNoteOptionOuter::-webkit-scrollbar-thumb {
                background-color: rgb(239 234 226);
            }
            
            .simpleNoteOptionOuter::-webkit-scrollbar {
                width: 3px!important;
                height: none !important;
            }
            
            .simpleNoteOptionOuter::-webkit-scrollbar-track {
                background: rgba(255,255,255,.1);
            }
                </style>
                <div class="simpleNoteOptionInner" elementid="option">
                    
                    ${u}
                    
                </div>
            </div>`;
                
                $(e.target).parent().append(h);
                $(".simpleNoteOptionOuter").css("transform", "scale(1)");
                
                return;
            }
            var chatItem = e.target.closest('.chat-item');
            console.log(chatItem);
            if (chatItem && currentChatId != chatItem.dataset.id) {
                currentChatId = chatItem.dataset.id;
                $(".active").removeClass("active");
                chatItem.setAttribute("class", "chat-item active");
                if(chatItem.querySelector(".unread-count")) {
                    chatItem.querySelector(".unread-count").remove();
                }
                chatData[currentChatId].unread = 0;
                // if(!chatData[currentChatId].messages.length) {
                //     APP.renderMessages(currentChatId);
                //     return;
                // }
                if(chatData[currentChatId].messages.length) {
                    if(Object.keys(chatData[currentChatId].notifications).length) {
                        Object.keys(chatData[currentChatId].notifications).forEach(function(key) {              
                            chatData[currentChatId].messages.push(chatData[currentChatId].notifications[key]);
                            delete chatData[currentChatId].notifications[key];
                            setTimeout(() => {
                                APP.database.ref('incomingMessages/'+key).remove()
                                    .then(() => {
                                    console.log("Data deleted successfully");
                                    })
                                    .catch((error) => {
                                    console.error("Error deleting data: ", error);
                                    });
                            }, 2000);
                        });
                    }
                    APP.renderMessages(currentChatId);
                    return;
                }
                let k = await ZOHO.CRM.API.searchRecord({Entity:APP.extensionHistory,Type:"criteria",Query:`(${APP.extensionFieldContactNumber}:equals:${currentChatId})`});
                if(k.data) {
                    chatData[currentChatId].messages = chatData[currentChatId].messages.concat(k.data);
                    if(Object.keys(chatData[currentChatId].notifications).length) {
                        Object.keys(chatData[currentChatId].notifications).forEach(function(key) {              
                            chatData[currentChatId].messages.push(chatData[currentChatId].notifications[key]);
                            delete chatData[currentChatId].notifications[key];
                            setTimeout(() => {
                                APP.database.ref('incomingMessages/'+key).remove()
                                    .then(() => {
                                    console.log("Data deleted successfully");
                                    })
                                    .catch((error) => {
                                    console.error("Error deleting data: ", error);
                                    });
                            }, 2000);
                        });
                    }
                    chatData[currentChatId].messages.sort(function(a, b) {
                        var keyA = new Date(a.Created_Time), keyB = new Date(b.Created_Time);
                        // Compare the 2 dates
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    });
                }
                APP.renderMessages(currentChatId);

            }
        });

        // Send message
        sendButton.addEventListener('click', APP.sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                APP.sendMessage();
            }
        });

        // Typing indicator
        messageInput.addEventListener('input', () => {
            if (messageInput.textContent.trim() && !isTyping) {
                sendButton.classList.add('active');
            } else if (!messageInput.textContent.trim() && isTyping) {
                sendButton.classList.remove('active');
            }
            isTyping = !!messageInput.textContent.trim();
        });

        // Search chats
        searchInput.addEventListener('input', (e) => {
            APP.renderChatList(e.target.value);
        });
        
        

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
            var chat = Object.values(chatData).find(c => c.id == currentChatId);
            var newMessage = {
                text: '[Photo]',
                time: APP.getCurrentTime(),
                incoming: false,
                status: 'delivered'
            };
            chat.messages.push(newMessage);
            chat.lastMessage = 'You: [Photo]';
            chat.time = 'Just now';
            APP.renderMessages(currentChatId);
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
                APP.renderMessages(currentChatId);
                APP.renderChatList();
                
                // Show notification if chat is not active
                if (chat.id !== currentChatId) {
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
        document.addEventListener('click', (e) => {
            if(!$(e.target).hasClass('chatUser-avatar') && !$(e.target).hasClass('chatUser-avatar')) {
                $(".simpleNoteOptionOuter").css("transform", "scale(0)");
                $(".simpleNoteOptionOuter").remove();
            }
            emojiPicker.classList.remove('show');
            attachmentOptions.classList.remove('show');
            
        });
        
        // Chat header click to show contact details
        // chatHeader.addEventListener('click', () => {
        //     contactDetails.style.display = 'flex';
        //     chatArea.style.display = 'none';
        // });
        
        // backButton = document.getElementById('back-button');
        // // Back button from contact details
        // backButton.addEventListener('click', () => {
        //     contactDetails.style.display = 'none';
        //     chatArea.style.display = 'flex';
        // });
        
        // Profile pic click to show settings
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


        // let messageContentHover = document.querySelector('.message-content');
        // messageContentHover.addEventListener('mouseover', function() {
        //     this.parentElement.querySelector(".message-text-to-react-out").style.display = "block";
        // });
        // messageContentHover.addEventListener('mouseout', function() {
        //     this.parentElement.querySelector(".message-text-to-react-out").style.display = "none";
        // });

        $(".message-content").mouseover(function() {
            $(this).find(".message-text-to-react-out").addClass("highlight");
          }).mouseout(function() {
            $(this).find(".message-text-to-react-out").removeClass("highlight");
          });

    },
    renderChatList: async function(filter = '', chatListData) {
        var chatList = document.getElementById('chat-list');
        chatList.innerHTML = '';
        let filteredChats = chatListData ? chatListData : filter ? 
            Object.values(chatData).filter(chat => chat.name.toLowerCase().includes(filter.toLowerCase())) : 
            Object.values(chatData);
        console.log(filteredChats);
        Object.values(filteredChats).forEach(chat => {
            APP.addChat(chat);
        });
    },
    moveContactToTop: function(contactId) {
        var contactList = document.getElementById('chat-list');
                const contacts = Array.from(document.querySelectorAll('.chat-item'));
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
    addChat: function(chat) {
        chatList = document.getElementById('chat-list');
        var chatItem = document.createElement('div');
        chatItem.id = "chatid-"+chat.id;
        chatItem.className = `chat-item ${chat.id === currentChatId ? 'active' : ''}`;
        chatItem.dataset.id = chat.id;
        
        chatItem.innerHTML = `
            <div class="chat-avatars">
                <img src="${chat.details.avatar ? chat.details.avatar : "person.png"}" alt="${chat.details.Name}" class="chat-avatar">
                <img src="${APP.allUsers[chat.details.Owner.id].image_link ? APP.allUsers[chat.details.Owner.id].image_link : "person.png"}" alt="${chat.details.Name}" class="chat-avatar chatUser-avatar">
            </div>
            <div class="chat-info">
                <div class="chat-header">
                    <div class="chat-name">${chat.details.Name}</div>
                    <div class="chat-time">${APP.getCurrentTime(chat.details.Modified_Time)}</div>
                </div>
                <div class="chat-preview">
                    <div class="chat-message">${chat.details.whatsappbusiness0__Direction && chat.details.whatsappbusiness0__Direction == "Incoming" ? chat.details.whatsappbusiness0__Last_Message : "You: "+chat.details.whatsappbusiness0__Last_Message}</div>
                    ${chat.unread > 0 ? `<div class="unread-count">${chat.unread}</div>` : ''}
                </div>
            </div>
        `;
        
        chatList.prepend(chatItem);
        chatList.scrollTop = 0;
    },
    renderMessages: function(chatId) {
        var messagesContainer = document.getElementById('messages-container');
        var chatHeader = document.getElementById('chat-header');
        messagesContainer.innerHTML = '';
        
        var chat = Object.values(chatData).find(c => c.id == chatId);
        
        if (!chat) return;
        
        // Update chat header
        var chatHeaderInfo = chatHeader.querySelector('.chat-header-info');
        chatHeaderInfo.innerHTML = `
            <img src="${chat.avatar ? chat.avatar: 'person.png'}" alt="${chatId}" class="profile-pic">
            <div class="chat-header-name">${chatId}</div>
        `;
        
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
    addMessage: function(message) {

        messagesContainer = document.getElementById('messages-container');
        messageElement = document.createElement('div');
        messageElement.className = "message-content";
                
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
                
                if (message.attachment) {
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
                    let pendingStatus = `<svg viewBox="0 0 16 15" width="16" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 16 15"><title>msg-time</title><path fill="currentColor" d="M9.75,7.713H8.244V5.359c0-0.276-0.224-0.5-0.5-0.5H7.65c-0.276,0-0.5,0.224-0.5,0.5v2.947 c0,0.276,0.224,0.5,0.5,0.5h0.094c0.001,0,0.002-0.001,0.003-0.001S7.749,8.807,7.75,8.807h2c0.276,0,0.5-0.224,0.5-0.5V8.213 C10.25,7.937,10.026,7.713,9.75,7.713z M9.75,2.45h-3.5c-1.82,0-3.3,1.48-3.3,3.3v3.5c0,1.82,1.48,3.3,3.3,3.3h3.5 c1.82,0,3.3-1.48,3.3-3.3v-3.5C13.05,3.93,11.57,2.45,9.75,2.45z M11.75,9.25c0,1.105-0.895,2-2,2h-3.5c-1.104,0-2-0.895-2-2v-3.5 c0-1.104,0.896-2,2-2h3.5c1.105,0,2,0.896,2,2V9.25z"></path></svg>`;
                    let sentStatus = `<svg viewBox="0 0 12 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>msg-check</title><path d="M11.1549 0.652832C11.0745 0.585124 10.9729 0.55127 10.8502 0.55127C10.7021 0.55127 10.5751 0.610514 10.4693 0.729004L4.28038 8.36523L1.87461 6.09277C1.8323 6.04622 1.78151 6.01025 1.72227 5.98486C1.66303 5.95947 1.60166 5.94678 1.53819 5.94678C1.407 5.94678 1.29275 5.99544 1.19541 6.09277L0.884379 6.40381C0.79128 6.49268 0.744731 6.60482 0.744731 6.74023C0.744731 6.87565 0.79128 6.98991 0.884379 7.08301L3.88047 10.0791C4.02859 10.2145 4.19574 10.2822 4.38194 10.2822C4.48773 10.2822 4.58929 10.259 4.68663 10.2124C4.78396 10.1659 4.86436 10.1003 4.92784 10.0156L11.5738 1.59863C11.6458 1.5013 11.6817 1.40186 11.6817 1.30029C11.6817 1.14372 11.6183 1.01888 11.4913 0.925781L11.1549 0.652832Z" fill="currentcolor"></path></svg>`;
                    let deliveredStatus = `<svg viewBox="0 0 16 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>msg-dblcheck</title><path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="currentColor"></path></svg>`;
                    let readStatus = `<svg viewBox="0 0 16 11" height="11" width="16" fill="#53bdeb" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>msg-dblcheck</title><path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="currentColor"></path></svg>`;
                    
                    let incoming = message.whatsappbusiness0__Direction == 'Incoming' ? true : false;
                    let messageDirection = incoming ? 'message-in' : 'message-out';
                    let messageboxHook = incoming ? `<span aria-hidden="true" class="message-in-content"><svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg></span>` : `<span aria-hidden="true" class="message-in-content"><svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg></span>`;
                    let messageToReact = incoming ? `<div class="message-text-to-react-out"><div class="message-text-to-react-in"><div><div class="message-text-to-react"><span class="message-text-to-react-icon"><svg viewBox="0 0 15 15" width="15" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>react</title><path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.5C0 11.6305 3.36946 15 7.5 15C11.6527 15 15 11.6305 15 7.5C15 3.36946 11.6305 0 7.5 0C3.36946 0 0 3.36946 0 7.5ZM10.995 8.69333C11.1128 8.67863 11.2219 8.66503 11.3211 8.65309C11.61 8.63028 11.8076 8.91918 11.6784 9.13965C10.8573 10.6374 9.29116 11.793 7.50455 11.793C5.71794 11.793 4.15181 10.6602 3.33072 9.16246C3.18628 8.91918 3.37634 8.63028 3.66524 8.65309C3.79123 8.66749 3.93521 8.68511 4.09426 8.70457C4.94292 8.80842 6.22074 8.96479 7.48174 8.96479C8.81855 8.96479 10.1378 8.80025 10.995 8.69333ZM5.41405 7.37207C6.05761 7.37207 6.60923 6.72851 6.60923 6.02978C6.60923 5.30348 6.05761 4.6875 5.41405 4.6875C4.77048 4.6875 4.21886 5.33106 4.21886 6.02978C4.20967 6.75609 4.77048 7.37207 5.41405 7.37207ZM10.7807 6.05619C10.7807 6.74114 10.24 7.37201 9.60912 7.37201C8.97825 7.37201 8.4375 6.76818 8.4375 6.05619C8.4375 5.37124 8.97825 4.74037 9.60912 4.74037C10.24 4.74037 10.7807 5.34421 10.7807 6.05619Z" fill="currentColor"></path></svg></span></div></div></div></div>` : `<div class="message-text-to-react-out"><div class="message-text-to-react-in"><div><div class="message-text-to-react"><span class="message-text-to-react-icon"><svg viewBox="0 0 15 15" width="15" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>react</title><path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.5C0 11.6305 3.36946 15 7.5 15C11.6527 15 15 11.6305 15 7.5C15 3.36946 11.6305 0 7.5 0C3.36946 0 0 3.36946 0 7.5ZM10.995 8.69333C11.1128 8.67863 11.2219 8.66503 11.3211 8.65309C11.61 8.63028 11.8076 8.91918 11.6784 9.13965C10.8573 10.6374 9.29116 11.793 7.50455 11.793C5.71794 11.793 4.15181 10.6602 3.33072 9.16246C3.18628 8.91918 3.37634 8.63028 3.66524 8.65309C3.79123 8.66749 3.93521 8.68511 4.09426 8.70457C4.94292 8.80842 6.22074 8.96479 7.48174 8.96479C8.81855 8.96479 10.1378 8.80025 10.995 8.69333ZM5.41405 7.37207C6.05761 7.37207 6.60923 6.72851 6.60923 6.02978C6.60923 5.30348 6.05761 4.6875 5.41405 4.6875C4.77048 4.6875 4.21886 5.33106 4.21886 6.02978C4.20967 6.75609 4.77048 7.37207 5.41405 7.37207ZM10.7807 6.05619C10.7807 6.74114 10.24 7.37201 9.60912 7.37201C8.97825 7.37201 8.4375 6.76818 8.4375 6.05619C8.4375 5.37124 8.97825 4.74037 9.60912 4.74037C10.24 4.74037 10.7807 5.34421 10.7807 6.05619Z" fill="currentColor"></path></svg></span></div></div></div></div>`;
                    let messageTime = APP.getCurrentTime(message.Created_Time);
                    let messageText = message.whatsappbusiness0__WhatsApp_Message;
                    let messageChatImg = `<div class="message-chat-img-div"><img alt="" draggable="false" class="message-chat-img" tabindex="-1" src="${incoming ? 'person.png' : currentUser.image_link ? currentUser.image_link : 'person.png'}"></div>`;
                    let messageOwnerName = !incoming && message.Owner && message.Owner.name ? `<div class="message-owner"><span class="message-owner-name">${message.Owner.name}</span></div>` : '';

                    let startConvIcon = "";
                    let startConvImag = "";
                    if(APP.lastMessageDirection != message.whatsappbusiness0__Direction) {
                        APP.lastMessageDirection = message.whatsappbusiness0__Direction;
                        messageElement.className = "message-content startConversation";
                        startConvIcon = messageboxHook;
                        startConvImag = messageChatImg;
                    }

                    let messageStatus = incoming ? '' : `<div class="message-status-out"><span class="message-status">${message.whatsappbusiness0__Status == "Sent" ? sentStatus : message.whatsappbusiness0__Status == "Delivered" ? deliveredStatus : message.whatsappbusiness0__Status == "Read" ? readStatus : pendingStatus}</span></div>`;
                    messageElement.innerHTML = `

    <div class="message-content-inner" data-id="">
        <div class="${ messageDirection }">
            <div class="message-content-main">
                ${startConvIcon}${startConvImag}${messageToReact}
                <div class="message-content-main-div">
                    <div>
                        <div class="message-content-main-div-in">
                            ${messageOwnerName}
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
    </div>
                       
                    `;
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
        
        var chat = Object.values(chatData).find(c => c.id == currentChatId);
        if (!chat) return;
        var historyRecordData = {
            "Name": "WhatsApp Message to "+currentChatId,
            "Owner": currentUser.id,
            "whatsappbusiness0__WhatsApp_Number": currentChatId,
            "whatsappbusiness0__From": "",
            "whatsappbusiness0__To": currentChatId,
            "whatsappbusiness0__WhatsApp_Message": messageText,
            "whatsappbusiness0__Timestamp": APP.toIsoString(new Date()),
            "whatsappbusiness0__Direction": "Outgoing",
            "whatsappbusiness0__Status": "Sent"
        };
        
        chat.messages.push(historyRecordData);
        APP.addMessage(historyRecordData);

        sendButton = document.getElementById('send-button');
        // Clear input
        messageInput.textContent = '';
        sendButton.classList.remove('active');

        let contactRecordData = {
            "Name": currentChatId,
            "Owner": currentUser.id,
            "whatsappbusiness0__WhatsApp_Number": currentChatId,
            "whatsappbusiness0__Last_Message": messageText,
            "whatsappbusiness0__Active_Time": APP.toIsoString(new Date()),
            "whatsappbusiness0__Direction": "Outgoing",
            "whatsappbusiness0__Status": "Sent"
        };

        chatData[currentChatId].details = contactRecordData;
        $("#chatid-"+currentChatId+" .chat-message").html(chatData[currentChatId].details.whatsappbusiness0__Last_Message);
        $("#chatid-"+currentChatId+" .chat-time").html(APP.getCurrentTime(chatData[currentChatId].details.Modified_Time));

        let request = {
            url : `https://graph.facebook.com/v22.0/581984271672102/messages`,
            headers: { 
                "Authorization": "Bearer "+"EAAmTNTZCXDTkBOwtyJNZCfxLIdhrGidBdsZCGmJZCFAFj40BM6KRgjIad7B8ZBsleSQDwjNCQhwT5ohJfCnFWwbPsg9UjcQccm944n0Iw5RteVjncyp6huZALHTJYyE7TxJucLhT1RVbm9g0v1KYmZB7Ljl1WpSPPb8yxyPXzrY73UPhCN5FzS11K6KKKeJL8ZCJtENGWmuuLobEDD77ggmf3xrdET5ZAXrZAZAQiUZD",
                "Content-Type": "application/json"
            },
            body: {
                "messaging_product": "whatsapp",
                "to": currentChatId,
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
                if(module && recordId) {
                    historyRecordData["whatsappbusiness0__"+module.substring(0, module.length-1)] = recordId;
                    contactRecordData["whatsappbusiness0__"+module.substring(0, module.length-1)] = recordId;
                }
                await ZOHO.CRM.API.insertRecord({Entity: APP.extensionHistory,APIData:historyRecordData,Trigger:["workflow"]}).then(function(data){});
                let k = await ZOHO.CRM.API.searchRecord({Entity:"whatsappbusiness0__WhatsApp_Contacts",Type:"criteria",Query:`(${APP.extensionFieldContactNumber}:equals:${currentChatId})`});
                if(k.data) {
                    contactRecordData.id = k.data[0].id;
                    contactRecordData.Name = k.data[0].Name;
                    await ZOHO.CRM.API.updateRecord({Entity: "whatsappbusiness0__WhatsApp_Contacts",APIData:contactRecordData,Trigger:["workflow"]}).then(function(data){});
                }
                else {
                    await ZOHO.CRM.API.insertRecord({Entity: "whatsappbusiness0__WhatsApp_Contacts",APIData:contactRecordData,Trigger:["workflow"]}).then(function(data){});
                }
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

        // Set up the listener
        APP.database.ref('incomingMessages').on('child_added', (snapshot) => {
            var data = snapshot.val();
            var key  = snapshot.key;
            if(rtdKeys[key]) return;
            rtdKeys[key] = key;
            console.log("Data received:", data);

            var incomingRecord = {};
            var historyRecordData = {
                "Name": "Incoming message from "+data.messages[0].from,
                "whatsappbusiness0__WhatsApp_Number": data.messages[0].from,
                "whatsappbusiness0__From": data.messages[0].from,
                "whatsappbusiness0__To": "",
                "whatsappbusiness0__WhatsApp_Message": data.messages[0].text.body,
                "whatsappbusiness0__Timestamp": APP.toIsoString(new Date(data.messages[0].timestamp)),
                "whatsappbusiness0__Direction": "Incoming",
                "whatsappbusiness0__Status": "Received",
                "Created_Time": APP.toIsoString(new Date())
            };


            if(chatData[data.messages[0].from]) {
                chatData[data.messages[0].from]["notifications"][key] = historyRecordData;
            }
            else {
                let j = {};
                j[key] = historyRecordData;
                chatData[data.messages[0].from] = {
                    id: data.messages[0].from,
                    unread: 0,
                    details: {},
                    notifications: j,
                    messages: []
                };
            }
            if(currentChatId == data.messages[0].from) {                
                chatData[data.messages[0].from].messages.push(historyRecordData);
                delete chatData[data.messages[0].from].notifications[key];
                APP.addMessage(historyRecordData);
                setTimeout(() => {
                    APP.database.ref('incomingMessages/'+snapshot.key).remove()
                        .then(() => {
                        console.log("Data deleted successfully");
                        })
                        .catch((error) => {
                        console.error("Error deleting data: ", error);
                        });
                }, 2000);
            }

            var contactRecordData = {
                "Name": data.messages[0].from,
                "whatsappbusiness0__WhatsApp_Number": data.messages[0].from,
                "whatsappbusiness0__Last_Message": data.messages[0].text.body,
                "whatsappbusiness0__Active_Time": APP.toIsoString(new Date(data.messages[0].timestamp)),
                "whatsappbusiness0__Direction": "Outgoing",
                "whatsappbusiness0__Status": "Sent",
                "avatar": "person.png",             
                "Modified_Time": APP.toIsoString(new Date())
            };

            if(currentChatId != data.messages[0].from) {
                chatData[data.messages[0].from].unread += 1;
            }
            chatData[data.messages[0].from].details = contactRecordData;
            if($("#chatid-"+data.messages[0].from).length) {
                
                if(!$("#chatid-"+data.messages[0].from+" .unread-count").length && currentChatId != data.messages[0].from) {
                    $("#chatid-"+data.messages[0].from+" .chat-preview").append(`<div class="unread-count">${chatData[data.messages[0].from].unread}</div>`);
                }
                else if(currentChatId != data.messages[0].from) {
                    $("#chatid-"+data.messages[0].from+" .unread-count").html(chatData[data.messages[0].from].unread);
                }
                $("#chatid-"+data.messages[0].from+" .chat-message").html(chatData[data.messages[0].from].details.whatsappbusiness0__Last_Message);
                $("#chatid-"+data.messages[0].from+" .chat-time").html(APP.getCurrentTime(chatData[data.messages[0].from].details.Modified_Time));
                APP.moveContactToTop(data.messages[0].from);
            }
            else {
                APP.addChat(chatData[data.messages[0].from]);
            }
            
        }, (error) => {
        console.error("Listener error:", error);
        document.getElementById('data-container').textContent = 
            "Error: " + error.message;
        });
        console.log("Listener set up");
    }

};