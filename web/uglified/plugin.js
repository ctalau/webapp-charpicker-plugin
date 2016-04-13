!function(){goog.events.listen(workspace,sync.api.Workspace.EventType.BEFORE_EDITOR_LOADED,function(e){function t(e){goog.events.listen(e,sync.api.Editor.EventTypes.ACTIONS_LOADED,function(e){var t=e.actionsConfiguration,o=null;if(t.toolbars)for(var r=0;r<t.toolbars.length;r++){var n=t.toolbars[r];"Review"!==n.name&&"Builtin"!==n.name&&(o=n)}o&&(o.children.push({id:"insertfrommenu",type:"action"}),setTimeout(function(){g.init()},0))})}var o=function(){return"undefined"!=typeof Storage?1:(console.log("localstorage not supported"),0)},r=function(){return localStorage.getItem("recentlyUsedCharacters")?1:(console.log("there are no recentCharacters set"),0)},n=function(e){return e.filter(function(t,o){return e.indexOf(t)==o})},s=function(){for(var e=["€","£","¥","¢","©","®","™","α","β","π","μ","Σ","Ω","≤","≥","≠","∞","±","÷","×","⇒"],t=".recentCharactersGrid",s=document.querySelector(t),a=s.firstChild;a;)s.removeChild(a),a=s.firstChild;var c=[];o()&&r()&&(c=JSON.parse(localStorage.getItem("recentlyUsedCharacters")));var l=21;for(c.length<l?(c=c.concat(e),c=n(c).slice(0,l),localStorage.setItem("recentlyUsedCharacters",JSON.stringify(c))):c.length>l&&(c=c.slice(0,l),localStorage.setItem("recentlyUsedCharacters",JSON.stringify(c))),i=0;i<c.length;i++)document.querySelector(t).appendChild(goog.dom.createDom("div",{"class":"goog-inline-block goog-flat-button char-select-button"},c[i]))},a=function(e){this.editor=e,this.dialog=workspace.createDialog(),this.dialog.setTitle("Insert Special Characters")};a.prototype=new sync.actions.AbstractAction(""),a.prototype.getDisplayName=function(){return"insert from menu"};var c=sync.util.computeHdpiIcon("../plugin-resources/char-picker/InsertFromCharactersMap24.png");a.prototype.getLargeIcon=function(){return c},a.prototype.displayDialog=function(){if(window.charsToBeInserted=[],null===document.querySelector("#charpickeriframe")){var e=goog.dom.createDom("iframe",{id:"charpickeriframe",src:"../plugin-resources/char-picker/charpicker.html"});this.dialog.getElement().id="charPicker",this.dialog.getElement().appendChild(e),this.dialog.getElement().innerHTML+='<div><span>Insert characters:</span><input type="text" name="charsToBeInserted" id="special_characters" onFocus="this.setSelectionRange(0, this.value.length)" readonly/><button id="removeLastChar" class="goog-button goog-char-picker-okbutton" title="Remove last character" value=""></button></div>';var t=document.getElementById("special_characters");t.scrollTop=t.scrollHeight,goog.events.listen(this.dialog.getElement().querySelector("#removeLastChar"),goog.events.EventType.CLICK,function(){var e=document.getElementById("special_characters");e.value="",charsToBeInserted.pop();for(var t=0;t<charsToBeInserted.length;t++)e.value+=charsToBeInserted[t]})}else{this.dialog.getElement().querySelector("#special_characters").value="";var a=this.dialog.getElement().querySelector("#charpickeriframe"),c=a.contentWindow||a.contentDocument;c.document?(c=c.document,c.querySelector(".goog-char-picker-input-box").value=""):console.log("failed to get iframe contents")}this.dialog.onSelect(function(e){if("ok"==e){var t=charsToBeInserted;if(t){var a="";for(i=0;i<t.length;i++)a+=t[i];l.getActionsManager().invokeOperation("ro.sync.ecss.extensions.commons.operations.InsertOrReplaceFragmentOperation",{fragment:a},function(){if(o())if(r()){console.log(t);var e=JSON.parse(localStorage.getItem("recentlyUsedCharacters"));e=t.reverse().concat(e),e=n(e),localStorage.setItem("recentlyUsedCharacters",JSON.stringify(e)),s(),console.log("called refresh from dialog")}else console.log("characters not found in localstorage, creating..."),e=t,localStorage.setItem("recentlyUsedCharacters",JSON.stringify(e)),s(),console.log("finally",e)})}else callback&&callback()}}),this.dialog.show()},a.prototype.init=function(){window.charsToBeInserted=[],this.csmenu=new goog.ui.PopupMenu,this.csmenu.handleBlur=function(){};var e=new goog.ui.MenuItem("More symbols...");this.csmenu.addChild(e,!0),console.log("getting more symbols"),console.log(e.getElement()),e.setId("moreSymbolsButton");var t=new a(this.editor);goog.events.listen(e,goog.ui.Component.EventType.ACTION,goog.bind(t.displayDialog,t)),this.csmenu.render(document.body),goog.dom.setProperties(this.csmenu.getElement(),{id:"pickermenu"});var i=this.csmenu.getElement(),s=i.firstChild,c=goog.dom.createDom("div",{"class":"goog-char-picker-grid recentCharactersGrid",id:"simplePickerGrid"});i.insertBefore(c,s),this.csmenu.setToggleMode(!0),goog.events.listen(document.querySelector(".goog-char-picker-grid"),goog.events.EventType.CLICK,function(e){goog.dom.classlist.contains(e.target,"goog-flat-button")&&l.getActionsManager().invokeOperation("ro.sync.ecss.extensions.commons.operations.InsertOrReplaceFragmentOperation",{fragment:e.target.innerHTML},function(){var t=e.target.innerHTML;if(o())if(r()){console.log(t);var i=JSON.parse(localStorage.getItem("recentlyUsedCharacters"));i.unshift(t),i=n(i),localStorage.setItem("recentlyUsedCharacters",JSON.stringify(i))}else console.log("characters not found in localstorage, creating..."),i=[],i.unshift(t),localStorage.setItem("recentlyUsedCharacters",JSON.stringify(i)),console.log("finally",i)})})},a.prototype.actionPerformed=function(e){this.csmenu.isOrWasRecentlyVisible()?this.csmenu.hide():(s(),this.csmenu.showAtElement(document.querySelector("[name=insertfrommenu]"),goog.positioning.Corner.BOTTOM_START))};var l=e.editor,g=new a(l);l.getActionsManager().registerAction("insertfrommenu",g),t(l),sync.util.loadCSSFile("../plugin-resources/char-picker/plugin.css")})}();