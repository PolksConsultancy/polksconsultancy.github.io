document.writeln('<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>'); document.writeln('<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap">');
var encodeLib = {
    autoResize: function() {
        (function (global, factory) {
            typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, encodeLib.autoResize = factory());
        }
        (this, (function () {
            let assignedElements = new Map();
        
            function assign(ta) {
              if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || assignedElements.has(ta)) return;
              let previousHeight = null;
        
              function cacheScrollTops(el) {
                let arr = [];
        
                while (el && el.parentNode && el.parentNode instanceof Element) {
                  if (el.parentNode.scrollTop) {
                    arr.push([el.parentNode, el.parentNode.scrollTop]);
                  }
        
                  el = el.parentNode;
                }
        
                return function () {
                  return arr.forEach(function (_ref) {
                    let node = _ref[0],
                        scrollTop = _ref[1];
                    node.style.scrollBehavior = 'auto';
                    node.scrollTop = scrollTop;
                    node.style.scrollBehavior = null;
                  });
                };
              }
        
              let computed = window.getComputedStyle(ta);
        
              function setHeight(_ref2) {
                let _ref2$restoreTextAlig = _ref2.restoreTextAlign,
                    restoreTextAlign = _ref2$restoreTextAlig === void 0 ? null : _ref2$restoreTextAlig,
                    _ref2$testForHeightRe = _ref2.testForHeightReduction,
                    testForHeightReduction = _ref2$testForHeightRe === void 0 ? true : _ref2$testForHeightRe;
                let initialOverflowY = computed.overflowY;
        
                if (ta.scrollHeight === 0) {
                  return;
                }
        
        
                if (computed.resize === 'vertical') {
                  ta.style.resize = 'none';
                } else if (computed.resize === 'both') {
                  ta.style.resize = 'horizontal';
                }
        
                var restoreScrollTops;
        
                if (testForHeightReduction) {
                  restoreScrollTops = cacheScrollTops(ta);
                  ta.style.height = '';
                }
        
                let newHeight;
        
                if (computed.boxSizing === 'content-box') {
                  newHeight = ta.scrollHeight - (parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom));
                } else {
                  newHeight = ta.scrollHeight + parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);
                }
        
                if (computed.maxHeight !== 'none' && newHeight > parseFloat(computed.maxHeight)) {
                  if (computed.overflowY === 'hidden') {
                    ta.style.overflow = 'auto';
                  }
        
                  newHeight = parseFloat(computed.maxHeight);
                } else if (computed.overflowY !== 'hidden') {
                  // ta.style.overflow = 'hidden';
                }
        
                ta.style.height = newHeight + 'px';
        
                if (restoreTextAlign) {
                  ta.style.textAlign = restoreTextAlign;
                }
        
                if (restoreScrollTops) {
                  restoreScrollTops();
                }
        
                if (previousHeight !== newHeight) {
                  ta.dispatchEvent(new Event('encodeLib.autoResize:resized', {
                    bubbles: true
                  }));
                  previousHeight = newHeight;
                }
        
                if (initialOverflowY !== computed.overflow && !restoreTextAlign) {
                  let textAlign = computed.textAlign;
        
                  if (computed.overflow === 'hidden') {
                    ta.style.textAlign = textAlign === 'start' ? 'end' : 'start';
                  }
        
                  setHeight({
                    restoreTextAlign: textAlign,
                    testForHeightReduction: true
                  });
                }
              }
        
              function fullSetHeight() {
                setHeight({
                  testForHeightReduction: true,
                  restoreTextAlign: null
                });
              }
        
              let handleInput = function () {
                let previousValue = ta.value;
                return function () {
                  setHeight({
                    testForHeightReduction: previousValue === '' || !ta.value.startsWith(previousValue),
                    restoreTextAlign: null
                  });
                  previousValue = ta.value;
                };
              }();
        
              let destroy = function (style) {
                ta.removeEventListener('encodeLib.autoResize:destroy', destroy);
                ta.removeEventListener('encodeLib.autoResize:update', fullSetHeight);
                ta.removeEventListener('input', handleInput);
                window.removeEventListener('resize', fullSetHeight);
        
                Object.keys(style).forEach(function (key) {
                  return ta.style[key] = style[key];
                });
                assignedElements["delete"](ta);
              }.bind(ta, {
                height: ta.style.height,
                resize: ta.style.resize,
                textAlign: ta.style.textAlign,
                overflowY: ta.style.overflowY,
                overflowX: ta.style.overflowX,
                wordWrap: ta.style.wordWrap
              });
        
              ta.addEventListener('encodeLib.autoResize:destroy', destroy);
              ta.addEventListener('encodeLib.autoResize:update', fullSetHeight);
              ta.addEventListener('input', handleInput);
              window.addEventListener('resize', fullSetHeight);
        
              ta.style.overflowX = 'hidden';
              ta.style.wordWrap = 'break-word';
              assignedElements.set(ta, {
                destroy: destroy,
                update: fullSetHeight
              });
              fullSetHeight();
            }
        
            function destroy(ta) {
              let methods = assignedElements.get(ta);
        
              if (methods) {
                methods.destroy();
              }
            }
        
            function update(ta) {
              let methods = assignedElements.get(ta);
        
              if (methods) {
                methods.update();
              }
            }
        
            encodeLib.autoResize = null;
        
            if (typeof window === 'undefined') {
            encodeLib.autoResize = function autosize(el) {
                return el;
              };
        
              encodeLib.autoResize.destroy = function (el) {
                return el;
              };
        
              encodeLib.autoResize.update = function (el) {
                return el;
              };
            } else {
                encodeLib.autoResize = function(el, options) {
                if (el) {
                  Array.prototype.forEach.call(el.length ? el : [el], function (x) {
                    return assign(x);
                  });
                }
        
                return el;
              };
        
              encodeLib.autoResize.destroy = function (el) {
                if (el) {
                  Array.prototype.forEach.call(el.length ? el : [el], destroy);
                }
        
                return el;
              };
        
              encodeLib.autoResize.update = function (el) {
                if (el) {
                  Array.prototype.forEach.call(el.length ? el : [el], update);
                }
        
                return el;
              };
            }
        
            return encodeLib.autoResize;
        
        })));
        
        $.fn.autoResize = function(){
            let r = e => {
                e.style.height = '';
                e.style.height = e.scrollHeight + 'px'
            };
            return this.each((i,e) => {
                e.style.overflow = 'hidden';
                r(e);
                $(e).bind('input', e => {
                r(e.target);
                })
            });
        };
    },
    onLoaded: function(onLoaded={runCode: "", functionName: ""}) {
        return `<img onerror="${onLoaded && onLoaded.runCode ? onLoaded.runCode : ""}${onLoaded && onLoaded.functionName ? `encodeLib.onLoadedFunction(this, ${onLoaded.functionName});` : ""}$(this).remove();" src="" hidden>`;
    },
    onLoadedFunction: function(thisElement, onLoadedFunction) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        if(thisElement.length) {
            onLoadedFunction(thisElement);
        }
        else {
          setTimeout(()=>this.onLoadedFunction.call(this,...arguments), 100);
        }
    },
    labelContent: function(ChangeLabelContentObject={}) {
        let input = {
            type: "text",
            id: "",
            color: "#000000de",
            focusBoxShadowColor: "#1a73e8",
            placeholder: "",
            placeholderColor: "gainsboro",
            cursor: "default",
            padding: "8px 45px 8px 12px",
            onfocusIn: "",
            onfocusOut: "",
            fontWeight: "",
            width: "",
            position: "relative",
            contentFitX: "100%"
        };

        let content = {
            contentType: "content",
            id: "",
            color: "#000000de",
            cursor: "default",
            contentFitX: "100%",
            positionY: "center",
            positionX: "",
            lineClamp: "",
            fontWeight: ""
        };

        let inputTypes = ["text", "number", "tel", "url", "date", "datetime-local", "month", "time", "week"];

        let contentTypeObject = {};
        
        if(ChangeLabelContentObject.contentType == "input" || inputTypes.includes(ChangeLabelContentObject.type)) {
            contentTypeObject = inputText;
        }
        else if(ChangeLabelContentObject.contentType == "textarea" || ChangeLabelContentObject.type == "textarea") {
            contentTypeObject = inputText;
            ChangeLabelContentObject.content.fontFamily = "system-ui";
            ChangeLabelContentObject.content.fontSize = "16px";
            ChangeLabelContentObject.content.lineHeight = "24px";
        }
        else {
            contentTypeObject = content;
        }

        let labelContentObject = {
            outer: {
                id: "",
                contentType: "content",
                contentFitX: "100%",
                cursor: "default",
                stopUserSelect: true,
                transition: "0.3s",
                positionY: "center",
                position: "relative",
                innerPosition: "relative"
            },
            label: {
                content: "",
                contentType: "text",
                color: "#0000008c",
                fontSize: "15px",
                fontWeight: "600",
                height: "30px",
                positionY: "center",
                lineClamp: 1,
                fontFamily: "system-ui",
                padding: "0 0 0 1px"
            },
            content: contentTypeObject,
            error: {
                id: "",
                class: "enInputError",
                contentType: "text",
                height: "25px",
                color: "#bf2727",
                positionY: "center",
                positionX: "end",
                fontSize: "14px",
                cursor: "default",
                lineClamp: 1,
                fontFamily: "system-ui"
            },
            checkLoader: {
                class: "checkLoaderClass",
                contentType: "content",
                position: "absolute",
                content: encodeLib.dotCircleLoader({class: "dotLoader", height: "max-content", padding: "3px 0 0 0"}),
                positionX: "center",
                positionY: "end",
                contentFitX: "100%",
                contentFitY: "100%",
                right: "1px",
                padding: "0px 0 4px",
                height: "calc(100% - 1px)",
                width: "45px",
                onclick: {
                    thisElement: true,
                    functionName: "encodeLib.loaderClickToInputFocus"
                }
            }
        };
        
        if(ChangeLabelContentObject.label) {
            labelContentObject.label = Object.assign(labelContentObject.label, ChangeLabelContentObject.label);
        }
        else {
            labelContentObject.label = "";
        }
        if(ChangeLabelContentObject.content) {
            labelContentObject.content = Object.assign(labelContentObject.content, ChangeLabelContentObject.content);
        }
        if(ChangeLabelContentObject.outer) {
            labelContentObject.outer = Object.assign(labelContentObject.outer, ChangeLabelContentObject.outer);
        }

        encodeLib.removeEmptyValuesFromObject(labelContentObject);

        let errorElement = "";
        if(ChangeLabelContentObject.error) {
            labelContentObject.error = Object.assign(labelContentObject.error, ChangeLabelContentObject.error);
            encodeLib.removeEmptyValuesFromObject(labelContentObject.error);
            let errorObject = labelContentObject.error;
            errorElement = encodeLib.content(errorObject);
        }
        
        let checkLoaderElement = "";
        if(ChangeLabelContentObject.checkLoader) {
            labelContentObject.checkLoader = Object.assign(labelContentObject.checkLoader, ChangeLabelContentObject.checkLoader);
            encodeLib.removeEmptyValuesFromObject(labelContentObject.checkLoader);
            let checkLoaderObject = labelContentObject.checkLoader;
            checkLoaderElement = encodeLib.content(checkLoaderObject);
        }

        let labelObject = labelContentObject.label;
        let labelElement = "";
        if(labelObject) {
            labelElement = encodeLib.content(labelObject)
        }

        labelContentObject.content.width  = labelContentObject.content.width ? labelContentObject.content.width : labelContentObject.label && labelContentObject.label.width && labelContentObject.outer.direction == "row" ? 'calc(100% - '+labelContentObject.label.width+')' : "";
        let contentObject = labelContentObject.content;
        let contentElement = "";
        if(labelContentObject.content.contentType == "input" || inputTypes.includes(labelContentObject.content.type)) {
            contentElement = encodeLib.input(contentObject);
        }
        else if(labelContentObject.content.contentType == "textarea" || labelContentObject.content.type == "textarea") {
            contentElement = encodeLib.textarea(contentObject);
        }
        else {
            contentElement = encodeLib.content(contentObject);
        }

        let labelContentInitiate = "";
        if(checkLoaderElement || errorElement) {
            labelContentInitiate = encodeLib.onLoaded({functionName: "encodeLib.labelContentInitiate"});
        }

        labelContentObject.outer.content = labelElement+contentElement+checkLoaderElement+labelContentInitiate
        ;
        let outerDivObject = labelContentObject.outer;
        let labelContentBodyElement = encodeLib.content(outerDivObject);

        let labelContentElement = labelContentBodyElement + errorElement;
        return labelContentElement;
    },
    labelContentInitiate: function(thisElement) {
        if(thisElement.parent().parent().next(`.enInputError`).length) {
            thisElement.parent().parent().next(`.enInputError`).hide();
        }
        if(thisElement.parent().find(`.checkLoaderClass`).length) {
            thisElement.parent().find(`.dotLoader`).hide();
        }
    },
    insert: function(parentElement, addElements="", insertObject = {}) {
        if(!parentElement) {
            return;
        }
        if(parentElement && typeof(parentElement) == "string" || parentElement.length == undefined) {
            parentElement = $(parentElement);
        }

        if(typeof(insertObject.before) == 'function') {
            insertObject.before();
        }
        if(!insertObject.addOn) {
            parentElement.html(addElements);
        }
        else if(insertObject.addOn == "append") {
            parentElement.append(addElements);
        }
        else if(insertObject.addOn == "prepend") {
            parentElement.prepend(addElements);
        }
        else if(insertObject.addOn == "after") {
            parentElement.after(addElements);
        }
        else if(insertObject.addOn == "before") {
            parentElement.before(addElements);
        }
        else {
            parentElement.html(addElements);
        }
        if(typeof(insertObject.after) == 'function') {
            insertObject.after();
        }
    },
    content: function(changeContentObject = {}) {
        let contentObject = {};
        if(changeContentObject.contentType == "inputView" || changeContentObject.contentType == "buttonView") {
            contentObject = {
                contentType: "content",
                lineHeight: "20px",
                outline: "2px solid transparent",
                borderRadius: "4px",
                fontSize: "15px",
                transition: "box-shadow .15s",
                position: "relative",
                direction: "row",
                positionY: "center",
                boxShadow: "0 0 0 2px transparent inset, 0 0 0 1px #0000001f inset",
                cursor: "default",
                contentFitX: "100%",
                padding: "1px 8px 0 8px",
                minHeight: "36px",
                style: "pointer-events: auto;-webkit-font-smoothing: antialiased;overflow-x: auto;"
            };

            if(changeContentObject.contentType == "buttonView") {
                let textElement = "";
                let svgElement = "";
                
                let textElementObject = {
                    class: "textContent",
                    content: changeContentObject.content ? changeContentObject.content.textContent ? changeContentObject.content.textContent : "" : "",
                    lineClamp: changeContentObject.lineClamp,
                    contentType: changeContentObject.content ? changeContentObject.content.contentType ? changeContentObject.content.contentType : "text" : "text",                    
                    contentFitX: changeContentObject.content ? changeContentObject.content.contentFitX ? changeContentObject.content.contentFitX : "" : "",
                    width: changeContentObject.content ? changeContentObject.content.width ? changeContentObject.content.width : "" : "",
                    padding: "8px 30px 7px 8px",
                    fontFamily: "inherit",
                    whiteSpace: changeContentObject.whiteSpace,
                    color: changeContentObject.color,
                    cursor: changeContentObject.cursor ? changeContentObject.cursor : "default",
                    minHeight: changeContentObject.minHeight ? changeContentObject.minHeight : "36px",
                    lineHeight: changeContentObject.lineHeight ? changeContentObject.lineHeight : "",
                    positionY: "center"
                };
                textElement = encodeLib.content(textElementObject);
            
                svgElement = changeContentObject.content ? changeContentObject.content.svgContent : "";
                
                changeContentObject.content = textElement+svgElement;
                changeContentObject.contentType = "";
            }
        }
        contentObject = Object.assign(contentObject, changeContentObject);
        if(!contentObject.direction || contentObject.direction == "column") {
            let tempPosition = contentObject.positionX;
            contentObject.positionX = contentObject.positionY;
            contentObject.positionY = tempPosition;
        }
        return `${contentObject.contentType == "textarea" ? `<div class="enTextareaDiv" style="border: 1px solid transparent; transition: border .15s, height 0.3s; overflow: hidden; width: calc(100% - 2px); border-radius: ${contentObject.borderRadius ? contentObject.borderRadius : '4px'};"><div style="border: 1px solid; border-color: #0000001f; transition: border .15s, height 0.3s; overflow: hidden; width: calc(100% - 2px); border-radius: ${contentObject.borderRadius ? contentObject.borderRadius : '4px'};">` : ''}<${contentObject.contentType == "input" ? "input" : contentObject.contentType == "textarea" ? "textarea" : contentObject.contentType == "button" ? "button" : "div"} ${contentObject.onclick ? `onclick="${contentObject.onclick.functionName ? `encodeLib.onFunction(${contentObject.onclick.thisElement ? 'this' : false}, ${contentObject.onclick.eventElement ? 'event' : false}, ${contentObject.onclick.functionName ? contentObject.onclick.functionName : false}, ${contentObject.onclick.errorInfoElement ? "'"+contentObject.onclick.errorInfoElement+"'" : false}, ${contentObject.onclick.errorInfoAction ? "'"+contentObject.onclick.errorInfoAction+"'" : false}, ${contentObject.onclick.errorColor ? "'"+contentObject.onclick.errorColor+"'" : false}, ${contentObject.onclick.infoColor ? "'"+contentObject.onclick.infoColor+"'" : false});` : ''}${contentObject.onclick.runCode ? contentObject.onclick.runCode : ''}"` : ''} ${contentObject.onkeyup ? `onkeyup="${contentObject.onkeyup.functionName ? `encodeLib.onFunction(${contentObject.onkeyup.thisElement ? 'this' : false}, ${contentObject.onkeyup.eventElement ? 'event' : false}, ${contentObject.onkeyup.functionName ? contentObject.onkeyup.functionName : false}, ${contentObject.onkeyup.errorInfoElement ? "'"+contentObject.onkeyup.errorInfoElement+"'" : false}, ${contentObject.onkeyup.errorInfoAction ? "'"+contentObject.onkeyup.errorInfoAction+"'" : false}, ${contentObject.onkeyup.errorColor ? "'"+contentObject.onkeyup.errorColor+"'" : false}, ${contentObject.onkeyup.infoColor ? "'"+contentObject.onkeyup.infoColor+"'" : false});` : ''}${contentObject.onkeyup.runCode ? contentObject.onkeyup.runCode : ''}"` : ''} ${contentObject.onkeypress ? `onkeypress="${contentObject.onkeypress.functionName ? `encodeLib.onFunction(${contentObject.onkeypress.thisElement ? 'this' : false}, ${contentObject.onkeypress.eventElement ? 'event' : false}, ${contentObject.onkeypress.functionName ? contentObject.onkeypress.functionName : false}, ${contentObject.onkeypress.errorInfoElement ? "'"+contentObject.onkeypress.errorInfoElement+"'" : false}, ${contentObject.onkeypress.errorInfoAction ? "'"+contentObject.onkeypress.errorInfoAction+"'" : false}, ${contentObject.onkeypress.errorColor ? "'"+contentObject.onkeypress.errorColor+"'" : false}, ${contentObject.onkeypress.infoColor ? "'"+contentObject.onkeypress.infoColor+"'" : false});` : ''}${contentObject.onkeypress.runCode ? contentObject.onkeypress.runCode : ''}"` : ''} ${contentObject.oncontextmenu || contentObject.stopRightClick ? `oncontextmenu="${contentObject.oncontextmenu && contentObject.oncontextmenu.functionName ? `encodeLib.onFunction(${contentObject.oncontextmenu.thisElement ? 'this' : false}, ${contentObject.oncontextmenu.eventElement ? 'event' : false}, ${contentObject.oncontextmenu.functionName ? contentObject.oncontextmenu.functionName : false}, ${contentObject.oncontextmenu.errorInfoElement ? "'"+contentObject.oncontextmenu.errorInfoElement+"'" : false}, ${contentObject.oncontextmenu.errorInfoAction ? "'"+contentObject.oncontextmenu.errorInfoAction+"'" : false}, ${contentObject.oncontextmenu.errorColor ? "'"+contentObject.oncontextmenu.errorColor+"'" : false}, ${contentObject.oncontextmenu.infoColor ? "'"+contentObject.oncontextmenu.infoColor+"'" : false});` : ''}${contentObject.oncontextmenu && contentObject.oncontextmenu.runCode ? contentObject.oncontextmenu.runCode : ''}${contentObject.stopRightClick ? 'return false;' : ''}"` : ''} ${contentObject.onfocusIn ? `onfocusIn="${contentObject.onfocusIn.functionName ? `encodeLib.onFunction(${contentObject.onfocusIn.thisElement ? 'this' : false}, ${contentObject.onfocusIn.eventElement ? 'event' : false}, ${contentObject.onfocusIn.functionName ? contentObject.onfocusIn.functionName : false}, ${contentObject.onfocusIn.errorInfoElement ? "'"+contentObject.onfocusIn.errorInfoElement+"'" : false}, ${contentObject.onfocusIn.errorInfoAction ? "'"+contentObject.onfocusIn.errorInfoAction+"'" : false}, ${contentObject.onfocusIn.errorColor ? "'"+contentObject.onfocusIn.errorColor+"'" : false}, ${contentObject.onfocusIn.infoColor ? "'"+contentObject.onfocusIn.infoColor+"'" : false});` : ''}${contentObject.onfocusIn.runCode ? contentObject.onfocusIn.runCode : ''}"` : ''} ${contentObject.onfocusOut ? `onfocusOut="${contentObject.onfocusOut.functionName ? `encodeLib.onFunction(${contentObject.onfocusOut.thisElement ? 'this' : false}, ${contentObject.onfocusOut.eventElement ? 'event' : false}, ${contentObject.onfocusOut.functionName ? contentObject.onfocusOut.functionName : false}, ${contentObject.onfocusOut.errorInfoElement ? "'"+contentObject.onfocusOut.errorInfoElement+"'" : false}, ${contentObject.onfocusOut.errorInfoAction ? "'"+contentObject.onfocusOut.errorInfoAction+"'" : false}, ${contentObject.onfocusOut.errorColor ? "'"+contentObject.onfocusOut.errorColor+"'" : false}, ${contentObject.onfocusOut.infoColor ? "'"+contentObject.onfocusOut.infoColor+"'" : false});` : ''}${contentObject.onfocusOut.runCode ? contentObject.onfocusOut.runCode : ''}"` : ''} ${contentObject.onmouseover ? `onmouseover="${contentObject.onmouseover.functionName ? `encodeLib.onFunction(${contentObject.onmouseover.thisElement ? 'this' : false}, ${contentObject.onmouseover.eventElement ? 'event' : false}, ${contentObject.onmouseover.functionName ? contentObject.onmouseover.functionName : false}, ${contentObject.onmouseover.errorInfoElement ? "'"+contentObject.onmouseover.errorInfoElement+"'" : false}, ${contentObject.onmouseover.errorInfoAction ? "'"+contentObject.onmouseover.errorInfoAction+"'" : false}, ${contentObject.onmouseover.errorColor ? "'"+contentObject.onmouseover.errorColor+"'" : false}, ${contentObject.onmouseover.infoColor ? "'"+contentObject.onmouseover.infoColor+"'" : false});` : ''}${contentObject.onmouseover.runCode ? contentObject.onmouseover.runCode : ''}"` : ''} ${contentObject.onmouseout ? `onmouseout="${contentObject.onmouseout.functionName ? `encodeLib.onFunction(${contentObject.onmouseout.thisElement ? 'this' : false}, ${contentObject.onmouseout.eventElement ? 'event' : false}, ${contentObject.onmouseout.functionName ? contentObject.onmouseout.functionName : false}, ${contentObject.onmouseout.errorInfoElement ? "'"+contentObject.onmouseout.errorInfoElement+"'" : false}, ${contentObject.onmouseout.errorInfoAction ? "'"+contentObject.onmouseout.errorInfoAction+"'" : false}, ${contentObject.onmouseout.errorColor ? "'"+contentObject.onmouseout.errorColor+"'" : false}, ${contentObject.onmouseout.infoColor ? "'"+contentObject.onmouseout.infoColor+"'" : false});` : ''}${contentObject.onmouseout.runCode ? contentObject.onmouseout.runCode : ''}"` : ''} ${contentObject.onmousedown ? `onmousedown="${contentObject.onmousedown.functionName ? `encodeLib.onFunction(${contentObject.onmousedown.thisElement ? 'this' : false}, ${contentObject.onmousedown.eventElement ? 'event' : false}, ${contentObject.onmousedown.functionName ? contentObject.onmousedown.functionName : false}, ${contentObject.onmousedown.errorInfoElement ? "'"+contentObject.onmousedown.errorInfoElement+"'" : false}, ${contentObject.onmousedown.errorInfoAction ? "'"+contentObject.onmousedown.errorInfoAction+"'" : false}, ${contentObject.onmousedown.errorColor ? "'"+contentObject.onmousedown.errorColor+"'" : false}, ${contentObject.onmousedown.infoColor ? "'"+contentObject.onmousedown.infoColor+"'" : false});` : ''}${contentObject.onmousedown.runCode ? contentObject.onmousedown.runCode : ''}"` : ''} ${contentObject.onmouseup ? `onmouseup="${contentObject.onmouseup.functionName ? `encodeLib.onFunction(${contentObject.onmouseup.thisElement ? 'this' : false}, ${contentObject.onmouseup.eventElement ? 'event' : false}, ${contentObject.onmouseup.functionName ? contentObject.onmouseup.functionName+"" : false}, ${contentObject.onmouseup.errorInfoElement ? "'"+contentObject.onmouseup.errorInfoElement+"'" : false}, ${contentObject.onmouseup.errorInfoAction ? "'"+contentObject.onmouseup.errorInfoAction+"'" : false}, ${contentObject.onmouseup.errorColor ? "'"+contentObject.onmouseup.errorColor+"'" : false}, ${contentObject.onmouseup.infoColor ? "'"+contentObject.onmouseup.infoColor+"'" : false});` : ''}${contentObject.onmouseup.runCode ? contentObject.onmouseup.runCode : ''}"` : ''} ${contentObject.id ? 'id="'+contentObject.id+'"' : ''} class="enContent ${contentObject.class ? contentObject.class : ''}" ${contentObject.type ? 'type="'+contentObject.type+'"' : ''} ${contentObject.autocomplete ? 'autocomplete="'+contentObject.autocomplete+'"' : ''} ${contentObject.placeholder ? 'placeholder="'+contentObject.placeholder+'"' : ''} ${contentObject.autofocus ? 'autofocus' : ''} ${contentObject.attributes ? contentObject.attributes : ''} ${contentObject.title ? 'title="'+contentObject.title+'"' : ''} style="${contentObject.margin ? 'margin: '+contentObject.margin+';' : ''}${contentObject.height ? 'height: '+contentObject.height+'; ' : ''}${contentObject.backgroundColor ? 'background-color: '+contentObject.backgroundColor+';' : ''}color: ${contentObject.color ? contentObject.color : 'black'}; overflow: ${contentObject.overflow ? contentObject.overflow : 'hidden'}; ${contentObject.letterSpacing ? 'letter-spacing: '+contentObject.letterSpacing+';' : ''} line-height: ${contentObject.lineHeight ? contentObject.lineHeight : 'initial'}; resize: ${contentObject.resize ? contentObject.resize : 'none'}; display: flex; align-items: ${contentObject.positionY ? contentObject.positionY : 'start'}; justify-content: ${contentObject.positionX ? contentObject.positionX : 'start'}; flex-direction: ${contentObject.direction ? contentObject.direction : 'column'}; font-size: ${contentObject.fontSize ? contentObject.fontSize : 'inherit'}; font-weight: ${contentObject.fontWeight ? contentObject.fontWeight : 'inherit'}; word-break: break-word; word-wrap: break-word; box-sizing: ${contentObject.boxSizing ? contentObject.boxSizing : 'border-box'}; ${contentObject.boxShadow ? 'box-shadow: '+contentObject.boxShadow+';' : ''} ${contentObject.outline ? 'outline: '+contentObject.outline+';' : ''} ${contentObject.width ? 'width: '+contentObject.width+';' : 'width: 100%;'} padding: ${contentObject.padding ? contentObject.padding : '0'}; cursor: ${contentObject.cursor ? contentObject.cursor : 'auto'}; ${contentObject.stopUserSelect ? 'user-select: none;': ''} ${contentObject.transition ? 'transition: '+contentObject.transition+';' : ''} font-family: ${contentObject.fontFamily ? contentObject.fontFamily : 'sans-serif' }; ${contentObject.backdropFilter ? 'backdrop-filter: '+contentObject.backdropFilter+';' : ''} ${contentObject.filter ? 'filter: '+contentObject.filter+';' : ''} ${contentObject.textShadow ? 'text-shadow: '+contentObject.textShadow+';' : ''} ${contentObject.border ? 'border: '+contentObject.border+';' : ''} ${contentObject.borderRadius ? 'border-radius: '+contentObject.borderRadius+';' : ''} ${contentObject.zIndex ? 'z-index: '+contentObject.zIndex+';' : ''} ${contentObject.position ? 'position: '+contentObject.position+';' : ''} ${contentObject.left ? 'left: '+contentObject.left+';' : ''} ${contentObject.right ? 'right: '+contentObject.right+';' : ''} ${contentObject.top ? 'top: '+contentObject.top+';' : ''} ${contentObject.bottom ? 'bottom: '+contentObject.bottom+';' : ''} ${contentObject.transform ? 'transform: '+contentObject.transform+';' : ''} ${contentObject.textTransform ? 'text-transform: '+contentObject.textTransform+';' : ''} ${contentObject.minHeight ? 'min-height: '+contentObject.minHeight+';' : ''} ${contentObject.maxHeight ? 'max-height: '+contentObject.maxHeight+';' : ''} max-width: ${contentObject.maxWidth ? contentObject.maxWidth : '100%'}; min-width: ${contentObject.minWidth ? contentObject.minWidth : '0'}; text-align: ${contentObject.textAlign ? contentObject.textAlign : 'left'}; white-space: ${contentObject.whiteSpace ? contentObject.whiteSpace : 'normal'}; ${contentObject.contentType == "textarea" || contentObject.contentType == "input" && contentObject.lineClamp ? 'display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: '+contentObject.lineClamp+';' : ''} ${contentObject.scrollbarWidth ? 'scrollbar-width: '+contentObject.scrollbarWidth+';' : ''} ${contentObject.display ? 'display: '+contentObject.display+';' : ''} ${contentObject.style ? contentObject.style : ''} ${contentObject.hidden ? 'display: none;' : ''}">${contentObject.contentType != "textarea" && contentObject.contentType != "input" ? `<div style="${contentObject.contentType == "text" || (contentObject.contentType == "button" && contentObject.type == "text") ? contentObject.lineClamp ? 'display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: '+contentObject.lineClamp+';' : '' : `display: flex; align-items: ${contentObject.innerPositionY ? contentObject.innerPositionY : contentObject.positionY ? contentObject.positionY : 'start'}; justify-content: ${contentObject.innerPositionX ? contentObject.innerPositionX : contentObject.positionX ? contentObject.positionX : 'start'}; flex-direction: ${contentObject.innerDirection ? contentObject.innerDirection : contentObject.direction ? contentObject.direction : 'column'};`} width: ${contentObject.contentFitX ? contentObject.contentFitX : 'max-content'}; height: ${contentObject.contentFitY ? contentObject.contentFitY : 'max-content'}; ${contentObject.contentFitYmin ? 'min-height: '+contentObject.contentFitYmin+';' : ''} ${contentObject.contentFitYmax ? 'max-height: '+contentObject.contentFitYmax+';' : ''} max-width: ${contentObject.contentFitXmax ? contentObject.contentFitXmax : '100%'}; min-width: ${contentObject.contentFitXmin ? contentObject.contentFitXmin : '0'}; overflow: ${contentObject.innerOverflow ? contentObject.innerOverflow : 'hidden'}; word-break: break-word; word-wrap: break-word; white-space: ${contentObject.whiteSpace ? contentObject.whiteSpace : 'normal'}; text-align: ${contentObject.textAlign ? contentObject.textAlign : 'left'}; ${contentObject.innerPosition ? 'position: '+contentObject.innerPosition+';' : ''} ${contentObject.innerPadding ? 'padding: '+contentObject.innerPadding+';' : ''} ${contentObject.innserScrollbarWidth ? 'scrollbar-width: '+contentObject.innserScrollbarWidth+';' : ''} ${contentObject.innerDisplay ? 'display: '+contentObject.innerDisplay+';' : ''}" class='content'>${contentObject.content ? contentObject.contentType == "text" || (contentObject.contentType == "button" && contentObject.type == "text") ? "<span>"+contentObject.content+"</span>" : contentObject.content : ""}</div>` : ''}</${contentObject.contentType == "input" ? "input" : contentObject.contentType == "textarea" ? "textarea" : contentObject.contentType == "button" ? "button" : "div"}>${contentObject.contentType == "textarea" ? `</div></div>${contentObject.id ? `${encodeLib.onLoaded({runCode: `encodeLib.autoResize($('#${contentObject.id}'));`})}` : ''}` : ''}${contentObject.id && contentObject.contentType && contentObject.type && (contentObject.type == "text" || contentObject.type == "number" || contentObject.type == "tel" || contentObject.type == "url" || contentObject.contentType == "textarea") ? `<style>${'#'+contentObject.id}::placeholder {color: ${contentObject.placeholderColor ? contentObject.placeholderColor : 'currentcolor'};}</style>` : ''}${contentObject.id && contentObject.type && (contentObject.type == "number" || contentObject.type == "tel") ? `<style>/* Chrome, Safari, Edge, Opera */ ${'#'+contentObject.id}::-webkit-outer-spin-button, ${'#'+contentObject.id}::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; } /* Firefox */ ${'#'+contentObject.id} { -moz-appearance: textfield; }</style>` : ''}${contentObject.css ? `<style>${contentObject.css}</style>` : ''}`;
    },
    input: function(changeInputObject = {}) {
        let inputObject = {
            contentType: "input",
            type: "text",
            id: "",
            color: "#000000de",
            focusBoxShadowColor: "#1a73e8",
            placeholder: "",
            placeholderColor: "gainsboro",
            cursor: "default",
            padding: "8px 13px 8px 12px",
            margin: "0",
            lineHeight: "20px",
            outline: "2px solid transparent",
            border: "0",
            borderRadius: "4px",
            backgroundColor: "white",
            minHeight: "36px",
            fontSize: "15px",
            height: "36px",
            transition : "box-shadow .15s"
        };
        inputObject = Object.assign(inputObject, changeInputObject);

        if(inputObject.type == "number" || inputObject.type == "tel") {
            if(!inputObject.onkeypress) {
                inputObject.onkeypress = {};
            }
            if(!inputObject.onkeypress.runCode) {
                inputObject.onkeypress.runCode = "";
            }
            inputObject.onkeypress.runCode += `return ${inputObject.type == 'tel' ? 'this.value.length < 50 && ' : ''} event.charCode >= 48 && event.charCode <= 57`;
        }

        inputObject.autocomplete = inputObject.autocomplete ? inputObject.autocomplete : 'off';
        inputObject.autofocus = inputObject.autofocus ? inputObject.autofocus : false;
        inputObject.boxShadow = inputObject.type != "textarea" ? `${inputObject.boxShadow ? inputObject.boxShadow : '0 0 0 2px transparent inset, 0 0 0 1px #0000001f inset'}` : '';
        inputObject.overflow = inputObject.overflow ? inputObject.overflow : inputObject.type == "textarea" ? 'auto' : 'hidden';

        if(inputObject.type == 'tel') {
            if(!inputObject.attributes) {
                inputObject.attributes = "";
            }
            inputObject.attributes += ` minlength="6" maxlength="50"`;
        }

        if(inputObject.type == 'url') {
            if(!inputObject.attributes) {
                inputObject.attributes = "";
            }
            inputObject.attributes += ` pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"`;
        }

        if(inputObject.type == 'date' || inputObject.type == 'datetime-local') {
            if(!inputObject.attributes) {
                inputObject.attributes = "";
            }
            inputObject.attributes += ` ${inputObject.minDate ? 'min="'+encodeLib.toIsoString(inputObject.minDate).slice(0, 16)+'"' : ''} ${inputObject.maxDate ? 'max="'+encodeLib.toIsoString(inputObject.minDate).slice(0, 16)+'"' : ''}`;
        }

        if(!inputObject.style) {
            inputObject.style = "";
        }
        if(inputObject.contentType == "button") {
            inputObject.style += ` -webkit-appearance: button;`;
        }
        else {
            inputObject.style += ` text-overflow: ellipsis; vertical-align: middle; -webkit-appearance: none;`;
        }
        

        if(!inputObject.class) {
            inputObject.class = "";
        }
        inputObject.class += " enInput";

        if(inputObject.contentType != "button") {

            if(!inputObject.onfocusIn) {
                inputObject.onfocusIn = {};
            }
            if(!inputObject.onfocusIn.runCode) {
                inputObject.onfocusIn.runCode = "";
            }
            if(inputObject.contentType == "textarea") {
                inputObject.onfocusIn.runCode += `this.parentNode.style.borderColor='${inputObject.focusBoxShadowColor ? inputObject.focusBoxShadowColor : '#1a73e8'}';this.parentNode.parentNode.style.borderColor='${inputObject.focusBoxShadowColor ? inputObject.focusBoxShadowColor : '#1a73e8'}';this.parentNode.parentNode.classList.add('focusedTextArea');`;
            }
            else {
                inputObject.onfocusIn.runCode += `this.style.boxShadow='0 0 0 2px ${inputObject.focusBoxShadowColor ? inputObject.focusBoxShadowColor : 'transparent'} inset, 0 0 0 1px #0000001f inset';`;
            }

            if(!inputObject.onfocusOut) {
                inputObject.onfocusOut = {};
            }
            if(!inputObject.onfocusOut.runCode) {
                inputObject.onfocusOut.runCode = "";
            }
            if(inputObject.contentType == "textarea") {
                inputObject.onfocusOut.runCode += `this.parentNode.style.borderColor='#0000001f';this.parentNode.parentNode.style.borderColor='transparent';this.parentNode.parentNode.classList.remove('focusedTextArea');`;
            }
            else {
                inputObject.onfocusOut.runCode += `this.style.boxShadow='0 0 0 2px transparent inset, 0 0 0 1px #0000001f inset';`;
            }

        }

        if(!inputObject.onmouseover) {
            inputObject.onmouseover = {};
        }
        if(!inputObject.onmouseover.runCode) {
            inputObject.onmouseover.runCode = "";
        }
        if(inputObject.contentType == "button") {
            inputObject.onmouseover.runCode += `${inputObject.hoverInBoxShadow ? "this.style.boxShadow='"+inputObject.hoverInBoxShadow+"';" : ''}this.style.backgroundColor='${inputObject.hoverInBackgroundColor ? inputObject.hoverInBackgroundColor : '#1967d2'}';${inputObject.hoverInColor ? "this.style.color='"+inputObject.hoverInColor+"';" : ''}`;
        }
        else {
            inputObject.onmouseover.runCode += "this.style.textOverflow='unset';";
        }

        if(!inputObject.onmouseout) {
            inputObject.onmouseout = {};
        }
        if(!inputObject.onmouseout.runCode) {
            inputObject.onmouseout.runCode = "";
        }
        if(inputObject.contentType == "button") {
            inputObject.onmouseout.runCode += `${inputObject.hoverOutBoxShadow ? "this.style.boxShadow='"+inputObject.hoverOutBoxShadow+"';" : ''}this.style.backgroundColor='${inputObject.hoverOutBackgroundColor ? inputObject.hoverOutBackgroundColor : '#1a73e8'}';${inputObject.hoverOutColor ? "this.style.color='"+inputObject.hoverOutColor+"';" : ''}`;
        }
        else {
            inputObject.onmouseout.runCode += "this.style.textOverflow='ellipsis';";
        }

        return this.content(inputObject);
    },
    urlInputValidation: function(urlText) {
        let urlRegexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        return urlRegexp.test(urlText);
    },
    textarea: function(changeTextareaObject = {}) {
        let textareaObject = {
            contentType: "textarea",
            type: "textarea",
            minHeight: "150px"
        };
        textareaObject = Object.assign(textareaObject, changeTextareaObject);

        if(!textareaObject.class) {
            textareaObject.class = "";
        }
        textareaObject.class += " enTextarea";

        if(!encodeLib.outerClickFunctions.includes(encodeLib.textareaOuterClickFunc)) {
            encodeLib.outerClickFunctions.push(encodeLib.textareaOuterClickFunc);
        }

        if(!textareaObject.onkeyup) {
            textareaObject.onkeyup = {};
        }
        if(!textareaObject.onkeyup.runCode) {
            textareaObject.onkeyup.runCode = "";
        }
        textareaObject.onkeyup.runCode += "this.style.height = this.scrollHeight + 'px';";

        return this.input(textareaObject);
    },
    textareaOuterClickFunc: function(e) {
        let thisElement = $(".enTextareaDiv");
        if(thisElement.find("textarea")[0] !== document.activeElement && !thisElement.is(e.target) && thisElement.has(e.target).length === 0) 
        {
            thisElement.find(".enInput").blur();
        }
        else {
            let targetElement = $(e.target).parent();
            thisElement.each(function() {
                if($(this).hasClass('focusedTextArea') || !targetElement.hasClass('focusedTextArea') || targetElement.hasClass('focusedTextArea')) {
                    return;
                }
                else {
                    $(this).find(".enInput").blur();
                }
            });
        }
    },
    button: function(changeButtonObject = {}) {
        let buttonObject = {
            content: "",
            contentType: "button",
            type: "text",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "8px",
            lineHeight: "29px",
            letterSpacing: ".25px",
            minWidth: "60px",
            transition: "box-shadow .2s ease,background-color .2s ease",
            positionX: "center",
            positionY: "center",
            boxShadow: "0 0 0 0 rgb(0 0 0 / 20%), 0 0 0 0 rgb(0 0 0 / 14%), 0 0 0 0 rgb(0 0 0 / 12%)",
            cursor: "pointer",
            contentFitX: "100%",
            padding: "1px 10px 0 10px",
            backgroundColor: "#1a73e8",
            color: "white",
            width: "max-content",
            border: "0",
            textAlign: "center",
            hoverInBackgroundColor: "",
            hoverInBoxShadow: "",
            hoverInColor: "",
            hoverOutBackgroundColor: "",
            hoverOutBoxShadow: "",
            hoverOutColor: ""
        };
        buttonObject = Object.assign(buttonObject, changeButtonObject);

        if(!buttonObject.class) {
            buttonObject.class = "";
        }
        buttonObject.class += " enButton";

        return this.input(buttonObject);
    },
    checkbox: function(changeCheckboxObject={}) {
        let checkboxObject = {
            checkbox: {
                id: "",
                class: "",
                checkInitiate: false,
                checkOutColor: "",
                checkInColor: "",
                checkboxHoverColor: "",
                checkboxBorderRadius: "",
                checkboxOuterTop: "",
                checkboxPadding: "",
                checkboxPositionY: "",                
                checkboxSvgSize: "",
                checkboxSvgColor: "",
                checkboxClickCursor: "",
                checkOutFunction: "",
                checkInFunction: "",
                checkboxValue: "",
                checkboxName: "",
                checkboxNameColor: "",
                checkboxNamePadding: "",
                checkboxNameMargin: "",
                checkboxContent: "",
                checkboxContentWidth: "",
                checkboxPosition: "", /* left, right */
                checkboxOnclick: "checkbox", /* checkbox, checkboxName, checkboxContent */
                checkboxInAction: "", /* show 200, fadeIn */
                checkboxOutAction: "" /* hide 200, fadeOut 100 */
            },
            outer: {
                direction: "row",
                positionY: "center",
                overflow: "unset",
                innerOverflow: "unset"
            }
        };
        if(changeCheckboxObject.checkbox) {
            checkboxObject.checkbox = Object.assign(checkboxObject.checkbox, changeCheckboxObject.checkbox);
        }
        if(changeCheckboxObject.outer) {
            checkboxObject.outer = Object.assign(checkboxObject.outer, changeCheckboxObject.outer);
        }

        let checkboxElementObject = {
            id: `${checkboxObject.checkbox.id ? checkboxObject.checkbox.id : ""}`,
            class: `enCheckboxDiv ${checkboxObject.checkbox.class ? checkboxObject.checkbox.class : ""}`,            
            top: checkboxObject.checkbox.checkboxOuterTop ? checkboxObject.checkbox.checkboxOuterTop : "",
            position: "relative",
            width: "max-content",
            height: "max-content",
            overflow: "unset",
            innerOverflow: "unset"
        };

        let checkboxNameElementObject = {
            content: checkboxObject.checkbox.checkboxName,
            color: checkboxObject.checkbox.checkboxNameColor ? checkboxObject.checkbox.checkboxNameColor : "",
            padding: checkboxObject.checkbox.checkboxNamePadding ? checkboxObject.checkbox.checkboxNamePadding : checkboxObject.checkbox.checkboxPosition == "right" ? "0 10px 0 0" : "0 0 0 10px",
            cursor: "default",
            positionY: "center",
            direction: "row",
            class: "checkboxName"
        };

        let checkboxWithNameElementObject = {
            direction: "row",
            width: checkboxObject.checkbox.checkboxContentWidth ? `calc(100% - ${checkboxObject.checkbox.checkboxContentWidth})` : "max-content",            
            positionY: checkboxObject.checkbox.checkboxPositionY ? checkboxObject.checkbox.checkboxPositionY : "center",
            margin: checkboxObject.checkbox.checkboxNameMargin ? checkboxObject.checkbox.checkboxNameMargin : checkboxObject.checkbox.checkboxContent ? checkboxObject.checkbox.checkboxPosition == "right" ? "0 0 0 5px" : "0 5px 0 0" : "",
            overflow: "unset",
            innerOverflow: "unset",
            class: "checkboxNameElement"
        };
        
        if(checkboxObject.checkbox.checkboxOnclick == "checkbox") {
            checkboxObject.checkbox.checkInFunction += `encodeLib.elementAction("${checkboxObject.checkbox.checkboxInAction ? checkboxObject.checkbox.checkboxInAction : 'show 200'}", $(this).next());`;
            checkboxObject.checkbox.checkOutFunction += `encodeLib.elementAction("${checkboxObject.checkbox.checkboxOutAction ? checkboxObject.checkbox.checkboxOutAction : 'hide 200'}", $(this));`;
            checkboxObject.checkbox.checkboxHoverColor = `$(this).css({'box-shadow': '0px 0px 15px ${checkboxObject.checkbox.checkboxHoverColor ? checkboxObject.checkbox.checkboxHoverColor : '#1a73e869'}'});`;
        }

        if(checkboxObject.checkbox.checkboxOnclick == "checkboxName") {
            checkboxWithNameElementObject.attributes = ` ${checkboxObject.checkbox.checkInitiate == false ? "" : 'on="true" checkbox="true"'} checkboxInAction="${checkboxObject.checkbox.checkboxInAction ? checkboxObject.checkbox.checkboxInAction : 'show 200'}" checkboOutAction="${checkboxObject.checkbox.checkboxOutAction ? checkboxObject.checkbox.checkboxOutAction : 'hide 200'}"`;
            checkboxWithNameElementObject.onclick = {runCode: `encodeLib.toggleEvent(this, encodeLib.checkboxInFunction, encodeLib.checkboxOutFunction);${checkboxObject.checkbox.checkInFunction && checkboxObject.checkbox.checkOutFunction ? `encodeLib.toggleEvent(this, ${checkboxObject.checkbox.checkInFunction}, ${checkboxObject.checkbox.checkOutFunction}, 'checkbox');` : ''}`};
            checkboxWithNameElementObject.cursor = checkboxObject.checkbox.checkboxClickCursor ? checkboxObject.checkbox.checkboxClickCursor : "pointer";
            checkboxNameElementObject.cursor = checkboxObject.checkbox.checkboxClickCursor ? checkboxObject.checkbox.checkboxClickCursor : "pointer";
            checkboxWithNameElementObject.onmouseover = {runCode: `$(this).find('.enCheckbox').css({'box-shadow': '0px 0px 15px ${checkboxObject.checkbox.checkboxHoverColor ? checkboxObject.checkbox.checkboxHoverColor : '#1a73e869'}'});`};
            checkboxWithNameElementObject.onmouseout = {runCode: `$(this).find('.enCheckbox').css({'box-shadow': '0px 0px 15px transparent'});`};
        }

        if(checkboxObject.checkbox.checkboxOnclick == "checkboxContent") {
            if(!checkboxObject.outer.onclick) {
                checkboxObject.outer.onclick = {};
            }
            if(!checkboxObject.outer.onclick.runCode) {
                checkboxObject.outer.onclick.runCode = "";
            }
            checkboxObject.attributes = ` ${checkboxObject.checkbox.checkInitiate == false ? "" : 'on="true" checkbox="true"'} checkboxInAction="${checkboxObject.checkbox.checkboxInAction ? checkboxObject.checkbox.checkboxInAction : 'show 200'}" checkboOutAction="${checkboxObject.checkbox.checkboxOutAction ? checkboxObject.checkbox.checkboxOutAction : 'hide 200'}"`;
            checkboxObject.outer.onclick.runCode += `encodeLib.toggleEvent(this, encodeLib.checkboxInFunction, encodeLib.checkboxOutFunction);${checkboxObject.checkbox.checkInFunction && checkboxObject.checkbox.checkOutFunction ? `encodeLib.toggleEvent(this, ${checkboxObject.checkbox.checkInFunction}, ${checkboxObject.checkbox.checkOutFunction}, 'checkbox');` : ''}`;
            checkboxObject.outer.cursor = checkboxObject.checkbox.checkboxClickCursor ? checkboxObject.checkbox.checkboxClickCursor : "pointer";
            checkboxWithNameElementObject.cursor = checkboxObject.checkbox.checkboxClickCursor ? checkboxObject.checkbox.checkboxClickCursor : "pointer";
            checkboxNameElementObject.cursor = checkboxObject.checkbox.checkboxClickCursor ? checkboxObject.checkbox.checkboxClickCursor : "pointer";
            if(!checkboxObject.outer.onmouseover) {
                checkboxObject.outer.onmouseover = {};
            }
            if(!checkboxObject.outer.onmouseover.runCode) {
                checkboxObject.outer.onmouseover.runCode = "";
            }
            checkboxObject.outer.onmouseover.runCode = `$(this).find('.enCheckbox').css({'box-shadow': '0px 0px 15px ${checkboxObject.checkbox.checkboxHoverColor ? checkboxObject.checkbox.checkboxHoverColor : '#1a73e869'}'});`;
            if(!checkboxObject.outer.onmouseout) {
                checkboxObject.outer.onmouseout = {};
            }
            if(!checkboxObject.outer.onmouseout.runCode) {
                checkboxObject.outer.onmouseout.runCode = "";
            }
            checkboxObject.outer.onmouseout.runCode = `$(this).find('.enCheckbox').css({'box-shadow': '0px 0px 15px transparent'});`;
        }

        let checkboxContent = `<div class="enCheckbox" onmouseover="${checkboxObject.checkbox.checkboxHoverColor}" onmouseout="$(this).css({'box-shadow': '0px 0px 15px transparent'});" style="width: 15px; height: 15px; display: flex; align-items: center; justify-content: center; cursor: ${checkboxObject.checkbox.checkboxClickCursor ? checkboxObject.checkbox.checkboxClickCursor : "pointer"}; transition: background-color 90ms cubic-bezier(0, 0, 0.2, 0.1), opacity 90ms cubic-bezier(0, 0, 0.2, 0.1); position: relative; border-radius: ${checkboxObject.checkbox.checkboxBorderRadius ? checkboxObject.checkbox.checkboxBorderRadius : '2px'}; padding: ${checkboxObject.checkbox.checkboxPadding ? checkboxObject.checkbox.checkboxPadding : '0'};">
                                <span onclick="${checkboxObject.checkbox.checkOutFunction}" class="checkOut" style="border: 2px solid ${checkboxObject.checkbox.checkOutColor ? checkboxObject.checkbox.checkOutColor : "#919da5"};width: 11px;height: 11px;display: block;position: absolute;top: 0;left: 0;z-index: 0; border-radius: ${checkboxObject.checkbox.checkboxBorderRadius ? checkboxObject.checkbox.checkboxBorderRadius : '2px'}; padding: ${checkboxObject.checkbox.checkboxPadding ? checkboxObject.checkbox.checkboxPadding : '0'};"></span>
                                <span onclick="${checkboxObject.checkbox.checkInFunction}" checkInitiate="${checkboxObject.checkbox.checkInitiate}" class="checkIn" style="background-color: ${checkboxObject.checkbox.checkInColor ? checkboxObject.checkbox.checkInColor : "#1a73e8"};width: 15px;height: 15px;position: absolute;display: flex;align-items: center;justify-content: center;z-index: 1;border-radius: ${checkboxObject.checkbox.checkboxBorderRadius ? checkboxObject.checkbox.checkboxBorderRadius : '2px'}; padding: ${checkboxObject.checkbox.checkboxPadding ? checkboxObject.checkbox.checkboxPadding : '0'};">${this.svgLib["check"].replace('stroke="currentColor"', `stroke="${checkboxObject.checkbox.checkboxSvgColor ? checkboxObject.checkbox.checkboxSvgColor : 'white'}"`).replace("<svg ", `<svg style="position: absolute;${checkboxObject.checkbox.checkboxSvgSize ? `width: ${checkboxObject.checkbox.checkboxSvgSize}; height: ${checkboxObject.checkbox.checkboxSvgSize};` : ''}" `)}</span>
                                <input class="checkbox" type="checkbox" ${checkboxObject.checkbox.checkboxName ? 'name="'+checkboxObject.checkbox.checkboxName+'"' : ""} ${checkboxObject.checkbox.checkboxValue ? 'value="'+checkboxObject.checkbox.checkboxValue+'"' : ""} hidden>
                               </div>`;
        checkboxContent += encodeLib.onLoaded({functionName: "encodeLib.checkboxInitiate"});
        checkboxElementObject.content = checkboxContent;
        let checkboxElement = encodeLib.content(checkboxElementObject);
        let checkboxNameElement = encodeLib.content(checkboxNameElementObject);

        checkboxWithNameElementObject.content = checkboxObject.checkbox.checkboxPosition == "right" ? checkboxNameElement+checkboxElement : checkboxElement+checkboxNameElement;                
        let checkboxWithNameElement = encodeLib.content(checkboxWithNameElementObject);

        checkboxObject.outer.content = checkboxObject.checkbox.checkboxPosition == "right" ? checkboxObject.checkbox.checkboxContent+checkboxWithNameElement : checkboxWithNameElement+checkboxObject.checkbox.checkboxContent;
        
        return this.content(checkboxObject.outer);

    },
    checkboxInitiate: function(thisElement) {
        if(thisElement.parent().find(".checkIn").attr("checkInitiate") == "false") {
            thisElement.parent().find(".checkIn").hide();
        }
        thisElement.parent().parent().parent().next(".checkboxName").css({width: `calc(100% - ${thisElement.parent().parent().parent().width()+'px'})`});
    },
    checkboxInFunction: function(thisElement) {
        encodeLib.elementAction(thisElement.attr("checkboxInAction"), thisElement.find('.checkIn'));
    },
    checkboxOutFunction: function(thisElement) {
        encodeLib.elementAction(thisElement.attr("checkboOutAction"), thisElement.find('.checkIn'));
    },
    dropDown: function(changeDropDownObject = {}) {

        /* let dropDownObject = {
            select: {
                dropDwonName : "",
                optionObject: {},
                attributesObj: {},
                svgColor: "#041e49b3",
                inputFocusClassStyle: "",
                optionHoverClassStyle: "",
                selectOptionClickClassStyle: "",
                onChange: "",
            },
            outer: {
                id: "",
                width: "",
                attributes: ``
            },
            button: {
                class: "selectButton",
                cursor: "pointer",
                zIndex: 1,
                backgroundColor: "white",
                textTransform: "capitalize",
                lineClamp: 1,
                color: ""
            },
            option: {
                attributes: ``,
                color: ""
            },
            dropDwon: {
                borderRadius: "4px",
                top: "39px",
                direction: "",
                cursor: "pointer",
                maxHeight: "150px",
                padding: "8px 0",
                backgroundColor: "white",
                hidden: true
            }
        }; */

        let dropDownObject = {
            select: {
                dropDwonName : "",
                optionObject: {},
                optionClassObj: {},
                attributesObj: {},
                showValue: false,
                type: "single", /* string - once, empty, single, multiple */
                svgColor: "#041e49b3",
                svgElement: "",
                svgOnclick: false,
                showSelected: false,
                inputFocusClassStyle: "", /* for button - string - box-shadow: 0px 0px 1px; , etc */
                optionHoverClassStyle: "", /* for option - string - background-color: green;color: red; */
                selectOptionClickClassStyle: "", /* string - background-color: green;color: red; */
                onChange: "" /* function */
            },
            outer: {
                id: "",
                class: "selectOptionOuter",
                width: "",
                contentType: "content",
                contentFitX: "100%",
                position: "relative",
                overflow: "unset",
                innerOverflow: "unset",
                attributes: ``
            },
            button: {
                contentType: "buttonView",
                class: "selectButton",
                cursor: "pointer",
                color: "rgba(0, 0, 0, 0.55)",
                padding: "1px 16px 0 8px",
                zIndex: 1,
                backgroundColor: "white",
                textTransform: "capitalize",
                lineClamp: 1,
                onclick: {
                    thisElement: true,
                    eventElement: true,
                    functionName: "encodeLib.selectOptionButtonOnClick"
                }
            },
            option: {
                class: "option",
                color: "rgba(0, 0, 0, 0.55)",
                contentType: "text",
                fontSize: "14px",
                positionY: "center",
                contentFitX: "100%",
                minHeight: "32px",
                cursor: "pointer",
                padding: "8px 16px",
                textTransform: "capitalize",
                transition: "0.3s",
                attributes: ``,
                onmouseover: {
                    thisElement: true,
                    functionName: "encodeLib.addOptionHoverClass"
                },
                onmouseout: {
                    thisElement: true,
                    functionName: "encodeLib.removeOptionHoverClass"
                },
                onclick: {
                    thisElement: true,
                    functionName: "encodeLib.selectOptionOnClick"
                },
                style: "pointer-events: auto;-webkit-font-smoothing: antialiased;overflow-x: auto;"
            },
            dropDwon: {
                class: "dropDown",
                contentType: "content",
                contentFitX: "100%",
                lineHeight: "20px",
                outline: "2px solid transparent",
                borderRadius: "4px",
                fontSize: "15px",
                transition: "box-shadow .15s",
                position: "absolute",
                top: "39px",
                direction: "",
                positionY: "center",
                boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)",
                cursor: "pointer",
                zIndex: 0,
                maxHeight: "150px",
                padding: "8px 0",
                style: "pointer-events: auto;",
                backgroundColor: "white",
                hidden: true,
                scrollStyle: false
            }
        };

        if(changeDropDownObject.select) {
            dropDownObject.select = Object.assign(dropDownObject.select, changeDropDownObject.select);
        }
        if(changeDropDownObject.outer) {
            if(changeDropDownObject.outer.class) {
                changeDropDownObject.outer.class = changeDropDownObject.outer.class+" selectOptionOuter";
            }
            dropDownObject.outer = Object.assign(dropDownObject.outer, changeDropDownObject.outer);
        }
        if(changeDropDownObject.button) {
            dropDownObject.button = Object.assign(dropDownObject.button, changeDropDownObject.button);
        }
        if(changeDropDownObject.option) {
            dropDownObject.option = Object.assign(dropDownObject.option, changeDropDownObject.option);
        }
        if(changeDropDownObject.dropDwon) {
            dropDownObject.dropDwon = Object.assign(dropDownObject.dropDwon, changeDropDownObject.dropDwon);
        }

        if(dropDownObject.select.inputFocusClassStyle) {
            dropDownObject.button.attributes = `inputFocusClassStyle="${dropDownObject.select.inputFocusClassStyle}"`;
        }

        if(dropDownObject.select.onChange && dropDownObject.outer.id) {
            encodeLib.selectOptionOnChange[dropDownObject.outer.id] = dropDownObject.select.onChange;
        }

        if(dropDownObject.select.__encode_ownonchange && dropDownObject.outer.id) {
            encodeLib.selectOptionOnChange[dropDownObject.outer.id+"__encode_ownonchange"] = dropDownObject.select.__encode_ownonchange;
        }

        if(dropDownObject.select.svgOnclick) {
            dropDownObject.button.onclick.functionName = "encodeLib.selectOptionButtonOnlyOnClick";
        }
        
        let svgElement = "";
        if(!dropDownObject.select.svgElement) {
            let svgObject = {
                outer: {
                    class: "selectButtonSvg",
                    width: "10px",
                    position: "relative"
                },
                svg: {
                    icon: "downArrow",
                    fill: dropDownObject.select.svgColor
                }
            };
            svgElement = encodeLib.svg(svgObject);
        }
        else {
            svgElement = dropDownObject.select.svgElement;
        }
        
        let onLoadedRunCode = "";
        dropDownObject.button.content = {textContent: dropDownObject.select.dropDwonName, svgContent: svgElement};
        let buttonObject = dropDownObject.button;
        let selectButtonElement = encodeLib.content(buttonObject);

        let optionIds = Object.keys(dropDownObject.select.optionObject);
        let optionClassObj = dropDownObject.select.optionClassObj;
        let attributesObj = dropDownObject.select.attributesObj;
        let optionElements = "";
        let inputOptionHtml = "";
        for(let i=0; i<optionIds.length; i++) {

            let id = optionIds[i];
            let value = dropDownObject.select.optionObject[id];
            let optionClasss = optionClassObj[id] && typeof(optionClassObj[id]) == "string" ? " "+optionClassObj[id] : "";
            let attributes = attributesObj[id] && typeof(attributesObj[id]) == "string" ? attributesObj[id] : "";
            if(!id.includes("__encode_head") && !id.includes("__encode_empty")) {
                attributes += attributes.includes(`showvalue="`) ? "" : dropDownObject.select.showValue ? ` showvalue="true"` : "";
                attributes += attributes.includes(`type="`) ? "" : dropDownObject.select.type ? ` type="${dropDownObject.select.type}"` : "";
                attributes += attributes.includes(`showselected="`) ? "" : dropDownObject.select.showSelected ? ` showselected="${dropDownObject.select.showSelected}"` : "";
            }

            if(!id.includes("__encode")) {
                inputOptionHtml += `<option value="${id}">${value}</option>`;
            }

            dropDownObject.option.content = value;
            dropDownObject.option.attributes = ` ${attributes} optionId="${id}" optionValue="${id.includes("__encode_showValue") || (!id.includes("__encode_notValue") && !id.includes("__encode_head") && !id.includes("__encode_empty")) ? value : ''}"`;
            if(id.includes("__encode_head") && dropDownObject.option.__encode_head_optionHoverClassStyle) {
                dropDownObject.option.attributes = dropDownObject.option.attributes+" "+`optionHoverClassStyle="${dropDownObject.option.__encode_head_optionHoverClassStyle}"`;
            }
            else if(id.includes("__encode_empty") && dropDownObject.option.__encode_empty_optionHoverClassStyle) {
                dropDownObject.option.attributes = dropDownObject.option.attributes+" "+`optionHoverClassStyle="${dropDownObject.option.__encode_empty_optionHoverClassStyle}"`;
            }
            else if(id.includes("__encode_head")) {
                dropDownObject.option.attributes = dropDownObject.option.attributes+" "+`optionHoverClassStyle="background-color: transparent !important;font-weight: bold !important;cursor: default !important;"`;
            }
            else if(id.includes("__encode_empty")) {
                dropDownObject.option.attributes = dropDownObject.option.attributes+" "+`optionHoverClassStyle="background-color: transparent !important;color: rgb(0 0 0 / 25%) !important;cursor: default !important;"`;
            }
            else if(!id.includes("__encode_head") && !id.includes("__encode_empty") && id.includes("__encode") && dropDownObject.option.__encode_optionHoverClassStyle) {
                dropDownObject.option.attributes = dropDownObject.option.attributes+" "+`optionHoverClassStyle="${dropDownObject.option.__encode_optionHoverClassStyle}"`;
            }
            else if(dropDownObject.select.optionHoverClassStyle) {
                dropDownObject.option.attributes = dropDownObject.option.attributes+" "+`optionHoverClassStyle="${dropDownObject.select.optionHoverClassStyle}"`;
            }

            if(id.includes("__encode_head") && dropDownObject.option.__encode_head_selectOptionClickClassStyle) {
                dropDownObject.option.attributes = dropDownObject.option.attributes+" "+`selectOptionClickClassStyle="${dropDownObject.option.__encode_head_selectOptionClickClassStyle}"`;
            }
            else if(id.includes("__encode_empty") && dropDownObject.option.__encode_empty_selectOptionClickClassStyle) {
                dropDownObject.option.attributes = dropDownObject.option.attributes+" "+`selectOptionClickClassStyle="${dropDownObject.option.__encode_empty_selectOptionClickClassStyle}"`;
            }
            else if(id.includes("__encode_head")) {
                dropDownObject.option.attributes = dropDownObject.option.attributes+" "+`selectOptionClickClassStyle="background-color: transparent !important;font-weight: bold !important;cursor: default !important;"`;
            }
            else if(id.includes("__encode_empty")) {
                dropDownObject.option.attributes = dropDownObject.option.attributes+" "+`selectOptionClickClassStyle="background-color: transparent !important;color: rgb(0 0 0 / 25%) !important;cursor: default !important;"`;
            }
            else if(!id.includes("__encode_head") && !id.includes("__encode_empty") && id.includes("__encode") && dropDownObject.option.__encode_selectOptionClickClassStyle) {
                dropDownObject.option.attributes = dropDownObject.option.attributes+" "+`selectOptionClickClassStyle="${dropDownObject.option.__encode_selectOptionClickClassStyle}"`;
            }
            else if(dropDownObject.select.selectOptionClickClassStyle) {
                dropDownObject.option.attributes = dropDownObject.option.attributes+" "+`selectOptionClickClassStyle="${dropDownObject.select.selectOptionClickClassStyle}"`;
            }

            let optionObject = JSON.parse(JSON.stringify(dropDownObject.option));
            optionObject.class += optionClasss;
            if(attributes.includes(`initialSelected="true"`)) {
                optionObject.class += " initialSelectedOption";
                attributes.replaceAll(`initialSelected="true"`, "");
                onLoadedRunCode += ` $('.initialSelectedOption').click().removeClass('initialSelectedOption');`;
            }

            if(id.includes("__encode") && !id.includes("__encode_head") && !id.includes("__encode_empty")) {
                optionObject.backgroundColor = optionObject.__encode_backgroundColor ? optionObject.__encode_backgroundColor : optionObject.backgroundColor;
                optionObject.fontWeight = optionObject.__encode_fontWeight ? optionObject.__encode_fontWeight : optionObject.fontWeight;
                optionObject.color = optionObject.__encode_color ? optionObject.__encode_color : optionObject.color;
                optionObject.onclick.functionName = optionObject.__encode_onclick ? optionObject.__encode_onclick : optionObject.onclick.functionName;
                optionObject.padding = optionObject.__encode_padding ? optionObject.__encode_padding : optionObject.padding;
                optionObject.style = optionObject.style ? optionObject.style : "";
                optionObject.style = optionObject.__encode_style ? optionObject.style+optionObject.__encode_style : optionObject.style;
            }
            if(id.includes("__encode_empty")) {
                optionObject.backgroundColor = optionObject.__encode_empty_backgroundColor ? optionObject.__encode_empty_backgroundColor : optionObject.backgroundColor;
                optionObject.fontWeight = optionObject.__encode_empty_fontWeight ? optionObject.__encode_empty_fontWeight : "bold";
                optionObject.color = optionObject.__encode_empty_color ? optionObject.__encode_empty_color : "rgba(0, 0, 0, 0.25)";
                optionObject.onclick.functionName = optionObject.__encode_empty_onclick ? optionObject.__encode_empty_onclick : "";
                optionObject.padding = optionObject.__encode_empty_padding ? optionObject.__encode_empty_padding : optionObject.padding;
                optionObject.style = optionObject.style ? optionObject.style : "";
                optionObject.style = optionObject.__encode_empty_style ? optionObject.style+optionObject.__encode_empty_style : optionObject.style;
            }
            if(id.includes("__encode_head")) {
                optionObject.backgroundColor = optionObject.__encode_head_backgroundColor ? optionObject.__encode_head_backgroundColor : optionObject.backgroundColor;
                optionObject.fontWeight = optionObject.__encode_head_fontWeight ? optionObject.__encode_head_fontWeight : "bold";
                optionObject.color = optionObject.__encode_head_color ? optionObject.__encode_head_color : optionObject.color;
                optionObject.onclick.functionName = optionObject.__encode_head_onclick ? optionObject.__encode_head_onclick : "";
                optionObject.padding = optionObject.__encode_head_padding ? optionObject.__encode_head_padding : optionObject.padding;
                optionObject.style = optionObject.style ? optionObject.style : "";
                optionObject.style = optionObject.__encode_head_style ? optionObject.style+optionObject.__encode_head_style : optionObject.style;
            }
            if(dropDownObject.select.showSelected || attributes.includes(`showselected="`) || dropDownObject.select.showSelectedSvg) {
                let showSelectedSvgOptionObject = {};
                showSelectedSvgOptionObject.width = optionObject.width;
                showSelectedSvgOptionObject.height = optionObject.height;
                showSelectedSvgOptionObject.padding = optionObject.padding;
                showSelectedSvgOptionObject.fontSize = optionObject.fontSize;
                showSelectedSvgOptionObject.fontFamily = optionObject.fontFamily;
                showSelectedSvgOptionObject.fontWeight = optionObject.fontWeight;
                showSelectedSvgOptionObject.lineClamp = optionObject.lineClamp;
                showSelectedSvgOptionObject.content = optionObject.content;    
                showSelectedSvgOptionObject.color = "currentColor";
                showSelectedSvgOptionObject.cursor = "inherit";                
                showSelectedSvgOptionObject.contentType = "text";
                showSelectedSvgOptionObject.contentFitX = "100%";
                let textContentElement = encodeLib.content(showSelectedSvgOptionObject);
                let svgElementSelected = "";
                if(!dropDownObject.select.showSelectedSvg) {
                    svgObject = {
                        outer: {
                            class: "dropdownOptionSelectSvg",
                            width: (encodeLib.strToNumFillter(dropDownObject.option.fontSize, "number")+8)+"px",
                            height: (encodeLib.strToNumFillter(dropDownObject.option.fontSize, "number")+8)+"px",
                            margin: `${dropDownObject.select.showSelectedSvgMargin ? dropDownObject.select.showSelectedSvgMargin : `1px ${dropDownObject.option.padding && dropDownObject.option.padding.split(" ")[1] ? dropDownObject.option.padding.split(" ")[1] : "0"} 0 0`}`,
                            display: "none",
                            color: "currentColor"
                        },
                        svg: {
                            icon: "tick",
                            width: (encodeLib.strToNumFillter(dropDownObject.option.fontSize, "number")+8)+"px",
                            height: (encodeLib.strToNumFillter(dropDownObject.option.fontSize, "number")+8)+"px"
                        }
                    };
                    svgElementSelected = encodeLib.svg(svgObject);
                }
                else {
                    svgElementSelected = dropDownObject.select.showSelectedSvg;
                }
                optionObject.content = textContentElement+svgElementSelected;
                optionObject.padding = "";
                optionObject.direction = "row";
                optionObject.positionX = "space-between";
                optionObject.positionY = "center";
                optionObject.contentType = "content";
            }
            let optionElement = encodeLib.content(optionObject);
            optionElements += optionElement;

        }

        let inputSelectOptionHtml = `<select class="selectOption" ${dropDownObject.select.type == "multiple" ? 'multiple' : ''} style="display: none;"><option value="">${dropDownObject.select.dropDwonName}</option>${inputOptionHtml}</select>`;
        
        let optionInnerObject = {
                content: optionElements,
                contentType: "content",
                contentFitX: "100%",
                maxHeight: dropDownObject.dropDwon.maxHeight,
                scrollbarWidth: dropDownObject.dropDwon ? dropDownObject.dropDwon.scrollbarWidth : "",
                overflow: "auto",
                padding: dropDownObject.dropDwon.padding,
                display: "block"
        };
        delete dropDownObject.dropDwon.padding;
        let optionInnerElement = encodeLib.content(optionInnerObject);
        
        let optionOuterObject = dropDownObject.dropDwon;
        let scrollStyle = "";
        if(dropDownObject.outer.id && dropDownObject.dropDwon.scrollStyle) {
            scrollStyle = encodeLib.scrollStyle({element: `#${dropDownObject.outer.id} .dropDown .content .enContent`, scrollY: "2px"});
        }
        dropDownObject.dropDwon.content = optionInnerElement+scrollStyle;
        let optionOuterElement = encodeLib.content(optionOuterObject);

        dropDownObject.outer.content = selectButtonElement+optionOuterElement+inputSelectOptionHtml;
        dropDownObject.outer.attributes = dropDownObject.outer.attributes ? dropDownObject.outer.attributes : "";
        dropDownObject.outer.attributes += dropDownObject.select.dropDwonName ? ` dropDwonName="${dropDownObject.select.dropDwonName}"` : ""; 
        let selectOptionElement = encodeLib.content(dropDownObject.outer);

        if(!encodeLib.outerClickFunctions.includes(encodeLib.selectOptionOuterClickFunc)) {
            encodeLib.outerClickFunctions.push(encodeLib.selectOptionOuterClickFunc);
        }

        let onLoadedElement = encodeLib.onLoaded({runCode: onLoadedRunCode});

        return selectOptionElement+onLoadedElement;

    },
    dropdwonSvgElementOuterClickFunc: function(e) {
        let thisElement = $(".dropdownButtonSelectSvg");
        if (!thisElement.is(e.target) && thisElement.has(e.target).length === 0) 
        {
            encodeLib.removeInputFocusClass(thisElement);
        }
    },
    countryCode: async function() {
        /*
        * International Telephone Input v22.0.2
        * https://github.com/jackocnr/intl-tel-input.git
        * Licensed under the MIT license
        */
        /* UMD */
        (function(factory) {        
            encodeLib.countryCode = factory();
        }(() => {
            var factoryOutput = (() => {
            var __defProp = Object.defineProperty;
            var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
            var __getOwnPropNames = Object.getOwnPropertyNames;
            var __hasOwnProp = Object.prototype.hasOwnProperty;
            var __export = (target, all) => {
            for (var name in all)
                __defProp(target, name, { get: all[name], enumerable: true });
            };
            var __copyProps = (to, from, except, desc) => {
            if (from && typeof from === "object" || typeof from === "function") {
                for (let key of __getOwnPropNames(from))
                if (!__hasOwnProp.call(to, key) && key !== except)
                    __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
            }
            return to;
            };
            var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
        
            var intl_tel_input_exports = {};
            __export(intl_tel_input_exports, {
            Iti: () => Iti,
            default: () => intl_tel_input_default
            });
        
            encodeLib.rawCountryData = [
            [
                "af",
                "93"
            ],
            [
                "al",
                "355"
            ],
            [
                "dz",
                "213"
            ],
            [
                "as",
                "1",
                5,
                ["684"]
            ],
            [
                "ad",
                "376"
            ],
            [
                "ao",
                "244"
            ],
            [
                "ai",
                "1",
                6,
                ["264"]
            ],
            [
                "ag",
                "1",
                7,
                ["268"]
            ],
            [
                "ar",
                "54"
            ],
            [
                "am",
                "374"
            ],
            [
                "aw",
                "297"
            ],
            [
                "ac",
                "247"
            ],
            [
                "au",
                "61",
                0
            ],
            [
                "at",
                "43"
            ],
            [
                "az",
                "994"
            ],
            [
                "bs",
                "1",
                8,
                ["242"]
            ],
            [
                "bh",
                "973"
            ],
            [
                "bd",
                "880"
            ],
            [
                "bb",
                "1",
                9,
                ["246"]
            ],
            [
                "by",
                "375"
            ],
            [
                "be",
                "32"
            ],
            [
                "bz",
                "501"
            ],
            [
                "bj",
                "229"
            ],
            [
                "bm",
                "1",
                10,
                ["441"]
            ],
            [
                "bt",
                "975"
            ],
            [
                "bo",
                "591"
            ],
            [
                "ba",
                "387"
            ],
            [
                "bw",
                "267"
            ],
            [
                "br",
                "55"
            ],
            [
                "io",
                "246"
            ],
            [
                "vg",
                "1",
                11,
                ["284"]
            ],
            [
                "bn",
                "673"
            ],
            [
                "bg",
                "359"
            ],
            [
                "bf",
                "226"
            ],
            [
                "bi",
                "257"
            ],
            [
                "kh",
                "855"
            ],
            [
                "cm",
                "237"
            ],
            [
                "ca",
                "1",
                1,
                ["204", "226", "236", "249", "250", "263", "289", "306", "343", "354", "365", "367", "368", "382", "387", "403", "416", "418", "428", "431", "437", "438", "450", "584", "468", "474", "506", "514", "519", "548", "579", "581", "584", "587", "604", "613", "639", "647", "672", "683", "705", "709", "742", "753", "778", "780", "782", "807", "819", "825", "867", "873", "879", "902", "905"]
            ],
            [
                "cv",
                "238"
            ],
            [
                "bq",
                "599",
                1,
                ["3", "4", "7"]
            ],
            [
                "ky",
                "1",
                12,
                ["345"]
            ],
            [
                "cf",
                "236"
            ],
            [
                "td",
                "235"
            ],
            [
                "cl",
                "56"
            ],
            [
                "cn",
                "86"
            ],
            [
                "cx",
                "61",
                2,
                ["89164"]
            ],
            [
                "cc",
                "61",
                1,
                ["89162"]
            ],
            [
                "co",
                "57"
            ],
            [
                "km",
                "269"
            ],
            [
                "cg",
                "242"
            ],
            [
                "cd",
                "243"
            ],
            [
                "ck",
                "682"
            ],
            [
                "cr",
                "506"
            ],
            [
                "ci",
                "225"
            ],
            [
                "hr",
                "385"
            ],
            [
                "cu",
                "53"
            ],
            [
                "cw",
                "599",
                0
            ],
            [
                "cy",
                "357"
            ],
            [
                "cz",
                "420"
            ],
            [
                "dk",
                "45"
            ],
            [
                "dj",
                "253"
            ],
            [
                "dm",
                "1",
                13,
                ["767"]
            ],
            [
                "do",
                "1",
                2,
                ["809", "829", "849"]
            ],
            [
                "ec",
                "593"
            ],
            [
                "eg",
                "20"
            ],
            [
                "sv",
                "503"
            ],
            [
                "gq",
                "240"
            ],
            [
                "er",
                "291"
            ],
            [
                "ee",
                "372"
            ],
            [
                "sz",
                "268"
            ],
            [
                "et",
                "251"
            ],
            [
                "fk",
                "500"
            ],
            [
                "fo",
                "298"
            ],
            [
                "fj",
                "679"
            ],
            [
                "fi",
                "358",
                0
            ],
            [
                "fr",
                "33"
            ],
            [
                "gf",
                "594"
            ],
            [
                "pf",
                "689"
            ],
            [
                "ga",
                "241"
            ],
            [
                "gm",
                "220"
            ],
            [
                "ge",
                "995"
            ],
            [
                "de",
                "49"
            ],
            [
                "gh",
                "233"
            ],
            [
                "gi",
                "350"
            ],
            [
                "gr",
                "30"
            ],
            [
                "gl",
                "299"
            ],
            [
                "gd",
                "1",
                14,
                ["473"]
            ],
            [
                "gp",
                "590",
                0
            ],
            [
                "gu",
                "1",
                15,
                ["671"]
            ],
            [
                "gt",
                "502"
            ],
            [
                "gg",
                "44",
                1,
                ["1481", "7781", "7839", "7911"]
            ],
            [
                "gn",
                "224"
            ],
            [
                "gw",
                "245"
            ],
            [
                "gy",
                "592"
            ],
            [
                "ht",
                "509"
            ],
            [
                "hn",
                "504"
            ],
            [
                "hk",
                "852"
            ],
            [
                "hu",
                "36"
            ],
            [
                "is",
                "354"
            ],
            [
                "in",
                "91"
            ],
            [
                "id",
                "62"
            ],
            [
                "ir",
                "98"
            ],
            [
                "iq",
                "964"
            ],
            [
                "ie",
                "353"
            ],
            [
                "im",
                "44",
                2,
                ["1624", "74576", "7524", "7924", "7624"]
            ],
            [
                "il",
                "972"
            ],
            [
                "it",
                "39",
                0
            ],
            [
                "jm",
                "1",
                4,
                ["876", "658"]
            ],
            [
                "jp",
                "81"
            ],
            [
                "je",
                "44",
                3,
                ["1534", "7509", "7700", "7797", "7829", "7937"]
            ],
            [
                "jo",
                "962"
            ],
            [
                "kz",
                "7",
                1,
                ["33", "7"]
            ],
            [
                "ke",
                "254"
            ],
            [
                "ki",
                "686"
            ],
            [
                "xk",
                "383"
            ],
            [
                "kw",
                "965"
            ],
            [
                "kg",
                "996"
            ],
            [
                "la",
                "856"
            ],
            [
                "lv",
                "371"
            ],
            [
                "lb",
                "961"
            ],
            [
                "ls",
                "266"
            ],
            [
                "lr",
                "231"
            ],
            [
                "ly",
                "218"
            ],
            [
                "li",
                "423"
            ],
            [
                "lt",
                "370"
            ],
            [
                "lu",
                "352"
            ],
            [
                "mo",
                "853"
            ],
            [
                "mg",
                "261"
            ],
            [
                "mw",
                "265"
            ],
            [
                "my",
                "60"
            ],
            [
                "mv",
                "960"
            ],
            [
                "ml",
                "223"
            ],
            [
                "mt",
                "356"
            ],
            [
                "mh",
                "692"
            ],
            [
                "mq",
                "596"
            ],
            [
                "mr",
                "222"
            ],
            [
                "mu",
                "230"
            ],
            [
                "yt",
                "262",
                1,
                ["269", "639"]
            ],
            [
                "mx",
                "52"
            ],
            [
                "fm",
                "691"
            ],
            [
                "md",
                "373"
            ],
            [
                "mc",
                "377"
            ],
            [
                "mn",
                "976"
            ],
            [
                "me",
                "382"
            ],
            [
                "ms",
                "1",
                16,
                ["664"]
            ],
            [
                "ma",
                "212",
                0
            ],
            [
                "mz",
                "258"
            ],
            [
                "mm",
                "95"
            ],
            [
                "na",
                "264"
            ],
            [
                "nr",
                "674"
            ],
            [
                "np",
                "977"
            ],
            [
                "nl",
                "31"
            ],
            [
                "nc",
                "687"
            ],
            [
                "nz",
                "64"
            ],
            [
                "ni",
                "505"
            ],
            [
                "ne",
                "227"
            ],
            [
                "ng",
                "234"
            ],
            [
                "nu",
                "683"
            ],
            [
                "nf",
                "672"
            ],
            [
                "kp",
                "850"
            ],
            [
                "mk",
                "389"
            ],
            [
                "mp",
                "1",
                17,
                ["670"]
            ],
            [
                "no",
                "47",
                0
            ],
            [
                "om",
                "968"
            ],
            [
                "pk",
                "92"
            ],
            [
                "pw",
                "680"
            ],
            [
                "ps",
                "970"
            ],
            [
                "pa",
                "507"
            ],
            [
                "pg",
                "675"
            ],
            [
                "py",
                "595"
            ],
            [
                "pe",
                "51"
            ],
            [
                "ph",
                "63"
            ],
            [
                "pl",
                "48"
            ],
            [
                "pt",
                "351"
            ],
            [
                "pr",
                "1",
                3,
                ["787", "939"]
            ],
            [
                "qa",
                "974"
            ],
            [
                "re",
                "262",
                0
            ],
            [
                "ro",
                "40"
            ],
            [
                "ru",
                "7",
                0
            ],
            [
                "rw",
                "250"
            ],
            [
                "ws",
                "685"
            ],
            [
                "sm",
                "378"
            ],
            [
                "st",
                "239"
            ],
            [
                "sa",
                "966"
            ],
            [
                "sn",
                "221"
            ],
            [
                "rs",
                "381"
            ],
            [
                "sc",
                "248"
            ],
            [
                "sl",
                "232"
            ],
            [
                "sg",
                "65"
            ],
            [
                "sx",
                "1",
                21,
                ["721"]
            ],
            [
                "sk",
                "421"
            ],
            [
                "si",
                "386"
            ],
            [
                "sb",
                "677"
            ],
            [
                "so",
                "252"
            ],
            [
                "za",
                "27"
            ],
            [
                "kr",
                "82"
            ],
            [
                "ss",
                "211"
            ],
            [
                "es",
                "34"
            ],
            [
                "lk",
                "94"
            ],
            [
                "bl",
                "590",
                1
            ],
            [
                "sh",
                "290"
            ],
            [
                "kn",
                "1",
                18,
                ["869"]
            ],
            [
                "lc",
                "1",
                19,
                ["758"]
            ],
            [
                "mf",
                "590",
                2
            ],
            [
                "pm",
                "508"
            ],
            [
                "vc",
                "1",
                20,
                ["784"]
            ],
            [
                "sd",
                "249"
            ],
            [
                "sr",
                "597"
            ],
            [
                "sj",
                "47",
                1,
                ["79"]
            ],
            [
                "se",
                "46"
            ],
            [
                "ch",
                "41"
            ],
            [
                "sy",
                "963"
            ],
            [
                "tw",
                "886"
            ],
            [
                "tj",
                "992"
            ],
            [
                "tz",
                "255"
            ],
            [
                "th",
                "66"
            ],
            [
                "tl",
                "670"
            ],
            [
                "tg",
                "228"
            ],
            [
                "tk",
                "690"
            ],
            [
                "to",
                "676"
            ],
            [
                "tt",
                "1",
                22,
                ["868"]
            ],
            [
                "tn",
                "216"
            ],
            [
                "tr",
                "90"
            ],
            [
                "tm",
                "993"
            ],
            [
                "tc",
                "1",
                23,
                ["649"]
            ],
            [
                "tv",
                "688"
            ],
            [
                "ug",
                "256"
            ],
            [
                "ua",
                "380"
            ],
            [
                "ae",
                "971"
            ],
            [
                "gb",
                "44",
                0
            ],
            [
                "us",
                "1",
                0
            ],
            [
                "uy",
                "598"
            ],
            [
                "vi",
                "1",
                24,
                ["340"]
            ],
            [
                "uz",
                "998"
            ],
            [
                "vu",
                "678"
            ],
            [
                "va",
                "39",
                1,
                ["06698"]
            ],
            [
                "ve",
                "58"
            ],
            [
                "vn",
                "84"
            ],
            [
                "wf",
                "681"
            ],
            [
                "eh",
                "212",
                1,
                ["5288", "5289"]
            ],
            [
                "ye",
                "967"
            ],
            [
                "zm",
                "260"
            ],
            [
                "zw",
                "263"
            ],
            [
                "ax",
                "358",
                1,
                ["18"]
            ]
            ];
            var allCountries = [];
            for (let i = 0; i < encodeLib.rawCountryData.length; i++) {
            const c = encodeLib.rawCountryData[i];
            allCountries[i] = {
                name: "",
                iso2: c[0],
                dialCode: c[1],
                priority: c[2] || 0,
                areaCodes: c[3] || null,
                nodeById: {}
            };
            }
            var data_default = allCountries;
        
            var countries_default = {
            af: "Afghanistan",
            ax: "\xC5land Islands",
            al: "Albania",
            dz: "Algeria",
            as: "American Samoa",
            ad: "Andorra",
            ao: "Angola",
            ai: "Anguilla",
            aq: "Antarctica",
            ag: "Antigua & Barbuda",
            ar: "Argentina",
            am: "Armenia",
            aw: "Aruba",
            au: "Australia",
            at: "Austria",
            az: "Azerbaijan",
            bs: "Bahamas",
            bh: "Bahrain",
            bd: "Bangladesh",
            bb: "Barbados",
            by: "Belarus",
            be: "Belgium",
            bz: "Belize",
            bj: "Benin",
            bm: "Bermuda",
            bt: "Bhutan",
            bo: "Bolivia",
            ba: "Bosnia & Herzegovina",
            bw: "Botswana",
            bv: "Bouvet Island",
            br: "Brazil",
            io: "British Indian Ocean Territory",
            vg: "British Virgin Islands",
            bn: "Brunei",
            bg: "Bulgaria",
            bf: "Burkina Faso",
            bi: "Burundi",
            kh: "Cambodia",
            cm: "Cameroon",
            ca: "Canada",
            cv: "Cape Verde",
            bq: "Caribbean Netherlands",
            ky: "Cayman Islands",
            cf: "Central African Republic",
            td: "Chad",
            cl: "Chile",
            cn: "China",
            cx: "Christmas Island",
            cc: "Cocos (Keeling) Islands",
            co: "Colombia",
            km: "Comoros",
            cg: "Congo - Brazzaville",
            cd: "Congo - Kinshasa",
            ck: "Cook Islands",
            cr: "Costa Rica",
            ci: "C\xF4te d\u2019Ivoire",
            hr: "Croatia",
            cu: "Cuba",
            cw: "Cura\xE7ao",
            cy: "Cyprus",
            cz: "Czechia",
            dk: "Denmark",
            dj: "Djibouti",
            dm: "Dominica",
            do: "Dominican Republic",
            ec: "Ecuador",
            eg: "Egypt",
            sv: "El Salvador",
            gq: "Equatorial Guinea",
            er: "Eritrea",
            ee: "Estonia",
            sz: "Eswatini",
            et: "Ethiopia",
            fk: "Falkland Islands",
            fo: "Faroe Islands",
            fj: "Fiji",
            fi: "Finland",
            fr: "France",
            gf: "French Guiana",
            pf: "French Polynesia",
            tf: "French Southern Territories",
            ga: "Gabon",
            gm: "Gambia",
            ge: "Georgia",
            de: "Germany",
            gh: "Ghana",
            gi: "Gibraltar",
            gr: "Greece",
            gl: "Greenland",
            gd: "Grenada",
            gp: "Guadeloupe",
            gu: "Guam",
            gt: "Guatemala",
            gg: "Guernsey",
            gn: "Guinea",
            gw: "Guinea-Bissau",
            gy: "Guyana",
            ht: "Haiti",
            hm: "Heard & McDonald Islands",
            hn: "Honduras",
            hk: "Hong Kong SAR China",
            hu: "Hungary",
            is: "Iceland",
            in: "India",
            id: "Indonesia",
            ir: "Iran",
            iq: "Iraq",
            ie: "Ireland",
            im: "Isle of Man",
            il: "Israel",
            it: "Italy",
            jm: "Jamaica",
            jp: "Japan",
            je: "Jersey",
            jo: "Jordan",
            kz: "Kazakhstan",
            ke: "Kenya",
            ki: "Kiribati",
            kw: "Kuwait",
            kg: "Kyrgyzstan",
            la: "Laos",
            lv: "Latvia",
            lb: "Lebanon",
            ls: "Lesotho",
            lr: "Liberia",
            ly: "Libya",
            li: "Liechtenstein",
            lt: "Lithuania",
            lu: "Luxembourg",
            mo: "Macao SAR China",
            mg: "Madagascar",
            mw: "Malawi",
            my: "Malaysia",
            mv: "Maldives",
            ml: "Mali",
            mt: "Malta",
            mh: "Marshall Islands",
            mq: "Martinique",
            mr: "Mauritania",
            mu: "Mauritius",
            yt: "Mayotte",
            mx: "Mexico",
            fm: "Micronesia",
            md: "Moldova",
            mc: "Monaco",
            mn: "Mongolia",
            me: "Montenegro",
            ms: "Montserrat",
            ma: "Morocco",
            mz: "Mozambique",
            mm: "Myanmar (Burma)",
            na: "Namibia",
            nr: "Nauru",
            np: "Nepal",
            nl: "Netherlands",
            nc: "New Caledonia",
            nz: "New Zealand",
            ni: "Nicaragua",
            ne: "Niger",
            ng: "Nigeria",
            nu: "Niue",
            nf: "Norfolk Island",
            kp: "North Korea",
            mk: "North Macedonia",
            mp: "Northern Mariana Islands",
            no: "Norway",
            om: "Oman",
            pk: "Pakistan",
            pw: "Palau",
            ps: "Palestinian Territories",
            pa: "Panama",
            pg: "Papua New Guinea",
            py: "Paraguay",
            pe: "Peru",
            ph: "Philippines",
            pn: "Pitcairn Islands",
            pl: "Poland",
            pt: "Portugal",
            pr: "Puerto Rico",
            qa: "Qatar",
            re: "R\xE9union",
            ro: "Romania",
            ru: "Russia",
            rw: "Rwanda",
            ws: "Samoa",
            sm: "San Marino",
            st: "S\xE3o Tom\xE9 & Pr\xEDncipe",
            sa: "Saudi Arabia",
            sn: "Senegal",
            rs: "Serbia",
            sc: "Seychelles",
            sl: "Sierra Leone",
            sg: "Singapore",
            sx: "Sint Maarten",
            sk: "Slovakia",
            si: "Slovenia",
            sb: "Solomon Islands",
            so: "Somalia",
            za: "South Africa",
            gs: "South Georgia & South Sandwich Islands",
            kr: "South Korea",
            ss: "South Sudan",
            es: "Spain",
            lk: "Sri Lanka",
            bl: "St. Barth\xE9lemy",
            sh: "St. Helena",
            kn: "St. Kitts & Nevis",
            lc: "St. Lucia",
            mf: "St. Martin",
            pm: "St. Pierre & Miquelon",
            vc: "St. Vincent & Grenadines",
            sd: "Sudan",
            sr: "Suriname",
            sj: "Svalbard & Jan Mayen",
            se: "Sweden",
            ch: "Switzerland",
            sy: "Syria",
            tw: "Taiwan",
            tj: "Tajikistan",
            tz: "Tanzania",
            th: "Thailand",
            tl: "Timor-Leste",
            tg: "Togo",
            tk: "Tokelau",
            to: "Tonga",
            tt: "Trinidad & Tobago",
            tn: "Tunisia",
            tr: "Turkey",
            tm: "Turkmenistan",
            tc: "Turks & Caicos Islands",
            tv: "Tuvalu",
            um: "U.S. Outlying Islands",
            vi: "U.S. Virgin Islands",
            ug: "Uganda",
            ua: "Ukraine",
            ae: "United Arab Emirates",
            gb: "United Kingdom",
            us: "United States",
            uy: "Uruguay",
            uz: "Uzbekistan",
            vu: "Vanuatu",
            va: "Vatican City",
            ve: "Venezuela",
            vn: "Vietnam",
            wf: "Wallis & Futuna",
            eh: "Western Sahara",
            ye: "Yemen",
            zm: "Zambia",
            zw: "Zimbabwe"
            };
        
            var interface_default = {
            selectedCountryAriaLabel: "Selected country",
            noCountrySelected: "No country selected",
            countryListAriaLabel: "List of countries",
            searchPlaceholder: "Search",
            zeroSearchResults: "No results found",
            oneSearchResult: "1 result found",
            multipleSearchResults: "${count} results found",
            ac: "Ascension Island",
            xk: "Kosovo"
            };
        
            var en_default = { ...countries_default, ...interface_default };
        
            var id = 0;
            var defaults = {
            allowDropdown: true,
            autoPlaceholder: "polite",
            containerClass: "",
            countryOrder: null,
            customPlaceholder: null,
            dropdownContainer: null,
            excludeCountries: [],
            fixDropdownWidth: true,
            formatAsYouType: true,
            formatOnDisplay: true,
            geoIpLookup: null,
            hiddenInput: null,
            i18n: {},
            initialCountry: "",
            nationalMode: true,
            onlyCountries: [],
            placeholderNumberType: "MOBILE",
            showFlags: true,
            separateDialCode: false,
            strictMode: false,
            useFullscreenPopup: typeof navigator !== "undefined" && typeof window !== "undefined" ? (
                /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
                ) || window.innerWidth <= 500
            ) : false,
            utilsScript: ""
            };
            var regionlessNanpNumbers = [
            "800",
            "822",
            "833",
            "844",
            "855",
            "866",
            "877",
            "880",
            "881",
            "882",
            "883",
            "884",
            "885",
            "886",
            "887",
            "888",
            "889"
            ];
            var getNumeric = (s) => s.replace(/\D/g, "");
            var normaliseString = (s = "") => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            var isRegionlessNanp = (number) => {
            const numeric = getNumeric(number);
            if (numeric.charAt(0) === "1") {
                const areaCode = numeric.substr(1, 3);
                return regionlessNanpNumbers.indexOf(areaCode) !== -1;
            }
            return false;
            };
            var translateCursorPosition = (relevantChars, formattedValue, prevCaretPos, isDeleteForwards) => {
            if (prevCaretPos === 0 && !isDeleteForwards) {
                return 0;
            }
            let count = 0;
            for (let i = 0; i < formattedValue.length; i++) {
                if (/[+0-9]/.test(formattedValue[i])) {
                count++;
                }
                if (count === relevantChars && !isDeleteForwards) {
                return i + 1;
                }
                if (isDeleteForwards && count === relevantChars + 1) {
                return i;
                }
            }
            return formattedValue.length;
            };
            var createEl = (name, attrs, container) => {
            const el = document.createElement(name);
            if (attrs) {
                Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
            }
            if (container) {
                container.appendChild(el);
            }
            return el;
            };
            var forEachInstance = (method) => {
            const { instances } = intlTelInput;
            Object.values(instances).forEach((instance) => instance[method]());
            };
            var Iti = class {
            id;
            promise;
            telInput;
            highlightedItem;
            options;
            hadInitialPlaceholder;
            isRTL;
            selectedCountryData;
            countries;
            dialCodeMaxLen;
            dialCodeToIso2Map;
            dialCodes;
            countryContainer;
            selectedCountry;
            selectedCountryInner;
            selectedCountryA11yText;
            selectedDialCode;
            dropdownArrow;
            dropdownContent;
            searchInput;
            searchResultsA11yText;
            countryList;
            dropdown;
            hiddenInput;
            hiddenInputCountry;
            maxCoreNumberLength;
            defaultCountry;
            _handleHiddenInputSubmit;
            _handleLabelClick;
            _handleClickSelectedCountry;
            _handleCountryContainerKeydown;
            _handleInputEvent;
            _handleKeydownEvent;
            _handleWindowScroll;
            _handleMouseoverCountryList;
            _handleClickCountryList;
            _handleClickOffToClose;
            _handleKeydownOnDropdown;
            _handleSearchChange;
            resolveAutoCountryPromise;
            rejectAutoCountryPromise;
            resolveUtilsScriptPromise;
            rejectUtilsScriptPromise;
            constructor(input, customOptions = {}) {
                this.id = id++;
                this.telInput = input;
                this.highlightedItem = null;
                this.options = Object.assign({}, defaults, customOptions);
                this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
            }
            _init() {
                if (this.options.useFullscreenPopup) {
                this.options.fixDropdownWidth = false;
                }
                if (this.options.separateDialCode) {
                this.options.nationalMode = false;
                }
                if (!this.options.showFlags && !this.options.separateDialCode) {
                this.options.nationalMode = false;
                }
                if (this.options.useFullscreenPopup && !this.options.dropdownContainer) {
                this.options.dropdownContainer = document.body;
                }
                this.isRTL = !!this.telInput.closest("[dir=rtl]");
                this.options.i18n = { ...en_default, ...this.options.i18n };
                const autoCountryPromise = new Promise((resolve, reject) => {
                this.resolveAutoCountryPromise = resolve;
                this.rejectAutoCountryPromise = reject;
                });
                const utilsScriptPromise = new Promise((resolve, reject) => {
                this.resolveUtilsScriptPromise = resolve;
                this.rejectUtilsScriptPromise = reject;
                });
                this.promise = Promise.all([autoCountryPromise, utilsScriptPromise]);
                this.selectedCountryData = {};
                this._processCountryData();
                this._generateMarkup();
                this._setInitialState();
                this._initListeners();
                this._initRequests();
            }
            _processCountryData() {
                this._processAllCountries();
                this._processDialCodes();
                this._translateCountryNames();
                if (this.options.countryOrder) {
                this.options.countryOrder = this.options.countryOrder.map((country) => country.toLowerCase());
                }
                this._sortCountries();
            }
            _sortCountries() {
                this.countries.sort((a, b) => {
                const { countryOrder } = this.options;
                if (countryOrder) {
                    const aIndex = countryOrder.indexOf(a.iso2);
                    const bIndex = countryOrder.indexOf(b.iso2);
                    const aIndexExists = aIndex > -1;
                    const bIndexExists = bIndex > -1;
                    if (aIndexExists || bIndexExists) {
                    if (aIndexExists && bIndexExists) {
                        return aIndex - bIndex;
                    }
                    return aIndexExists ? -1 : 1;
                    }
                }
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
                });
            }
            _addToDialCodeMap(iso2, dialCode, priority) {
                if (dialCode.length > this.dialCodeMaxLen) {
                this.dialCodeMaxLen = dialCode.length;
                }
                if (!this.dialCodeToIso2Map.hasOwnProperty(dialCode)) {
                this.dialCodeToIso2Map[dialCode] = [];
                }
                for (let i = 0; i < this.dialCodeToIso2Map[dialCode].length; i++) {
                if (this.dialCodeToIso2Map[dialCode][i] === iso2) {
                    return;
                }
                }
                const index = priority !== void 0 ? priority : this.dialCodeToIso2Map[dialCode].length;
                this.dialCodeToIso2Map[dialCode][index] = iso2;
            }
            _processAllCountries() {
                const { onlyCountries, excludeCountries } = this.options;
                if (onlyCountries.length) {
                const lowerCaseOnlyCountries = onlyCountries.map(
                    (country) => country.toLowerCase()
                );
                this.countries = data_default.filter(
                    (country) => lowerCaseOnlyCountries.indexOf(country.iso2) > -1
                );
                } else if (excludeCountries.length) {
                const lowerCaseExcludeCountries = excludeCountries.map(
                    (country) => country.toLowerCase()
                );
                this.countries = data_default.filter(
                    (country) => lowerCaseExcludeCountries.indexOf(country.iso2) === -1
                );
                } else {
                this.countries = data_default;
                }
            }
            _translateCountryNames() {
                for (let i = 0; i < this.countries.length; i++) {
                const iso2 = this.countries[i].iso2.toLowerCase();
                if (this.options.i18n.hasOwnProperty(iso2)) {
                    this.countries[i].name = this.options.i18n[iso2];
                }
                }
            }
            _processDialCodes() {
                this.dialCodes = {};
                this.dialCodeMaxLen = 0;
                this.dialCodeToIso2Map = {};
                for (let i = 0; i < this.countries.length; i++) {
                const c = this.countries[i];
                if (!this.dialCodes[c.dialCode]) {
                    this.dialCodes[c.dialCode] = true;
                }
                this._addToDialCodeMap(c.iso2, c.dialCode, c.priority);
                }
                for (let i = 0; i < this.countries.length; i++) {
                const c = this.countries[i];
                if (c.areaCodes) {
                    const rootIso2Code = this.dialCodeToIso2Map[c.dialCode][0];
                    for (let j = 0; j < c.areaCodes.length; j++) {
                    const areaCode = c.areaCodes[j];
                    for (let k = 1; k < areaCode.length; k++) {
                        const partialDialCode = c.dialCode + areaCode.substr(0, k);
                        this._addToDialCodeMap(rootIso2Code, partialDialCode);
                        this._addToDialCodeMap(c.iso2, partialDialCode);
                    }
                    this._addToDialCodeMap(c.iso2, c.dialCode + areaCode);
                    }
                }
                }
            }
            _generateMarkup() {
                this.telInput.classList.add("iti__tel-input");
                this.telInput.classList.add("enCountrycode_input");
                if (!this.telInput.hasAttribute("autocomplete") && !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete"))) {
                this.telInput.setAttribute("autocomplete", "off");
                }
                const {
                allowDropdown,
                separateDialCode,
                showFlags,
                containerClass,
                hiddenInput,
                dropdownContainer,
                fixDropdownWidth,
                useFullscreenPopup,
                i18n
                } = this.options;
                let parentClass = "iti";
                if (allowDropdown) {
                parentClass += " iti--allow-dropdown";
                }
                if (showFlags) {
                parentClass += " iti--show-flags";
                }
                if (containerClass) {
                parentClass += ` ${containerClass}`;
                }
                if (!useFullscreenPopup) {
                parentClass += " iti--inline-dropdown";
                }
                const wrapper = createEl("div", { class: parentClass });
                this.telInput.parentNode?.insertBefore(wrapper, this.telInput);
                if (allowDropdown || showFlags) {
                this.countryContainer = createEl(
                    "div",
                    { class: "iti__country-container" },
                    wrapper
                );
                this.selectedCountry = createEl(
                    "button",
                    {
                    type: "button",
                    class: "iti__selected-country",
                    ...allowDropdown && {
                        "aria-expanded": "false",
                        "aria-label": this.options.i18n.selectedCountryAriaLabel,
                        "aria-haspopup": "true",
                        "aria-controls": `iti-${this.id}__dropdown-content`,
                        "role": "combobox"
                    }
                    },
                    this.countryContainer
                );
                if(this.options.zIndex) {
                    $(wrapper).css({"z-index": this.options.zIndex});
                }
                if(this.options.initialCountry) {
                    encodeLib.rawCountryData.some(item => {
                        if(item[0] === this.options.initialCountry.toLowerCase()) {
                            $(wrapper).attr("value", item[1]);
                            return;
                        }
                    });
                }
                if(this.options.height) {
                    $(wrapper).css({"height": this.options.height});
                    $(this.countryContainer).css({"height": this.options.height});
                    $(this.selectedCountry).css({"height": this.options.height});
                }
                if(this.options.focusBorderColor) {
                    if(!$(this.selectedCountry).hasClass('iti'+this.id+'__selected-country')) {
                    $(this.selectedCountry).addClass('iti'+this.id+'__selected-country');
                    }
                    let focusBorderColorStyle = `<style>button.iti${this.id}__selected-country:focus { box-shadow: ${this.options.focusBorderColor} 0px 0px 0px 2px inset, rgba(0, 0, 0, 0.12) 0px 0px 0px 1px inset !important; }</style>`;
                    encodeLib.insert(encodeLib.BODY, focusBorderColorStyle, {addOn: "append"});
                }
                if(this.options.borderRadius) {
                    $(this.selectedCountry).css({"border-radius": this.options.borderRadius});
                }
                if(this.options.fontSize) {
                    $(this.selectedCountry).css({"font-size": this.options.fontSize});
                }
                if(this.options.fontWeight) {
                    $(this.selectedCountry).css({"font-weight": this.options.fontWeight});
                }
                if(this.options.color) {
                    $(this.selectedCountry).css({"color": this.options.color});
                }
                if(this.options.backgroundColor) {
                    $(this.selectedCountry).css({"background-color": this.options.backgroundColor});
                }
                if(this.options.hoverColor) {
                    if(!$(this.selectedCountry).hasClass('iti'+this.id+'__selected-country')) {
                    $(this.selectedCountry).addClass('iti'+this.id+'__selected-country');
                    }
                    let hoverColorStyle = `<style>button.iti${this.id}__selected-country:hover { background-color: ${this.options.hoverColor} !important; }</style>`;
                    encodeLib.insert(encodeLib.BODY, hoverColorStyle, {addOn: "append"});
                }
                if(this.options.style) {
                    if(!$(this.selectedCountry).hasClass('iti'+this.id+'__selected-country')) {
                    $(this.selectedCountry).addClass('iti'+this.id+'__selected-country');
                    }
                    let selectedCountryStyle = `<style>button.iti${this.id}__selected-country { ${this.options.style} }</style>`;
                    encodeLib.insert(encodeLib.BODY, selectedCountryStyle, {addOn: "append"});
                }
                if(this.options.inputParent) {
                    $(wrapper).css({"width": "100%"});
                    $(this.selectedCountry).css({"box-shadow": "transparent 0px 0px 0px 2px inset, rgba(0, 0, 0, 0.12) 0px 0px 0px 1px inset"});
                }
                else {
                    $(wrapper).css({"width": this.telInput.style.width});
                    this.telInput.style.width = "100%";
                }
                if(this.options.width) {
                    $(wrapper).css({"width": this.options.width});
                    $(this.countryContainer).css({"width": "100%"});
                    $(this.selectedCountry).css({"width": "100%"});
                }
                const selectedCountryPrimary = createEl("div", { class: "iti__selected-country-primary" }, this.selectedCountry);
                this.selectedCountryInner = createEl("div", null, selectedCountryPrimary);
                this.selectedCountryA11yText = createEl(
                    "span",
                    { class: "iti__a11y-text" },
                    this.selectedCountryInner
                );
                if (this.telInput.disabled) {
                    this.selectedCountry.setAttribute("aria-disabled", "true");
                } else {
                    this.selectedCountry.setAttribute("tabindex", "0");
                }
                if (allowDropdown) {
                    this.dropdownArrow = createEl(
                    "div",
                    { class: "iti__arrow", "aria-hidden": "true" },
                    selectedCountryPrimary
                    );
                }
                if (separateDialCode) {
                    this.selectedDialCode = createEl(
                    "div",
                    { class: "iti__selected-dial-code" },
                    this.selectedCountry
                    );
                }
                if (allowDropdown) {
                    const extraClasses = fixDropdownWidth ? "" : "iti--flexible-dropdown-width";
                    this.dropdownContent = createEl("div", {
                    id: `iti-${this.id}__dropdown-content`,
                    class: `iti__dropdown-content iti__hide ${extraClasses}`
                    });
                    if(this.options.dropdownWidth) {
                    $(this.dropdownContent).css({"width": this.options.dropdownWidth});
                    }
                    if(this.options.dropdownFontSize) {
                    $(this.dropdownContent).css({"font-size": this.options.dropdownFontSize});
                    }
                    if(this.options.dropdownFontWeight) {
                    $(this.dropdownContent).css({"font-weight": this.options.dropdownFontWeight});
                    }
                    if(this.options.dropdownColor) {
                    $(this.dropdownContent).css({"color": this.options.dropdownColor});
                    }
                    if(this.options.dropdownBackgroundColor) {
                    $(this.dropdownContent).css({"background-color": this.options.dropdownBackgroundColor});
                    }
                    if(this.options.dropdownStyle) {
                    if(!$(this.dropdownContent).hasClass('iti'+this.id+'__dropdown-content')) {
                        $(this.dropdownContent).addClass('iti'+this.id+'__dropdown-content');
                    }
                    let dropdownContentStyle = `<style>div.iti${this.id}__dropdown-content { ${this.options.dropdownStyle} }</style>`;
                    encodeLib.insert(encodeLib.BODY, dropdownContentStyle, {addOn: "append"});
                    }
                    if(this.options.dropdownTopPosition) {
                    $(this.dropdownContent).css({"margin-top": this.options.dropdownTopPosition});
                    }
                    this.searchInput = createEl(
                    "input",
                    {
                        type: "text",
                        class: "iti__search-input enCountrycode_input",
                        placeholder: i18n.searchPlaceholder,
                        onfocusin: "this.parentNode.parentNode.querySelector('button').classList.add('iti__selected-countryFocued');",
                        onfocusout: "this.parentNode.parentNode.querySelector('button').classList.remove('iti__selected-countryFocued');",
                        role: "combobox",
                        "aria-expanded": "true",
                        "aria-label": i18n.searchPlaceholder,
                        "aria-controls": `iti-${this.id}__country-listbox`,
                        "aria-autocomplete": "list",
                        "autocomplete": "off"
                    },
                    this.dropdownContent
                    );
                    if(this.options.focusBorderColor) {
                    $(this.searchInput).addClass('iti'+this.id+'__search-input');
                    $(this.searchInput).attr("onfocusin", `this.parentNode.parentNode.querySelector('button').classList.add('iti${this.id}__selected-countryFocued');`);
                    $(this.searchInput).attr("onfocusout", `this.parentNode.parentNode.querySelector('button').classList.remove('iti${this.id}__selected-countryFocued');`);
                    let focusBorderColorStyle = `<style>input.iti${this.id}__search-input { outline: 2px solid ${this.options.focusBorderColor}; } .iti${this.id}__selected-countryFocued { box-shadow: ${this.options.focusBorderColor} 0px 0px 0px 2px inset, rgba(0, 0, 0, 0.12) 0px 0px 0px 1px inset !important; }</style>`;
                    encodeLib.insert(encodeLib.BODY, focusBorderColorStyle, {addOn: "append"});
                    }
                    if(this.options.searchFontSize) {
                    $(this.searchInput).css({"font-size": this.options.searchFontSize});
                    }
                    if(this.options.searchFontWeight) {
                    $(this.searchInput).css({"font-weight": this.options.searchFontWeight});
                    }
                    if(this.options.searchColor) {
                    $(this.searchInput).css({"color": this.options.searchColor});
                    }
                    if(this.options.searchBackgroundColor) {
                    $(this.searchInput).css({"background-color": this.options.searchBackgroundColor});
                    }
                    if(this.options.searchStyle) {
                    if(!$(this.searchInput).hasClass('iti'+this.id+'__search-input')) {
                        $(this.searchInput).addClass('iti'+this.id+'__search-input');
                    }
                    let searchContentStyle = `<style>input.iti${this.id}__search-input { ${this.options.searchStyle} }</style>`;
                    encodeLib.insert(encodeLib.BODY, searchContentStyle, {addOn: "append"});
                    }
                    this.searchResultsA11yText = createEl(
                    "span",
                    { class: "iti__a11y-text" },
                    this.dropdownContent
                    );
                    this.countryList = createEl(
                    "ul",
                    {
                        class: "iti__country-list",
                        id: `iti-${this.id}__country-listbox`,
                        role: "listbox",
                        placeholder: "Empty",
                        "aria-label": i18n.countryListAriaLabel
                    },
                    this.dropdownContent
                    );
                    if(this.options.dropdownMaxHeight) {
                    $(this.countryList).css({"max-height": this.options.dropdownMaxHeight});
                    }
                    this._appendListItems(this.countries, "iti__standard");
                    this._updateSearchResultsText();
                    if (dropdownContainer) {
                    let dropdownClasses = "iti iti--container";
                    if (useFullscreenPopup) {
                        dropdownClasses += " iti--fullscreen-popup";
                    } else {
                        dropdownClasses += " iti--inline-dropdown";
                    }
                    this.dropdown = createEl("div", { class: dropdownClasses });
                    this.dropdown.appendChild(this.dropdownContent);
                    } else {
                    this.countryContainer.appendChild(this.dropdownContent);
                    }
                }
                }
                wrapper.appendChild(this.telInput);
                if (hiddenInput) {
                const telInputName = this.telInput.getAttribute("name") || "";
                const names = hiddenInput(telInputName);
                if (names.phone) {
                    this.hiddenInput = createEl("input", {
                    type: "hidden",
                    name: names.phone
                    });
                    wrapper.appendChild(this.hiddenInput);
                }
                if (names.country) {
                    this.hiddenInputCountry = createEl("input", {
                    type: "hidden",
                    name: names.country
                    });
                    wrapper.appendChild(this.hiddenInputCountry);
                }
                }
            }
            _appendListItems(countries, className) {
                for (let i = 0; i < countries.length; i++) {
                const c = countries[i];
                const listItem = createEl(
                    "li",
                    {
                    id: `iti-${this.id}__item-${c.iso2}`,
                    class: `iti__country enCountry__${c.iso2} ${className}`,
                    onclick: `this.parentNode.parentNode.parentNode.querySelector('button').focus();this.parentNode.parentNode.parentNode.parentNode.setAttribute('value', '${c.dialCode}');this.parentNode.parentNode.parentNode.parentNode.setAttribute('country', '${c.name}');this.parentNode.parentNode.parentNode.parentNode.setAttribute('countrycode', '${c.iso2}');${this.options.onclick ? this.options.onclick+'();' : ''}`,
                    tabindex: "-1",
                    role: "option",
                    "data-dial-code": c.dialCode,
                    "data-country-code": c.iso2,
                    "aria-selected": "false"
                    },
                    this.countryList
                );
                if(this.options.dropdownOptionHoverColor) {
                    $(listItem).addClass('iti'+this.id+'__country');
                    if(!$(".dropdownOptionHoverColorStyle").length) {
                    let dropdownOptionHoverColorStyle = `<style class="dropdownOptionHoverColorStyle">li.iti${this.id}__country:hover, .iti__country.iti__highlight { background-color: ${this.options.dropdownOptionHoverColor}; }</style>`;
                    encodeLib.insert(encodeLib.BODY, dropdownOptionHoverColorStyle, {addOn: "append"});
                    }
                }
                c.nodeById[this.id] = listItem;
                let content = "";
                if (this.options.showFlags) {
                    content += `<div class='iti__flag-box'><div class='iti__flag iti__${c.iso2}'></div></div>`;
                }
                content += `<span class='iti__country-name'>${c.name}</span>`;
                content += `<span class='iti__dial-code'>+${c.dialCode}</span>`;
                listItem.insertAdjacentHTML("beforeend", content);
                }
            }
            _setInitialState(overrideAutoCountry = false) {
                const attributeValue = this.telInput.getAttribute("value");
                const inputValue = this.telInput.value;
                const useAttribute = attributeValue && attributeValue.charAt(0) === "+" && (!inputValue || inputValue.charAt(0) !== "+");
                const val = useAttribute ? attributeValue : inputValue;
                const dialCode = this._getDialCode(val);
                const isRegionlessNanpNumber = isRegionlessNanp(val);
                const { initialCountry } = this.options;
                if (dialCode && !isRegionlessNanpNumber) {
                this._updateCountryFromNumber(val);
                } else if (initialCountry !== "auto" || overrideAutoCountry) {
                const lowerInitialCountry = initialCountry ? initialCountry.toLowerCase() : "";
                const isValidInitialCountry = lowerInitialCountry && this._getCountryData(lowerInitialCountry, true);
                if (isValidInitialCountry) {
                    this._setCountry(lowerInitialCountry);
                } else {
                    if (dialCode && isRegionlessNanpNumber) {
                    this._setCountry("us");
                    } else {
                    this._setCountry();
                    }
                }
                }
                if (val) {
                this._updateValFromNumber(val);
                }
            }
            _initListeners() {
                this._initTelInputListeners();
                if (this.options.allowDropdown) {
                this._initDropdownListeners();
                }
                if ((this.hiddenInput || this.hiddenInputCountry) && this.telInput.form) {
                this._initHiddenInputListener();
                }
            }
            _initHiddenInputListener() {
                this._handleHiddenInputSubmit = () => {
                if (this.hiddenInput) {
                    this.hiddenInput.value = this.getNumber();
                }
                if (this.hiddenInputCountry) {
                    this.hiddenInputCountry.value = this.getSelectedCountryData().iso2 || "";
                }
                };
                this.telInput.form?.addEventListener(
                "submit",
                this._handleHiddenInputSubmit
                );
            }
            _initDropdownListeners() {
                this._handleLabelClick = (e) => {
                if (this.dropdownContent.classList.contains("iti__hide")) {
                    this.telInput.focus();
                } else {
                    e.preventDefault();
                }
                };
                const label = this.telInput.closest("label");
                if (label) {
                label.addEventListener("click", this._handleLabelClick);
                }
                this._handleClickSelectedCountry = () => {
                if (this.dropdownContent.classList.contains("iti__hide") && !this.telInput.disabled && !this.telInput.readOnly) {
                    this._openDropdown();
                }
                };
                this.selectedCountry.addEventListener("click", this._handleClickSelectedCountry);
                this._handleCountryContainerKeydown = (e) => {
                const isDropdownHidden = this.dropdownContent.classList.contains("iti__hide");
                if (isDropdownHidden && ["ArrowUp", "ArrowDown", " ", "Enter"].includes(e.key)) {
                    e.preventDefault();
                    e.stopPropagation();
                    this._openDropdown();
                }
                if (e.key === "Tab") {
                    this._closeDropdown();
                }
                };
                this.countryContainer.addEventListener(
                "keydown",
                this._handleCountryContainerKeydown
                );
            }
            _initRequests() {
                if (this.options.utilsScript && !intlTelInput.utils) {
                if (intlTelInput.documentReady()) {
                    intlTelInput.loadUtils(this.options.utilsScript);
                } else {
                    window.addEventListener("load", () => {
                    intlTelInput.loadUtils(this.options.utilsScript);
                    });
                }
                } else {
                this.resolveUtilsScriptPromise();
                }
                if (this.options.initialCountry === "auto" && !this.selectedCountryData.iso2) {
                this._loadAutoCountry();
                } else {
                this.resolveAutoCountryPromise();
                }
            }
            _loadAutoCountry() {
                if (intlTelInput.autoCountry) {
                this.handleAutoCountry();
                } else if (!intlTelInput.startedLoadingAutoCountry) {
                intlTelInput.startedLoadingAutoCountry = true;
                if (typeof this.options.geoIpLookup === "function") {
                    this.options.geoIpLookup(
                    (iso2 = "") => {
                        const iso2Lower = iso2.toLowerCase();
                        const isValidIso2 = iso2Lower && this._getCountryData(iso2Lower, true);
                        if (isValidIso2) {
                        intlTelInput.autoCountry = iso2Lower;
                        setTimeout(() => forEachInstance("handleAutoCountry"));
                        } else {
                        this._setInitialState(true);
                        forEachInstance("rejectAutoCountryPromise");
                        }
                    },
                    () => {
                        this._setInitialState(true);
                        forEachInstance("rejectAutoCountryPromise");
                    }
                    );
                }
                }
            }
            _initTelInputListeners() {
                const { strictMode, formatAsYouType, separateDialCode } = this.options;
                let userOverrideFormatting = false;
                this._handleInputEvent = (e) => {
                if (this._updateCountryFromNumber(this.telInput.value)) {
                    this._triggerCountryChange();
                }
                const isFormattingChar = e && e.data && /[^+0-9]/.test(e.data);
                const isPaste = e && e.inputType === "insertFromPaste" && this.telInput.value;
                if (isFormattingChar || isPaste && !strictMode) {
                    userOverrideFormatting = true;
                } else if (!/[^+0-9]/.test(this.telInput.value)) {
                    userOverrideFormatting = false;
                }
                if (formatAsYouType && !userOverrideFormatting) {
                    const currentCaretPos = this.telInput.selectionStart || 0;
                    const valueBeforeCaret = this.telInput.value.substring(0, currentCaretPos);
                    const relevantCharsBeforeCaret = valueBeforeCaret.replace(/[^+0-9]/g, "").length;
                    const isDeleteForwards = e && e.inputType === "deleteContentForward";
                    const formattedValue = this._formatNumberAsYouType();
                    const newCaretPos = translateCursorPosition(relevantCharsBeforeCaret, formattedValue, currentCaretPos, isDeleteForwards);
                    this.telInput.value = formattedValue;
                    this.telInput.setSelectionRange(newCaretPos, newCaretPos);
                }
                };
                this.telInput.addEventListener("input", this._handleInputEvent);
                if (strictMode || separateDialCode) {
                this._handleKeydownEvent = (e) => {
                    if (e.key && e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey) {
                    if (separateDialCode && e.key === "+") {
                        e.preventDefault();
                        this._openDropdown();
                        this.searchInput.value = "+";
                        this._filterCountries("", true);
                        return;
                    }
                    if (strictMode) {
                        const isInitialPlus = this.telInput.selectionStart === 0 && e.key === "+";
                        const isNumeric = /^[0-9]$/.test(e.key);
                        const isAllowedChar = isInitialPlus || isNumeric;
                        const fullNumber = this._getFullNumber();
                        const coreNumber = intlTelInput.utils.getCoreNumber(fullNumber, this.selectedCountryData.iso2);
                        const hasReachedMaxLength = this.maxCoreNumberLength && coreNumber.length >= this.maxCoreNumberLength;
                        if (!isAllowedChar || hasReachedMaxLength) {
                        e.preventDefault();
                        }
                    }
                    }
                };
                this.telInput.addEventListener("keydown", this._handleKeydownEvent);
                }
            }
            _cap(number) {
                const max = parseInt(this.telInput.getAttribute("maxlength") || "", 10);
                return max && number.length > max ? number.substr(0, max) : number;
            }
            _trigger(name) {
                const e = new Event(name, {
                bubbles: true,
                cancelable: true
                });
                this.telInput.dispatchEvent(e);
            }
            _openDropdown() {
                const { fixDropdownWidth } = this.options;
                if (fixDropdownWidth) {
                this.dropdownContent.style.width = `${this.telInput.offsetWidth}px`;
                }
                this.dropdownContent.classList.remove("iti__hide");
                this.selectedCountry.setAttribute("aria-expanded", "true");
                this._setDropdownPosition();
                const firstCountryItem = this.countryList.firstElementChild;
                if (firstCountryItem) {
                this._highlightListItem(firstCountryItem, false);
                this.countryList.scrollTop = 0;
                }
                this.searchInput.focus();
                this._bindDropdownListeners();
                this.dropdownArrow.classList.add("iti__arrow--up");
                this._trigger("open:countrydropdown");
            }
            _setDropdownPosition() {
                if (this.options.dropdownContainer) {
                this.options.dropdownContainer.appendChild(this.dropdown);
                }
                if (!this.options.useFullscreenPopup) {
                const inputPosRelativeToVP = this.telInput.getBoundingClientRect();
                const inputHeight = this.telInput.offsetHeight;
                if (this.options.dropdownContainer) {
                    this.dropdown.style.top = `${inputPosRelativeToVP.top + inputHeight}px`;
                    this.dropdown.style.left = `${inputPosRelativeToVP.left}px`;
                    this._handleWindowScroll = () => this._closeDropdown();
                    window.addEventListener("scroll", this._handleWindowScroll);
                }
                }
            }
            _bindDropdownListeners() {
                this._handleMouseoverCountryList = (e) => {
                const listItem = e.target?.closest(".iti__country");
                if (listItem) {
                    this._highlightListItem(listItem, false);
                }
                };
                this.countryList.addEventListener(
                "mouseover",
                this._handleMouseoverCountryList
                );
                this._handleClickCountryList = (e) => {
                const listItem = e.target?.closest(".iti__country");
                if (listItem) {
                    this._selectListItem(listItem);
                }
                };
                this.countryList.addEventListener("click", this._handleClickCountryList);
                let isOpening = true;
                this._handleClickOffToClose = () => {
                if (!isOpening) {
                    this._closeDropdown();
                }
                isOpening = false;
                };
                document.documentElement.addEventListener(
                "click",
                this._handleClickOffToClose
                );
                this._handleKeydownOnDropdown = (e) => {
                if (["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(e.key)) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                    this._handleUpDownKey(e.key);
                    } else if (e.key === "Enter") {
                    this._handleEnterKey();
                    } else if (e.key === "Escape") {
                    this._closeDropdown();
                    }
                }
                };
                document.addEventListener("keydown", this._handleKeydownOnDropdown);
                const doFilter = () => {
                const inputQuery = this.searchInput.value.trim();
                if (inputQuery) {
                    this._filterCountries(inputQuery);
                } else {
                    this._filterCountries("", true);
                }
                };
                let keyupTimer = null;
                this._handleSearchChange = () => {
                if (keyupTimer) {
                    clearTimeout(keyupTimer);
                }
                keyupTimer = setTimeout(() => {
                    doFilter();
                    keyupTimer = null;
                }, 100);
                };
                this.searchInput.addEventListener("input", this._handleSearchChange);
                this.searchInput.addEventListener("click", (e) => e.stopPropagation());
            }
            _filterCountries(query, isReset = false) {
                let noCountriesAddedYet = true;
                this.countryList.innerHTML = "";
                const normalisedQuery = normaliseString(query);
                for (let i = 0; i < this.countries.length; i++) {
                const c = this.countries[i];
                const normalisedCountryName = normaliseString(c.name);
                const fullDialCode = `+${c.dialCode}`;
                if (isReset || normalisedCountryName.includes(normalisedQuery) || fullDialCode.includes(normalisedQuery) || c.iso2.includes(normalisedQuery)) {
                    const listItem = c.nodeById[this.id];
                    if (listItem) {
                    this.countryList.appendChild(listItem);
                    }
                    if (noCountriesAddedYet) {
                    this._highlightListItem(listItem, false);
                    noCountriesAddedYet = false;
                    }
                }
                }
                if (noCountriesAddedYet) {
                this._highlightListItem(null, false);
                }
                this.countryList.scrollTop = 0;
                this._updateSearchResultsText();
            }
            _updateSearchResultsText() {
                const { i18n } = this.options;
                const count = this.countryList.childElementCount;
                let searchText;
                if (count === 0) {
                searchText = i18n.zeroSearchResults;
                } else if (count === 1) {
                searchText = i18n.oneSearchResult;
                } else {
                searchText = i18n.multipleSearchResults.replace("${count}", count.toString());
                }
                this.searchResultsA11yText.textContent = searchText;
            }
            _handleUpDownKey(key) {
                let next = key === "ArrowUp" ? this.highlightedItem?.previousElementSibling : this.highlightedItem?.nextElementSibling;
                if (!next && this.countryList.childElementCount > 1) {
                next = key === "ArrowUp" ? this.countryList.lastElementChild : this.countryList.firstElementChild;
                }
                if (next) {
                this._scrollTo(next);
                this._highlightListItem(next, false);
                }
            }
            _handleEnterKey() {
                if (this.highlightedItem) {
                /* this._selectListItem(this.highlightedItem); */
                this.highlightedItem.click();
                }
            }
            _updateValFromNumber(fullNumber) {
                let number = fullNumber;
                if (this.options.formatOnDisplay && intlTelInput.utils && this.selectedCountryData) {
                const useNational = this.options.nationalMode || number.charAt(0) !== "+" && !this.options.separateDialCode;
                const { NATIONAL, INTERNATIONAL } = intlTelInput.utils.numberFormat;
                const format = useNational ? NATIONAL : INTERNATIONAL;
                number = intlTelInput.utils.formatNumber(
                    number,
                    this.selectedCountryData.iso2,
                    format
                );
                }
                number = this._beforeSetNumber(number);
                this.telInput.value = number;
            }
            _updateCountryFromNumber(fullNumber) {
                const plusIndex = fullNumber.indexOf("+");
                let number = plusIndex ? fullNumber.substring(plusIndex) : fullNumber;
                const selectedDialCode = this.selectedCountryData.dialCode;
                const isNanp = selectedDialCode === "1";
                if (number && isNanp && number.charAt(0) !== "+") {
                if (number.charAt(0) !== "1") {
                    number = `1${number}`;
                }
                number = `+${number}`;
                }
                if (this.options.separateDialCode && selectedDialCode && number.charAt(0) !== "+") {
                number = `+${selectedDialCode}${number}`;
                }
                const dialCode = this._getDialCode(number, true);
                const numeric = getNumeric(number);
                let iso2 = null;
                if (dialCode) {
                const iso2Codes = this.dialCodeToIso2Map[getNumeric(dialCode)];
                const alreadySelected = iso2Codes.indexOf(this.selectedCountryData.iso2) !== -1 && numeric.length <= dialCode.length - 1;
                const isRegionlessNanpNumber = selectedDialCode === "1" && isRegionlessNanp(numeric);
                if (!isRegionlessNanpNumber && !alreadySelected) {
                    for (let j = 0; j < iso2Codes.length; j++) {
                    if (iso2Codes[j]) {
                        iso2 = iso2Codes[j];
                        break;
                    }
                    }
                }
                } else if (number.charAt(0) === "+" && numeric.length) {
                iso2 = "";
                } else if ((!number || number === "+") && !this.selectedCountryData.iso2) {
                iso2 = this.defaultCountry;
                }
                if (iso2 !== null) {
                return this._setCountry(iso2);
                }
                return false;
            }
            _highlightListItem(listItem, shouldFocus) {
                const prevItem = this.highlightedItem;
                if (prevItem) {
                prevItem.classList.remove("iti__highlight");
                prevItem.setAttribute("aria-selected", "false");
                }
                this.highlightedItem = listItem;
                if (this.highlightedItem) {
                this.highlightedItem.classList.add("iti__highlight");
                this.highlightedItem.setAttribute("aria-selected", "true");
                const activeDescendant = this.highlightedItem.getAttribute("id") || "";
                this.selectedCountry.setAttribute("aria-activedescendant", activeDescendant);
                this.searchInput.setAttribute("aria-activedescendant", activeDescendant);
                }
                if (shouldFocus) {
                this.highlightedItem.focus();
                }
            }
            _getCountryData(iso2, allowFail) {
                for (let i = 0; i < this.countries.length; i++) {
                if (this.countries[i].iso2 === iso2) {
                    return this.countries[i];
                }
                }
                if (allowFail) {
                return null;
                }
                throw new Error(`No country data for '${iso2}'`);
            }
            _setCountry(iso2) {
                const { separateDialCode, showFlags, i18n } = this.options;
                const prevCountry = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
                this.selectedCountryData = iso2 ? this._getCountryData(iso2, false) || {} : {};
                if (this.selectedCountryData.iso2) {
                this.defaultCountry = this.selectedCountryData.iso2;
                }
                if (this.selectedCountryInner) {
                let flagClass = "";
                let a11yText = "";
                if (iso2 && showFlags) {
                    flagClass = `iti__flag iti__${iso2}`;
                    a11yText = `${this.selectedCountryData.name} +${this.selectedCountryData.dialCode}`;
                } else {
                    flagClass = "iti__flag iti__globe";
                    a11yText = i18n.noCountrySelected;
                }
                this.selectedCountryInner.className = flagClass;
                this.selectedCountryA11yText.textContent = a11yText;
                }
                this._setSelectedCountryTitleAttribute(iso2, separateDialCode);
                if (separateDialCode) {
                const dialCode = this.selectedCountryData.dialCode ? `+${this.selectedCountryData.dialCode}` : "";
                this.selectedDialCode.innerHTML = this.options.showCountryName ? `<div style=" display: flex; align-items: center; justify-content: flex-start; width: calc(100% - 72px); position: absolute; height: 100%; top: 0px; "><span>${dialCode}</span> <span style="margin-left: 10px;text-overflow: ellipsis;white-space: nowrap;width: calc(100% - 50px);text-align: left;display: block;overflow: hidden;position: relative;">${this.selectedCountryData.name}</span></div>` : dialCode;
                const selectedCountryWidth = this.selectedCountry.offsetWidth || this._getHiddenSelectedCountryWidth();
                const inputPadding = selectedCountryWidth + 8;
                if (this.isRTL) {
                    this.telInput.style.paddingRight = `${inputPadding}px`;
                } else {
                    this.telInput.style.paddingLeft = `${inputPadding}px`;
                }
                }
                this._updatePlaceholder();
                this._updateMaxLength();
                return prevCountry.iso2 !== iso2;
            }
            _updateMaxLength() {
                if (this.options.strictMode && intlTelInput.utils) {
                if (this.selectedCountryData.iso2) {
                    const numberType = intlTelInput.utils.numberType[this.options.placeholderNumberType];
                    let exampleNumber = intlTelInput.utils.getExampleNumber(
                    this.selectedCountryData.iso2,
                    false,
                    numberType,
                    true
                    );
                    let validNumber = exampleNumber;
                    while (intlTelInput.utils.isPossibleNumber(exampleNumber, this.selectedCountryData.iso2)) {
                    validNumber = exampleNumber;
                    exampleNumber += "0";
                    }
                    const coreNumber = intlTelInput.utils.getCoreNumber(validNumber, this.selectedCountryData.iso2);
                    this.maxCoreNumberLength = coreNumber.length;
                } else {
                    this.maxCoreNumberLength = null;
                }
                }
            }
            _setSelectedCountryTitleAttribute(iso2 = null, separateDialCode) {
                if (!this.selectedCountry) {
                return;
                }
                let title;
                if (iso2 && !separateDialCode) {
                title = `${this.selectedCountryData.name}: +${this.selectedCountryData.dialCode}`;
                } else if (iso2) {
                title = this.selectedCountryData.name;
                } else {
                title = "Unknown";
                }
                this.selectedCountry.setAttribute("title", title);
            }
            _getHiddenSelectedCountryWidth() {
                if (this.telInput.parentNode) {
                const containerClone = this.telInput.parentNode.cloneNode(false);
                containerClone.style.visibility = "hidden";
                document.body.appendChild(containerClone);
                const countryContainerClone = this.countryContainer.cloneNode();
                containerClone.appendChild(countryContainerClone);
                const selectedCountryClone = this.selectedCountry.cloneNode(true);
                countryContainerClone.appendChild(selectedCountryClone);
                const width = selectedCountryClone.offsetWidth;
                document.body.removeChild(containerClone);
                return width;
                }
                return 0;
            }
            _updatePlaceholder() {
                const {
                autoPlaceholder,
                placeholderNumberType,
                nationalMode,
                customPlaceholder
                } = this.options;
                const shouldSetPlaceholder = autoPlaceholder === "aggressive" || !this.hadInitialPlaceholder && autoPlaceholder === "polite";
                if (intlTelInput.utils && shouldSetPlaceholder) {
                const numberType = intlTelInput.utils.numberType[placeholderNumberType];
                let placeholder = this.selectedCountryData.iso2 ? intlTelInput.utils.getExampleNumber(
                    this.selectedCountryData.iso2,
                    nationalMode,
                    numberType
                ) : "";
                placeholder = this._beforeSetNumber(placeholder);
                if (typeof customPlaceholder === "function") {
                    placeholder = customPlaceholder(placeholder, this.selectedCountryData);
                }
                this.telInput.setAttribute("placeholder", placeholder);
                }
            }
            _selectListItem(listItem) {
                const countryChanged = this._setCountry(
                listItem.getAttribute("data-country-code")
                );
                this._closeDropdown();
                this._updateDialCode(listItem.getAttribute("data-dial-code"));
                this.telInput.focus();
                if (countryChanged) {
                this._triggerCountryChange();
                }
            }
            _closeDropdown() {
                this.dropdownContent.classList.add("iti__hide");
                this.selectedCountry.setAttribute("aria-expanded", "false");
                this.selectedCountry.removeAttribute("aria-activedescendant");
                if (this.highlightedItem) {
                this.highlightedItem.setAttribute("aria-selected", "false");
                }
                this.searchInput.removeAttribute("aria-activedescendant");
                this.dropdownArrow.classList.remove("iti__arrow--up");
                document.removeEventListener("keydown", this._handleKeydownOnDropdown);
                this.searchInput.removeEventListener("input", this._handleSearchChange);
                document.documentElement.removeEventListener(
                "click",
                this._handleClickOffToClose
                );
                this.countryList.removeEventListener(
                "mouseover",
                this._handleMouseoverCountryList
                );
                this.countryList.removeEventListener("click", this._handleClickCountryList);
                if (this.options.dropdownContainer) {
                if (!this.options.useFullscreenPopup) {
                    window.removeEventListener("scroll", this._handleWindowScroll);
                }
                if (this.dropdown.parentNode) {
                    this.dropdown.parentNode.removeChild(this.dropdown);
                }
                }
                this._trigger("close:countrydropdown");
                this._filterCountries("", true);
                this.searchInput.value="";
            }
            _scrollTo(element) {
                const container = this.countryList;
                const scrollTop = document.documentElement.scrollTop;
                const containerHeight = container.offsetHeight;
                const containerTop = container.getBoundingClientRect().top + scrollTop;
                const containerBottom = containerTop + containerHeight;
                const elementHeight = element.offsetHeight;
                const elementTop = element.getBoundingClientRect().top + scrollTop;
                const elementBottom = elementTop + elementHeight;
                const newScrollTop = elementTop - containerTop + container.scrollTop;
                if (elementTop < containerTop) {
                container.scrollTop = newScrollTop;
                } else if (elementBottom > containerBottom) {
                const heightDifference = containerHeight - elementHeight;
                container.scrollTop = newScrollTop - heightDifference;
                }
            }
            _updateDialCode(newDialCodeBare) {
                const inputVal = this.telInput.value;
                const newDialCode = `+${newDialCodeBare}`;
                let newNumber;
                if (inputVal.charAt(0) === "+") {
                const prevDialCode = this._getDialCode(inputVal);
                if (prevDialCode) {
                    newNumber = inputVal.replace(prevDialCode, newDialCode);
                } else {
                    newNumber = newDialCode;
                }
                this.telInput.value = newNumber;
                }
            }
            _getDialCode(number, includeAreaCode) {
                let dialCode = "";
                if (number.charAt(0) === "+") {
                let numericChars = "";
                for (let i = 0; i < number.length; i++) {
                    const c = number.charAt(i);
                    if (!isNaN(parseInt(c, 10))) {
                    numericChars += c;
                    if (includeAreaCode) {
                        if (this.dialCodeToIso2Map[numericChars]) {
                        dialCode = number.substr(0, i + 1);
                        }
                    } else {
                        if (this.dialCodes[numericChars]) {
                        dialCode = number.substr(0, i + 1);
                        break;
                        }
                    }
                    if (numericChars.length === this.dialCodeMaxLen) {
                        break;
                    }
                    }
                }
                }
                return dialCode;
            }
            _getFullNumber() {
                const val = this.telInput.value.trim();
                const { dialCode } = this.selectedCountryData;
                let prefix;
                const numericVal = getNumeric(val);
                if (this.options.separateDialCode && val.charAt(0) !== "+" && dialCode && numericVal) {
                prefix = `+${dialCode}`;
                } else {
                prefix = "";
                }
                return prefix + val;
            }
            _beforeSetNumber(fullNumber) {
                let number = fullNumber;
                if (this.options.separateDialCode) {
                let dialCode = this._getDialCode(number);
                if (dialCode) {
                    dialCode = `+${this.selectedCountryData.dialCode}`;
                    const start = number[dialCode.length] === " " || number[dialCode.length] === "-" ? dialCode.length + 1 : dialCode.length;
                    number = number.substr(start);
                }
                }
                return this._cap(number);
            }
            _triggerCountryChange() {
                this._trigger("countrychange");
            }
            _formatNumberAsYouType() {
                const val = this._getFullNumber();
                const result = intlTelInput.utils ? intlTelInput.utils.formatNumberAsYouType(val, this.selectedCountryData.iso2) : val;
                const { dialCode } = this.selectedCountryData;
                if (this.options.separateDialCode && this.telInput.value.charAt(0) !== "+" && result.includes(`+${dialCode}`)) {
                const afterDialCode = result.split(`+${dialCode}`)[1] || "";
                return afterDialCode.trim();
                }
                return result;
            }
            handleAutoCountry() {
                if (this.options.initialCountry === "auto" && intlTelInput.autoCountry) {
                this.defaultCountry = intlTelInput.autoCountry;
                if (!this.telInput.value) {
                    this.setCountry(this.defaultCountry);
                }
                this.resolveAutoCountryPromise();
                }
            }
            handleUtils() {
                if (intlTelInput.utils) {
                if (this.telInput.value) {
                    this._updateValFromNumber(this.telInput.value);
                }
                if (this.selectedCountryData.iso2) {
                    this._updatePlaceholder();
                    this._updateMaxLength();
                }
                }
                this.resolveUtilsScriptPromise();
            }
            destroy() {
                if (this.options.allowDropdown) {
                this._closeDropdown();
                this.selectedCountry.removeEventListener(
                    "click",
                    this._handleClickSelectedCountry
                );
                this.countryContainer.removeEventListener(
                    "keydown",
                    this._handleCountryContainerKeydown
                );
                const label = this.telInput.closest("label");
                if (label) {
                    label.removeEventListener("click", this._handleLabelClick);
                }
                }
                const { form } = this.telInput;
                if (this._handleHiddenInputSubmit && form) {
                form.removeEventListener("submit", this._handleHiddenInputSubmit);
                }
                this.telInput.removeEventListener("input", this._handleInputEvent);
                if (this._handleKeydownEvent) {
                this.telInput.removeEventListener("keydown", this._handleKeydownEvent);
                }
                this.telInput.removeAttribute("data-intl-tel-input-id");
                const wrapper = this.telInput.parentNode;
                wrapper?.parentNode?.insertBefore(this.telInput, wrapper);
                wrapper?.parentNode?.removeChild(wrapper);
                delete intlTelInput.instances[this.id];
            }
            getExtension() {
                if (intlTelInput.utils) {
                return intlTelInput.utils.getExtension(
                    this._getFullNumber(),
                    this.selectedCountryData.iso2
                );
                }
                return "";
            }
            getNumber(format) {
                if (intlTelInput.utils) {
                const { iso2 } = this.selectedCountryData;
                return intlTelInput.utils.formatNumber(
                    this._getFullNumber(),
                    iso2,
                    format
                );
                }
                return "";
            }
            getNumberType() {
                if (intlTelInput.utils) {
                return intlTelInput.utils.getNumberType(
                    this._getFullNumber(),
                    this.selectedCountryData.iso2
                );
                }
                return -99;
            }
            getSelectedCountryData() {
                return this.selectedCountryData;
            }
            getValidationError() {
                if (intlTelInput.utils) {
                const { iso2 } = this.selectedCountryData;
                return intlTelInput.utils.getValidationError(this._getFullNumber(), iso2);
                }
                return -99;
            }
            isValidNumber(mobileOnly = true) {
                const val = this._getFullNumber();
                if (/\p{L}/u.test(val)) {
                return false;
                }
                return intlTelInput.utils ? intlTelInput.utils.isPossibleNumber(val, this.selectedCountryData.iso2, mobileOnly) : null;
            }
            isValidNumberPrecise() {
                const val = this._getFullNumber();
                if (/\p{L}/u.test(val)) {
                return false;
                }
                return intlTelInput.utils ? intlTelInput.utils.isValidNumber(val, this.selectedCountryData.iso2) : null;
            }
            setCountry(iso2) {
                const iso2Lower = iso2.toLowerCase();
                if (this.selectedCountryData.iso2 !== iso2Lower) {
                this._setCountry(iso2Lower);
                this._updateDialCode(this.selectedCountryData.dialCode);
                this._triggerCountryChange();
                }
            }
            setNumber(number) {
                const countryChanged = this._updateCountryFromNumber(number);
                this._updateValFromNumber(number);
                if (countryChanged) {
                this._triggerCountryChange();
                }
            }
            setPlaceholderNumberType(type) {
                this.options.placeholderNumberType = type;
                this._updatePlaceholder();
            }
            };
            var injectUtilsScriptTag = (path, handleSuccess, handleFailure) => {
            const script = document.createElement("script");
            script.onload = () => {
                if (window.intlTelInputUtils) {
                intlTelInput.utils = window.intlTelInputUtils;
                delete window.intlTelInputUtils;
                if (window.intlTelInputUtilsBackup) {
                    window.intlTelInputUtils = window.intlTelInputUtilsBackup;
                    delete window.intlTelInputUtilsBackup;
                }
                }
                forEachInstance("handleUtils");
                if (handleSuccess) {
                handleSuccess();
                }
            };
            script.onerror = () => {
                forEachInstance("rejectUtilsScriptPromise");
                if (handleFailure) {
                handleFailure();
                }
            };
            script.className = "iti-load-utils";
            script.async = true;
            script.src = path;
            document.body.appendChild(script);
            };
            var loadUtils = (path) => {
            if (!intlTelInput.utils && !intlTelInput.startedLoadingUtilsScript) {
                intlTelInput.startedLoadingUtilsScript = true;
                return new Promise(
                (resolve, reject) => injectUtilsScriptTag(path, resolve, reject)
                );
            }
            return null;
            };
            var intlTelInput = Object.assign(
            async (changeCountrycodeObject) => {
                if(!$('.countryCodeStyle').length) {
                    let countryCodeCSS = `<style class="countryCodeStyle"> 
                    input.enCountrycode_input {
                        min-height: 36px;
                        margin: 0;
                        padding: 6px 12px;
                        border-radius: 2px;
                        font-family: inherit;
                        font-size: 100%;
                        color: inherit;
                    }
                    input.enCountrycode_input[disabled] {
                        background-color: #eee;
                    }
                
                    input.enCountrycode_input {
                        border: 1px solid #ccc;
                        width: 220px;
                    }
                
                    input.enCountrycode_input::placeholder {
                        color: #bbb;
                    }
                
                    .notice {
                        margin-top: 15px;
                    }
                
                
                    :root {
                        --iti-hover-color: rgba(0, 0, 0, 0.05);
                        --iti-text-gray: #999;
                        --iti-border-gray: #ccc;
                        --iti-spacer-horizontal: 8px;
                        --iti-flag-height: 15px;
                        --iti-flag-width: 20px;
                        --iti-border-width: 1px;
                        --iti-arrow-height: 4px;
                        --iti-arrow-width: 6px;
                        --iti-triangle-border: calc(var(--iti-arrow-width) / 2);
                        --iti-arrow-padding: 6px;
                        --iti-arrow-color: #555;
                        --iti-input-padding: 6px;
                        --iti-right-hand-selected-country-padding: calc(var(--iti-spacer-horizontal) + var(--iti-spacer-horizontal) + var(--iti-flag-width));
                        --iti-selected-country-arrow-padding: calc(var(--iti-arrow-padding) + var(--iti-arrow-padding) + var(--iti-flag-width) + var(--iti-spacer-horizontal) + var(--iti-arrow-width) + var(--iti-input-padding));
                        --iti-path-flags-1x: url("flags.png?1");
                        --iti-path-flags-2x: url("flags@2x.png?1");
                        --iti-path-globe-1x: url("globe.png");
                        --iti-path-globe-2x: url("globe@2x.png");
                        --iti-flag-sprite-width: 5762px;
                        --iti-flag-sprite-height: 15px;
                        --iti-mobile-popup-margin: 30px;
                    }
                
                    .iti {
                        position: relative;
                        display: inline-block;
                    }
                    .iti * {
                        box-sizing: border-box;
                    }
                    .iti__hide {
                        display: none;
                    }
                    .iti__v-hide {
                        visibility: hidden;
                    }
                    .iti__a11y-text {
                        width: 1px;
                        height: 1px;
                        clip: rect(1px, 1px, 1px, 1px);
                        overflow: hidden;
                        position: absolute;
                    }
                    .iti input.iti__tel-input,
                    .iti input.iti__tel-input[type=text],
                    .iti input.iti__tel-input[type=tel] {
                        position: relative;
                        z-index: 0;
                        margin-top: 0 !important;
                        margin-bottom: 0 !important;
                        padding-right: var(--iti-right-hand-selected-country-padding);
                        margin-right: 0;
                    }
                    .iti__country-container {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        padding: var(--iti-border-width);
                        font-size: 14px;
                        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                        color: #555;
                    }
                    .iti__selected-country {
                        z-index: 1;
                        position: relative;
                        display: flex;
                        align-items: center;
                        height: 100%;
                        background: none;
                        border: 0;
                        margin: 0;
                        padding: 0;
                        font-family: inherit;
                        font-size: inherit;
                        color: inherit;
                        border-radius: 0;
                        font-weight: inherit;
                        line-height: inherit;
                        text-decoration: none;
                        padding-right: 7px;
                        min-height: 30px;
                        outline: transparent solid 2px;
                        transition: box-shadow 0.15s ease 0s;
                    }
                    .iti__selected-country-primary {
                        display: flex;
                        align-items: center;
                        height: 100%;
                        padding: 0 var(--iti-arrow-padding) 0 var(--iti-spacer-horizontal);
                    }
                    .iti__arrow {
                        margin-left: var(--iti-arrow-padding);
                        width: 0;
                        height: 0;
                        border-left: var(--iti-triangle-border) solid transparent;
                        border-right: var(--iti-triangle-border) solid transparent;
                        border-top: var(--iti-arrow-height) solid var(--iti-arrow-color);
                    }
                    [dir=rtl] .iti__arrow {
                        margin-right: var(--iti-arrow-padding);
                        margin-left: 0;
                    }
                    .iti__arrow--up {
                        border-top: none;
                        border-bottom: var(--iti-arrow-height) solid var(--iti-arrow-color);
                    }
                    .iti__dropdown-content {
                        border-radius: 5px;
                        background-color: white;
                        overflow: hidden;
                        min-width: 185px;
                    }
                    .iti--inline-dropdown .iti__dropdown-content {
                        position: absolute;
                        z-index: 2;
                        margin-top: 3px;
                        margin-left: calc(var(--iti-border-width) * -1);
                        border: var(--iti-border-width) solid var(--iti-border-gray);
                        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
                    }
                    input.iti__search-input {
                        width: calc(100% - 0px);
                        border-width: 0;
                        border-radius: 0px;
                        /* margin-left: 1px; */
                        padding: 9px 12px;
                        outline: 2px solid #1a73e8;
                    }
                    input.iti__search-input + .iti__country-list {
                        border-top: 1px solid var(--iti-border-gray);
                    }
                    .iti__country-list {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                        margin-top: 2px;
                        overflow-y: auto;
                        -webkit-overflow-scrolling: touch;
                    }
                    .iti__country-list[placeholder]:empty:before {
                        content: attr(placeholder);
                        color: rgb(0 0 0 / 15%);
                        white-space: nowrap;
                        font-size: 15px;
                        text-align: center;
                        display: block;
                        padding: 10px 0;
                        font-weight: 600;
                    }
                    .iti--inline-dropdown .iti__country-list {
                        max-height: 185px;
                    }
                    .iti--flexible-dropdown-width .iti__country-list {
                        white-space: nowrap;
                    }
                    @media (max-width: 500px) {
                        .iti--flexible-dropdown-width .iti__country-list {
                        white-space: normal;
                        }
                    }
                    .iti__flag-box {
                        display: inline-block;
                        width: var(--iti-flag-width);
                    }
                    .iti__country {
                        display: flex;
                        align-items: center;
                        padding: 8px var(--iti-spacer-horizontal);
                        outline: none;
                    }
                    .iti__dial-code {
                        color: var(--iti-text-gray);
                    }
                    .iti__country.iti__highlight {
                        background-color: var(--iti-hover-color);
                    }
                    .iti__flag-box, .iti__country-name {
                        margin-right: var(--iti-spacer-horizontal);
                    }
                    [dir=rtl] .iti__flag-box, [dir=rtl] .iti__country-name {
                        margin-right: 0;
                        margin-left: var(--iti-spacer-horizontal);
                    }
                    .iti--allow-dropdown input.iti__tel-input,
                    .iti--allow-dropdown input.iti__tel-input[type=text],
                    .iti--allow-dropdown input.iti__tel-input[type=tel] {
                        padding-right: var(--iti-input-padding);
                        padding-left: var(--iti-selected-country-arrow-padding);
                        margin-left: 0;
                    }
                    [dir=rtl] .iti--allow-dropdown input.iti__tel-input,
                    [dir=rtl] .iti--allow-dropdown input.iti__tel-input[type=text],
                    [dir=rtl] .iti--allow-dropdown input.iti__tel-input[type=tel] {
                        padding-right: var(--iti-selected-country-arrow-padding);
                        padding-left: var(--iti-input-padding);
                        margin-right: 0;
                    }
                    .iti--allow-dropdown .iti__country-container {
                        right: auto;
                        left: 0;
                    }
                    [dir=rtl] .iti--allow-dropdown .iti__country-container {
                        right: 0;
                        left: auto;
                    }
                    .iti--allow-dropdown .iti__country-container:not(:has(+ input.enCountrycode_input[disabled])):not(:has(+ input.enCountrycode_input[readonly])):hover, .iti--allow-dropdown .iti__country-container:not(:has(+ input.enCountrycode_input[disabled])):not(:has(+ input.enCountrycode_input[readonly])):hover button.iti__selected-country {
                        cursor: pointer;
                    }
                    .iti--allow-dropdown .iti__country-container:not(:has(+ input.enCountrycode_input[disabled])):not(:has(+ input.enCountrycode_input[readonly])) .iti__selected-country:hover, .iti--allow-dropdown .iti__country-container:not(:has(+ input.enCountrycode_input[disabled])):not(:has(+ input.enCountrycode_input[readonly])) .iti__selected-country:has(+ .iti__dropdown-content:hover) .iti__selected-country {
                        background-color: var(--iti-hover-color);
                    }
                    .iti .iti__selected-dial-code {
                        margin-left: 4px;
                    }
                    [dir=rtl] .iti .iti__selected-dial-code {
                        margin-left: 0;
                        margin-right: 4px;
                    }
                    .iti--container {
                        position: fixed;
                        top: -1000px;
                        left: -1000px;
                        z-index: 1060;
                        padding: var(--iti-border-width);
                    }
                    .iti--container:hover {
                        cursor: pointer;
                    }
                
                    .iti--fullscreen-popup.iti--container {
                        background-color: rgba(0, 0, 0, 0.5);
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        position: fixed;
                        padding: var(--iti-mobile-popup-margin);
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                    }
                    .iti--fullscreen-popup .iti__dropdown-content {
                        display: flex;
                        flex-direction: column;
                        max-height: 100%;
                        position: relative;
                    }
                    .iti--fullscreen-popup .iti__country {
                        padding: 10px 10px;
                        line-height: 1.5em;
                    }
                
                    .iti__flag {
                        --iti-flag-offset: 0px;
                        --iti-flag-width: 20px;
                        --iti-flag-height: 14px;
                        height: var(--iti-flag-height);
                        width: var(--iti-flag-width);
                        box-shadow: 0px 0px 1px 0px #888;
                        background-image: var(--iti-path-flags-1x);
                        background-repeat: no-repeat;
                        background-position: var(--iti-flag-offset) 0;
                        background-size: var(--iti-flag-sprite-width) var(--iti-flag-sprite-height);
                    }
                
                    .iti__np {
                        --iti-flag-width: 13px;
                    }
                
                    .iti__va, .iti__ch {
                        --iti-flag-width: 15px;
                    }
                
                    .iti__ne, .iti__be {
                        --iti-flag-width: 18px;
                    }
                
                    .iti__mc {
                        --iti-flag-width: 19px;
                    }
                
                    .iti__zw, .iti__ws, .iti__vg, .iti__uz, .iti__uk, .iti__tv, .iti__to, .iti__tl, .iti__tk, .iti__tj, .iti__tc, .iti__ta, .iti__su, .iti__st, .iti__ss, .iti__si, .iti__sh, .iti__sd, .iti__sc, .iti__sb, .iti__ps, .iti__pn, .iti__ph, .iti__om, .iti__nz, .iti__nu, .iti__nr, .iti__ng, .iti__nf, .iti__nc, .iti__my, .iti__ms, .iti__mp, .iti__mn, .iti__mk, .iti__me, .iti__md, .iti__ly, .iti__lv, .iti__lk, .iti__lc, .iti__kz, .iti__ky, .iti__kw, .iti__kp, .iti__ki, .iti__jo, .iti__jm, .iti__io, .iti__im, .iti__ie, .iti__hu, .iti__hr, .iti__hn, .iti__hm, .iti__gw, .iti__gs, .iti__gi, .iti__gb, .iti__fk, .iti__fj, .iti__et, .iti__er, .iti__eh, .iti__dm, .iti__dg, .iti__cx, .iti__cu, .iti__ck, .iti__cc, .iti__ca, .iti__by, .iti__bs, .iti__bn, .iti__bm, .iti__ba, .iti__az, .iti__au, .iti__as, .iti__am, .iti__ai, .iti__ae, .iti__ac {
                        --iti-flag-height: 10px;
                    }
                
                    .iti__us, .iti__um, .iti__py, .iti__mh, .iti__lr, .iti__gu, .iti__fm {
                        --iti-flag-height: 11px;
                    }
                
                    .iti__vu, .iti__tt, .iti__sv, .iti__ni, .iti__mx, .iti__lu, .iti__lt, .iti__li, .iti__km, .iti__kg, .iti__je, .iti__ir, .iti__ht, .iti__gy, .iti__gd, .iti__fi, .iti__de, .iti__cv, .iti__cr, .iti__cq, .iti__bz, .iti__bi, .iti__bh, .iti__bg, .iti__bd {
                        --iti-flag-height: 12px;
                    }
                
                    .iti__tg, .iti__se, .iti__pw, .iti__pl, .iti__kh, .iti__gt, .iti__ee, .iti__ax, .iti__ar {
                        --iti-flag-height: 13px;
                    }
                
                    .iti__xk, .iti__va, .iti__sm, .iti__sj, .iti__pg, .iti__np, .iti__no, .iti__ne, .iti__mc, .iti__is, .iti__il, .iti__ga, .iti__fo, .iti__dk, .iti__ch, .iti__cd, .iti__bv, .iti__be, .iti__al {
                        --iti-flag-height: 15px;
                    }
                
                    .iti__qa {
                        --iti-flag-height: 8px;
                    }
                
                    .iti__ac {
                        --iti-flag-offset: 0px;
                    }
                
                    .iti__ad {
                        --iti-flag-offset: -22px;
                    }
                
                    .iti__ae {
                        --iti-flag-offset: -44px;
                    }
                
                    .iti__af {
                        --iti-flag-offset: -66px;
                    }
                
                    .iti__ag {
                        --iti-flag-offset: -88px;
                    }
                
                    .iti__ai {
                        --iti-flag-offset: -110px;
                    }
                
                    .iti__al {
                        --iti-flag-offset: -132px;
                    }
                
                    .iti__am {
                        --iti-flag-offset: -154px;
                    }
                
                    .iti__ao {
                        --iti-flag-offset: -176px;
                    }
                
                    .iti__aq {
                        --iti-flag-offset: -198px;
                    }
                
                    .iti__ar {
                        --iti-flag-offset: -220px;
                    }
                
                    .iti__as {
                        --iti-flag-offset: -242px;
                    }
                
                    .iti__at {
                        --iti-flag-offset: -264px;
                    }
                
                    .iti__au {
                        --iti-flag-offset: -286px;
                    }
                
                    .iti__aw {
                        --iti-flag-offset: -308px;
                    }
                
                    .iti__ax {
                        --iti-flag-offset: -330px;
                    }
                
                    .iti__az {
                        --iti-flag-offset: -352px;
                    }
                
                    .iti__ba {
                        --iti-flag-offset: -374px;
                    }
                
                    .iti__bb {
                        --iti-flag-offset: -396px;
                    }
                
                    .iti__bd {
                        --iti-flag-offset: -418px;
                    }
                
                    .iti__be {
                        --iti-flag-offset: -440px;
                    }
                
                    .iti__bf {
                        --iti-flag-offset: -460px;
                    }
                
                    .iti__bg {
                        --iti-flag-offset: -482px;
                    }
                
                    .iti__bh {
                        --iti-flag-offset: -504px;
                    }
                
                    .iti__bi {
                        --iti-flag-offset: -526px;
                    }
                
                    .iti__bj {
                        --iti-flag-offset: -548px;
                    }
                
                    .iti__bl {
                        --iti-flag-offset: -570px;
                    }
                
                    .iti__bm {
                        --iti-flag-offset: -592px;
                    }
                
                    .iti__bn {
                        --iti-flag-offset: -614px;
                    }
                
                    .iti__bo {
                        --iti-flag-offset: -636px;
                    }
                
                    .iti__bq {
                        --iti-flag-offset: -658px;
                    }
                
                    .iti__br {
                        --iti-flag-offset: -680px;
                    }
                
                    .iti__bs {
                        --iti-flag-offset: -702px;
                    }
                
                    .iti__bt {
                        --iti-flag-offset: -724px;
                    }
                
                    .iti__bv {
                        --iti-flag-offset: -746px;
                    }
                
                    .iti__bw {
                        --iti-flag-offset: -768px;
                    }
                
                    .iti__by {
                        --iti-flag-offset: -790px;
                    }
                
                    .iti__bz {
                        --iti-flag-offset: -812px;
                    }
                
                    .iti__ca {
                        --iti-flag-offset: -834px;
                    }
                
                    .iti__cc {
                        --iti-flag-offset: -856px;
                    }
                
                    .iti__cd {
                        --iti-flag-offset: -878px;
                    }
                
                    .iti__cf {
                        --iti-flag-offset: -900px;
                    }
                
                    .iti__cg {
                        --iti-flag-offset: -922px;
                    }
                
                    .iti__ch {
                        --iti-flag-offset: -944px;
                    }
                
                    .iti__ci {
                        --iti-flag-offset: -961px;
                    }
                
                    .iti__ck {
                        --iti-flag-offset: -983px;
                    }
                
                    .iti__cl {
                        --iti-flag-offset: -1005px;
                    }
                
                    .iti__cm {
                        --iti-flag-offset: -1027px;
                    }
                
                    .iti__cn {
                        --iti-flag-offset: -1049px;
                    }
                
                    .iti__co {
                        --iti-flag-offset: -1071px;
                    }
                
                    .iti__cp {
                        --iti-flag-offset: -1093px;
                    }
                
                    .iti__cq {
                        --iti-flag-offset: -1115px;
                    }
                
                    .iti__cr {
                        --iti-flag-offset: -1137px;
                    }
                
                    .iti__cu {
                        --iti-flag-offset: -1159px;
                    }
                
                    .iti__cv {
                        --iti-flag-offset: -1181px;
                    }
                
                    .iti__cw {
                        --iti-flag-offset: -1203px;
                    }
                
                    .iti__cx {
                        --iti-flag-offset: -1225px;
                    }
                
                    .iti__cy {
                        --iti-flag-offset: -1247px;
                    }
                
                    .iti__cz {
                        --iti-flag-offset: -1269px;
                    }
                
                    .iti__de {
                        --iti-flag-offset: -1291px;
                    }
                
                    .iti__dg {
                        --iti-flag-offset: -1313px;
                    }
                
                    .iti__dj {
                        --iti-flag-offset: -1335px;
                    }
                
                    .iti__dk {
                        --iti-flag-offset: -1357px;
                    }
                
                    .iti__dm {
                        --iti-flag-offset: -1379px;
                    }
                
                    .iti__do {
                        --iti-flag-offset: -1401px;
                    }
                
                    .iti__dz {
                        --iti-flag-offset: -1423px;
                    }
                
                    .iti__ea {
                        --iti-flag-offset: -1445px;
                    }
                
                    .iti__ec {
                        --iti-flag-offset: -1467px;
                    }
                
                    .iti__ee {
                        --iti-flag-offset: -1489px;
                    }
                
                    .iti__eg {
                        --iti-flag-offset: -1511px;
                    }
                
                    .iti__eh {
                        --iti-flag-offset: -1533px;
                    }
                
                    .iti__er {
                        --iti-flag-offset: -1555px;
                    }
                
                    .iti__es {
                        --iti-flag-offset: -1577px;
                    }
                
                    .iti__et {
                        --iti-flag-offset: -1599px;
                    }
                
                    .iti__eu {
                        --iti-flag-offset: -1621px;
                    }
                
                    .iti__ez {
                        --iti-flag-offset: -1643px;
                    }
                
                    .iti__fi {
                        --iti-flag-offset: -1665px;
                    }
                
                    .iti__fj {
                        --iti-flag-offset: -1687px;
                    }
                
                    .iti__fk {
                        --iti-flag-offset: -1709px;
                    }
                
                    .iti__fm {
                        --iti-flag-offset: -1731px;
                    }
                
                    .iti__fo {
                        --iti-flag-offset: -1753px;
                    }
                
                    .iti__fr {
                        --iti-flag-offset: -1775px;
                    }
                
                    .iti__fx {
                        --iti-flag-offset: -1797px;
                    }
                
                    .iti__ga {
                        --iti-flag-offset: -1819px;
                    }
                
                    .iti__gb {
                        --iti-flag-offset: -1841px;
                    }
                
                    .iti__gd {
                        --iti-flag-offset: -1863px;
                    }
                
                    .iti__ge {
                        --iti-flag-offset: -1885px;
                    }
                
                    .iti__gf {
                        --iti-flag-offset: -1907px;
                    }
                
                    .iti__gg {
                        --iti-flag-offset: -1929px;
                    }
                
                    .iti__gh {
                        --iti-flag-offset: -1951px;
                    }
                
                    .iti__gi {
                        --iti-flag-offset: -1973px;
                    }
                
                    .iti__gl {
                        --iti-flag-offset: -1995px;
                    }
                
                    .iti__gm {
                        --iti-flag-offset: -2017px;
                    }
                
                    .iti__gn {
                        --iti-flag-offset: -2039px;
                    }
                
                    .iti__gp {
                        --iti-flag-offset: -2061px;
                    }
                
                    .iti__gq {
                        --iti-flag-offset: -2083px;
                    }
                
                    .iti__gr {
                        --iti-flag-offset: -2105px;
                    }
                
                    .iti__gs {
                        --iti-flag-offset: -2127px;
                    }
                
                    .iti__gt {
                        --iti-flag-offset: -2149px;
                    }
                
                    .iti__gu {
                        --iti-flag-offset: -2171px;
                    }
                
                    .iti__gw {
                        --iti-flag-offset: -2193px;
                    }
                
                    .iti__gy {
                        --iti-flag-offset: -2215px;
                    }
                
                    .iti__hk {
                        --iti-flag-offset: -2237px;
                    }
                
                    .iti__hm {
                        --iti-flag-offset: -2259px;
                    }
                
                    .iti__hn {
                        --iti-flag-offset: -2281px;
                    }
                
                    .iti__hr {
                        --iti-flag-offset: -2303px;
                    }
                
                    .iti__ht {
                        --iti-flag-offset: -2325px;
                    }
                
                    .iti__hu {
                        --iti-flag-offset: -2347px;
                    }
                
                    .iti__ic {
                        --iti-flag-offset: -2369px;
                    }
                
                    .iti__id {
                        --iti-flag-offset: -2391px;
                    }
                
                    .iti__ie {
                        --iti-flag-offset: -2413px;
                    }
                
                    .iti__il {
                        --iti-flag-offset: -2435px;
                    }
                
                    .iti__im {
                        --iti-flag-offset: -2457px;
                    }
                
                    .iti__in {
                        --iti-flag-offset: -2479px;
                    }
                
                    .iti__io {
                        --iti-flag-offset: -2501px;
                    }
                
                    .iti__iq {
                        --iti-flag-offset: -2523px;
                    }
                
                    .iti__ir {
                        --iti-flag-offset: -2545px;
                    }
                
                    .iti__is {
                        --iti-flag-offset: -2567px;
                    }
                
                    .iti__it {
                        --iti-flag-offset: -2589px;
                    }
                
                    .iti__je {
                        --iti-flag-offset: -2611px;
                    }
                
                    .iti__jm {
                        --iti-flag-offset: -2633px;
                    }
                
                    .iti__jo {
                        --iti-flag-offset: -2655px;
                    }
                
                    .iti__jp {
                        --iti-flag-offset: -2677px;
                    }
                
                    .iti__ke {
                        --iti-flag-offset: -2699px;
                    }
                
                    .iti__kg {
                        --iti-flag-offset: -2721px;
                    }
                
                    .iti__kh {
                        --iti-flag-offset: -2743px;
                    }
                
                    .iti__ki {
                        --iti-flag-offset: -2765px;
                    }
                
                    .iti__km {
                        --iti-flag-offset: -2787px;
                    }
                
                    .iti__kn {
                        --iti-flag-offset: -2809px;
                    }
                
                    .iti__kp {
                        --iti-flag-offset: -2831px;
                    }
                
                    .iti__kr {
                        --iti-flag-offset: -2853px;
                    }
                
                    .iti__kw {
                        --iti-flag-offset: -2875px;
                    }
                
                    .iti__ky {
                        --iti-flag-offset: -2897px;
                    }
                
                    .iti__kz {
                        --iti-flag-offset: -2919px;
                    }
                
                    .iti__la {
                        --iti-flag-offset: -2941px;
                    }
                
                    .iti__lb {
                        --iti-flag-offset: -2963px;
                    }
                
                    .iti__lc {
                        --iti-flag-offset: -2985px;
                    }
                
                    .iti__li {
                        --iti-flag-offset: -3007px;
                    }
                
                    .iti__lk {
                        --iti-flag-offset: -3029px;
                    }
                
                    .iti__lr {
                        --iti-flag-offset: -3051px;
                    }
                
                    .iti__ls {
                        --iti-flag-offset: -3073px;
                    }
                
                    .iti__lt {
                        --iti-flag-offset: -3095px;
                    }
                
                    .iti__lu {
                        --iti-flag-offset: -3117px;
                    }
                
                    .iti__lv {
                        --iti-flag-offset: -3139px;
                    }
                
                    .iti__ly {
                        --iti-flag-offset: -3161px;
                    }
                
                    .iti__ma {
                        --iti-flag-offset: -3183px;
                    }
                
                    .iti__mc {
                        --iti-flag-offset: -3205px;
                    }
                
                    .iti__md {
                        --iti-flag-offset: -3226px;
                    }
                
                    .iti__me {
                        --iti-flag-offset: -3248px;
                    }
                
                    .iti__mf {
                        --iti-flag-offset: -3270px;
                    }
                
                    .iti__mg {
                        --iti-flag-offset: -3292px;
                    }
                
                    .iti__mh {
                        --iti-flag-offset: -3314px;
                    }
                
                    .iti__mk {
                        --iti-flag-offset: -3336px;
                    }
                
                    .iti__ml {
                        --iti-flag-offset: -3358px;
                    }
                
                    .iti__mm {
                        --iti-flag-offset: -3380px;
                    }
                
                    .iti__mn {
                        --iti-flag-offset: -3402px;
                    }
                
                    .iti__mo {
                        --iti-flag-offset: -3424px;
                    }
                
                    .iti__mp {
                        --iti-flag-offset: -3446px;
                    }
                
                    .iti__mq {
                        --iti-flag-offset: -3468px;
                    }
                
                    .iti__mr {
                        --iti-flag-offset: -3490px;
                    }
                
                    .iti__ms {
                        --iti-flag-offset: -3512px;
                    }
                
                    .iti__mt {
                        --iti-flag-offset: -3534px;
                    }
                
                    .iti__mu {
                        --iti-flag-offset: -3556px;
                    }
                
                    .iti__mv {
                        --iti-flag-offset: -3578px;
                    }
                
                    .iti__mw {
                        --iti-flag-offset: -3600px;
                    }
                
                    .iti__mx {
                        --iti-flag-offset: -3622px;
                    }
                
                    .iti__my {
                        --iti-flag-offset: -3644px;
                    }
                
                    .iti__mz {
                        --iti-flag-offset: -3666px;
                    }
                
                    .iti__na {
                        --iti-flag-offset: -3688px;
                    }
                
                    .iti__nc {
                        --iti-flag-offset: -3710px;
                    }
                
                    .iti__ne {
                        --iti-flag-offset: -3732px;
                    }
                
                    .iti__nf {
                        --iti-flag-offset: -3752px;
                    }
                
                    .iti__ng {
                        --iti-flag-offset: -3774px;
                    }
                
                    .iti__ni {
                        --iti-flag-offset: -3796px;
                    }
                
                    .iti__nl {
                        --iti-flag-offset: -3818px;
                    }
                
                    .iti__no {
                        --iti-flag-offset: -3840px;
                    }
                
                    .iti__np {
                        --iti-flag-offset: -3862px;
                    }
                
                    .iti__nr {
                        --iti-flag-offset: -3877px;
                    }
                
                    .iti__nu {
                        --iti-flag-offset: -3899px;
                    }
                
                    .iti__nz {
                        --iti-flag-offset: -3921px;
                    }
                
                    .iti__om {
                        --iti-flag-offset: -3943px;
                    }
                
                    .iti__pa {
                        --iti-flag-offset: -3965px;
                    }
                
                    .iti__pe {
                        --iti-flag-offset: -3987px;
                    }
                
                    .iti__pf {
                        --iti-flag-offset: -4009px;
                    }
                
                    .iti__pg {
                        --iti-flag-offset: -4031px;
                    }
                
                    .iti__ph {
                        --iti-flag-offset: -4053px;
                    }
                
                    .iti__pk {
                        --iti-flag-offset: -4075px;
                    }
                
                    .iti__pl {
                        --iti-flag-offset: -4097px;
                    }
                
                    .iti__pm {
                        --iti-flag-offset: -4119px;
                    }
                
                    .iti__pn {
                        --iti-flag-offset: -4141px;
                    }
                
                    .iti__pr {
                        --iti-flag-offset: -4163px;
                    }
                
                    .iti__ps {
                        --iti-flag-offset: -4185px;
                    }
                
                    .iti__pt {
                        --iti-flag-offset: -4207px;
                    }
                
                    .iti__pw {
                        --iti-flag-offset: -4229px;
                    }
                
                    .iti__py {
                        --iti-flag-offset: -4251px;
                    }
                
                    .iti__qa {
                        --iti-flag-offset: -4273px;
                    }
                
                    .iti__re {
                        --iti-flag-offset: -4295px;
                    }
                
                    .iti__ro {
                        --iti-flag-offset: -4317px;
                    }
                
                    .iti__rs {
                        --iti-flag-offset: -4339px;
                    }
                
                    .iti__ru {
                        --iti-flag-offset: -4361px;
                    }
                
                    .iti__rw {
                        --iti-flag-offset: -4383px;
                    }
                
                    .iti__sa {
                        --iti-flag-offset: -4405px;
                    }
                
                    .iti__sb {
                        --iti-flag-offset: -4427px;
                    }
                
                    .iti__sc {
                        --iti-flag-offset: -4449px;
                    }
                
                    .iti__sd {
                        --iti-flag-offset: -4471px;
                    }
                
                    .iti__se {
                        --iti-flag-offset: -4493px;
                    }
                
                    .iti__sg {
                        --iti-flag-offset: -4515px;
                    }
                
                    .iti__sh {
                        --iti-flag-offset: -4537px;
                    }
                
                    .iti__si {
                        --iti-flag-offset: -4559px;
                    }
                
                    .iti__sj {
                        --iti-flag-offset: -4581px;
                    }
                
                    .iti__sk {
                        --iti-flag-offset: -4603px;
                    }
                
                    .iti__sl {
                        --iti-flag-offset: -4625px;
                    }
                
                    .iti__sm {
                        --iti-flag-offset: -4647px;
                    }
                
                    .iti__sn {
                        --iti-flag-offset: -4669px;
                    }
                
                    .iti__so {
                        --iti-flag-offset: -4691px;
                    }
                
                    .iti__sr {
                        --iti-flag-offset: -4713px;
                    }
                
                    .iti__ss {
                        --iti-flag-offset: -4735px;
                    }
                
                    .iti__st {
                        --iti-flag-offset: -4757px;
                    }
                
                    .iti__su {
                        --iti-flag-offset: -4779px;
                    }
                
                    .iti__sv {
                        --iti-flag-offset: -4801px;
                    }
                
                    .iti__sx {
                        --iti-flag-offset: -4823px;
                    }
                
                    .iti__sy {
                        --iti-flag-offset: -4845px;
                    }
                
                    .iti__sz {
                        --iti-flag-offset: -4867px;
                    }
                
                    .iti__ta {
                        --iti-flag-offset: -4889px;
                    }
                
                    .iti__tc {
                        --iti-flag-offset: -4911px;
                    }
                
                    .iti__td {
                        --iti-flag-offset: -4933px;
                    }
                
                    .iti__tf {
                        --iti-flag-offset: -4955px;
                    }
                
                    .iti__tg {
                        --iti-flag-offset: -4977px;
                    }
                
                    .iti__th {
                        --iti-flag-offset: -4999px;
                    }
                
                    .iti__tj {
                        --iti-flag-offset: -5021px;
                    }
                
                    .iti__tk {
                        --iti-flag-offset: -5043px;
                    }
                
                    .iti__tl {
                        --iti-flag-offset: -5065px;
                    }
                
                    .iti__tm {
                        --iti-flag-offset: -5087px;
                    }
                
                    .iti__tn {
                        --iti-flag-offset: -5109px;
                    }
                
                    .iti__to {
                        --iti-flag-offset: -5131px;
                    }
                
                    .iti__tr {
                        --iti-flag-offset: -5153px;
                    }
                
                    .iti__tt {
                        --iti-flag-offset: -5175px;
                    }
                
                    .iti__tv {
                        --iti-flag-offset: -5197px;
                    }
                
                    .iti__tw {
                        --iti-flag-offset: -5219px;
                    }
                
                    .iti__tz {
                        --iti-flag-offset: -5241px;
                    }
                
                    .iti__ua {
                        --iti-flag-offset: -5263px;
                    }
                
                    .iti__ug {
                        --iti-flag-offset: -5285px;
                    }
                
                    .iti__uk {
                        --iti-flag-offset: -5307px;
                    }
                
                    .iti__um {
                        --iti-flag-offset: -5329px;
                    }
                
                    .iti__un {
                        --iti-flag-offset: -5351px;
                    }
                
                    .iti__us {
                        --iti-flag-offset: -5373px;
                    }
                
                    .iti__uy {
                        --iti-flag-offset: -5395px;
                    }
                
                    .iti__uz {
                        --iti-flag-offset: -5417px;
                    }
                
                    .iti__va {
                        --iti-flag-offset: -5439px;
                    }
                
                    .iti__vc {
                        --iti-flag-offset: -5456px;
                    }
                
                    .iti__ve {
                        --iti-flag-offset: -5478px;
                    }
                
                    .iti__vg {
                        --iti-flag-offset: -5500px;
                    }
                
                    .iti__vi {
                        --iti-flag-offset: -5522px;
                    }
                
                    .iti__vn {
                        --iti-flag-offset: -5544px;
                    }
                
                    .iti__vu {
                        --iti-flag-offset: -5566px;
                    }
                
                    .iti__wf {
                        --iti-flag-offset: -5588px;
                    }
                
                    .iti__ws {
                        --iti-flag-offset: -5610px;
                    }
                
                    .iti__xk {
                        --iti-flag-offset: -5632px;
                    }
                
                    .iti__ye {
                        --iti-flag-offset: -5654px;
                    }
                
                    .iti__yt {
                        --iti-flag-offset: -5676px;
                    }
                
                    .iti__za {
                        --iti-flag-offset: -5698px;
                    }
                
                    .iti__zm {
                        --iti-flag-offset: -5720px;
                    }
                
                    .iti__zw {
                        --iti-flag-offset: -5742px;
                    }
                
                    .iti__globe {
                        background-image: var(--iti-path-globe-1x);
                        background-size: contain;
                        background-position: right;
                        box-shadow: none;
                        height: 19px;
                    }
                
                    @media (min-resolution: 2x) {
                        .iti__flag {
                        background-image: var(--iti-path-flags-2x);
                        }
                        .iti__globe {
                        background-image: var(--iti-path-globe-2x);
                        }
                    }</style>`;
                    encodeLib.insert(encodeLib.BODY, countryCodeCSS, {addOn: "append"});
                }
                let countrycodeObject = {
                    input: "",
                    inputParent: "",
                    zIndex: "",
                    width: "",
                    height: "",
                    onclick: "",
                    showCountryName: false,
                    focusBorderColor: "",
                    borderRadius: "",
                    dropdownWidth: "",
                    dropdownMaxHeight: "",
                    fontSize: "",
                    dropdownFontSize: "",
                    searchFontSize: "",
                    fontWeight: "",
                    dropdownFontWeight: "",
                    searchFontWeight: "",
                    dropdownOptionHoverColor: "",
                    hoverColor: "",
                    backgroundColor: "",
                    dropdownBackgroundColor: "",
                    searchBackgroundColor: "",
                    color: "",
                    dropdownColor: "",
                    searchColor: "",
                    style: "",
                    dropdownStyle: "",
                    searchStyle: "",
                    dropdownTopPosition: "",
                    allowDropdown: true,
                    containerClass: "",
                    countryOrder: [],
                    excludeCountries: [],
                    fixDropdownWidth: true,
                    initialCountry: await fetch("https://ipapi.co/json").then(function(res) { return res.json(); }).then(function(data) { return data.country_code; }).catch(function() { return "US"; }),
                    onlyCountries: [],
                    showFlags: true,
                    separateDialCode: true,
                    useFullscreenPopup: false
                };
                countrycodeObject = Object.assign(countrycodeObject, changeCountrycodeObject);
                countrycodeObject.containerClass += " enCountrycode";
                if(!countrycodeObject.input && !countrycodeObject.inputParent) {
                    return;
                }
                if(countrycodeObject.inputParent) {
                    if($(countrycodeObject.inputParent).find(".enCountrycode_input").length) {
                        return;
                    }
                    $(countrycodeObject.inputParent).html(`<input id="${countrycodeObject.inputParent.slice(1)}${this.id}_input" name="phone" type="hidden" value=""/>`);
                }
                let input = countrycodeObject.input ? document.querySelector(countrycodeObject.input) : document.querySelector(`#${countrycodeObject.inputParent.slice(1)}${this.id}_input`);
                if(!input || input.classList.contains("enCountrycode_input")) {
                    return;
                }
                const iti = new Iti(input, countrycodeObject);
                iti._init();
                input.setAttribute("data-intl-tel-input-id", iti.id.toString());
                intlTelInput.instances[iti.id] = iti;
                return iti;
            },
            {
                defaults,
                documentReady: () => document.readyState === "complete",
                getCountryData: () => data_default,
                getInstance: (input) => {
                const id2 = input.getAttribute("data-intl-tel-input-id");
                return id2 ? intlTelInput.instances[id2] : null;
                },
                instances: {},
                loadUtils,
                version: "22.0.2"
            }
            );
            var intl_tel_input_default = intlTelInput;
            return __toCommonJS(intl_tel_input_exports);
        })();
            /* UMD */
            return factoryOutput.default;
        }));
    },
    scrollStyle: function(changeScrollStyleObject={}) {
        let scrollStyleObject = {
            element: "",
            color: "#2d7dcb",
            backgroundColor: "white",
            borderRadius: "0",
            marginTop: "",
            marginBottom: "",
            scrollY: "2px",
            scrollX: ""
        };
        if(!changeScrollStyleObject.element) {
            return;
        }
        scrollStyleObject = Object.assign(scrollStyleObject, changeScrollStyleObject);
        return`<style>
                ${scrollStyleObject.element}::-webkit-scrollbar-thumb {
                    background: ${scrollStyleObject.color};
                    border-radius: ${scrollStyleObject.borderRadius};
                }                
                ${scrollStyleObject.element}::-webkit-scrollbar-track {
                    background-color: ${scrollStyleObject.backgroundColor};
                }
                ${scrollStyleObject.element}::-webkit-scrollbar {
                    ${scrollStyleObject.scrollY ? `width: ${scrollStyleObject.scrollY};` : "display: none;"}
                }
                ${scrollStyleObject.element}::-webkit-scrollbar:horizontal {
                    ${scrollStyleObject.scrollX ? `height: ${scrollStyleObject.scrollX};` : "display: none;"}
                }
                ${scrollStyleObject.marginTop ? `${scrollStyleObject.element}::-webkit-scrollbar-track-piece:start { margin-top: ${scrollStyleObject.marginTop}; }` : ""}
                ${scrollStyleObject.marginBottom ? `${scrollStyleObject.element}::-webkit-scrollbar-track-piece:end { margin-bottom: ${scrollStyleObject.marginBottom}; }` : ""}
            </style>`;
    },
    svgLib: {
        mail: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M177-135q-51 0-86-35t-35-86v-448q0-51 35-86t86-35h606q51 0 86 35t35 86v448q0 51-35 86t-86 35H177Zm303-277q9 0 16.75-2.5t15.75-7l249.5-163q8-5 14.5-14.75t6.5-22.25q0-24.5-22.25-38.75T714.5-659L480-507 245.5-659q-22-13.5-45.25-2T177-621.5q0 13 6.75 22.5T198-584.5l249.5 163q8 4.5 15.75 7T480-412Z"/></svg>`,
        article: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Zm120 480h200q17 0 28.5-11.5T560-320q0-17-11.5-28.5T520-360H320q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160h320q17 0 28.5-11.5T680-480q0-17-11.5-28.5T640-520H320q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160h320q17 0 28.5-11.5T680-640q0-17-11.5-28.5T640-680H320q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Z"/></svg>`,
        openLink: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>`,
        video: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m411-320 223-143q9-6 9-17t-9-17L411-640q-10-7-20.5-1T380-623v286q0 12 10.5 18t20.5-1ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Z"/></svg>`,
        downArrow : `<svg fill="currentColor" height="24px" width="24px" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path></svg>`,
        helpFill : `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m480-80-10-120h-10q-142 0-241-99t-99-241q0-142 99-241t241-99q71 0 132.5 26.5t108 73q46.5 46.5 73 108T800-540q0 75-24.5 144t-67 128q-42.5 59-101 107T480-80Zm-21-241q17 0 29-12t12-29q0-17-12-29t-29-12q-17 0-29 12t-12 29q0 17 12 29t29 12Zm-29-127h60q0-30 6-42t38-44q18-18 30-39t12-45q0-51-34.5-76.5T460-720q-44 0-74 24.5T344-636l56 22q5-17 19-33.5t41-16.5q27 0 40.5 15t13.5 33q0 17-10 30.5T480-558q-35 30-42.5 47.5T430-448Z"/></svg>`,
        helpOutline : `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m480-80-10-120h-10q-142 0-241-99t-99-241q0-142 99-241t241-99q71 0 132.5 26.5t108 73q46.5 46.5 73 108T800-540q0 75-24.5 144t-67 128q-42.5 59-101 107T480-80Zm80-146q71-60 115.5-140.5T720-540q0-109-75.5-184.5T460-800q-109 0-184.5 75.5T200-540q0 109 75.5 184.5T460-280h100v54Zm-101-95q17 0 29-12t12-29q0-17-12-29t-29-12q-17 0-29 12t-12 29q0 17 12 29t29 12Zm-29-127h60q0-30 6-42t38-44q18-18 30-39t12-45q0-51-34.5-76.5T460-720q-44 0-74 24.5T344-636l56 22q5-17 19-33.5t41-16.5q27 0 40.5 15t13.5 33q0 17-10 30.5T480-558q-35 30-42.5 47.5T430-448Zm30-65Z"/></svg>`,
        arrowDown: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24px" height="24px"><path fill-rule="evenodd" d="M7.293 10.707a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L8 8.586 5.707 6.293a1 1 0 0 0-1.414 1.414l3 3z"/></svg>`,
        arrowLeft: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24px" height="24px"><path style="transform: rotate(270deg);transform-origin: center;" fill-rule="evenodd" d="M7.293 10.707a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L8 8.586 5.707 6.293a1 1 0 0 0-1.414 1.414l3 3z"/></svg>`,
        arrowRight: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24px" height="24px"><path style="transform: rotate(90deg);transform-origin: center;" fill-rule="evenodd" d="M7.293 10.707a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L8 8.586 5.707 6.293a1 1 0 0 0-1.414 1.414l3 3z"/></svg>`,
        arrowUp: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24px" height="24px"><path style="transform: rotate(180deg);transform-origin: center;" fill-rule="evenodd" d="M7.293 10.707a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L8 8.586 5.707 6.293a1 1 0 0 0-1.414 1.414l3 3z"/></svg>`,
        edit: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="20px" width="20px"><path xmlns="http://www.w3.org/2000/svg" d="M180.182-144Q165-144 154.5-154.297q-10.5-10.298-10.5-25.52v-86.856Q144-281 149-294q5-13 16-24l477-477q11-11 23.836-16 12.836-5 27-5T720-811q13 5 24 16l51 51q11 11 16 24t5 26.542q0 14.444-5.022 27.534Q805.957-652.833 795-642L318-165q-11 11-23.95 16-12.949 5-27.239 5h-86.629ZM693-642l51-51-51-51-51 51 51 51Z"></path></svg>`,
        editOutline: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="20px" width="20px"><path xmlns="http://www.w3.org/2000/svg" d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"></path></svg>`,
        circleTick: `<svg fill="currentColor" width="20px" height="20px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path fill="currentColor" d="M12,2 C17.52,2 22,6.48 22,12 C22,17.52 17.52,22 12,22 C6.48,22 2,17.52 2,12 C2,6.48 6.48,2 12,2 Z M10,14.2 L7.4,11.6 L6,13 L10,17 L18,9 L16.6,7.6 L10,14.2 Z" id="path-1"></path></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon points="0 0 24 0 24 24 0 24"></polygon><mask fill="white"><use xlink:href="#path-1"></use></mask><use fill="currentColor" fill-rule="nonzero" xlink:href="#path-1"></use></g></svg>`,
        copy: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path xmlns="http://www.w3.org/2000/svg" d="M360-240q-29.7 0-50.85-21.15Q288-282.3 288-312v-480q0-29.7 21.15-50.85Q330.3-864 360-864h384q29.7 0 50.85 21.15Q816-821.7 816-792v480q0 29.7-21.15 50.85Q773.7-240 744-240H360ZM216-96q-29.7 0-50.85-21.15Q144-138.3 144-168v-516q0-15.3 10.289-25.65 10.29-10.35 25.5-10.35Q195-720 205.5-709.65 216-699.3 216-684v516h420q15.3 0 25.65 10.289 10.35 10.29 10.35 25.5Q672-117 661.65-106.5 651.3-96 636-96H216Z"></path></svg>`,
        add: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M444-444H276q-15.3 0-25.65-10.289-10.35-10.29-10.35-25.5Q240-495 250.35-505.5 260.7-516 276-516h168v-168q0-15.3 10.289-25.65 10.29-10.35 25.5-10.35Q495-720 505.5-709.65 516-699.3 516-684v168h168q15.3 0 25.65 10.289 10.35 10.29 10.35 25.5Q720-465 709.65-454.5 699.3-444 684-444H516v168q0 15.3-10.289 25.65-10.29 10.35-25.5 10.35Q465-240 454.5-250.35 444-260.7 444-276v-168Z"/></svg>`,
        tick: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m395-387 264-263q11-11 25-10.5t25 11.5q11 11 11 25t-11 25L421-311q-11 11-25.5 11T370-311L251-430q-11-11-11-25t11-25q11-11 25-11t25 11l94 93Z"/></svg>`,
        check: `<svg version="1.1" viewBox="0 0 24 24" width="15px" height="15px"><path fill="none" d="M4.1,12.7 9,17.6 20.3,6.3" stroke="currentColor" style="stroke-width: 2.5;"></path></svg>`,
        close: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m480.004-428-82.591 83q-11.544 11-26.25 11T345-345q-11-11.393-11-26t11-26.087l83-82.917-83-81.582q-11-11.544-11-26.25 0-14.707 11-26.164 11.393-11 26-11t26.087 11l82.917 83 81.582-83q11.544-11 26.25-11 14.707 0 26.164 11 11 11.429 11 26.018t-11 26.069l-83 81.909 83 82.591q11 11.544 11 26.25T614-345q-11.429 11-26.018 11t-26.069-11l-81.909-83Z"/></svg>`,
        sendSchdule: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M744-216q7-7 7-16.818 0-9.818-7-17.182l-48-48v-62q0-9.6-7.2-16.8-7.2-7.2-16.8-7.2-9.6 0-16.8 7.2-7.2 7.2-7.2 16.8v67q0 8 3 14.5t8.091 11.591L710-216q7.364 7 17.182 7Q737-209 744-216Zm-600-29v-139l288-96-288-96v-139q0-19 15.5-29.5T193-748l493 196h-14q-107 0-183.5 73.5T408-298l-215 86q-17.5 8-33.25-3T144-245ZM671.774-96Q592-96 536-152.226t-56-136Q480-368 536.226-424t136-56Q752-480 808-423.774t56 136Q864-208 807.774-152t-136 56Z"/></svg>`,
        sendError: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm-1-4c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1z"/></svg>`,
        sendSuccess: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><g><rect fill="none" height="24" width="24" x="0"/><path d="M18.05,19.29c-0.39,0.39-1.02,0.39-1.41,0l-2.12-2.12c-0.39-0.39-0.39-1.02,0-1.41l0,0c0.39-0.39,1.02-0.39,1.41,0 l1.41,1.41l3.54-3.54c0.39-0.39,1.02-0.39,1.41,0l0,0c0.39,0.39,0.39,1.02,0,1.41L18.05,19.29z M12,17c0-3.87,3.13-7,7-7 c1.08,0,2.09,0.25,3,0.68V4c0-1.1-0.9-2-2-2H4C2.9,2,2,2.9,2,4v18l4-4h6v0c0-0.17,0.01-0.33,0.03-0.5C12.01,17.33,12,17.17,12,17z"/></g></svg>`,
        docError: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M600-624h96L528-792v96q0 30 21 51t51 21Zm120 435-44 44q-11 11-25 10.5T626-146q-11-11-11-25.5t11-25.5l43-43-44-44q-11-11-10.5-25.5T626-335q11-11 25.5-11t25.5 11l43 44 44-44q11-11 25.5-11t25.5 11q11 11 11 25.5T815-284l-44 44 44 44q11 11 11 25t-11 25q-11 11-25.5 11T764-146l-44-43ZM264-96q-30 0-51-21t-21-51v-624q0-30 21-51t51-21h282q14 0 27 5t24 16l150 150q11 10 16 23.5t5 27.5v142q0 11-7.5 17.5T742-478q-56-5-108.5 15T543-401q-29 32-45.5 73T481-240q0 27 5.5 52.5T503-139q7 15-.5 29T479-96H264Z"/></svg>`,
        cloudSync: `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M24,17.48c0,1.38-1.12,2.5-2.5,2.5L15,20c-1.66,0-3-1.34-3-3c0-1.6,1.26-2.9,2.84-2.98C15.4,12.83,16.6,12,18,12 c1.76,0,3.2,1.3,3.45,2.99c0.02,0,0.03-0.01,0.05-0.01C22.88,14.98,24,16.1,24,17.48z M10,15c0-0.55-0.45-1-1-1s-1,0.45-1,1v1.44 c-1.22-1.1-2-2.67-2-4.44c0-2.38,1.39-4.43,3.4-5.4C9.77,6.42,10,6.04,10,5.63c0-0.71-0.73-1.18-1.37-0.88C5.89,6.03,4,8.79,4,12 c0,2.4,1.06,4.54,2.73,6H5c-0.55,0-1,0.45-1,1s0.45,1,1,1h4c0.55,0,1-0.45,1-1V15z M19,6c0.55,0,1-0.45,1-1s-0.45-1-1-1h-4 c-0.55,0-1,0.45-1,1v4c0,0.55,0.45,1,1,1s1-0.45,1-1V7.56c0.98,0.89,1.68,2.08,1.92,3.44l2.02,0c-0.25-1.99-1.23-3.74-2.66-5H19z"/></g></g></svg>`,
        map: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="16px" height="14px" viewBox="0 0 16 14" fill="currentColor" xml:space="preserve"> <style type="text/css"> .mapSVG{fill:none;stroke:currentColor;stroke-miterlimit:10;} </style> <g id="Layer_2"> <circle class="mapSVG" cx="3.2" cy="7.2" r="1.5"/> <circle class="mapSVG" cx="12.5" cy="10.2" r="1.5"/> <circle class="mapSVG" cx="12.5" cy="3.8" r="1.5"/> </g> <g id="Layer_3"> <rect x="5.1" y="6.6" width="3.1" height="1"/> <path d="M11.1,4.4H7.3c-0.1,0-0.2-0.1-0.2-0.2V3.6c0-0.1,0.1-0.2,0.2-0.2h3.8c0.1,0,0.2,0.1,0.2,0.2v0.7   C11.2,4.3,11.2,4.4,11.1,4.4z"/> <rect x="6.1" y="4.6" transform="matrix(1.242212e-11 -1 1 1.242212e-11 2.5412 12.7487)" width="3.1" height="1"/> <path d="M8.2,7l0,3.8c0,0.1-0.1,0.2-0.2,0.2H7.3c-0.1,0-0.2-0.1-0.2-0.2l0-3.8c0-0.1,0.1-0.2,0.2-0.2H8C8.1,6.8,8.2,6.9,8.2,7z"/> <rect x="7.3" y="9.9" transform="matrix(-1 2.579864e-07 -2.579864e-07 -1 18.57 20.8675)" width="3.9" height="1"/> </g> </svg>`,
        addStore: `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/></g><g><g><path d="M3,6h13c0.55,0,1-0.45,1-1c0-0.55-0.45-1-1-1H3C2.45,4,2,4.45,2,5C2,5.55,2.45,6,3,6z"/><path d="M15,17h2v-3h0.18c0.63,0,1.1-0.58,0.98-1.2l-1-5C17.07,7.34,16.66,7,16.18,7H2.82C2.34,7,1.93,7.34,1.84,7.8l-1,5 C0.72,13.42,1.19,14,1.82,14H2v5c0,0.55,0.45,1,1,1h7c0.55,0,1-0.45,1-1v-5h4V17z M9,18H4v-4h5V18z"/><path d="M22,18h-2v-2c0-0.55-0.45-1-1-1s-1,0.45-1,1v2h-2c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1 v-2h2c0.55,0,1-0.45,1-1C23,18.45,22.55,18,22,18z"/></g></g></svg>`,
        store: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M5 6h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1zm15.16 1.8c-.09-.46-.5-.8-.98-.8H4.82c-.48 0-.89.34-.98.8l-1 5c-.12.62.35 1.2.98 1.2H4v5c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-5h4v5c0 .55.45 1 1 1s1-.45 1-1v-5h.18c.63 0 1.1-.58.98-1.2l-1-5zM12 18H6v-4h6v4z"/></svg>`,
        web: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
        key: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12.65 10C11.7 7.31 8.9 5.5 5.77 6.12c-2.29.46-4.15 2.29-4.63 4.58C.32 14.57 3.26 18 7 18c2.61 0 4.83-1.67 5.65-4H17v2c0 1.1.9 2 2 2s2-.9 2-2v-2c1.1 0 2-.9 2-2s-.9-2-2-2h-8.35zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>`,
        deleteOutline: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z"/></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-280q17 0 28.5-11.5T520-320v-160q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480v160q0 17 11.5 28.5T480-280Zm0-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`,
        fieldSearch: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-200q-17 0-28.5-11.5T80-240q0-17 11.5-28.5T120-280h320q17 0 28.5 11.5T480-240q0 17-11.5 28.5T440-200H120Zm0-200q-17 0-28.5-11.5T80-440q0-17 11.5-28.5T120-480h120q17 0 28.5 11.5T280-440q0 17-11.5 28.5T240-400H120Zm0-200q-17 0-28.5-11.5T80-640q0-17 11.5-28.5T120-680h120q17 0 28.5 11.5T280-640q0 17-11.5 28.5T240-600H120Zm440 280q-83 0-141.5-58.5T360-520q0-83 58.5-141.5T560-720q83 0 141.5 58.5T760-520q0 29-8.5 57.5T726-410l126 126q11 11 11 28t-11 28q-11 11-28 11t-28-11L670-354q-24 17-52.5 25.5T560-320Zm0-80q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/></svg>`,
        sync: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-478q0 45 17 87.5t53 78.5l10 10v-58q0-17 11.5-28.5T360-400q17 0 28.5 11.5T400-360v160q0 17-11.5 28.5T360-160H200q-17 0-28.5-11.5T160-200q0-17 11.5-28.5T200-240h70l-16-14q-52-46-73-105t-21-119q0-94 48-170.5T337-766q14-8 29.5-1t20.5 23q5 15-.5 30T367-691q-58 32-92.5 88.5T240-478Zm480-4q0-45-17-87.5T650-648l-10-10v58q0 17-11.5 28.5T600-560q-17 0-28.5-11.5T560-600v-160q0-17 11.5-28.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720h-70l16 14q49 49 71.5 106.5T800-482q0 94-48 170.5T623-194q-14 8-29.5 1T573-216q-5-15 .5-30t19.5-23q58-32 92.5-88.5T720-482Z"/></svg>`,
        thickSync: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-480q0-150 105-255t255-105v-40q0-12 11-18t21 2l125 94q16 12 16 32t-16 32l-125 94q-10 8-21 2t-11-18v-40q-91 0-155.5 64.5T260-480q0 33 9.5 63.5T296-360q11 16 9 34.5T288-296l-34 25q-18 14-40 11t-35-22q-29-43-44-93t-15-105Zm360 360v40q0 12-11 18t-21-2l-125-94q-16-12-16-32t16-32l125-94q10-8 21-2t11 18v40q91 0 155.5-64.5T700-480q0-33-9.5-63.5T664-600q-11-16-9-34.5t17-29.5l34-25q18-14 40-10.5t35 21.5q28 43 43.5 93T840-480q0 150-105 255T480-120Z"/></svg>`,
        update: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q82 0 155.5 35T760-706v-54q0-17 11.5-28.5T800-800q17 0 28.5 11.5T840-760v160q0 17-11.5 28.5T800-560H640q-17 0-28.5-11.5T600-600q0-17 11.5-28.5T640-640h70q-41-56-101-88t-129-32q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200q95 0 170-57t99-147q5-16 18-24t29-6q17 2 27 14.5t6 27.5q-29 119-126 195.5T480-120Zm40-376 100 100q11 11 11 28t-11 28q-11 11-28 11t-28-11L452-452q-6-6-9-13.5t-3-15.5v-159q0-17 11.5-28.5T480-680q17 0 28.5 11.5T520-640v144Z"/></svg>`,
        renew: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-478q0 16 2 31.5t7 30.5q5 17-1 32.5T227-361q-16 8-31.5 1.5T175-383q-8-23-11.5-47t-3.5-48q0-134 93-228t227-94h7l-36-36q-11-11-11-28t11-28q11-11 28-11t28 11l104 104q12 12 12 28t-12 28L507-628q-11 11-28 11t-28-11q-11-11-11-28t11-28l36-36h-7q-100 0-170 70.5T240-478Zm480-4q0-16-2-31.5t-7-30.5q-5-17 1-32.5t21-22.5q16-8 31.5-1.5T785-577q8 23 11.5 47t3.5 48q0 134-93 228t-227 94h-7l36 36q11 11 11 28t-11 28q-11 11-28 11t-28-11L349-172q-12-12-12-28t12-28l104-104q11-11 28-11t28 11q11 11 11 28t-11 28l-36 36h7q100 0 170-70.5T720-482Z"/></svg>`,
        history: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-120q-126 0-223-76.5T131-392q-4-15 6-27.5t27-14.5q16-2 29 6t18 24q24 90 99 147t170 57q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h70q17 0 28.5 11.5T360-600q0 17-11.5 28.5T320-560H160q-17 0-28.5-11.5T120-600v-160q0-17 11.5-28.5T160-800q17 0 28.5 11.5T200-760v54q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm40-376 100 100q11 11 11 28t-11 28q-11 11-28 11t-28-11L452-452q-6-6-9-13.5t-3-15.5v-159q0-17 11.5-28.5T480-680q17 0 28.5 11.5T520-640v144Z"/></svg>`,
        refresh: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-70q0-17 11.5-28.5T760-800q17 0 28.5 11.5T800-760v200q0 17-11.5 28.5T760-520H560q-17 0-28.5-11.5T520-560q0-17 11.5-28.5T560-600h128q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q68 0 124.5-34.5T692-367q8-14 22.5-19.5t29.5-.5q16 5 23 21t-1 30q-41 80-117 128t-169 48Z"/></svg>`,
        restartAlt: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M393-132q-103-29-168-113.5T160-440q0-57 19-108.5t54-94.5q11-12 27-12.5t29 12.5q11 11 11.5 27T290-586q-24 31-37 68t-13 78q0 81 47.5 144.5T410-209q13 4 21.5 15t8.5 24q0 20-14 31.5t-33 6.5Zm174 0q-19 5-33-7t-14-32q0-12 8.5-23t21.5-15q75-24 122.5-87T720-440q0-100-70-170t-170-70h-3l16 16q11 11 11 28t-11 28q-11 11-28 11t-28-11l-84-84q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l84-84q11-11 28-11t28 11q11 11 11 28t-11 28l-16 16h3q134 0 227 93t93 227q0 109-65 194T567-132Z"/></svg>`,
        cycle: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-479q0 85 42.5 158T318-204q14 9 19.5 24.5T335-150q-8 15-24.5 19.5T279-134q-93-54-146-146T80-479q0-26 3.5-51t9.5-50l-13 8q-14 9-30 4.5T26-586q-8-14-3.5-30.5T41-641l121-70q14-8 30.5-3.5T217-696l70 120q8 14 3.5 30.5T272-521q-14 8-30.5 3.5T217-536l-34-59q-11 28-17 57t-6 59Zm320-321q-41 0-81 10.5T323-759q-15 8-31.5 5.5T267-770q-9-16-4-32.5t21-25.5q45-26 94.5-39T480-880q79 0 151.5 29.5T761-765v-15q0-17 11.5-28.5T801-820q17 0 28.5 11.5T841-780v140q0 17-11.5 28.5T801-600H661q-17 0-28.5-11.5T621-640q0-17 11.5-28.5T661-680h69q-46-57-111-88.5T480-800Zm242 531q38-44 58-97t20-111q0-17 11.5-30t28.5-13q17 0 28.5 13t11.5 30q0 65-20.5 125.5T800-239q-39 52-92.5 89T591-95l10 6q14 8 18 24.5T615-34q-8 14-24 18t-30-4L439-90q-14-8-18.5-24.5T424-145l70-121q8-14 24-18t30 4q14 8 18.5 24.5T563-225l-37 63q57-8 107.5-35.5T722-269Z"/></svg>`,
        reply: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-17 11.5-28.5T160-480q17 0 28.5 11.5T200-440q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l34 34q12 12 11.5 28T508-630q-12 12-28.5 12.5T451-629L348-732q-12-12-12-28t12-28l103-103q12-12 28.5-11.5T508-890q11 12 11.5 28T508-834l-34 34h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z"/></svg>`,
        ruleSettings: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m230-240-16-14q-52-46-73-105t-21-119q0-94 47.5-170.5T296-766q14-8 30-1t21 23q5 15-.5 30T327-691q-58 32-92.5 88.5T200-478q0 45 17 87.5t53 78.5l10 10v-58q0-17 11.5-28.5T320-400q17 0 28.5 11.5T360-360v160q0 17-11.5 28.5T320-160H160q-17 0-28.5-11.5T120-200q0-17 11.5-28.5T160-240h70Zm450-418v58q0 17-11.5 28.5T640-560q-17 0-28.5-11.5T600-600v-160q0-17 11.5-28.5T640-800h160q17 0 28.5 11.5T840-760q0 17-11.5 28.5T800-720h-70l16 14q41 42 63 89t28 97h-81q-5-35-21.5-67T690-648l-10-10Zm16 618q-8 0-12.5-4.5T677-56l-9-44q-12-5-22.5-10.5T624-124l-43 13q-7 2-13-.5t-10-8.5l-24-40q-4-6-2-13t7-12l33-29q-2-14-2-26t2-26l-33-29q-5-5-7-12t2-13l24-40q4-6 10-8.5t13-.5l43 13q11-8 21.5-13.5T668-380l9-44q2-7 6.5-11.5T696-440h48q8 0 12.5 4.5T763-424l9 44q12 5 22.5 11t21.5 15l42-15q7-2 13.5.5T882-360l24 42q4 6 2.5 13t-6.5 12l-34 29q2 12 2 25t-2 25l33 29q5 5 7 12t-2 13l-24 40q-4 6-10 8.5t-13 .5l-43-13q-11 8-21.5 13.5T772-100l-9 44q-2 7-6.5 11.5T744-40h-48Zm24-120q33 0 56.5-23.5T800-240q0-33-23.5-56.5T720-320q-33 0-56.5 23.5T640-240q0 33 23.5 56.5T720-160Z"/></svg>`,
        resetSettings: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M550-390h100q13 0 21.5 8.5T680-360q0 13-8.5 21.5T650-330H550q-13 0-21.5-8.5T520-360q0-13 8.5-21.5T550-390Zm30 240v-20h-30q-13 0-21.5-8.5T520-200q0-13 8.5-21.5T550-230h30v-20q0-13 8.5-21.5T610-280q13 0 21.5 8.5T640-250v100q0 13-8.5 21.5T610-120q-13 0-21.5-8.5T580-150Zm130-80h100q13 0 21.5 8.5T840-200q0 13-8.5 21.5T810-170H710q-13 0-21.5-8.5T680-200q0-13 8.5-21.5T710-230Zm10-80v-100q0-13 8.5-21.5T750-440q13 0 21.5 8.5T780-410v20h30q13 0 21.5 8.5T840-360q0 13-8.5 21.5T810-330h-30v20q0 13-8.5 21.5T750-280q-13 0-21.5-8.5T720-310ZM480-760q-117 0-198.5 81.5T200-480q0 72 32.5 132t87.5 98v-70q0-17 11.5-28.5T360-360q17 0 28.5 11.5T400-320v160q0 17-11.5 28.5T360-120H200q-17 0-28.5-11.5T160-160q0-17 11.5-28.5T200-200h54q-62-50-98-122.5T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q113 0 203.5 63T814-615q6 16 0 31t-22 21q-16 6-31.5 0T739-585q-31-78-100.5-126.5T480-760Z"/></svg>`,
        dotMenu: `<svg fill="currentColor" width="24px" viewBox="0 -960 960 960" height="24px" xmlns="http://www.w3.org/2000/svg"><path d="M479.79-192Q450-192 429-213.21t-21-51Q408-294 429.21-315t51-21Q510-336 531-314.79t21 51Q552-234 530.79-213t-51 21Zm0-216Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm0-216Q450-624 429-645.21t-21-51Q408-726 429.21-747t51-21Q510-768 531-746.79t21 51Q552-666 530.79-645t-51 21Z"/></svg>`
    },
    svg: function(changeSvgObject={}) {
        let svgObject = {
            outer: {
                width: "20px",
                height: "20px",
                positionY: "center",
                positionX: "center",
                position: "relative",
                right: "",
                style: "flex-shrink: 0;",
                cursor: "default",
                top: "",
                padding: "",
                overflow: "hidden"
            },
            svg: {
                icon: "",
                fill: "currentColor",
                height: "20px",
                width: "20px"
            }
        };

        if(!changeSvgObject.svg.icon && !changeSvgObject.svg.svg) {
            return;
        }

        if(changeSvgObject.svg) {
            svgObject.svg = Object.assign(svgObject.svg, changeSvgObject.svg);
        }
        if(changeSvgObject.outer) {
            svgObject.outer = Object.assign(svgObject.outer, changeSvgObject.outer);
        }

        let svg = svgObject.svg.svg;
        if(!svg) {
            svg = encodeLib.svgLib[svgObject.svg.icon];
            if(svgObject.svg.icon == "check") {
                svg = svg.replaceAll(`stroke="currentColor"`, `stroke="${svgObject.svg.fill ? svgObject.svg.fill : 'currentColor'}"`);
            }
            else if(svgObject.svg.icon == "map") {
                svg = svg.replaceAll(`fill="currentColor"`, `fill="${svgObject.svg.fill ? svgObject.svg.fill : 'currentColor'}"`).replaceAll(`stroke:currentColor;"`, `stroke:${svgObject.svg.fill ? svgObject.svg.fill : 'currentColor'};`);
            }
            else {
                svg = svg.replaceAll(`fill="currentColor"`, `fill="${svgObject.svg.fill ? svgObject.svg.fill : 'currentColor'}"`);
            }
        }

        let svgStyle = `style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);width: ${svgObject.svg.width};height: ${svgObject.svg.height};"`;
        svg = svg.replace("<svg ", "<svg "+svgStyle+" ");

        svgObject.outer.content = svg;
        svgObject.outer.contentType = "content";
        return encodeLib.content(svgObject.outer);
    },    
    svgHoverIn: function(thisElement) {
        let fill = $(thisElement).attr("hoverFillIn") ? $(thisElement).attr("hoverFillIn") : "#1a73e8";
        $(thisElement).find("svg").css({"fill": fill});
    },
    svgHoverOut: function(thisElement) {
        let fill = $(thisElement).attr("hoverFillOut") ? $(thisElement).attr("hoverFillOut") : "#041e49b3";
        $(thisElement).find("svg").css({"fill": fill});
    },
    img: function(changeImgObject={}) {
        let imgObject = {
            outer: {
                width: "100px",
                height: "50px",
                positionY: "center",
                positionX: "center",
                position: "relative",
                right: "",
                cursor: "default",
                top: "",
                padding: "",
                overflow: "hidden"
            },
            img: {
                url: "",
                margin: "",
                height: "",
                width: ""
            }
        };

        if(!changeImgObject.img.url) {
            return;
        }

        if(changeImgObject.img) {
            imgObject.img = Object.assign(imgObject.img, changeImgObject.img);
        }
        if(changeImgObject.outer) {
            imgObject.outer = Object.assign(imgObject.outer, changeImgObject.outer);
        }

        let img = `<img src="${imgObject.img.url}" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);${imgObject.img.width ? 'width: '+imgObject.img.width+';' : ''}${imgObject.img.height ? 'height: '+imgObject.img.height+';' : ''}${imgObject.img.margin ? 'margin: '+imgObject.img.margin+';' : ''}">`;

        imgObject.outer.content = img;
        imgObject.outer.contentType = "content";
        return encodeLib.content(imgObject.outer);
    },
    iframe: function(changeIframeObject={}) {
        let iframeObject = {
            outer: {
                width: "100px",
                height: "50px",
                positionY: "center",
                positionX: "center",
                position: "relative",
                right: "",
                cursor: "default",
                top: "",
                padding: "",
                overflow: "hidden"
            },
            iframe: {
                url: "",
                margin: "",
                height: "",
                width: ""
            }
        };

        if(!changeIframeObject.iframe.url) {
            return;
        }

        if(changeIframeObject.iframe) {
            iframeObject.iframe = Object.assign(iframeObject.iframe, changeIframeObject.iframe);
        }
        if(changeIframeObject.outer) {
            iframeObject.outer = Object.assign(iframeObject.outer, changeIframeObject.outer);
        }

        let iframe = `<iframe src="${iframeObject.iframe.url}" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);${iframeObject.iframe.width ? 'width: '+iframeObject.iframe.width+';' : ''}${iframeObject.iframe.height ? 'height: '+iframeObject.iframe.height+';' : ''}${iframeObject.iframe.margin ? 'margin: '+iframeObject.iframe.margin+';' : ''}"></iframe>`;

        iframeObject.outer.content = iframe;
        iframeObject.outer.contentType = "content";
        return encodeLib.content(iframeObject.outer);
    },
    changeDateTimeFormat: function(dateTime) {
        dateTime = new Date(dateTime);
        if(dateTime.toDateString() == new Date().toDateString()) {
            return "Today";
        }
        if(dateTime.toDateString() == new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toDateString()) {
            return "Tomorrow";
        }
        let date = dateTime.toDateString().slice(4).split(' ');
        let time = dateTime.toLocaleTimeString();
        return Number(date[1])+' '+date[0]+' '+date[2].slice(2);
    },
    toIsoString: function(date) {
        date = new Date(date);
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
    removeEmptyValuesFromObject: function(obj) {
        for (var propName in obj) {
            if ((!obj[propName] || obj[propName].length === 0) && typeof(obj[propName]) !== "function" && typeof(obj[propName]) !== "boolean") {
                delete obj[propName];
            } else if (typeof obj[propName] === 'object') {
                encodeLib.removeEmptyValuesFromObject(obj[propName]);
            }
        }
        return obj;
    },
    addInputFocusClass: function(thisElement, eventElement) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        if(eventElement && thisElement.attr("exitedClass") && ($(thisElement.attr("exitedClass")).is(eventElement.target) || $(thisElement.attr("exitedClass")).has(eventElement.target).length)) {
            return;
        }
        let initialStyle = `box-shadow: 0 0 0 2px #1a73e8 inset, 0 0 0 1px rgba(4,30,73,0.3) inset !important;transition: box-shadow .15s;`;
        if(!$(".inputFocusClassStyle").length) {
            encodeLib.BODY.append(`<style class="inputFocusClassStyle"> .inputFocusClass {${initialStyle}} </style>`);
        }
        if(thisElement.attr("inputFocusClassStyle") && thisElement.attr("inputFocusClassStyleCode") == "true") {
            $(".inputFocusClassStyle").html(`${thisElement.attr("inputFocusClassStyle")}`);
        }
        else if(thisElement.attr("inputFocusClassStyle")) {
            $(".inputFocusClassStyle").html(`.inputFocusClass {${thisElement.attr("inputFocusClassStyle")}}`);
        }
        else {
            $(".inputFocusClassStyle").html(`.inputFocusClass {${initialStyle}}`);
        }
        $(".inputFocusClass").removeClass("inputFocusClass");
        thisElement.addClass("inputFocusClass");
    },
    removeInputFocusClass: function(thisElement) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        thisElement.removeClass("inputFocusClass");
    },
    toggleInputFocusClass: function(thisElement) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        if(thisElement.hasClass("inputFocusClass")) {
            encodeLib.removeInputFocusClass(thisElement);
        }
        else {
            encodeLib.addInputFocusClass(thisElement);
        }
    },
    selectOptionButtonOnlyOnClick: function(thisElement, eventElement) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        let svgElement = thisElement.find(".dropdownButtonSelectSvg");
        if (!svgElement.is(eventElement.target) && svgElement.has(eventElement.target).length === 0) 
        {
            encodeLib.selectOptionButtonOnClick(thisElement);
        }
        else {
            encodeLib.addInputFocusClass(thisElement.find(".dropdownButtonSelectSvg"));
            encodeLib.elementAction("slideUp 400", $(".selectButton").parent().find('.dropDown'));
            encodeLib.removeInputFocusClass(thisElement);
        }
    },
    selectOptionButtonOnClick: function(thisElement) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        encodeLib.elementAction("slideUp 400", $(".selectButton").not(thisElement).parent().find('.dropDown'));
        encodeLib.toggleInputFocusClass(thisElement);
        encodeLib.elementAction("slideToggle 400", thisElement.parent().find('.dropDown'));
    },
    buttonFocusOuterClickFunc: function(e) {
        let thisElement = $(".buttonViewElement");
        if(!thisElement.is(e.target) && thisElement.has(e.target).length === 0) 
        {
            encodeLib.removeInputFocusClass(thisElement);
        }
    },
    selectOptionOuterClickFunc: function(e) {
        let thisElement = $(".selectOptionOuter");
        if(!thisElement.is(e.target) && thisElement.has(e.target).length === 0) 
        {
            encodeLib.removeInputFocusClass(thisElement.find(".selectButton"));
            encodeLib.elementAction("slideUp 400", thisElement.find('.dropDown'));
        }
    },
    toggleEvent: function(thisElement, trueFunction, falseFunction, onName="on") {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        if(thisElement.attr(onName) == "true") {
            thisElement.attr(onName, "false");
            falseFunction(thisElement);
        }
        else {
            thisElement.attr(onName, "true");
            trueFunction(thisElement);
        }
    },
    addOptionHoverClass: function(thisElement) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        let initialStyle = `background-color: #f5f8ff !important;color: currentColor;`;
        if(!$(".optionHoverClassStyle").length) {
            encodeLib.BODY.append(`<style class="optionHoverClassStyle"> .optionHoverClass {${initialStyle}} </style>`);
        }
        if(thisElement.attr("optionHoverClassStyle")) {
            $(".optionHoverClassStyle").html(`.optionHoverClass {${thisElement.attr("optionHoverClassStyle")}}`);
        }
        else {
            $(".optionHoverClassStyle").html(`.optionHoverClass {${initialStyle}}`);
        }
        thisElement.addClass("optionHoverClass");
    },
    removeOptionHoverClass: function(thisElement) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        thisElement.removeClass("optionHoverClass");
    },
    toggleOptionHoverClass: function(thisElement) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        if(thisElement.hasClass("optionHoverClass")) {
            encodeLib.removeOptionHoverClass(thisElement);
        }
        else {
            encodeLib.addOptionHoverClass(thisElement);
        }
    },
    addSelectOptionClickClass: function(thisElement) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        let initialStyle = `background-color: #ecf3fe !important;color: #0b57d0 !important;`;
        if(!$(".selectOptionClickClassStyle").length) {
            encodeLib.BODY.append(`<style class="selectOptionClickClassStyle"> .selectOptionClickClass {${initialStyle}} .selectOptionClickClass.optionHoverClass {${initialStyle}} </style>`);
        }
        if(thisElement.attr("selectOptionClickClassStyle")) {
            $(".selectOptionClickClassStyle").html(`.selectOptionClickClass {${thisElement.attr("selectOptionClickClassStyle")}} .selectOptionClickClass.optionHoverClass {${thisElement.attr("selectOptionClickClassStyle")}}`);
        }
        else {
            $(".selectOptionClickClassStyle").html(`.selectOptionClickClass {${initialStyle}} .selectOptionClickClass.optionHoverClass {${initialStyle}}`);
        }
        thisElement.addClass("selectOptionClickClass");
    },
    removeSelectOptionClickClass: function(thisElement) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        thisElement.removeClass("selectOptionClickClass");
    },
    toggleSelectOptionClickClass: function(thisElement) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        if(thisElement.hasClass("selectOptionClickClass")) {
            encodeLib.removeSelectOptionClickClass(thisElement);
        }
        else {
            encodeLib.addSelectOptionClickClass(thisElement);
        }
    },
    selectOptionOnClick: function(thisElement) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }

        if(thisElement.attr("holdonclick") == "true") {
            return;
        }

        let thisElementParent = thisElement.parent().parent().parent().parent().parent().parent();
        let prevThisElement = thisElementParent.find(".selected");
        
        if(thisElement.attr("type") == "once")  {
            if(thisElementParent.find(`.selectOption option[value="${thisElement.attr('optionId')}"]`).length) {
                thisElementParent.find(`.selectOption option[value="${thisElement.attr('optionId')}"]`).attr("selected", true);
            }
            encodeLib.addSelectOptionClickClass(thisElement);
            thisElement.addClass("selected");
            if(thisElement.find(".dropdownOptionSelectSvg").length && thisElement.attr("showselected") == "true") {
                thisElement.find(".dropdownOptionSelectSvg").show();
            }
            setTimeout(function() {
                thisElement.removeClass("selected").removeClass("selectOptionClickClass");
                thisElement.removeAttr("selected");
                if(thisElement.find(".dropdownOptionSelectSvg").length) {
                    thisElement.find(".dropdownOptionSelectSvg").hide();
                }
            }, 300);
            if(thisElement.attr("showvalue") == "true") {
                thisElementParent.find(".textContent .content span").text(thisElement.attr('optionValue'));
            }
            if(encodeLib.selectOptionOnChange[thisElementParent.attr("id")+"__encode_ownonchange"] && thisElement.attr("ownonchange") == "true") {
                encodeLib.selectOptionOnChange[thisElementParent.attr("id")+"__encode_ownonchange"](thisElementParent, {id: thisElement.attr('optionId'), value: thisElement.attr('optionValue')}, thisElement, prevThisElement);
            }
            else if(encodeLib.selectOptionOnChange[thisElementParent.attr("id")]) {
                encodeLib.selectOptionOnChange[thisElementParent.attr("id")](thisElementParent, {id: thisElement.attr('optionId'), value: thisElement.attr('optionValue')}, thisElement, prevThisElement);
            }
        }
        else if(thisElement.attr("type") == "empty") {
            if(thisElement.hasClass("selected")) {
                thisElementParent.find(`.selectOption option`).removeAttr("selected");
                if(thisElementParent.find(`.selectOption option[value="${thisElement.attr('optionId')}"]`).length) {
                    thisElementParent.find(`.selectOption option[value="${thisElement.attr('optionId')}"]`).removeAttr("selected");
                }
                thisElementParent.find(".selectOptionClickClass").removeClass("selectOptionClickClass");
                thisElementParent.find(".selected").removeClass("selected");
                if(thisElementParent.find(".dropdownOptionSelectSvg").length) {
                    thisElementParent.find(".dropdownOptionSelectSvg").hide();
                }
                if(thisElement.attr("showvalue") == "true") {
                    thisElementParent.find(".textContent .content span").text(thisElementParent.attr('dropDwonName'));
                }
                if(encodeLib.selectOptionOnChange[thisElementParent.attr("id")+"__encode_ownonchange"] && thisElement.attr("ownonchange") == "true") {
                    encodeLib.selectOptionOnChange[thisElementParent.attr("id")+"__encode_ownonchange"](thisElementParent, {id: "", value: ""}, thisElement, prevThisElement);
                }
                else if(encodeLib.selectOptionOnChange[thisElementParent.attr("id")]) {
                    encodeLib.selectOptionOnChange[thisElementParent.attr("id")](thisElementParent, {id: "", value: ""}, thisElement, prevThisElement);
                }
            }
            else {
                thisElementParent.find(`.selectOption option`).removeAttr("selected");
                if(thisElementParent.find(`.selectOption option[value="${thisElement.attr('optionId')}"]`).length) {
                    thisElementParent.find(`.selectOption option[value="${thisElement.attr('optionId')}"]`).attr("selected", true);
                }
                thisElementParent.find(".selectOptionClickClass").removeClass("selectOptionClickClass");
                encodeLib.addSelectOptionClickClass(thisElement);
                thisElementParent.find(".selected").removeClass("selected");
                thisElement.addClass("selected");
                if(thisElementParent.find(".dropdownOptionSelectSvg").length) {
                    thisElementParent.find(".dropdownOptionSelectSvg").hide();
                }
                if(thisElement.find(".dropdownOptionSelectSvg").length && thisElement.attr("showselected") == "true") {
                    thisElement.find(".dropdownOptionSelectSvg").show();
                }
                if(thisElement.attr("showvalue") == "true") {
                    thisElementParent.find(".textContent .content span").text(thisElement.attr('optionValue'));
                }
                if(encodeLib.selectOptionOnChange[thisElementParent.attr("id")+"__encode_ownonchange"] && thisElement.attr("ownonchange") == "true") {
                    encodeLib.selectOptionOnChange[thisElementParent.attr("id")+"__encode_ownonchange"](thisElementParent, {id: thisElement.attr('optionId'), value: thisElement.attr('optionValue')}, thisElement, prevThisElement);
                }
                else if(encodeLib.selectOptionOnChange[thisElementParent.attr("id")]) {
                    encodeLib.selectOptionOnChange[thisElementParent.attr("id")](thisElementParent, {id: thisElement.attr('optionId'), value: thisElement.attr('optionValue')}, thisElement, prevThisElement);
                }
            }
        }
        else if(thisElement.attr("type") == "multiple") {
            if(thisElement.hasClass("selected")) {
                if(thisElementParent.find(`.selectOption option[value="${thisElement.attr('optionId')}"]`).length) {
                    thisElementParent.find(`.selectOption option[value="${thisElement.attr('optionId')}"]`).removeAttr("selected");
                }
                thisElement.removeClass("selectOptionClickClass");
                thisElement.removeClass("selected");
                if(thisElement.find(".dropdownOptionSelectSvg").length) {
                    thisElement.find(".dropdownOptionSelectSvg").hide();
                }
            }
            else {
                if(thisElementParent.find(`.selectOption option[value="${thisElement.attr('optionId')}"]`).length) {
                    thisElementParent.find(`.selectOption option[value="${thisElement.attr('optionId')}"]`).attr("selected", true);
                }
                encodeLib.addSelectOptionClickClass(thisElement);
                thisElement.addClass("selected");
                if(thisElement.find(".dropdownOptionSelectSvg").length && thisElement.attr("showselected") == "true") {
                    thisElement.find(".dropdownOptionSelectSvg").show();
                }
            }
            let selectedIds = [];
            let selectedValues = [];
            thisElementParent.find(".selected").each(function() {
                selectedIds.push($(this).attr("optionValue"));
                selectedValues.push($(this).attr("optionId"));
            });
            if(thisElement.attr("showvalue") == "true" && selectedValues.length) {
                thisElementParent.find(".textContent .content span").text(selectedIds.toString().replaceAll(",", ", "));
            }
            else if(thisElement.attr("showvalue") == "true") {
                thisElementParent.find(".textContent .content span").text(thisElementParent.attr('dropDwonName'));
            }
            if(encodeLib.selectOptionOnChange[thisElementParent.attr("id")+"__encode_ownonchange"] && thisElement.attr("ownonchange") == "true") {
                encodeLib.selectOptionOnChange[thisElementParent.attr("id")+"__encode_ownonchange"](thisElementParent, {id: selectedIds, value: selectedValues}, thisElement, prevThisElement);
            }
            else if(encodeLib.selectOptionOnChange[thisElementParent.attr("id")]) {
                encodeLib.selectOptionOnChange[thisElementParent.attr("id")](thisElementParent, {id: selectedIds, value: selectedValues}, thisElement, prevThisElement);
            }
        }
        else {
            thisElementParent.find(`.selectOption option`).removeAttr("selected");
            if(thisElementParent.find(`.selectOption option[value="${thisElement.attr('optionId')}"]`).length) {
                thisElementParent.find(`.selectOption option[value="${thisElement.attr('optionId')}"]`).attr("selected", true);
            }
            thisElementParent.find(".selectOptionClickClass").removeClass("selectOptionClickClass");
            encodeLib.addSelectOptionClickClass(thisElement);
            thisElementParent.find(".selected").removeClass("selected");
            thisElement.addClass("selected");
            if(thisElementParent.find(".dropdownOptionSelectSvg").length) {
                thisElementParent.find(".dropdownOptionSelectSvg").hide();
            }
            if(thisElement.find(".dropdownOptionSelectSvg").length && thisElement.attr("showselected") == "true") {
                thisElement.find(".dropdownOptionSelectSvg").show();
            }
            if(thisElement.attr("showvalue") == "true") {
                thisElementParent.find(".textContent .content span").text(thisElement.attr('optionValue'));
            }
            if(encodeLib.selectOptionOnChange[thisElementParent.attr("id")+"__encode_ownonchange"] && thisElement.attr("ownonchange") == "true") {
                encodeLib.selectOptionOnChange[thisElementParent.attr("id")+"__encode_ownonchange"](thisElementParent, {id: thisElement.attr('optionId'), value: thisElement.attr('optionValue')}, thisElement, prevThisElement);
            }
            else if(encodeLib.selectOptionOnChange[thisElementParent.attr("id")]) {
                encodeLib.selectOptionOnChange[thisElementParent.attr("id")](thisElementParent, {id: thisElement.attr('optionId'), value: thisElement.attr('optionValue')}, thisElement, prevThisElement);
            }
        }

        setTimeout(function() {
            encodeLib.removeInputFocusClass(thisElementParent.find(".selectButton"));
            encodeLib.elementAction("slideUp 400", thisElementParent.find('.dropDown'));
        }, 300);
        
    },
    inputEmptyCheck: function(thisElement) {
        if(thisElement === document.activeElement) {
            return true;
        }
        let inputValue = $(thisElement).val().trim();
        if(!inputValue) {
            return $(thisElement).attr("errText") ? $(thisElement).attr("errText") : "* This input cannot be empty";
        }
        else {
            return false;
        }
    },    
    inputToMobileNumberCheck: function(thisElement) {
        if(thisElement === document.activeElement) {
            return true;
        }
        let num = $(thisElement).val().trim();
        if(!num) {
            return $(thisElement).attr("errText") ? $(thisElement).attr("errText") : "* Phone number cannot be empty";
        }
        else {
            if(num.length >= 6 && num.length <= 50) {
                return false;
            }
            else {
                return "Invalid Number";
            }
        }
    },
    selectOptionOnChange: {},
    strToCharFillter: function(str) {
        return str.replace(/[^a-zA-Z]+/g, '');
    },
    strToNumFillter: function(str, returnType="string") {
        if(returnType.includes("num")) {
            return Number(str.replace(/\D/g,''));
        }
        return str.replace(/\D/g,'');
    },
    strToFloatArrFillter: function(str) {
        return encodeLib.strToNumFillter(str) ? str.match(/[+-]?\d+(\.\d+)?/g).map(function(v) { return parseFloat(v); }) : [""];
    },
    sortingKeysToObject: function(obj, order="asc") {
        if(obj && typeof obj == "object" && Object.keys(obj).length) {
            if(order == "des") {
                return Object.entries(obj).sort().reverse().reduce( (o,[k,v]) => (o[k]=v,o), {} );
            }
            else {
                return Object.entries(obj).sort().reduce( (o,[k,v]) => (o[k]=v,o), {} );
            }
        }
        else {
            return obj;
        }
    },
    searchValueToKeyInObject: function(obj, value, subKey="") {
        let matchKey = "";
        if(subKey) {
            matchKey = Object.keys(obj).find(key => obj[key][subKey] === value);
        }
        else {
            matchKey = Object.keys(obj).find(key => obj[key] === value);
        }
        return matchKey ? matchKey : "";
    },
    arrOfObjectToObjectWithSelectiveKey: function(arr, field) {
        let output = {};
        for (var i=0; i < arr.length ; ++i) {
            output[arr[i][field]] = arr[i];
        }
        return output;
    },
    getPutVariablesToVariableString: function(string, variableStart="", variableEnd="", variables={}) {
        if(!string && !Object.keys(variables).length) {
            return {};
        }
        else if(!string) {
            return "";
        }
        var regex = variableStart.replaceAll("", "\\").slice(0, -1)+"(\\w+)"+variableEnd.replaceAll("", "\\").slice(0, -1);
        if(!Object.keys(variables).length) {
            string.replace(new RegExp(regex, 'g'), (_, name, pos) => variables[name+"__en"+pos]="");
            return variables;
        }
        else {
            let originalVariables = {};
            string.replace(new RegExp(regex, 'g'), (_, name, pos) => originalVariables[name]=variables[name+"__en"+pos]);
            return { variables: originalVariables, content: string.replace(new RegExp(regex, 'g'), (_, name, pos) => variables[name+"__en"+pos] || variableStart+name+variableEnd)};
        }
    },
    onFunction: async function(thisElement, eventElement, onFunction, errorInfoElement, errorInfoAction, errorColor, infoColor) {
        let isValid  = "";
        let enabledFocus = false;
        let dotLoader = $(thisElement).parent().find(".dotLoader");
        if(!dotLoader.length) {
            dotLoader = $(thisElement).parent().parent().parent().find(".dotLoader");
        }
        if(thisElement && dotLoader.length) {
            enabledFocus = true;
            if(thisElement === document.activeElement) {
                dotLoader.fadeOut(200);
                dotLoader.parent().parent().fadeOut(200);
            }
            else {
                dotLoader.parent().parent().fadeIn();
                dotLoader.fadeIn();        
            }
        }
        if(typeof(onFunction) == 'function' && thisElement && eventElement) {
            isValid = await onFunction(thisElement, eventElement);
        }
        else if(typeof(onFunction) == 'function' && thisElement) {
            isValid = await onFunction(thisElement);
        }
        else if(typeof(onFunction) == 'function' && eventElement) {
            isValid = await onFunction(eventElement);
        }
        else if(typeof(onFunction) == 'function') {
            isValid = await onFunction();
        }
        if(isValid) {
            errorInfoElement = isValid.errorInfoElement ? isValid.errorInfoElement : errorInfoElement;
            if(errorInfoElement && $(errorInfoElement).length) {
                errorInfoElementContent = $(errorInfoElement).find(".content");
                if(typeof(isValid) == "string") {
                    if(enabledFocus) {
                        dotLoader.fadeOut();
                    }
                    errorInfoElementContent.html(isValid).attr("title", isValid);
                }
                else if(typeof(isValid) == "object") {
                    if(isValid.content) {
                        if(enabledFocus) {
                            dotLoader.fadeOut();
                        }
                        errorInfoElementContent.html(isValid.content).attr("title", isValid.content);
                    }
                }
                else {
                    if(enabledFocus) {
                        dotLoader.fadeOut();
                    }
                }
                let errorInfoColor = isValid.errorInfoColor ? isValid.errorInfoColor : isValid == true ? infoColor : errorColor;
                if(errorInfoColor) {
                    $(errorInfoElement).css({"color": errorInfoColor});
                }
                errorInfoAction = isValid.errorInfoAction ? isValid.errorInfoAction : errorInfoAction;
                if(errorInfoAction) {
                    encodeLib.elementAction(errorInfoAction, errorInfoElement);
                }
            }
        }
        else {
            if(enabledFocus && dotLoader && dotLoader.length) {
                dotLoader.fadeOut();
            }
        }
    },
    elementAction: function(action, thisElement) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        if(action && encodeLib.strToCharFillter(action) == "show") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.show(sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "hide") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.hide(sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "showBack") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.show(sec[0]);
            setTimeout(function() {thisElement.hide(sec[0]);}, sec[1]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "hideBack") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.hide(sec[0]);
            setTimeout(function() {thisElement.show(sec[0]);}, sec[1]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "toggle") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.toggle(sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "fadeIn") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.fadeIn(sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "fadeOut") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.fadeOut(sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "fadeInBack") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.fadeIn(sec[0]);
            setTimeout(function() {thisElement.fadeOut(sec[0]);}, sec[1]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "fadeOutBack") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.fadeOut(sec[0]);
            setTimeout(function() {thisElement.fadeIn(sec[0]);}, sec[1]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "fadeToggle") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.fadeToggle(sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "fadeTo") {
            let sec = encodeLib.strToFloatArrFillter(action);
            if(sec[1]) {
                thisElement.fadeTo(sec[0], sec[1]);
            }
            else {
                thisElement.fadeTo(sec[0], 0);
            }
        }
        else if(action && encodeLib.strToCharFillter(action) == "slideDown") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.slideDown(sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "slideUp") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.slideUp(sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "slideDownBack") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.slideDown(sec[0]);
            setTimeout(function() {thisElement.slideUp(sec[0]);}, sec[1]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "slideUpBack") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.slideUp(sec[0]);
            setTimeout(function() {thisElement.slideDown(sec[0]);}, sec[1]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "slideToggle") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.slideToggle(sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "showSlideUp") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.show("slide", { direction: "up" }, sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "showSlideDown") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.show("slide", { direction: "down" }, sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "showSlideLeft") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.show("slide", { direction: "left" }, sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "showSlideRight") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.show("slide", { direction: "right" }, sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "showSlideUpBack") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.show("slide", { direction: "up" }, sec[0]);
            setTimeout(function() {thisElement.hide("slide", { direction: "up" }, sec[0]);}, sec[1]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "showSlideDownBack") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.show("slide", { direction: "down" }, sec[0]);
            setTimeout(function() {thisElement.hide("slide", { direction: "down" }, sec[0]);}, sec[1]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "showSlideLeftBack") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.show("slide", { direction: "left" }, sec[0]);
            setTimeout(function() {thisElement.hide("slide", { direction: "left" }, sec[0]);}, sec[1]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "showSlideRightBack") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.show("slide", { direction: "right" }, sec[0]);
            setTimeout(function() {thisElement.hide("slide", { direction: "right" }, sec[0]);}, sec[1]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "hideSlideUp") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.hide("slide", { direction: "up" }, sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "hideSlideDown") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.hide("slide", { direction: "down" }, sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "hideSlideLeft") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.hide("slide", { direction: "left" }, sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "hideSlideRight") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.hide("slide", { direction: "right" }, sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "hideSlideUpBack") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.hide("slide", { direction: "up" }, sec[0]);
            setTimeout(function() {thisElement.show("slide", { direction: "up" }, sec[0]);}, sec[1]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "hideSlideDownBack") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.hide("slide", { direction: "down" }, sec[0]);
            setTimeout(function() {thisElement.show("slide", { direction: "down" }, sec[0]);}, sec[1]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "hideSlideLeftBack") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.hide("slide", { direction: "left" }, sec[0]);
            setTimeout(function() {thisElement.show("slide", { direction: "left" }, sec[0]);}, sec[1]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "hideSlideRightBack") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.hide("slide", { direction: "right" }, sec[0]);
            setTimeout(function() {thisElement.show("slide", { direction: "right" }, sec[0]);}, sec[1]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "toggleSlideUp") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.toggle("slide", { direction: "up" }, sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "toggleSlideDown") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.toggle("slide", { direction: "down" }, sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "toggleSlideLeft") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.toggle("slide", { direction: "left" }, sec[0]);
        }
        else if(action && encodeLib.strToCharFillter(action) == "toggleSlideRight") {
            let sec = encodeLib.strToFloatArrFillter(action);
            thisElement.toggle("slide", { direction: "right" }, sec[0]);
        }        
    },
    loader: function(changeOuterObject={}) {
        if(!$('.loaderStyle').length) {
            let styleElement = `<style class="loaderStyle">/* message loading style */ .enLoadingInner { margin: 0 auto; background-color: #fff; border-radius: 50%; box-shadow: 0 1px 1px 0 rgba(0,0,0,.06),0 2px 5px 0 rgba(0,0,0,.2); display: flex; align-items: center; justify-content: center; width: 35px; height: 35px; } .enLoadingOuter { display: flex; flex: none; justify-content: center; padding: 15px 0px; box-sizing: border-box; } .enLoadingSvgCircle { stroke: #ccc; stroke-dasharray: 1,150; stroke-dashoffset: 0; stroke-linecap: round; animation: enLoadingSvgCircle 1.5s ease-in-out infinite; } .enLoadingSVG { animation: enLoadingSVG 2s linear infinite; } @keyframes enLoadingSVG{ to{transform:rotate(1turn)} } @keyframes enLoadingSvgCircle{ 0%{stroke-dasharray:1,150;stroke-dashoffset:0} 50%{stroke-dasharray:90,150;stroke-dashoffset:-35} to{stroke-dasharray:90,150;stroke-dashoffset:-124} } /* message loading style */</style>`;
            encodeLib.insert(encodeLib.BODY, styleElement, {addOn: "append"});
        }

        let loaderSVG = `<svg class="enLoadingSVG" width="17" height="17" viewBox="0 0 46 46" role="status"><circle class="enLoadingSvgCircle" cx="23" cy="23" r="20" fill="none" stroke-width="6" style="stroke: rgb(57 82 234);"></circle></svg>`;
        if(changeOuterObject && changeOuterObject.svg) {
            loaderSVG = changeOuterObject.svg.replaceAll("<svg ", `<svg class="enLoadingSVG" `);
        }
        let loader = `<div class="enLoadingInner" title="loading…">${loaderSVG}</div>`;

        let outerObject = {
            content: loader,
            contentType: "content",
            class: "",
            height: "100%",
            contentFitX: "100%",
            contentFitY: "100%",
            positionY: "center",
            positionX: "center",
            position: "relative",
            cursor: "default"
        };

        outerObject = Object.assign(outerObject, changeOuterObject);
        return encodeLib.content(outerObject);
    },
    smallLoader: function(changeOuterObject={}) {
        if(!$('.loaderStyle').length) {
            let styleElement = `<style class="loaderStyle">/* message loading style */ .enLoadingInner { margin: 0 auto; background-color: #fff; border-radius: 50%; box-shadow: 0 1px 1px 0 rgba(0,0,0,.06),0 2px 5px 0 rgba(0,0,0,.2); display: flex; align-items: center; justify-content: center; width: 35px; height: 35px; color: rgba(0,0,0,0.25); } .enLoadingOuter { display: flex; flex: none; justify-content: center; padding: 15px 0px; box-sizing: border-box; } .enLoadingSvgCircle { stroke: #ccc; stroke-dasharray: 1,150; stroke-dashoffset: 0; stroke-linecap: round; animation: enLoadingSvgCircle 1.5s ease-in-out infinite; } .enLoadingSVG { animation: enLoadingSVG 2s linear infinite; } @keyframes enLoadingSVG{ to{transform:rotate(1turn)} } @keyframes enLoadingSvgCircle{ 0%{stroke-dasharray:1,150;stroke-dashoffset:0} 50%{stroke-dasharray:90,150;stroke-dashoffset:-35} to{stroke-dasharray:90,150;stroke-dashoffset:-124} } /* message loading style */</style>`;
            encodeLib.insert(encodeLib.BODY, styleElement, {addOn: "append"});
        }

        let smallLoader = `<div class="enLoadingInner" style="width: 25px; height: 25px;" title="loading…"><svg class="enLoadingSVG" width="12" height="12" viewBox="0 0 46 46" role="status"><circle class="enLoadingSvgCircle" cx="23" cy="23" r="20" fill="none" stroke-width="6" style="stroke: rgb(57 82 234);"></circle></svg></div>`;

        let outerObject = {
            content: smallLoader,
            contentType: "content",
            class: "",
            height: "100%",
            contentFitX: "100%",
            contentFitY: "100%",
            positionY: "center",
            positionX: "center",
            position: "relative",
            cursor: "default"
        };

        outerObject = Object.assign(outerObject, changeOuterObject);
        return encodeLib.content(outerObject);
    },
    dotCircleLoader: function(changeOuterObject={}) {

        if(!$('.floatingCirclesGStyle').length) {
            let styleElement = `<style class="floatingCirclesGStyle">/*dot circle loader style */ .floatingCirclesG{ position:relative; width:26px; height:26px; margin:auto; transform:scale(0.6); -o-transform:scale(0.6); -ms-transform:scale(0.6); -webkit-transform:scale(0.6); -moz-transform:scale(0.6); } .f_circleG{ position:absolute; background-color: rgb(255 255 255 / 0%); height:5px; width:5px; border-radius:2px; -o-border-radius:2px; -ms-border-radius:2px; -webkit-border-radius:2px; -moz-border-radius:2px; animation-name:f_fadeG; -o-animation-name:f_fadeG; -ms-animation-name:f_fadeG; -webkit-animation-name:f_fadeG; -moz-animation-name:f_fadeG; animation-duration:1.35s; -o-animation-duration:1.35s; -ms-animation-duration:1.35s; -webkit-animation-duration:1.35s; -moz-animation-duration:1.35s; animation-iteration-count:infinite; -o-animation-iteration-count:infinite; -ms-animation-iteration-count:infinite; -webkit-animation-iteration-count:infinite; -moz-animation-iteration-count:infinite; animation-direction:normal; -o-animation-direction:normal; -ms-animation-direction:normal; -webkit-animation-direction:normal; -moz-animation-direction:normal; } .frotateG_01{ left:0; top:10px; animation-delay:0.51s; -o-animation-delay:0.51s; -ms-animation-delay:0.51s; -webkit-animation-delay:0.51s; -moz-animation-delay:0.51s; } .frotateG_02{ left:3px; top:3px; animation-delay:0.68s; -o-animation-delay:0.68s; -ms-animation-delay:0.68s; -webkit-animation-delay:0.68s; -moz-animation-delay:0.68s; } .frotateG_03{ left:10px; top:0; animation-delay:0.85s; -o-animation-delay:0.85s; -ms-animation-delay:0.85s; -webkit-animation-delay:0.85s; -moz-animation-delay:0.85s; } .frotateG_04{ right:3px; top:3px; animation-delay:1.01s; -o-animation-delay:1.01s; -ms-animation-delay:1.01s; -webkit-animation-delay:1.01s; -moz-animation-delay:1.01s; } .frotateG_05{ right:0; top:10px; animation-delay:1.18s; -o-animation-delay:1.18s; -ms-animation-delay:1.18s; -webkit-animation-delay:1.18s; -moz-animation-delay:1.18s; } .frotateG_06{ right:3px; bottom:3px; animation-delay:1.35s; -o-animation-delay:1.35s; -ms-animation-delay:1.35s; -webkit-animation-delay:1.35s; -moz-animation-delay:1.35s; } .frotateG_07{ left:10px; bottom:0; animation-delay:1.52s; -o-animation-delay:1.52s; -ms-animation-delay:1.52s; -webkit-animation-delay:1.52s; -moz-animation-delay:1.52s; } .frotateG_08{ left:3px; bottom:3px; animation-delay:1.69s; -o-animation-delay:1.69s; -ms-animation-delay:1.69s; -webkit-animation-delay:1.69s; -moz-animation-delay:1.69s; } @keyframes f_fadeG{ 0%{ background-color:rgb(49 61 176); } 100%{ background-color:rgba(255,255,255,0); } } @-o-keyframes f_fadeG{ 0%{ background-color:rgb(49 61 176); } 100%{ background-color:rgba(255,255,255,0); } } @-ms-keyframes f_fadeG{ 0%{ background-color:rgb(49 61 176); } 100%{ background-color:rgba(255,255,255,0); } } @-webkit-keyframes f_fadeG{ 0%{ background-color:rgb(49 61 176); } 100%{ background-color:rgba(255,255,255,0); } } @-moz-keyframes f_fadeG{ 0%{ background-color:rgb(49 61 176); } 100%{ background-color:rgba(255,255,255,0); } } @keyframes s_fadeG{ 0%{ background-color:rgb(207 209 224); } 100%{ background-color:rgba(255,255,255,0); } } @-o-keyframes s_fadeG{ 0%{ background-color: #cfd1e0; } 100%{ background-color:rgba(255,255,255,0); } } @-ms-keyframes s_fadeG{ 0%{ background-color: #cfd1e0; } 100%{ background-color:rgba(255,255,255,0); } } @-webkit-keyframes s_fadeG{ 0%{ background-color: #cfd1e0; } 100%{ background-color:rgba(255,255,255,0); } } @-moz-keyframes s_fadeG{ 0%{ background-color: #cfd1e0; } 100%{ background-color:rgba(255,255,255,0); } } /*dot circle loader style */</style>`;
            encodeLib.insert(encodeLib.BODY, styleElement, {addOn: "append"});
        }

        let loader = `<div class="floatingCirclesG">
                        <div class="f_circleG frotateG_01"></div>
                        <div class="f_circleG frotateG_02"></div>
                        <div class="f_circleG frotateG_03"></div>
                        <div class="f_circleG frotateG_04"></div>
                        <div class="f_circleG frotateG_05"></div>
                        <div class="f_circleG frotateG_06"></div>
                        <div class="f_circleG frotateG_07"></div>
                        <div class="f_circleG frotateG_08"></div>
                    </div>`;

        let outerObject = {
            content: loader,
            contentType: "content",
            class: "",
            height: "100%",
            contentFitX: "100%",
            contentFitY: "100%",
            positionY: "center",
            positionX: "center",
            position: "relative",
            cursor: "default"
        };

        outerObject = Object.assign(outerObject, changeOuterObject);
        return encodeLib.content(outerObject);
    },
    loaderClickToInputFocus: function(thisElement) {
        let focusElement = $(thisElement).parent().find("input").attr("id") ? $(thisElement).parent().find("input").attr("id") : $(thisElement).parent().find("textarea").attr("id") ? $(thisElement).parent().find("textarea").attr("id") : "";
        thisInputElement = document.getElementById(focusElement);
        if(!thisInputElement) {
            return;
        }
        thisInputElement.focus();
        if(thisInputElement.type != "number") {
            thisInputElement.setSelectionRange(thisInputElement.value.length, thisInputElement.value.length);
        }
    },
    cursorPositionToAddText: function (thisElement, insertText) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        let thisElementValue = thisElement.val();
        let focusNodeCheck = encodeLib.windowSelection ? encodeLib.windowSelection.focusNode ? encodeLib.windowSelection.focusNode.isSameNode(thisElement.parent()[0]) : false : false;
        if(thisElement[0].tagName != "TEXTAREA" && thisElement[0].tagName != "INPUT") {
            focusNodeCheck = encodeLib.windowSelection.focusNode.isSameNode(thisElement[0]);
            thisElementValue = thisElement.text();
        }
        if(!encodeLib.windowSelection || !encodeLib.windowSelection.rangeCount || !encodeLib.windowSelection.focusNode.hasChildNodes() || !focusNodeCheck) {
            thisElement.selectionStart = thisElement.val().length;
            thisElement.selectionEnd = thisElement.val().length;
        }
        /* thisElement.blur(); */
        let curPosStart = thisElement[0].selectionStart;
        let curPosEnd = thisElement[0].selectionEnd;
        if(thisElement[0].tagName == "TEXTAREA" || thisElement[0].tagName == "INPUT") {
            thisElement.val(thisElementValue.slice(0, curPosStart) + insertText + thisElementValue.slice(curPosEnd));
        }
        else {
            thisElement.text(thisElementValue.slice(0, curPosStart) + insertText + thisElementValue.slice(curPosEnd));
        }
        setTimeout(function() {
            thisElement.focus();
            thisElement[0].setSelectionRange(insertText.length+curPosEnd, insertText.length+curPosEnd);
        }, 100);
    },
    saveToInPutValueCheck: async function(isValid, thisElement, errorInfoElement) {
        if(isValid != false) {
            await setTimeout(async () => {
                thisElement.focus();
                errorInfoElement.find(".content").text(isValid != false ? isValid : "");
                errorInfoElement.hide();
                await setTimeout(function() {encodeLib.elementAction("slideUp, 300", $(".enInputError")); setTimeout(function() {encodeLib.elementAction("slideDown, 300", errorInfoElement)}, 10);}, 100);
            }, 10);
            return false;
        }
        else {
            await encodeLib.elementAction("slideUp, 300", errorInfoElement);
            return true;
        }
    },
    textCopyInCommand: function(thisElement) {
        if(!thisElement) {
            return;
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        let copyFrom = $('<textarea/>');
        copyFrom.text($(`${$(thisElement).attr("copyContent")}`).text());
        $('body').append(copyFrom);
        copyFrom.select();
        document.execCommand('copy');
        copyFrom.remove();
    },
    autoAlignDivPosition: function(element, elementWidth, elementGap={x: 0, y: 0}, maxWidthSet=null) {
        if(!element) {
            return;
        }
        if(element && typeof(element) == "string" || element.length == undefined) {
            element = $(element);
        }
        element.parent().css({"max-width": "unset"});
        if(element.parent().css("position") != "relative" && element.parent().css("position") != "absolute") {
            element.parent().css({"position": "relative"});
        }
        element.css({"position": "absolute"});
        elementWidth = Number(elementWidth);
        elementGapX = Number(elementGap.x);
        elementGapY = Number(elementGap.y);
        let split = Math.floor(element.parent().width()/(elementWidth+elementGapX));
        let boxs = Array(split).fill(0);
        let maxX = 0;
        element.each(function(elementCount) {
            let boxY = Object.entries(boxs).sort((val1, val2) => { return val1[1] - val2[1]; }).shift();		
            if(Number(boxY[0]) <= split) {
                maxX = maxX <= (elementWidth*Number(boxY[0]))+(elementGapX*Number(boxY[0])) ? (elementWidth*Number(boxY[0]))+(elementGapX*Number(boxY[0]))+elementWidth : maxX;
                boxs[boxY[0]] = boxs[boxY[0]]+$(this).height()+elementGapY;
                $(this).css({"left": (elementWidth*Number(boxY[0]))+(elementGapX*Number(boxY[0]))+"px", "top": boxY[1]+"px"});
            }
            if(elementCount == element.length-1) {
                if(maxWidthSet) {
                    element.parent().css({"max-width": maxWidthSet});
                }
                else {
                    element.parent().css({"max-width": maxX+"px"});
                }
                element.parent().css({"height": (boxs[boxY[0]]-elementGapY)+"px", "min-height": (boxs[boxY[0]]-elementGapY)+"px"});
            }
        });
    },
    outerClickFunctions: [],
    outerClickFunction: function(e) {
        encodeLib.outerClickFunctions.forEach(function(func) {
            func(e);
        });
    },
    popup: function(changePopupObject={}) {

        let popupObject = {
            htmlText: "",
            title: "",
            successFunction: "encodeLib.popupClose",            
            successAttributes: "",
            successButtonText: "Okay",
            isAlart: true,
            noButton: false,
            outerClick: false,
            earseAll: false,
            enterToClick: true,
            backgroundColor: "#ffffffa3",
            buttonsDivHeight: "",
            buttonsDivPadding: "",
            buttonsPosition: "end"
        };

        if(changePopupObject) {
            popupObject = Object.assign(popupObject, changePopupObject);
        }

        if(!encodeLib.outerClickFunctions.includes(encodeLib.popupOuterClickFunc)) {
            encodeLib.outerClickFunctions.push(encodeLib.popupOuterClickFunc);
            $(document).keypress(function(e) {
                if($(".popup").last().hasClass('enterToClickPopup') && $(".popup").last().is(':visible') && $(".popup").last().find(".popupSuccess").is(':visible')) {
                    if(e.which == 13) {
                        $(".popup").last().find(".popupSuccess").click();
                    }
                }
            });
        }

        if(popupObject.earseAll) {
            $('.popup').remove();
        }

        let popupInnerBody = encodeLib.content({class:"popupInnerBody", content: popupObject.htmlText, direction: "row", color: "#0000008c", contentFitX: "100%", contentFitY: "100%", positionX: "start", positionY: "center"});

        let buttonsDiv = "";
        if(!popupObject.noButton) {
            let closeButton = "";
            if(!popupObject.isAlart) {
                let closeButtonObject = {
                    content: "Close",
                    hoverInBackgroundColor: "rgba(0,0,0,0.06)",
                    hoverOutBackgroundColor: "transparent",
                    color: "#0000008c",
                    fontFamily: "'Roboto', sans-serif",
                    backgroundColor: "transparent",
                    onclick: {
                        thisElement: true,
                        functionName: "encodeLib.popupClose"
                    }
                }; 
        
                closeButton = encodeLib.button(closeButtonObject);
            }

            let saveButtonObject = {
                class: "popupSuccess",
                content: popupObject.successButtonText ? popupObject.successButtonText : "Okay",
                margin: "0 0 0 8px",
                fontFamily: "'Roboto', sans-serif",
                attributes: popupObject.successAttributes,
                onclick: {
                    thisElement: true,
                    functionName: "encodeLib.popupClose"
                }
            };
            if(popupObject.successFunction) {
                saveButtonObject.onclick.functionName = popupObject.successFunction;
            }
            let saveButton = encodeLib.button(saveButtonObject);

            buttonsDiv = encodeLib.content({class: "popupButtonOuter", content: closeButton+saveButton, direction: "row", contentFitX: "100%", positionX: popupObject.buttonsPosition, padding: popupObject.buttonsDivPadding, height: popupObject.buttonsDivHeight});
        }

        let popupBody = encodeLib.content({class:"popupBody", content: popupInnerBody + buttonsDiv, contentFitX: "100%", borderRadius: "8px", padding: "20px 20px", backgroundColor: "white", boxShadow: "0px 1px 15px 3px rgb(60 64 67 / 30%), 0px 2px 6px 2px rgb(60 64 67 / 15%)", width: "max-content", maxWidth: "500px", contentFitY: "100%", positionX: "center", positionY: "center"});

        let popup = encodeLib.content({class:`popup showingPopup ${popupObject.outerClick ? "outerClickPopup" : ""} ${popupObject.enterToClick ? "enterToClickPopup" : ""}`, content: popupBody, padding: "30px", backgroundColor: popupObject.backgroundColor ? popupObject.backgroundColor : "white", contentFitX: "100%", position: "fixed", top: "0", left: "0", height: "100%", contentFitY: "100%", positionX: "center", positionY: "center", zIndex: "5000"});
        encodeLib.insert(encodeLib.BODY, popup, {addOn: "append"});
        encodeLib.popupButtons = $(".popupButtonOuter");
        $(".showingPopup").hide();
        $(".showingPopup .popupBody").hide();

        if(popupObject.title) {
            let addPopupInput  = {
                content: {
                    content: popupInnerBody
                },
                label: {
                    content: popupObject.title,
                    padding: "0 0 10px 1px",
                    color: "#000000de",
                    height: "max-content"
                }
            };    
            encodeLib.insert(".popupInnerBody", encodeLib.labelContent(addPopupInput));
        }

        encodeLib.elementAction("fadeIn, 200", ".showingPopup");
        encodeLib.elementAction("show, 200", ".showingPopup .popupBody");
        $(".showingPopup").removeClass("showingPopup");

    },
    popupClose: function(thisElement) {
        if(!thisElement) {
            thisElement = $(".popup").last();
        }
        if(thisElement && typeof(thisElement) == "string" || thisElement.length == undefined) {
            thisElement = $(thisElement);
        }
        thisElement = thisElement.hasClass("popup") ? thisElement : thisElement.parent().parent().parent().parent().parent().parent(".popup");
        encodeLib.elementAction("fadeOut, 200", thisElement);
        encodeLib.elementAction("hide, 100", thisElement.find(".popupBody"));
        setTimeout(function() {thisElement.remove();}, 500);
    },
    popupOuterClickFunc: function(e) {
        let thisElement = $(".outerClickPopup");
        if(thisElement.is(e.target)) 
        {
            encodeLib.popupClose($(e.target));
        }
        if(thisElement.children().is(e.target)) 
        {
            encodeLib.popupClose($(e.target).parent());
        }
    },
    settingsPage: async function(settingsObj={}) {
        /* settingsObj = {
            accountName: "",
            accountId: "",
            hideSettingsPage: false,
            hideHelp: false,
            appLogo: "",
            videoLink: "",
            docLink: "",
            editLink: ""
        }; */
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
                    runCode: `$(this).find('svg').css('width', '30px');$(this).find('svg').css('height', '30px');$(this).find('svg').css('fill', '#ff040440');`
                },
                onmousedown: {
                    thisElement: true,
                    runCode: `$(this).find('svg').css('width', '30px');$(this).find('svg').css('height', '30px');`,
                    functionName: "encodeLib.svgHoverIn"
                },
                onmouseup: {
                    thisElement: true,
                    runCode: `$(this).find('svg').css('width', '32px');$(this).find('svg').css('height', '32px');$(this).find('svg').css('fill', '#ff0404');`,
                },
                onclick: {
                    thisElement: true,
                    runCode: `window.open('${APP.videoLink}', '_blank');`
                }
            },
            svg: {
                icon: "video",
                fill: "#ff040440",
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
                    runCode: `$(this).find('svg').css('width', '26px');$(this).find('svg').css('height', '26px');$(this).find('svg').css('fill', '#387ef340');`
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
                    runCode: `window.open('${APP.docLink}', '_blank');`
                }
            },
            svg: {
                icon: "article",
                fill: "#387ef340",
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
                title: `${APP.supportMail}`,
                onmouseover: {
                    runCode: `$(this).find('svg').css('width', '29px');$(this).find('svg').css('height', '29px');$(this).find('svg').css('fill', '#333333');`
                },
                onmouseout: {
                    runCode: `$(this).find('svg').css('width', '27px');$(this).find('svg').css('height', '27px');$(this).find('svg').css('fill', '#33333340');`
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
                fill: "#33333340",
                width: "27px",
                height: "27px"
            }
        };
        let svgElementHelp = encodeLib.svg(svgObject);

        svgObject = {
            outer: {
                cursor: "pointer",
                position: "relative",
                margin: "3px 0 0 7px",
                attributes: `copyContent=".helpSupportMail" hoverFillIn="#9ab9cd" hoverFillOut="#afc7d7"`,
                onmouseover: {
                    thisElement: true,
                    functionName: "encodeLib.svgHoverIn"
                },
                onmouseout: {
                    thisElement: true,
                    functionName: "encodeLib.svgHoverOut"
                },
                onclick: {
                    thisElement: true,
                    runCode: `$(this).find('svg').css({'fill': $(this).attr('hoverFillOut')});let thisElement=$(this);setTimeout(function () { thisElement.find('svg').css({'fill': thisElement.attr('hoverFillIn')}); }, 200);`,
                    functionName: "encodeLib.textCopyInCommand"
                }
            },
            svg: {
                width: "18px",
                height: "18px",
                icon: "copy",
                fill: "#afc7d7"
            }
        };
        let svgElementCopy = encodeLib.svg(svgObject);

        let mailContent = `<div class="supportMailText" style="font-size: 14px;position: absolute;width: calc(100% - 24px);color: #628195;display: flex;align-items: center;justify-content: space-between;bottom: -45px;text-shadow: 0 0 transparent;right: 0;cursor: default;padding: 6px 10px 7px 14px;background: radial-gradient(circle at 100% 0px, rgb(255, 255, 255) -50px, rgb(38, 131, 251) 183%) 0% 0% / contain round;border-radius: 7px;height: 23px;font-weight: 500;font-family: 'Segoe UI', sans-serif;box-shadow: rgba(0, 0, 0, 0.133) 0px 1.6px 3.6px 0px, rgba(0, 0, 0, 0.11) 0px 0.3px 0.9px 0px;transform-origin: top;transform: scale(0);transition: 0.2s;"><div class="helpSupportMail">${settingsObj.supportMail}</div>${svgElementCopy}</div>`;
        let helpElement = `<div style="display: flex; align-items: flex-start; justify-content: center; height: 50px;box-sizing: border-box;padding-top: 5px;">${settingsObj.supportMail ? svgElementHelp : ''}${settingsObj.supportMail ? mailContent : ''}${settingsObj.docLink ? svgElementDoc : ''}${settingsObj.videoLink ? svgElementVideo : ''}</div>`;
    
        let settingsPage = `<div style="display:flex;align-items:center;box-sizing:border-box;position:relative;z-index:100;">
                                ${settingsObj.appLogo ? settingsObj.appLogo : ""}
                                <div style="width: 40px; height: 40px; display: flex; ${settingsObj.hideSettingsPage ? 'display: none;' : ''} position: relative; box-shadow: transparent 0px 0px 5px -2px; border: 1px solid transparent; border-radius: 100%; transition: all 0.1s ease 0s; background-color: white;margin-left: 15px;" onmouseover="$(this).css('box-shadow', '0px 0px 5px -2px black');$(this).css('border', '1px solid white');$(this).find('#settingPageIcon').css('transform','rotate(-45deg)');" onmouseout="$(this).css('box-shadow', '0px 0px 5px -2px transparent');$(this).css('border', '1px solid transparent');$(this).find('#settingPageIcon').css('transform','rotate(0deg)');">
                                    <svg elementid="settingsPage" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="fill: none;stroke: #e8f0fe;stroke-linecap: round;stroke-width: 3;stroke-dasharray: 73 10;stroke-dashoffset: 136;transform: rotate(1567deg);position: absolute;width: 54px;height: 54px;left: -7px;top: -7px;" xml:space="preserve"> <circle elementid="settingsPage" cx="50" cy="50" r="40"></circle> </svg>
                                    <img id="settingsPageImg" src="${'person.png'}" onclick="$(this).parent().find('#settingpageView').show(200);" onerror="$(this).unbind('error').attr('src','person.png');" style="width:100%;height:100%;position:relative;border-radius:100%;cursor:pointer">
                                    <svg id="settingPageIcon" onclick="$(this).parent().find('#settingpageView').show(200);" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" style="transform: rotate(0deg); position: absolute; width: 24px; height: 24px; background-color: white; border-radius: 100%; top: 20px; right: -5px; box-sizing: border-box; padding: 2px; cursor: pointer;"><rect fill="none" height="24" width="24"></rect><path d="M19.5,12c0-0.23-0.01-0.45-0.03-0.68l1.86-1.41c0.4-0.3,0.51-0.86,0.26-1.3l-1.87-3.23c-0.25-0.44-0.79-0.62-1.25-0.42 l-2.15,0.91c-0.37-0.26-0.76-0.49-1.17-0.68l-0.29-2.31C14.8,2.38,14.37,2,13.87,2h-3.73C9.63,2,9.2,2.38,9.14,2.88L8.85,5.19 c-0.41,0.19-0.8,0.42-1.17,0.68L5.53,4.96c-0.46-0.2-1-0.02-1.25,0.42L2.41,8.62c-0.25,0.44-0.14,0.99,0.26,1.3l1.86,1.41 C4.51,11.55,4.5,11.77,4.5,12s0.01,0.45,0.03,0.68l-1.86,1.41c-0.4,0.3-0.51,0.86-0.26,1.3l1.87,3.23c0.25,0.44,0.79,0.62,1.25,0.42 l2.15-0.91c0.37,0.26,0.76,0.49,1.17,0.68l0.29,2.31C9.2,21.62,9.63,22,10.13,22h3.73c0.5,0,0.93-0.38,0.99-0.88l0.29-2.31 c0.41-0.19,0.8-0.42,1.17-0.68l2.15,0.91c0.46,0.2,1,0.02,1.25-0.42l1.87-3.23c0.25-0.44,0.14-0.99-0.26-1.3l-1.86-1.41 C19.49,12.45,19.5,12.23,19.5,12z M12.04,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.97,15.5,12.04,15.5z"></path></svg>
                                    <div id="settingpageView" style="position: fixed;right: 30px;top: 75px;width: 218px;z-index: 1000;border-radius: 16px;backdrop-filter: blur(15px) saturate(86%);background: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='opacity: 0.5;background: radial-gradient(circle at 100% 0px, rgba(255, 255, 255, 1) 0px, rgb(38, 131, 251) 183%) 0% 0% / contain round;' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' style='opacity: 0.05;' stroke='currentColor'  stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg style='opacity: 0.075;' fill='currentColor'%3E%3Ccircle  cx='769' cy='229' r='5'/%3E%3Ccircle  cx='539' cy='269' r='5'/%3E%3Ccircle  cx='603' cy='493' r='5'/%3E%3Ccircle  cx='731' cy='737' r='5'/%3E%3Ccircle  cx='520' cy='660' r='5'/%3E%3Ccircle  cx='309' cy='538' r='5'/%3E%3Ccircle  cx='295' cy='764' r='5'/%3E%3Ccircle  cx='40' cy='599' r='5'/%3E%3Ccircle  cx='102' cy='382' r='5'/%3E%3Ccircle  cx='127' cy='80' r='5'/%3E%3Ccircle  cx='370' cy='105' r='5'/%3E%3Ccircle  cx='578' cy='42' r='5'/%3E%3Ccircle  cx='237' cy='261' r='5'/%3E%3Ccircle  cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E&quot;);-webkit-box-orient: vertical;-webkit-box-direction: normal;flex-direction: column;box-shadow: rgb(105 135 156 / 34%) 10px 20px 40px;transition: box-shadow 0.2s cubic-bezier(0.32, 0.08, 0.24, 1) 0s, transform 0.2s cubic-bezier(0.32, 0.08, 0.24, 1) 0s, -webkit-box-shadow 0.2s cubic-bezier(0.32, 0.08, 0.24, 1) 0s, -webkit-transform 0.2s cubic-bezier(0.32, 0.08, 0.24, 1) 0s;background-size: contain;background-repeat: round;background-blend-mode: lighten;background-size: auto;display: none;">
                                        <div style="height: 32px; display: flex; justify-content: flex-end; box-sizing: border-box; padding: 5px;">
                                            <div onclick="$(this).parent().parent().hide(100);" onmouseover="$(this).css('opacity', '1');" onmouseout="$(this).css('opacity', '0.3');" title="Close" style="transition:0.3s;position:relative;height:24px;display:flex;align-items:center;justify-content:center;overflow:hidden;cursor:pointer;background-color:#e6e6e6;border-radius:100%;opacity:0.3">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" style="position: relative; fill: #bd8a8a; top: -8px; right: 0px; transform: rotate(0deg);"><path d="M279-74q-29 0-48.5-19.5T211-142q0-28 19.5-48t48.5-20h403q28 0 48 20t20 48q0 29-20 48.5T682-74H279Z"></path></svg>
                                            </div>
                                        </div>
                                        <div style="display: flex;width: 100%;position: relative;padding: 0 5px 0 20px;box-sizing: border-box;height: 95px;">
                                            <div style="width: calc(100% - 80px);display:flex;flex-direction:column;align-items:flex-start;justify-content:center;box-sizing:border-box;padding-right: 25px;">
                                                <div style="font-family:SF Pro Display, Helvetica Neue, sans-serif;font-size:18px;font-weight:600;line-height:36px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;letter-spacing:.13px;width:100%;"><span>${settingsObj.accountName ? settingsObj.accountName : 'Account'}</span><span style="left: 10px;position: relative;top: 2px;color: #2870cf;height: 20px;"></span></div>
                                                <div id="accountId" style="font-family:SF Pro Text, Helvetica Neue, sans-serif;font-size:12px;font-weight:600;letter-spacing:.23px;line-height:15px;color:#000000d9;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;width:100%">${settingsObj.accountId ? settingsObj.accountId : ''}</div>
                                            </div>
                                            <div style="display: flex;align-items: center;justify-content: center;width: 30px;margin-top: 5px;">
                                                <svg onclick="${settingsObj.editLink ? "window.open('"+settingsObj.editLink+"', '_blank');" : "APP.page='settings';APP.init();"}" title="Edit Settings" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor" style="cursor: pointer; fill: rgb(83, 84, 93); transform: rotate(-5deg);filter: drop-shadow(rgba(0, 150, 0, 0.5) 2px 4px 6px);" onmouseover="$(this).css('fill', 'blue');" onmouseout="$(this).css('fill', '#53545d');" title=""><path d="M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"></path></svg>
                                            </div>
                                            <div style="width: 50px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding-top:5px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000" style="width: 28px;height: 28px;fill: green;filter: drop-shadow(rgba(0, 150, 0, 0.5) 2px 4px 6px);transform: rotate(0deg);"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M11.19 1.36l-7 3.11C3.47 4.79 3 5.51 3 6.3V11c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6.3c0-.79-.47-1.51-1.19-1.83l-7-3.11c-.51-.23-1.11-.23-1.62 0zm-1.9 14.93L6.7 13.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l5.88-5.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-6.59 6.59c-.38.39-1.02.39-1.41 0z"></path></svg>
                                            </div>
                                        </div>
                                        <div style="display: flex;display: none;position: relative;align-items: center;box-sizing: border-box;justify-content: center;width: 100%;top: -6px;">
                                            <div style="position: relative;display: flex;box-shadow: 0px 0px 5px -1px #a70000cc;border-radius: 3px;align-items: center;box-sizing: border-box;justify-content: center;padding: 1px 5px;padding-left: 0;cursor: pointer;background-color: #a70000;color: #ffebeb;transition: 0.2s;">
                                                <div style="display: flex;align-items: center;justify-content: center;width: 20px;">
                                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000" style="width: 14px;fill: #ffebeb;"><g><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/></g><g><path d="M20,11.09v-4.7c0-0.83-0.52-1.58-1.3-1.87l-6-2.25c-0.45-0.17-0.95-0.17-1.4,0L6.78,3.96l12.09,12.09 C19.59,14.52,20,12.83,20,11.09z M20.49,20.49L3.51,3.51c-0.39-0.39-1.02-0.39-1.41,0c-0.39,0.39-0.39,1.02,0,1.41L4,6.83v4.26 c0,4.83,3.13,9.37,7.43,10.75c0.37,0.12,0.77,0.12,1.14,0c1.49-0.48,2.84-1.35,3.97-2.47l2.53,2.53c0.39,0.39,1.02,0.39,1.41,0 C20.88,21.51,20.88,20.88,20.49,20.49z"/></g></svg>
                                                </div>
                                                <div style="font-size: 12px;font-family: SF Pro Display, Helvetica Neue, sans-serif;box-sizing: border-box;position: relative;">Revoke</div>
                                            </div>
                                        </div>
                                        ${settingsObj.hideHelp ? "" : helpElement}
                                    </div>
                                </div>
                            </div>`;

        let headerElement = encodeLib.content({id: "settingsPage", zIndex: "10000", position: "relative", overflow: "unset", innerOverflow: "unset", content: settingsPage, positionY: "center", positionX: "end", height: "85px", padding: "0 15px", innerPadding: "10px 15px", stopUserSelect: true, cursor: "default"});
        encodeLib.insert(encodeLib.BODY, headerElement, {addOn: "prepend"});

        encodeLib.settingsPageOut = function(e) {
            let thisElement = $("#settingpageView");
            let thisElementSub1 = $("#settingsPageImg");
            let thisElementSub2 = $("#settingPageIcon");
            if(!thisElement.is(e.target) && thisElement.has(e.target).length === 0 && !thisElementSub1.is(e.target) && thisElementSub1.has(e.target).length === 0 && !thisElementSub2.is(e.target) && thisElementSub2.has(e.target).length === 0) {
                $('#settingpageView').hide(100);
            }
            thisElement = $(".supportMailText");
            thisElementExtra = $("#helpMail");
            if(!thisElement.is(e.target) && thisElement.has(e.target).length === 0 && !thisElementExtra.is(e.target) && thisElementExtra.has(e.target).length === 0) 
            {
                thisElement.css("transform", "scale(0)");
            }
        };
            
        if(!encodeLib.outerClickFunctions.includes(encodeLib.settingsPageOut)) {
            encodeLib.outerClickFunctions.push(encodeLib.settingsPageOut);
            window.addEventListener('scroll', encodeLib.settingsPageOut);
        }
    },
    base64: function(clientId, clientSecret) {
        if(!clientId || !clientSecret) {
            return;
        }
        return btoa(clientId+":"+clientSecret);
    },
    safeString: function(rawStr) {
        if(!rawStr || rawStr+"".trim() === "") {
            return "";
        }
        return $('<textarea/>').text(rawStr).html();
    },
    unAuthorizedBodyContent: function(onclickFunction) {
        return `<div class="unAuthorizedDiv" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background-color: white; position: fixed; top: 0; left: 0; z-index: 10000; backdrop-filter: blur(3px);">
                                        <div class="unAuthorized" onclick="${onclickFunction}" onmouseover="$(this).css('width', '115px');$(this).css('height', '35px');$(this).css('box-shadow', '0px 0px 5px 0px #0000ff99');" onmouseout="$(this).css('width', '110px');$(this).css('height', '31px');$(this).css('box-shadow', '0px 0px 5px 0px #0000ff82');" style="width: 110px; height: 31px; background-color: blue; color: white; box-sizing: border-box; padding: 5px 10px 5px 12px; border-radius: 3px; box-shadow: 0px 0px 5px 0px #0000ff82; cursor: pointer; font-family: SF Pro Display,Helvetica Neue,sans-serif; font-size: 20px; display: flex; align-items: center; justify-content: center; transition: 0.2s;">Authorize</div>
                                    </div>`;
    },
    windowSelection: window.getSelection(),
    htmlWhiteSpace: "&nbsp;",
    init: function() {

        document.body.parentNode.style.width = "100%";
        document.body.parentNode.style.height = "100%";
        document.body.parentNode.style.margin = "0";
        document.body.parentNode.style.overflow = "hidden";
        document.body.parentNode.style.position = "relative";

        document.body.style.width = "100%";
        document.body.style.height = "100%";
        document.body.style.margin = "0";
        document.body.style.overflow = "hidden";
        document.body.style.position = "relative";

        encodeLib.BODY = $("body");
        encodeLib.HTML = $("html");

        document.onclick = encodeLib.outerClickFunction;
        encodeLib.autoResize();
        encodeLib.countryCode();
        
    },
    ycodeHide: async function() {
        return `${encodeLib.loader({class: "ycodeLoader"})}`;
    }
    
};