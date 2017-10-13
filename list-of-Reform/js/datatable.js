var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1gq8FrcDbxwdLtKcl6UkhOxzSyZcc1d4V6P9ksswCV9M/edit#gid=0';

function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data, tabletop) {
  console.log(data);
  var columnCategory = [];
  for (var property in data[0]) {
      var col = {};
      console.log(property);
      col.title = property;
      columnCategory.push(col);
  }
  var dataLen = data.length;
  var dataValues = [];
  for (var i = 0; i < dataLen; i++) {
      var value = Object.values(data[i]);
      dataValues.push(value);
  }
  var footerCategory = "";
  var columnLen = 0;
  for (var val in data[0]) {
      columnLen++
  }
  console.log(columnLen);
  for (var i = 0; i < columnLen; i++) {
      footerCategory += "<th></th>";
  }
  console.log(footerCategory);
  $(document).ready(function() {
      $('#example').append("<tfoot><tr>"+ footerCategory +"</tr></tfoot>")
      .DataTable( {
          data: dataValues,
          columns: columnCategory,
          initComplete: function () {
            this.api().columns([0,1,4]).every( function () {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.footer()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );

                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );
        }
      } );
  } );
}

window.addEventListener('DOMContentLoaded', init)
