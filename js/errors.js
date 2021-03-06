(function ($) {
    $(document).ready(function () {
        var token = false;
        if(page == '/errors') { // Error dashboard
            $.getJSON(api.data+'/errors', function( errors ) {
                if(errors.result == 'ok') {
                     renderRecentErrors(errors.errors);   
                } else {
                    $('.failed-to-load-errors').removeClass('hidden');
                }
            }).fail(function() {
                $('.failed-to-load-errors').removeClass('hidden');
            });
        }
        else if(page == '/errors/all') { // All errors
            console.log('loading all errors');
            $.getJSON(api.data+'/errors/all', function( errors ) {
                if(errors.result == 'ok') {
                     renderRecentErrors(errors.errors);   
                } else {
                    $('.failed-to-load-errors').removeClass('hidden');
                }
            }).fail(function() {
                $('.failed-to-load-errors').removeClass('hidden');
            });
        }
        else if(page.substr(0,8) == '/errors/' && page.length == 48) { // Error group page
            var errorHash = page.split('/')[2];
            renderErrorGroup(errorHash);
            get_role(errorAdmin);
        }

        function renderErrorGroup(errorHash) {
            $('#errors tr.error').remove();
            $.getJSON(api.data+'/errors/'+errorHash, function( error ) {
                if(error.result == 'ok') {
                    renderErrorGroupHash(errorHash);
                    $('#error-counters').html(renderErrorGroupCounters(error.group.count));
                    renderErrorGroupInstances(error.group.errors);
                    $('#error-type-icon').html(formatErrorType(error.group.type));
                    $('#error-group-title').html(error.group.message);
                    $('#error-group-file').html(renderErrorFileLine(error.group.file, error.group.line));
                    if(error.group.raw == '') $('#raw').addClass('hidden');
                    else $('#error-group-raw').html(error.group.raw);
                    timeago().render($('.timeago'));
                } else {
                    $('.failed-to-load-error').removeClass('hidden');
                }
            }).fail(function() {
                $('.failed-to-load-error').removeClass('hidden');
            });
        }

        function errorAdmin(role) {
            if(role == 'admin') showErrorAdminControls();
        }

        function showErrorAdminControls(){
            $('.error-admin').removeClass('hidden');
            // Bind click handler to status change buttons
            $('.update-status').click(function(e) {
                updateErrorStatus($(this).attr('data-status'));
            });
        }

        function updateErrorStatus(status) {
            var token = window.localStorage.getItem("jwt");
            $.ajax({
                url: api.data+'/admin/errors/'+errorHash,
                method: 'POST',
                dataType: 'json',
                data: {'status' : status},
                success: function(info) { renderErrorGroup(errorHash) },
                error: function() { $.bootstrapGrowl("Failed to update status", {type: 'error'}); },
                headers: {'Authorization': 'Bearer '+token},
            }); 
        }
        
        function renderRecentErrors(errors) {
            if(typeof errors == 'undefined') {
                $('.errors-loaded').addClass('hidden');
                $('.no-errors-loaded').removeClass('hidden');
            } else {
                $('.no-errors-loaded').addClass('hidden');
                $('.errors-loaded').removeClass('hidden');
                $.each(errors, function(index, e){
                    $('#errors tr:last').after(renderRecentErrorRow(e));
                });
                timeago().render($('.timeago'));
            }
        }

        function renderRecentErrorRow(e) {
            var row =  '<tr class="error">';
            row += '<td class="text-center not-on-small">'+formatErrorStatus(e.status)+'</td>';
            row += '<td class="text-right">'+formatErrorCount(e.count)+'</td>';
            row += '<td class="text-center">'+formatErrorLevel(e.level)+'</td>';
            row += '<td>'+formatErrorGroupText(e.message, e.hash)+'</td>';
            row += '<td class="text-center">'+formatErrorType(e.type)+'</td>';
            row += '<td class="text-center not-on-small">'+formatErrorOrigin(e.origin)+'</td>';
            row += '<td class="not-on-small"><span class="date timeago" datetime="'+e.time+' +UTC">'+e.time+'</span></td>';
            row += '</tr>';

            return row;
        }

        function formatErrorCount(count) {
            if(count < 10) var c = 'default';
            else if(count < 25) var c = 'warning';
            else var c = 'danger';
            return '<span class="badge badge-'+c+' badge-pill">'+count+'</span>';
        }

        function formatErrorLevel(level) {
            if(level == 0 || level == 1 || level == 42000) return '<i class="fa fa-exclamation-triangle text-danger" aria-hidden="true"></i>';
            else return '<i class="fa fa-bell text-warning" aria-hidden="true"></i>';
        }

        function formatErrorGroupText(msg, hash) {
            return '<a href="/errors/'+hash+'">'+msg+'</a>';
        }

        function formatErrorType(type) {
            if(type == 'js-error') return '<svg width="20px" viewBox="0 0 128 128"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185h-125.184z"></path><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zm-46.885-37.793h-11.709l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"></path>';
            else return '<svg width="24px" viewBox="0 0 128 128"><path fill="#6181B6" d="M64 33.039c-33.74 0-61.094 13.862-61.094 30.961s27.354 30.961 61.094 30.961 61.094-13.862 61.094-30.961-27.354-30.961-61.094-30.961zm-15.897 36.993c-1.458 1.364-3.077 1.927-4.86 2.507-1.783.581-4.052.461-6.811.461h-6.253l-1.733 10h-7.301l6.515-34h14.04c4.224 0 7.305 1.215 9.242 3.432 1.937 2.217 2.519 5.364 1.747 9.337-.319 1.637-.856 3.159-1.614 4.515-.759 1.357-1.75 2.624-2.972 3.748zm21.311 2.968l2.881-14.42c.328-1.688.208-2.942-.361-3.555-.57-.614-1.782-1.025-3.635-1.025h-5.79l-3.731 19h-7.244l6.515-33h7.244l-1.732 9h6.453c4.061 0 6.861.815 8.402 2.231s2.003 3.356 1.387 6.528l-3.031 15.241h-7.358zm40.259-11.178c-.318 1.637-.856 3.133-1.613 4.488-.758 1.357-1.748 2.598-2.971 3.722-1.458 1.364-3.078 1.927-4.86 2.507-1.782.581-4.053.461-6.812.461h-6.253l-1.732 10h-7.301l6.514-34h14.041c4.224 0 7.305 1.215 9.241 3.432 1.935 2.217 2.518 5.418 1.746 9.39zM95.919 54h-5.001l-2.727 14h4.442c2.942 0 5.136-.29 6.576-1.4 1.442-1.108 2.413-2.828 2.918-5.421.484-2.491.264-4.434-.66-5.458-.925-1.024-2.774-1.721-5.548-1.721zM38.934 54h-5.002l-2.727 14h4.441c2.943 0 5.136-.29 6.577-1.4 1.441-1.108 2.413-2.828 2.917-5.421.484-2.491.264-4.434-.66-5.458s-2.772-1.721-5.546-1.721z"></path></svg>'; 
        }

        function formatErrorOrigin(origin) {
            if(origin == api.core.substr(8)) return '<code>CORE</code>';
            else if(origin == api.data.substr(8)) return '<code>DATA</code>';
            else if(origin == window.location.hostname) return '<code>SITE</code>';
            else return '<code>UNKNOWN</code>';
        }
        
        function renderErrorGroupHash(hash) {
            $('.error-hash').html('<a href="/errors/'+hash+'">'+hash+'</a>');
        }

        function renderErrorFileLine(file,line) {
            var url = file;
            if(file.substr(0,20) == '/home/joost/git/data') {
                var repo = 'data';
                var url = 'https://github.com/freesewing/data/tree/master'+file.substr(20);
                var file = url.substr(47);
            }
            if(file.substr(0,20) == '/home/joost/git/core') {
                var repo = 'core';
                var url = 'https://github.com/freesewing/core/tree/master'+file.substr(20);
                var file = url.substr(47);
            }
            else {
                var repo = 'site';
                var url = file;
            }

            return '<small><code>'+repo+'</code> &nbsp; <a href="'+url+'#L'+line+'" target="_BLANK">'+file+'#'+line+'</a></small>';

        }

        function renderErrorGroupCounters(c) {
            var html = '';
            if (c.new > 0) html += formatErrorStatus('new', c.new);
            if (c.open > 0) html += ' '+formatErrorStatus('open', c.open);
            if (c.muted > 0) html += ' '+formatErrorStatus('muted', c.muted);
            if (c.closed > 0) html += ' '+formatErrorStatus('closed', c.closed);

            return html;
        }

        function renderErrorGroupInstances(errors) {
            $.each(errors, function(index, e){
                $('#errors tr:last').after(renderErrorGroupRow(e));
            });
        }
        
        function renderErrorGroupRow(e) {
            var row =  '<tr class="error">';
            row += '<td class="text-center">'+e.id+'</td>';
            row += '<td class="text-center">'+formatErrorStatus(e.status)+'</td>';
            row += '<td>'+e.ip+'</td>';
            row += '<td><span class="date timeago" datetime="'+e.time+' +UTC">'+e.time+'</span></td>';
            row += '</tr>';

            return row;
        }
        
        function formatErrorStatus(status, count='') {
            if(count != '') count = count+' ';
            if(status == 'new') return '<span class="badge badge-success badge-pill">'+count+'NEW</span>';
            else if(status == 'open') return '<span class="badge badge-info badge-pill">'+count+'OPEN</span>';
            else if(status == 'muted') return '<span class="badge badge-warning badge-pill">'+count+'MUTED</span>';
            else if(status == 'closed') return '<span class="badge badge-default badge-pill">'+count+'CLOSED</span>';
            else return '<span class="badge badge-danger badge-pill">'+count+'UNKNOWN</span>';
        }

        function get_role(callback) {
            var token = window.localStorage.getItem("jwt");
            $.ajax({
                url: api.data+'/auth',
                method: 'GET',
                dataType: 'json',
                success: function(info) { callback(info.role) },
                error: function() { callback(false) },
                headers: {'Authorization': 'Bearer '+token},
            }); 
       }
    });
}(jQuery));
