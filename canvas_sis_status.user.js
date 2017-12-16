// ==UserScript==
// @name         Canvas SIS Status
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Show the status of SIS imports
// @author       D. Stuart Freeman
// @license      GPL-3.0; https://spdx.org/licenses/GPL-3.0.html
// @match        https://*.instructure.com/api/v1/accounts/1/sis_imports
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.90/jsrender.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var template = $.templates("<div style='border-bottom: 1px solid black; padding: 1em;'><p>id: {{:id}} created: {{:created_at}}</p><p>state: {{:workflow_state}}</p><progress max=100 value={{:progress}}>{{:progress}}%</progress><span style='margin-left: 1em;'>{{:progress}}%</span></div>");
    var refresh = function(status) {
        $('body').text('');
        for (var stat of status.sis_imports) {
            $('body').append(template.render(stat));
        }
        setTimeout(function(){
            $.ajax({'url': document.url, 'dataFilter': function(data){return data.substr(data.indexOf(';') + 1);} ,'success': function(data) {console.log(data);refresh(data);}});
        }, 15000);
    };
    var status = JSON.parse($('pre').text().substr($('pre').text().indexOf(';') + 1));
    refresh(status);
})();
