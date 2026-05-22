$(document).ready(function () {
    var mhs;
    var current = 0;

    $.ajax({
        url: 'data.json',
        dataType: 'text',
        success: function (res) {
            mhs = JSON.parse(res);

            if (mhs.length > 0) {
                getMhs(current);
                var tableRows = '';
                $.each(mhs, function(i, item) {
                    tableRows += `<tr>
                        <td>${i + 1}</td>
                        <td>${item.nim}</td>
                        <td>${item.nama}</td>
                        <td><img src="images/${item.foto}" width="50"></td>
                    </tr>`;
                });
                $('tbody').html(tableRows);
            } else {
                $('tbody').html('<tr><td colspan="4" class="text-center">Tidak ada data</td></tr>');
            }
        }
    });

    function getMhs(i) {
        if (!mhs || mhs.length === 0) return;

        $('#nim').val(mhs[i].nim);
        $('#nama').val(mhs[i].nama);
        $('#foto').prop('src', 'images/' + mhs[i].foto);
        $('#next').prop('disabled', i >= mhs.length - 1);
        $('#prev').prop('disabled', i <= 0);
    }

    $('#next').click(function () {
        if (current < mhs.length - 1) getMhs(++current);
    });

    $('#prev').click(function () {
        if (current > 0) getMhs(--current);
    });
});